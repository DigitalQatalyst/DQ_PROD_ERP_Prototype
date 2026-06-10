import { useState } from 'react'
import { Plus, Edit2, Database, RefreshCw } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface DimensionRecord {
  id: string
  dimensionCode: 'DEPARTMENT' | 'COSTCENTER' | 'PROJECT' | 'ENTITY' | 'CUSTOMER' | 'VENDOR' | 'EMPLOYEE' | 'ITEM'
  dimensionName: string
  description: string
  totalValues: number
  activeValues: number
  pendingValues: number
  creationApprover: string
  modificationApprover: string
  autoSyncToBC: boolean
  requiresFinanceReview: boolean
  requiresExecApproval: boolean
  lastBCSync: string
  recentChanges: number
  status: 'Active' | 'Governed' | 'Locked'
  lastModified: string
}

const dimensions: DimensionRecord[] = [
  {
    id: 'DIM-001',
    dimensionCode: 'DEPARTMENT',
    dimensionName: 'Department',
    description: 'Organisational departments used to classify expenditure and headcount across DQ entities',
    totalValues: 14,
    activeValues: 12,
    pendingValues: 1,
    creationApprover: 'HR Manager',
    modificationApprover: 'Finance Manager',
    autoSyncToBC: true,
    requiresFinanceReview: true,
    requiresExecApproval: false,
    lastBCSync: '2026-06-10 02:00',
    recentChanges: 3,
    status: 'Governed',
    lastModified: '2026-05-10',
  },
  {
    id: 'DIM-002',
    dimensionCode: 'COSTCENTER',
    dimensionName: 'Cost Centre',
    description: 'Budget and cost allocation centres linked to departments, projects, and overhead categories',
    totalValues: 21,
    activeValues: 18,
    pendingValues: 2,
    creationApprover: 'Finance Manager',
    modificationApprover: 'Finance Manager',
    autoSyncToBC: true,
    requiresFinanceReview: true,
    requiresExecApproval: false,
    lastBCSync: '2026-06-10 02:00',
    recentChanges: 5,
    status: 'Governed',
    lastModified: '2026-05-22',
  },
  {
    id: 'DIM-003',
    dimensionCode: 'PROJECT',
    dimensionName: 'Project',
    description: 'Active and historical client and internal project codes mapped to BC job module',
    totalValues: 52,
    activeValues: 45,
    pendingValues: 4,
    creationApprover: 'Projects Lead',
    modificationApprover: 'Projects Lead',
    autoSyncToBC: true,
    requiresFinanceReview: true,
    requiresExecApproval: true,
    lastBCSync: '2026-06-10 02:00',
    recentChanges: 8,
    status: 'Active',
    lastModified: '2026-06-05',
  },
  {
    id: 'DIM-004',
    dimensionCode: 'ENTITY',
    dimensionName: 'Legal Entity',
    description: 'DQ legal entities used for intercompany allocation and consolidation reporting',
    totalValues: 4,
    activeValues: 4,
    pendingValues: 0,
    creationApprover: 'Managing Director',
    modificationApprover: 'Managing Director',
    autoSyncToBC: true,
    requiresFinanceReview: true,
    requiresExecApproval: true,
    lastBCSync: '2026-06-10 02:00',
    recentChanges: 0,
    status: 'Locked',
    lastModified: '2025-10-01',
  },
  {
    id: 'DIM-005',
    dimensionCode: 'CUSTOMER',
    dimensionName: 'Customer',
    description: 'Customer dimension values linked to BC customer master for revenue allocation and reporting',
    totalValues: 38,
    activeValues: 31,
    pendingValues: 1,
    creationApprover: 'Finance Manager',
    modificationApprover: 'Finance Manager',
    autoSyncToBC: true,
    requiresFinanceReview: false,
    requiresExecApproval: false,
    lastBCSync: '2026-06-10 02:00',
    recentChanges: 4,
    status: 'Active',
    lastModified: '2026-05-30',
  },
  {
    id: 'DIM-006',
    dimensionCode: 'VENDOR',
    dimensionName: 'Vendor',
    description: 'Vendor dimension values used for purchase analysis and supplier reporting in BC',
    totalValues: 47,
    activeValues: 41,
    pendingValues: 3,
    creationApprover: 'Procurement Manager',
    modificationApprover: 'Finance Manager',
    autoSyncToBC: true,
    requiresFinanceReview: false,
    requiresExecApproval: false,
    lastBCSync: '2026-06-10 02:00',
    recentChanges: 6,
    status: 'Active',
    lastModified: '2026-06-02',
  },
  {
    id: 'DIM-007',
    dimensionCode: 'EMPLOYEE',
    dimensionName: 'Employee',
    description: 'Employee dimension values for HR cost allocation, payroll analysis, and headcount reporting',
    totalValues: 28,
    activeValues: 24,
    pendingValues: 2,
    creationApprover: 'HR Manager',
    modificationApprover: 'HR Manager',
    autoSyncToBC: false,
    requiresFinanceReview: true,
    requiresExecApproval: false,
    lastBCSync: '—',
    recentChanges: 2,
    status: 'Governed',
    lastModified: '2026-05-15',
  },
  {
    id: 'DIM-008',
    dimensionCode: 'ITEM',
    dimensionName: 'Item',
    description: 'Inventory item dimension values for stock analysis, procurement categorisation, and warehouse reporting',
    totalValues: 85,
    activeValues: 74,
    pendingValues: 0,
    creationApprover: 'Operations Manager',
    modificationApprover: 'Operations Manager',
    autoSyncToBC: false,
    requiresFinanceReview: false,
    requiresExecApproval: false,
    lastBCSync: '—',
    recentChanges: 1,
    status: 'Active',
    lastModified: '2026-04-28',
  },
]

export default function EntityDimensionGovernance() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Governed' | 'Locked'>('All')

  const stats = {
    total: dimensions.length,
    activeValues: dimensions.reduce((sum, d) => sum + d.activeValues, 0),
    pendingChanges: dimensions.reduce((sum, d) => sum + d.pendingValues, 0),
    autoSync: dimensions.filter(d => d.autoSyncToBC).length,
  }

  const filtered = filter === 'All' ? dimensions : dimensions.filter(d => d.status === filter)

  const statusColor: Record<string, string> = {
    Active: 'bg-status-success-surface text-status-success-text',
    Governed: 'bg-status-info-surface text-status-info-text',
    Locked: 'bg-status-error-surface text-status-error-text',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Entity / Dimension Governance</h1>
          <p className="text-sm text-text-muted mt-1">Govern Business Central dimension values — lifecycle, approval flow, and BC sync for all dimension codes</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} /> Add Dimension
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Total Dimensions</p>
          <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
          <p className="text-xs text-text-muted mt-1">BC dimension codes</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Active Values</p>
          <p className="text-2xl font-bold text-text-primary">{stats.activeValues}</p>
          <p className="text-xs text-text-muted mt-1">across all dimensions</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Pending Changes</p>
          <p className={`text-2xl font-bold ${stats.pendingChanges > 0 ? 'text-status-warning-text' : 'text-text-primary'}`}>{stats.pendingChanges}</p>
          <p className="text-xs text-text-muted mt-1">awaiting review</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Auto-Sync to BC</p>
          <p className="text-2xl font-bold text-text-primary">{stats.autoSync}</p>
          <p className="text-xs text-text-muted mt-1">dimensions</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Active', 'Governed', 'Locked'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-btn transition-colors ${filter === f ? 'bg-dq-navy text-white' : 'bg-surface-1 text-text-muted hover:bg-border-subtle'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-1 border-b border-border-subtle">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Dimension</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Values</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Pending</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Creation Approver</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Mod. Approver</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Auto-Sync BC</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Finance Review</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Exec Approval</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last BC Sync</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map(dim => (
              <tr key={dim.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Database size={14} className="text-dq-navy flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-text-primary font-mono text-xs">{dim.dimensionCode}</p>
                      <p className="text-xs text-text-muted">{dim.dimensionName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-xs font-semibold text-text-primary">{dim.activeValues} active</p>
                  <p className="text-xs text-text-muted">{dim.totalValues} total</p>
                </td>
                <td className="px-4 py-3">
                  {dim.pendingValues > 0 ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-status-warning-surface text-status-warning-text">{dim.pendingValues}</span>
                  ) : (
                    <span className="text-xs text-text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-text-secondary">{dim.creationApprover}</td>
                <td className="px-4 py-3 text-xs text-text-secondary">{dim.modificationApprover}</td>
                <td className="px-4 py-3">
                  {dim.autoSyncToBC ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-status-success-surface text-status-success-text">
                      <RefreshCw size={11} /> Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-muted">Manual</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {dim.requiresFinanceReview ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-status-warning-surface text-status-warning-text">Required</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-muted">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {dim.requiresExecApproval ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-status-error-surface text-status-error-text">Required</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-muted">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-text-muted">{dim.lastBCSync}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColor[dim.status]}`}>
                    {dim.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-text-muted hover:text-dq-navy transition-colors"><Edit2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-status-info-surface border border-status-info/20 rounded-card">
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Dimension Value Lifecycle</p>
          <p className="text-sm text-text-secondary">Retired dimension values are not deleted from Business Central — they remain in the BC database for historical transaction reporting. However, retired values are hidden from all new request intake forms in DWS.04 to prevent incorrect allocation on new transactions. Reactivation requires Finance Manager approval.</p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Finance Review</p>
          <p className="text-sm text-text-secondary">Dimensions flagged requiresFinanceReview must receive explicit sign-off from the Finance Owner (Tariq Al-Amin or Sara Pereira) before the dimension value is pushed to BC via the auto-sync process. Pending Finance Review items are surfaced on the Finance dashboard and must be actioned within 2 business days.</p>
        </div>
      </div>
    </div>
  )
}
