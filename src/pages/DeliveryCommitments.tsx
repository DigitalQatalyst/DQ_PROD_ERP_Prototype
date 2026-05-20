import { Calendar, CheckCircle, Clock, AlertTriangle, Circle } from 'lucide-react'
import { projects } from '../data/fixtures'
import { useToast } from '../components/Toast'

const commitments = [
  { id: 'DC-001', project: 'PRJ-2403', projectName: 'Client: Noor Retail DXP', deliverable: 'Phase 3: Frontend Build Sprint 1 sign-off', committed: '28 May 2026', linkedAmount: 90000, status: 'In Progress', owner: 'Mohammed Rashid' },
  { id: 'DC-002', project: 'PRJ-2403', projectName: 'Client: Noor Retail DXP', deliverable: 'Phase 4: Integration & UAT', committed: '30 Jun 2026', linkedAmount: 90000, status: 'Scheduled', owner: 'Mohammed Rashid' },
  { id: 'DC-003', project: 'PRJ-2401', projectName: 'DXP Phase 3 Build', deliverable: 'Sprint 4 completion & internal demo', committed: '20 May 2026', linkedAmount: 45000, status: 'Delivered', owner: 'Layla Seitkali' },
  { id: 'DC-004', project: 'PRJ-2401', projectName: 'DXP Phase 3 Build', deliverable: 'Sprint 5: API integration milestone', committed: '10 Jun 2026', linkedAmount: 60000, status: 'Scheduled', owner: 'Layla Seitkali' },
  { id: 'DC-005', project: 'PRJ-2402', projectName: 'DWS.04 Platform Prototype', deliverable: 'High-fidelity prototype v1.0 delivery', committed: '31 May 2026', linkedAmount: 25000, status: 'In Progress', owner: 'Jay Nair' },
  { id: 'DC-006', project: 'PRJ-2405', projectName: 'SDO Design System', deliverable: 'Component library v1.0 public release', committed: '10 Jun 2026', linkedAmount: 25000, status: 'Scheduled', owner: 'Aisha Khalid' },
  { id: 'DC-007', project: 'PRJ-2404', projectName: 'DIA Intelligence Layer', deliverable: 'Project kickoff and requirements sign-off', committed: '15 Jun 2026', linkedAmount: 0, status: 'Scheduled', owner: 'Sara Pereira' },
]

const statusStyle: Record<string, { cls: string; icon: React.ReactNode }> = {
  Delivered: { cls: 'bg-status-success-surface text-status-success-text', icon: <CheckCircle size={14} className="text-status-success" strokeWidth={1.5} /> },
  'In Progress': { cls: 'bg-status-info-surface text-status-info-text', icon: <Clock size={14} className="text-status-info" strokeWidth={1.5} /> },
  Scheduled: { cls: 'bg-surface-1 text-text-muted border border-border-subtle', icon: <Circle size={14} className="text-border-default" strokeWidth={1.5} /> },
  Overdue: { cls: 'bg-status-error-surface text-status-error-text', icon: <AlertTriangle size={14} className="text-status-error" strokeWidth={1.5} /> },
}

export default function DeliveryCommitments() {
  const { showToast } = useToast()

  const inProgress = commitments.filter(c => c.status === 'In Progress').length
  const delivered = commitments.filter(c => c.status === 'Delivered').length
  const scheduled = commitments.filter(c => c.status === 'Scheduled').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Delivery Commitments</h1>
      <p className="text-sm text-text-muted mb-6">Track delivery milestones, committed dates, and linked financial commitments for active projects.</p>

      {/* Summary */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-status-info-surface rounded-pill">
          <Clock size={13} className="text-status-info" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-info-text">{inProgress}</span>
          <span className="text-xs text-text-muted">In Progress</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface-1 rounded-pill border border-border-subtle">
          <Circle size={13} className="text-border-default" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-text-muted">{scheduled}</span>
          <span className="text-xs text-text-muted">Scheduled</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <CheckCircle size={13} className="text-status-success" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-success-text">{delivered}</span>
          <span className="text-xs text-text-muted">Delivered</span>
        </div>
        <div className="flex-1" />
        <div className="text-right">
          <p className="text-xs text-text-muted">Total financial commitments</p>
          <p className="text-lg font-bold font-mono text-text-primary">AED {commitments.filter(c => c.linkedAmount > 0).reduce((s, c) => s + c.linkedAmount, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Commitments by project */}
      {projects.filter(p => commitments.some(c => c.project === p.id)).map((p) => {
        const projectCommitments = commitments.filter(c => c.project === p.id)
        return (
          <div key={p.id} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-semibold text-dq-navy bg-navy-50 rounded-pill px-2 py-0.5">{p.id}</span>
              <p className="text-sm font-semibold text-text-primary">{p.name}</p>
            </div>
            <div className="space-y-2 pl-2 border-l-2 border-border-subtle">
              {projectCommitments.map((c) => {
                const s = statusStyle[c.status] || statusStyle.Scheduled
                return (
                  <div
                    key={c.id}
                    className={`flex items-start gap-4 p-4 bg-white rounded-card border shadow-sm ${c.status === 'In Progress' ? 'border-status-info/20' : 'border-border-subtle'}`}
                  >
                    <div className="shrink-0 mt-0.5">{s.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">{c.deliverable}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} strokeWidth={1.5} />
                          Committed {c.committed}
                        </span>
                        <span>Owner: {c.owner}</span>
                        {c.linkedAmount > 0 && (
                          <span className="font-mono font-semibold text-text-primary">AED {c.linkedAmount.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 shrink-0 ${s.cls}`}>{c.status}</span>
                    {c.status === 'In Progress' && (
                      <button
                        onClick={() => showToast(`Delivery confirmation for ${c.id} opened.`, 'info')}
                        className="px-3 py-1 text-xs font-semibold rounded-btn border border-dq-orange text-dq-orange hover:bg-orange-50 transition-colors shrink-0"
                      >
                        Update
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
