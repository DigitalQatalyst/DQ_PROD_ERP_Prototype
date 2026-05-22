import { useState } from 'react'
import { inventoryItems } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'
import type { InventorySubType, InventoryItem } from '../../types'

type Filter = 'All' | InventorySubType

const statusStyle: Record<InventoryItem['status'], string> = {
  'In Stock': 'bg-status-success-surface text-status-success-text',
  'Low Stock': 'bg-status-warning-surface text-status-warning-text',
  'Out of Stock': 'bg-status-error-surface text-status-error-text',
  'Reserved': 'bg-status-info-surface text-status-info-text',
}

const subTypeStyle: Record<InventorySubType, string> = {
  Consumable: 'bg-orange-50 text-dq-orange',
  Licence: 'bg-status-info-surface text-status-info-text',
  Device: 'bg-navy-50 text-dq-navy',
}

export default function InventoryRegister() {
  const [filter, setFilter] = useState<Filter>('All')
  const filtered = inventoryItems.filter((i) => filter === 'All' || i.subType === filter)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Inventory / Stock Register</h1>
      <p className="text-sm text-text-muted mb-6">
        All inventory items across DQ — consumables, software licences, and devices. Per BRS design constraint, inventory (stock with quantities) is kept distinct from controlled assets with custody.
      </p>

      {/* Sub-type filter chips */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-4">
        {(['All', 'Consumable', 'Licence', 'Device'] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {f}
            {f !== 'All' && (
              <span className="ml-1.5 text-[11px] text-text-muted">
                ({inventoryItems.filter((i) => i.subType === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Item</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Sub-type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Location</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Quantity</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Reorder</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Custodian</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={item.id} className={`border-b border-border-subtle hover:bg-surface-1 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-4 py-3"><RequestIDTag id={item.id} /></td>
                <td className="px-4 py-3 font-medium text-text-primary">{item.name}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-pill px-2 py-0.5 text-[10px] font-semibold ${subTypeStyle[item.subType]}`}>
                    {item.subType}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-secondary text-xs">{item.location}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold tabular-nums">
                  {item.quantity}{item.unit ? ` ${item.unit}` : ''}
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs text-text-muted">{item.reorderLevel ?? '—'}</td>
                <td className="px-4 py-3 text-text-secondary text-xs">{item.custodian ?? '—'}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-[11px] font-medium ${statusStyle[item.status]}`}>
                    {item.status}
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
