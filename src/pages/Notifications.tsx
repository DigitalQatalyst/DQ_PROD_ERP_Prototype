import { Bell, CheckCircle, AlertTriangle, Info, Activity, Clock } from 'lucide-react'
import RequestIDTag from '../components/RequestIDTag'
import { useToast } from '../components/Toast'

type NType = 'approval' | 'clarification' | 'sync' | 'deadline' | 'system'

interface Notif {
  id: string
  type: NType
  title: string
  body: string
  linkedRef?: string
  time: string
  read: boolean
}

const notifications: Notif[] = [
  { id: 'N-001', type: 'approval', title: 'Approval required: REQ-2025-0047', body: 'Invoice payment of AED 90,000 to Mazrui Holdings requires your approval. Due 28 May 2026.', linkedRef: 'REQ-2025-0047', time: '19 May 2026 09:00', read: false },
  { id: 'N-002', type: 'clarification', title: 'Clarification requested on REQ-2025-0046', body: 'Sara Pereira has requested a per-diem breakdown for the Kenya team travel claim. 4 days overdue.', linkedRef: 'REQ-2025-0046', time: '18 May 2026 11:00', read: false },
  { id: 'N-003', type: 'sync', title: 'BC sync failed: VND-004 (Anthropic)', body: 'Vendor sync to Business Central failed — missing VAT registration field. 3 retry attempts. Action required.', linkedRef: 'SYNC-003', time: '17 May 2026 09:15', read: false },
  { id: 'N-004', type: 'deadline', title: 'Subscription renewal urgent: Loom Business', body: 'Loom Business (AED 4,100/yr) renews in 7 days. Auto-renew is OFF. Approve renewal or cancel before 27 May 2026.', linkedRef: 'SUB-005', time: '20 May 2026 08:00', read: false },
  { id: 'N-005', type: 'approval', title: 'Request approved: REQ-2025-0043', body: 'Invoice payment to Anthropic (AED 12,400) has been approved by Mohammed Rashid. BC sync complete: BC-INV-48821.', linkedRef: 'REQ-2025-0043', time: '18 May 2026 11:42', read: true },
  { id: 'N-006', type: 'system', title: 'PRJ-2403 budget overage alert', body: 'Client: Noor Retail DXP is tracking AED 45,000 over budget. A budget amendment request has been drafted by Mohammed Rashid.', linkedRef: 'REQ-2025-0048', time: '18 May 2026 10:30', read: true },
  { id: 'N-007', type: 'deadline', title: 'Anthropic API Credits renewal: 13 days', body: 'Anthropic API Credits (AED 42,000/yr) renews 1 Jun 2026. Auto-renew is OFF. Approval required before renewal date.', linkedRef: 'SUB-003', time: '20 May 2026 08:00', read: true },
]

const iconMap: Record<NType, React.ReactNode> = {
  approval: <CheckCircle size={18} className="text-dq-navy" strokeWidth={1.5} />,
  clarification: <AlertTriangle size={18} className="text-status-warning" strokeWidth={1.5} />,
  sync: <Activity size={18} className="text-status-error" strokeWidth={1.5} />,
  deadline: <Clock size={18} className="text-dq-orange" strokeWidth={1.5} />,
  system: <Info size={18} className="text-status-info" strokeWidth={1.5} />,
}

const bgMap: Record<NType, string> = {
  approval: 'bg-navy-50',
  clarification: 'bg-status-warning-surface',
  sync: 'bg-status-error-surface',
  deadline: 'bg-orange-50',
  system: 'bg-status-info-surface',
}

export default function Notifications() {
  const { showToast } = useToast()
  const unread = notifications.filter(n => !n.read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
        <button
          onClick={() => showToast('All notifications marked as read.', 'success')}
          className="text-sm font-medium text-dq-orange hover:underline"
        >
          Mark all read
        </button>
      </div>
      <p className="text-sm text-text-muted mb-6">{unread} unread · {notifications.length} total</p>

      <div className="space-y-2">
        {notifications.map((n) => (
          <div key={n.id}
            className={`flex items-start gap-4 p-5 rounded-card border shadow-sm transition-shadow hover:shadow-md ${
              n.read ? 'bg-white border-border-subtle' : 'bg-white border-dq-orange/20'
            }`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${bgMap[n.type]}`}>
              {iconMap[n.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`text-sm font-semibold ${n.read ? 'text-text-secondary' : 'text-text-primary'}`}>{n.title}</p>
                {!n.read && <div className="w-2 h-2 rounded-full bg-dq-orange shrink-0 mt-1.5" />}
              </div>
              <p className="text-sm text-text-muted leading-relaxed mt-0.5">{n.body}</p>
              <div className="flex items-center gap-3 mt-2">
                {n.linkedRef && <RequestIDTag id={n.linkedRef} />}
                <span className="text-xs text-text-disabled">{n.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
