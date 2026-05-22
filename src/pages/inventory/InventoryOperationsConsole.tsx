import { useState } from 'react'
import { inventoryItems, inventoryMovements } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'
import type { InventoryMovementType } from '../../types'

type Tab = 'All' | InventoryMovementType

const typeStyle: Record<InventoryMovementType, string> = {
  Issue: 'bg-status-warning-surface text-status-warning-text',
  Receipt: 'bg-status-success-surface text-status-success-text',
  Return: 'bg-status-info-surface text-status-info-text',
  Transfer: 'bg-orange-50 text-dq-orange',
  Adjustment: 'bg-navy-50 text-dq-navy',
}

export default function InventoryOperationsConsole() {
  const [tab, setTab] = useState<Tab>('All')

  const tabs: Tab[] = ['All', 'Issue', 'Receipt', 'Return', 'Transfer', 'Adjustment']
  const filtered = inventoryMovements.filter((m) => tab === 'All' || m.type === tab)

  const lowStockCount = inventoryItems.filter((i) => i.status === 'Low Stock' || i.status === 'Out of Stock').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Inventory Operations Console</h1>
      <p className="text-sm text-text-muted mb-6">
        Practitioner workspace for stock movements, exceptions, and reorder actions.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Items Tracked</p>
          <p className="text-2xl font-bold text-dq-navy">{inventoryItems.length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Movements (week)</p>
          <p className="text-2xl font-bold text-dq-navy">{inventoryMovements.length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Low / Out of Stock</p>
          <p className="text-2xl font-bold text-status-warning-text">{lowStockCount}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Returns Pending</p>
          <p className="text-2xl font-bold text-status-info-text">1</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-4 flex-wrap">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Item</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Qty</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">By</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => {
              const item = inventoryItems.find((x) => x.id === m.itemId)
              return (
                <tr key={m.id} className={`border-b border-border-subtle ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-3"><RequestIDTag id={m.id} /></td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-pill px-2 py-0.5 text-[11px] font-semibold ${typeStyle[m.type]}`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-text-primary">{item?.name}</td>
                  <td className="px-4 py-3 text-right font-mono">{m.quantity}</td>
                  <td className="px-4 py-3 text-text-muted text-xs">{m.date}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{m.performedBy}</td>
                  <td className="px-4 py-3 text-text-muted text-xs">{m.recipient ?? m.notes ?? '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
