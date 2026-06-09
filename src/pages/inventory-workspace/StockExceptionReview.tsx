import { useState } from 'react'
import { Package, AlertCircle } from 'lucide-react'
import { inventoryItems } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'

type Filter = 'All' | 'Low Stock' | 'Out of Stock' | 'Consumable' | 'Device' | 'Licence'

export default function StockExceptionReview() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? inventoryItems : inventoryItems.filter(item => {
    if (filter === 'Low Stock') return item.status === 'Low Stock'
    if (filter === 'Out of Stock') return item.status === 'Out of Stock'
    return item.subType === filter
  })

  const lowStock = inventoryItems.filter(i => i.status === 'Low Stock').length
  const outOfStock = inventoryItems.filter(i => i.status === 'Out of Stock').length
  const needsAction = lowStock + outOfStock

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Stock Exception Review</h1>
      <p className="text-sm text-text-muted mb-6">
        Review stock variances, reorder alerts, and inventory exceptions.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Items</p>
          <p className="text-2xl font-bold text-text-primary">{inventoryItems.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Needs Action</p>
          <p className="text-2xl font-bold text-status-warning-text">{needsAction}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Low Stock</p>
          <p className="text-2xl font-bold text-dq-orange">{lowStock}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Out of Stock</p>
          <p className="text-2xl font-bold text-status-error-text">{outOfStock}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Low Stock', 'Out of Stock', 'Consumable', 'Device', 'Licence'] as Filter[]).map(f => (
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Item Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Location</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Quantity</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Reorder Level</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => {
              const isException = item.status === 'Low Stock' || item.status === 'Out of Stock'
              return (
                <tr
                  key={item.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === filtered.length - 1 ? 'border-b-0' : ''
                  } ${isException ? 'bg-status-warning-surface/20' : ''}`}
                  onClick={() => showToast(`Opening ${item.id} details`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[12px] text-text-muted">{item.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {isException && <AlertCircle size={14} className="text-dq-orange" strokeWidth={2} />}
                      <span className="font-medium text-text-primary">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-text-muted">{item.subType}</td>
                  <td className="px-4 py-3.5 text-text-secondary">{item.location}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`font-mono ${item.quantity === 0 ? 'text-status-error-text font-semibold' : 'text-text-primary'}`}>
                      {item.quantity} {item.unit}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    {item.reorderLevel ? (
                      <span className="font-mono text-text-muted">{item.reorderLevel}</span>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={item.status} />
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
