import { FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { requests, kpis } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import { useToast } from '../components/Toast'

const poItems = [
  { poRef: 'PO-2026-041', vendor: 'AWS (Amazon Web Services)', request: 'REQ-2025-0045', amount: 28600, currency: 'AED', status: 'Awaiting Approval', deliveryExpected: '30 May 2026', costCentre: 'CC-003' },
  { poRef: 'PO-2026-038', vendor: 'Mazrui Holdings Ltd.', request: 'REQ-2025-0047', amount: 90000, currency: 'AED', status: 'Awaiting Approval', deliveryExpected: '28 May 2026', costCentre: 'CC-004' },
  { poRef: 'PO-2026-033', vendor: 'Notion', request: 'REQ-2025-0042', amount: 5800, currency: 'AED', status: 'Under Review', deliveryExpected: '3 Jun 2026', costCentre: 'CC-003' },
  { poRef: 'PO-2026-028', vendor: 'Gulf Recruitment Corp.', request: null, amount: 96000, currency: 'AED', status: 'Issued', deliveryExpected: '31 Jul 2026', costCentre: 'CC-002' },
  { poRef: 'PO-2026-021', vendor: 'Anthropic', request: 'REQ-2025-0043', amount: 12400, currency: 'AED', status: 'Fulfilled', deliveryExpected: '18 May 2026', costCentre: 'CC-003' },
]

const statusStyle: Record<string, string> = {
  'Awaiting Approval': 'bg-status-warning-surface text-status-warning-text',
  'Under Review': 'bg-status-info-surface text-status-info-text',
  'Issued': 'bg-navy-50 text-dq-navy',
  'Fulfilled': 'bg-status-success-surface text-status-success-text',
}

export default function QuotePOTracker() {
  const { showToast } = useToast()

  const totalCommitment = poItems.filter(p => p.status !== 'Fulfilled').reduce((s, p) => s + p.amount, 0)
  const openPOs = poItems.filter(p => p.status !== 'Fulfilled').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Quote & PO Tracker</h1>
      <p className="text-sm text-text-muted mb-6">Track quotes, purchase orders, and PO commitment exposure across all active procurement cycles.</p>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-4 bg-status-warning-surface rounded-card border border-status-warning/20">
          <p className="text-xs font-semibold text-status-warning-text mb-1">Open PO Commitment</p>
          <p className="text-xl font-bold font-mono text-text-primary">AED {totalCommitment.toLocaleString()}</p>
          <p className="text-xs text-text-muted">{openPOs} purchase orders outstanding</p>
        </div>
        <div className="p-4 bg-navy-50 rounded-card border border-dq-navy/10">
          <p className="text-xs font-semibold text-dq-navy mb-1">Total PO Exposure (All)</p>
          <p className="text-xl font-bold font-mono text-text-primary">AED {(kpis.poCommitmentExposure / 1000).toFixed(0)}K</p>
          <p className="text-xs text-text-muted">Including framework agreements</p>
        </div>
        <div className="p-4 bg-status-success-surface rounded-card border border-status-success/20">
          <p className="text-xs font-semibold text-status-success-text mb-1">Fulfilled This Month</p>
          <p className="text-xl font-bold font-mono text-text-primary">AED {poItems.filter(p => p.status === 'Fulfilled').reduce((s, p) => s + p.amount, 0).toLocaleString()}</p>
          <p className="text-xs text-text-muted">{poItems.filter(p => p.status === 'Fulfilled').length} order(s)</p>
        </div>
      </div>

      {/* PO table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">PO Reference</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Linked Request</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Value</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Delivery</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {poItems.map((po) => (
              <tr key={po.poRef} className="hover:bg-surface-1 transition-colors">
                <td className="px-5 py-4">
                  <p className="text-sm font-mono font-semibold text-text-primary">{po.poRef}</p>
                  <p className="text-xs text-text-muted">{po.costCentre}</p>
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary">{po.vendor}</td>
                <td className="px-4 py-4">
                  {po.request ? <RequestIDTag id={po.request} /> : <span className="text-text-muted text-xs">—</span>}
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-sm font-bold font-mono text-text-primary">{po.currency} {po.amount.toLocaleString()}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock size={11} strokeWidth={1.5} />
                    {po.deliveryExpected}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${statusStyle[po.status]}`}>{po.status}</span>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => showToast(`PO ${po.poRef} detail opened.`, 'info')}
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
    </div>
  )
}
