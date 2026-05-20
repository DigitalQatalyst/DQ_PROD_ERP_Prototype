import { Activity } from 'lucide-react'
import type { BCSyncStatus } from '../types'

interface Props {
  status: BCSyncStatus
  bcRef?: string
}

const variantMap: Record<BCSyncStatus, { bg: string; text: string; dot: string }> = {
  Synced: { bg: 'bg-status-success-surface', text: 'text-status-success-text', dot: 'text-status-success' },
  Failed: { bg: 'bg-status-error-surface', text: 'text-status-error-text', dot: 'text-status-error' },
  Pending: { bg: 'bg-status-warning-surface', text: 'text-status-warning-text', dot: 'text-status-warning' },
  'Not Synced': { bg: 'bg-border-subtle', text: 'text-text-muted', dot: 'text-icon-muted' },
}

export default function BCSyncChip({ status, bcRef }: Props) {
  const v = variantMap[status]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-[11px] font-medium ${v.bg} ${v.text}`}
    >
      <Activity size={10} className={v.dot} strokeWidth={1.5} />
      <span>{status}</span>
      {bcRef && (
        <span className="font-mono ml-0.5 opacity-80">{bcRef}</span>
      )}
    </span>
  )
}
