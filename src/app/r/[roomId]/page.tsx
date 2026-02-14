'use client'

import { useState, useEffect, useRef, use } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { joinRoom } from '@/app/actions'
import {
  createPeer,
  waitForPeerOpen,
  connectToPeer,
  FileReceiver,
  downloadBlob,
  destroyPeer,
  type RelayConnection
} from '@/lib/peer-utils'
import { formatBytes, generateSessionId, sanitizeFilename } from '@/lib/utils'
import JSZip from 'jszip'
import type { FileMetadata, PeerMessage } from '@/types'
import type Peer from 'peerjs'
import type { DataConnection } from 'peerjs'
import { useTranslations } from 'next-intl'

type AnyConnection = DataConnection | RelayConnection

interface PageProps {
  params: Promise<{ roomId: string }>
}

export default function DownloadPage({ params }: Readonly<PageProps>) {
  const { roomId } = use(params)
  const t = useTranslations('download')

  const [files, setFiles] = useState<FileMetadata[]>([])
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [downloadProgress, setDownloadProgress] = useState<Map<string, number>>(new Map())
  const [isDownloading, setIsDownloading] = useState(false)
  const [isJoining, setIsJoining] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [hostDisconnected, setHostDisconnected] = useState(false)
  const [isZipping, setIsZipping] = useState(false)
  const [needsPassword, setNeedsPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')

  const peerRef = useRef<Peer | null>(null)
  const connRef = useRef<AnyConnection | null>(null)
  const receiverRef = useRef<FileReceiver>(new FileReceiver())
  const sessionIdRef = useRef<string>('')
  const pendingFileCountRef = useRef(0)
  const completedFileCountRef = useRef(0)
  const downloadModeRef = useRef<'single' | 'zip'>('single')
  const zipFilesRef = useRef<Map<string, { name: string; blob: Blob }>>(new Map())

  const initConnection = async (pw?: string) => {
    setIsJoining(true)
    setPasswordError('')

    let sid = localStorage.getItem('fileyo_session_id')
    if (!sid) {
      sid = generateSessionId()
      localStorage.setItem('fileyo_session_id', sid)
    }
    sessionIdRef.current = sid

    const peer = createPeer()
    peerRef.current = peer

    try {
      const myPeerId = await waitForPeerOpen(peer)
      const result = await joinRoom(roomId, myPeerId, sid, 'downloader', pw)

      if (!result.success) {
        if (result.needsPassword) {
          setNeedsPassword(true)
          if (pw) setPasswordError(result.error || t('invalidPassword'))
          setIsJoining(false)
          destroyPeer()
          return
        }
        setError(result.error || t('joinFail'))
        setIsJoining(false)
        destroyPeer()
        return
      }

      setNeedsPassword(false)
      if (result.files) setFiles(result.files)

      if (result.hostPeerId) {
        const conn = await connectToPeer(peer, result.hostPeerId, roomId)
        connRef.current = conn
        setIsConnected(true)

        // 릴레이 연결이면 호스트에게 핸드셰이크 전송
        if ('_isRelay' in conn) {
          conn.send({ type: 'PARTICIPANT_JOIN', peerId: peer.id!, sessionId: sid } satisfies PeerMessage)
        }

        conn.on('data', (data: unknown) => {
          const msg = data as PeerMessage
          if (msg.type === 'FILES_UPDATED') {
            setFiles(msg.files)
          } else if (msg.type === 'HOST_DISCONNECTED') {
            setHostDisconnected(true)
            setIsConnected(false)
          } else {
            receiverRef.current.handleMessage(data)
          }
        })

        conn.on('close', () => {
          setHostDisconnected(true)
          setIsConnected(false)
        })
      }
    } catch (err) {
      console.error('입장 실패:', err)
      setError(t('connectFail'))
      destroyPeer()
    }

    setIsJoining(false)
  }

  useEffect(() => {
    let cancelled = false

    receiverRef.current.onProgress = (fileId, progress) => {
      setDownloadProgress((prev) => new Map(prev).set(fileId, progress))
    }
    receiverRef.current.onComplete = (fileId, blob, name) => {
      if (downloadModeRef.current === 'zip') {
        zipFilesRef.current.set(fileId, { name, blob })
      } else {
        downloadBlob(blob, name)
      }
      setDownloadProgress((prev) => new Map(prev).set(fileId, 100))

      // 모든 선택 파일 다운로드 완료 시 버튼 상태 복구
      completedFileCountRef.current += 1
      if (completedFileCountRef.current >= pendingFileCountRef.current) {
        if (downloadModeRef.current === 'zip') {
          ;(async () => {
            try {
              setIsZipping(true)
              const zip = new JSZip()
              const usedNames = new Set<string>()

              zipFilesRef.current.forEach(({ name, blob }) => {
                const safeName = sanitizeFilename(name) || 'file'
                let finalName = safeName
                let index = 1

                while (usedNames.has(finalName)) {
                  const dot = safeName.lastIndexOf('.')
                  if (dot > 0) {
                    finalName = `${safeName.slice(0, dot)} (${index})${safeName.slice(dot)}`
                  } else {
                    finalName = `${safeName} (${index})`
                  }
                  index += 1
                }

                usedNames.add(finalName)
                zip.file(finalName, blob)
              })

              const archive = await zip.generateAsync({ type: 'blob' })
              downloadBlob(archive, `fileyo-${roomId}.zip`)
            } catch (err) {
              console.error('ZIP 생성 실패:', err)
              alert(t('zipFail'))
            } finally {
              setIsZipping(false)
              setIsDownloading(false)
              zipFilesRef.current.clear()
              completedFileCountRef.current = 0
              pendingFileCountRef.current = 0
            }
          })()
        } else {
          setIsDownloading(false)
          completedFileCountRef.current = 0
          pendingFileCountRef.current = 0
        }
      }
    }

    const run = async () => {
      await initConnection()
      if (cancelled && peerRef.current) destroyPeer()
    }
    run()

    // 다운로더가 페이지를 떠날 때 cleanup
    const handleBeforeUnload = () => {
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
      connRef.current?.close()
      if (peerRef.current) destroyPeer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId])

  const handlePasswordSubmit = () => {
    if (!password.trim()) return
    if (peerRef.current) destroyPeer()
    initConnection(password)
  }

  const toggleFile = (fileId: string) => {
    setSelectedFiles((prev) => {
      const next = new Set(prev)
      if (next.has(fileId)) next.delete(fileId)
      else next.add(fileId)
      return next
    })
  }

  const toggleAll = () => {
    if (selectedFiles.size === files.length) setSelectedFiles(new Set())
    else setSelectedFiles(new Set(files.map((f) => f.id)))
  }

  const handleDownload = () => {
    if (!connRef.current || selectedFiles.size === 0) return
    downloadModeRef.current = selectedFiles.size > 1 ? 'zip' : 'single'
    zipFilesRef.current.clear()
    setIsDownloading(true)
    pendingFileCountRef.current = selectedFiles.size
    completedFileCountRef.current = 0
    connRef.current.send({ type: 'FILE_REQUEST', fileIds: Array.from(selectedFiles) } satisfies PeerMessage)
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('errorTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isJoining) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">{t('connecting')}</p>
      </div>
    )
  }

  if (hostDisconnected) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('hostDisconnectedTitle')}</CardTitle>
            <CardDescription>{t('hostDisconnectedDesc')}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const allDownloaded =
    selectedFiles.size > 0 && Array.from(selectedFiles).every((id) => downloadProgress.get(id) === 100)

  return (
    <>
      <div className="mx-auto w-full max-w-4xl space-y-6 px-4">
        <div className="text-center">
          <h1 className="mb-1 text-3xl font-bold tracking-tight">Fileyo</h1>
          <p className="text-sm text-muted-foreground">
            {isConnected ? t('selectFilesToDownload') : t('connectingToHost')}
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t('sharedFilesTitle', { count: files.length })}</CardTitle>
              <CardDescription>{t('sharedFilesDesc')}</CardDescription>
            </div>
            {files.length > 0 && (
              <Button variant="ghost" size="sm" onClick={toggleAll}>
                {selectedFiles.size === files.length ? t('deselectAll') : t('selectAll')}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('noFiles')}</p>
            ) : (
              <div className="space-y-2">
                {files.map((file) => {
                  const progress = downloadProgress.get(file.id)
                  return (
                    <div key={file.id} className="space-y-1">
                      <label className="flex cursor-pointer items-center gap-3 rounded-md bg-muted px-3 py-2">
                        <Checkbox
                          checked={selectedFiles.has(file.id)}
                          onCheckedChange={() => toggleFile(file.id)}
                          disabled={isDownloading}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                        </div>
                        {progress !== undefined && (
                          <span className="text-xs text-muted-foreground">
                            {progress >= 100 ? t('done') : `${Math.round(progress)}%`}
                          </span>
                        )}
                      </label>
                      {progress !== undefined && progress < 100 && <Progress value={progress} className="h-1" />}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          className="w-full"
          disabled={selectedFiles.size === 0 || !isConnected || isDownloading || isZipping}
          onClick={handleDownload}
        >
          {isZipping
            ? t('zipping')
            : isDownloading
              ? t('downloading')
              : allDownloaded
                ? t('completed')
                : t('downloadSelected', { count: selectedFiles.size })}
        </Button>
      </div>

      <Dialog open={needsPassword} onOpenChange={(open) => !open && setNeedsPassword(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('passwordTitle')}</DialogTitle>
            <DialogDescription>{t('passwordDesc')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder={t('passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            />
            {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNeedsPassword(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handlePasswordSubmit}>{t('join')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
