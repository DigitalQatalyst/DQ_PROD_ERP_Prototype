import { useState } from 'react'
import { FileText, DollarSign, TrendingDown } from 'lucide-react'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'

interface Quotation {
  id: string
  rfqRef: string
  vendor: string
  item: string
  quantity: number
  unit: string
  unitPrice: number
  totalAmount: number
  currency: string
  validUntil: string
  status: string
  competitiveness: 'Best' | 'Competitive' | 'High'
  submittedDate: string
}

const quotations: Quotation[] = [
  { id: 'QUO-001', rfqRef: 'RFQ-2026-05', vendor: 'Al Fardan Office Supp.', item: 'Office desks (standing)', quantity: 8, unit: 'units', unitPrice: 2400, totalAmount: 19200, currency: 'AED', validUntil: '30 May 2026', status: 'Under Review', competitiveness: 'Best', submittedDate: '15 May 2026' },
  { id: 'QUO-002', rfqRef: 'RFQ-2026-05', vendor: 'Dubai Office Mart', item: 'Office desks (standing)', quantity: 8, unit: 'units', unitPrice: 2850, totalAmount: 22800, currency: 'AED', validUntil: '28 May 2026', status: 'Under Review', competitiveness: 'Competitive', submittedDate: '16 May 2026' },
  { id: 'QUO-003', rfqRef: 'RFQ-2026-05', vendor: 'Premium Furnish Co.', item: 'Office desks (standing)', quantity: 8, unit: 'units', unitPrice: 3200, totalAmount: 25600, currency: 'AED', validUntil: '25 May 2026', status: 'Under Review', competitiveness: 'High', submittedDate: '14 May 2026' },
  { id: 'QUO-004', rfqRef: 'RFQ-2026-06', vendor: 'Gulf Tech Solutions', item: 'Monitors 27" 4K', quantity: 15, unit: 'units', unitPrice: 1850, totalAmount: 27750, currency: 'AED', validUntil: '05 Jun 2026', status: 'Approved', competitiveness: 'Best', submittedDate: '17 May 2026' },
  { id: 'QUO-005', rfqRef: 'RFQ-2026-07', vendor: 'Nairobi Print Services', item: 'Branded marketing materials', quantity: 1, unit: 'lot', unitPrice: 8500, totalAmount: 8500, currency: 'AED', validUntil: '10 Jun 2026', status: 'Under Review', competitiveness: 'Competitive', submittedDate: '18 May 2026' },
]

type Filter = 'All' | 'Under Review' | 'Approved' | 'Best Price'

export default function QuotationReview() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? quotations : quotations.filter(q => {
    if (filter === 'Under Review') return q.status === 'Under Review'
    if (filter === 'Approved') return q.status === 'Approved'
    if (filter === 'Best Price') return q.competitiveness === 'Best'
    return true
  })

  const underReview = quotations.filter(q => q.status === 'Under Review').length
  const approved = quotations.filter(q => q.status === 'Approved').length
  const bestPrice = quotations.filter(q => q.competitiveness === 'Best').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Quotation Review</h1>
      <p className="text-sm text-text-muted mb-6">
        Review supplier quotations and RFQ responses with price competitiveness analysis.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Quotations</p>
          <p className="text-2xl font-bold text-text-primary">{quotations.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Under Review</p>
          <p className="text-2xl font-bold text-status-warning-text">{underReview}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Best Price Options</p>
          <p className="text-2xl font-bold text-status-success-text">{bestPrice}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Approved</p>
          <p className="text-2xl font-bold text-dq-orange">{approved}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Under Review', 'Approved', 'Best Price'] as Filter[]).map(f => (
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">RFQ Ref</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Item</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Unit Price</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Total Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Competitiveness</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((quo, i) => (
              <tr
                key={quo.id}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                  i === filtered.length - 1 ? 'border-b-0' : ''
                } ${quo.competitiveness === 'Best' ? 'bg-green-50/30' : ''}`}
                onClick={() => showToast(`Opening ${quo.id} details`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <span className="font-mono text-[12px] text-text-muted">{quo.id}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-text-muted" strokeWidth={1.5} />
                    <span className="font-mono text-xs text-text-primary">{quo.rfqRef}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-text-primary font-medium">{quo.vendor}</td>
                <td className="px-4 py-3.5 text-text-secondary text-xs">
                  {quo.item} <span className="text-text-muted">({quo.quantity} {quo.unit})</span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <span className="font-mono text-text-primary">
                    {quo.currency} {quo.unitPrice.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <span className={`font-mono font-semibold ${
                    quo.competitiveness === 'Best' ? 'text-status-success-text' : 'text-text-primary'
                  }`}>
                    {quo.currency} {quo.totalAmount.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    {quo.competitiveness === 'Best' && (
                      <TrendingDown size={14} className="text-status-success-text" strokeWidth={2} />
                    )}
                    <span className={`text-xs font-medium ${
                      quo.competitiveness === 'Best' ? 'text-status-success-text' :
                      quo.competitiveness === 'Competitive' ? 'text-status-warning-text' :
                      'text-status-error-text'
                    }`}>
                      {quo.competitiveness}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={quo.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
