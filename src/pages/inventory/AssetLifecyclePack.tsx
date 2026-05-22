import { useState } from 'react'
import { HardDrive, Wrench, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import RequestIDTag from '../../components/RequestIDTag'

interface LifecycleEvent {
  date: string
  type: 'Purchase' | 'Assignment' | 'Custody' | 'Maintenance' | 'Transfer' | 'Return' | 'Write-off'
  description: string
  owner: string
}

interface AssetLifecycle {
  assetId: string
  assetName: string
  serial: string
  purchaseDate: string
  purchaseCost: number
  vendor: string
  currentCustodian: string
  status: 'Active' | 'Return Pending' | 'In Maintenance' | 'Written Off'
  conditionScore: number  // 1-5
  events: LifecycleEvent[]
}

const lifecycles: AssetLifecycle[] = [
  {
    assetId: 'AST-MBP-001',
    assetName: 'MacBook Pro M3 14"',
    serial: 'C02ZX7QHMD6T',
    purchaseDate: '12 Mar 2024',
    purchaseCost: 11800,
    vendor: 'Microsoft (MENA)',
    currentCustodian: 'Aisha Khalid',
    status: 'Active',
    conditionScore: 5,
    events: [
      { date: '12 Mar 2024', type: 'Purchase', description: 'Purchased via PO-2024-0181 from Microsoft (MENA)', owner: 'Yasmin Al-Mansoori' },
      { date: '15 Mar 2024', type: 'Assignment', description: 'Assigned to Aisha Khalid (CEO)', owner: 'Rashid Ahmed' },
      { date: '15 Mar 2024', type: 'Custody', description: 'Custody acknowledged + asset agreement signed', owner: 'Aisha Khalid' },
      { date: '10 Nov 2024', type: 'Maintenance', description: 'AppleCare service — battery replacement', owner: 'Rashid Ahmed' },
    ],
  },
  {
    assetId: 'AST-MBP-004',
    assetName: 'MacBook Pro M3 14"',
    serial: 'C02XY4PQ5TX9',
    purchaseDate: '08 Jan 2023',
    purchaseCost: 11200,
    vendor: 'Microsoft (MENA)',
    currentCustodian: 'Priya Menon',
    status: 'Return Pending',
    conditionScore: 4,
    events: [
      { date: '08 Jan 2023', type: 'Purchase', description: 'Purchased via PO-2023-0042', owner: 'Yasmin Al-Mansoori' },
      { date: '11 Jan 2023', type: 'Assignment', description: 'Assigned to Priya Menon (Service Designer)', owner: 'Rashid Ahmed' },
      { date: '11 Jan 2023', type: 'Custody', description: 'Custody acknowledged', owner: 'Priya Menon' },
      { date: '15 May 2026', type: 'Return', description: 'Return triggered by Offboarding TR-002 (pending physical handover)', owner: 'Rashid Ahmed' },
    ],
  },
  {
    assetId: 'AST-DXS-001',
    assetName: 'Dell XPS 15',
    serial: 'DLLXPS15TA-9341',
    purchaseDate: '21 May 2023',
    purchaseCost: 8900,
    vendor: 'Microsoft (MENA)',
    currentCustodian: 'Tariq Al-Amin',
    status: 'Active',
    conditionScore: 4,
    events: [
      { date: '21 May 2023', type: 'Purchase', description: 'Purchased via PO-2023-0117', owner: 'Yasmin Al-Mansoori' },
      { date: '23 May 2023', type: 'Assignment', description: 'Assigned to Tariq Al-Amin', owner: 'Rashid Ahmed' },
      { date: '02 Sep 2024', type: 'Transfer', description: 'Charger transferred from store stock', owner: 'Rashid Ahmed' },
    ],
  },
]

const statusStyle: Record<AssetLifecycle['status'], string> = {
  Active: 'bg-status-success-surface text-status-success-text',
  'Return Pending': 'bg-status-warning-surface text-status-warning-text',
  'In Maintenance': 'bg-status-info-surface text-status-info-text',
  'Written Off': 'bg-border-default text-text-secondary',
}

const eventColor: Record<LifecycleEvent['type'], string> = {
  Purchase: '#1D4ED8',
  Assignment: '#FB5535',
  Custody: '#15803D',
  Maintenance: '#B45309',
  Transfer: '#5F607F',
  Return: '#B45309',
  'Write-off': '#B91C1C',
}

function fmt(n: number) { return n.toLocaleString() }

export default function AssetLifecyclePack() {
  const [selected, setSelected] = useState(lifecycles[0])

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Asset Lifecycle Control Pack</h1>
      <p className="text-sm text-text-muted mb-6">
        Full lifecycle for controlled assets — purchase, assignment, custody, transfer, maintenance, return, write-off, and clearance history. One source of truth across Procurement, HR, Finance, and Inventory.
      </p>

      <div className="grid grid-cols-[280px_1fr] gap-5">
        {/* Asset list */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
            Controlled Assets ({lifecycles.length})
          </p>
          <div className="space-y-2">
            {lifecycles.map((a) => (
              <button
                key={a.assetId}
                onClick={() => setSelected(a)}
                className={`w-full text-left p-3 rounded-card border transition-colors ${
                  selected.assetId === a.assetId ? 'border-dq-orange bg-orange-50' : 'border-border-default bg-white hover:bg-surface-1'
                }`}
              >
                <div className="flex items-start gap-2">
                  <HardDrive size={16} className="text-icon-muted mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">{a.assetName}</p>
                    <p className="text-[10px] font-mono text-text-muted">{a.assetId}</p>
                    <p className="text-[11px] text-text-muted truncate">{a.currentCustodian}</p>
                    <span className={`inline-block mt-1 px-1.5 py-0.5 rounded-pill text-[10px] font-semibold ${statusStyle[a.status]}`}>
                      {a.status}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="space-y-5">
          {/* Header */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <RequestIDTag id={selected.assetId} />
                  <span className={`px-2 py-0.5 rounded-pill text-[10px] font-semibold ${statusStyle[selected.status]}`}>
                    {selected.status}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-text-primary mb-1">{selected.assetName}</h2>
                <p className="text-xs text-text-muted">Serial: <span className="font-mono">{selected.serial}</span></p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-text-muted uppercase tracking-wider">Custodian</p>
                <p className="text-sm font-semibold text-text-primary">{selected.currentCustodian}</p>
                <div className="mt-2 flex items-center gap-0.5 justify-end">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className={`w-3 h-3 rounded-full ${n <= selected.conditionScore ? 'bg-status-success' : 'bg-border-default'}`} />
                  ))}
                </div>
                <p className="text-[10px] text-text-muted mt-1">Condition: {selected.conditionScore}/5</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border-subtle">
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Purchase date</p>
                <p className="text-sm font-medium text-text-primary">{selected.purchaseDate}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Cost</p>
                <p className="text-sm font-mono font-bold text-dq-orange">AED {fmt(selected.purchaseCost)}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Vendor</p>
                <p className="text-sm font-medium text-text-primary">{selected.vendor}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Lifecycle Timeline</h3>
            <div className="space-y-3">
              {selected.events.map((ev, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full mt-2 shrink-0" style={{ background: eventColor[ev.type] }} />
                  <div className="flex-1 pb-3 border-b border-border-subtle last:border-b-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-text-primary">{ev.type}</span>
                      <span className="text-[11px] text-text-muted font-mono">{ev.date}</span>
                    </div>
                    <p className="text-xs text-text-secondary">{ev.description}</p>
                    <p className="text-[11px] text-text-muted mt-0.5">{ev.owner}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Lifecycle Actions</h3>
            <div className="grid grid-cols-3 gap-2">
              <button className="px-3 py-2 rounded-btn border border-border-default text-xs font-semibold text-text-primary hover:bg-surface-1 transition-colors inline-flex items-center justify-center gap-1.5">
                <Wrench size={12} strokeWidth={2} /> Log Maintenance
              </button>
              <button className="px-3 py-2 rounded-btn border border-border-default text-xs font-semibold text-text-primary hover:bg-surface-1 transition-colors inline-flex items-center justify-center gap-1.5">
                <ArrowRight size={12} strokeWidth={2} /> Transfer Custody
              </button>
              <button className="px-3 py-2 rounded-btn border border-border-default text-xs font-semibold text-text-primary hover:bg-surface-1 transition-colors inline-flex items-center justify-center gap-1.5">
                <CheckCircle2 size={12} strokeWidth={2} /> Mark Returned
              </button>
              <button className="px-3 py-2 rounded-btn border border-status-error/30 text-xs font-semibold text-status-error-text hover:bg-status-error-surface transition-colors inline-flex items-center justify-center gap-1.5">
                <XCircle size={12} strokeWidth={2} /> Request Write-off
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
