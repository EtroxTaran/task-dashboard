const BASE_URL = '/api'

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export interface HealthResponse {
  status: string
  uptime: number
  timestamp: string
}

export interface AgentStatusResponse {
  active: boolean
  model: string
  sessionCount: number
  activeSessionCount: number
  lastActivity: string | null
  uptime: number
}

export interface TaskResponse {
  tasks: Array<{
    id: string
    name: string
    startTime: string
    duration: number
    status: 'active' | 'completed'
  }>
  count: number
}

export interface MemoryResponse {
  fileCount: number
  totalSizeBytes: number
  lastUpdate: string | null
  files: Array<{ name: string; size: number; modified: string }>
}

export interface SystemResponse {
  cpu: { model: string; cores: number; loadAvg: number[]; usagePercent: number }
  memory: { totalBytes: number; freeBytes: number; usedBytes: number; usagePercent: number }
  disk: { filesystem: string; size: string; used: string; available: string; usagePercent: number; mountpoint: string }
  uptime: number
  hostname: string
  platform: string
}

export interface CalendarResponse {
  events: Array<{ title: string; date: string; time: string | null; source: string }>
}

export const api = {
  health: () => fetchJson<HealthResponse>('/health'),
  agentStatus: () => fetchJson<AgentStatusResponse>('/agent/status'),
  tasks: () => fetchJson<TaskResponse>('/tasks'),
  memory: () => fetchJson<MemoryResponse>('/memory'),
  system: () => fetchJson<SystemResponse>('/system'),
  calendar: () => fetchJson<CalendarResponse>('/calendar'),
}
