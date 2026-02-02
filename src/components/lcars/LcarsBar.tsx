interface LcarsBarProps {
  direction?: 'horizontal' | 'vertical'
  color?: string
  className?: string
}

export function LcarsBar({ direction = 'horizontal', color = 'bg-lcars-amber', className = '' }: LcarsBarProps) {
  const base = direction === 'horizontal'
    ? 'h-1 w-full rounded-l-full'
    : 'w-1 h-full rounded-t-full'

  return <div className={`${base} ${color} opacity-60 ${className}`} />
}
