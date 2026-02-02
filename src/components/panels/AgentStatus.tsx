import { LcarsPanel } from '../lcars/LcarsPanel'
import { LcarsBadge } from '../lcars/LcarsBadge'

interface AgentData {
  active: boolean
  model: string
  sessionCount: number
  activeSessionCount: number
  lastActivity: string | null
  uptime: number
}

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return `${h}h ${m}m`
}

function formatTime(iso: string | null): string {
  if (!iso) return 'N/A'
  return new Date(iso).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function AgentStatus({ data }: { data?: AgentData }) {
  const agent = data ?? { active: false, model: '—', sessionCount: 0, activeSessionCount: 0, lastActivity: null, uptime: 0 }

  return (
    <LcarsPanel title="Agent Status" color="bg-lcars-success" data-testid="panel-agent">
      <div className="space-y-3">
        {/* Heartbeat */}
        <div className="flex items-center gap-3">
          <div className={agent.active ? 'lcars-heartbeat' : 'lcars-heartbeat-inactive'} />
          <span className="text-sm font-lcars-data">
            {agent.active ? 'ACTIVE' : 'INACTIVE'}
          </span>
          <LcarsBadge label={agent.active ? 'online' : 'offline'} variant={agent.active ? 'success' : 'danger'} />
        </div>

        {/* Model */}
        <div className="flex justify-between text-xs">
          <span className="text-lcars-muted">MODEL</span>
          <span className="font-lcars-data text-lcars-amber">{agent.model}</span>
        </div>

        {/* Sessions */}
        <div className="flex justify-between text-xs">
          <span className="text-lcars-muted">SESSIONS</span>
          <span className="font-lcars-data">
            {agent.activeSessionCount} active / {agent.sessionCount} total
          </span>
        </div>

        {/* Last Activity */}
        <div className="flex justify-between text-xs">
          <span className="text-lcars-muted">LAST ACTIVITY</span>
          <span className="font-lcars-data">{formatTime(agent.lastActivity)}</span>
        </div>

        {/* Uptime */}
        <div className="flex justify-between text-xs">
          <span className="text-lcars-muted">UPTIME</span>
          <span className="font-lcars-data">{formatUptime(agent.uptime)}</span>
        </div>
      </div>
    </LcarsPanel>
  )
}
