import { Hono } from 'hono'
import { getUpcomingEvents } from '../services/calendar.ts'

const calendar = new Hono()

calendar.get('/calendar', async (c) => {
  const events = await getUpcomingEvents()
  return c.json({ events })
})

export default calendar
