import { useState } from 'react'
import { Plus, Edit2, Lock, Info } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface PermissionGroup {
  id: string
  name: string
  description: string
  type: 'Read' | 'Write' | 'Admin' | 'Approval'
  modules: string[]
  rolesLinked: number
  usersLinked: number
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
  canExport: boolean
  canApprove: boolean
  status: 'Active' | 'Draft'
  lastModified: string
}

const permissionGroups: PermissionGroup[] = [
  {
    id: 'PG-001',
    name: 'Finance Read',
    description: 'View-only access to all Finance workspace modules including ledger, invoices, and reports',
    type: 'Read',
    modules: ['General Ledger', 'Invoices', 'Expenses', 'Budget', 'Reports'],
    rolesLinked: 6,
    usersLinked: 12,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canExport: true,
    canApprove: false,
    status: 'Active',
    lastModified: '2024-01-15',
  },
  {
    id: 'PG-002',
    name: 'Finance Write',
    description: 'Create and edit financial transactions, invoices, expense reports, and journal entries',
    type: 'Write',
    modules: ['General Ledger', 'Invoices', 'Expenses', 'Budget', 'Reports', 'Payments'],
    rolesLinked: 3,
    usersLinked: 7,
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canExport: true,
    canApprove: false,
    status: 'Active',
    lastModified: '2024-01-15',
  },
  {
    id: 'PG-003',
    name: 'Finance Admin',
    description: 'Full Finance workspace control including configuration, BC sync settings, and deletion rights',
    type: 'Admin',
    modules: ['General Ledger', 'Invoices', 'Expenses', 'Budget', 'Reports', 'Payments', 'Settings', 'BC Integration'],
    rolesLinked: 2,
    usersLinked: 3,
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canExport: true,
    canApprove: true,
    status: 'Active',
    lastModified: '2024-01-15',
  },
  {
    id: 'PG-004',
    name: 'HR Read',
    description: 'View-only access to employee records, leave balances, and HR service history',
    type: 'Read',
    modules: ['Employee Records', 'Leave Management', 'Onboarding', 'Payroll Summary'],
    rolesLinked: 4,
    usersLinked: 9,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canExport: false,
    canApprove: false,
    status: 'Active',
    lastModified: '2024-01-15',
  },
  {
    id: 'PG-005',
    name: 'HR Write',
    description: 'Create and update employee records, process leave requests, and manage onboarding workflows',
    type: 'Write',
    modules: ['Employee Records', 'Leave Management', 'Onboarding', 'Payroll Summary', 'Documents'],
    rolesLinked: 2,
    usersLinked: 4,
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canExport: true,
    canApprove: false,
    status: 'Active',
    lastModified: '2024-01-15',
  },
  {
    id: 'PG-006',
    name: 'HR Admin',
    description: 'Full HR workspace control including policy configuration, org chart, and payroll settings',
    type: 'Admin',
    modules: ['Employee Records', 'Leave Management', 'Onboarding', 'Payroll', 'Documents', 'Settings'],
    rolesLinked: 2,
    usersLinked: 2,
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canExport: true,
    canApprove: true,
    status: 'Active',
    lastModified: '2024-02-01',
  },
  {
    id: 'PG-007',
    name: 'Procurement Read',
    description: 'View purchase orders, vendor master data, and procurement pipeline reports',
    type: 'Read',
    modules: ['Purchase Orders', 'Vendors', 'RFQ', 'Contracts', 'Spend Reports'],
    rolesLinked: 5,
    usersLinked: 10,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canExport: true,
    canApprove: false,
    status: 'Active',
    lastModified: '2024-01-20',
  },
  {
    id: 'PG-008',
    name: 'Procurement Write',
    description: 'Raise purchase requests, update vendor records, and submit RFQs for review',
    type: 'Write',
    modules: ['Purchase Orders', 'Vendors', 'RFQ', 'Contracts'],
    rolesLinked: 2,
    usersLinked: 5,
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canExport: true,
    canApprove: false,
    status: 'Active',
    lastModified: '2024-01-20',
  },
  {
    id: 'PG-009',
    name: 'Procurement Admin',
    description: 'Full Procurement workspace including vendor approval, contract management, and workspace settings',
    type: 'Admin',
    modules: ['Purchase Orders', 'Vendors', 'RFQ', 'Contracts', 'Spend Reports', 'Settings'],
    rolesLinked: 2,
    usersLinked: 2,
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canExport: true,
    canApprove: true,
    status: 'Active',
    lastModified: '2024-01-20',
  },
  {
    id: 'PG-010',
    name: 'Inventory Read',
    description: 'View stock levels, reorder statuses, warehouse assignments, and inventory reports',
    type: 'Read',
    modules: ['Stock Management', 'Warehouses', 'Reorder Rules', 'Reports'],
    rolesLinked: 3,
    usersLinked: 5,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canExport: true,
    canApprove: false,
    status: 'Active',
    lastModified: '2024-03-05',
  },
  {
    id: 'PG-011',
    name: 'Inventory Write',
    description: 'Adjust stock, update warehouse assignments, configure reorder thresholds, and log transfers',
    type: 'Write',
    modules: ['Stock Management', 'Warehouses', 'Reorder Rules', 'Transfers'],
    rolesLinked: 1,
    usersLinked: 2,
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canExport: true,
    canApprove: false,
    status: 'Active',
    lastModified: '2024-03-05',
  },
  {
    id: 'PG-012',
    name: 'Master Data Steward',
    description: 'Create, edit, and approve master data entities including vendors, customers, and chart of accounts',
    type: 'Approval',
    modules: ['Vendor Master', 'Customer Master', 'Chart of Accounts', 'Cost Centres', 'Employees'],
    rolesLinked: 2,
    usersLinked: 3,
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canExport: true,
    canApprove: true,
    status: 'Active',
    lastModified: '2024-04-10',
  },
  {
    id: 'PG-013',
    name: 'Platform Config',
    description: 'Configure routing rules, SLA settings, approval thresholds, and integration parameters',
    type: 'Admin',
    modules: ['Routing Rules', 'SLA Setup', 'Approval Thresholds', 'BC Integration', 'Workflow Builder'],
    rolesLinked: 1,
    usersLinked: 1,
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canExport: true,
    canApprove: true,
    status: 'Active',
    lastModified: '2024-02-10',
  },
  {
    id: 'PG-014',
    name: 'Audit Access',
    description: 'Read-only access to audit trails, compliance reports, evidence repository, and all workspace logs',
    type: 'Read',
    modules: ['Audit Trail', 'Compliance Reports', 'Evidence Repository', 'Change Log'],
    rolesLinked: 3,
    usersLinked: 4,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canExport: true,
    canApprove: false,
    status: 'Active',
    lastModified: '2024-01-25',
  },
  {
    id: 'PG-015',
    name: 'Executive Dashboard',
    description: 'Cross-entity KPI dashboards, financial summaries, and operational analytics with export rights',
    type: 'Read',
    modules: ['ERP Dashboard', 'Finance Summary', 'Procurement Analytics', 'HR Overview', 'Service Performance'],
    rolesLinked: 2,
    usersLinked: 3,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canExport: true,
    canApprove: false,
    status: 'Active',
    lastModified: '2024-06-01',
  },
  {
    id: 'PG-016',
    name: 'AI Access',
    description: 'Access to AI anomaly detection, spend forecasting, approval bottleneck insights, and model outputs',
    type: 'Read',
    modules: ['AI Insights', 'Anomaly Detection', 'Spend Forecasting', 'Bottleneck Analysis'],
    rolesLinked: 2,
    usersLinked: 3,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canExport: true,
    canApprove: false,
    status: 'Draft',
    lastModified: '2025-04-15',
  },
]

export default function PermissionGroups() {
  const [filter, setFilter] = useState<'All' | 'Read' | 'Write' | 'Admin' | 'Approval'>('All')

  const stats = {
    totalGroups: permissionGroups.length,
    writeGroups: permissionGroups.filter(g => g.type === 'Write').length,
    adminGroups: permissionGroups.filter(g => g.type === 'Admin').length,
    rolesLinkedTotal: permissionGroups.reduce((sum, g) => sum + g.rolesLinked, 0),
  }

  const filtered = filter === 'All' ? permissionGroups : permissionGroups.filter(g => g.type === filter)

  const filterOptions: Array<'All' | 'Read' | 'Write' | 'Admin' | 'Approval'> = ['All', 'Read', 'Write', 'Admin', 'Approval']

  const typeColors: Record<string, string> = {
    'Read': 'bg-status-info-surface text-status-info',
    'Write': 'bg-status-success-surface text-status-success',
    'Admin': 'bg-status-error-surface text-status-error',
    'Approval': 'bg-status-warning-surface text-status-warning',
  }

  const Tick = () => <span className="text-status-success font-bold text-sm">✓</span>
  const Dash = () => <span className="text-text-muted text-sm">—</span>

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Permission Groups</h1>
          <p className="text-sm text-text-muted mt-1">
            Group permissions by module and assign to roles. Controls what users can create, edit, delete, export, and approve across DWS.04 workspaces.
          </p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} />
          Create Group
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Total Groups</p>
          <p className="text-3xl font-bold text-text-primary">{stats.totalGroups}</p>
          <p className="text-xs text-text-muted mt-1">across all access types</p>
        </div>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Write Groups</p>
          <p className="text-3xl font-bold text-status-success">{stats.writeGroups}</p>
          <p className="text-xs text-text-muted mt-1">with create / edit rights</p>
        </div>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Admin Groups</p>
          <p className="text-3xl font-bold text-status-error">{stats.adminGroups}</p>
          <p className="text-xs text-text-muted mt-1">with full control rights</p>
        </div>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Roles Linked</p>
          <p className="text-3xl font-bold text-status-info">{stats.rolesLinkedTotal}</p>
          <p className="text-xs text-text-muted mt-1">total role associations</p>
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Group Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Modules</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Roles</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Users</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Create</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Edit</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Delete</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Export</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approve</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map(group => (
              <tr key={group.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-text-primary">{group.name}</p>
                  <p className="text-xs text-text-muted mt-0.5 max-w-xs">{group.description}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColors[group.type]}`}>
                    {group.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {group.modules.slice(0, 2).map(mod => (
                      <span key={mod} className="text-xs bg-surface-1 text-text-secondary px-1.5 py-0.5 rounded whitespace-nowrap">
                        {mod}
                      </span>
                    ))}
                    {group.modules.length > 2 && (
                      <span className="text-xs text-text-muted">+{group.modules.length - 2} more</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-text-primary">{group.rolesLinked}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-text-primary">{group.usersLinked}</span>
                </td>
                <td className="px-4 py-3">{group.canCreate ? <Tick /> : <Dash />}</td>
                <td className="px-4 py-3">{group.canEdit ? <Tick /> : <Dash />}</td>
                <td className="px-4 py-3">{group.canDelete ? <Tick /> : <Dash />}</td>
                <td className="px-4 py-3">{group.canExport ? <Tick /> : <Dash />}</td>
                <td className="px-4 py-3">{group.canApprove ? <Tick /> : <Dash />}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={group.status} />
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
            <Info size={18} className="text-status-info mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">Permission Inheritance</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Write permission groups automatically include all permissions granted by the corresponding Read group for the same module set. Similarly, Admin groups include all Write and Read permissions. This means modifying a Read group's scope will cascade to linked Write and Admin groups. Changes to base Read groups require a Platform Admin review before activation.
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <div className="flex items-start gap-3">
            <Lock size={18} className="text-status-warning mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">Least Privilege</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Users are assigned the minimum permission group required to perform their role. Operator-level roles receive Write groups without Admin or Approval rights. Admin and Approval permission groups are reserved for Owner-level roles and above. Any request to assign an Admin group to an Operator role must be reviewed and approved by a Platform Admin with a documented justification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
