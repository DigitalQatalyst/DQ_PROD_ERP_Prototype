import { useState } from 'react'
import { Lock, Activity, Hash, Eye, ArrowRight } from 'lucide-react'

interface AuditTrailEntry {
  id: string
  eventType: 'Create' | 'Update' | 'Delete' | 'Activate' | 'Suspend' | 'Override'
  objectType: 'Approval Rule' | 'Routing Rule' | 'User' | 'Role' | 'SLA' | 'Escalation Rule' | 'Sync Rule' | 'Access Policy'
  objectId: string
  objectName: string
  actor: string
  actorRole: string
  timestamp: string
  sessionId: string
  ipAddress: string
  changeDescription: string
  fieldChanged: string
  valueBefore: string
  valueAfter: string
  auditHash: string
}

const auditEntries: AuditTrailEntry[] = [
  { id: 'CAT-001', eventType: 'Update', objectType: 'Approval Rule', objectId: 'AR-005', objectName: 'Invoice AED 10K-50K - Finance Owner', actor: 'Mohammed Rashid', actorRole: 'Managing Director', timestamp: '09 Jun 2026, 14:22:31', sessionId: 'sess_a3f…d91', ipAddress: '10.1.0.***', changeDescription: 'Updated approver count for mid-range invoice rule', fieldChanged: 'approverCount', valueBefore: '1', valueAfter: '2', auditHash: 'a3f4d9c1' },
  { id: 'CAT-002', eventType: 'Update', objectType: 'Escalation Rule', objectId: 'ESC-003', objectName: 'Invoice Overdue > AED 50K Escalation', actor: 'Tariq Al-Amin', actorRole: 'Finance Owner', timestamp: '09 Jun 2026, 11:05:14', sessionId: 'sess_b9e…c44', ipAddress: '10.1.0.***', changeDescription: 'Inserted new escalation step 3 — CFO fallback', fieldChanged: 'step3Assignee', valueBefore: '(none)', valueAfter: 'CFO / Finance Director', auditHash: 'b9e1c44f' },
  { id: 'CAT-003', eventType: 'Suspend', objectType: 'User', objectId: 'USR-042', objectName: 'Khalid Al-Rashidi', actor: 'Rashid Ahmed', actorRole: 'IT Manager', timestamp: '08 Jun 2026, 09:30:07', sessionId: 'sess_c2a…f88', ipAddress: '10.1.0.***', changeDescription: 'User suspended as part of offboarding — all active sessions invalidated', fieldChanged: 'status', valueBefore: 'Active', valueAfter: 'Suspended', auditHash: 'c2a8f88b' },
  { id: 'CAT-004', eventType: 'Update', objectType: 'Sync Rule', objectId: 'SR-012', objectName: 'Invoice Posting to BC — Failed Retry', actor: 'Rashid Ahmed', actorRole: 'IT Manager', timestamp: '07 Jun 2026, 16:48:52', sessionId: 'sess_d7b…a12', ipAddress: '10.1.0.***', changeDescription: 'Reduced retry interval for failed invoice sync jobs', fieldChanged: 'retryIntervalMin', valueBefore: '30', valueAfter: '15', auditHash: 'd7b3a12e' },
  { id: 'CAT-005', eventType: 'Update', objectType: 'Role', objectId: 'ROLE-015', objectName: 'Sara Pereira — Finance Role', actor: 'Mohammed Rashid', actorRole: 'Managing Director', timestamp: '06 Jun 2026, 10:15:44', sessionId: 'sess_e4c…b71', ipAddress: '10.1.0.***', changeDescription: 'Elevated user role from Finance Operator to Finance Approver', fieldChanged: 'roleLevel', valueBefore: 'Finance Operator', valueAfter: 'Finance Approver', auditHash: 'e4cb71d2' },
  { id: 'CAT-006', eventType: 'Update', objectType: 'Access Policy', objectId: 'AP-002', objectName: 'Platform Admin MFA Policy', actor: 'Rashid Ahmed', actorRole: 'IT Manager', timestamp: '05 Jun 2026, 08:00:00', sessionId: 'sess_f1d…e55', ipAddress: '10.1.0.***', changeDescription: 'Enforced MFA requirement for Platform Admin and Finance Owner — policy previously optional', fieldChanged: 'mfaEnforced', valueBefore: 'false', valueAfter: 'true', auditHash: 'f1de557a' },
  { id: 'CAT-007', eventType: 'Update', objectType: 'SLA', objectId: 'SLA-001', objectName: 'Critical Ticket Initial Response', actor: 'Maya Sharma', actorRole: 'Operations Manager', timestamp: '03 Jun 2026, 13:40:18', sessionId: 'sess_g6a…c30', ipAddress: '10.1.0.***', changeDescription: 'Halved initial response SLA for Critical priority tickets', fieldChanged: 'responseTimeHours', valueBefore: '4', valueAfter: '2', auditHash: 'g6ac30f9' },
  { id: 'CAT-008', eventType: 'Create', objectType: 'Routing Rule', objectId: 'RR-019', objectName: 'IT Asset > AED 15K Dual Approval', actor: 'Rashid Ahmed', actorRole: 'IT Manager', timestamp: '02 Jun 2026, 11:20:33', sessionId: 'sess_h3b…d77', ipAddress: '10.1.0.***', changeDescription: 'Created new routing rule to send high-value IT assets to IT Manager and Finance Owner simultaneously', fieldChanged: '(new record)', valueBefore: '(none)', valueAfter: 'IT Manager + Finance Owner (parallel)', auditHash: 'h3bd77e1' },
  { id: 'CAT-009', eventType: 'Create', objectType: 'User', objectId: 'USR-061', objectName: 'Noor Al-Hajri', actor: 'Rashid Ahmed', actorRole: 'IT Manager', timestamp: '01 Jun 2026, 09:00:15', sessionId: 'sess_i9f…b20', ipAddress: '10.1.0.***', changeDescription: 'Created new user record for Procurement Coordinator', fieldChanged: '(new record)', valueBefore: '(none)', valueAfter: 'Active / Procurement Coordinator', auditHash: 'i9fb20c4' },
  { id: 'CAT-010', eventType: 'Update', objectType: 'Approval Rule', objectId: 'AR-010', objectName: 'Vendor Onboarding — Compliance Gate', actor: 'Yasmin Al-Mansoori', actorRole: 'Procurement Owner', timestamp: '21 May 2026, 12:00:44', sessionId: 'sess_j2e…a90', ipAddress: '10.1.0.***', changeDescription: 'Removed pre-approval Compliance check gate; replaced with post-approval compliance flag', fieldChanged: 'preApprovalComplianceCheck', valueBefore: 'true', valueAfter: 'false', auditHash: 'j2ea90b7' },
  { id: 'CAT-011', eventType: 'Override', objectType: 'Approval Rule', objectId: 'AR-003', objectName: 'Expense > AED 20K — Full Chain', actor: 'Mohammed Rashid', actorRole: 'Managing Director', timestamp: '20 May 2026, 17:55:02', sessionId: 'sess_k8d…c14', ipAddress: '10.1.0.***', changeDescription: 'MD override: approved single high-value expense bypassing sequential approval — justification: urgent supplier payment', fieldChanged: 'overrideApplied', valueBefore: 'false', valueAfter: 'true (override by MD)', auditHash: 'k8dc14a3' },
  { id: 'CAT-012', eventType: 'Update', objectType: 'Access Policy', objectId: 'AP-008', objectName: 'External Auditor Login Hours', actor: 'Rashid Ahmed', actorRole: 'IT Manager', timestamp: '19 May 2026, 14:00:00', sessionId: 'sess_l5c…f60', ipAddress: '10.1.0.***', changeDescription: 'Restricted external auditor logins to business hours 08:00–18:00 GST only', fieldChanged: 'allowedLoginHours', valueBefore: 'Unrestricted', valueAfter: '08:00–18:00 GST only', auditHash: 'l5cf60d8' },
  { id: 'CAT-013', eventType: 'Update', objectType: 'SLA', objectId: 'SLA-005', objectName: 'Vendor Payment Processing SLA', actor: 'Tariq Al-Amin', actorRole: 'Finance Owner', timestamp: '17 May 2026, 09:30:21', sessionId: 'sess_m1a…b40', ipAddress: '10.1.0.***', changeDescription: 'Extended vendor payment processing SLA for new vendors (first payment) from 5 to 7 business days', fieldChanged: 'processingDaysNewVendor', valueBefore: '5', valueAfter: '7', auditHash: 'm1ab40e5' },
  { id: 'CAT-014', eventType: 'Create', objectType: 'Role', objectId: 'ROLE-024', objectName: 'Project Viewer', actor: 'Rashid Ahmed', actorRole: 'IT Manager', timestamp: '16 May 2026, 10:55:09', sessionId: 'sess_n7e…c22', ipAddress: '10.1.0.***', changeDescription: 'Created Project Viewer role with read-only access to Projects module for department heads', fieldChanged: '(new record)', valueBefore: '(none)', valueAfter: 'Active / Projects read-only', auditHash: 'n7ec22f1' },
  { id: 'CAT-015', eventType: 'Update', objectType: 'Approval Rule', objectId: 'AR-007', objectName: 'Purchase < AED 10K', actor: 'Yasmin Al-Mansoori', actorRole: 'Procurement Owner', timestamp: '15 May 2026, 14:12:37', sessionId: 'sess_o3f…d55', ipAddress: '10.1.0.***', changeDescription: 'Changed purchase approval from unanimous to any-approver (parallel) for speed at sub-AED-10K level', fieldChanged: 'requiresUnanimous', valueBefore: 'true', valueAfter: 'false', auditHash: 'o3fd55b9' },
  { id: 'CAT-016', eventType: 'Activate', objectType: 'Sync Rule', objectId: 'SR-018', objectName: 'Vendor Payment Real-Time Sync', actor: 'Rashid Ahmed', actorRole: 'IT Manager', timestamp: '12 May 2026, 15:30:00', sessionId: 'sess_p6b…a11', ipAddress: '10.1.0.***', changeDescription: 'Activated real-time vendor payment sync — previously in draft/disabled state', fieldChanged: 'status', valueBefore: 'Draft', valueAfter: 'Active', auditHash: 'p6ba11c7' },
  { id: 'CAT-017', eventType: 'Update', objectType: 'Approval Rule', objectId: 'AR-004', objectName: 'Invoice < AED 10K — Finance Ops', actor: 'Tariq Al-Amin', actorRole: 'Finance Owner', timestamp: '10 May 2026, 10:40:55', sessionId: 'sess_q2d…e90', ipAddress: '10.1.0.***', changeDescription: 'Made vendor bank letter mandatory for invoice approval when vendor payment > AED 20K', fieldChanged: 'requiredEvidenceIds', valueBefore: '["EV-001","EV-003"]', valueAfter: '["EV-001","EV-003","EV-007"]', auditHash: 'q2de90f4' },
  { id: 'CAT-018', eventType: 'Update', objectType: 'Escalation Rule', objectId: 'ESC-007', objectName: 'Leave Request Overdue Escalation', actor: 'Fatima Bin Hammad', actorRole: 'HR Manager', timestamp: '08 May 2026, 11:00:22', sessionId: 'sess_r8a…c66', ipAddress: '10.1.0.***', changeDescription: 'Reduced escalation trigger from 5 business days to 3 for unanswered leave requests', fieldChanged: 'escalationTriggerDays', valueBefore: '5', valueAfter: '3', auditHash: 'r8ac66d2' },
  { id: 'CAT-019', eventType: 'Delete', objectType: 'Routing Rule', objectId: 'RR-011', objectName: 'Legacy IT Procurement Routing', actor: 'Rashid Ahmed', actorRole: 'IT Manager', timestamp: '06 May 2026, 09:15:48', sessionId: 'sess_s4e…b33', ipAddress: '10.1.0.***', changeDescription: 'Deleted legacy routing rule superseded by RR-019 — was routing all IT requests to IT Director regardless of amount', fieldChanged: '(full record deleted)', valueBefore: 'Active / IT Director (all amounts)', valueAfter: '(deleted)', auditHash: 's4eb33a8' },
  { id: 'CAT-020', eventType: 'Create', objectType: 'User', objectId: 'USR-060', objectName: 'Layla Seitkali', actor: 'Rashid Ahmed', actorRole: 'IT Manager', timestamp: '07 May 2026, 09:15:00', sessionId: 'sess_t1f…d44', ipAddress: '10.1.0.***', changeDescription: 'Created user account for Layla Seitkali, Project Lead role assigned', fieldChanged: '(new record)', valueBefore: '(none)', valueAfter: 'Active / Project Lead', auditHash: 't1fd44c9' },
  { id: 'CAT-021', eventType: 'Update', objectType: 'SLA', objectId: 'SLA-003', objectName: 'High Priority Service Response', actor: 'Maya Sharma', actorRole: 'Operations Manager', timestamp: '03 May 2026, 14:20:10', sessionId: 'sess_u9c…e77', ipAddress: '10.1.0.***', changeDescription: 'Updated High priority response SLA from 8h to 6h; resolution SLA unchanged at 48h', fieldChanged: 'responseTimeHours', valueBefore: '8', valueAfter: '6', auditHash: 'u9ce77b1' },
  { id: 'CAT-022', eventType: 'Override', objectType: 'Approval Rule', objectId: 'AR-009', objectName: 'Purchase > AED 50K — Full Chain', actor: 'Mohammed Rashid', actorRole: 'Managing Director', timestamp: '28 Apr 2026, 18:10:05', sessionId: 'sess_v3b…f88', ipAddress: '10.1.0.***', changeDescription: 'MD override on urgent supplier order — full approval chain bypassed with CFO verbal approval logged separately', fieldChanged: 'overrideApplied', valueBefore: 'false', valueAfter: 'true (MD override, ref CFO-verbal-2026-04-28)', auditHash: 'v3bf88e0' },
  { id: 'CAT-023', eventType: 'Activate', objectType: 'Approval Rule', objectId: 'AR-021', objectName: 'Master Data Change — Entity Approver', actor: 'Tariq Al-Amin', actorRole: 'Finance Owner', timestamp: '25 Apr 2026, 10:30:00', sessionId: 'sess_w6e…a22', ipAddress: '10.1.0.***', changeDescription: 'Activated master data change approval rule after pilot period completed', fieldChanged: 'status', valueBefore: 'Draft', valueAfter: 'Active', auditHash: 'w6ea22d5' },
  { id: 'CAT-024', eventType: 'Update', objectType: 'Access Policy', objectId: 'AP-005', objectName: 'Finance Session Timeout', actor: 'Rashid Ahmed', actorRole: 'IT Manager', timestamp: '23 Apr 2026, 08:15:00', sessionId: 'sess_x2d…c99', ipAddress: '10.1.0.***', changeDescription: 'Reduced Finance and HR role idle session timeout to 30 min per DPIA compliance requirement', fieldChanged: 'idleTimeoutMinutes', valueBefore: '60', valueAfter: '30', auditHash: 'x2dc99f3' },
]

export default function ConfigurationAuditTrail() {
  const [filter, setFilter] = useState<'All' | 'Create' | 'Update' | 'Delete' | 'Override'>('All')

  const now = new Date('2026-06-10')
  const weekAgo = new Date('2026-06-03')

  const stats = {
    total: auditEntries.length,
    updates: auditEntries.filter(e => e.eventType === 'Update').length,
    creates: auditEntries.filter(e => e.eventType === 'Create').length,
    thisWeek: auditEntries.filter(e => {
      const parts = e.timestamp.split(',')[0].split(' ')
      const day = parseInt(parts[0])
      const month = parts[1]
      return month === 'Jun' && day >= 3
    }).length,
  }

  const filtered = filter === 'All' ? auditEntries : auditEntries.filter(e => e.eventType === filter)

  const eventTypeColor = (type: string) => {
    if (type === 'Create') return 'bg-status-success-surface text-status-success-text'
    if (type === 'Update') return 'bg-status-info-surface text-status-info-text'
    if (type === 'Delete') return 'bg-status-error-surface text-status-error-text'
    if (type === 'Activate') return 'bg-status-success-surface text-status-success-text'
    if (type === 'Suspend') return 'bg-status-warning-surface text-status-warning-text'
    if (type === 'Override') return 'bg-orange-50 text-dq-orange'
    return 'bg-surface-1 text-text-muted'
  }

  const objectTypeColor = (type: string) => {
    if (type === 'User') return 'bg-status-success-surface text-status-success-text'
    if (type === 'Role') return 'bg-orange-50 text-dq-orange'
    if (type === 'Access Policy') return 'bg-status-error-surface text-status-error-text'
    if (type === 'Approval Rule') return 'bg-status-info-surface text-status-info-text'
    if (type === 'Sync Rule') return 'bg-status-warning-surface text-status-warning-text'
    return 'bg-surface-1 text-text-secondary'
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Configuration Audit Trail</h1>
          <p className="text-sm text-text-muted">Immutable audit trail of every configuration change with before and after state</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Total Events</p>
            <Activity size={14} className="text-dq-navy" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
          <p className="text-xs text-text-disabled mt-0.5">all recorded events</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Updates</p>
            <ArrowRight size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.updates}</p>
          <p className="text-xs text-text-disabled mt-0.5">field-level changes</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Creates</p>
            <Lock size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.creates}</p>
          <p className="text-xs text-text-disabled mt-0.5">new objects</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">This Week</p>
            <Hash size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.thisWeek}</p>
          <p className="text-xs text-text-disabled mt-0.5">since 3 Jun 2026</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Create', 'Update', 'Delete', 'Override'] as const).map((f) => (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Event</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Object</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Object Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Timestamp</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Field Changed</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Before</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">After</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Hash</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((entry) => (
                <tr key={entry.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-xs font-mono text-text-disabled">{entry.id}</p>
                    <p className="text-xs text-text-disabled font-mono">{entry.sessionId}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${eventTypeColor(entry.eventType)}`}>
                      {entry.eventType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${objectTypeColor(entry.objectType)}`}>
                      {entry.objectType}
                    </span>
                    <p className="text-xs font-mono text-text-disabled mt-0.5">{entry.objectId}</p>
                  </td>
                  <td className="px-4 py-3 max-w-[180px]">
                    <p className="text-xs font-medium text-text-primary leading-snug">{entry.objectName}</p>
                    <p className="text-xs text-text-muted leading-snug mt-0.5">{entry.changeDescription}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-medium text-text-primary">{entry.actor}</p>
                    <p className="text-xs text-text-muted">{entry.actorRole}</p>
                    <p className="text-xs text-text-disabled font-mono">{entry.ipAddress}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary whitespace-nowrap">{entry.timestamp}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-text-secondary">{entry.fieldChanged}</span>
                  </td>
                  <td className="px-4 py-3 max-w-[120px]">
                    <span className="text-xs font-mono text-status-error-text break-words">{entry.valueBefore}</span>
                  </td>
                  <td className="px-4 py-3 max-w-[140px]">
                    <span className="text-xs font-mono text-status-success-text break-words">{entry.valueAfter}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-text-disabled bg-surface-1 px-1.5 py-0.5 rounded">{entry.auditHash}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="View full event">
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
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Immutability</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Audit trail entries cannot be edited or deleted. Any correction or supersession creates a new entry that references the original by ID. The trail is append-only at the database level — platform admin access does not grant write/delete permissions on audit records. Override events are flagged automatically for MD review within 24 hours.
          </p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Hash Integrity</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Each audit entry carries a short hash derived from the prior entry's hash plus the entry content — forming a hash chain. Any tampering with a historical entry invalidates all subsequent hashes. The <strong>Platform Health</strong> page monitors chain integrity continuously and will alert on any break detected, triggering an immediate security incident.
          </p>
        </div>
      </div>
    </div>
  )
}
