import { useState } from 'react'
import { Brain, CheckCircle, AlertCircle, Search } from 'lucide-react'

const guardrailRules = [
  { id: 'GR-001', rule: 'High-value invoice flag', condition: 'Invoice amount > AED 50,000', action: 'Auto-flag for Executive approval', domain: 'Finance', status: 'Active' },
  { id: 'GR-002', rule: 'Evidence completeness check', condition: 'Required evidence items unchecked', action: 'Block approval workflow — prompt evidence upload', domain: 'All', status: 'Active' },
  { id: 'GR-003', rule: 'Overdue approval escalation', condition: 'Approval pending > 5 business days', action: 'Escalate to next approver + notify Finance Control Owner', domain: 'All', status: 'Active' },
  { id: 'GR-004', rule: 'Duplicate invoice detection', condition: 'Invoice amount + vendor + period match existing record', action: 'Block submission — require manual override', domain: 'Finance', status: 'Active' },
  { id: 'GR-005', rule: 'Vendor sync failure alert', condition: 'BC sync attempt fails', action: 'Notify BC Integration Steward + log to sync error queue', domain: 'Platform', status: 'Active' },
  { id: 'GR-006', rule: 'Budget overage alert', condition: 'Project actuals > committed budget', action: 'Alert Finance Control Owner + draft amendment', domain: 'Project', status: 'Active' },
]

const aiDecisions = [
  { id: 'AID-001', rule: 'GR-006', trigger: 'PRJ-2403 actuals exceeded committed budget', decision: 'Alert generated + amendment draft initiated', outcome: 'REQ-2025-0048 drafted by Mohammed Rashid', timestamp: '18 May 2026 10:30', confidence: 99, humanOverride: false },
  { id: 'AID-002', rule: 'GR-001', trigger: 'REQ-2025-0047 invoice value AED 90,000', decision: 'Routed to Executive approval (Aisha Khalid)', outcome: 'Pending Executive action', timestamp: '15 May 2026 09:00', confidence: 100, humanOverride: false },
  { id: 'AID-003', rule: 'GR-002', trigger: 'REQ-2025-0046 per-diem breakdown missing', decision: 'Approval workflow blocked — clarification triggered', outcome: 'CLR-001 opened, Sara Pereira notified', timestamp: '16 May 2026 14:30', confidence: 98, humanOverride: false },
  { id: 'AID-004', rule: 'GR-005', trigger: 'VND-004 BC sync failed — missing VAT field', decision: 'BC Integration Steward notified, retry logged', outcome: 'SYNC-003 in error queue, 3 retries attempted', timestamp: '17 May 2026 09:15', confidence: 100, humanOverride: false },
  { id: 'AID-005', rule: 'GR-003', trigger: 'REQ-2025-0046 approval pending 4+ days', decision: 'Overdue flag set, escalation alert sent', outcome: 'Sara Pereira escalation message sent', timestamp: '18 May 2026 11:00', confidence: 100, humanOverride: false },
]

export default function AIGuardrailsAuditLog() {
  const [search, setSearch] = useState('')

  const filteredDecisions = aiDecisions.filter(d =>
    d.trigger.toLowerCase().includes(search.toLowerCase()) ||
    d.decision.toLowerCase().includes(search.toLowerCase()) ||
    d.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">AI Guardrails & Audit Log</h1>
      <p className="text-sm text-text-muted mb-6">Configuration and audit log for all AI-assisted classification, summarisation, and routing decisions.</p>

      {/* Summary */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-navy-50 rounded-pill">
          <Brain size={13} className="text-dq-navy" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-dq-navy">{guardrailRules.length}</span>
          <span className="text-xs text-text-muted">Active Guardrails</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <CheckCircle size={13} className="text-status-success" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-success-text">{aiDecisions.filter(d => !d.humanOverride).length}</span>
          <span className="text-xs text-text-muted">Auto-decisions (7d)</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-warning-surface rounded-pill">
          <AlertCircle size={13} className="text-status-warning" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-warning-text">{aiDecisions.filter(d => d.humanOverride).length}</span>
          <span className="text-xs text-text-muted">Human Overrides</span>
        </div>
      </div>

      {/* Guardrail rules */}
      <p className="text-sm font-semibold text-text-primary mb-3">Guardrail Configuration</p>
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Rule</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Condition</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Action</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Domain</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {guardrailRules.map((r) => (
              <tr key={r.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-5 py-3">
                  <p className="text-sm font-medium text-text-primary">{r.rule}</p>
                  <p className="text-xs font-mono text-text-disabled">{r.id}</p>
                </td>
                <td className="px-4 py-3 text-xs text-text-secondary">{r.condition}</td>
                <td className="px-4 py-3 text-xs text-text-muted">{r.action}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-semibold bg-navy-50 text-dq-navy rounded-pill px-2 py-0.5">{r.domain}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-semibold bg-status-success-surface text-status-success-text rounded-pill px-2 py-0.5">{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI decision log */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-text-primary">AI Decision Log</p>
        <div className="relative w-64">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search decisions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-input border border-border-default text-xs focus:outline-none focus:border-dq-orange"
          />
        </div>
      </div>

      <div className="space-y-2">
        {filteredDecisions.map((d) => (
          <div key={d.id} className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-navy-50 flex items-center justify-center shrink-0">
                <Brain size={13} className="text-dq-navy" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-text-disabled">{d.id}</span>
                  <span className="text-[10px] font-semibold bg-navy-50 text-dq-navy rounded-pill px-1.5 py-0.5">{d.rule}</span>
                  <span className="text-[10px] font-semibold bg-status-success-surface text-status-success-text rounded-pill px-1.5 py-0.5">{d.confidence}% conf.</span>
                  {d.humanOverride && <span className="text-[10px] font-semibold bg-status-warning-surface text-status-warning-text rounded-pill px-1.5 py-0.5">Override</span>}
                </div>
                <p className="text-xs font-medium text-text-primary mb-0.5">Trigger: {d.trigger}</p>
                <p className="text-xs text-text-muted">Decision: {d.decision}</p>
                <p className="text-xs text-text-muted">Outcome: {d.outcome}</p>
              </div>
              <span className="text-xs font-mono text-text-disabled shrink-0">{d.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
