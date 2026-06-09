import { useState } from 'react'
import { requests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'

type Filter = 'All' | 'Pending Approval' | 'In Review'

export default function ApprovalQueue() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const approvalRequests = requests.filter(r => r.status === 'Pending Approval' || r.status === 'In Review')
  const filtered = filter === 'All' ? approvalRequests : approvalRequests.filter(r => r.status === filter)

  const pendingApproval = approvalRequests.filter(r => r.status === 'Pending Approval').length
  const inReview = approvalRequests.filter(r => r.status === 'In Review').length
  const highValue = approvalRequests.filter(r => r.isHighValue).length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Approval Queue</h1>
      <p className="text-sm text-text-muted mb-6">
        Queue of items requiring approval decision across all domains.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Pending</p>
          <p className="text-2xl font-bold text-text-primary">{approvalRequests.length}</p>
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
          <p className="text-xs text-text-muted mb-1">High Value</p>
          <p className="text-2xl font-bold text-status-error-text">{highValue}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Pending Approval', 'In Review'] as Filter[]).map(f => (
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approver</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req, i) => (
              <tr
                key={req.id}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                  i === filtered.length - 1 ? 'border-b-0' : ''
                } ${req.isHighValue ? 'bg-orange-50/50' : ''}`}
                onClick={() => showToast(`Opening ${req.id} for approval`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <RequestIDTag id={req.id} />
                </td>
                <td className="px-4 py-3.5 text-text-primary font-medium">{req.type}</td>
                <td className="px-4 py-3.5 text-text-secondary max-w-[280px] truncate">{req.description}</td>
                <td className="px-4 py-3.5 text-text-muted">{req.requester}</td>
                <td className="px-4 py-3.5 text-right">
                  {req.amount > 0 ? (
                    <span className={`font-mono font-semibold ${req.isHighValue ? 'text-dq-orange' : 'text-text-primary'}`}>
                      AED {req.amount.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3.5 text-text-muted">{req.approver}</td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={req.status} />
                  {req.isHighValue && (
                    <span className="ml-1 text-[10px] font-semibold bg-dq-orange text-white rounded-pill px-1.5 py-0.5">HIGH VALUE</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
