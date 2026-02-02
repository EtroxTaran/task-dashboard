import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import type { AgentStatusResponse, TaskResponse, MemoryResponse, SystemResponse, CalendarResponse } from '../lib/api'
import { useWebSocket } from '../hooks/useWebSocket'
import { LcarsHeader } from '../components/lcars/LcarsHeader'
import { LcarsBar } from '../components/lcars/LcarsBar'
import { AgentStatus } from '../components/panels/AgentStatus'
import { ActiveTasks } from '../components/panels/ActiveTasks'
import { MemoryHealth } from '../components/panels/MemoryHealth'
import { Calendar } from '../components/panels/Calendar'
import { SystemResources } from '../components/panels/SystemResources'
import { QuickActions } from '../components/panels/QuickActions'

const REFETCH_INTERVAL = 10_000

export function Dashboard() {
  const { connected } = useWebSocket()

  const agentQuery = useQuery<AgentStatusResponse>({
    queryKey: ['agent-status'],
    queryFn: api.agentStatus,
    refetchInterval: REFETCH_INTERVAL,
  })

  const tasksQuery = useQuery<TaskResponse>({
    queryKey: ['tasks'],
    queryFn: api.tasks,
    refetchInterval: REFETCH_INTERVAL,
  })

  const memoryQuery = useQuery<MemoryResponse>({
    queryKey: ['memory'],
    queryFn: api.memory,
    refetchInterval: REFETCH_INTERVAL,
  })

  const systemQuery = useQuery<SystemResponse>({
    queryKey: ['system'],
    queryFn: api.system,
    refetchInterval: REFETCH_INTERVAL,
  })

  const calendarQuery = useQuery<CalendarResponse>({
    queryKey: ['calendar'],
    queryFn: api.calendar,
    refetchInterval: REFETCH_INTERVAL,
  })

  return (
    <div className="min-h-screen flex flex-col lcars-scanline">
      {/* Header */}
      <LcarsHeader title="LCARS TASK MONITOR" connected={connected} />

      <LcarsBar className="mx-4 mt-2" />

      {/* Dashboard Grid */}
      <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div data-testid="panel-agent-status">
          <AgentStatus data={agentQuery.data} />
        </div>
        <div data-testid="panel-active-tasks">
          <ActiveTasks data={tasksQuery.data} />
        </div>
        <div data-testid="panel-memory-health">
          <MemoryHealth data={memoryQuery.data} />
        </div>
        <div data-testid="panel-calendar">
          <Calendar data={calendarQuery.data} />
        </div>
        <div data-testid="panel-system-resources">
          <SystemResources data={systemQuery.data} />
        </div>
        <div data-testid="panel-quick-actions">
          <QuickActions />
        </div>
      </main>

      {/* Footer */}
      <footer className="lcars-footer px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 bg-lcars-blue rounded-l-full opacity-60" />
          <span className="text-[10px] text-lcars-muted tracking-wider">STARDATE {new Date().toISOString().split('T')[0]}</span>
        </div>
        <div className="text-[10px] font-lcars-data text-lcars-muted">
          {new Date().toLocaleTimeString('de-DE')}
        </div>
      </footer>
    </div>
  )
}
