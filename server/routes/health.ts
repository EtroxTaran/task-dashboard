import { Hono } from 'hono'

const health = new Hono()

const startTime = Date.now()

health.get('/health', (c) => {
  return c.json({
    status: 'ok',
    uptime: Math.round((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
  })
})

export default health
