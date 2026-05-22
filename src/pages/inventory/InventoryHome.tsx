import { Link } from 'react-router-dom'
import { Package, AlertOctagon, HardDrive, RefreshCw } from 'lucide-react'
import KPICard from '../../components/KPICard'
import AIInsightCard from '../../components/AIInsightCard'
import RequestIDTag from '../../components/RequestIDTag'
import { inventoryItems, inventoryMovements } from '../../data/fixtures'

const lowStock = inventoryItems.filter((i) => i.status === 'Low Stock' || i.status === 'Out of Stock')
const devices = inventoryItems.filter((i) => i.subType === 'Device')
const licences = inventoryItems.filter((i) => i.subType === 'Licence')

export default function InventoryHome() {
  return (
    <div>
      <p className="text-sm text-text-muted mb-6">
        Good morning, Rashid. Inventory and asset operating position.
      </p>

      <div className="grid grid-cols-4 gap-5 mb-8">
        <KPICard label="Total Inventory Items" value={inventoryItems.length} icon={<Package size={20} strokeWidth={1.5} />} />
        <KPICard label="Low / Out of Stock" value={lowStock.length} variant="warning" icon={<AlertOctagon size={20} strokeWidth={1.5} />} />
        <KPICard label="Devices" value={devices.length} icon={<HardDrive size={20} strokeWidth={1.5} />} />
        <KPICard label="Licence Pools" value={licences.length} icon={<RefreshCw size={20} strokeWidth={1.5} />} />
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-6">
        {/* Left — low stock alerts */}
        <div className="space-y-6">
          <div className="bg-surface-1 rounded-card shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Low Stock & Out of Stock</h2>
            <div className="space-y-3">
              {lowStock.map((item) => (
                <div key={item.id} className="bg-white rounded-card p-4 border border-border-subtle flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <RequestIDTag id={item.id} />
                      <span className="text-[11px] font-semibold uppercase text-text-muted">{item.subType}</span>
                    </div>
                    <p className="text-sm font-medium text-text-primary">{item.name}</p>
                    <p className="text-xs text-text-muted mt-0.5">{item.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold tabular-nums font-mono text-status-warning-text">{item.quantity}</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">
                      {item.reorderLevel ? `reorder ≤${item.reorderLevel}` : 'in stock'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AIInsightCard title="AI Inventory Brief">
            HP Toner and Branded Notebooks are below reorder threshold. Recommend raising a Purchase Request via Al Fardan Office Supplies (last vendor used 14 May 2026). 1 MacBook return pending from Priya Menon's offboarding (TR-002).
          </AIInsightCard>
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/inventory-register" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ Inventory / Stock Register</Link>
              <Link to="/inventory-requests" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ Inventory Request & Issue Tracker</Link>
              <Link to="/inventory-ops" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ Inventory Operations Console</Link>
              <Link to="/asset-custody" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ Asset Custody & Return Console</Link>
              <Link to="/assets" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ Asset Register</Link>
            </div>
          </div>

          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Recent Movements</h3>
            <div className="space-y-2">
              {inventoryMovements.slice(0, 5).map((m) => {
                const item = inventoryItems.find((i) => i.id === m.itemId)
                return (
                  <div key={m.id} className="text-xs border-b border-border-subtle pb-2 last:border-b-0 last:pb-0">
                    <div className="flex items-baseline justify-between">
                      <span className="font-medium text-text-primary">{m.type}: {item?.name}</span>
                      <span className="font-mono text-text-secondary">{m.type === 'Issue' || m.type === 'Return' ? '–' : '+'}{m.quantity}</span>
                    </div>
                    <p className="text-text-muted">{m.date} · {m.recipient ?? m.performedBy}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
