import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { inventoryMovements, inventoryItems } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'
import type { InventoryMovementType } from '../../types'

const typeStyle: Record<InventoryMovementType, string> = {
  Issue: 'bg-status-warning-surface text-status-warning-text',
  Receipt: 'bg-status-success-surface text-status-success-text',
  Return: 'bg-status-info-surface text-status-info-text',
  Transfer: 'bg-orange-50 text-dq-orange',
  Adjustment: 'bg-navy-50 text-dq-navy',
}

export default function InventoryRequestTracker() {
  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Inventory Request & Issue Tracker</h1>
        <Link to="/request-intake" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus size={16} strokeWidth={2} /> Raise Request
        </Link>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Inventory movement history — issue to staff, receipt from vendors, return on offboarding, transfer between locations, and stock adjustments.
      </p>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Item</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Quantity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Performed By</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Recipient / Notes</th>
            </tr>
          </thead>
          <tbody>
            {inventoryMovements.map((m, i) => {
              const item = inventoryItems.find((x) => x.id === m.itemId)
              return (
                <tr key={m.id} className={`border-b border-border-subtle hover:bg-surface-1 transition-colors ${i === inventoryMovements.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-3"><RequestIDTag id={m.id} /></td>
                  <td className="px-4 py-3 text-text-muted text-xs">{m.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-pill px-2 py-0.5 text-[11px] font-semibold ${typeStyle[m.type]}`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-text-primary">{item?.name}</p>
                    <p className="text-[11px] text-text-muted font-mono">{item?.id}</p>
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold">
                    {m.type === 'Issue' || m.type === 'Return' ? '−' : '+'}{m.quantity}
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{m.performedBy}</td>
                  <td className="px-4 py-3 text-text-muted text-xs">
                    {m.recipient}{m.notes ? ` · ${m.notes}` : ''}
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
