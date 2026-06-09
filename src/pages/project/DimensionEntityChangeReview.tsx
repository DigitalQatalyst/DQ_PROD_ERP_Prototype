import { useState } from 'react'
import { costCentres, entities, projects } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import { Map, Building, Folder } from 'lucide-react'

interface DimensionChange {
  id: string
  changeType: 'Cost Centre' | 'Entity' | 'Project'
  recordId: string
  recordName: string
  changeAction: 'Create' | 'Update' | 'Deactivate'
  currentValue?: string
  newValue: string
  requestedBy: string
  effectiveDate: string
  status: string
  bcImpact: string
}

const dimensionChanges: DimensionChange[] = [
  { id: 'DIM-001', changeType: 'Cost Centre', recordId: 'CC-006', recordName: 'Sales & Marketing', changeAction: 'Create', newValue: 'New cost centre for sales team', requestedBy: 'Aisha Khalid', effectiveDate: '01 Jun 2026', status: 'Pending Approval', bcImpact: 'New dimension value' },
  { id: 'DIM-002', changeType: 'Entity', recordId: 'ENT-004', recordName: 'DigitalQatalyst West Africa', changeAction: 'Create', newValue: 'Nigeria entity registration', requestedBy: 'Mohammed Rashid', effectiveDate: '01 Jul 2026', status: 'In Review', bcImpact: 'New entity structure' },
  { id: 'DIM-003', changeType: 'Project', recordId: 'PRJ-2403', recordName: 'Noor Retail DXP', changeAction: 'Update', currentValue: 'Budget: AED 450K', newValue: 'Budget: AED 495K (amendment)', requestedBy: 'Mohammed Rashid', effectiveDate: '20 May 2026', status: 'Pending Approval', bcImpact: 'Budget dimension update' },
  { id: 'DIM-004', changeType: 'Cost Centre', recordId: 'CC-003', recordName: 'Technology & Platform', changeAction: 'Update', currentValue: 'CC Owner: Tariq Al-Amin', newValue: 'CC Owner: Layla Seitkali', requestedBy: 'Aisha Khalid', effectiveDate: '01 Jun 2026', status: 'Approved', bcImpact: 'Ownership metadata' },
  { id: 'DIM-005', changeType: 'Project', recordId: 'PRJ-2301', recordName: 'Legacy Migration Project', changeAction: 'Deactivate', currentValue: 'Status: Active', newValue: 'Status: Closed', requestedBy: 'Mohammed Rashid', effectiveDate: '31 May 2026', status: 'Approved', bcImpact: 'Project closure' },
]

type Filter = 'All' | 'Cost Centre' | 'Entity' | 'Project'

export default function DimensionEntityChangeReview() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? dimensionChanges : dimensionChanges.filter(d => d.changeType === filter)

  const pendingApproval = dimensionChanges.filter(d => d.status === 'Pending Approval').length
  const inReview = dimensionChanges.filter(d => d.status === 'In Review').length
  const approved = dimensionChanges.filter(d => d.status === 'Approved').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Dimension / Entity Change Review</h1>
      <p className="text-sm text-text-muted mb-6">
        Review BC dimension and entity structure change requests.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Changes</p>
          <p className="text-2xl font-bold text-text-primary">{dimensionChanges.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending Approval</p>
          <p className="text-2xl font-bold text-status-warning-text">{pendingApproval}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">In Review</p>
          <p className="text-2xl font-bold text-dq-orange">{inReview}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Approved (30d)</p>
          <p className="text-2xl font-bold text-status-success-text">{approved}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Cost Centre', 'Entity', 'Project'] as Filter[]).map(f => (
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Record</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Action</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Change Details</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Impact</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Effective Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((change, i) => {
              const getIcon = () => {
                if (change.changeType === 'Cost Centre') return <Map size={14} className="text-dq-navy" strokeWidth={1.5} />
                if (change.changeType === 'Entity') return <Building size={14} className="text-dq-orange" strokeWidth={1.5} />
                return <Folder size={14} className="text-status-success-text" strokeWidth={1.5} />
              }

              return (
                <tr
                  key={change.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === filtered.length - 1 ? 'border-b-0' : ''
                  } ${change.changeAction === 'Create' ? 'bg-green-50/20' : ''}`}
                  onClick={() => showToast(`Opening ${change.id} details`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[12px] text-text-muted">{change.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {getIcon()}
                      <span className="text-text-primary font-medium">{change.changeType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-text-primary text-xs">{change.recordName}</p>
                      <p className="text-[10px] font-mono text-text-muted">{change.recordId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold ${
                      change.changeAction === 'Create' ? 'text-status-success-text' :
                      change.changeAction === 'Update' ? 'text-status-warning-text' :
                      'text-status-error-text'
                    }`}>
                      {change.changeAction}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="max-w-[280px]">
                      {change.currentValue && (
                        <p className="text-[10px] text-text-muted line-through">{change.currentValue}</p>
                      )}
                      <p className="text-xs text-text-primary">{change.newValue}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-text-secondary text-xs">{change.bcImpact}</td>
                  <td className="px-4 py-3.5 text-text-muted text-xs">{change.effectiveDate}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={change.status} />
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
