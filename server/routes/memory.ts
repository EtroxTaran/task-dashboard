import { Hono } from 'hono'
import { scanMemory } from '../services/memory-scanner.ts'

const memory = new Hono()

memory.get('/memory', async (c) => {
  const stats = await scanMemory()
  return c.json(stats)
})

export default memory
