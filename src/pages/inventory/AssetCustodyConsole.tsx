import { HardDrive, AlertCircle, CheckCircle2 } from 'lucide-react'
import { employees, inventoryItems, transitions } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'

const devices = inventoryItems.filter((i) => i.subType === 'Device')

// Synthesize a custody view from devices + employees
interface CustodyRow {
  assetId: string
  assetName: string
  custodianId: string
  custodianName: string
  status: 'Assigned' | 'Return Pending' | 'Available'
}

const custodyRows: CustodyRow[] = [
  { assetId: 'INV-008-1', assetName: 'MacBook Pro M3 14"', custodianId: 'E-001', custodianName: 'Aisha Khalid', status: 'Assigned' },
  { assetId: 'INV-008-2', assetName: 'MacBook Pro M3 14"', custodianId: 'E-002', custodianName: 'Mohammed Rashid', status: 'Assigned' },
  { assetId: 'INV-008-3', assetName: 'MacBook Pro M3 14"', custodianId: 'E-011', custodianName: 'Daniel Kimani', status: 'Assigned' },
  { assetId: 'INV-008-4', assetName: 'MacBook Pro M3 14"', custodianId: 'E-012', custodianName: 'Priya Menon', status: 'Return Pending' },
  { assetId: 'INV-009-1', assetName: 'Dell XPS 15', custodianId: 'E-005', custodianName: 'Tariq Al-Amin', status: 'Assigned' },
  { assetId: 'INV-009-2', assetName: 'Dell XPS 15', custodianId: 'E-006', custodianName: 'Layla Seitkali', status: 'Assigned' },
  { assetId: 'INV-010-1', assetName: 'External 27" Monitor', custodianId: 'E-006', custodianName: 'Layla Seitkali', status: 'Assigned' },
  { assetId: 'INV-011-1', assetName: 'AirPods Pro', custodianId: 'E-009', custodianName: 'Maya Sharma', status: 'Assigned' },
]

const returnPending = custodyRows.filter((r) => r.status === 'Return Pending')

const statusStyle: Record<CustodyRow['status'], string> = {
  Assigned: 'bg-status-success-surface text-status-success-text',
  'Return Pending': 'bg-status-warning-surface text-status-warning-text',
  Available: 'bg-status-info-surface text-status-info-text',
}

export default function AssetCustodyConsole() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Asset Custody & Return Console</h1>
      <p className="text-sm text-text-muted mb-6">
        Active custody assignments, return queue, and offboarding-linked asset clearance — the bridge between Inventory and HR transitions.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Active Custody</p>
          <p className="text-2xl font-bold text-dq-navy">{custodyRows.filter((r) => r.status === 'Assigned').length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Return Pending</p>
          <p className="text-2xl font-bold text-status-warning-text">{returnPending.length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Devices Tracked</p>
          <p className="text-2xl font-bold text-dq-navy">{devices.reduce((s, d) => s + d.quantity, 0)}</p>
        </div>
      </div>

      {/* Return queue */}
      {returnPending.length > 0 && (
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
            Return Queue — Offboarding-linked
          </p>
          <div className="bg-status-warning-surface border border-status-warning/30 rounded-card p-4">
            {returnPending.map((r) => {
              const transition = transitions.find((t) => t.employeeId === r.custodianId)
              return (
                <div key={r.assetId} className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={18} className="text-status-warning-text shrink-0 mt-0.5" strokeWidth={2} />
                    <div>
                      <p className="text-sm font-semibold text-status-warning-text">{r.assetName}</p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        Assigned to <span className="font-medium">{r.custodianName}</span>
                        {transition && (
                          <> · Offboarding <RequestIDTag id={transition.id} /> in progress · target {transition.targetDate}</>
                        )}
                      </p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-btn text-xs font-semibold bg-dq-orange text-white hover:opacity-90 transition-opacity">
                    Mark Returned
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Custody table */}
      <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>All Custody Assignments</p>
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Asset</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Custodian</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Entity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {custodyRows.map((r, i) => {
              const emp = employees.find((e) => e.id === r.custodianId)
              return (
                <tr key={r.assetId} className={`border-b border-border-subtle hover:bg-surface-1 transition-colors ${i === custodyRows.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <HardDrive size={14} className="text-icon-muted" strokeWidth={1.5} />
                      <span className="font-medium text-text-primary">{r.assetName}</span>
                      <span className="text-[10px] font-mono text-text-muted">{r.assetId}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{r.custodianName}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{emp?.entity ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-pill px-2.5 py-0.5 text-[11px] font-medium ${statusStyle[r.status]}`}>
                      {r.status === 'Assigned' && <CheckCircle2 size={11} strokeWidth={2} />}
                      {r.status === 'Return Pending' && <AlertCircle size={11} strokeWidth={2} />}
                      {r.status}
                    </span>
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
