import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'

const SESSIONS_DIR = path.join(os.homedir(), '.openclaw', 'agents', 'main', 'sessions')

export interface AgentSession {
  id: string
  name: string
  startTime: string
  duration: number
  status: 'active' | 'completed'
}

export interface AgentStatus {
  active: boolean
  model: string
  sessionCount: number
  activeSessionCount: number
  lastActivity: string | null
  uptime: number
}

function extractSessionName(id: string): string {
  return id.substring(0, 8)
}

export async function getActiveSessions(): Promise<AgentSession[]> {
  try {
    const entries = await fs.readdir(SESSIONS_DIR)
    const sessions: AgentSession[] = []
    const now = Date.now()

    for (const entry of entries) {
      if (!entry.endsWith('.jsonl') || entry.includes('.deleted')) continue

      try {
        const filePath = path.join(SESSIONS_DIR, entry)
        const stat = await fs.stat(filePath)
        const id = entry.replace('.jsonl', '')
        const startMs = stat.birthtimeMs || stat.ctimeMs
        const duration = Math.round((now - startMs) / 1000)

        sessions.push({
          id,
          name: `Session ${extractSessionName(id)}`,
          startTime: new Date(startMs).toISOString(),
          duration,
          status: 'active',
        })
      } catch {
        // Skip unreadable files
      }
    }

    return sessions.sort((a, b) =>
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    )
  } catch {
    return []
  }
}

export async function getAgentStatus(): Promise<AgentStatus> {
  try {
    const entries = await fs.readdir(SESSIONS_DIR)
    let latestMtime = 0
    let totalSessions = 0
    let activeSessions = 0

    for (const entry of entries) {
      if (!entry.endsWith('.jsonl')) continue

      totalSessions++
      const isActive = !entry.includes('.deleted')
      if (isActive) activeSessions++

      try {
        const filePath = path.join(SESSIONS_DIR, entry)
        const stat = await fs.stat(filePath)
        if (stat.mtimeMs > latestMtime) {
          latestMtime = stat.mtimeMs
        }
      } catch {
        // Skip
      }
    }

    const model = process.env['OPENCLAW_MODEL'] || 'claude-opus-4-5'

    return {
      active: activeSessions > 0,
      model,
      sessionCount: totalSessions,
      activeSessionCount: activeSessions,
      lastActivity: latestMtime > 0 ? new Date(latestMtime).toISOString() : null,
      uptime: process.uptime(),
    }
  } catch {
    return {
      active: false,
      model: 'claude-opus-4-5',
      sessionCount: 0,
      activeSessionCount: 0,
      lastActivity: null,
      uptime: process.uptime(),
    }
  }
}
