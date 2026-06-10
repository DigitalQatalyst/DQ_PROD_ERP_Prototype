import { useState } from 'react'
import { Plus, Edit2, Shield, Users, Layers, Lock } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface WorkspaceAccessRule {
  id: string
  name: string
  description: string
  ruleType: 'Role-Based' | 'Department-Based' | 'Entity-Based' | 'Hybrid'
  targetWorkspace: string
  grantedTo: string
  accessLevel: 'Full' | 'Read-Only' | 'Restricted'
  restrictedActions: string[]
  usersAffected: number
  priority: number
  status: 'Active' | 'Draft'
  lastModified: string
}

const workspaceAccessRules: WorkspaceAccessRule[] = [
  { id: 'WAR-001', name: 'Finance Owner — Full Access', description: 'Finance owners have unrestricted access to all Finance workspace modules', ruleType: 'Role-Based', targetWorkspace: 'Finance', grantedTo: 'Finance Owner', accessLevel: 'Full', restrictedActions: [], usersAffected: 2, priority: 1, status: 'Active', lastModified: '02 Jun 2026' },
  { id: 'WAR-002', name: 'Finance Operator — Entity Restricted', description: 'Finance operators can only view and submit records linked to their assigned entity', ruleType: 'Entity-Based', targetWorkspace: 'Finance', grantedTo: 'Finance Operator', accessLevel: 'Restricted', restrictedActions: ['Delete Record', 'Edit Closed Period', 'Export All'], usersAffected: 5, priority: 2, status: 'Active', lastModified: '02 Jun 2026' },
  { id: 'WAR-003', name: 'Internal Auditor — Finance Read-Only', description: 'Auditors can view all Finance workspace content but cannot create or modify records', ruleType: 'Role-Based', targetWorkspace: 'Finance', grantedTo: 'Internal Auditor', accessLevel: 'Read-Only', restrictedActions: ['Create', 'Edit', 'Delete', 'Submit', 'Approve'], usersAffected: 3, priority: 3, status: 'Active', lastModified: '28 May 2026' },
  { id: 'WAR-004', name: 'HR Owner — Full Access', description: 'HR owners have unrestricted access to all HR workspace modules including sensitive employee data', ruleType: 'Role-Based', targetWorkspace: 'HR', grantedTo: 'HR Owner', accessLevel: 'Full', restrictedActions: [], usersAffected: 1, priority: 1, status: 'Active', lastModified: '01 Jun 2026' },
  { id: 'WAR-005', name: 'Department Manager — Team HR Read-Only', description: 'Managers can view HR records for their direct reports only; payroll and disciplinary files excluded', ruleType: 'Department-Based', targetWorkspace: 'HR', grantedTo: 'Department Manager', accessLevel: 'Read-Only', restrictedActions: ['View Payroll', 'Edit Contract', 'Access Disciplinary Records', 'Export HR Data'], usersAffected: 6, priority: 2, status: 'Active', lastModified: '30 May 2026' },
  { id: 'WAR-006', name: 'HR Coordinator — HR Restricted', description: 'HR coordinators can manage onboarding workflows but cannot modify employee master data', ruleType: 'Role-Based', targetWorkspace: 'HR', grantedTo: 'HR Coordinator', accessLevel: 'Restricted', restrictedActions: ['Edit Employee Master', 'Process Payroll', 'Access Salary Band'], usersAffected: 2, priority: 3, status: 'Active', lastModified: '29 May 2026' },
  { id: 'WAR-007', name: 'Procurement Owner — Full Access', description: 'Procurement owners have unrestricted access to all Procurement workspace modules', ruleType: 'Role-Based', targetWorkspace: 'Procurement', grantedTo: 'Procurement Owner', accessLevel: 'Full', restrictedActions: [], usersAffected: 1, priority: 1, status: 'Active', lastModified: '03 Jun 2026' },
  { id: 'WAR-008', name: 'Budget Holder — Procurement Read-Only', description: 'Budget holders can view purchase requests and POs for their cost centre but cannot raise new requests', ruleType: 'Department-Based', targetWorkspace: 'Procurement', grantedTo: 'Budget Holder', accessLevel: 'Read-Only', restrictedActions: ['Create PO', 'Approve Vendor', 'Edit Catalogue', 'Manage Contracts'], usersAffected: 8, priority: 2, status: 'Active', lastModified: '01 Jun 2026' },
  { id: 'WAR-009', name: 'Vendor Manager — Procurement Restricted', description: 'Vendor managers can manage supplier profiles but cannot raise or approve purchase orders', ruleType: 'Role-Based', targetWorkspace: 'Procurement', grantedTo: 'Vendor Manager', accessLevel: 'Restricted', restrictedActions: ['Create PO', 'Approve PO', 'Access Budget Data'], usersAffected: 2, priority: 3, status: 'Active', lastModified: '29 May 2026' },
  { id: 'WAR-010', name: 'Project Lead — Projects Full Access', description: 'Project leads have full access to their assigned project workspaces including budget and resource management', ruleType: 'Entity-Based', targetWorkspace: 'Projects', grantedTo: 'Project Lead', accessLevel: 'Full', restrictedActions: [], usersAffected: 4, priority: 1, status: 'Active', lastModified: '04 Jun 2026' },
  { id: 'WAR-011', name: 'Executive — Cross-Workspace Read-Only', description: 'MD and executives have read-only access across all workspaces for oversight and reporting purposes', ruleType: 'Hybrid', targetWorkspace: 'All Workspaces', grantedTo: 'Executive (MD)', accessLevel: 'Read-Only', restrictedActions: ['Create', 'Edit', 'Delete', 'Submit'], usersAffected: 1, priority: 1, status: 'Active', lastModified: '05 Jun 2026' },
  { id: 'WAR-012', name: 'IT Admin — IT Ops Full Access', description: 'IT administrators have full access to IT Operations workspace including asset register and system logs', ruleType: 'Role-Based', targetWorkspace: 'IT Operations', grantedTo: 'IT Admin', accessLevel: 'Full', restrictedActions: [], usersAffected: 2, priority: 1, status: 'Active', lastModified: '03 Jun 2026' },
  { id: 'WAR-013', name: 'IT Admin — Inventory Read-Only', description: 'IT admins can view inventory data to plan asset procurement but cannot create purchase records directly', ruleType: 'Role-Based', targetWorkspace: 'Inventory', grantedTo: 'IT Admin', accessLevel: 'Read-Only', restrictedActions: ['Create Stock Record', 'Approve Reorder', 'Edit Inventory Master'], usersAffected: 2, priority: 2, status: 'Active', lastModified: '02 Jun 2026' },
  { id: 'WAR-014', name: 'Platform Admin — All Workspaces Full', description: 'Platform administrators have unrestricted full access to all workspaces for configuration and governance', ruleType: 'Role-Based', targetWorkspace: 'All Workspaces', grantedTo: 'Platform Admin', accessLevel: 'Full', restrictedActions: [], usersAffected: 2, priority: 0, status: 'Active', lastModified: '05 Jun 2026' },
  { id: 'WAR-015', name: 'Operations Manager — Ops Full Access', description: 'Operations managers have full access to the Operations workspace for service delivery and workforce management', ruleType: 'Role-Based', targetWorkspace: 'Operations', grantedTo: 'Operations Manager', accessLevel: 'Full', restrictedActions: [], usersAffected: 1, priority: 1, status: 'Active', lastModified: '01 Jun 2026' },
  { id: 'WAR-016', name: 'Finance — Payroll Entity Isolation', description: 'Payroll data is isolated per legal entity; Finance users may only access payroll for their assigned entity', ruleType: 'Entity-Based', targetWorkspace: 'Payroll', grantedTo: 'Finance Payroll Role', accessLevel: 'Restricted', restrictedActions: ['View Other Entity Payroll', 'Export Cross-Entity Data', 'Approve Cross-Entity'], usersAffected: 3, priority: 2, status: 'Active', lastModified: '28 May 2026' },
  { id: 'WAR-017', name: 'External Auditor — Audit Workspace Read-Only', description: 'External auditors granted temporary read-only access to the Audit workspace for scheduled annual review', ruleType: 'Role-Based', targetWorkspace: 'Audit', grantedTo: 'External Auditor', accessLevel: 'Read-Only', restrictedActions: ['Create', 'Edit', 'Delete', 'Export', 'Download Attachments'], usersAffected: 2, priority: 4, status: 'Draft', lastModified: '06 Jun 2026' },
  { id: 'WAR-018', name: 'Cross-Dept Project Members — Hybrid Restricted', description: 'Cross-functional project team members get restricted access to Finance, HR, and Procurement data within project scope', ruleType: 'Hybrid', targetWorkspace: 'Projects', grantedTo: 'Cross-Dept Project Member', accessLevel: 'Restricted', restrictedActions: ['View Other Projects', 'Edit Budget Baseline', 'Approve Expenses', 'Access HR Salaries'], usersAffected: 7, priority: 3, status: 'Draft', lastModified: '06 Jun 2026' },
]

export default function WorkspaceAccessRules() {
  const [filter, setFilter] = useState<'All' | 'Role-Based' | 'Department-Based' | 'Entity-Based' | 'Hybrid'>('All')

  const stats = {
    activeRules: workspaceAccessRules.filter(r => r.status === 'Active').length,
    roleBased: workspaceAccessRules.filter(r => r.ruleType === 'Role-Based').length,
    workspacesCovered: new Set(workspaceAccessRules.map(r => r.targetWorkspace)).size,
    usersAffected: workspaceAccessRules.reduce((sum, r) => sum + r.usersAffected, 0),
  }

  const filtered = filter === 'All' ? workspaceAccessRules : workspaceAccessRules.filter(r => r.ruleType === filter)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Workspace Access Rules</h1>
          <p className="text-sm text-text-muted">Control which roles, departments, and entities can access each workspace</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} strokeWidth={2} />
          Add Rule
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active Rules</p>
            <Shield size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.activeRules}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Role-Based</p>
            <Users size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text">{stats.roleBased}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Workspaces Covered</p>
            <Layers size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.workspacesCovered}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Users Affected</p>
            <Lock size={14} className="text-text-muted" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.usersAffected}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Role-Based', 'Department-Based', 'Entity-Based', 'Hybrid'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-btn transition-colors ${
              filter === f
                ? 'bg-dq-navy text-white'
                : 'bg-surface-1 text-text-muted hover:bg-border-subtle'
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Rule</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Workspace</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Granted To</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Access Level</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Restricted Actions</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Users</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Priority</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((rule) => (
                <tr key={rule.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-text-primary">{rule.name}</p>
                      <p className="text-xs text-text-muted mt-0.5">{rule.description}</p>
                      <p className="text-xs text-text-disabled font-mono mt-0.5">{rule.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-secondary">
                      {rule.ruleType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium text-text-primary">{rule.targetWorkspace}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary">{rule.grantedTo}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      rule.accessLevel === 'Full'
                        ? 'bg-status-success-surface text-status-success-text'
                        : rule.accessLevel === 'Read-Only'
                        ? 'bg-status-info-surface text-status-info-text'
                        : 'bg-status-warning-surface text-status-warning-text'
                    }`}>
                      {rule.accessLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {rule.restrictedActions.length === 0 ? (
                      <span className="text-xs text-text-disabled italic">None</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {rule.restrictedActions.slice(0, 2).map((action, i) => (
                          <span key={i} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-status-error-surface text-status-error-text">
                            {action}
                          </span>
                        ))}
                        {rule.restrictedActions.length > 2 && (
                          <span className="text-xs text-text-muted">+{rule.restrictedActions.length - 2} more</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-1 text-text-secondary text-xs font-bold">
                      {rule.usersAffected}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-mono text-text-secondary">P{rule.priority}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={rule.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit rule">
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
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Access Inheritance</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Rules are evaluated top-down by priority (lower number = higher priority). The first matching rule for a user determines their access level. Higher-priority rules override lower-priority rules for the same workspace. Platform Admin rules (P0) always take precedence over all other rules.
          </p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Audit Logging</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            All workspace access attempts are logged regardless of grant or deny outcome. Logs capture user identity, timestamp, workspace targeted, action attempted, and the rule applied. Access denial events trigger an alert to the Platform Admin queue within 5 minutes.
          </p>
        </div>
      </div>
    </div>
  )
}
