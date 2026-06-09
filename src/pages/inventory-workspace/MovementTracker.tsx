import { useState } from 'react'
import { Activity } from 'lucide-react'
import { inventoryMovements, inventoryItems } from '../../data/fixtures'
import { useToast } from '../../components/Toast'

type Filter = 'All' | 'Issue' | 'Receipt' | 'Return'

export default function MovementTracker() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? inventoryMovements : inventoryMovements.filter(m => m.type === filter)

  const issues = inventoryMovements.filter(m => m.type === 'Issue').length
  const receipts = inventoryMovements.filter(m => m.type === 'Receipt').length
  const returns = inventoryMovements.filter(m => m.type === 'Return').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Inventory Movement Tracker</h1>
      <p className="text-sm text-text-muted mb-6">
        Track all inventory issue, receipt, return, and transfer movements.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Movements (7d)</p>
          <p className="text-2xl font-bold text-text-primary">{inventoryMovements.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Issues</p>
          <p className="text-2xl font-bold text-status-warning-text">{issues}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Receipts</p>
          <p className="text-2xl font-bold text-status-success-text">{receipts}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Returns</p>
          <p className="text-2xl font-bold text-dq-orange">{returns}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Issue', 'Receipt', 'Return'] as Filter[]).map(f => (
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Item</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Quantity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Recipient</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Performed By</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((movement, i) => {
              const item = inventoryItems.find(it => it.id === movement.itemId)
              return (
                <tr
                  key={movement.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === filtered.length - 1 ? 'border-b-0' : ''
                  }`}
                  onClick={() => showToast(`Opening ${movement.id} details`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[12px] text-text-muted">{movement.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="font-medium text-text-primary">{item?.name}</p>
                      <p className="text-xs text-text-muted">{movement.itemId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium ${
                      movement.type === 'Issue' ? 'bg-status-warning-surface text-status-warning-text' :
                      movement.type === 'Receipt' ? 'bg-status-success-surface text-status-success-text' :
                      'bg-dq-orange/10 text-dq-orange'
                    }`}>
                      {movement.type}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="font-mono text-text-primary">{movement.quantity}</span>
                  </td>
                  <td className="px-4 py-3.5 text-text-secondary">{movement.recipient || '—'}</td>
                  <td className="px-4 py-3.5 text-text-muted">{movement.performedBy}</td>
                  <td className="px-4 py-3.5 text-text-muted text-xs">{movement.date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
