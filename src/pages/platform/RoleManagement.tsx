import { useState } from 'react'
import { Plus, Edit2, ShieldCheck, Settings, Eye } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface PlatformRole {
  id: string
  name: string
  description: string
  type: 'System' | 'Custom' | 'Domain'
  workspacesGranted: string[]
  permissionCount: number
  userCount: number
  canApprove: boolean
  canConfigure: boolean
  canAudit: boolean
  status: 'Active' | 'Draft'
  createdBy: string
  lastModified: string
}

const platformRoles: PlatformRole[] = [
  {
    id: 'ROL-001',
    name: 'Executive',
    description: 'Full cross-entity visibility with executive dashboard and approval authority at the highest thresholds',
    type: 'System',
    workspacesGranted: ['Finance', 'Procurement', 'HR', 'Operations', 'Projects', 'Platform'],
    permissionCount: 84,
    userCount: 3,
    canApprove: true,
    canConfigure: false,
    canAudit: true,
    status: 'Active',
    createdBy: 'System',
    lastModified: '2024-01-10',
  },
  {
    id: 'ROL-002',
    name: 'Platform Admin',
    description: 'Full platform configuration access including users, roles, routing, and integration settings',
    type: 'System',
    workspacesGranted: ['Finance', 'Procurement', 'HR', 'Operations', 'Projects', 'Platform'],
    permissionCount: 96,
    userCount: 1,
    canApprove: true,
    canConfigure: true,
    canAudit: true,
    status: 'Active',
    createdBy: 'System',
    lastModified: '2024-01-10',
  },
  {
    id: 'ROL-003',
    name: 'Finance Owner',
    description: 'Approves financial transactions, manages budgets, and oversees Finance workspace configuration',
    type: 'System',
    workspacesGranted: ['Finance', 'Procurement'],
    permissionCount: 62,
    userCount: 3,
    canApprove: true,
    canConfigure: true,
    canAudit: true,
    status: 'Active',
    createdBy: 'System',
    lastModified: '2024-01-15',
  },
  {
    id: 'ROL-004',
    name: 'Finance Operator',
    description: 'Processes invoices, expenses, and journal entries; raises requests for Finance Owner approval',
    type: 'System',
    workspacesGranted: ['Finance'],
    permissionCount: 38,
    userCount: 5,
    canApprove: false,
    canConfigure: false,
    canAudit: false,
    status: 'Active',
    createdBy: 'System',
    lastModified: '2024-01-15',
  },
  {
    id: 'ROL-005',
    name: 'HR Owner',
    description: 'Manages HR policies, approves leave and onboarding workflows, configures HR workspace',
    type: 'System',
    workspacesGranted: ['HR', 'Operations'],
    permissionCount: 58,
    userCount: 2,
    canApprove: true,
    canConfigure: true,
    canAudit: true,
    status: 'Active',
    createdBy: 'System',
    lastModified: '2024-01-15',
  },
  {
    id: 'ROL-006',
    name: 'HR Operator',
    description: 'Processes onboarding, offboarding, and HR service requests; manages employee records',
    type: 'System',
    workspacesGranted: ['HR'],
    permissionCount: 34,
    userCount: 4,
    canApprove: false,
    canConfigure: false,
    canAudit: false,
    status: 'Active',
    createdBy: 'System',
    lastModified: '2024-01-15',
  },
  {
    id: 'ROL-007',
    name: 'Procurement Owner',
    description: 'Approves purchase orders and vendor changes, manages Procurement workspace configuration',
    type: 'System',
    workspacesGranted: ['Procurement', 'Finance'],
    permissionCount: 56,
    userCount: 2,
    canApprove: true,
    canConfigure: true,
    canAudit: true,
    status: 'Active',
    createdBy: 'System',
    lastModified: '2024-01-15',
  },
  {
    id: 'ROL-008',
    name: 'Procurement Operator',
    description: 'Creates purchase requests, manages vendor communications, processes RFQs',
    type: 'System',
    workspacesGranted: ['Procurement'],
    permissionCount: 31,
    userCount: 4,
    canApprove: false,
    canConfigure: false,
    canAudit: false,
    status: 'Active',
    createdBy: 'System',
    lastModified: '2024-01-15',
  },
  {
    id: 'ROL-009',
    name: 'Inventory Manager',
    description: 'Manages stock levels, reorder points, and inventory adjustments across locations',
    type: 'Domain',
    workspacesGranted: ['Operations', 'Procurement'],
    permissionCount: 28,
    userCount: 2,
    canApprove: false,
    canConfigure: false,
    canAudit: false,
    status: 'Active',
    createdBy: 'Rashid Ahmed',
    lastModified: '2024-03-01',
  },
  {
    id: 'ROL-010',
    name: 'Project Manager',
    description: 'Manages project budgets, timelines, and approves project-related financial requests',
    type: 'Domain',
    workspacesGranted: ['Projects', 'Finance', 'HR'],
    permissionCount: 44,
    userCount: 3,
    canApprove: true,
    canConfigure: false,
    canAudit: false,
    status: 'Active',
    createdBy: 'Rashid Ahmed',
    lastModified: '2024-03-01',
  },
  {
    id: 'ROL-011',
    name: 'Master Data Steward',
    description: 'Governs master data entities — vendors, customers, chart of accounts, cost centres',
    type: 'Domain',
    workspacesGranted: ['Finance', 'Procurement', 'HR'],
    permissionCount: 36,
    userCount: 2,
    canApprove: true,
    canConfigure: false,
    canAudit: true,
    status: 'Active',
    createdBy: 'Rashid Ahmed',
    lastModified: '2024-04-10',
  },
  {
    id: 'ROL-012',
    name: 'Auditor',
    description: 'Read-only access to all workspaces plus audit trail, compliance reports, and evidence repository',
    type: 'System',
    workspacesGranted: ['Finance', 'Procurement', 'HR', 'Operations', 'Platform'],
    permissionCount: 22,
    userCount: 2,
    canApprove: false,
    canConfigure: false,
    canAudit: true,
    status: 'Active',
    createdBy: 'System',
    lastModified: '2024-01-20',
  },
  {
    id: 'ROL-013',
    name: 'Read-Only',
    description: 'View-only access for guests, executives, and stakeholders who need visibility without edit rights',
    type: 'System',
    workspacesGranted: ['Finance', 'Procurement', 'HR'],
    permissionCount: 14,
    userCount: 4,
    canApprove: false,
    canConfigure: false,
    canAudit: false,
    status: 'Active',
    createdBy: 'System',
    lastModified: '2024-01-10',
  },
  {
    id: 'ROL-014',
    name: 'AI Analyst',
    description: 'Access to AI dashboards, anomaly detection outputs, and prediction reports across workspaces',
    type: 'Custom',
    workspacesGranted: ['Finance', 'Operations', 'Projects'],
    permissionCount: 18,
    userCount: 2,
    canApprove: false,
    canConfigure: false,
    canAudit: false,
    status: 'Active',
    createdBy: 'Rashid Ahmed',
    lastModified: '2024-09-01',
  },
  {
    id: 'ROL-015',
    name: 'Service Desk',
    description: 'Manages incoming service requests, assigns tasks, and updates ticket statuses in Service Ops',
    type: 'Custom',
    workspacesGranted: ['Operations'],
    permissionCount: 20,
    userCount: 3,
    canApprove: false,
    canConfigure: false,
    canAudit: false,
    status: 'Active',
    createdBy: 'Rashid Ahmed',
    lastModified: '2024-06-15',
  },
  {
    id: 'ROL-016',
    name: 'Delegation Proxy',
    description: 'Temporarily acts on behalf of an absent approver; inherits approval authority for configured scope',
    type: 'Custom',
    workspacesGranted: ['Finance', 'Procurement', 'HR'],
    permissionCount: 30,
    userCount: 2,
    canApprove: true,
    canConfigure: false,
    canAudit: false,
    status: 'Draft',
    createdBy: 'Rashid Ahmed',
    lastModified: '2025-05-20',
  },
]

export default function RoleManagement() {
  const [filter, setFilter] = useState<'All' | 'System' | 'Custom' | 'Domain'>('All')

  const stats = {
    totalRoles: platformRoles.length,
    systemRoles: platformRoles.filter(r => r.type === 'System').length,
    customRoles: platformRoles.filter(r => r.type === 'Custom').length,
    totalUsersAssigned: platformRoles.reduce((sum, r) => sum + r.userCount, 0),
  }

  const filtered = filter === 'All' ? platformRoles : platformRoles.filter(r => r.type === filter)

  const filterOptions: Array<'All' | 'System' | 'Custom' | 'Domain'> = ['All', 'System', 'Custom', 'Domain']

  const typeColors: Record<string, string> = {
    'System': 'bg-status-info-surface text-status-info',
    'Custom': 'bg-status-warning-surface text-status-warning',
    'Domain': 'bg-purple-50 text-purple-700',
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Role Management</h1>
          <p className="text-sm text-text-muted mt-1">
            Define and manage platform roles — configure permissions, workspace access, approval authority, and user assignments.
          </p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} />
          Create Role
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Total Roles</p>
          <p className="text-3xl font-bold text-text-primary">{stats.totalRoles}</p>
          <p className="text-xs text-text-muted mt-1">across all role types</p>
        </div>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">System Roles</p>
          <p className="text-3xl font-bold text-status-info">{stats.systemRoles}</p>
          <p className="text-xs text-text-muted mt-1">platform-defined roles</p>
        </div>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Custom Roles</p>
          <p className="text-3xl font-bold text-status-warning">{stats.customRoles}</p>
          <p className="text-xs text-text-muted mt-1">organisation-created</p>
        </div>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Users Assigned</p>
          <p className="text-3xl font-bold text-status-success">{stats.totalUsersAssigned}</p>
          <p className="text-xs text-text-muted mt-1">total role assignments</p>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 mb-4">
        {filterOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === opt ? 'bg-dq-navy text-white' : 'bg-surface-1 text-text-muted hover:bg-border-subtle'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm">
        <table className="w-full">
          <thead className="bg-surface-1 border-b border-border-subtle">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Role</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Workspaces</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Permissions</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Users</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approve</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Configure</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Audit</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Modified</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map(role => (
              <tr key={role.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-text-primary">{role.name}</p>
                  <p className="text-xs text-text-muted mt-0.5 max-w-xs">{role.description}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColors[role.type]}`}>
                    {role.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {role.workspacesGranted.slice(0, 3).map(ws => (
                      <span key={ws} className="text-xs bg-surface-1 text-text-secondary px-1.5 py-0.5 rounded">
                        {ws}
                      </span>
                    ))}
                    {role.workspacesGranted.length > 3 && (
                      <span className="text-xs text-text-muted">+{role.workspacesGranted.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-text-primary">{role.permissionCount}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-text-primary">{role.userCount}</span>
                </td>
                <td className="px-4 py-3">
                  {role.canApprove ? (
                    <ShieldCheck size={16} className="text-status-success" />
                  ) : (
                    <span className="text-text-muted text-sm">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {role.canConfigure ? (
                    <Settings size={16} className="text-status-info" />
                  ) : (
                    <span className="text-text-muted text-sm">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {role.canAudit ? (
                    <Eye size={16} className="text-purple-600" />
                  ) : (
                    <span className="text-text-muted text-sm">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-secondary">{role.lastModified}</span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={role.status} />
                </td>
                <td className="px-4 py-3">
                  <button className="p-1.5 rounded hover:bg-surface-1 text-text-muted hover:text-text-primary transition-colors">
                    <Edit2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Governance Notes */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-status-info-surface border border-status-info/20 rounded-card">
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} className="text-status-info mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">Role Inheritance</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Domain roles (Inventory Manager, Project Manager, Master Data Steward) automatically inherit the base Read-Only permission set for all workspaces they are granted access to. Additional write or approval permissions are explicitly defined on top of this base layer. This ensures that Domain role users always have visibility without unintended broad access.
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <div className="flex items-start gap-3">
            <Settings size={18} className="text-status-warning mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">Approval Authority</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Only roles where canApprove is enabled appear as valid approvers in the Approval Threshold matrix and Escalation Rules configuration. When a role's approval flag is changed, all linked approval thresholds and routing rules are automatically reviewed and may require re-validation by a Platform Admin before they take effect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
