import { vendors, requests, projects, costCentres } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import { CheckCircle2, AlertCircle, Database } from 'lucide-react'

interface ERPRecord {
  id: string
  recordType: 'Vendor' | 'Customer' | 'Project' | 'Cost Centre' | 'Invoice'
  recordRef: string
  recordName: string
  validationStatus: 'Complete' | 'Incomplete'
  requiredFields: number
  completedFields: number
  bcSyncStatus: string
  readiness: 'Ready' | 'Blocked'
}

const erpRecords: ERPRecord[] = [
  ...vendors.map(v => ({
    id: `ERP-${v.id}`,
    recordType: 'Vendor' as const,
    recordRef: v.id,
    recordName: v.name,
    validationStatus: v.bcSync === 'Failed' ? 'Incomplete' as const : 'Complete' as const,
    requiredFields: 8,
    completedFields: v.bcSync === 'Failed' ? 7 : 8,
    bcSyncStatus: v.bcSync,
    readiness: v.bcSync === 'Synced' ? 'Ready' as const : 'Blocked' as const
  })),
  ...projects.map(p => ({
    id: `ERP-${p.id}`,
    recordType: 'Project' as const,
    recordRef: p.id,
    recordName: p.name,
    validationStatus: 'Complete' as const,
    requiredFields: 6,
    completedFields: 6,
    bcSyncStatus: 'Synced',
    readiness: 'Ready' as const
  })),
  ...costCentres.slice(0, 2).map(cc => ({
    id: `ERP-${cc.id}`,
    recordType: 'Cost Centre' as const,
    recordRef: cc.id,
    recordName: cc.name,
    validationStatus: 'Complete' as const,
    requiredFields: 4,
    completedFields: 4,
    bcSyncStatus: 'Synced',
    readiness: 'Ready' as const
  }))
]

export default function ERPRecordReadinessTracker() {
  const { showToast } = useToast()

  const ready = erpRecords.filter(r => r.readiness === 'Ready').length
  const blocked = erpRecords.filter(r => r.readiness === 'Blocked').length
  const incomplete = erpRecords.filter(r => r.validationStatus === 'Incomplete').length
  const synced = erpRecords.filter(r => r.bcSyncStatus === 'Synced').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">ERP Record Readiness Tracker</h1>
      <p className="text-sm text-text-muted mb-6">
        Track records ready for BC sync and ERP integration.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Records</p>
          <p className="text-2xl font-bold text-text-primary">{erpRecords.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Ready to Sync</p>
          <p className="text-2xl font-bold text-status-success-text">{ready}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Blocked</p>
          <p className="text-2xl font-bold text-status-error-text">{blocked}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Synced</p>
          <p className="text-2xl font-bold text-dq-orange">{synced}</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Record ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Record Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Field Completion</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Validation</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Readiness</th>
            </tr>
          </thead>
          <tbody>
            {erpRecords.map((record, i) => (
              <tr
                key={record.id}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                  i === erpRecords.length - 1 ? 'border-b-0' : ''
                } ${record.readiness === 'Ready' ? 'bg-green-50/30' : record.readiness === 'Blocked' ? 'bg-status-error-surface/20' : ''}`}
                onClick={() => showToast(`Opening ${record.recordRef} details`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <Database size={14} className="text-dq-navy" strokeWidth={1.5} />
                    <span className="font-mono text-[12px] text-text-muted">{record.recordRef}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-xs font-medium text-text-primary">{record.recordType}</span>
                </td>
                <td className="px-4 py-3.5 text-text-primary">{record.recordName}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-border-subtle rounded-full h-1.5 max-w-[80px]">
                      <div 
                        className={`h-1.5 rounded-full ${
                          record.completedFields === record.requiredFields ? 'bg-status-success-text' : 'bg-status-warning-text'
                        }`}
                        style={{ width: `${(record.completedFields / record.requiredFields) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-text-muted font-mono">
                      {record.completedFields}/{record.requiredFields}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  {record.validationStatus === 'Complete' ? (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-status-success-text" strokeWidth={2} />
                      <span className="text-xs text-status-success-text font-medium">Complete</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <AlertCircle size={14} className="text-status-error-text" strokeWidth={2} />
                      <span className="text-xs text-status-error-text">Incomplete</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={record.bcSyncStatus} size="sm" />
                </td>
                <td className="px-4 py-3.5">
                  <span className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium ${
                    record.readiness === 'Ready' ? 'bg-status-success-surface text-status-success-text' :
                    'bg-status-error-surface text-status-error-text'
                  }`}>
                    {record.readiness}
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
