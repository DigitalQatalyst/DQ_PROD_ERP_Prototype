import { useState } from 'react'
import { Plus, Edit2, Shield, AlertCircle } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface MasterDataRule {
  id: string
  entityType: 'Vendor' | 'Customer' | 'Employee' | 'GL Account' | 'Cost Centre' | 'Project' | 'Dimension Value' | 'Item'
  description: string
  approvalRequired: boolean
  minApprovers: number
  approverRoles: string[]
  evidenceRequired: boolean
  evidenceTypes: string[]
  changeTypes: string[]
  creationPolicy: 'Open' | 'Approval Required' | 'Restricted'
  modificationPolicy: 'Owner Only' | 'Approval Required' | 'Any Authorized'
  bcSyncRequired: boolean
  pendingChanges: number
  totalChanges: number
  lastModified: string
  status: 'Active' | 'Draft'
}

const masterDataRules: MasterDataRule[] = [
  {
    id: 'MDG-001',
    entityType: 'Vendor',
    description: 'Governance for vendor master records including banking details, payment terms, and tax registration',
    approvalRequired: true,
    minApprovers: 2,
    approverRoles: ['Finance Manager', 'Procurement Manager'],
    evidenceRequired: true,
    evidenceTypes: ['Trade License', 'VAT Registration Certificate', 'Bank Letter'],
    changeTypes: ['Create', 'Modify Bank Details', 'Modify Payment Terms', 'Deactivate'],
    creationPolicy: 'Approval Required',
    modificationPolicy: 'Approval Required',
    bcSyncRequired: true,
    pendingChanges: 3,
    totalChanges: 312,
    lastModified: '2026-05-20',
    status: 'Active',
  },
  {
    id: 'MDG-002',
    entityType: 'Customer',
    description: 'Governance for customer master records including credit limits, payment terms, and contact data',
    approvalRequired: true,
    minApprovers: 1,
    approverRoles: ['Finance Manager'],
    evidenceRequired: true,
    evidenceTypes: ['Signed Contract', 'Credit Assessment Form'],
    changeTypes: ['Create', 'Modify Credit Limit', 'Modify Payment Terms', 'Deactivate'],
    creationPolicy: 'Approval Required',
    modificationPolicy: 'Approval Required',
    bcSyncRequired: true,
    pendingChanges: 1,
    totalChanges: 218,
    lastModified: '2026-04-15',
    status: 'Active',
  },
  {
    id: 'MDG-003',
    entityType: 'Employee',
    description: 'Governance for employee master records including salary, grade, department, and personal data',
    approvalRequired: true,
    minApprovers: 2,
    approverRoles: ['HR Manager', 'Managing Director'],
    evidenceRequired: true,
    evidenceTypes: ['Offer Letter', 'Emirates ID Copy', 'Visa Copy', 'Educational Certificates'],
    changeTypes: ['Create', 'Modify Salary', 'Modify Grade', 'Transfer Department', 'Terminate'],
    creationPolicy: 'Restricted',
    modificationPolicy: 'Approval Required',
    bcSyncRequired: true,
    pendingChanges: 2,
    totalChanges: 87,
    lastModified: '2026-05-01',
    status: 'Active',
  },
  {
    id: 'MDG-004',
    entityType: 'GL Account',
    description: 'Governance for chart of accounts — new GL codes, account type changes, and blocking inactive accounts',
    approvalRequired: true,
    minApprovers: 2,
    approverRoles: ['Finance Manager', 'CFO'],
    evidenceRequired: true,
    evidenceTypes: ['Business Justification', 'Chart of Accounts Review Sign-off'],
    changeTypes: ['Create', 'Change Account Type', 'Modify Posting Group', 'Block Account'],
    creationPolicy: 'Restricted',
    modificationPolicy: 'Approval Required',
    bcSyncRequired: true,
    pendingChanges: 0,
    totalChanges: 94,
    lastModified: '2026-03-10',
    status: 'Active',
  },
  {
    id: 'MDG-005',
    entityType: 'Cost Centre',
    description: 'Governance for cost centre codes used in budget and expense allocation across DQ entities',
    approvalRequired: true,
    minApprovers: 2,
    approverRoles: ['Finance Manager', 'Department Head'],
    evidenceRequired: false,
    evidenceTypes: ['Budget Approval Memo'],
    changeTypes: ['Create', 'Rename', 'Reassign Owner', 'Close'],
    creationPolicy: 'Approval Required',
    modificationPolicy: 'Approval Required',
    bcSyncRequired: true,
    pendingChanges: 1,
    totalChanges: 643,
    lastModified: '2026-04-20',
    status: 'Active',
  },
  {
    id: 'MDG-006',
    entityType: 'Project',
    description: 'Governance for project master records including budget, timeline, entity assignment, and status',
    approvalRequired: true,
    minApprovers: 2,
    approverRoles: ['Projects Lead', 'Managing Director'],
    evidenceRequired: true,
    evidenceTypes: ['Project Charter', 'Client Contract', 'Board Approval (if > AED 500K)'],
    changeTypes: ['Create', 'Modify Budget', 'Extend Timeline', 'Change Entity', 'Close'],
    creationPolicy: 'Approval Required',
    modificationPolicy: 'Approval Required',
    bcSyncRequired: true,
    pendingChanges: 4,
    totalChanges: 156,
    lastModified: '2026-05-15',
    status: 'Active',
  },
  {
    id: 'MDG-007',
    entityType: 'Dimension Value',
    description: 'Governance for BC dimension values (DEPARTMENT, COSTCENTER, ENTITY, etc.) used in all financial postings',
    approvalRequired: true,
    minApprovers: 1,
    approverRoles: ['Finance Manager'],
    evidenceRequired: false,
    evidenceTypes: ['Change Request Form'],
    changeTypes: ['Create', 'Rename', 'Block', 'Retire'],
    creationPolicy: 'Approval Required',
    modificationPolicy: 'Approval Required',
    bcSyncRequired: true,
    pendingChanges: 2,
    totalChanges: 5670,
    lastModified: '2026-06-01',
    status: 'Active',
  },
  {
    id: 'MDG-008',
    entityType: 'Item',
    description: 'Governance for inventory item master records including unit of measure, item category, and cost method',
    approvalRequired: false,
    minApprovers: 1,
    approverRoles: ['Operations Manager'],
    evidenceRequired: false,
    evidenceTypes: ['Product Specification Sheet'],
    changeTypes: ['Create', 'Modify UOM', 'Change Item Category', 'Block Item'],
    creationPolicy: 'Open',
    modificationPolicy: 'Any Authorized',
    bcSyncRequired: false,
    pendingChanges: 0,
    totalChanges: 412,
    lastModified: '2026-05-28',
    status: 'Draft',
  },
]

export default function MasterDataGovernance() {
  const [filter, setFilter] = useState<'All' | 'Approval Required' | 'Restricted'>('All')

  const stats = {
    governed: masterDataRules.length,
    approvalRequired: masterDataRules.filter(r => r.approvalRequired).length,
    pendingChanges: masterDataRules.reduce((sum, r) => sum + r.pendingChanges, 0),
    bcSyncRequired: masterDataRules.filter(r => r.bcSyncRequired).length,
  }

  const filtered =
    filter === 'All'
      ? masterDataRules
      : filter === 'Approval Required'
      ? masterDataRules.filter(r => r.creationPolicy === 'Approval Required')
      : masterDataRules.filter(r => r.creationPolicy === 'Restricted')

  const creationPolicyColor: Record<string, string> = {
    Open: 'bg-status-success-surface text-status-success-text',
    'Approval Required': 'bg-status-warning-surface text-status-warning-text',
    Restricted: 'bg-status-error-surface text-status-error-text',
  }

  const modPolicyColor: Record<string, string> = {
    'Owner Only': 'bg-status-info-surface text-status-info-text',
    'Approval Required': 'bg-status-warning-surface text-status-warning-text',
    'Any Authorized': 'bg-status-success-surface text-status-success-text',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Master Data Governance</h1>
          <p className="text-sm text-text-muted mt-1">Govern who can create, modify, and approve master data entities across DWS.04 and Business Central</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} /> Add Rule
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Governed Entity Types</p>
          <p className="text-2xl font-bold text-text-primary">{stats.governed}</p>
          <p className="text-xs text-text-muted mt-1">entity categories</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Approval Required</p>
          <p className="text-2xl font-bold text-text-primary">{stats.approvalRequired}</p>
          <p className="text-xs text-text-muted mt-1">require sign-off</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Pending Changes</p>
          <p className={`text-2xl font-bold ${stats.pendingChanges > 0 ? 'text-status-warning-text' : 'text-text-primary'}`}>{stats.pendingChanges}</p>
          <p className="text-xs text-text-muted mt-1">awaiting approval</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">BC Sync Required</p>
          <p className="text-2xl font-bold text-text-primary">{stats.bcSyncRequired}</p>
          <p className="text-xs text-text-muted mt-1">must sync to BC</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Approval Required', 'Restricted'] as const).map(f => (
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Entity Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Creation Policy</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Modification Policy</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Min Approvers</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approver Roles</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Evidence</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Pending</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Total Changes</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map(rule => (
              <tr key={rule.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-dq-navy flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-text-primary">{rule.entityType}</p>
                      <p className="text-xs text-text-muted mt-0.5 max-w-xs truncate">{rule.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${creationPolicyColor[rule.creationPolicy]}`}>
                    {rule.creationPolicy}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${modPolicyColor[rule.modificationPolicy]}`}>
                    {rule.modificationPolicy}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-text-secondary text-center">{rule.minApprovers}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {rule.approverRoles.map(role => (
                      <span key={role} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-surface-1 text-text-muted border border-border-subtle">{role}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {rule.evidenceRequired ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-status-warning-surface text-status-warning-text">Required</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-muted">Optional</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {rule.bcSyncRequired ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-status-info-surface text-status-info-text">Yes</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-muted">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {rule.pendingChanges > 0 ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-status-warning-text">
                      <AlertCircle size={12} />{rule.pendingChanges}
                    </span>
                  ) : (
                    <span className="text-xs text-text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-text-secondary">{rule.totalChanges.toLocaleString()}</td>
                <td className="px-4 py-3"><StatusBadge status={rule.status} /></td>
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
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Creation vs Modification</p>
          <p className="text-sm text-text-secondary">Creation of new master data entities (especially Vendors, Employees, GL Accounts) requires stricter approval than field-level updates. Creation triggers a full evidence checklist, while minor modifications (e.g. address change) may require only single-approver sign-off where the modification policy permits.</p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">BC Sync Lock</p>
          <p className="text-sm text-text-secondary">All entities where bcSyncRequired is true cannot be set to Active status in DWS.04 until Business Central confirms successful creation or update. If BC sync fails after 5 retries, the record remains in Pending state and the Integration Team is alerted automatically.</p>
        </div>
      </div>
    </div>
  )
}
