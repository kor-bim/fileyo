# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Fileyo — a Next.js 16 application using React 19, TypeScript, and Tailwind CSS v4.

## Commands

```bash
bun dev          # Dev server with Turbopack (port 3000)
bun run build    # Production build
bun run start    # Production server
bun run lint     # ESLint
bun run format   # Prettier (src/**/*.{ts,tsx,js,jsx})
```

## Architecture

- **App Router** (`src/app/`) — server components by default, `'use client'` only when needed
- **Providers** (`src/app/providers.tsx`) — client-side provider wrapper rendered in root layout
- **Language**: Korean (`lang="ko"` on html element)
- **Fonts**: Product Sans (self-hosted in `public/fonts/`, declared in `public/fonts.css`)

### Path Aliases

- `@/*` → `./src/*`
- `@public/*` → `./public/*`

## Code Style

- No semicolons, single quotes, no trailing commas (Prettier enforced via ESLint)
- 120 char line width, 2-space indentation
- Props use `Readonly<>` wrapper for type definitions
- Tailwind utility classes preferred over custom CSS
