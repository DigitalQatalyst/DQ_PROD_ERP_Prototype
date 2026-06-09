import { projects, milestones } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import { DollarSign, AlertTriangle, CheckCircle2 } from 'lucide-react'

interface BillingReadiness {
  projectId: string
  projectName: string
  milestoneId: string
  milestoneName: string
  billingAmount: number
  currency: string
  costDataComplete: boolean
  approvalReceived: boolean
  customerInvoiceReady: boolean
  bcSyncStatus: string
  readiness: 'Ready' | 'Pending' | 'Blocked'
}

const billingItems: BillingReadiness[] = [
  { projectId: 'PRJ-2403', projectName: 'Noor Retail DXP', milestoneId: 'M-008', milestoneName: 'Design System Delivered', billingAmount: 120000, currency: 'AED', costDataComplete: true, approvalReceived: true, customerInvoiceReady: false, bcSyncStatus: 'Pending', readiness: 'Pending' },
  { projectId: 'PRJ-2401', projectName: 'DXP Phase 3 Build', milestoneId: 'M-002', milestoneName: 'MVP Demo', billingAmount: 85000, currency: 'AED', costDataComplete: false, approvalReceived: false, customerInvoiceReady: false, bcSyncStatus: 'Not Ready', readiness: 'Blocked' },
  { projectId: 'PRJ-2402', projectName: 'DWS.04 Platform Prototype', milestoneId: 'M-005', milestoneName: 'Shell Prototype', billingAmount: 42000, currency: 'AED', costDataComplete: true, approvalReceived: true, customerInvoiceReady: true, bcSyncStatus: 'Ready', readiness: 'Ready' },
]

export default function CostBillingReadinessTracker() {
  const { showToast } = useToast()

  const ready = billingItems.filter(b => b.readiness === 'Ready').length
  const pending = billingItems.filter(b => b.readiness === 'Pending').length
  const blocked = billingItems.filter(b => b.readiness === 'Blocked').length
  const totalBillingValue = billingItems.filter(b => b.readiness === 'Ready').reduce((sum, b) => sum + b.billingAmount, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Cost / Billing Readiness Tracker</h1>
      <p className="text-sm text-text-muted mb-6">
        Track project costs ready for billing and invoice generation.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Milestones</p>
          <p className="text-2xl font-bold text-text-primary">{billingItems.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Ready to Bill</p>
          <p className="text-2xl font-bold text-status-success-text">{ready}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Ready Value</p>
          <p className="text-xl font-bold font-mono text-dq-orange">AED {totalBillingValue.toLocaleString()}</p>
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Project</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Milestone</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Billing Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Cost Data</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approval</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Invoice Ready</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Readiness</th>
            </tr>
          </thead>
          <tbody>
            {billingItems.map((item, i) => (
              <tr
                key={item.milestoneId}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                  i === billingItems.length - 1 ? 'border-b-0' : ''
                } ${item.readiness === 'Ready' ? 'bg-green-50/30' : item.readiness === 'Blocked' ? 'bg-status-error-surface/20' : ''}`}
                onClick={() => showToast(`Opening ${item.projectId} billing details`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <div>
                    <p className="font-medium text-text-primary">{item.projectName}</p>
                    <p className="text-xs font-mono text-text-muted">{item.projectId}</p>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div>
                    <p className="text-text-primary text-xs">{item.milestoneName}</p>
                    <p className="text-[10px] font-mono text-text-muted">{item.milestoneId}</p>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <DollarSign size={14} className="text-dq-orange" strokeWidth={1.5} />
                    <span className="font-mono font-semibold text-text-primary">
                      {item.currency} {item.billingAmount.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  {item.costDataComplete ? (
                    <CheckCircle2 size={14} className="text-status-success-text" strokeWidth={2} />
                  ) : (
                    <AlertTriangle size={14} className="text-status-error-text" strokeWidth={2} />
                  )}
                </td>
                <td className="px-4 py-3.5">
                  {item.approvalReceived ? (
                    <CheckCircle2 size={14} className="text-status-success-text" strokeWidth={2} />
                  ) : (
                    <AlertTriangle size={14} className="text-status-warning-text" strokeWidth={2} />
                  )}
                </td>
                <td className="px-4 py-3.5">
                  {item.customerInvoiceReady ? (
                    <CheckCircle2 size={14} className="text-status-success-text" strokeWidth={2} />
                  ) : (
                    <AlertTriangle size={14} className="text-status-warning-text" strokeWidth={2} />
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <span className={`text-xs ${
                    item.bcSyncStatus === 'Ready' ? 'text-status-success-text font-medium' :
                    item.bcSyncStatus === 'Pending' ? 'text-status-warning-text' :
                    'text-status-error-text'
                  }`}>
                    {item.bcSyncStatus}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium ${
                    item.readiness === 'Ready' ? 'bg-status-success-surface text-status-success-text' :
                    item.readiness === 'Blocked' ? 'bg-status-error-surface text-status-error-text' :
                    'bg-status-warning-surface text-status-warning-text'
                  }`}>
                    {item.readiness}
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
