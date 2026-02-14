# Fileyo

브라우저 기반 P2P 파일 공유 서비스입니다. 기본 전송은 WebRTC DataChannel, 실패 시 WebSocket 릴레이로 폴백합니다.

## Repositories

- Web App: https://github.com/kor-bim/fileyo
- Peer/Relay Server: https://github.com/kor-bim/fileyo-peer

## Features

- 방 생성/입장 기반 파일 공유
- 다중 파일 업로드/다운로드
- 비밀번호 보호 방
- QR 링크 공유
- 실시간 참여자/파일 상태 동기화
- WebRTC 실패 시 릴레이 폴백

## Tech Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS v4, shadcn/ui
- PeerJS + WebRTC DataChannel
- Redis (방 메타데이터 저장)

## Quick Start

### Prerequisites

- Bun 1.3+
- Node.js 18+
- Redis

### Environment

`.env.local`

```env
REDIS_URL=rediss://your-redis-url
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_PEER_HOST=localhost
NEXT_PUBLIC_PEER_PORT=9000
NEXT_PUBLIC_PEER_SECURE=false
```

### Development

```bash
bun install
bun run dev:all
```

개별 실행:

```bash
bun run dev      # Next.js app
bun run dev:peer # peer server (../fileyo-peer)
```

### Production

```bash
bun run build
bun run start
```

## Deployment Notes

- Next 앱과 Peer/Relay 서버를 같이 운영해야 합니다.
- Redis에는 파일 본문이 아니라 메타데이터만 저장합니다.
- 프록시/터널 사용 시 `NEXT_PUBLIC_APP_URL`을 실제 도메인으로 설정하세요.

## Release

릴리즈 정책/체크리스트는 `/Users/hanbim/Development/fileyo-workspace/fileyo/RELEASE.md`를 참고하세요.

## Contributing

- PR 템플릿과 이슈 템플릿을 사용합니다.
- 커밋 메시지는 Conventional Commits 스타일을 권장합니다.
