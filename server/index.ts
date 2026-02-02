import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { createNodeWebSocket } from '@hono/node-ws'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

import health from './routes/health.ts'
import agent from './routes/agent.ts'
import tasks from './routes/tasks.ts'
import memory from './routes/memory.ts'
import system from './routes/system.ts'
import calendar from './routes/calendar.ts'

import { getSystemInfo } from './services/system-info.ts'
import { getAgentStatus, getActiveSessions } from './services/sessions.ts'
import { scanMemory } from './services/memory-scanner.ts'
import { getUpcomingEvents } from './services/calendar.ts'

const app = new Hono()
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })

const isProduction = process.env.NODE_ENV === 'production' ||
  existsSync(resolve(import.meta.dirname, '..', 'dist', 'index.html'))

// Middleware
app.use('/api/*', cors())

// API routes
app.route('/api', health)
app.route('/api', agent)
app.route('/api', tasks)
app.route('/api', memory)
app.route('/api', system)
app.route('/api', calendar)

// Collect all dashboard data
async function collectAllData() {
  const [systemInfo, agentStatus, activeTasks, memoryStats, calendarEvents] = await Promise.all([
    getSystemInfo(),
    getAgentStatus(),
    getActiveSessions(),
    scanMemory(),
    getUpcomingEvents(),
  ])

  return {
    system: systemInfo,
    agent: agentStatus,
    tasks: { tasks: activeTasks, count: activeTasks.length },
    memory: memoryStats,
    calendar: { events: calendarEvents },
    timestamp: new Date().toISOString(),
  }
}

// WebSocket for real-time updates
const wsClients = new Set<{ send: (data: string) => void; close: () => void }>()

app.get(
  '/ws',
  upgradeWebSocket(() => {
    return {
      onOpen(_event, ws) {
        wsClients.add(ws)
        // Send initial data
        collectAllData()
          .then(data => ws.send(JSON.stringify(data)))
          .catch(() => { /* ignore send errors */ })
      },
      onClose(_event, ws) {
        wsClients.delete(ws)
      },
    }
  })
)

// Serve static frontend in production
if (isProduction) {
  // Serve static assets from dist/
  app.use('/*', serveStatic({ root: './dist' }))

  // SPA fallback: serve index.html for any non-API, non-WS route
  app.get('*', serveStatic({ root: './dist', path: 'index.html' }))

  console.log('📦 Production mode: serving static frontend from dist/')
}

// Push updates to all WebSocket clients every 5 seconds
setInterval(async () => {
  if (wsClients.size === 0) return

  try {
    const data = await collectAllData()
    const payload = JSON.stringify(data)
    for (const client of wsClients) {
      try {
        client.send(payload)
      } catch {
        wsClients.delete(client)
      }
    }
  } catch {
    // Ignore collection errors
  }
}, 5000)

const PORT = 3333

const server = serve({
  fetch: app.fetch,
  port: PORT,
  hostname: '0.0.0.0',
}, (info) => {
  console.log(`🖖 LCARS Task Dashboard API running on http://0.0.0.0:${info.port}`)
})

injectWebSocket(server)
