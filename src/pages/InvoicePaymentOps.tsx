import { useState } from 'react'
import { FileText, CheckCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react'
import { requests } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import { useToast } from '../components/Toast'

type Filter = 'All' | 'Pending Approval' | 'Approved' | 'Evidence Pending'

const invoiceRequests = requests.filter(r => r.type === 'Invoice')

const bcStatusStyle: Record<string, string> = {
  Synced: 'bg-status-success-surface text-status-success-text',
  'Not Synced': 'bg-status-warning-surface text-status-warning-text',
  Failed: 'bg-status-error-surface text-status-error-text',
}

export default function InvoicePaymentOps() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? invoiceRequests : invoiceRequests.filter(r => r.status === filter)

  const totalPending = invoiceRequests.filter(r => r.status === 'Pending Approval').reduce((s, r) => s + r.amount, 0)
  const totalApproved = invoiceRequests.filter(r => r.status === 'Approved').reduce((s, r) => s + r.amount, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Invoice & Payment Ops</h1>
      <p className="text-sm text-text-muted mb-6">Process vendor invoices, track payment status, and manage BC sync for payment records.</p>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-4 bg-status-warning-surface rounded-card border border-status-warning/20">
          <p className="text-xs font-semibold text-status-warning-text mb-1">Pending Payment</p>
          <p className="text-xl font-bold font-mono text-text-primary">AED {totalPending.toLocaleString()}</p>
          <p className="text-xs text-text-muted">{invoiceRequests.filter(r => r.status === 'Pending Approval').length} invoice(s) awaiting approval</p>
        </div>
        <div className="p-4 bg-status-success-surface rounded-card border border-status-success/20">
          <p className="text-xs font-semibold text-status-success-text mb-1">Approved & Processing</p>
          <p className="text-xl font-bold font-mono text-text-primary">AED {totalApproved.toLocaleString()}</p>
          <p className="text-xs text-text-muted">{invoiceRequests.filter(r => r.status === 'Approved').length} invoice(s) approved</p>
        </div>
        <div className="p-4 bg-navy-50 rounded-card border border-dq-navy/10">
          <p className="text-xs font-semibold text-dq-navy mb-1">30-Day Payment Exposure</p>
          <p className="text-xl font-bold font-mono text-text-primary">AED 186,400</p>
          <p className="text-xs text-text-muted">All entities combined</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Pending Approval', 'Approved', 'Evidence Pending'] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Invoice table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Request</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Due</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-1">
                    <RequestIDTag id={r.id} />
                    <p className="text-xs text-text-muted leading-snug max-w-[180px]">{r.description}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-text-primary">{r.vendorName || '—'}</p>
                  {r.bcRef && (
                    <p className="text-xs font-mono text-text-muted">{r.bcRef}</p>
                  )}
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-sm font-bold font-mono text-text-primary">{r.currency} {r.amount.toLocaleString()}</span>
                  {r.isHighValue && (
                    <span className="ml-2 text-[10px] font-semibold text-dq-orange bg-orange-50 rounded-pill px-1.5 py-0.5">HIGH</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {r.dueDate ? (
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Clock size={11} strokeWidth={1.5} />
                      {r.dueDate}
                    </span>
                  ) : <span className="text-text-disabled text-xs">—</span>}
                </td>
                <td className="px-4 py-4">
                  {r.bcSync ? (
                    <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${bcStatusStyle[r.bcSync] || 'bg-surface-1 text-text-muted'}`}>
                      {r.bcSync}
                    </span>
                  ) : <span className="text-text-disabled text-xs">—</span>}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={r.status as any} size="sm" />
                </td>
                <td className="px-4 py-4">
                  {r.status === 'Pending Approval' && (
                    <button
                      onClick={() => showToast(`Approval action opened for ${r.id}.`, 'info')}
                      className="text-xs font-semibold text-dq-orange hover:underline"
                    >
                      Approve
                    </button>
                  )}
                  {r.status === 'Approved' && r.bcSync !== 'Synced' && (
                    <button
                      onClick={() => showToast(`BC sync triggered for ${r.id}.`, 'success')}
                      className="flex items-center gap-1 text-xs font-semibold text-dq-navy hover:underline"
                    >
                      <RefreshCw size={11} strokeWidth={1.5} />
                      Sync
                    </button>
                  )}
                  {r.status === 'Approved' && r.bcSync === 'Synced' && (
                    <span className="flex items-center gap-1 text-xs text-status-success-text">
                      <CheckCircle size={12} strokeWidth={1.5} />
                      Synced
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-text-muted">No invoices match this filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* BC sync note */}
      <div className="mt-4 flex items-start gap-2 p-3 bg-surface-1 rounded-card border border-border-subtle">
        <AlertCircle size={14} className="text-status-info shrink-0 mt-0.5" strokeWidth={1.5} />
        <p className="text-xs text-text-muted">BC sync triggers automatically on approval for standard invoices. High-value invoices (above AED 50,000) require manual sync confirmation by the Finance Control Owner.</p>
      </div>
    </div>
  )
}
