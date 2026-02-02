import { LcarsPanel } from '../lcars/LcarsPanel'

interface SystemData {
  cpu: {
    model: string
    cores: number
    loadAvg: number[]
    usagePercent: number
  }
  memory: {
    totalBytes: number
    freeBytes: number
    usedBytes: number
    usagePercent: number
  }
  disk: {
    size: string
    used: string
    available: string
    usagePercent: number
  }
  uptime: number
  hostname: string
  platform: string
}

function formatBytes(bytes: number): string {
  const gb = bytes / (1024 * 1024 * 1024)
  if (gb >= 1) return `${gb.toFixed(1)} GB`
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(0)} MB`
}

function getBarColor(percent: number): string {
  if (percent >= 90) return 'var(--color-lcars-danger)'
  if (percent >= 70) return 'var(--color-lcars-warning)'
  return 'var(--color-lcars-amber)'
}

function ResourceBar({ label, percent, detail }: { label: string; percent: number; detail: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-lcars-muted">{label}</span>
        <span className="font-lcars-data">{percent}%</span>
      </div>
      <div className="lcars-progress">
        <div
          className="lcars-progress-fill"
          style={{ width: `${percent}%`, background: getBarColor(percent) }}
        />
      </div>
      <div className="text-[10px] text-lcars-muted font-lcars-data">{detail}</div>
    </div>
  )
}

export function SystemResources({ data }: { data?: SystemData }) {
  const sys = data ?? {
    cpu: { model: '—', cores: 0, loadAvg: [0, 0, 0], usagePercent: 0 },
    memory: { totalBytes: 0, freeBytes: 0, usedBytes: 0, usagePercent: 0 },
    disk: { size: '0', used: '0', available: '0', usagePercent: 0 },
    uptime: 0, hostname: '—', platform: '—',
  }

  return (
    <LcarsPanel title="System Resources" color="bg-lcars-amber">
      <div className="space-y-3">
        <ResourceBar
          label="CPU"
          percent={sys.cpu.usagePercent}
          detail={`${sys.cpu.cores} cores · load ${sys.cpu.loadAvg.map(l => l.toFixed(1)).join(' ')}`}
        />
        <ResourceBar
          label="MEMORY"
          percent={sys.memory.usagePercent}
          detail={`${formatBytes(sys.memory.usedBytes)} / ${formatBytes(sys.memory.totalBytes)}`}
        />
        <ResourceBar
          label="DISK"
          percent={sys.disk.usagePercent}
          detail={`${sys.disk.used} / ${sys.disk.size}`}
        />

        <div className="flex justify-between text-[10px] text-lcars-muted pt-1">
          <span>{sys.hostname}</span>
          <span className="font-lcars-data">{sys.platform}</span>
        </div>
      </div>
    </LcarsPanel>
  )
}
