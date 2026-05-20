import type { RequestStatus } from '../types'

interface Props {
  status: RequestStatus | string
  size?: 'sm' | 'md'
}

const variants: Record<string, string> = {
  'Draft': 'bg-border-default text-text-secondary',
  'Submitted': 'bg-status-info-surface text-status-info-text',
  'In Review': 'bg-status-warning-surface text-status-warning-text',
  'Approved': 'bg-status-success-surface text-status-success-text',
  'Clarification Needed': 'bg-orange-50 text-dq-orange',
  'Evidence Pending': 'bg-status-warning-surface text-status-warning-text',
  'Rejected': 'bg-status-error-surface text-status-error-text',
  'Fulfilled': 'bg-status-success-surface text-status-success-text',
  'Pending Approval': 'bg-navy-50 text-dq-navy',
  'High Value': 'bg-dq-orange text-white',
  'Synced': 'bg-status-success-surface text-status-success-text',
  'Failed': 'bg-status-error-surface text-status-error-text',
  'Not Synced': 'bg-border-default text-text-secondary',
  'Pending': 'bg-status-warning-surface text-status-warning-text',
  'Healthy': 'bg-status-success-surface text-status-success-text',
  'High': 'bg-dq-orange text-white',
  'Warning': 'bg-status-warning-surface text-status-warning-text',
  'Low': 'bg-border-default text-text-secondary',
}

export default function StatusBadge({ status, size = 'md' }: Props) {
  const cls = variants[status] ?? 'bg-border-default text-text-secondary'
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-[12px]'
  return (
    <span
      className={`inline-flex items-center rounded-pill px-2.5 py-0.5 font-medium whitespace-nowrap ${textSize} ${cls}`}
      style={{ fontWeight: 500 }}
    >
      {status}
    </span>
  )
}
