import Peer, { type DataConnection } from 'peerjs'
import type { PeerMessage } from '@/types'

const CHUNK_SIZE = 64 * 1024
const WEBRTC_TIMEOUT = 10000
const PEER_OPEN_TIMEOUT = 15000

const DEFAULT_STUN_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' }
]

function getIceServers(): RTCIceServer[] {
  const turnUrls = (process.env.NEXT_PUBLIC_TURN_URLS || '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean)
  const turnUsername = process.env.NEXT_PUBLIC_TURN_USERNAME
  const turnCredential = process.env.NEXT_PUBLIC_TURN_CREDENTIAL

  if (!turnUrls.length || !turnUsername || !turnCredential) {
    return DEFAULT_STUN_SERVERS
  }

  const turnServers: RTCIceServer[] = turnUrls.map((url) => ({
    urls: url,
    username: turnUsername,
    credential: turnCredential
  }))

  return [...DEFAULT_STUN_SERVERS, ...turnServers]
}

/* ================================
   Peer 생성 (중복 방지)
================================ */

let peerInstance: Peer | null = null

export function createPeer(): Peer {
  if (peerInstance && !peerInstance.destroyed) {
    return peerInstance
  }

  const peerHost = process.env.NEXT_PUBLIC_PEER_HOST || window.location.hostname
  const peerPort = Number(process.env.NEXT_PUBLIC_PEER_PORT || 9000)
  const peerSecure = process.env.NEXT_PUBLIC_PEER_SECURE === 'true'

  peerInstance = new Peer({
    host: peerHost,
    port: peerPort,
    path: '/',
    secure: peerSecure,
    config: {
      iceServers: getIceServers(),
      iceTransportPolicy: 'all'
    }
  })

  peerInstance.on('error', (err) => {
    console.error('[Peer] 오류:', err?.type, err?.message)
  })

  return peerInstance
}

/* ================================
   Peer Open 반드시 대기
================================ */

export function waitForPeerOpen(peer: Peer): Promise<string> {
  return new Promise((resolve, reject) => {
    if (peer.open && peer.id) return resolve(peer.id)
    if (peer.destroyed) return reject(new Error('Peer가 이미 종료됨'))

    const timer = setTimeout(() => {
      cleanup()
      reject(new Error('Peer 연결 시간 초과'))
    }, PEER_OPEN_TIMEOUT)

    const onOpen = (id: string) => {
      cleanup()
      resolve(id)
    }

    const onError = (err: Error) => {
      cleanup()
      reject(err)
    }

    const cleanup = () => {
      clearTimeout(timer)
      peer.off('open', onOpen)
      peer.off('error', onError)
    }

    peer.on('open', onOpen)
    peer.on('error', onError)
  })
}

/* ================================
   WebRTC 연결 시도
================================ */

function tryWebRTC(peer: Peer, remotePeerId: string): Promise<DataConnection> {
  return new Promise((resolve, reject) => {
    const conn = peer.connect(remotePeerId, { reliable: true })

    const timer = setTimeout(() => {
      cleanup()
      if (!conn.open) conn.close()
      reject(new Error('WebRTC 연결 시간 초과'))
    }, WEBRTC_TIMEOUT)

    const onOpen = () => {
      cleanup()
      resolve(conn)
    }

    const onError = (err: unknown) => {
      cleanup()
      reject(err instanceof Error ? err : new Error(String(err)))
    }

    const cleanup = () => {
      clearTimeout(timer)
      conn.off('open', onOpen)
      conn.off('error', onError)
    }

    conn.on('open', onOpen)
    conn.on('error', onError)
  })
}

/* ================================
   WebSocket 릴레이 연결 (폴백)
================================ */

type EventHandler = (...args: unknown[]) => void

export interface RelayConnection {
  open: boolean
  send: (data: PeerMessage) => void
  on: (event: string, handler: EventHandler) => void
  off: (event: string, handler: EventHandler) => void
  close: () => void
  peer: string
  _isRelay: true
  _emit: (event: string, ...args: unknown[]) => void
}

function createRelayConnection(ws: WebSocket, remotePeerId: string): RelayConnection {
  const listeners: Record<string, EventHandler[]> = {}

  const emit = (event: string, ...args: unknown[]) => {
    listeners[event]?.forEach((fn) => fn(...args))
  }

  const messageHandler = (e: MessageEvent) => {
    try {
      const msg = JSON.parse(e.data)
      if (msg.type === 'RELAY_DATA' && msg.fromPeerId === remotePeerId) {
        emit('data', msg.data)
      }
      // 상대방이 떠났을 때 close 이벤트 발생
      if (msg.type === 'RELAY_PEER_LEFT' && msg.peerId === remotePeerId) {
        conn.open = false
        emit('close')
      }
    } catch {
      // ignore
    }
  }

  ws.addEventListener('message', messageHandler)

  ws.addEventListener('close', () => {
    conn.open = false
    emit('close')
  })

  const conn: RelayConnection = {
    open: true,
    peer: remotePeerId,
    _isRelay: true,
    _emit: emit,
    send(data: PeerMessage) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'RELAY_SEND', targetPeerId: remotePeerId, data }))
      }
    },
    on(event: string, handler: EventHandler) {
      if (!listeners[event]) listeners[event] = []
      listeners[event].push(handler)
    },
    off(event: string, handler: EventHandler) {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter((fn) => fn !== handler)
      }
    },
    close() {
      // 릴레이에서 downloader 전용 WS는 닫고, 호스트 공유 WS는 닫지 않음
      // close 이벤트만 emit
      conn.open = false
      emit('close')
    }
  }

  return conn
}

/** 다운로더 전용: 새 WebSocket으로 relay 연결 */
function connectRelay(roomId: string, myPeerId: string, remotePeerId: string): Promise<RelayConnection> {
  return new Promise((resolve, reject) => {
    const wsUrl = process.env.NEXT_PUBLIC_RELAY_URL || `ws://${window.location.hostname}:9000/relay`
    const ws = new WebSocket(wsUrl)

    const timer = setTimeout(() => {
      ws.close()
      reject(new Error('릴레이 연결 시간 초과'))
    }, 10000)

    ws.addEventListener('open', () => {
      clearTimeout(timer)
      ws.send(JSON.stringify({ type: 'RELAY_JOIN', roomId, peerId: myPeerId }))
      const conn = createRelayConnection(ws, remotePeerId)
      // 다운로더 전용이므로 close 시 실제 WS도 닫음
      const origClose = conn.close
      conn.close = () => {
        origClose()
        ws.close()
      }
      console.log('[Relay] 릴레이 연결 성공')
      resolve(conn)
    })

    ws.addEventListener('error', () => {
      clearTimeout(timer)
      reject(new Error('릴레이 서버 연결 실패'))
    })
  })
}

/* ================================
   릴레이 호스트 수신 (호스트용)
================================ */

export function listenRelay(
  roomId: string,
  myPeerId: string,
  onConnection: (conn: RelayConnection, fromPeerId: string) => void
): { close: () => void } {
  const wsUrl = process.env.NEXT_PUBLIC_RELAY_URL || `ws://${window.location.hostname}:9000/relay`
  const ws = new WebSocket(wsUrl)
  const knownPeers = new Set<string>()

  ws.addEventListener('open', () => {
    ws.send(JSON.stringify({ type: 'RELAY_JOIN', roomId, peerId: myPeerId }))
    console.log('[Relay] 호스트 릴레이 대기 중')
  })

  ws.addEventListener('message', (e) => {
    try {
      const msg = JSON.parse(e.data)
      if (msg.type === 'RELAY_DATA' && msg.fromPeerId) {
        if (!knownPeers.has(msg.fromPeerId)) {
          knownPeers.add(msg.fromPeerId)
          const conn = createRelayConnection(ws, msg.fromPeerId)
          onConnection(conn, msg.fromPeerId)
          // 첫 메시지를 다음 틱에 전달 (onConnection에서 핸들러 등록 후)
          setTimeout(() => conn._emit('data', msg.data), 0)
        }
      }
      // RELAY_PEER_LEFT는 createRelayConnection 내부에서 처리됨
    } catch {
      // ignore
    }
  })

  return {
    close: () => {
      knownPeers.clear()
      ws.close()
    }
  }
}

/* ================================
   통합 연결 (WebRTC → 릴레이 폴백)
================================ */

export async function connectToPeer(
  peer: Peer,
  remotePeerId: string,
  roomId?: string
): Promise<DataConnection | RelayConnection> {
  await waitForPeerOpen(peer)

  try {
    const conn = await tryWebRTC(peer, remotePeerId)
    console.log('[Peer] WebRTC 연결 성공')
    return conn
  } catch (err) {
    console.warn('[Peer] WebRTC 실패, 릴레이로 폴백:', (err as Error).message)
    if (roomId && peer.id) {
      return await connectRelay(roomId, peer.id, remotePeerId)
    }
    throw err
  }
}

/* ================================
   Peer 종료
================================ */

export function destroyPeer() {
  if (!peerInstance) return

  Object.values(peerInstance.connections).forEach((conns) => {
    ;(conns as DataConnection[]).forEach((c) => c.close())
  })

  if (!peerInstance.destroyed) {
    peerInstance.destroy()
  }

  peerInstance = null
}

/* ================================
   파일 전송
================================ */

export async function sendFile(
  file: File,
  fileId: string,
  connection: DataConnection | RelayConnection,
  onProgress?: (progress: number) => void
) {
  connection.send({
    type: 'FILE_META',
    fileId,
    name: file.name,
    size: file.size,
    mimeType: file.type
  })

  const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
  let bytesTransferred = 0

  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE
    const end = Math.min(start + CHUNK_SIZE, file.size)
    const chunk = await file.slice(start, end).arrayBuffer()

    const isRelay = '_isRelay' in connection
    const data = isRelay ? arrayBufferToBase64(chunk) : chunk

    connection.send({
      type: 'FILE_CHUNK',
      fileId,
      chunkIndex: i,
      totalChunks,
      data,
      encoded: isRelay
    } as PeerMessage)

    bytesTransferred += chunk.byteLength
    onProgress?.((bytesTransferred / file.size) * 100)

    await new Promise((r) => setTimeout(r, 0))
  }

  connection.send({ type: 'FILE_COMPLETE', fileId })
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

/* ================================
   파일 수신
================================ */

export class FileReceiver {
  private chunks = new Map<string, ArrayBuffer[]>()
  private meta = new Map<string, { name: string; size: number; mimeType: string }>()
  private received = new Map<string, number>()

  onProgress?: (fileId: string, progress: number, bytesReceived: number, totalBytes: number) => void
  onComplete?: (fileId: string, blob: Blob, name: string) => void

  handleMessage(data: unknown) {
    const msg = data as PeerMessage

    if (msg.type === 'FILE_META') {
      this.meta.set(msg.fileId, {
        name: msg.name,
        size: msg.size,
        mimeType: msg.mimeType
      })
      this.chunks.set(msg.fileId, [])
      this.received.set(msg.fileId, 0)
      return
    }

    if (msg.type === 'FILE_CHUNK') {
      const arr = this.chunks.get(msg.fileId)
      if (!arr) return

      const chunkData = msg.encoded ? base64ToArrayBuffer(msg.data as unknown as string) : msg.data

      arr[msg.chunkIndex] = chunkData

      const bytes = (this.received.get(msg.fileId) || 0) + chunkData.byteLength
      this.received.set(msg.fileId, bytes)

      const meta = this.meta.get(msg.fileId)
      if (meta) {
        this.onProgress?.(msg.fileId, (bytes / meta.size) * 100, bytes, meta.size)
      }
      return
    }

    if (msg.type === 'FILE_COMPLETE') {
      const arr = this.chunks.get(msg.fileId)
      const meta = this.meta.get(msg.fileId)
      if (!arr || !meta) return

      const blob = new Blob(arr, { type: meta.mimeType })
      this.onComplete?.(msg.fileId, blob, meta.name)

      this.chunks.delete(msg.fileId)
      this.meta.delete(msg.fileId)
      this.received.delete(msg.fileId)
    }
  }

  clear() {
    this.chunks.clear()
    this.meta.clear()
    this.received.clear()
  }
}

/* ================================
   Blob 다운로드
================================ */

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.href = url
  a.download = filename

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  URL.revokeObjectURL(url)
}
