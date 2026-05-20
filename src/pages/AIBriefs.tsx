import { Brain, Clock, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const briefs = [
  {
    id: 'AIB-001',
    title: 'Weekly Finance Brief — W20 2026',
    generated: '20 May 2026 07:30',
    domain: 'Finance',
    summary: 'Payment exposure at AED 186,400 with 2 high-value invoices pending (Mazrui AED 90K, Anthropic AED 12.4K). Approval cycle time tracking at 3.4 days — above 2.5-day target. 6 overdue approvals require escalation before period close.',
    actions: [
      'Approve REQ-2025-0047 (Mazrui Holdings — due 28 May)',
      'Clear overdue approval backlog before 31 May period close',
      'Resolve VND-004 BC sync failure — missing VAT field',
    ],
    riskLevel: 'High',
  },
  {
    id: 'AIB-002',
    title: 'Procurement Brief — Renewal Alerts',
    generated: '20 May 2026 07:30',
    domain: 'Procurement',
    summary: 'Loom Business (SUB-005) renews in 7 days with auto-renew OFF. Anthropic API Credits (SUB-003) renews in 13 days with auto-renew OFF. Both require Finance Control Owner approval to proceed. Combined annual value: AED 46,100.',
    actions: [
      'Loom Business: Decide renew or cancel by 24 May 2026',
      'Anthropic API Credits: Submit renewal approval by 28 May 2026',
    ],
    riskLevel: 'Medium',
  },
  {
    id: 'AIB-003',
    title: 'Project Economics Brief — PRJ-2403',
    generated: '18 May 2026 10:30',
    domain: 'Project',
    summary: 'Client: Noor Retail DXP is tracking AED 45,000 over committed budget. Phase 3 delivery milestone (AED 90K billing) is committed for 28 May 2026. Budget amendment REQ-2025-0048 is in Draft — requires Executive approval before milestone invoice can be raised.',
    actions: [
      'Review and approve REQ-2025-0048 (budget amendment AED 45K)',
      'Confirm Phase 3 delivery receipt before 28 May to unblock invoice',
    ],
    riskLevel: 'Medium',
  },
  {
    id: 'AIB-004',
    title: 'Evidence & Clarification Brief',
    generated: '18 May 2026 11:00',
    domain: 'Operations',
    summary: '2 evidence items are blocking active requests: Kenya travel per-diem breakdown (4 days overdue on REQ-2025-0046) and DataStax tax certificate (3 days overdue on REQ-2025-0044). Clarification thread CLR-001 has been escalated by Sara Pereira.',
    actions: [
      'Upload per-diem breakdown for REQ-2025-0046 immediately',
      'Confirm DataStax cross-border tax documentation status',
    ],
    riskLevel: 'Medium',
  },
  {
    id: 'AIB-005',
    title: 'BC Integration Health Brief',
    generated: '17 May 2026 09:30',
    domain: 'Platform',
    summary: 'BC connector healthy with 97.2% sync success rate (7d). 1 vendor sync failure: VND-004 (Anthropic) — missing VAT registration field after 3 retry attempts. 2 records pending sync after approval. No connector downtime recorded.',
    actions: [
      'Resolve VND-004 VAT field data quality issue before next retry',
      'Monitor SYNC-002 (Mazrui invoice) — will auto-sync on approval',
    ],
    riskLevel: 'Low',
  },
]

const domainColor: Record<string, string> = {
  Finance: 'bg-navy-50 text-dq-navy',
  Procurement: 'bg-orange-50 text-dq-orange',
  Project: 'bg-status-success-surface text-status-success-text',
  Operations: 'bg-status-info-surface text-status-info-text',
  Platform: 'bg-status-warning-surface text-status-warning-text',
}

const riskColor: Record<string, string> = {
  High: 'bg-status-error-surface text-status-error-text',
  Medium: 'bg-status-warning-surface text-status-warning-text',
  Low: 'bg-status-success-surface text-status-success-text',
}

export default function AIBriefs() {
  const [expanded, setExpanded] = useState<string | null>(briefs[0].id)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">AI Briefs & Recommendations</h1>
      <p className="text-sm text-text-muted mb-6">Periodic AI-generated operating briefs and recommended actions for finance, procurement, and project domains.</p>

      <div className="flex items-center gap-2 mb-6 p-3 bg-navy-50 rounded-card border border-dq-navy/10">
        <Brain size={16} className="text-dq-navy" strokeWidth={1.5} />
        <p className="text-xs text-dq-navy">AI briefs are generated daily at 07:30 and updated on significant event triggers. All recommendations are advisory — actions require human approval.</p>
      </div>

      <div className="space-y-3">
        {briefs.map((brief) => (
          <div
            key={brief.id}
            className={`bg-white rounded-card border shadow-sm transition-shadow ${expanded === brief.id ? 'border-dq-orange shadow-md' : 'border-border-subtle hover:shadow-md'}`}
          >
            <button
              className="w-full text-left p-5"
              onClick={() => setExpanded(expanded === brief.id ? null : brief.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${domainColor[brief.domain]}`}>{brief.domain}</span>
                    <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${riskColor[brief.riskLevel]}`}>{brief.riskLevel} Risk</span>
                    <span className="text-xs font-mono text-text-disabled">{brief.id}</span>
                  </div>
                  <p className="text-sm font-semibold text-text-primary">{brief.title}</p>
                  <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
                    <Clock size={11} strokeWidth={1.5} />
                    Generated {brief.generated}
                  </p>
                </div>
                <ChevronRight size={16} className={`text-text-muted shrink-0 transition-transform ${expanded === brief.id ? 'rotate-90' : ''}`} strokeWidth={1.5} />
              </div>
            </button>

            {expanded === brief.id && (
              <div className="px-5 pb-5 border-t border-border-subtle">
                <p className="text-sm text-text-secondary leading-relaxed mt-4 mb-4">{brief.summary}</p>
                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Recommended Actions</p>
                  <div className="space-y-2">
                    {brief.actions.map((action, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-dq-orange text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        <p className="text-sm text-text-primary">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
