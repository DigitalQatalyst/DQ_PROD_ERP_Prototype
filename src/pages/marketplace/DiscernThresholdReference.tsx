interface Threshold {
  range: string
  approver: string
  note?: string
}

interface ThresholdRule {
  requestType: string
  category: string
  thresholds: Threshold[]
}

const rules: ThresholdRule[] = [
  {
    requestType: 'Expense / Reimbursement',
    category: 'Finance',
    thresholds: [
      { range: '< AED 1,000', approver: 'Auto-approved (with valid evidence)' },
      { range: 'AED 1,000 – 25,000', approver: 'Finance Control Owner' },
      { range: '≥ AED 25,000', approver: 'Finance Control Owner + Executive', note: 'High-value flag triggered' },
    ],
  },
  {
    requestType: 'Invoice / Payment',
    category: 'Finance',
    thresholds: [
      { range: '< AED 10,000', approver: 'Finance Operations + Finance Control Owner' },
      { range: 'AED 10,000 – 50,000', approver: 'Finance Control Owner' },
      { range: '≥ AED 50,000', approver: 'Finance Control Owner + Executive', note: 'High-value flag + AI review pack' },
    ],
  },
  {
    requestType: 'Budget Requisition',
    category: 'Finance',
    thresholds: [
      { range: '< AED 25,000', approver: 'Finance Control Owner' },
      { range: '≥ AED 25,000', approver: 'Executive Oversight' },
    ],
  },
  {
    requestType: 'Budget Amendment',
    category: 'Finance',
    thresholds: [
      { range: 'Any amount', approver: 'Executive Oversight', note: 'All amendments routed to EXEC regardless of size' },
    ],
  },
  {
    requestType: 'Purchase Request',
    category: 'Procurement',
    thresholds: [
      { range: '< AED 5,000', approver: 'Cost Centre Owner' },
      { range: 'AED 5,000 – 50,000', approver: 'Finance Control Owner', note: '3 quotes required above AED 25k' },
      { range: 'AED 50,000 – 250,000', approver: 'Finance Control Owner + Executive' },
      { range: '≥ AED 250,000', approver: 'Executive (with Board notification)' },
    ],
  },
  {
    requestType: 'Vendor Onboarding',
    category: 'Procurement',
    thresholds: [
      { range: 'Any new vendor', approver: 'Procurement Owner + BC Integration Steward' },
      { range: 'Vendor over AED 100k/yr', approver: 'Procurement Owner + Finance Control Owner', note: 'Single-source justification required' },
    ],
  },
  {
    requestType: 'Project Cost Request',
    category: 'Project & Service',
    thresholds: [
      { range: 'Within project budget', approver: 'Project / Service Owner' },
      { range: 'Over project budget', approver: 'Project Owner + Finance Control Owner', note: 'Triggers Budget Amendment if substantial' },
    ],
  },
  {
    requestType: 'Master Data Change',
    category: 'Master Data',
    thresholds: [
      { range: 'Non-financial fields', approver: 'BC Integration Steward' },
      { range: 'Financial fields (bank, tax, terms)', approver: 'BC Integration Steward + Finance Control Owner' },
    ],
  },
]

const categoryStyle: Record<string, string> = {
  Finance: 'bg-status-info-surface text-status-info-text',
  Procurement: 'bg-status-success-surface text-status-success-text',
  'Project & Service': 'bg-orange-50 text-dq-orange',
  'Master Data': 'bg-navy-50 text-dq-navy',
}

export default function DiscernThresholdReference() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
          S01 Marketplace · Discern
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Threshold & Approval Reference</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Who approves what — by amount, category, and request type. Check the relevant threshold before raising a request so you know the approval path up front.
        </p>
      </div>

      <div className="space-y-5">
        {rules.map((rule) => (
          <div key={rule.requestType} className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border-subtle bg-surface-1">
              <h3 className="text-sm font-semibold text-text-primary">{rule.requestType}</h3>
              <span className={`px-2 py-0.5 rounded-pill text-[10px] font-semibold ${categoryStyle[rule.category] ?? ''}`}>
                {rule.category}
              </span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider w-[260px]">Amount Range</th>
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Approver Path</th>
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Note</th>
                </tr>
              </thead>
              <tbody>
                {rule.thresholds.map((t, i) => (
                  <tr key={i} className={`border-b border-border-subtle ${i === rule.thresholds.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="px-5 py-2.5 font-mono text-text-primary text-xs">{t.range}</td>
                    <td className="px-5 py-2.5 text-text-secondary text-xs">{t.approver}</td>
                    <td className="px-5 py-2.5 text-text-muted text-xs italic">{t.note ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}
