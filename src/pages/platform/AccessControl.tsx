import { useState } from 'react'
import { Plus, Edit2, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface SecurityPolicy {
  id: string
  policyName: string
  description: string
  policyType: 'Authentication' | 'Session' | 'IP Restriction' | 'Data Access' | 'API Security' | 'Export Control'
  requirement: string
  enforcementLevel: 'Mandatory' | 'Recommended' | 'Optional'
  appliesTo: string[]
  currentState: 'Enforced' | 'Partial' | 'Not Enforced'
  affectedUsers: number
  exceptions: number
  lastReviewedBy: string
  lastReviewedAt: string
  nextReviewAt: string
  status: 'Active' | 'Draft' | 'Suspended'
  lastModified: string
}

const policies: SecurityPolicy[] = [
  {
    id: 'AC-001',
    policyName: 'MFA for Approvers',
    description: 'Multi-factor authentication required for all users with approval authority in DWS.04',
    policyType: 'Authentication',
    requirement: 'TOTP or hardware key MFA must be enabled before any approval action is permitted',
    enforcementLevel: 'Mandatory',
    appliesTo: ['Finance Manager', 'Procurement Manager', 'HR Manager', 'Managing Director', 'Platform Admin'],
    currentState: 'Enforced',
    affectedUsers: 8,
    exceptions: 0,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-04-01',
    nextReviewAt: '2026-07-01',
    status: 'Active',
    lastModified: '2026-04-01',
  },
  {
    id: 'AC-002',
    policyName: 'Session Timeout – 8 Hours',
    description: 'All authenticated sessions are automatically terminated after 8 hours of inactivity',
    policyType: 'Session',
    requirement: 'Session cookie expires after 480 minutes of inactivity; user must re-authenticate',
    enforcementLevel: 'Mandatory',
    appliesTo: ['All Users'],
    currentState: 'Enforced',
    affectedUsers: 24,
    exceptions: 2,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-03-15',
    nextReviewAt: '2026-06-15',
    status: 'Active',
    lastModified: '2026-03-15',
  },
  {
    id: 'AC-003',
    policyName: 'Admin Panel IP Whitelist',
    description: 'Access to the DWS.04 Platform Admin panel is restricted to whitelisted IP addresses',
    policyType: 'IP Restriction',
    requirement: 'Only requests from DQ HQ office IP range (185.62.x.x) and Rashid Ahmed VPN IP are permitted',
    enforcementLevel: 'Mandatory',
    appliesTo: ['Platform Admin', 'IT Admin'],
    currentState: 'Enforced',
    affectedUsers: 2,
    exceptions: 0,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-05-01',
    nextReviewAt: '2026-08-01',
    status: 'Active',
    lastModified: '2026-05-01',
  },
  {
    id: 'AC-004',
    policyName: 'Payment Amount Masking',
    description: 'Payment and invoice amounts are masked for users without Finance role access',
    policyType: 'Data Access',
    requirement: 'Amounts > AED 0 shown as *** to non-Finance users unless viewing their own submitted requests',
    enforcementLevel: 'Mandatory',
    appliesTo: ['All Non-Finance Roles'],
    currentState: 'Enforced',
    affectedUsers: 16,
    exceptions: 1,
    lastReviewedBy: 'Tariq Al-Amin',
    lastReviewedAt: '2026-04-15',
    nextReviewAt: '2026-07-15',
    status: 'Active',
    lastModified: '2026-04-15',
  },
  {
    id: 'AC-005',
    policyName: 'API Rate Limiting',
    description: 'External API calls to DWS.04 integration endpoints are rate-limited to prevent abuse',
    policyType: 'API Security',
    requirement: 'Max 1,000 API calls per minute per integration key; excess calls return HTTP 429',
    enforcementLevel: 'Mandatory',
    appliesTo: ['BC Integration', 'External Connectors', 'Webhook Endpoints'],
    currentState: 'Enforced',
    affectedUsers: 0,
    exceptions: 0,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-02-20',
    nextReviewAt: '2026-05-20',
    status: 'Active',
    lastModified: '2026-02-20',
  },
  {
    id: 'AC-006',
    policyName: 'Data Export Justification',
    description: 'All data exports from DWS.04 require the user to provide a business justification',
    policyType: 'Export Control',
    requirement: 'User must select export reason and confirm data classification before download is permitted',
    enforcementLevel: 'Mandatory',
    appliesTo: ['All Users'],
    currentState: 'Partial',
    affectedUsers: 24,
    exceptions: 0,
    lastReviewedBy: 'Tariq Al-Amin',
    lastReviewedAt: '2026-05-10',
    nextReviewAt: '2026-08-10',
    status: 'Active',
    lastModified: '2026-05-10',
  },
  {
    id: 'AC-007',
    policyName: 'Password Complexity Policy',
    description: 'Minimum password requirements enforced on DWS.04 local accounts and linked Azure AD',
    policyType: 'Authentication',
    requirement: 'Min 12 characters, uppercase, lowercase, number, special character; no dictionary words; no last 10 passwords',
    enforcementLevel: 'Mandatory',
    appliesTo: ['All Users'],
    currentState: 'Enforced',
    affectedUsers: 24,
    exceptions: 0,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-01-10',
    nextReviewAt: '2026-04-10',
    status: 'Active',
    lastModified: '2026-01-10',
  },
  {
    id: 'AC-008',
    policyName: 'Device Trust Requirement',
    description: 'Users accessing DWS.04 from unmanaged devices must complete additional step-up authentication',
    policyType: 'Authentication',
    requirement: 'Managed devices (Intune-enrolled) skip step-up; unmanaged devices require SMS OTP in addition to password',
    enforcementLevel: 'Mandatory',
    appliesTo: ['All Users'],
    currentState: 'Partial',
    affectedUsers: 24,
    exceptions: 3,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-03-01',
    nextReviewAt: '2026-06-01',
    status: 'Active',
    lastModified: '2026-03-01',
  },
  {
    id: 'AC-009',
    policyName: 'Audit Log Access Restriction',
    description: 'Access to full audit logs is restricted to Platform Admins and Finance Managers only',
    policyType: 'Data Access',
    requirement: 'Audit logs readable only by Platform Admin role; other roles see own-record history only',
    enforcementLevel: 'Mandatory',
    appliesTo: ['Platform Admin', 'Finance Manager'],
    currentState: 'Enforced',
    affectedUsers: 4,
    exceptions: 0,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-04-20',
    nextReviewAt: '2026-07-20',
    status: 'Active',
    lastModified: '2026-04-20',
  },
  {
    id: 'AC-010',
    policyName: 'SOC2 Compliance Baseline',
    description: 'Baseline security controls mapped to SOC2 Type II requirements for platform certification',
    policyType: 'Data Access',
    requirement: 'Encryption at rest (AES-256), encryption in transit (TLS 1.2+), access logging, and quarterly access reviews',
    enforcementLevel: 'Mandatory',
    appliesTo: ['Platform Infrastructure', 'All Modules'],
    currentState: 'Enforced',
    affectedUsers: 24,
    exceptions: 0,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-05-15',
    nextReviewAt: '2026-08-15',
    status: 'Active',
    lastModified: '2026-05-15',
  },
  {
    id: 'AC-011',
    policyName: 'Concurrent Session Limit',
    description: 'Users are limited to 3 concurrent active sessions across devices',
    policyType: 'Session',
    requirement: 'A 4th login from a new device automatically invalidates the oldest session',
    enforcementLevel: 'Mandatory',
    appliesTo: ['All Users'],
    currentState: 'Enforced',
    affectedUsers: 24,
    exceptions: 0,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-03-15',
    nextReviewAt: '2026-06-15',
    status: 'Active',
    lastModified: '2026-03-15',
  },
  {
    id: 'AC-012',
    policyName: 'Sensitive PII Masking',
    description: 'Employee personal data (salary, Emirates ID, passport) masked for non-HR roles',
    policyType: 'Data Access',
    requirement: 'HR-classified fields visible only to HR Manager, Finance Manager, and MD; redacted for all others',
    enforcementLevel: 'Mandatory',
    appliesTo: ['HR Module', 'Employee Records'],
    currentState: 'Enforced',
    affectedUsers: 20,
    exceptions: 0,
    lastReviewedBy: 'Fatima Bin Hammad',
    lastReviewedAt: '2026-04-01',
    nextReviewAt: '2026-07-01',
    status: 'Active',
    lastModified: '2026-04-01',
  },
  {
    id: 'AC-013',
    policyName: 'BC Integration Key Rotation',
    description: 'BC API keys and OAuth tokens used by DWS.04 integration must be rotated every 90 days',
    policyType: 'API Security',
    requirement: 'Integration Team rotates keys before expiry; expired keys trigger automatic sync pause and alert',
    enforcementLevel: 'Mandatory',
    appliesTo: ['BC Integration Service Account'],
    currentState: 'Enforced',
    affectedUsers: 0,
    exceptions: 0,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-05-01',
    nextReviewAt: '2026-08-01',
    status: 'Active',
    lastModified: '2026-05-01',
  },
  {
    id: 'AC-014',
    policyName: 'Remote Access VPN Policy',
    description: 'Users accessing DWS.04 from outside UAE must connect via approved VPN endpoint',
    policyType: 'IP Restriction',
    requirement: 'Non-UAE IP access blocked unless originating from DQ VPN gateway (10.10.x.x); enforced by WAF',
    enforcementLevel: 'Recommended',
    appliesTo: ['All Users', 'Remote Workers'],
    currentState: 'Partial',
    affectedUsers: 6,
    exceptions: 4,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-02-15',
    nextReviewAt: '2026-05-15',
    status: 'Active',
    lastModified: '2026-02-15',
  },
  {
    id: 'AC-015',
    policyName: 'Bulk Export Volume Cap',
    description: 'Single data export limited to 10,000 rows; larger extracts require IT Admin approval',
    policyType: 'Export Control',
    requirement: 'Exports > 10K rows blocked in UI; IT Admin can issue a one-time override token valid for 4 hours',
    enforcementLevel: 'Mandatory',
    appliesTo: ['All Users', 'Report Module'],
    currentState: 'Enforced',
    affectedUsers: 24,
    exceptions: 0,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-05-20',
    nextReviewAt: '2026-08-20',
    status: 'Active',
    lastModified: '2026-05-20',
  },
  {
    id: 'AC-016',
    policyName: 'Failed Login Lockout',
    description: 'Accounts are locked after 5 consecutive failed login attempts to mitigate brute-force attacks',
    policyType: 'Authentication',
    requirement: 'Account locked for 30 minutes after 5 failures; IT Admin can unlock manually; after 3 lockouts in 24h, permanent lock until IT reset',
    enforcementLevel: 'Mandatory',
    appliesTo: ['All Users'],
    currentState: 'Enforced',
    affectedUsers: 24,
    exceptions: 0,
    lastReviewedBy: 'Rashid Ahmed',
    lastReviewedAt: '2026-01-20',
    nextReviewAt: '2026-04-20',
    status: 'Active',
    lastModified: '2026-01-20',
  },
]

export default function AccessControl() {
  const [filter, setFilter] = useState<'All' | 'Authentication' | 'Session' | 'IP Restriction' | 'Data Access'>('All')

  const stats = {
    active: policies.filter(p => p.status === 'Active').length,
    enforced: policies.filter(p => p.currentState === 'Enforced').length,
    partial: policies.filter(p => p.currentState === 'Partial').length,
    usersCovered: Math.max(...policies.map(p => p.affectedUsers)),
  }

  const filtered =
    filter === 'All' ? policies : policies.filter(p => p.policyType === filter)

  const enforcementColor: Record<string, string> = {
    Enforced: 'bg-status-success-surface text-status-success-text',
    Partial: 'bg-status-warning-surface text-status-warning-text',
    'Not Enforced': 'bg-status-error-surface text-status-error-text',
  }

  const levelColor: Record<string, string> = {
    Mandatory: 'bg-status-error-surface text-status-error-text',
    Recommended: 'bg-status-warning-surface text-status-warning-text',
    Optional: 'bg-surface-1 text-text-muted',
  }

  const typeColor: Record<string, string> = {
    Authentication: 'bg-status-info-surface text-status-info-text',
    Session: 'bg-status-warning-surface text-status-warning-text',
    'IP Restriction': 'bg-status-error-surface text-status-error-text',
    'Data Access': 'bg-status-success-surface text-status-success-text',
    'API Security': 'bg-surface-1 text-text-muted',
    'Export Control': 'bg-status-info-surface text-status-info-text',
  }

  const isOverdue = (nextReview: string) => new Date(nextReview) < new Date('2026-06-10')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Access Control</h1>
          <p className="text-sm text-text-muted mt-1">Platform-wide security policies — authentication, session limits, IP restrictions, and data access controls</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} /> Add Policy
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Active Policies</p>
          <p className="text-2xl font-bold text-text-primary">{stats.active}</p>
          <p className="text-xs text-text-muted mt-1">of {policies.length} total</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Enforced</p>
          <p className="text-2xl font-bold text-status-success-text">{stats.enforced}</p>
          <p className="text-xs text-text-muted mt-1">fully enforced</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Partial Enforcement</p>
          <p className={`text-2xl font-bold ${stats.partial > 0 ? 'text-status-warning-text' : 'text-text-primary'}`}>{stats.partial}</p>
          <p className="text-xs text-text-muted mt-1">need attention</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Users Covered</p>
          <p className="text-2xl font-bold text-text-primary">{stats.usersCovered}</p>
          <p className="text-xs text-text-muted mt-1">under at least 1 policy</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Authentication', 'Session', 'IP Restriction', 'Data Access'] as const).map(f => (
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Policy</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Enforcement</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Level</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Applies To</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Users</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Exceptions</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Reviewed</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Next Review</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map(policy => (
              <tr key={policy.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-start gap-2">
                    <Shield size={14} className="text-dq-navy flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary">{policy.policyName}</p>
                      <p className="text-xs text-text-muted mt-0.5 max-w-xs">{policy.requirement}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColor[policy.policyType]}`}>
                    {policy.policyType}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${enforcementColor[policy.currentState]}`}>
                    {policy.currentState === 'Enforced' && <CheckCircle size={11} />}
                    {policy.currentState === 'Partial' && <AlertTriangle size={11} />}
                    {policy.currentState}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${levelColor[policy.enforcementLevel]}`}>
                    {policy.enforcementLevel}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {policy.appliesTo.slice(0, 2).map(role => (
                      <span key={role} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-surface-1 text-text-muted border border-border-subtle">{role}</span>
                    ))}
                    {policy.appliesTo.length > 2 && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-surface-1 text-text-muted border border-border-subtle">+{policy.appliesTo.length - 2}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-text-secondary text-center">{policy.affectedUsers > 0 ? policy.affectedUsers : '—'}</td>
                <td className="px-4 py-3">
                  {policy.exceptions > 0 ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-status-warning-text">
                      <AlertTriangle size={12} />{policy.exceptions}
                    </span>
                  ) : (
                    <span className="text-xs text-text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-text-secondary">{policy.lastReviewedAt}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${isOverdue(policy.nextReviewAt) ? 'text-status-error-text' : 'text-text-secondary'}`}>
                    {isOverdue(policy.nextReviewAt) && <Clock size={12} />}
                    {policy.nextReviewAt}
                  </span>
                </td>
                <td className="px-4 py-3"><StatusBadge status={policy.status} /></td>
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
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Policy Review Cycle</p>
          <p className="text-sm text-text-secondary">All security policies are reviewed on a quarterly basis by the IT Admin (Rashid Ahmed) and the relevant Policy Owner. Policies where nextReviewAt has passed are flagged in red and surfaced as overdue items on the Platform Admin dashboard. Overdue reviews must be actioned within 10 business days to maintain compliance posture.</p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Exception Management</p>
          <p className="text-sm text-text-secondary">Policy exceptions are only granted by the Platform Admin (Rashid Ahmed) via a formal exception request. All exceptions are time-bounded — maximum 90 days — and expire automatically. Expired exceptions are not silently continued; the policy resumes enforcement and the user is notified 7 days before expiry. Exception count is visible on each policy row.</p>
        </div>
      </div>
    </div>
  )
}
