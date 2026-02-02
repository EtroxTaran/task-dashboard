import { LcarsPanel } from '../lcars/LcarsPanel'
import { LcarsBadge } from '../lcars/LcarsBadge'

interface Task {
  id: string
  name: string
  startTime: string
  duration: number
  status: 'active' | 'completed'
}

interface TasksData {
  tasks: Task[]
  count: number
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return `${h}h ${m}m`
}

export function ActiveTasks({ data }: { data?: TasksData }) {
  const tasks = data?.tasks ?? []

  return (
    <LcarsPanel title="Active Tasks" color="bg-lcars-orange">
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="text-xs text-lcars-muted py-2">No active tasks</div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 py-1.5 border-b border-lcars-dark-2/50 last:border-0">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-lcars-data text-lcars-text truncate">
                  {task.name}
                </div>
                <div className="text-[10px] text-lcars-muted font-lcars-data mt-0.5">
                  {formatDuration(task.duration)}
                </div>
              </div>
              <LcarsBadge label={task.status} variant={task.status === 'active' ? 'success' : 'amber'} />
              {/* Progress indicator */}
              <div className="w-16 lcars-progress">
                <div
                  className="lcars-progress-fill bg-lcars-orange"
                  style={{ width: `${Math.min(100, (task.duration / 3600) * 100)}%` }}
                />
              </div>
            </div>
          ))
        )}
        <div className="text-[10px] text-lcars-muted pt-1">
          {tasks.length} task{tasks.length !== 1 ? 's' : ''} running
        </div>
      </div>
    </LcarsPanel>
  )
}
