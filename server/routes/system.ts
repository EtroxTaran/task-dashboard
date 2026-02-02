import { Hono } from 'hono'
import { getSystemInfo } from '../services/system-info.ts'

const system = new Hono()

system.get('/system', async (c) => {
  const info = await getSystemInfo()
  return c.json(info)
})

export default system
