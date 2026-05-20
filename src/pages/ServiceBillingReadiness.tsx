import { CheckCircle, Clock, AlertTriangle, FileText } from 'lucide-react'
import { projects } from '../data/fixtures'
import { useToast } from '../components/Toast'

const milestones = [
  { id: 'MS-001', project: 'PRJ-2403', projectName: 'Client: Noor Retail DXP', milestone: 'Phase 1 Delivery — UX Research & Architecture', amount: 120000, currency: 'AED', dueDate: '30 Apr 2026', deliveryConfirmed: true, invoiceReady: true, invoiceRef: 'BC-INV-48700', status: 'Billed' },
  { id: 'MS-002', project: 'PRJ-2403', projectName: 'Client: Noor Retail DXP', milestone: 'Phase 2 Delivery — Design System & Prototype', amount: 150000, currency: 'AED', dueDate: '15 May 2026', deliveryConfirmed: true, invoiceReady: true, invoiceRef: 'BC-INV-48810', status: 'Billed' },
  { id: 'MS-003', project: 'PRJ-2403', projectName: 'Client: Noor Retail DXP', milestone: 'Phase 3 Delivery — Frontend Build Sprint 1', amount: 90000, currency: 'AED', dueDate: '28 May 2026', deliveryConfirmed: false, invoiceReady: false, invoiceRef: null, status: 'Pending Delivery' },
  { id: 'MS-004', project: 'PRJ-2401', projectName: 'DXP Phase 3 Build', milestone: 'Internal: Sprint 4 Completion', amount: 45000, currency: 'AED', dueDate: '20 May 2026', deliveryConfirmed: true, invoiceReady: false, invoiceRef: null, status: 'Ready to Invoice' },
  { id: 'MS-005', project: 'PRJ-2405', projectName: 'SDO Design System', milestone: 'Component Library v1.0 Release', amount: 25000, currency: 'AED', dueDate: '10 Jun 2026', deliveryConfirmed: false, invoiceReady: false, invoiceRef: null, status: 'In Progress' },
]

const statusStyle: Record<string, string> = {
  Billed: 'bg-status-success-surface text-status-success-text',
  'Ready to Invoice': 'bg-navy-50 text-dq-navy',
  'Pending Delivery': 'bg-status-warning-surface text-status-warning-text',
  'In Progress': 'bg-status-info-surface text-status-info-text',
}

export default function ServiceBillingReadiness() {
  const { showToast } = useToast()

  const readyToInvoice = milestones.filter(m => m.status === 'Ready to Invoice')
  const pendingDelivery = milestones.filter(m => m.status === 'Pending Delivery')
  const billed = milestones.filter(m => m.status === 'Billed')

  const totalBilledValue = billed.reduce((s, m) => s + m.amount, 0)
  const readyValue = readyToInvoice.reduce((s, m) => s + m.amount, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Service Billing Readiness</h1>
      <p className="text-sm text-text-muted mb-6">Billing milestone tracker for client-facing services with delivery confirmation and invoice readiness status.</p>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-4 bg-status-success-surface rounded-card border border-status-success/20">
          <p className="text-xs font-semibold text-status-success-text mb-1">Billed to Date</p>
          <p className="text-xl font-bold font-mono text-text-primary">AED {totalBilledValue.toLocaleString()}</p>
          <p className="text-xs text-text-muted">{billed.length} milestones invoiced</p>
        </div>
        <div className="p-4 bg-navy-50 rounded-card border border-dq-navy/10">
          <p className="text-xs font-semibold text-dq-navy mb-1">Ready to Invoice</p>
          <p className="text-xl font-bold font-mono text-text-primary">AED {readyValue.toLocaleString()}</p>
          <p className="text-xs text-text-muted">{readyToInvoice.length} milestone(s) ready</p>
        </div>
        <div className="p-4 bg-status-warning-surface rounded-card border border-status-warning/20">
          <p className="text-xs font-semibold text-status-warning-text mb-1">Pending Delivery Confirm</p>
          <p className="text-xl font-bold font-mono text-text-primary">{pendingDelivery.length}</p>
          <p className="text-xs text-text-muted">milestones awaiting sign-off</p>
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-3">
        {milestones.map((m) => (
          <div
            key={m.id}
            className={`p-5 bg-white rounded-card border shadow-sm hover:shadow-md transition-shadow ${m.status === 'Pending Delivery' ? 'border-status-warning/30' : m.status === 'Ready to Invoice' ? 'border-dq-navy/20' : 'border-border-subtle'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-text-disabled">{m.id}</span>
                  <span className="text-xs font-mono text-dq-navy font-semibold">{m.project}</span>
                  <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${statusStyle[m.status]}`}>{m.status}</span>
                </div>
                <p className="text-sm font-semibold text-text-primary">{m.milestone}</p>
                <p className="text-xs text-text-muted">{m.projectName}</p>

                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock size={11} strokeWidth={1.5} />
                    Due {m.dueDate}
                  </span>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${m.deliveryConfirmed ? 'text-status-success-text' : 'text-text-muted'}`}>
                    {m.deliveryConfirmed ? <CheckCircle size={11} strokeWidth={1.5} /> : <Clock size={11} strokeWidth={1.5} />}
                    Delivery {m.deliveryConfirmed ? 'confirmed' : 'pending'}
                  </span>
                  {m.invoiceRef && (
                    <span className="text-xs font-mono text-dq-navy">{m.invoiceRef}</span>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-lg font-bold font-mono text-text-primary">{m.currency} {m.amount.toLocaleString()}</p>
                {m.status === 'Ready to Invoice' && (
                  <button
                    onClick={() => showToast(`Invoice initiated for ${m.id}.`, 'success')}
                    className="mt-2 px-3 py-1.5 text-xs font-semibold rounded-btn bg-dq-orange text-white hover:opacity-90 transition-opacity"
                  >
                    Raise Invoice
                  </button>
                )}
                {m.status === 'Pending Delivery' && (
                  <button
                    onClick={() => showToast(`Delivery confirmation sent for ${m.id}.`, 'success')}
                    className="mt-2 px-3 py-1.5 text-xs font-semibold rounded-btn border border-dq-navy text-dq-navy hover:bg-navy-50 transition-colors"
                  >
                    Confirm Delivery
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
