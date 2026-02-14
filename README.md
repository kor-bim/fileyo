# Fileyo

Fileyo는 브라우저 간 파일 공유를 제공하는 웹 애플리케이션입니다.  
기본 전송 경로는 WebRTC DataChannel(P2P)이며, 연결 실패 시 WebSocket 릴레이로 폴백합니다.

## 핵심 기능

- 방 생성/입장 기반 파일 공유
- 다중 파일 업로드/다운로드
- 방 비밀번호 보호(bcrypt 해시 저장)
- QR 코드 링크 공유
- 파일 목록 실시간 동기화
- WebRTC 실패 시 릴레이 폴백

## 기술 스택

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 + shadcn UI
- PeerJS + WebRTC DataChannel
- 별도 PeerJS/Relay 서버(`peerjs-server.ts`)
- Redis (방 메타데이터 저장)

## 실행 방법

### 요구사항

- Bun 1.3+
- Node.js 18+
- Redis 인스턴스

### 환경 변수

`.env.local`

```env
REDIS_URL=rediss://your-redis-url
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 개발 실행

Next 앱(3000)과 Peer/Relay 서버(9000/9001)를 함께 실행해야 정상 동작합니다.

```bash
bun install
bun run dev:all
```

개별 실행:

```bash
bun run dev          # Next.js app
bun run dev:peer     # PeerJS + Relay server
```

### 프로덕션 빌드

```bash
bun run build
bun run start
```

## 사용 흐름

1. `/`에서 파일 선택 후 방 생성
2. 호스트 페이지(`/room/[roomId]`)에서 링크/QR 공유
3. 참여자가 `/r/[roomId]`로 접속 후 파일 선택 다운로드

## 아키텍처 요약

- 방 생성/입장/파일목록 메타: Next Server Actions + Redis
- P2P 시그널링: PeerJS 서버(`peerjs-server.ts`, 포트 9000)
- 폴백 경로: Relay WebSocket 서버(`peerjs-server.ts`, 포트 9001)
- 파일 데이터:
  - 1순위 WebRTC DataChannel 직접 전송
  - 실패 시 Relay 경유 전송

## 실제 디렉터리 구조

```text
.
├── peerjs-server.ts
├── src/
│   ├── app/
│   │   ├── actions.ts
│   │   ├── page.tsx
│   │   ├── room/[roomId]/page.tsx
│   │   ├── r/[roomId]/page.tsx
│   │   └── api/rooms/[roomId]/leave/route.ts
│   ├── lib/
│   │   ├── peer-utils.ts
│   │   ├── redis.ts
│   │   └── utils.ts
│   ├── components/ui/
│   └── types/index.ts
└── package.json
```

## 주요 스크립트

```bash
bun run dev
bun run dev:peer
bun run dev:all
bun run build
bun run start
bun run lint
bun run format
```

## 참고 사항

- 호스트가 탭/브라우저를 닫으면 전송이 중단될 수 있습니다.
- `NEXT_PUBLIC_APP_URL`은 공유 링크/QR 생성 기준 URL입니다.
