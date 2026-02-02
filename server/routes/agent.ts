import { Hono } from 'hono'
import { getAgentStatus } from '../services/sessions.ts'

const agent = new Hono()

agent.get('/agent/status', async (c) => {
  const status = await getAgentStatus()
  return c.json(status)
})

export default agent
