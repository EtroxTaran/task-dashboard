import { Hono } from 'hono'
import { getActiveSessions } from '../services/sessions.ts'

const tasks = new Hono()

tasks.get('/tasks', async (c) => {
  const sessions = await getActiveSessions()
  return c.json({ tasks: sessions, count: sessions.length })
})

export default tasks
