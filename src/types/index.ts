export interface Room {
  hostPeerId: string
  passwordHash: string | null
  expiresAt: number
  createdAt: number
}

export interface FileMetadata {
  id: string
  name: string
  size: number
  type: string
}

export interface Participant {
  peerId: string
  sessionId: string
  role: 'host' | 'downloader'
  joinedAt: number
  status?: 'connected' | 'downloading' | 'completed'
  progress?: number
}

export type PeerMessage =
  | { type: 'PARTICIPANT_JOIN'; peerId: string; sessionId: string }
  | { type: 'PARTICIPANT_LEAVE'; peerId: string }
  | { type: 'FILES_UPDATED'; files: FileMetadata[] }
  | { type: 'HOST_DISCONNECTED' }
  | { type: 'FILE_REQUEST'; fileIds: string[] }
  | { type: 'FILE_META'; fileId: string; name: string; size: number; mimeType: string }
  | {
      type: 'FILE_CHUNK'
      fileId: string
      chunkIndex: number
      totalChunks: number
      data: ArrayBuffer
      encoded?: boolean
    }
  | { type: 'FILE_COMPLETE'; fileId: string }

export interface FileTransferProgress {
  fileId: string
  fileName: string
  progress: number
  speed: number
  bytesTransferred: number
  totalBytes: number
  estimatedTimeRemaining: number
}
