import { useState } from 'react'
import { Plus, Edit2, UserCheck, Calendar, ClipboardList, Clock } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface DelegationProxyRule {
  id: string
  name: string
  delegator: string
  delegatorRole: string
  delegate: string
  delegateRole: string
  delegationType: 'Full Delegation' | 'Approval-Only' | 'Read-Only Proxy' | 'Partial'
  scope: string[]
  startDate: string
  endDate: string
  reason: string
  status: 'Active' | 'Scheduled' | 'Expired' | 'Draft'
  actionsLogged: number
  servicesInScope: number
  approvedBy: string
  lastModified: string
}

const delegationRules: DelegationProxyRule[] = [
  { id: 'DEL-001', name: 'Annual Leave Cover — Finance', delegator: 'Tariq Al-Amin', delegatorRole: 'Finance Owner', delegate: 'Sara Pereira', delegateRole: 'Finance Lead', delegationType: 'Full Delegation', scope: ['Expense Approvals', 'Invoice Approvals', 'Budget Reviews', 'Vendor Payments'], startDate: '02 Jun 2026', endDate: '16 Jun 2026', reason: 'Annual Leave — UAE public holiday extension', status: 'Active', actionsLogged: 34, servicesInScope: 12, approvedBy: 'Mohammed Rashid', lastModified: '01 Jun 2026' },
  { id: 'DEL-002', name: 'Executive Travel Proxy — MD', delegator: 'Mohammed Rashid', delegatorRole: 'Managing Director', delegate: 'Tariq Al-Amin', delegateRole: 'Finance Owner', delegationType: 'Approval-Only', scope: ['High-Value Expense Approvals (>AED 50K)', 'Vendor Contract Sign-off', 'Executive Escalations'], startDate: '08 Jun 2026', endDate: '14 Jun 2026', reason: 'Business travel — Singapore & Kuala Lumpur roadshow', status: 'Scheduled', actionsLogged: 0, servicesInScope: 5, approvedBy: 'Mohammed Rashid', lastModified: '05 Jun 2026' },
  { id: 'DEL-003', name: 'Maternity Cover — HR Owner', delegator: 'Fatima Bin Hammad', delegatorRole: 'HR Owner', delegate: 'Maya Sharma', delegateRole: 'Operations Manager', delegationType: 'Full Delegation', scope: ['Leave Approvals', 'Onboarding Workflows', 'HR Service Requests', 'Employee Queries'], startDate: '01 May 2026', endDate: '31 Jul 2026', reason: 'Maternity leave — 13-week statutory period', status: 'Active', actionsLogged: 128, servicesInScope: 18, approvedBy: 'Mohammed Rashid', lastModified: '28 Apr 2026' },
  { id: 'DEL-004', name: 'Sick Leave Emergency — Procurement', delegator: 'Yasmin Al-Mansoori', delegatorRole: 'Procurement Owner', delegate: 'Sara Pereira', delegateRole: 'Finance Lead', delegationType: 'Approval-Only', scope: ['Purchase Order Approvals (<AED 25K)', 'Vendor Onboarding Reviews'], startDate: '09 Jun 2026', endDate: '13 Jun 2026', reason: 'Medical absence — unexpected hospitalisation', status: 'Active', actionsLogged: 7, servicesInScope: 4, approvedBy: 'Mohammed Rashid', lastModified: '09 Jun 2026' },
  { id: 'DEL-005', name: 'IT Handover — Project Transition', delegator: 'Rashid Ahmed', delegatorRole: 'IT Admin', delegate: 'Maya Sharma', delegateRole: 'Operations Manager', delegationType: 'Partial', scope: ['Asset Assignment Approvals', 'IT Service Request Reviews'], startDate: '15 May 2026', endDate: '31 May 2026', reason: 'Project handover during ERP go-live stabilisation period', status: 'Expired', actionsLogged: 22, servicesInScope: 3, approvedBy: 'Mohammed Rashid', lastModified: '15 May 2026' },
  { id: 'DEL-006', name: 'Finance Read-Only Proxy — External Audit', delegator: 'Tariq Al-Amin', delegatorRole: 'Finance Owner', delegate: 'Sara Pereira', delegateRole: 'Finance Lead', delegationType: 'Read-Only Proxy', scope: ['GL Reports', 'Expense Reports', 'Invoice Registers', 'Vendor Payment History'], startDate: '01 Jun 2026', endDate: '30 Jun 2026', reason: 'External auditor liaison — Q2 2026 audit support window', status: 'Active', actionsLogged: 19, servicesInScope: 8, approvedBy: 'Mohammed Rashid', lastModified: '31 May 2026' },
  { id: 'DEL-007', name: 'Procurement Approvals — Ramadan Cover', delegator: 'Yasmin Al-Mansoori', delegatorRole: 'Procurement Owner', delegate: 'Tariq Al-Amin', delegateRole: 'Finance Owner', delegationType: 'Approval-Only', scope: ['Purchase Requests', 'PO Approvals', 'Vendor Payment Approvals'], startDate: '01 Mar 2026', endDate: '30 Mar 2026', reason: 'Reduced working hours delegation during Ramadan period', status: 'Expired', actionsLogged: 61, servicesInScope: 9, approvedBy: 'Mohammed Rashid', lastModified: '28 Feb 2026' },
  { id: 'DEL-008', name: 'Projects Delegation — Layla Travel', delegator: 'Layla Seitkali', delegatorRole: 'Project Lead', delegate: 'Maya Sharma', delegateRole: 'Operations Manager', delegationType: 'Full Delegation', scope: ['Project Service Requests', 'Budget Approvals (<AED 10K)', 'Resource Allocation', 'Milestone Sign-offs'], startDate: '16 Jun 2026', endDate: '23 Jun 2026', reason: 'International project review — Kazakhstan site visit', status: 'Scheduled', actionsLogged: 0, servicesInScope: 6, approvedBy: 'Mohammed Rashid', lastModified: '06 Jun 2026' },
  { id: 'DEL-009', name: 'HR Read-Only — Ops Manager Cover', delegator: 'Fatima Bin Hammad', delegatorRole: 'HR Owner', delegate: 'Layla Seitkali', delegateRole: 'Project Lead', delegationType: 'Read-Only Proxy', scope: ['Leave Balances', 'Headcount Reports', 'Org Chart'], startDate: '01 May 2026', endDate: '31 Jul 2026', reason: 'Supporting maternity cover coordinator visibility needs', status: 'Active', actionsLogged: 11, servicesInScope: 3, approvedBy: 'Mohammed Rashid', lastModified: '30 Apr 2026' },
  { id: 'DEL-010', name: 'Expense Approval Delegation — Finance Travel', delegator: 'Sara Pereira', delegatorRole: 'Finance Lead', delegate: 'Tariq Al-Amin', delegateRole: 'Finance Owner', delegationType: 'Approval-Only', scope: ['Expense Claims (<AED 5K)', 'Petty Cash Requests'], startDate: '10 Jun 2026', endDate: '12 Jun 2026', reason: 'Training workshop attendance — ACCA CPD seminar Abu Dhabi', status: 'Active', actionsLogged: 4, servicesInScope: 2, approvedBy: 'Tariq Al-Amin', lastModified: '09 Jun 2026' },
  { id: 'DEL-011', name: 'IT Ops Partial Delegation — Rashid Leave', delegator: 'Rashid Ahmed', delegatorRole: 'IT Admin', delegate: 'Maya Sharma', delegateRole: 'Operations Manager', delegationType: 'Partial', scope: ['IT Support Ticket Approvals', 'Hardware Request Reviews'], startDate: '20 Jun 2026', endDate: '27 Jun 2026', reason: 'Planned annual leave — family visit', status: 'Scheduled', actionsLogged: 0, servicesInScope: 4, approvedBy: 'Mohammed Rashid', lastModified: '06 Jun 2026' },
  { id: 'DEL-012', name: 'Finance Full Delegation — Year-End Close', delegator: 'Tariq Al-Amin', delegatorRole: 'Finance Owner', delegate: 'Sara Pereira', delegateRole: 'Finance Lead', delegationType: 'Full Delegation', scope: ['All Finance Approvals', 'BC Sync Triggers', 'Period Close Actions'], startDate: '28 Dec 2025', endDate: '02 Jan 2026', reason: 'Year-end close delegation during public holiday period', status: 'Expired', actionsLogged: 88, servicesInScope: 14, approvedBy: 'Mohammed Rashid', lastModified: '24 Dec 2025' },
  { id: 'DEL-013', name: 'Procurement Read-Only — Finance Oversight', delegator: 'Yasmin Al-Mansoori', delegatorRole: 'Procurement Owner', delegate: 'Tariq Al-Amin', delegateRole: 'Finance Owner', delegationType: 'Read-Only Proxy', scope: ['Open PO Register', 'Vendor Payment Queue', 'Pending GRN Reports'], startDate: '01 Jun 2026', endDate: '30 Jun 2026', reason: 'Monthly finance oversight access for Q2 budget reconciliation', status: 'Active', actionsLogged: 9, servicesInScope: 5, approvedBy: 'Mohammed Rashid', lastModified: '31 May 2026' },
  { id: 'DEL-014', name: 'Emergency Proxy — MD Unavailable', delegator: 'Mohammed Rashid', delegatorRole: 'Managing Director', delegate: 'Tariq Al-Amin', delegateRole: 'Finance Owner', delegationType: 'Approval-Only', scope: ['All Escalated Approvals', 'Urgent Vendor Payments', 'Emergency Procurement'], startDate: '01 Apr 2026', endDate: '03 Apr 2026', reason: 'Emergency medical appointment — unplanned absence', status: 'Expired', actionsLogged: 15, servicesInScope: 7, approvedBy: 'Mohammed Rashid', lastModified: '01 Apr 2026' },
  { id: 'DEL-015', name: 'HR Partial Delegation — Onboarding Peak', delegator: 'Fatima Bin Hammad', delegatorRole: 'HR Owner', delegate: 'Layla Seitkali', delegateRole: 'Project Lead', delegationType: 'Partial', scope: ['New Hire Onboarding Checklists', 'IT Access Requests for New Joiners'], startDate: '01 Jun 2026', endDate: '15 Jun 2026', reason: 'Onboarding delegation during peak hiring sprint — Q2 headcount expansion', status: 'Active', actionsLogged: 17, servicesInScope: 2, approvedBy: 'Mohammed Rashid', lastModified: '30 May 2026' },
  { id: 'DEL-016', name: 'Finance Approval Draft — Proposed Cover', delegator: 'Sara Pereira', delegatorRole: 'Finance Lead', delegate: 'Maya Sharma', delegateRole: 'Operations Manager', delegationType: 'Approval-Only', scope: ['Expense Claims (<AED 3K)', 'Petty Cash Disbursements'], startDate: '01 Jul 2026', endDate: '14 Jul 2026', reason: 'Proposed cover for summer leave — pending MD sign-off', status: 'Draft', actionsLogged: 0, servicesInScope: 2, approvedBy: 'Pending', lastModified: '06 Jun 2026' },
]

export default function DelegationProxyRules() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Scheduled' | 'Expired'>('All')

  const stats = {
    activeDelegations: delegationRules.filter(r => r.status === 'Active').length,
    scheduled: delegationRules.filter(r => r.status === 'Scheduled').length,
    approvalOnly: delegationRules.filter(r => r.delegationType === 'Approval-Only').length,
    actionsLogged: delegationRules.reduce((sum, r) => sum + r.actionsLogged, 0),
  }

  const filtered = filter === 'All' ? delegationRules : delegationRules.filter(r => r.status === filter)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Delegation &amp; Proxy Rules</h1>
          <p className="text-sm text-text-muted">Manage delegation and proxy arrangements — who acts on behalf of whom during absences</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} strokeWidth={2} />
          Create Delegation
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active Delegations</p>
            <UserCheck size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.activeDelegations}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Scheduled</p>
            <Calendar size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text">{stats.scheduled}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Approval-Only</p>
            <ClipboardList size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.approvalOnly}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Actions Logged</p>
            <Clock size={14} className="text-text-muted" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.actionsLogged}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Active', 'Scheduled', 'Expired'] as const).map((f) => (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Delegation</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Delegator</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Delegate</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Scope</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Period</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions Logged</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approved By</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((rule) => (
                <tr key={rule.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-text-primary">{rule.id}</p>
                      <p className="text-xs text-text-muted mt-0.5">{rule.reason}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-xs font-medium text-text-primary">{rule.delegator}</p>
                      <p className="text-xs text-text-muted">{rule.delegatorRole}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-xs font-medium text-text-primary">{rule.delegate}</p>
                      <p className="text-xs text-text-muted">{rule.delegateRole}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      rule.delegationType === 'Full Delegation'
                        ? 'bg-status-success-surface text-status-success-text'
                        : rule.delegationType === 'Approval-Only'
                        ? 'bg-status-warning-surface text-status-warning-text'
                        : rule.delegationType === 'Read-Only Proxy'
                        ? 'bg-status-info-surface text-status-info-text'
                        : 'bg-surface-1 text-text-secondary'
                    }`}>
                      {rule.delegationType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      {rule.scope.slice(0, 2).map((s, i) => (
                        <span key={i} className="text-xs text-text-secondary">{s}</span>
                      ))}
                      {rule.scope.length > 2 && (
                        <span className="text-xs text-text-muted">+{rule.scope.length - 2} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-xs text-text-primary">{rule.startDate}</p>
                      <p className="text-xs text-text-muted">to {rule.endDate}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {rule.actionsLogged > 0 ? (
                      <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-1.5 rounded-full bg-status-info-surface text-status-info-text text-xs font-bold">
                        {rule.actionsLogged}
                      </span>
                    ) : (
                      <span className="text-text-disabled text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary">{rule.approvedBy}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={rule.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit delegation">
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
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Delegation Limits</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Delegates cannot re-delegate their granted authority to a third party. The original delegator's approval limits always apply — a delegate acting under an Approval-Only delegation cannot exceed the delegator's authorisation thresholds, regardless of the delegate's own role limits.
          </p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Expiry Behavior</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Expired delegations are automatically revoked by the system at midnight on the end date. No manual cleanup is required — original access is restored immediately. Delegates receive a 24-hour expiry reminder notification, and all actions taken under the delegation remain in the audit log permanently.
          </p>
        </div>
      </div>
    </div>
  )
}
