import type { ReactNode } from 'react'

interface Props {
  label: string
  value: string | number
  sub?: string
  icon?: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'mono' | 'info'
  trend?: 'up' | 'down'
}

const valueColour: Record<NonNullable<Props['variant']>, string> = {
  default: 'text-dq-navy',
  success: 'text-status-success-text',
  warning: 'text-status-warning-text',
  error: 'text-status-error-text',
  mono: 'text-dq-orange font-mono',
  info: 'text-status-info-text',
}

export default function KPICard({ label, value, sub, icon, variant = 'default', trend }: Props) {
  const vc = valueColour[variant]
  return (
    <div
      className="bg-surface-1 rounded-card p-6 shadow-sm flex flex-col gap-2 card-hover"
    >
      <div className="flex items-start justify-between">
        <span className="text-[12px] font-medium text-text-muted uppercase tracking-wider">{label}</span>
        {icon && <span className="text-icon-muted">{icon}</span>}
      </div>
      <div className={`text-[28px] font-bold tabular-nums leading-none ${vc}`}
           style={{ fontFeatureSettings: "'tnum' on, 'lnum' on" }}>
        {value}
      </div>
      {sub && (
        <span className="text-[12px] text-text-muted">{sub}</span>
      )}
      {trend && (
        <span className={trend === 'up' ? 'text-status-error text-xs' : 'text-status-success text-xs'}>
          {trend === 'up' ? '↑' : '↓'}
        </span>
      )}
    </div>
  )
}
