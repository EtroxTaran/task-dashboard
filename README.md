# 🖖 LCARS Task Dashboard

Real-time task monitoring dashboard with a Star Trek LCARS design system.

![LCARS](https://img.shields.io/badge/Design-LCARS-F5A623)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![Hono](https://img.shields.io/badge/Backend-Hono-orange)
![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB)

## Features

- **Agent Status** — Live heartbeat indicator, current model, session info
- **Active Tasks** — Running sub-agents with duration and progress
- **Memory Health** — File count, total size, usage visualization
- **Calendar** — Upcoming events from memory files
- **System Resources** — CPU, Memory, Disk usage bars
- **Quick Actions** — Placeholder buttons for future operations
- **Real-time Updates** — WebSocket pushes every 5 seconds

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | [Hono](https://hono.dev) on Node.js |
| Frontend | React 19 + TanStack Router + TanStack Query |
| Styling | Tailwind CSS 4 with LCARS theme |
| Real-time | WebSocket via @hono/node-ws |
| Testing | Vitest (unit) + Playwright (E2E) |
| Build | Vite 7 |

## Setup

```bash
# Install dependencies
npm install

# Start dev servers (frontend + backend)
npm run dev

# Frontend: http://localhost:5173
# Backend API: http://localhost:3333
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run dev:server` | Backend only (port 3333) |
| `npm run dev:client` | Frontend only (port 5173) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run typecheck` | TypeScript type checking |
| `npm run lint` | ESLint (zero warnings) |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright E2E tests |
| `npm run quality` | Full quality gate |

## API Endpoints

All endpoints return JSON:

- `GET /api/health` — System health status
- `GET /api/agent/status` — Agent heartbeat and model info
- `GET /api/tasks` — Active sub-agent sessions
- `GET /api/memory` — Memory directory stats
- `GET /api/system` — CPU, RAM, disk usage
- `GET /api/calendar` — Upcoming events
- `WS /ws` — WebSocket for real-time dashboard updates

## LCARS Design System

| Token | Color |
|-------|-------|
| Amber (primary) | `#F5A623` |
| Orange | `#FF9500` |
| Dark Panel | `#1A1A2E` |
| Dark Panel Alt | `#16213E` |
| Accent Blue | `#0F3460` |
| Background | `#0a0a1a` |

Design features:
- Left-side rounded corners (LCARS signature)
- Monospace font for data readouts
- Animated heartbeat pulse
- Subtle scan-line effect
- High contrast dark theme

## License

MIT
