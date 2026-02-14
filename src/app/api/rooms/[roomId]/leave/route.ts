import { NextResponse } from 'next/server'
import redis from '@/lib/redis'
import type { Participant } from '@/types'

async function deleteRoom(roomId: string) {
  await redis.del(`room:${roomId}`, `room:${roomId}:files`, `room:${roomId}:participants`)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ roomId: string }> }) {
  try {
    const { roomId } = await params
    const body = (await request.json()) as { peerId: string; sessionId: string }

    const participantsData = await redis.get(`room:${roomId}:participants`)
    if (!participantsData) {
      return NextResponse.json({ success: true })
    }

    const participants: Participant[] = JSON.parse(participantsData)

    // peerId로 떠나는 참여자 식별 (같은 브라우저에서 호스트/다운로더가 같은 sessionId를 공유할 수 있음)
    const leaving = participants.find((p) => p.peerId === body.peerId)
    if (!leaving) {
      return NextResponse.json({ success: true })
    }

    // 호스트가 떠나면 방 전체 삭제
    if (leaving.role === 'host') {
      await deleteRoom(roomId)
      return NextResponse.json({ success: true, deleted: true })
    }

    const updatedParticipants = participants.filter((p) => p.peerId !== body.peerId)

    // 호스트 없이 참여자만 남은 경우는 방 유지 (호스트가 아직 있을 수 있음)
    // 참여자가 완전히 없으면 방 삭제
    if (updatedParticipants.length === 0) {
      await deleteRoom(roomId)
      return NextResponse.json({ success: true, deleted: true })
    }

    const ttl = await redis.ttl(`room:${roomId}:participants`)
    if (ttl > 0) {
      await redis.setex(`room:${roomId}:participants`, ttl, JSON.stringify(updatedParticipants))
    } else {
      await redis.set(`room:${roomId}:participants`, JSON.stringify(updatedParticipants))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('방 퇴장 오류:', error)
    return NextResponse.json({ error: '방 퇴장에 실패했습니다' }, { status: 500 })
  }
}
