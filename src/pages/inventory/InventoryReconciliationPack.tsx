import { ClipboardCheck, AlertTriangle, CheckCircle2, Download } from 'lucide-react'
import { inventoryItems, inventoryMovements } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'

interface CountRow {
  item: string
  itemId: string
  expected: number
  counted: number
  variance: number
  varianceReason?: string
}

// Synthesise a stock count vs system for the consumable items (devices/licences have asset-level custody)
const counts: CountRow[] = inventoryItems
  .filter((i) => i.subType === 'Consumable' || i.subType === 'Device')
  .map((i) => {
    // Add small synthetic variances
    const varianceTable: Record<string, { counted: number; reason?: string }> = {
      'INV-001': { counted: 23, reason: 'One ream issued unlogged' },
      'INV-002': { counted: 3, reason: undefined },
      'INV-003': { counted: 6, reason: 'Pantry shrinkage' },
      'INV-004': { counted: 0, reason: undefined },
      'INV-008': { counted: 6, reason: undefined },
      'INV-009': { counted: 4, reason: undefined },
      'INV-010': { counted: 2, reason: undefined },
      'INV-011': { counted: 4, reason: 'One missing from store, likely with offboarder' },
    }
    const c = varianceTable[i.id] ?? { counted: i.quantity }
    return {
      item: i.name,
      itemId: i.id,
      expected: i.quantity,
      counted: c.counted,
      variance: c.counted - i.quantity,
      varianceReason: c.reason,
    }
  })

const pendingAdjustments = counts.filter((c) => c.variance !== 0)
const totalVarianceItems = pendingAdjustments.length

export default function InventoryReconciliationPack() {
  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Inventory Reconciliation Pack</h1>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn border border-border-default text-sm font-semibold text-text-primary hover:bg-surface-1 transition-colors">
          <Download size={14} strokeWidth={2} /> Export Pack
        </button>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Stock count evidence, variance report, pending adjustments, and full reconciliation trail — audit-ready output for finance, BC stewards, and external assurance partners.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Items Counted</p>
          <p className="text-2xl font-bold text-dq-navy">{counts.length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Items in Variance</p>
          <p className="text-2xl font-bold text-status-warning-text">{totalVarianceItems}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Adjustments Pending</p>
          <p className="text-2xl font-bold text-status-warning-text">{totalVarianceItems}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Movements (period)</p>
          <p className="text-2xl font-bold text-dq-navy">{inventoryMovements.length}</p>
        </div>
      </div>

      {/* Stock count vs system */}
      <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
        Stock Count — System vs Physical
      </p>
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Item</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">System Qty</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Physical Count</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Variance</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Reason / Notes</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {counts.map((c, i) => (
              <tr key={c.itemId} className={`border-b border-border-subtle ${i === counts.length - 1 ? 'border-b-0' : ''} ${c.variance !== 0 ? 'bg-status-warning-surface/30' : ''}`}>
                <td className="px-4 py-3"><RequestIDTag id={c.itemId} /></td>
                <td className="px-4 py-3 text-text-primary font-medium">{c.item}</td>
                <td className="px-4 py-3 text-right font-mono">{c.expected}</td>
                <td className="px-4 py-3 text-right font-mono">{c.counted}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold" style={{ color: c.variance < 0 ? '#B91C1C' : c.variance > 0 ? '#B45309' : '#5F607F' }}>
                  {c.variance > 0 ? '+' : ''}{c.variance}
                </td>
                <td className="px-4 py-3 text-text-muted text-xs italic">{c.varianceReason ?? '—'}</td>
                <td className="px-4 py-3">
                  {c.variance === 0 ? (
                    <span className="inline-flex items-center gap-1 text-xs text-status-success-text">
                      <CheckCircle2 size={12} strokeWidth={2} /> Match
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-status-warning-text font-semibold">
                      <AlertTriangle size={12} strokeWidth={2} /> Adjustment needed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Pending adjustments */}
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <ClipboardCheck size={16} className="text-dq-orange" strokeWidth={1.5} /> Pending Adjustments
          </h3>
          {pendingAdjustments.length === 0 ? (
            <p className="text-xs text-text-muted">No adjustments needed.</p>
          ) : (
            <div className="space-y-2">
              {pendingAdjustments.map((a) => (
                <div key={a.itemId} className="flex items-start justify-between gap-2 pb-2 border-b border-border-subtle last:border-b-0 last:pb-0">
                  <div>
                    <p className="text-xs font-medium text-text-primary">{a.item}</p>
                    <p className="text-[11px] text-text-muted">{a.varianceReason ?? 'Variance to investigate'}</p>
                  </div>
                  <button className="text-xs font-semibold text-dq-orange hover:underline shrink-0">Approve adj.</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reconciliation trail */}
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Reconciliation Trail</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-baseline gap-2">
              <span className="text-text-muted font-mono w-20 shrink-0">22 May 2026</span>
              <span className="text-text-secondary">Pack generated by Rashid Ahmed</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-text-muted font-mono w-20 shrink-0">22 May 2026</span>
              <span className="text-text-secondary">Physical count completed — Maya Sharma + Rashid Ahmed</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-text-muted font-mono w-20 shrink-0">21 May 2026</span>
              <span className="text-text-secondary">Count instructions issued (TR-001 stock freeze 4–6pm)</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-text-muted font-mono w-20 shrink-0">15 Apr 2026</span>
              <span className="text-text-secondary">Previous reconciliation — Q1 close (0 variances)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
