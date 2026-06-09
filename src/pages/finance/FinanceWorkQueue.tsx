import { useState } from 'react'
import { Inbox, Clock, AlertCircle } from 'lucide-react'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'
import { requests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'

type Filter = 'All' | 'Expense' | 'Invoice' | 'Budget Amendment' | 'Budget Requisition'

export default function FinanceWorkQueue() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const financeRequests = requests.filter(r => 
    ['Expense', 'Invoice', 'Budget Amendment', 'Budget Requisition'].includes(r.type)
  )

  const filtered = filter === 'All' 
    ? financeRequests 
    : financeRequests.filter(r => r.type === filter)

  const pendingCount = financeRequests.filter(r => r.status === 'Pending Approval' || r.status === 'In Review').length
  const clarificationCount = financeRequests.filter(r => r.status === 'Clarification Needed').length
  const highValueCount = financeRequests.filter(r => r.isHighValue).length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Finance Work Queue</h1>
      <p className="text-sm text-text-muted mb-6">
        Centralized queue for all finance-related requests — expenses, invoices, payments, budget changes, and requisitions.
      </p>

      {/* Summary tiles */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Open</p>
          <p className="text-2xl font-bold text-text-primary">{financeRequests.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending Approval</p>
          <p className="text-2xl font-bold text-status-warning-text">{pendingCount}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Clarification Needed</p>
          <p className="text-2xl font-bold text-status-error-text">{clarificationCount}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">High Value (&gt;AED 50K)</p>
          <p className="text-2xl font-bold text-dq-orange">{highValueCount}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Expense', 'Invoice', 'Budget Amendment', 'Budget Requisition'] as Filter[]).map(f => (
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

      {/* Queue table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
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
                } ${req.status === 'Clarification Needed' ? 'bg-status-error-surface/20' : ''}`}
                onClick={() => showToast(`Opening ${req.id} details`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <RequestIDTag id={req.id} />
                </td>
                <td className="px-4 py-3.5 text-text-primary">{req.type}</td>
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
                <td className="px-4 py-3.5">
                  <StatusBadge status={req.status} />
                  {req.isHighValue && (
                    <span className="ml-1 text-[10px] font-semibold bg-dq-orange text-white rounded-pill px-1.5 py-0.5">HIGH VALUE</span>
                  )}
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
