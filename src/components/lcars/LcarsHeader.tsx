interface LcarsHeaderProps {
  title: string
  connected: boolean
}

export function LcarsHeader({ title, connected }: LcarsHeaderProps) {
  return (
    <header className="lcars-header px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-8 bg-lcars-orange rounded-l-full opacity-80" />
        <h1 className="text-xl font-bold tracking-[0.2em] text-lcars-bg uppercase">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-lcars-data text-lcars-bg opacity-70">
          {connected ? 'CONNECTED' : 'OFFLINE'}
        </span>
        <div className={connected ? 'lcars-heartbeat' : 'lcars-heartbeat-inactive'} />
        <div className="w-12 h-8 bg-lcars-amber rounded-r-sm opacity-60" />
      </div>
    </header>
  )
}
