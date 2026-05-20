import { CheckCircle, Circle, AlertTriangle, RefreshCw, Clock } from 'lucide-react'
import { requests, syncRecords, kpis } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import { useToast } from '../components/Toast'

const checks = [
  { id: 'CHK-01', label: 'All approved invoices synced to Business Central', status: 'done' as const, detail: 'BC-INV-48821 confirmed synced.' },
  { id: 'CHK-02', label: 'No pending approvals past due date', status: 'action' as const, detail: '6 approvals are overdue. Action required before close.' },
  { id: 'CHK-03', label: 'All expense claims evidence complete', status: 'action' as const, detail: '2 claims have missing evidence (REQ-2025-0046, REQ-2025-0044).' },
  { id: 'CHK-04', label: 'VAT filing prepared for Q2 2026', status: 'in-progress' as const, detail: 'Draft in progress. Est. completion 25 May 2026.' },
  { id: 'CHK-05', label: 'Budget amendments reviewed and approved', status: 'action' as const, detail: 'REQ-2025-0048 (PRJ-2403 overage AED 45,000) is in Draft — requires FIN-OWN approval.' },
  { id: 'CHK-06', label: 'Vendor sync failures resolved', status: 'action' as const, detail: 'VND-004 (Anthropic) BC sync failed — missing VAT field. 3 retry attempts.' },
  { id: 'CHK-07', label: 'Cost centre spend reconciled', status: 'done' as const, detail: 'All 5 cost centres reconciled to GL as of 19 May 2026.' },
  { id: 'CHK-08', label: 'Subscription renewals actioned', status: 'in-progress' as const, detail: 'Loom Business (7 days) and Anthropic API (13 days) pending approval decisions.' },
  { id: 'CHK-09', label: 'Open clarification threads resolved', status: 'action' as const, detail: '2 open clarification threads (CLR-001, CLR-002) unresolved.' },
  { id: 'CHK-10', label: 'Audit trail entries complete', status: 'done' as const, detail: 'All platform events logged with full audit trail.' },
]

const statusIcon = {
  done: <CheckCircle size={18} className="text-status-success" strokeWidth={1.5} />,
  'in-progress': <Clock size={18} className="text-status-info" strokeWidth={1.5} />,
  action: <AlertTriangle size={18} className="text-status-error" strokeWidth={1.5} />,
}

const statusLabel = {
  done: { text: 'Complete', cls: 'bg-status-success-surface text-status-success-text' },
  'in-progress': { text: 'In Progress', cls: 'bg-status-info-surface text-status-info-text' },
  action: { text: 'Action Required', cls: 'bg-status-error-surface text-status-error-text' },
}

export default function PeriodCloseReadiness() {
  const { showToast } = useToast()

  const done = checks.filter(c => c.status === 'done').length
  const inProgress = checks.filter(c => c.status === 'in-progress').length
  const actionRequired = checks.filter(c => c.status === 'action').length

  const readinessPct = Math.round((done / checks.length) * 100)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Period Close Readiness</h1>
      <p className="text-sm text-text-muted mb-6">May 2026 period-end checklist covering open requests, unsynced records, and missing reconciliations.</p>

      {/* Readiness score */}
      <div className="p-5 bg-white rounded-card border border-border-subtle shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">May 2026 Close Readiness</p>
            <p className="text-3xl font-bold font-mono mt-1" style={{ color: readinessPct >= 80 ? '#22c55e' : readinessPct >= 50 ? '#f59e0b' : '#ef4444' }}>{readinessPct}%</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-status-success font-mono">{done}</p>
              <p className="text-xs text-text-muted">Complete</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-status-info font-mono">{inProgress}</p>
              <p className="text-xs text-text-muted">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-status-error font-mono">{actionRequired}</p>
              <p className="text-xs text-text-muted">Action Required</p>
            </div>
          </div>
        </div>
        <div className="w-full h-3 bg-border-subtle rounded-full overflow-hidden">
          <div
            className="h-3 rounded-full bg-status-success"
            style={{ width: `${readinessPct}%` }}
          />
        </div>
        <p className="text-xs text-text-muted mt-2">Target close date: <span className="font-semibold text-text-primary">31 May 2026</span> · {checks.length - done} items outstanding</p>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {checks.map((check) => {
          const sl = statusLabel[check.status]
          return (
            <div
              key={check.id}
              className={`flex items-start gap-4 p-4 bg-white rounded-card border shadow-sm ${check.status === 'action' ? 'border-status-error/30' : 'border-border-subtle'}`}
            >
              <div className="shrink-0 mt-0.5">{statusIcon[check.status]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono text-text-disabled">{check.id}</span>
                  <span className={`text-[10px] font-semibold rounded-pill px-1.5 py-0.5 ${sl.cls}`}>{sl.text}</span>
                </div>
                <p className="text-sm font-medium text-text-primary">{check.label}</p>
                <p className="text-xs text-text-muted mt-0.5">{check.detail}</p>
              </div>
              {check.status === 'action' && (
                <button
                  onClick={() => showToast(`Action panel opened for ${check.id}.`, 'info')}
                  className="px-3 py-1.5 text-xs font-semibold rounded-btn border border-dq-orange text-dq-orange hover:bg-orange-50 transition-colors shrink-0"
                >
                  Resolve
                </button>
              )}
              {check.status === 'done' && (
                <CheckCircle size={16} className="text-status-success shrink-0 mt-0.5" strokeWidth={1.5} />
              )}
            </div>
          )
        })}
      </div>

      {/* Unsynced records */}
      <div className="mt-6 p-4 bg-status-warning-surface rounded-card border border-status-warning/20">
        <p className="text-xs font-semibold text-status-warning-text mb-2 flex items-center gap-1">
          <AlertTriangle size={12} strokeWidth={1.5} />
          Unsynced BC Records Blocking Close
        </p>
        <div className="space-y-1">
          {syncRecords.filter(s => s.status !== 'Synced').map((s) => (
            <div key={s.id} className="flex items-center gap-3 text-xs">
              <span className="font-mono text-text-muted">{s.id}</span>
              <span className="text-text-secondary">{s.objectRef} — {s.objectType}</span>
              <span className="font-semibold text-status-error-text">{s.status}</span>
              {s.errorMessage && <span className="text-text-muted">· {s.errorMessage}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
