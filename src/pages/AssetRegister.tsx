import { useState } from 'react'
import { Monitor, Search } from 'lucide-react'
import { useToast } from '../components/Toast'

type AssetStatus = 'Active' | 'In Use' | 'Disposed'

interface Asset {
  id: string
  name: string
  category: string
  purchaseDate: string
  value: number
  currency: string
  costCentre: string
  assignedTo: string
  status: AssetStatus
  poRef: string
}

const assets: Asset[] = [
  { id: 'AST-001', name: 'MacBook Pro 16" (M3 Max)', category: 'IT Equipment', purchaseDate: '12 Jan 2026', value: 18400, currency: 'AED', costCentre: 'CC-003', assignedTo: 'Layla Seitkali', status: 'In Use', poRef: 'PO-2026-012' },
  { id: 'AST-002', name: 'MacBook Pro 14" (M3)', category: 'IT Equipment', purchaseDate: '12 Jan 2026', value: 14200, currency: 'AED', costCentre: 'CC-002', assignedTo: 'Sara Pereira', status: 'In Use', poRef: 'PO-2026-012' },
  { id: 'AST-003', name: 'Dell UltraSharp 27" Monitor x2', category: 'IT Equipment', purchaseDate: '3 Feb 2026', value: 6800, currency: 'AED', costCentre: 'CC-003', assignedTo: 'Tariq Al-Amin', status: 'In Use', poRef: 'PO-2026-017' },
  { id: 'AST-004', name: 'Standing Desk — Executive Office', category: 'Furniture', purchaseDate: '15 Dec 2025', value: 4200, currency: 'AED', costCentre: 'CC-001', assignedTo: 'Aisha Khalid', status: 'In Use', poRef: 'PO-2025-088' },
  { id: 'AST-005', name: 'Sonos Conference Speaker (x3)', category: 'AV Equipment', purchaseDate: '8 Mar 2026', value: 3600, currency: 'AED', costCentre: 'CC-002', assignedTo: 'Office Shared', status: 'Active', poRef: 'PO-2026-022' },
  { id: 'AST-006', name: 'iPad Pro 12.9" + Apple Pencil', category: 'IT Equipment', purchaseDate: '20 Nov 2025', value: 5100, currency: 'AED', costCentre: 'CC-004', assignedTo: 'Mohammed Rashid', status: 'In Use', poRef: 'PO-2025-081' },
  { id: 'AST-007', name: 'HP LaserJet Pro (Office Printer)', category: 'Office Equipment', purchaseDate: '2 Sep 2025', value: 2800, currency: 'AED', costCentre: 'CC-002', assignedTo: 'Office Shared', status: 'Active', poRef: 'PO-2025-063' },
]

const categoryStyle: Record<string, string> = {
  'IT Equipment': 'bg-navy-50 text-dq-navy',
  'Furniture': 'bg-status-info-surface text-status-info-text',
  'AV Equipment': 'bg-orange-50 text-dq-orange',
  'Office Equipment': 'bg-status-success-surface text-status-success-text',
}

export default function AssetRegister() {
  const [search, setSearch] = useState('')
  const { showToast } = useToast()

  const filtered = assets.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase()) ||
    a.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase())
  )

  const totalValue = assets.reduce((s, a) => s + a.value, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Asset Register</h1>
      <p className="text-sm text-text-muted mb-6">Track purchased and leased assets, linked to purchase orders and cost centres.</p>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-4 bg-navy-50 rounded-card border border-dq-navy/10">
          <p className="text-xs font-semibold text-dq-navy mb-1">Total Assets</p>
          <p className="text-2xl font-bold font-mono text-text-primary">{assets.length}</p>
        </div>
        <div className="p-4 bg-status-info-surface rounded-card border border-status-info/20">
          <p className="text-xs font-semibold text-status-info-text mb-1">Net Book Value</p>
          <p className="text-2xl font-bold font-mono text-text-primary">AED {totalValue.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-status-success-surface rounded-card border border-status-success/20">
          <p className="text-xs font-semibold text-status-success-text mb-1">Active / In Use</p>
          <p className="text-2xl font-bold font-mono text-text-primary">{assets.filter(a => a.status !== 'Disposed').length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search assets by name, category, or assignee…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-input border border-border-default text-sm focus:outline-none focus:border-dq-orange"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Asset</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Assigned To</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Cost Centre</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Value</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">PO Ref</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-text-primary">{a.name}</p>
                  <p className="text-xs font-mono text-text-muted">{a.id} · {a.purchaseDate}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${categoryStyle[a.category] || 'bg-surface-1 text-text-muted'}`}>{a.category}</span>
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary">{a.assignedTo}</td>
                <td className="px-4 py-4 text-xs font-mono text-text-muted">{a.costCentre}</td>
                <td className="px-4 py-4 text-right font-mono text-sm font-semibold text-text-primary">AED {a.value.toLocaleString()}</td>
                <td className="px-4 py-4 text-xs font-mono text-text-muted">{a.poRef}</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => showToast(`Asset ${a.id} detail opened.`, 'info')}
                    className="text-xs font-semibold text-dq-orange hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-text-muted">No assets match your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
