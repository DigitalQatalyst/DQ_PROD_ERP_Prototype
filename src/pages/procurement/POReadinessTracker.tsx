import { requests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'
import { CheckCircle2, AlertCircle, Package } from 'lucide-react'

interface POReadiness {
  requestId: string
  description: string
  vendor: string
  amount: number
  currency: string
  approvalStatus: string
  vendorActive: boolean
  budgetApproved: boolean
  evidenceComplete: boolean
  bcSyncReady: boolean
  poReadiness: 'Ready' | 'Blocked' | 'Pending'
}

const poItems: POReadiness[] = [
  { requestId: 'REQ-2025-0042', description: 'Purchase request: Notion Teams annual', vendor: 'Notion', amount: 5800, currency: 'AED', approvalStatus: 'In Review', vendorActive: true, budgetApproved: true, evidenceComplete: true, bcSyncReady: false, poReadiness: 'Pending' },
  { requestId: 'REQ-2025-0045', description: 'Purchase request: AWS infrastructure top-up', vendor: 'AWS', amount: 28600, currency: 'AED', approvalStatus: 'Pending Approval', vendorActive: true, budgetApproved: true, evidenceComplete: true, bcSyncReady: true, poReadiness: 'Pending' },
]

export default function POReadinessTracker() {
  const { showToast } = useToast()

  const approvedPurchases = requests.filter(r => r.type === 'Purchase' && r.status === 'Approved')
  
  const allPOs = [...poItems, ...approvedPurchases.map(req => ({
    requestId: req.id,
    description: req.description,
    vendor: req.vendorName || 'Unknown',
    amount: req.amount,
    currency: req.currency || 'AED',
    approvalStatus: req.status,
    vendorActive: true,
    budgetApproved: true,
    evidenceComplete: req.evidence?.every(e => e.checked) ?? true,
    bcSyncReady: req.bcSync === 'Synced',
    poReadiness: (req.status === 'Approved' && (req.evidence?.every(e => e.checked) ?? true) && req.bcSync === 'Synced') ? 'Ready' : 'Pending' as 'Ready' | 'Blocked' | 'Pending'
  }))]

  const ready = allPOs.filter(p => p.poReadiness === 'Ready').length
  const pending = allPOs.filter(p => p.poReadiness === 'Pending').length
  const blocked = allPOs.filter(p => p.poReadiness === 'Blocked').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">PO Readiness Tracker</h1>
      <p className="text-sm text-text-muted mb-6">
        Track purchase orders ready for issuance after approval and validation.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total POs</p>
          <p className="text-2xl font-bold text-text-primary">{allPOs.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Ready to Issue</p>
          <p className="text-2xl font-bold text-status-success-text">{ready}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending</p>
          <p className="text-2xl font-bold text-status-warning-text">{pending}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Blocked</p>
          <p className="text-2xl font-bold text-status-error-text">{blocked}</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Request ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approval</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Evidence</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">PO Status</th>
            </tr>
          </thead>
          <tbody>
            {allPOs.map((po, i) => (
              <tr
                key={po.requestId}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                  i === allPOs.length - 1 ? 'border-b-0' : ''
                } ${po.poReadiness === 'Ready' ? 'bg-green-50/30' : po.poReadiness === 'Blocked' ? 'bg-status-error-surface/20' : ''}`}
                onClick={() => showToast(`Opening ${po.requestId} PO details`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-dq-orange" strokeWidth={1.5} />
                    <RequestIDTag id={po.requestId} />
                  </div>
                </td>
                <td className="px-4 py-3.5 text-text-secondary max-w-[280px] truncate">{po.description}</td>
                <td className="px-4 py-3.5 text-text-primary font-medium">{po.vendor}</td>
                <td className="px-4 py-3.5 text-right">
                  <span className="font-mono font-semibold text-text-primary">
                    {po.currency} {po.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  {po.approvalStatus === 'Approved' ? (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-status-success-text" strokeWidth={2} />
                      <span className="text-xs text-status-success-text font-medium">Approved</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <AlertCircle size={14} className="text-status-warning-text" strokeWidth={2} />
                      <span className="text-xs text-status-warning-text">{po.approvalStatus}</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  {po.evidenceComplete ? (
                    <CheckCircle2 size={14} className="text-status-success-text" strokeWidth={2} />
                  ) : (
                    <AlertCircle size={14} className="text-status-error-text" strokeWidth={2} />
                  )}
                </td>
                <td className="px-4 py-3.5">
                  {po.bcSyncReady ? (
                    <CheckCircle2 size={14} className="text-status-success-text" strokeWidth={2} />
                  ) : (
                    <AlertCircle size={14} className="text-status-warning-text" strokeWidth={2} />
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <span className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium ${
                    po.poReadiness === 'Ready' ? 'bg-status-success-surface text-status-success-text' :
                    po.poReadiness === 'Blocked' ? 'bg-status-error-surface text-status-error-text' :
                    'bg-status-warning-surface text-status-warning-text'
                  }`}>
                    {po.poReadiness}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
