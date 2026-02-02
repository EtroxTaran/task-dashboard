import type { ReactNode } from 'react'

interface LcarsPanelProps {
  title: string
  color?: string
  children: ReactNode
  className?: string
}

export function LcarsPanel({ title, color = 'bg-lcars-amber', children, className = '' }: LcarsPanelProps) {
  return (
    <div className={`lcars-panel flex flex-col ${className}`} data-testid="lcars-panel">
      {/* Top bar */}
      <div className={`lcars-panel-bar ${color}`} />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-2">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <h2 className="text-xs font-bold uppercase tracking-widest text-lcars-muted">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-4">
        {children}
      </div>

      {/* Bottom bar */}
      <div className={`lcars-panel-bar ${color} opacity-40`} />
    </div>
  )
}
