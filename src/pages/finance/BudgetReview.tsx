import { useState } from 'react'
import { TrendingUp, AlertTriangle } from 'lucide-react'
import { requests, projects } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'

type Filter = 'All' | 'Amendments' | 'Requisitions'

export default function BudgetReview() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const budgetRequests = requests.filter(r => r.type === 'Budget Amendment' || r.type === 'Budget Requisition')
  const filtered = filter === 'All' ? budgetRequests : budgetRequests.filter(req => {
    if (filter === 'Amendments') return req.type === 'Budget Amendment'
    if (filter === 'Requisitions') return req.type === 'Budget Requisition'
    return true
  })

  const amendments = budgetRequests.filter(r => r.type === 'Budget Amendment').length
  const requisitions = budgetRequests.filter(r => r.type === 'Budget Requisition').length
  const pendingApproval = budgetRequests.filter(r => r.status === 'Pending Approval').length
  const totalValue = budgetRequests.reduce((sum, r) => sum + r.amount, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Budget Review</h1>
      <p className="text-sm text-text-muted mb-6">
        Review budget amendments, requisitions, and overage requests.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-text-primary">{budgetRequests.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending Approval</p>
          <p className="text-2xl font-bold text-status-warning-text">{pendingApproval}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Value</p>
          <p className="text-xl font-bold font-mono text-dq-orange">AED {totalValue.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Amendments</p>
          <p className="text-2xl font-bold text-status-error-text">{amendments}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Amendments', 'Requisitions'] as Filter[]).map(f => (
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Project</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req, i) => {
              const project = req.linkedProject ? projects.find(p => p.id === req.linkedProject) : null
              const isAmendment = req.type === 'Budget Amendment'

              return (
                <tr
                  key={req.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === filtered.length - 1 ? 'border-b-0' : ''
                  } ${isAmendment ? 'bg-orange-50/30' : ''}`}
                  onClick={() => showToast(`Opening ${req.id} details`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <RequestIDTag id={req.id} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {isAmendment && <AlertTriangle size={14} className="text-dq-orange" strokeWidth={2} />}
                      <span className={`font-medium ${isAmendment ? 'text-dq-orange' : 'text-text-primary'}`}>
                        {req.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-text-secondary max-w-[280px] truncate">{req.description}</td>
                  <td className="px-4 py-3.5">
                    {project ? (
                      <div>
                        <p className="text-xs font-medium text-text-primary">{project.name}</p>
                        <p className="text-[10px] font-mono text-text-muted">{project.id}</p>
                      </div>
                    ) : (
                      <span className="text-text-disabled text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="font-mono font-semibold text-text-primary">
                      AED {req.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-text-muted">{req.requester}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={req.status} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
