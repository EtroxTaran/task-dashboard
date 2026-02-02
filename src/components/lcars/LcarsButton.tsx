import type { ButtonHTMLAttributes } from 'react'

interface LcarsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'amber' | 'orange' | 'blue' | 'success'
}

const variantClasses = {
  amber: 'bg-lcars-amber text-lcars-bg hover:bg-lcars-amber/80',
  orange: 'bg-lcars-orange text-lcars-bg hover:bg-lcars-orange/80',
  blue: 'bg-lcars-blue text-lcars-text hover:bg-lcars-blue/80',
  success: 'bg-lcars-success text-lcars-bg hover:bg-lcars-success/80',
} as const

export function LcarsButton({ variant = 'amber', className = '', children, ...props }: LcarsButtonProps) {
  return (
    <button
      className={`lcars-button ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
