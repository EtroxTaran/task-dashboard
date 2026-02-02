import { LcarsPanel } from '../lcars/LcarsPanel'

interface MemoryData {
  fileCount: number
  totalSizeBytes: number
  lastUpdate: string | null
  files: Array<{ name: string; size: number; modified: string }>
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function formatTime(iso: string | null): string {
  if (!iso) return 'N/A'
  return new Date(iso).toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  })
}

export function MemoryHealth({ data }: { data?: MemoryData }) {
  const mem = data ?? { fileCount: 0, totalSizeBytes: 0, lastUpdate: null, files: [] }
  // Estimate usage as percentage of a 1MB soft cap
  const usagePercent = Math.min(100, (mem.totalSizeBytes / (1024 * 1024)) * 100)

  return (
    <LcarsPanel title="Memory Health" color="bg-lcars-purple">
      <div className="space-y-3">
        {/* File count */}
        <div className="flex justify-between text-xs">
          <span className="text-lcars-muted">FILES</span>
          <span className="font-lcars-data text-lcars-amber">{mem.fileCount}</span>
        </div>

        {/* Total size */}
        <div className="flex justify-between text-xs">
          <span className="text-lcars-muted">TOTAL SIZE</span>
          <span className="font-lcars-data">{formatBytes(mem.totalSizeBytes)}</span>
        </div>

        {/* Usage bar */}
        <div>
          <div className="flex justify-between text-[10px] text-lcars-muted mb-1">
            <span>USAGE</span>
            <span>{usagePercent.toFixed(0)}%</span>
          </div>
          <div className="lcars-progress">
            <div
              className="lcars-progress-fill"
              style={{
                width: `${usagePercent}%`,
                background: usagePercent > 80 ? 'var(--color-lcars-danger)' : 'var(--color-lcars-purple)',
              }}
            />
          </div>
        </div>

        {/* Last update */}
        <div className="flex justify-between text-xs">
          <span className="text-lcars-muted">LAST UPDATE</span>
          <span className="font-lcars-data text-xs">{formatTime(mem.lastUpdate)}</span>
        </div>

        {/* Recent files */}
        <div className="text-[10px] text-lcars-muted">
          {mem.files.slice(0, 3).map(f => (
            <div key={f.name} className="flex justify-between py-0.5">
              <span className="truncate max-w-[60%]">{f.name}</span>
              <span className="font-lcars-data">{formatBytes(f.size)}</span>
            </div>
          ))}
        </div>
      </div>
    </LcarsPanel>
  )
}
