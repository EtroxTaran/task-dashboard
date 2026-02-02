interface LcarsBadgeProps {
  label: string
  variant?: 'amber' | 'orange' | 'blue' | 'success' | 'danger' | 'warning'
}

const variantClasses = {
  amber: 'bg-lcars-amber text-lcars-bg',
  orange: 'bg-lcars-orange text-lcars-bg',
  blue: 'bg-lcars-blue text-lcars-text',
  success: 'bg-lcars-success text-lcars-bg',
  danger: 'bg-lcars-danger text-lcars-bg',
  warning: 'bg-lcars-warning text-lcars-bg',
} as const

export function LcarsBadge({ label, variant = 'amber' }: LcarsBadgeProps) {
  return (
    <span className={`inline-block rounded-l-full rounded-r-sm px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${variantClasses[variant]}`}>
      {label}
    </span>
  )
}
