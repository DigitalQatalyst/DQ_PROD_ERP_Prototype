import { useState } from 'react'
import { Shield, Users, Eye, Download, AlertTriangle, Lock, Edit2 } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface AuditAccessGroup {
  id: string
  groupName: string
  description: string
  type: 'Internal Audit' | 'External Audit' | 'Compliance' | 'Executive' | 'Platform Admin'
  memberRoles: string[]
  modulesAccessible: string[]
  accessLevel: 'Full Audit' | 'Domain Audit' | 'Read-Only'
  canExport: boolean
  canRedact: boolean
  requiresJustification: boolean
  memberCount: number
  lastAuditActivity: string
  nextReviewDue: string
  status: 'Active' | 'Draft' | 'Suspended'
  lastModified: string
}

const auditGroups: AuditAccessGroup[] = [
  {
    id: 'AAG-001', groupName: 'Internal Audit — Full Access', description: 'DQ internal audit team with unrestricted read access across all modules',
    type: 'Internal Audit', memberRoles: ['Internal Auditor', 'Audit Manager'], modulesAccessible: ['Finance', 'Procurement', 'HR', 'Projects', 'IT Assets', 'Vendor Management', 'Compliance', 'Platform Config'],
    accessLevel: 'Full Audit', canExport: true, canRedact: false, requiresJustification: true, memberCount: 4,
    lastAuditActivity: '09 Jun 2026', nextReviewDue: '15 Jun 2026', status: 'Active', lastModified: '01 May 2026',
  },
  {
    id: 'AAG-002', groupName: 'Finance Audit Group', description: 'Focused audit access for finance module — invoices, expenses, budgets and GL postings',
    type: 'Internal Audit', memberRoles: ['Finance Auditor', 'Finance Owner'], modulesAccessible: ['Finance', 'Invoice Processing', 'Expense Management', 'Budget & Allocation'],
    accessLevel: 'Domain Audit', canExport: true, canRedact: false, requiresJustification: true, memberCount: 3,
    lastAuditActivity: '08 Jun 2026', nextReviewDue: '30 Jun 2026', status: 'Active', lastModified: '15 Apr 2026',
  },
  {
    id: 'AAG-003', groupName: 'HR Audit Group', description: 'Restricted audit access to HR lifecycle, leave, payroll requests — sensitive PII fields masked for non-redactors',
    type: 'Internal Audit', memberRoles: ['HR Auditor', 'HR Manager'], modulesAccessible: ['Employee Lifecycle', 'Leave Management', 'Payroll Inputs', 'Recruitment'],
    accessLevel: 'Domain Audit', canExport: true, canRedact: true, requiresJustification: true, memberCount: 2,
    lastAuditActivity: '07 Jun 2026', nextReviewDue: '20 Jun 2026', status: 'Active', lastModified: '10 Apr 2026',
  },
  {
    id: 'AAG-004', groupName: 'Procurement Audit Group', description: 'Audit access for procurement, vendor onboarding, purchase requests and contract management',
    type: 'Internal Audit', memberRoles: ['Procurement Auditor', 'Procurement Owner'], modulesAccessible: ['Purchase Requests', 'Vendor Management', 'Contract Management', 'Asset Assignment'],
    accessLevel: 'Domain Audit', canExport: true, canRedact: false, requiresJustification: true, memberCount: 3,
    lastAuditActivity: '06 Jun 2026', nextReviewDue: '30 Jun 2026', status: 'Active', lastModified: '12 Apr 2026',
  },
  {
    id: 'AAG-005', groupName: 'External Auditor — Read-Only', description: 'Third-party auditors (annual statutory audit). PII masked. No export of names, emails or Emirates IDs. Justification required per session.',
    type: 'External Audit', memberRoles: ['External Auditor'], modulesAccessible: ['Finance', 'Invoice Processing', 'Expense Management', 'Vendor Management'],
    accessLevel: 'Read-Only', canExport: false, canRedact: false, requiresJustification: true, memberCount: 5,
    lastAuditActivity: '05 Jun 2026', nextReviewDue: '10 Jun 2026', status: 'Active', lastModified: '01 Jun 2026',
  },
  {
    id: 'AAG-006', groupName: 'Compliance Officer Access', description: 'Compliance team oversight across all regulated modules — can flag non-compliant entries',
    type: 'Compliance', memberRoles: ['Compliance Officer', 'MLRO'], modulesAccessible: ['Finance', 'Vendor Management', 'Customer Onboarding', 'Employee Lifecycle', 'IT Assets'],
    accessLevel: 'Full Audit', canExport: true, canRedact: false, requiresJustification: true, memberCount: 2,
    lastAuditActivity: '09 Jun 2026', nextReviewDue: '25 Jun 2026', status: 'Active', lastModified: '20 Apr 2026',
  },
  {
    id: 'AAG-007', groupName: 'Executive Summary Access', description: 'MD and C-suite read-only audit summary view. No raw record access — aggregated dashboards only.',
    type: 'Executive', memberRoles: ['Managing Director', 'CFO', 'COO'], modulesAccessible: ['Finance', 'HR', 'Procurement', 'Projects'],
    accessLevel: 'Read-Only', canExport: false, canRedact: false, requiresJustification: false, memberCount: 3,
    lastAuditActivity: '04 Jun 2026', nextReviewDue: '01 Jul 2026', status: 'Active', lastModified: '01 Mar 2026',
  },
  {
    id: 'AAG-008', groupName: 'BC Integration Audit', description: 'Audit access for BC sync events, integration logs, mapping errors and reconciliation history',
    type: 'Internal Audit', memberRoles: ['Integration Auditor', 'IT Manager'], modulesAccessible: ['BC Integration', 'Sync Rules', 'Data Mapping', 'Reconciliation'],
    accessLevel: 'Domain Audit', canExport: true, canRedact: false, requiresJustification: true, memberCount: 2,
    lastAuditActivity: '09 Jun 2026', nextReviewDue: '15 Jun 2026', status: 'Active', lastModified: '22 Apr 2026',
  },
  {
    id: 'AAG-009', groupName: 'Security Audit Group', description: 'Access to authentication logs, permission changes, failed login events, session anomalies',
    type: 'Internal Audit', memberRoles: ['Security Analyst', 'IT Manager'], modulesAccessible: ['Auth & SSO', 'Access Control', 'Permission Groups', 'Role Management'],
    accessLevel: 'Domain Audit', canExport: true, canRedact: false, requiresJustification: true, memberCount: 2,
    lastAuditActivity: '08 Jun 2026', nextReviewDue: '22 Jun 2026', status: 'Active', lastModified: '05 May 2026',
  },
  {
    id: 'AAG-010', groupName: 'Platform Config Audit', description: 'Full configuration audit trail access — approval rules, routing logic, SLAs, escalation paths',
    type: 'Platform Admin', memberRoles: ['Platform Admin', 'DQ IT Director'], modulesAccessible: ['Platform Config', 'Approval Rules', 'Routing Rules', 'SLA Setup', 'Escalation Rules', 'Workflow Builder'],
    accessLevel: 'Full Audit', canExport: true, canRedact: true, requiresJustification: true, memberCount: 2,
    lastAuditActivity: '09 Jun 2026', nextReviewDue: '01 Jul 2026', status: 'Active', lastModified: '10 May 2026',
  },
  {
    id: 'AAG-011', groupName: 'AI Audit Group', description: 'Audit of AI classification decisions, evidence checks, confidence scores and override events',
    type: 'Compliance', memberRoles: ['AI Governance Lead', 'Compliance Officer'], modulesAccessible: ['AI Classification Engine', 'AI Evidence Checker', 'Approval Overrides'],
    accessLevel: 'Domain Audit', canExport: true, canRedact: false, requiresJustification: true, memberCount: 2,
    lastAuditActivity: '03 Jun 2026', nextReviewDue: '30 Jun 2026', status: 'Draft', lastModified: '28 May 2026',
  },
  {
    id: 'AAG-012', groupName: 'Emergency Access Group', description: 'Break-glass emergency access for critical incidents. Suspended by default; activated by Platform Admin with dual approval. All sessions recorded.',
    type: 'Platform Admin', memberRoles: ['Platform Admin', 'Managing Director'], modulesAccessible: ['All Modules'],
    accessLevel: 'Full Audit', canExport: true, canRedact: true, requiresJustification: true, memberCount: 2,
    lastAuditActivity: '14 Mar 2026', nextReviewDue: '14 Jun 2026', status: 'Suspended', lastModified: '14 Mar 2026',
  },
]

export default function AuditPermissions() {
  const [filter, setFilter] = useState<'All' | 'Internal Audit' | 'External Audit' | 'Compliance' | 'Executive'>('All')

  const today = new Date('2026-06-10')
  const thirtyDaysOut = new Date('2026-07-10')

  const stats = {
    activeGroups: auditGroups.filter(g => g.status === 'Active').length,
    totalMembers: auditGroups.reduce((sum, g) => sum + g.memberCount, 0),
    modulesCovered: [...new Set(auditGroups.flatMap(g => g.modulesAccessible))].filter(m => m !== 'All Modules').length,
    pendingReview: auditGroups.filter(g => {
      const due = new Date(g.nextReviewDue + ' 2026')
      return g.status === 'Active' && due <= thirtyDaysOut
    }).length,
  }

  const filtered = filter === 'All' ? auditGroups : auditGroups.filter(g => g.type === filter)

  const accessLevelColor = (level: string) => {
    if (level === 'Full Audit') return 'bg-status-error-surface text-status-error-text'
    if (level === 'Domain Audit') return 'bg-status-warning-surface text-status-warning-text'
    return 'bg-surface-1 text-text-muted'
  }

  const typeColor = (type: string) => {
    if (type === 'Platform Admin') return 'bg-dq-navy text-white'
    if (type === 'Internal Audit') return 'bg-status-info-surface text-status-info-text'
    if (type === 'External Audit') return 'bg-orange-50 text-dq-orange'
    if (type === 'Compliance') return 'bg-status-warning-surface text-status-warning-text'
    return 'bg-surface-1 text-text-muted'
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Audit Permissions</h1>
          <p className="text-sm text-text-muted">Control who can read, export, and administer audit logs — audit access governance</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active Groups</p>
            <Shield size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.activeGroups}</p>
          <p className="text-xs text-text-disabled mt-0.5">of {auditGroups.length} total</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Members</p>
            <Users size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.totalMembers}</p>
          <p className="text-xs text-text-disabled mt-0.5">across all groups</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Modules Covered</p>
            <Eye size={14} className="text-dq-navy" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.modulesCovered}</p>
          <p className="text-xs text-text-disabled mt-0.5">unique modules</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Pending Review</p>
            <AlertTriangle size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.pendingReview}</p>
          <p className="text-xs text-text-disabled mt-0.5">due within 30 days</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Internal Audit', 'External Audit', 'Compliance', 'Executive'] as const).map((f) => (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Group</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Access Level</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Member Roles</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Members</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Export</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Redact</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Justification</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Activity</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Review Due</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((group) => (
                <tr key={group.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-text-primary">{group.groupName}</p>
                      <p className="text-xs text-text-muted max-w-xs">{group.description}</p>
                      <p className="text-xs text-text-disabled font-mono mt-0.5">{group.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColor(group.type)}`}>
                      {group.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${accessLevelColor(group.accessLevel)}`}>
                      {group.accessLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {group.memberRoles.map((role) => (
                        <span key={role} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-secondary">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-text-primary">{group.memberCount}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {group.canExport ? (
                      <span className="text-status-success font-medium text-xs">Yes</span>
                    ) : (
                      <span className="text-status-error font-medium text-xs">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {group.canRedact ? (
                      <span className="text-status-warning font-medium text-xs flex items-center justify-center gap-1"><Lock size={11} />Yes</span>
                    ) : (
                      <span className="text-text-disabled text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {group.requiresJustification ? (
                      <span className="text-status-warning font-medium text-xs">Required</span>
                    ) : (
                      <span className="text-text-disabled text-xs">Not required</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary">{group.lastAuditActivity}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${
                      new Date(group.nextReviewDue + ' 2026') <= thirtyDaysOut && group.status === 'Active'
                        ? 'text-status-warning-text'
                        : 'text-text-secondary'
                    }`}>
                      {group.nextReviewDue}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={group.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit group">
                        <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="View access log">
                        <Eye size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-status-info-surface border border-status-info/20 rounded-card">
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">External Auditor Restrictions</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            External auditor groups cannot export PII fields. Names, email addresses and Emirates IDs are automatically masked in all views accessible to External Audit roles. Export is disabled globally for external auditor sessions. All access sessions require a logged justification before the session is granted.
          </p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Audit of Auditors</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            All audit log access is itself logged in a meta-audit layer, capturing who accessed which module, at what time, and with what justification. This meta-log is accessible only to the Platform Admin group and cannot be exported by any other role. Emergency access sessions generate automatic alerts to Mohammed Rashid (MD).
          </p>
        </div>
      </div>
    </div>
  )
}
