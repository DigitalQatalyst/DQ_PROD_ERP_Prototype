import { useState } from 'react'
import { Plus, FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import { requests } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import { useToast } from '../components/Toast'

type Filter = 'All' | 'Pending Approval' | 'Clarification Needed' | 'Approved'

const expenseRequests = requests.filter(r => r.type === 'Expense')

const summaryStats = [
  { label: 'Submitted', value: 'AED 11,950', sub: '2 claims', color: 'bg-status-info-surface text-status-info-text' },
  { label: 'Pending Approval', value: 'AED 3,200', sub: '1 claim', color: 'bg-status-warning-surface text-status-warning-text' },
  { label: 'Clarification Needed', value: 'AED 8,750', sub: '1 claim', color: 'bg-status-error-surface text-status-error-text' },
  { label: 'Approved YTD', value: 'AED 24,100', sub: '8 claims', color: 'bg-status-success-surface text-status-success-text' },
]

export default function ExpenseReimbursement() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? expenseRequests : expenseRequests.filter(r => r.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Expense & Reimbursement</h1>
        <button
          onClick={() => showToast('Expense submission form opened.', 'info')}
          className="flex items-center gap-2 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={15} strokeWidth={1.5} />
          New Expense Claim
        </button>
      </div>
      <p className="text-sm text-text-muted mb-6">Submit, track, and process expense claims and team reimbursements with full evidence trail.</p>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {summaryStats.map((s) => (
          <div key={s.label} className={`rounded-card px-4 py-3 ${s.color}`}>
            <p className="text-xs font-semibold mb-1">{s.label}</p>
            <p className="text-lg font-bold font-mono">{s.value}</p>
            <p className="text-xs opacity-70">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Pending Approval', 'Clarification Needed', 'Approved'] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Claims list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-muted text-sm">No claims match this filter.</div>
        )}
        {filtered.map((r) => (
          <div key={r.id} className="flex items-start gap-4 p-5 bg-white rounded-card border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center shrink-0">
              <FileText size={18} className="text-dq-navy" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-1">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{r.description}</p>
                  <p className="text-xs text-text-muted mt-0.5">Submitted by {r.requester} · {r.submittedDate}</p>
                </div>
                <p className="text-base font-bold font-mono text-text-primary shrink-0">{r.currency} {r.amount.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <RequestIDTag id={r.id} />
                <StatusBadge status={r.status as any} size="sm" />
                {r.dueDate && (
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock size={11} strokeWidth={1.5} />
                    Due {r.dueDate}
                  </span>
                )}
                {r.notes && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-status-error-text">
                    <AlertTriangle size={11} strokeWidth={1.5} />
                    {r.notes}
                  </span>
                )}
              </div>
              {r.evidence && r.evidence.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  {r.evidence.map((ev, i) => (
                    <span key={i} className={`flex items-center gap-1 text-xs rounded-pill px-2 py-0.5 ${ev.checked ? 'bg-status-success-surface text-status-success-text' : 'bg-status-error-surface text-status-error-text'}`}>
                      {ev.checked ? <CheckCircle size={10} strokeWidth={2} /> : <AlertTriangle size={10} strokeWidth={2} />}
                      {ev.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              {r.status === 'Pending Approval' && (
                <button
                  onClick={() => showToast(`Approval request sent for ${r.id}.`, 'success')}
                  className="px-3 py-1.5 text-xs font-semibold rounded-btn bg-dq-navy text-white hover:opacity-90 transition-opacity"
                >
                  View & Approve
                </button>
              )}
              {r.status === 'Clarification Needed' && (
                <button
                  onClick={() => showToast(`Clarification thread opened for ${r.id}.`, 'info')}
                  className="px-3 py-1.5 text-xs font-semibold rounded-btn border border-dq-orange text-dq-orange hover:bg-orange-50 transition-colors"
                >
                  Respond
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Policy note */}
      <div className="mt-6 p-4 bg-status-info-surface rounded-card border border-status-info/20">
        <p className="text-xs font-semibold text-status-info-text mb-1">Expense Policy — DigitalQatalyst MENA</p>
        <p className="text-xs text-text-muted">Claims above AED 5,000 require Finance Control Owner approval. Per-diem claims must include individual day/person breakdown. Receipts required for all items over AED 100.</p>
      </div>
    </div>
  )
}
