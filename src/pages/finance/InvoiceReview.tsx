import { useState } from 'react'
import { FileText, AlertCircle, CheckCircle2 } from 'lucide-react'
import { requests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'

type Filter = 'All' | 'Pending Review' | 'Approved' | 'Validation Errors'

export default function InvoiceReview() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const invoices = requests.filter(r => r.type === 'Invoice')
  const filtered = filter === 'All' ? invoices : invoices.filter(inv => {
    if (filter === 'Pending Review') return inv.status === 'Pending Approval'
    if (filter === 'Approved') return inv.status === 'Approved'
    if (filter === 'Validation Errors') return inv.status === 'Clarification Needed' || inv.status === 'Evidence Pending'
    return true
  })

  const pendingReview = invoices.filter(i => i.status === 'Pending Approval').length
  const approved = invoices.filter(i => i.status === 'Approved').length
  const validationErrors = invoices.filter(i => i.status === 'Clarification Needed' || i.status === 'Evidence Pending').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Invoice Review</h1>
      <p className="text-sm text-text-muted mb-6">
        Review and validate incoming vendor invoices before payment approval.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Invoices</p>
          <p className="text-2xl font-bold text-text-primary">{invoices.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending Review</p>
          <p className="text-2xl font-bold text-status-warning-text">{pendingReview}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Validation Errors</p>
          <p className="text-2xl font-bold text-status-error-text">{validationErrors}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Approved</p>
          <p className="text-2xl font-bold text-status-success-text">{approved}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Pending Review', 'Approved', 'Validation Errors'] as Filter[]).map(f => (
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Due Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Evidence</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv, i) => {
              const evidenceComplete = inv.evidence?.every(e => e.checked) ?? true
              const evidenceCount = inv.evidence?.length ?? 0
              const evidenceChecked = inv.evidence?.filter(e => e.checked).length ?? 0

              return (
                <tr
                  key={inv.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === filtered.length - 1 ? 'border-b-0' : ''
                  } ${!evidenceComplete ? 'bg-status-error-surface/20' : ''}`}
                  onClick={() => showToast(`Opening ${inv.id} details`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <RequestIDTag id={inv.id} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-text-muted" strokeWidth={1.5} />
                      <span className="font-medium text-text-primary">{inv.vendorName || '—'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-text-secondary max-w-[250px] truncate">{inv.description}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`font-mono font-semibold ${inv.isHighValue ? 'text-dq-orange' : 'text-text-primary'}`}>
                      AED {inv.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-text-muted text-xs">{inv.dueDate || '—'}</td>
                  <td className="px-4 py-3.5">
                    {evidenceCount > 0 ? (
                      <div className="flex items-center gap-1.5">
                        {evidenceComplete ? (
                          <CheckCircle2 size={14} className="text-status-success-text" strokeWidth={2} />
                        ) : (
                          <AlertCircle size={14} className="text-status-error-text" strokeWidth={2} />
                        )}
                        <span className={`text-xs font-medium ${
                          evidenceComplete ? 'text-status-success-text' : 'text-status-error-text'
                        }`}>
                          {evidenceChecked}/{evidenceCount}
                        </span>
                      </div>
                    ) : (
                      <span className="text-text-disabled text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={inv.status} />
                    {inv.isHighValue && (
                      <span className="ml-1 text-[10px] font-semibold bg-dq-orange text-white rounded-pill px-1.5 py-0.5">HIGH VALUE</span>
                    )}
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
