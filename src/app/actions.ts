'use server'

import redis from '@/lib/redis'
import bcrypt from 'bcryptjs'
import { generateRoomId, getRoomUrl } from '@/lib/utils'
import type { Room, FileMetadata } from '@/types'

export async function createRoom(password?: string, expiresInHours = 24) {
  const roomId = generateRoomId()
  const passwordHash = password ? await bcrypt.hash(password, 10) : null
  const now = Date.now()
  const ttl = expiresInHours * 60 * 60

  const room: Room = {
    hostPeerId: '',
    passwordHash,
    expiresAt: now + ttl * 1000,
    createdAt: now
  }

  await redis.setex(`room:${roomId}`, ttl, JSON.stringify(room))
  await redis.setex(`room:${roomId}:files`, ttl, JSON.stringify([]))
  await redis.setex(`room:${roomId}:participants`, ttl, JSON.stringify([]))

  return { roomId, url: getRoomUrl(roomId) }
}

export async function joinRoom(
  roomId: string,
  peerId: string,
  sessionId: string,
  role: 'host' | 'downloader',
  password?: string
) {
  const roomData = await redis.get(`room:${roomId}`)
  if (!roomData) return { success: false as const, error: '방을 찾을 수 없습니다' }

  const room: Room = JSON.parse(roomData)

  if (room.expiresAt < Date.now()) {
    await redis.del(`room:${roomId}`, `room:${roomId}:files`, `room:${roomId}:participants`)
    return { success: false as const, error: '만료된 방입니다' }
  }

  if (room.passwordHash && role === 'downloader') {
    if (!password) return { success: false as const, error: '비밀번호가 필요합니다', needsPassword: true }
    const valid = await bcrypt.compare(password, room.passwordHash)
    if (!valid) return { success: false as const, error: '비밀번호가 올바르지 않습니다', needsPassword: true }
  }

  const participantsData = await redis.get(`room:${roomId}:participants`)
  const participants = participantsData ? JSON.parse(participantsData) : []
  const existingIdx = participants.findIndex((p: { sessionId: string }) => p.sessionId === sessionId)
  if (existingIdx >= 0) {
    participants[existingIdx].peerId = peerId
  } else {
    participants.push({ peerId, sessionId, role, joinedAt: Date.now() })
  }
  const partTtl = await redis.ttl(`room:${roomId}:participants`)
  if (partTtl > 0) {
    await redis.setex(`room:${roomId}:participants`, partTtl, JSON.stringify(participants))
  } else {
    await redis.set(`room:${roomId}:participants`, JSON.stringify(participants))
  }

  if (role === 'host') {
    room.hostPeerId = peerId
    const roomTtl = await redis.ttl(`room:${roomId}`)
    if (roomTtl > 0) {
      await redis.setex(`room:${roomId}`, roomTtl, JSON.stringify(room))
    } else {
      await redis.set(`room:${roomId}`, JSON.stringify(room))
    }
  }

  const filesData = await redis.get(`room:${roomId}:files`)
  const files: FileMetadata[] = filesData ? JSON.parse(filesData) : []

  return {
    success: true as const,
    hostPeerId: room.hostPeerId || undefined,
    files
  }
}

export async function updateFiles(roomId: string, files: FileMetadata[]) {
  const roomData = await redis.get(`room:${roomId}`)
  if (!roomData) return { success: false }

  const filesTtl = await redis.ttl(`room:${roomId}:files`)
  if (filesTtl > 0) {
    await redis.setex(`room:${roomId}:files`, filesTtl, JSON.stringify(files))
  } else {
    await redis.set(`room:${roomId}:files`, JSON.stringify(files))
  }
  return { success: true }
}

export async function getRoomInfo(roomId: string) {
  const roomData = await redis.get(`room:${roomId}`)
  if (!roomData) return null

  const room: Room = JSON.parse(roomData)
  if (room.expiresAt < Date.now()) {
    await redis.del(`room:${roomId}`, `room:${roomId}:files`, `room:${roomId}:participants`)
    return null
  }

  const filesData = await redis.get(`room:${roomId}:files`)
  const files: FileMetadata[] = filesData ? JSON.parse(filesData) : []

  return {
    hasPassword: !!room.passwordHash,
    hostPeerId: room.hostPeerId,
    files
  }
}
