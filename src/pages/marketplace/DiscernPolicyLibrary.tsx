import { useState } from 'react'
import { BookOpen, ChevronDown } from 'lucide-react'

interface Policy {
  id: string
  title: string
  category: 'Finance' | 'Procurement' | 'Tax' | 'HR / Admin' | 'Platform'
  summary: string
  keyRules: string[]
  lastUpdated: string
  owner: string
}

const policies: Policy[] = [
  {
    id: 'POL-EXP',
    title: 'Expense & Reimbursement Policy',
    category: 'Finance',
    summary: 'Defines what expenses can be reimbursed, evidence requirements, per-diem rates by entity, and reimbursement timelines.',
    keyRules: [
      'Receipts mandatory for any expense ≥ AED 50',
      'Per-diem rates vary by entity: AED 350/day UAE, KES 5,500/day Kenya, EUR 75/day Portugal',
      'Submit within 30 days of incurring the expense',
      'Reimbursement processed within 2 business days of approval',
    ],
    lastUpdated: '15 Apr 2026',
    owner: 'Mohammed Rashid (FIN-OWN)',
  },
  {
    id: 'POL-PROC',
    title: 'Procurement Policy',
    category: 'Procurement',
    summary: 'Vendor onboarding requirements, quote thresholds, PO routing rules, and procurement authority levels.',
    keyRules: [
      'Vendors over AED 50k/year require 3 quotes',
      'New vendors require Company Registration + Tax Cert + Bank Details',
      'Single-source justification required above AED 100k',
      'POs over AED 250k require Executive approval',
    ],
    lastUpdated: '2 May 2026',
    owner: 'Mohammed Rashid (FIN-OWN)',
  },
  {
    id: 'POL-VAT',
    title: 'UAE VAT & e-Invoicing Policy',
    category: 'Tax',
    summary: 'UAE Federal Tax Authority requirements for VAT registration, invoice fields, and e-invoicing readiness.',
    keyRules: [
      'All invoices ≥ AED 10,000 must include TRN of supplier and buyer',
      'Standard VAT rate 5% applies to most goods/services in UAE',
      'Input VAT recoverable only with valid tax invoice',
      'E-invoicing readiness: structured invoice data, vendor TRN capture mandatory by 2027',
    ],
    lastUpdated: '20 Mar 2026',
    owner: 'Bloom Accounting (VND-008)',
  },
  {
    id: 'POL-AUTH',
    title: 'Approval Authority Policy',
    category: 'Finance',
    summary: 'Who can approve what — by amount, category, entity, and request type.',
    keyRules: [
      'Finance Control Owner: up to AED 50k per transaction',
      'Executive Oversight: AED 50k and above',
      'Project / Service Owner: project-bound spend within budget',
      'Substitutes allowed during absence — recorded in audit trail',
    ],
    lastUpdated: '10 May 2026',
    owner: 'Aisha Khalid (EXEC)',
  },
  {
    id: 'POL-TRAVEL',
    title: 'Travel & Admin Policy',
    category: 'HR / Admin',
    summary: 'Travel booking rules, per-diem entitlements, hotel/flight class limits, and visa support.',
    keyRules: [
      'Economy for flights under 6 hours; business above 6 hours with approval',
      'Hotel budget AED 800/night UAE, AED 600/night Kenya, EUR 150/night Portugal',
      'Pre-approval required for all international travel',
      'Per-diem auto-calculated from travel duration',
    ],
    lastUpdated: '28 Apr 2026',
    owner: 'Tariq Al-Amin (ADMIN)',
  },
  {
    id: 'POL-DATA',
    title: 'Data Sovereignty & External Sharing Policy',
    category: 'Platform',
    summary: 'Rules for cross-border data movement, external partner access scoping, and audit/assurance exports.',
    keyRules: [
      'UAE entity data stays within UAE region by default',
      'External assurance partners receive scoped read-only access — no broad browsing',
      'Audit packs auto-redact sensitive PII unless explicitly authorised',
      'Cross-border vendor data requires entity steward sign-off',
    ],
    lastUpdated: '5 May 2026',
    owner: 'Tariq Al-Amin (ADMIN)',
  },
]

const categoryStyle: Record<Policy['category'], string> = {
  Finance: 'bg-status-info-surface text-status-info-text',
  Procurement: 'bg-status-success-surface text-status-success-text',
  Tax: 'bg-status-warning-surface text-status-warning-text',
  'HR / Admin': 'bg-orange-50 text-dq-orange',
  Platform: 'bg-navy-50 text-dq-navy',
}

export default function DiscernPolicyLibrary() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
          Marketplace · Discern
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Policy Library</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          The policies that govern DQ operations — expense, procurement, tax, travel, authority, and data sovereignty. Check the rules before raising a request.
        </p>
      </div>

      <div className="space-y-2">
        {policies.map((p) => {
          const isOpen = openId === p.id
          return (
            <div key={p.id} className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : p.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-surface-1 transition-colors"
              >
                <div className="w-10 h-10 rounded-btn flex items-center justify-center shrink-0 text-dq-orange"
                     style={{ background: '#FFF5F2' }}>
                  <BookOpen size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-text-primary">{p.title}</h3>
                    <span className={`px-2 py-0.5 rounded-pill text-[10px] font-semibold ${categoryStyle[p.category]}`}>
                      {p.category}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-snug">{p.summary}</p>
                </div>
                <ChevronDown
                  size={16}
                  strokeWidth={1.75}
                  className={`text-icon-muted shrink-0 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t border-border-subtle pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Key rules</p>
                  <ul className="space-y-1.5 mb-4">
                    {p.keyRules.map((rule, i) => (
                      <li key={i} className="text-sm text-text-secondary flex gap-2">
                        <span className="text-dq-orange shrink-0">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span>Last updated: <span className="text-text-secondary font-medium">{p.lastUpdated}</span></span>
                    <span>Owner: <span className="text-text-secondary font-medium">{p.owner}</span></span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
