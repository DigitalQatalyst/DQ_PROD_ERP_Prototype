import { ShoppingCart, Users, RefreshCw, AlertTriangle, TrendingUp } from 'lucide-react'
import { requests, vendors, subscriptions, kpis } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import { useToast } from '../components/Toast'

const purchaseRequests = requests.filter(r => r.type === 'Purchase' || r.type === 'Vendor Onboarding')

export default function ProcurementWorkspace() {
  const { showToast } = useToast()

  const openPRs = purchaseRequests.filter(r => r.status !== 'Approved').length
  const pendingVendorActions = vendors.filter(v => v.bcSync !== 'Synced').length
  const renewalsDue = subscriptions.filter(s => s.daysUntilRenewal <= 30).length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Procurement Workspace</h1>
      <p className="text-sm text-text-muted mb-6">Procurement control view: open purchase requests, vendor actions, and PO commitments.</p>

      {/* KPI strip */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <div className="p-4 bg-status-warning-surface rounded-card border border-status-warning/20">
          <div className="flex items-center gap-2 mb-1">
            <ShoppingCart size={14} className="text-status-warning" strokeWidth={1.5} />
            <p className="text-xs font-semibold text-status-warning-text">Open Purchase Requests</p>
          </div>
          <p className="text-2xl font-bold font-mono text-text-primary">{kpis.openPurchaseRequests}</p>
        </div>
        <div className="p-4 bg-status-error-surface rounded-card border border-status-error/20">
          <div className="flex items-center gap-2 mb-1">
            <Users size={14} className="text-status-error" strokeWidth={1.5} />
            <p className="text-xs font-semibold text-status-error-text">Vendor Actions Pending</p>
          </div>
          <p className="text-2xl font-bold font-mono text-text-primary">{kpis.pendingVendorActions}</p>
        </div>
        <div className="p-4 bg-orange-50 rounded-card border border-dq-orange/20">
          <div className="flex items-center gap-2 mb-1">
            <RefreshCw size={14} className="text-dq-orange" strokeWidth={1.5} />
            <p className="text-xs font-semibold text-dq-orange">Renewals Due (30d)</p>
          </div>
          <p className="text-2xl font-bold font-mono text-text-primary">{kpis.renewalsDue30d}</p>
        </div>
        <div className="p-4 bg-navy-50 rounded-card border border-dq-navy/10">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-dq-navy" strokeWidth={1.5} />
            <p className="text-xs font-semibold text-dq-navy">PO Commitment Exposure</p>
          </div>
          <p className="text-xl font-bold font-mono text-text-primary">AED {(kpis.poCommitmentExposure / 1000).toFixed(0)}K</p>
        </div>
      </div>

      {/* Recent purchase requests */}
      <p className="text-sm font-semibold text-text-primary mb-3">Active Purchase Requests</p>
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Request</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {purchaseRequests.map((r) => (
              <tr key={r.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-5 py-4">
                  <RequestIDTag id={r.id} />
                  <p className="text-xs text-text-muted mt-1 max-w-[200px] leading-snug">{r.description}</p>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs font-medium text-text-secondary">{r.type}</span>
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary">{r.requester}</td>
                <td className="px-4 py-4 text-right">
                  {r.amount > 0 ? (
                    <span className="text-sm font-bold font-mono text-text-primary">{r.currency} {r.amount.toLocaleString()}</span>
                  ) : (
                    <span className="text-sm text-text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={r.status as any} size="sm" />
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => showToast(`Request ${r.id} opened.`, 'info')}
                    className="text-xs font-semibold text-dq-orange hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vendor sync issues */}
      <p className="text-sm font-semibold text-text-primary mb-3">Vendor Sync Issues</p>
      <div className="space-y-2">
        {vendors.filter(v => v.bcSync !== 'Synced').map((v) => (
          <div key={v.id} className="flex items-center gap-4 p-4 bg-white rounded-card border border-status-error/20 shadow-sm">
            <AlertTriangle size={16} className="text-status-error shrink-0" strokeWidth={1.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">{v.name}</p>
              <p className="text-xs text-text-muted">{v.id} · {v.category} · {v.bcSync}</p>
            </div>
            <button
              onClick={() => showToast(`Vendor ${v.id} sync panel opened.`, 'info')}
              className="px-3 py-1.5 text-xs font-semibold rounded-btn border border-status-error text-status-error-text hover:bg-status-error-surface transition-colors"
            >
              Resolve
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
