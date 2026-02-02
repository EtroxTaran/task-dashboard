import { LcarsPanel } from '../lcars/LcarsPanel'
import { LcarsButton } from '../lcars/LcarsButton'

export function QuickActions() {
  return (
    <LcarsPanel title="Quick Actions" color="bg-lcars-orange">
      <div className="grid grid-cols-2 gap-2">
        <LcarsButton variant="amber" aria-label="Refresh dashboard data">
          REFRESH
        </LcarsButton>
        <LcarsButton variant="blue" aria-label="View system logs">
          LOGS
        </LcarsButton>
        <LcarsButton variant="orange" aria-label="Memory flush">
          MEM FLUSH
        </LcarsButton>
        <LcarsButton variant="success" aria-label="Run health check">
          HEALTH CHK
        </LcarsButton>
      </div>
      <div className="text-[10px] text-lcars-muted mt-3">
        Actions are placeholders for future functionality
      </div>
    </LcarsPanel>
  )
}
