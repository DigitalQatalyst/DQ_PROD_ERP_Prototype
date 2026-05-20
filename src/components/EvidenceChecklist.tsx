import { CheckCircle, Circle, Upload } from 'lucide-react'
import type { EvidenceItem } from '../types'

interface Props {
  items: EvidenceItem[]
}

export default function EvidenceChecklist({ items }: Props) {
  if (!items || items.length === 0) {
    return <p className="text-text-muted text-sm">No evidence required.</p>
  }
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-3">
          {item.checked ? (
            <CheckCircle size={16} className="text-status-success shrink-0" strokeWidth={1.5} />
          ) : (
            <Circle size={16} className="text-icon-muted shrink-0" strokeWidth={1.5} />
          )}
          <span className="text-sm text-text-primary flex-1">
            {item.label}
            {item.required && (
              <span className="text-text-muted ml-1">(Required)</span>
            )}
          </span>
          {!item.checked && (
            <button className="text-dq-orange text-xs font-medium flex items-center gap-1 hover:underline">
              <Upload size={12} strokeWidth={1.5} />
              Upload
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
