import { CreditCard, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { requests } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'
import BCSyncChip from '../../components/BCSyncChip'

export default function PaymentProcessing() {
  const invoices = requests.filter(r => r.type === 'Invoice' && r.status === 'Approved')
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Payment Processing</h1>
      <p className="text-sm text-text-muted mb-6">
        Process approved invoices through payment authorization and BC sync — track payment status, due dates, and high-value items.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Approved for Payment</p>
          <p className="text-2xl font-bold text-text-primary">{invoices.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Payment Exposure</p>
          <p className="text-xl font-bold font-mono text-dq-orange">
            AED {invoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">High Value (&gt;50K)</p>
          <p className="text-2xl font-bold text-status-error-text">{invoices.filter(i => i.isHighValue).length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">BC Synced</p>
          <p className="text-2xl font-bold text-status-success-text">{invoices.filter(i => i.bcSync === 'Synced').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Due Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Ref</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={inv.id} className={`border-b border-border-subtle hover:bg-surface-1 transition-colors ${i === invoices.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-4 py-3.5">
                  <RequestIDTag id={inv.id} />
                  {inv.isHighValue && (
                    <span className="ml-1 text-[10px] font-semibold bg-dq-orange text-white rounded-pill px-1.5 py-0.5">HIGH VALUE</span>
                  )}
                </td>
                <td className="px-4 py-3.5 text-text-primary">{inv.vendorName || '—'}</td>
                <td className="px-4 py-3.5 text-right font-mono font-semibold text-text-primary">AED {inv.amount.toLocaleString()}</td>
                <td className="px-4 py-3.5 text-text-muted text-xs">{inv.dueDate || '—'}</td>
                <td className="px-4 py-3.5"><BCSyncChip status={inv.bcSync || 'Not Synced'} /></td>
                <td className="px-4 py-3.5 text-xs font-mono text-text-muted">{inv.bcRef || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
