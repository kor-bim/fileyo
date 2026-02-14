# Release Guide

## Versioning

- `MAJOR`: 하위 호환이 깨지는 변경
- `MINOR`: 하위 호환 유지 기능 추가
- `PATCH`: 버그 수정

## Pre-release Checklist

1. `bun run lint`
2. `bun run build`
3. peer 서버 연동 확인 (`/room/[roomId]`, `/r/[roomId]`)
4. Redis 연결 확인
5. 도메인 환경에서 링크/QR 동작 확인

## Tag and Release

```bash
git checkout main
git pull --ff-only
git tag -a vX.Y.Z -m "release: vX.Y.Z"
git push origin main
git push origin vX.Y.Z
```

## Release Notes Template

- Added: 사용자 기능 추가 사항
- Changed: 기존 동작 변경 사항
- Fixed: 버그 수정 사항
- Infra: 배포/운영 변경 사항
