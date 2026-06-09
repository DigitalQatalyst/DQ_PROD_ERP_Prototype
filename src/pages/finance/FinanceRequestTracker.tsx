import { useState } from 'react'
import { requests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'
import { Clock, CheckCircle, XCircle } from 'lucide-react'

type Filter = 'All' | 'In Progress' | 'Approved' | 'Rejected' | 'Draft'

export default function FinanceRequestTracker() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const financeRequests = requests.filter(r => 
    ['Expense', 'Invoice', 'Budget Amendment', 'Budget Requisition'].includes(r.type)
  )

  const filtered = filter === 'All' ? financeRequests : financeRequests.filter(req => {
    if (filter === 'In Progress') return ['Pending Approval', 'In Review', 'Evidence Pending', 'Clarification Needed'].includes(req.status)
    if (filter === 'Approved') return req.status === 'Approved'
    if (filter === 'Rejected') return req.status === 'Rejected'
    if (filter === 'Draft') return req.status === 'Draft'
    return true
  })

  const inProgress = financeRequests.filter(r => ['Pending Approval', 'In Review', 'Evidence Pending', 'Clarification Needed'].includes(r.status)).length
  const approved = financeRequests.filter(r => r.status === 'Approved').length
  const rejected = financeRequests.filter(r => r.status === 'Rejected').length
  const draft = financeRequests.filter(r => r.status === 'Draft').length

  const getStatusCategory = (status: string) => {
    if (['Pending Approval', 'In Review'].includes(status)) return 'warning'
    if (status === 'Approved') return 'success'
    if (status === 'Rejected') return 'error'
    if (['Evidence Pending', 'Clarification Needed'].includes(status)) return 'error'
    return 'default'
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Finance Request Tracker</h1>
      <p className="text-sm text-text-muted mb-6">
        Track all finance requests from submission through approval and fulfilment.
      </p>

      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-text-primary">{financeRequests.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">In Progress</p>
          <p className="text-2xl font-bold text-status-warning-text">{inProgress}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Approved</p>
          <p className="text-2xl font-bold text-status-success-text">{approved}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Rejected</p>
          <p className="text-2xl font-bold text-status-error-text">{rejected}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Draft</p>
          <p className="text-2xl font-bold text-text-muted">{draft}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'In Progress', 'Approved', 'Rejected', 'Draft'] as Filter[]).map(f => (
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req, i) => {
              const statusCategory = getStatusCategory(req.status)

              return (
                <tr
                  key={req.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === filtered.length - 1 ? 'border-b-0' : ''
                  }`}
                  onClick={() => showToast(`Opening ${req.id} details`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {statusCategory === 'warning' && <Clock size={14} className="text-status-warning-text" strokeWidth={2} />}
                      {statusCategory === 'success' && <CheckCircle size={14} className="text-status-success-text" strokeWidth={2} />}
                      {statusCategory === 'error' && <XCircle size={14} className="text-status-error-text" strokeWidth={2} />}
                      <RequestIDTag id={req.id} />
                    </div>
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
                  <td className="px-4 py-3.5">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="px-4 py-3.5 text-text-muted text-xs">{req.submittedDate}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
