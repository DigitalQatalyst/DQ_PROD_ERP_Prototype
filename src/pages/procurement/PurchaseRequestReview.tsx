import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { requests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'

type Filter = 'All' | 'Pending Approval' | 'In Review' | 'Evidence Pending'

export default function PurchaseRequestReview() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const purchaseRequests = requests.filter(r => r.type === 'Purchase')
  const filtered = filter === 'All' ? purchaseRequests : purchaseRequests.filter(r => r.status === filter)

  const pendingApproval = purchaseRequests.filter(r => r.status === 'Pending Approval').length
  const inReview = purchaseRequests.filter(r => r.status === 'In Review').length
  const evidencePending = purchaseRequests.filter(r => r.status === 'Evidence Pending').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Purchase Request Review</h1>
      <p className="text-sm text-text-muted mb-6">
        Review purchase requests for approval readiness and budget validation.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-text-primary">{purchaseRequests.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending Approval</p>
          <p className="text-2xl font-bold text-status-warning-text">{pendingApproval}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">In Review</p>
          <p className="text-2xl font-bold text-dq-orange">{inReview}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Evidence Pending</p>
          <p className="text-2xl font-bold text-status-error-text">{evidencePending}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Pending Approval', 'In Review', 'Evidence Pending'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              filter === f
                ? 'border-dq-orange text-dq-orange'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req, i) => (
              <tr
                key={req.id}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                  i === filtered.length - 1 ? 'border-b-0' : ''
                } ${req.status === 'Evidence Pending' ? 'bg-status-error-surface/20' : ''}`}
                onClick={() => showToast(`Opening ${req.id} details`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <RequestIDTag id={req.id} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={16} className="text-text-muted" strokeWidth={1.5} />
                    <span className="text-text-primary max-w-[300px] truncate">{req.description}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-text-muted">{req.requester}</td>
                <td className="px-4 py-3.5 text-right">
                  <span className="font-mono font-semibold text-text-primary">
                    AED {req.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={req.status} />
                </td>
                <td className="px-4 py-3.5 text-text-muted text-xs">{req.submittedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
