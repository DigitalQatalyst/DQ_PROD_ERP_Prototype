import { useState } from 'react'
import { History, AlertTriangle, CheckCircle2, Clock, RotateCcw, Eye } from 'lucide-react'

interface ChangeLogEntry {
  id: string
  changeType: 'Config Change' | 'Rule Update' | 'User Change' | 'Role Change' | 'Integration Change' | 'Security Policy' | 'Data Governance'
  module: string
  description: string
  changedBy: string
  changedByRole: string
  changedAt: string
  impactLevel: 'Critical' | 'High' | 'Medium' | 'Low'
  affectedRecords: number
  requiresApproval: boolean
  approvedBy: string
  approvedAt: string
  rollbackAvailable: boolean
  changeRef: string
}

const changeLog: ChangeLogEntry[] = [
  { id: 'CL-001', changeType: 'Config Change', module: 'Approval Thresholds', description: 'Raised invoice auto-approve threshold from AED 5,000 to AED 7,500 for Finance Ops role', changedBy: 'Mohammed Rashid', changedByRole: 'Managing Director', changedAt: '09 Jun 2026, 14:22', impactLevel: 'High', affectedRecords: 14, requiresApproval: true, approvedBy: 'Tariq Al-Amin', approvedAt: '09 Jun 2026, 15:10', rollbackAvailable: true, changeRef: 'CHG-2026-0089' },
  { id: 'CL-002', changeType: 'Rule Update', module: 'Escalation Rules', description: 'Added Finance CFO as fallback escalation step 3 for overdue invoices > AED 50K', changedBy: 'Tariq Al-Amin', changedByRole: 'Finance Owner', changedAt: '09 Jun 2026, 11:05', impactLevel: 'Medium', affectedRecords: 3, requiresApproval: false, approvedBy: '—', approvedAt: '—', rollbackAvailable: true, changeRef: 'CHG-2026-0088' },
  { id: 'CL-003', changeType: 'User Change', module: 'User Management', description: 'Offboarded user Khalid Al-Rashidi — sessions revoked, records archived, BC access removed', changedBy: 'Rashid Ahmed', changedByRole: 'IT Manager', changedAt: '08 Jun 2026, 09:30', impactLevel: 'High', affectedRecords: 1, requiresApproval: true, approvedBy: 'Mohammed Rashid', approvedAt: '08 Jun 2026, 09:45', rollbackAvailable: false, changeRef: 'CHG-2026-0087' },
  { id: 'CL-004', changeType: 'Integration Change', module: 'BC Integration Settings', description: 'Updated BC Sync Engine retry interval from 30 min to 15 min for failed invoice postings', changedBy: 'Rashid Ahmed', changedByRole: 'IT Manager', changedAt: '07 Jun 2026, 16:48', impactLevel: 'Medium', affectedRecords: 0, requiresApproval: false, approvedBy: '—', approvedAt: '—', rollbackAvailable: true, changeRef: 'CHG-2026-0086' },
  { id: 'CL-005', changeType: 'Role Change', module: 'Role Management', description: 'Elevated Sara Pereira from Finance Operator to Finance Approver — additional approval authority granted', changedBy: 'Mohammed Rashid', changedByRole: 'Managing Director', changedAt: '06 Jun 2026, 10:15', impactLevel: 'High', affectedRecords: 1, requiresApproval: true, approvedBy: 'Tariq Al-Amin', approvedAt: '06 Jun 2026, 11:02', rollbackAvailable: false, changeRef: 'CHG-2026-0085' },
  { id: 'CL-006', changeType: 'Security Policy', module: 'Access Control', description: 'Enforced MFA requirement for all Platform Admin and Finance Owner logins — effective immediately', changedBy: 'Rashid Ahmed', changedByRole: 'IT Manager', changedAt: '05 Jun 2026, 08:00', impactLevel: 'Critical', affectedRecords: 6, requiresApproval: true, approvedBy: 'Mohammed Rashid', approvedAt: '04 Jun 2026, 17:30', rollbackAvailable: true, changeRef: 'CHG-2026-0084' },
  { id: 'CL-007', changeType: 'Config Change', module: 'SLA Setup', description: 'Reduced Critical ticket initial response SLA from 4h to 2h; Resolution SLA unchanged at 24h', changedBy: 'Maya Sharma', changedByRole: 'Operations Manager', changedAt: '03 Jun 2026, 13:40', impactLevel: 'Medium', affectedRecords: 7, requiresApproval: false, approvedBy: '—', approvedAt: '—', rollbackAvailable: true, changeRef: 'CHG-2026-0083' },
  { id: 'CL-008', changeType: 'Rule Update', module: 'Routing Rules', description: 'Added routing rule to direct IT Asset requests > AED 15K to both IT Manager and Finance Owner simultaneously', changedBy: 'Rashid Ahmed', changedByRole: 'IT Manager', changedAt: '02 Jun 2026, 11:20', impactLevel: 'Medium', affectedRecords: 5, requiresApproval: false, approvedBy: '—', approvedAt: '—', rollbackAvailable: true, changeRef: 'CHG-2026-0082' },
  { id: 'CL-009', changeType: 'User Change', module: 'User Management', description: 'Onboarded Noor Al-Hajri as Procurement Coordinator — role assigned, BC access provisioned, workspace configured', changedBy: 'Rashid Ahmed', changedByRole: 'IT Manager', changedAt: '01 Jun 2026, 09:00', impactLevel: 'Low', affectedRecords: 1, requiresApproval: false, approvedBy: '—', approvedAt: '—', rollbackAvailable: false, changeRef: 'CHG-2026-0081' },
  { id: 'CL-010', changeType: 'Data Governance', module: 'Master Data Governance', description: 'Updated cost centre mapping — CC-105 (Projects) renamed to CC-105-EXE and split into two child codes', changedBy: 'Tariq Al-Amin', changedByRole: 'Finance Owner', changedAt: '30 May 2026, 14:05', impactLevel: 'High', affectedRecords: 47, requiresApproval: true, approvedBy: 'Mohammed Rashid', approvedAt: '30 May 2026, 16:22', rollbackAvailable: true, changeRef: 'CHG-2026-0080' },
  { id: 'CL-011', changeType: 'Config Change', module: 'Approval Thresholds', description: 'Purchase request threshold for Finance review lowered from AED 25K to AED 15K following board directive', changedBy: 'Mohammed Rashid', changedByRole: 'Managing Director', changedAt: '28 May 2026, 09:10', impactLevel: 'Critical', affectedRecords: 22, requiresApproval: true, approvedBy: 'Tariq Al-Amin', approvedAt: '28 May 2026, 10:00', rollbackAvailable: true, changeRef: 'CHG-2026-0079' },
  { id: 'CL-012', changeType: 'Integration Change', module: 'Sync Rules', description: 'Enabled real-time sync for vendor payment status — previously batch-only at end of day', changedBy: 'Rashid Ahmed', changedByRole: 'IT Manager', changedAt: '27 May 2026, 15:30', impactLevel: 'Medium', affectedRecords: 0, requiresApproval: false, approvedBy: '—', approvedAt: '—', rollbackAvailable: true, changeRef: 'CHG-2026-0078' },
  { id: 'CL-013', changeType: 'Role Change', module: 'Permission Groups', description: 'Created new permission group "Project Viewer" — read-only access to Projects module for department heads', changedBy: 'Rashid Ahmed', changedByRole: 'IT Manager', changedAt: '26 May 2026, 10:55', impactLevel: 'Low', affectedRecords: 8, requiresApproval: false, approvedBy: '—', approvedAt: '—', rollbackAvailable: true, changeRef: 'CHG-2026-0077' },
  { id: 'CL-014', changeType: 'Security Policy', module: 'Session Management', description: 'Reduced session idle timeout from 60 min to 30 min for Finance and HR roles — DPIA compliance requirement', changedBy: 'Rashid Ahmed', changedByRole: 'IT Manager', changedAt: '23 May 2026, 08:15', impactLevel: 'High', affectedRecords: 11, requiresApproval: true, approvedBy: 'Mohammed Rashid', approvedAt: '22 May 2026, 17:00', rollbackAvailable: true, changeRef: 'CHG-2026-0076' },
  { id: 'CL-015', changeType: 'Rule Update', module: 'Approval Rules', description: 'Modified vendor onboarding rule — removed Compliance pre-check gate; replaced with post-approval compliance flag', changedBy: 'Yasmin Al-Mansoori', changedByRole: 'Procurement Owner', changedAt: '21 May 2026, 12:00', impactLevel: 'High', affectedRecords: 2, requiresApproval: true, approvedBy: 'Mohammed Rashid', approvedAt: '21 May 2026, 14:30', rollbackAvailable: true, changeRef: 'CHG-2026-0075' },
  { id: 'CL-016', changeType: 'Config Change', module: 'Service Categories', description: 'Added "AI Tools & Subscriptions" as new service category under IT; mapped to BC cost centre CC-108', changedBy: 'Rashid Ahmed', changedByRole: 'IT Manager', changedAt: '19 May 2026, 16:00', impactLevel: 'Low', affectedRecords: 0, requiresApproval: false, approvedBy: '—', approvedAt: '—', rollbackAvailable: true, changeRef: 'CHG-2026-0074' },
  { id: 'CL-017', changeType: 'Data Governance', module: 'Entity Dimension Governance', description: 'Added UAE National as required dimension field on all employee records — retroactive enrichment required for 43 records', changedBy: 'Fatima Bin Hammad', changedByRole: 'HR Manager', changedAt: '16 May 2026, 11:30', impactLevel: 'High', affectedRecords: 43, requiresApproval: true, approvedBy: 'Mohammed Rashid', approvedAt: '15 May 2026, 17:45', rollbackAvailable: false, changeRef: 'CHG-2026-0073' },
  { id: 'CL-018', changeType: 'Rule Update', module: 'Delegation & Proxy Rules', description: 'Extended Mohammed Rashid delegation to Tariq Al-Amin for Finance approvals during overseas travel 18-25 May', changedBy: 'Mohammed Rashid', changedByRole: 'Managing Director', changedAt: '15 May 2026, 08:00', impactLevel: 'Medium', affectedRecords: 1, requiresApproval: false, approvedBy: '—', approvedAt: '—', rollbackAvailable: false, changeRef: 'CHG-2026-0072' },
  { id: 'CL-019', changeType: 'Integration Change', module: 'BC Integration Settings', description: 'Updated BC API base URL following May 2026 BC tenant migration to new Azure region (UAE North)', changedBy: 'Rashid Ahmed', changedByRole: 'IT Manager', changedAt: '12 May 2026, 22:10', impactLevel: 'Critical', affectedRecords: 0, requiresApproval: true, approvedBy: 'Mohammed Rashid', approvedAt: '12 May 2026, 21:50', rollbackAvailable: true, changeRef: 'CHG-2026-0071' },
  { id: 'CL-020', changeType: 'Config Change', module: 'Required Evidence Setup', description: 'Made vendor bank letter mandatory for all vendor payments > AED 20K; previously advisory', changedBy: 'Tariq Al-Amin', changedByRole: 'Finance Owner', changedAt: '10 May 2026, 10:40', impactLevel: 'Medium', affectedRecords: 31, requiresApproval: false, approvedBy: '—', approvedAt: '—', rollbackAvailable: true, changeRef: 'CHG-2026-0070' },
  { id: 'CL-021', changeType: 'User Change', module: 'User Management', description: 'Onboarded Layla Seitkali as Project Lead — Projects module access granted, role assigned, workspace invitation sent', changedBy: 'Rashid Ahmed', changedByRole: 'IT Manager', changedAt: '07 May 2026, 09:15', impactLevel: 'Low', affectedRecords: 1, requiresApproval: false, approvedBy: '—', approvedAt: '—', rollbackAvailable: false, changeRef: 'CHG-2026-0069' },
  { id: 'CL-022', changeType: 'Security Policy', module: 'Access Control', description: 'Restricted external auditor login window to business hours 08:00–18:00 GST; after-hours access requires MD approval', changedBy: 'Rashid Ahmed', changedByRole: 'IT Manager', changedAt: '04 May 2026, 14:00', impactLevel: 'High', affectedRecords: 5, requiresApproval: true, approvedBy: 'Mohammed Rashid', approvedAt: '04 May 2026, 13:30', rollbackAvailable: true, changeRef: 'CHG-2026-0068' },
]

export default function PlatformChangeLog() {
  const [filter, setFilter] = useState<'All' | 'Config Change' | 'Rule Update' | 'User Change' | 'Role Change' | 'Integration Change'>('All')

  const stats = {
    total: changeLog.length,
    thisMonth: changeLog.filter(c => c.changedAt.startsWith('0') || c.changedAt.startsWith('09') || c.changedAt.includes('Jun')).length,
    criticalHigh: changeLog.filter(c => c.impactLevel === 'Critical' || c.impactLevel === 'High').length,
    pendingApproval: changeLog.filter(c => c.requiresApproval && c.approvedBy === '—').length,
  }

  const filtered = filter === 'All'
    ? changeLog
    : changeLog.filter(c => c.changeType === filter)

  const impactColor = (level: string) => {
    if (level === 'Critical') return 'bg-status-error-surface text-status-error-text'
    if (level === 'High') return 'bg-orange-50 text-dq-orange'
    if (level === 'Medium') return 'bg-status-warning-surface text-status-warning-text'
    return 'bg-surface-1 text-text-muted'
  }

  const changeTypeColor = (type: string) => {
    if (type === 'Security Policy') return 'bg-status-error-surface text-status-error-text'
    if (type === 'Integration Change') return 'bg-status-info-surface text-status-info-text'
    if (type === 'Rule Update') return 'bg-status-warning-surface text-status-warning-text'
    if (type === 'Config Change') return 'bg-surface-1 text-text-secondary'
    if (type === 'Role Change') return 'bg-orange-50 text-dq-orange'
    if (type === 'User Change') return 'bg-status-success-surface text-status-success-text'
    return 'bg-surface-1 text-text-muted'
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Platform Change Log</h1>
          <p className="text-sm text-text-muted">Historical log of all platform-level configuration, rule, user and integration changes</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Total Changes</p>
            <History size={14} className="text-dq-navy" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
          <p className="text-xs text-text-disabled mt-0.5">all time (shown)</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">This Month</p>
            <CheckCircle2 size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.thisMonth}</p>
          <p className="text-xs text-text-disabled mt-0.5">Jun 2026</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Critical / High</p>
            <AlertTriangle size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.criticalHigh}</p>
          <p className="text-xs text-text-disabled mt-0.5">impact changes</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Pending Approval</p>
            <Clock size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.pendingApproval}</p>
          <p className="text-xs text-text-disabled mt-0.5">awaiting sign-off</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Config Change', 'Rule Update', 'User Change', 'Role Change', 'Integration Change'] as const).map((f) => (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Ref</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Change</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Module</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Changed By</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Changed At</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Impact</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Records</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approved By</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Rollback</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((entry) => (
                <tr key={entry.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-xs font-mono text-text-disabled">{entry.changeRef}</p>
                    <p className="text-xs text-text-disabled">{entry.id}</p>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="text-sm text-text-primary leading-snug">{entry.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${changeTypeColor(entry.changeType)}`}>
                      {entry.changeType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary whitespace-nowrap">{entry.module}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-medium text-text-primary">{entry.changedBy}</p>
                    <p className="text-xs text-text-muted">{entry.changedByRole}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary whitespace-nowrap">{entry.changedAt}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${impactColor(entry.impactLevel)}`}>
                      {entry.impactLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-mono text-text-secondary">{entry.affectedRecords > 0 ? entry.affectedRecords : '—'}</span>
                  </td>
                  <td className="px-4 py-3">
                    {entry.approvedBy !== '—' ? (
                      <div>
                        <p className="text-xs font-medium text-status-success-text">{entry.approvedBy}</p>
                        <p className="text-xs text-text-muted">{entry.approvedAt}</p>
                      </div>
                    ) : entry.requiresApproval ? (
                      <span className="inline-flex items-center gap-1 text-xs text-status-warning-text font-medium">
                        <Clock size={11} />Pending
                      </span>
                    ) : (
                      <span className="text-xs text-text-disabled">Not required</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {entry.rollbackAvailable ? (
                      <span className="inline-flex items-center gap-1 text-xs text-status-info-text font-medium">
                        <RotateCcw size={11} />Available
                      </span>
                    ) : (
                      <span className="text-xs text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="View details">
                      <Eye size={14} className="text-text-muted" strokeWidth={1.5} />
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
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Change Approval</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Changes classified as <strong>High</strong> or <strong>Critical</strong> impact require second-level Platform Admin approval before activation. Approved changes are logged with the approver's name and timestamp. Changes made without required approval are blocked at the platform level and queued for review.
          </p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Rollback Window</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Configuration changes can be rolled back within <strong>72 hours</strong> of activation. Rollback itself creates a new log entry with reference to the original change (CHG ref). User onboarding, offboarding and role assignments cannot be rolled back — they must be corrected via a new change action.
          </p>
        </div>
      </div>
    </div>
  )
}
