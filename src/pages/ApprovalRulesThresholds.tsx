import { Shield, CheckCircle, AlertCircle } from 'lucide-react'
import { useToast } from '../components/Toast'

const approvalRules = [
  { id: 'AR-001', domain: 'Expense Reimbursement', condition: 'Amount ≤ AED 5,000', approver: 'Direct Line Manager', escalation: 'Finance Ops Practitioner', autoApprove: false, bcSync: 'Post-approval' },
  { id: 'AR-002', domain: 'Expense Reimbursement', condition: 'Amount > AED 5,000', approver: 'Finance Control Owner', escalation: 'Executive', autoApprove: false, bcSync: 'Post-approval' },
  { id: 'AR-003', domain: 'Purchase Request', condition: 'Amount ≤ AED 10,000', approver: 'Finance Ops Practitioner', escalation: 'Finance Control Owner', autoApprove: false, bcSync: 'Post-approval' },
  { id: 'AR-004', domain: 'Purchase Request', condition: 'Amount > AED 10,000', approver: 'Finance Control Owner', escalation: 'Executive', autoApprove: false, bcSync: 'Post-approval' },
  { id: 'AR-005', domain: 'Invoice Payment', condition: 'Amount ≤ AED 50,000', approver: 'Finance Control Owner', escalation: 'Executive', autoApprove: false, bcSync: 'On approval' },
  { id: 'AR-006', domain: 'Invoice Payment', condition: 'Amount > AED 50,000 (High Value)', approver: 'Executive', escalation: '—', autoApprove: false, bcSync: 'Manual sync confirmation' },
  { id: 'AR-007', domain: 'Vendor Onboarding', condition: 'All vendors', approver: 'Finance Control Owner', escalation: 'Executive', autoApprove: false, bcSync: 'On final approval' },
  { id: 'AR-008', domain: 'Budget Amendment', condition: 'All amounts', approver: 'Executive', escalation: 'Board', autoApprove: false, bcSync: 'Post-approval' },
  { id: 'AR-009', domain: 'Subscription Renewal', condition: 'Auto-renew ON', approver: 'System Auto-Approval', escalation: 'Owner', autoApprove: true, bcSync: 'On renewal' },
  { id: 'AR-010', domain: 'Subscription Renewal', condition: 'Auto-renew OFF', approver: 'Finance Control Owner', escalation: 'Executive', autoApprove: false, bcSync: 'On approval' },
]

const delegations = [
  { from: 'Aisha Khalid (Executive)', to: 'Mohammed Rashid (Finance Control Owner)', domain: 'Invoice Payment ≤ AED 50,000', validUntil: '30 Jun 2026', status: 'Active' },
  { from: 'Mohammed Rashid (Finance Control Owner)', to: 'Sara Pereira (Finance Ops)', domain: 'Purchase Request ≤ AED 5,000', validUntil: '31 May 2026', status: 'Active' },
]

const domainColor: Record<string, string> = {
  'Expense Reimbursement': 'bg-orange-50 text-dq-orange',
  'Purchase Request': 'bg-navy-50 text-dq-navy',
  'Invoice Payment': 'bg-status-info-surface text-status-info-text',
  'Vendor Onboarding': 'bg-status-success-surface text-status-success-text',
  'Budget Amendment': 'bg-status-error-surface text-status-error-text',
  'Subscription Renewal': 'bg-status-warning-surface text-status-warning-text',
}

export default function ApprovalRulesThresholds() {
  const { showToast } = useToast()

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Approval Rules & Thresholds</h1>
      <p className="text-sm text-text-muted mb-6">Configure approval authority thresholds, routing rules, and delegation policies by domain and entity.</p>

      {/* Summary */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-navy-50 rounded-pill">
          <Shield size={13} className="text-dq-navy" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-dq-navy">{approvalRules.length}</span>
          <span className="text-xs text-text-muted">Active Rules</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <CheckCircle size={13} className="text-status-success" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-success-text">{delegations.length}</span>
          <span className="text-xs text-text-muted">Active Delegations</span>
        </div>
        <div className="flex-1" />
        <button
          onClick={() => showToast('Rule configuration panel opened.', 'info')}
          className="px-4 py-2 rounded-btn bg-dq-navy text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Configure Rules
        </button>
      </div>

      {/* Approval rules table */}
      <p className="text-sm font-semibold text-text-primary mb-3">Approval Authority Matrix</p>
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Domain</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Condition</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Primary Approver</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Escalation</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {approvalRules.map((r) => (
              <tr key={r.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${domainColor[r.domain] || 'bg-surface-1 text-text-muted'}`}>{r.domain}</span>
                  <p className="text-xs font-mono text-text-disabled mt-1">{r.id}</p>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">{r.condition}</td>
                <td className="px-4 py-3">
                  {r.autoApprove ? (
                    <span className="flex items-center gap-1 text-sm text-status-success-text font-medium">
                      <CheckCircle size={13} strokeWidth={1.5} />
                      Auto-approved
                    </span>
                  ) : (
                    <span className="text-sm text-text-primary">{r.approver}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-text-muted">{r.escalation}</td>
                <td className="px-4 py-3 text-xs text-text-muted">{r.bcSync}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => showToast(`Rule ${r.id} edit panel opened.`, 'info')}
                    className="text-xs font-semibold text-dq-orange hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Active delegations */}
      <p className="text-sm font-semibold text-text-primary mb-3">Active Delegations</p>
      <div className="space-y-2">
        {delegations.map((d, i) => (
          <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-card border border-border-subtle shadow-sm">
            <AlertCircle size={16} className="text-status-info shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">{d.from} → {d.to}</p>
              <p className="text-xs text-text-muted">{d.domain} · Valid until {d.validUntil}</p>
            </div>
            <span className="text-xs font-semibold bg-status-success-surface text-status-success-text rounded-pill px-2 py-0.5 shrink-0">{d.status}</span>
            <button
              onClick={() => showToast('Delegation revoked.', 'success')}
              className="text-xs font-semibold text-status-error-text hover:underline shrink-0"
            >
              Revoke
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
