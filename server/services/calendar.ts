import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'

const MEMORY_DIR = path.join(os.homedir(), '.openclaw', 'workspace', 'memory')

export interface CalendarEvent {
  title: string
  date: string
  time: string | null
  source: string
}

const DATE_PATTERN = /(\d{4}-\d{2}-\d{2})(?:\s+(?:um\s+)?(\d{1,2}:\d{2}))?[:\s]+(.+)/g
const EVENT_KEYWORDS = ['termin', 'event', 'meeting', 'call', 'appointment', 'deadline', 'kalender']

export async function getUpcomingEvents(): Promise<CalendarEvent[]> {
  const events: CalendarEvent[] = []
  const now = new Date()
  const today = now.toISOString().split('T')[0]

  try {
    const entries = await fs.readdir(MEMORY_DIR)

    for (const entry of entries) {
      if (!entry.endsWith('.md')) continue

      try {
        const filePath = path.join(MEMORY_DIR, entry)
        const content = await fs.readFile(filePath, 'utf-8')
        const lines = content.split('\n')

        for (const line of lines) {
          const lower = line.toLowerCase()
          const hasKeyword = EVENT_KEYWORDS.some(kw => lower.includes(kw))

          if (!hasKeyword) continue

          let match
          DATE_PATTERN.lastIndex = 0
          while ((match = DATE_PATTERN.exec(line)) !== null) {
            const [, date, time, title] = match
            if (date && title && date >= (today ?? '')) {
              events.push({
                title: title.trim(),
                date,
                time: time ?? null,
                source: entry,
              })
            }
          }
        }
      } catch {
        // Skip unreadable files
      }
    }
  } catch {
    // Memory directory not accessible
  }

  // Sort by date, return top 3
  events.sort((a, b) => a.date.localeCompare(b.date))

  if (events.length === 0) {
    return [
      { title: 'No upcoming events found', date: today ?? new Date().toISOString().split('T')[0] ?? '', time: null, source: 'system' },
    ]
  }

  return events.slice(0, 3)
}
