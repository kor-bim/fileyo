'use client'

import { useState, useEffect, useRef, use } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { joinRoom, updateFiles } from '@/app/actions'
import { createPeer, waitForPeerOpen, sendFile, destroyPeer, listenRelay, type RelayConnection } from '@/lib/peer-utils'
import { formatBytes, getRoomUrl, generateSessionId, sanitizeFilename } from '@/lib/utils'
import type { FileMetadata, PeerMessage } from '@/types'
import type Peer from 'peerjs'
import type { DataConnection } from 'peerjs'
import { useTranslations } from 'next-intl'

type AnyConnection = DataConnection | RelayConnection

interface PageProps {
  params: Promise<{ roomId: string }>
}

export default function UploadPage({ params }: Readonly<PageProps>) {
  const { roomId } = use(params)
  const t = useTranslations('upload')
  const roomUrl = getRoomUrl(roomId)

  const [files, setFiles] = useState<Map<string, File>>(new Map())
  const [fileMetadata, setFileMetadata] = useState<FileMetadata[]>([])
  const [participants, setParticipants] = useState<string[]>([])
  const [, setPeerId] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [copied, setCopied] = useState(false)
  const [inputKey, setInputKey] = useState(0)

  const peerRef = useRef<Peer | null>(null)
  const connectionsRef = useRef<Map<string, AnyConnection>>(new Map())
  const filesRef = useRef<Map<string, File>>(new Map())
  const metadataRef = useRef<FileMetadata[]>([])
  const sessionIdRef = useRef<string>('')
  const relayRef = useRef<{ close: () => void } | null>(null)

  useEffect(() => {
    filesRef.current = files
  }, [files])

  useEffect(() => {
    metadataRef.current = fileMetadata
  }, [fileMetadata])

  const setupConnection = (conn: AnyConnection) => {
    connectionsRef.current.set(conn.peer, conn)
    setParticipants((prev) => [...new Set([...prev, conn.peer])])

    conn.send({ type: 'FILES_UPDATED', files: metadataRef.current } satisfies PeerMessage)

    conn.on('data', (data: unknown) => {
      const msg = data as PeerMessage
      if (msg.type === 'FILE_REQUEST') {
        msg.fileIds.forEach((fileId) => {
          const file = filesRef.current.get(fileId)
          if (file) sendFile(file, fileId, conn)
        })
      }
    })

    conn.on('close', () => {
      connectionsRef.current.delete(conn.peer)
      setParticipants((prev) => prev.filter((p) => p !== conn.peer))
    })
  }

  useEffect(() => {
    let cancelled = false

    let sid = localStorage.getItem('fileyo_session_id')
    if (!sid) {
      sid = generateSessionId()
      localStorage.setItem('fileyo_session_id', sid)
    }
    sessionIdRef.current = sid

    const peer = createPeer()
    peerRef.current = peer

    const init = async () => {
      try {
        const id = await waitForPeerOpen(peer)
        if (cancelled) {
          destroyPeer()
          return
        }
        setPeerId(id)
        setIsReady(true)

        await joinRoom(roomId, id, sid!, 'host')

        const pending = window.__fileyo_pending_files
        if (pending && pending.length > 0) {
          delete window.__fileyo_pending_files
          const newMap = new Map<string, File>()
          const newMeta: FileMetadata[] = []
          pending.forEach((file) => {
            const fid = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
            newMap.set(fid, file)
            newMeta.push({ id: fid, name: sanitizeFilename(file.name), size: file.size, type: file.type })
          })
          setFiles(newMap)
          setFileMetadata(newMeta)
          filesRef.current = newMap
          metadataRef.current = newMeta
          await updateFiles(roomId, newMeta)
        }

        // WebRTC 연결 수신
        peer.on('connection', (conn: DataConnection) => {
          conn.on('open', () => setupConnection(conn))
        })

        // 릴레이 연결 수신 (WebRTC 폴백)
        relayRef.current = listenRelay(roomId, id, (conn, fromPeerId) => {
          console.log('[Host] 릴레이 연결 수신:', fromPeerId)
          setupConnection(conn)
        })
      } catch (error) {
        if (!cancelled) console.error('Peer 초기화 실패:', error)
      }
    }

    init()

    const handleBeforeUnload = () => {
      connectionsRef.current.forEach((conn) => {
        conn.send({ type: 'HOST_DISCONNECTED' } satisfies PeerMessage)
      })

      fetch(`/api/rooms/${roomId}/leave`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ peerId: peerRef.current?.id, sessionId: sessionIdRef.current }),
        keepalive: true
      }).catch(() => {})
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('pagehide', handleBeforeUnload)

    return () => {
      cancelled = true
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('pagehide', handleBeforeUnload)
      relayRef.current?.close()
      if (peerRef.current) destroyPeer()
    }
  }, [roomId])

  const handleAddFiles = (newFiles: File[]) => {
    const newMap = new Map(files)
    const newMeta = [...fileMetadata]

    newFiles.forEach((file) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      newMap.set(id, file)
      newMeta.push({ id, name: sanitizeFilename(file.name), size: file.size, type: file.type })
    })

    setFiles(newMap)
    setFileMetadata(newMeta)

    updateFiles(roomId, newMeta)

    connectionsRef.current.forEach((conn) => {
      if (conn.open) conn.send({ type: 'FILES_UPDATED', files: newMeta } satisfies PeerMessage)
    })
  }

  const handleRemoveFile = (fileId: string) => {
    const newMap = new Map(files)
    newMap.delete(fileId)
    const newMeta = fileMetadata.filter((f) => f.id !== fileId)

    setFiles(newMap)
    setFileMetadata(newMeta)

    updateFiles(roomId, newMeta)

    connectionsRef.current.forEach((conn) => {
      if (conn.open) conn.send({ type: 'FILES_UPDATED', files: newMeta } satisfies PeerMessage)
    })
  }

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(roomUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isReady) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">{t('preparing')}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4">
      <div className="text-center">
        <h1 className="mb-1 text-3xl font-bold tracking-tight">Fileyo</h1>
        <p className="text-sm text-muted-foreground">{t('sharing')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('qrTitle')}</CardTitle>
            <CardDescription>{t('qrDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="rounded-lg bg-white p-4">
              <QRCodeSVG value={roomUrl} size={180} level="H" />
            </div>
            <div className="w-full space-y-2">
              <div className="rounded-md bg-muted px-3 py-2">
                <p className="text-xs text-muted-foreground">{t('shareLink')}</p>
                <p className="break-all font-mono text-xs">{roomUrl}</p>
              </div>
              <Button variant="outline" className="w-full" onClick={copyUrl}>
                {copied ? t('copied') : t('copyLink')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('participantsTitle', { count: participants.length })}</CardTitle>
            <CardDescription>{t('participantsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            {participants.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('noParticipants')}</p>
            ) : (
              <div className="space-y-2">
                {participants.map((pid) => (
                  <div key={pid} className="flex items-center gap-2 rounded-md bg-muted px-3 py-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-sm">
                      {t('participant')} {pid.substring(0, 8)}...
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t('sharedFilesTitle', { count: fileMetadata.length })}</CardTitle>
            <CardDescription>{t('sharedFilesDescription')}</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
            {t('addFile')}
          </Button>
          <input
            key={inputKey}
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) handleAddFiles(Array.from(e.target.files))
              setInputKey((k) => k + 1)
            }}
          />
        </CardHeader>
        <CardContent>
          {fileMetadata.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('noFiles')}</p>
          ) : (
            <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
              {fileMetadata.map((meta) => (
                <div key={meta.id} className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{meta.name}</p>
                    <p className="text-xs text-muted-foreground">{formatBytes(meta.size)}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(meta.id)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

declare global {
  interface Window {
    __fileyo_pending_files?: File[]
  }
}
