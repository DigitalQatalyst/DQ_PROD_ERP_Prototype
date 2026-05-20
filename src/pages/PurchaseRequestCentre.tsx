import { useState } from 'react'
import { Plus, CheckCircle, AlertTriangle, Clock } from 'lucide-react'
import { requests } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import { useToast } from '../components/Toast'

type Filter = 'All' | 'Pending Approval' | 'In Review' | 'Approved' | 'Evidence Pending'

const purchaseRequests = requests.filter(r => r.type === 'Purchase')

export default function PurchaseRequestCentre() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? purchaseRequests : purchaseRequests.filter(r => r.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Purchase Request Centre</h1>
        <button
          onClick={() => showToast('New purchase request form opened.', 'info')}
          className="flex items-center gap-2 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={15} strokeWidth={1.5} />
          New Purchase Request
        </button>
      </div>
      <p className="text-sm text-text-muted mb-6">Submit and track purchase requests through the full procurement approval workflow.</p>

      {/* Summary */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-status-warning-surface rounded-pill">
          <Clock size={13} className="text-status-warning" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-warning-text">{purchaseRequests.filter(r => r.status === 'Pending Approval').length}</span>
          <span className="text-xs text-text-muted">Pending Approval</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-info-surface rounded-pill">
          <span className="text-sm font-semibold text-status-info-text">{purchaseRequests.filter(r => r.status === 'In Review').length}</span>
          <span className="text-xs text-text-muted">In Review</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <CheckCircle size={13} className="text-status-success" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-success-text">{purchaseRequests.filter(r => r.status === 'Approved').length}</span>
          <span className="text-xs text-text-muted">Approved</span>
        </div>
        <div className="flex-1" />
        <div className="text-right">
          <p className="text-xs text-text-muted">Total value in pipeline</p>
          <p className="text-lg font-bold font-mono text-text-primary">
            AED {purchaseRequests.reduce((s, r) => s + r.amount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Pending Approval', 'In Review', 'Approved', 'Evidence Pending'] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Requests */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-muted text-sm">No purchase requests match this filter.</div>
        )}
        {filtered.map((r) => (
          <div key={r.id} className="p-5 bg-white rounded-card border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <RequestIDTag id={r.id} />
                  <StatusBadge status={r.status as any} size="sm" />
                  {r.linkedProject && (
                    <span className="text-[10px] font-mono font-semibold text-dq-navy bg-navy-50 rounded-pill px-1.5 py-0.5">{r.linkedProject}</span>
                  )}
                </div>
                <p className="text-sm font-semibold text-text-primary">{r.description}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-text-muted">
                  <span>Submitted by {r.requester}</span>
                  <span>{r.submittedDate}</span>
                  {r.vendorName && <span>Vendor: {r.vendorName}</span>}
                  <span>Approver: {r.approver}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl font-bold font-mono text-text-primary">{r.currency} {r.amount.toLocaleString()}</p>
                {r.bcSync && (
                  <p className={`text-xs font-semibold mt-1 ${r.bcSync === 'Synced' ? 'text-status-success-text' : 'text-status-warning-text'}`}>{r.bcSync}</p>
                )}
              </div>
            </div>

            {r.evidence && r.evidence.length > 0 && (
              <div className="flex items-center gap-2">
                {r.evidence.map((ev, i) => (
                  <span key={i} className={`flex items-center gap-1 text-xs rounded-pill px-2 py-0.5 ${ev.checked ? 'bg-status-success-surface text-status-success-text' : 'bg-status-error-surface text-status-error-text'}`}>
                    {ev.checked ? <CheckCircle size={10} strokeWidth={2} /> : <AlertTriangle size={10} strokeWidth={2} />}
                    {ev.label}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => showToast(`Request ${r.id} opened for review.`, 'info')}
                className="px-3 py-1.5 text-xs font-semibold rounded-btn border border-dq-navy text-dq-navy hover:bg-navy-50 transition-colors"
              >
                View Detail
              </button>
              {r.status === 'Pending Approval' && (
                <button
                  onClick={() => showToast(`Approval action for ${r.id} opened.`, 'success')}
                  className="px-3 py-1.5 text-xs font-semibold rounded-btn bg-dq-orange text-white hover:opacity-90 transition-opacity"
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
