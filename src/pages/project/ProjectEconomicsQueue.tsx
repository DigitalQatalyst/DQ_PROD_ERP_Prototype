import { useState } from 'react'
import { FolderOpen, DollarSign, AlertTriangle, CheckCircle2, Edit2 } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

type ItemType = 'Budget Variance' | 'Cost Allocation' | 'Billing Readiness' | 'Revenue Recognition' | 'Budget Amendment'
type ReviewStatus = 'Pending Review' | 'In Review' | 'Approved' | 'Returned'
type BCSync = 'Synced' | 'Pending' | 'Not Synced'

interface ProjectEconomicsItem {
  id: string
  projectCode: string
  projectName: string
  itemType: ItemType
  description: string
  amount: number
  variancePct?: number
  projectManager: string
  reviewedBy: string
  submittedAt: string
  priority: 'High' | 'Medium' | 'Low'
  status: ReviewStatus
  bcSync: BCSync
}

const queueItems: ProjectEconomicsItem[] = [
  { id: 'PEQ-001', projectCode: 'PRJ-2401', projectName: 'Noor Retail DXP', itemType: 'Budget Variance', description: 'Phase 2 development overspend — additional contractor hours', amount: 45000, variancePct: 12, projectManager: 'Layla Seitkali', reviewedBy: 'Mohammed Rashid', submittedAt: '10 Jun 2026', priority: 'High', status: 'Pending Review', bcSync: 'Not Synced' },
  { id: 'PEQ-002', projectCode: 'PRJ-2401', projectName: 'Noor Retail DXP', itemType: 'Billing Readiness', description: 'Milestone 3 billing package — client sign-off pending', amount: 180000, projectManager: 'Layla Seitkali', reviewedBy: 'Tariq Al-Amin', submittedAt: '09 Jun 2026', priority: 'High', status: 'In Review', bcSync: 'Pending' },
  { id: 'PEQ-003', projectCode: 'PRJ-2402', projectName: 'DQ Platform Infra Upgrade', itemType: 'Budget Amendment', description: 'Additional cloud infrastructure spend — AWS Reserved Instances', amount: 28000, projectManager: 'Layla Seitkali', reviewedBy: 'Mohammed Rashid', submittedAt: '08 Jun 2026', priority: 'Medium', status: 'In Review', bcSync: 'Not Synced' },
  { id: 'PEQ-004', projectCode: 'PRJ-2403', projectName: 'Gulf Corp ERP Advisory', itemType: 'Revenue Recognition', description: 'Q2 advisory revenue recognition — 60% completion milestone', amount: 95000, projectManager: 'Layla Seitkali', reviewedBy: 'Mohammed Rashid', submittedAt: '07 Jun 2026', priority: 'High', status: 'Approved', bcSync: 'Synced' },
  { id: 'PEQ-005', projectCode: 'PRJ-2403', projectName: 'Gulf Corp ERP Advisory', itemType: 'Cost Allocation', description: 'Travel & accommodation reallocation from overhead to project', amount: 8400, projectManager: 'Layla Seitkali', reviewedBy: 'Sara Pereira', submittedAt: '06 Jun 2026', priority: 'Low', status: 'Approved', bcSync: 'Synced' },
  { id: 'PEQ-006', projectCode: 'PRJ-2404', projectName: 'Internal DWS.04 Rollout', itemType: 'Budget Variance', description: 'Training program spend exceeds allocation by 8%', amount: 6200, variancePct: 8, projectManager: 'Tariq Al-Amin', reviewedBy: 'Mohammed Rashid', submittedAt: '05 Jun 2026', priority: 'Medium', status: 'Returned', bcSync: 'Not Synced' },
  { id: 'PEQ-007', projectCode: 'PRJ-2405', projectName: 'Horizon Capital Data Strategy', itemType: 'Billing Readiness', description: 'Discovery phase billing — AED 75K milestone invoice', amount: 75000, projectManager: 'Layla Seitkali', reviewedBy: 'Tariq Al-Amin', submittedAt: '04 Jun 2026', priority: 'High', status: 'Pending Review', bcSync: 'Not Synced' },
  { id: 'PEQ-008', projectCode: 'PRJ-2405', projectName: 'Horizon Capital Data Strategy', itemType: 'Cost Allocation', description: 'Shared services overhead allocation Q2 — 3 team members', amount: 14500, projectManager: 'Layla Seitkali', reviewedBy: 'Sara Pereira', submittedAt: '03 Jun 2026', priority: 'Low', status: 'Approved', bcSync: 'Synced' },
  { id: 'PEQ-009', projectCode: 'PRJ-2402', projectName: 'DQ Platform Infra Upgrade', itemType: 'Budget Variance', description: 'Vendor price increase — Vercel enterprise tier upgrade', amount: 4800, variancePct: 5, projectManager: 'Layla Seitkali', reviewedBy: 'Mohammed Rashid', submittedAt: '02 Jun 2026', priority: 'Low', status: 'Approved', bcSync: 'Synced' },
  { id: 'PEQ-010', projectCode: 'PRJ-2406', projectName: 'ADCB Compliance Audit Support', itemType: 'Revenue Recognition', description: 'Phase 1 completion — AED 60K revenue recognition trigger', amount: 60000, projectManager: 'Layla Seitkali', reviewedBy: 'Tariq Al-Amin', submittedAt: '01 Jun 2026', priority: 'High', status: 'In Review', bcSync: 'Pending' },
  { id: 'PEQ-011', projectCode: 'PRJ-2406', projectName: 'ADCB Compliance Audit Support', itemType: 'Budget Amendment', description: 'Specialist contractor rate increase — compliance expert', amount: 18000, projectManager: 'Layla Seitkali', reviewedBy: 'Mohammed Rashid', submittedAt: '31 May 2026', priority: 'Medium', status: 'Approved', bcSync: 'Synced' },
  { id: 'PEQ-012', projectCode: 'PRJ-2401', projectName: 'Noor Retail DXP', itemType: 'Cost Allocation', description: 'Platform licence cost split — shared tool allocation', amount: 3600, projectManager: 'Layla Seitkali', reviewedBy: 'Sara Pereira', submittedAt: '29 May 2026', priority: 'Low', status: 'Approved', bcSync: 'Synced' },
]

const statusMap: Record<ReviewStatus, string> = {
  'Pending Review': 'Draft',
  'In Review': 'Active',
  'Approved': 'Active',
  'Returned': 'Suspended',
}

const bcSyncStyle: Record<BCSync, string> = {
  Synced: 'bg-status-success-surface text-status-success-text',
  Pending: 'bg-status-warning-surface text-status-warning-text',
  'Not Synced': 'bg-surface-1 text-text-muted',
}

type Filter = 'All' | ItemType

export default function ProjectEconomicsQueue() {
  const [filter, setFilter] = useState<Filter>('All')

  const stats = {
    pendingReview: queueItems.filter(i => i.status === 'Pending Review').length,
    inReview: queueItems.filter(i => i.status === 'In Review').length,
    totalExposure: queueItems.filter(i => i.status === 'Pending Review' || i.status === 'In Review').reduce((s, i) => s + i.amount, 0),
    variances: queueItems.filter(i => i.itemType === 'Budget Variance').length,
  }

  const filtered = filter === 'All' ? queueItems : queueItems.filter(i => i.itemType === filter)
  const types: ItemType[] = ['Budget Variance', 'Cost Allocation', 'Billing Readiness', 'Revenue Recognition', 'Budget Amendment']

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Project Economics Queue</h1>
          <p className="text-sm text-text-muted">Review project cost allocations, budget variances, billing readiness, and revenue recognition items.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Pending Review</p>
            <FolderOpen size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.pendingReview}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">In Review</p>
            <CheckCircle2 size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text">{stats.inReview}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Open Exposure</p>
            <DollarSign size={14} className="text-dq-orange" strokeWidth={1.5} />
          </div>
          <p className="text-xl font-bold font-mono text-dq-orange">AED {stats.totalExposure.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Budget Variances</p>
            <AlertTriangle size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.variances}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {(['All', ...types] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-btn transition-colors ${
              filter === f ? 'bg-dq-navy text-white' : 'bg-surface-1 text-text-muted hover:bg-border-subtle'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-1 border-b border-border-subtle">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Item</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Project</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">PM</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-text-primary text-sm">{item.description}</p>
                    <p className="text-xs font-mono text-text-disabled mt-0.5">{item.id} · {item.submittedAt}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold text-text-primary">{item.projectCode}</p>
                    <p className="text-xs text-text-muted">{item.projectName}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-secondary">
                      {item.itemType}
                    </span>
                    {item.variancePct !== undefined && (
                      <p className="text-[10px] text-status-error-text font-semibold mt-0.5">+{item.variancePct}% over</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p className="font-mono font-semibold text-text-primary">AED {item.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-text-primary">{item.projectManager}</p>
                    <p className="text-[10px] text-text-muted">Rev: {item.reviewedBy}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${bcSyncStyle[item.bcSync]}`}>
                      {item.bcSync}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={statusMap[item.status] as any} />
                    <p className="text-[10px] text-text-muted mt-0.5">{item.status}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Review">
                      <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-status-info-surface border border-status-info/20 rounded-card">
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Billing Readiness</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Billing Readiness items must be reviewed and approved before a client invoice can be raised. Finance Owner sign-off triggers the invoice generation workflow and syncs to Business Central Sales module.
          </p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Budget Variance Threshold</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Variances over 10% of the approved project budget require Executive approval in addition to Finance Owner review. Variances under 10% can be approved by Finance Owner alone, subject to BC dimension availability.
          </p>
        </div>
      </div>
    </div>
  )
}
