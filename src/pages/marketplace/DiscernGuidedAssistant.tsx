import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react'
import { marketplaceItems } from '../../data/marketplaceItems'

type Step1 = 'spend' | 'change-data' | 'help' | 'project-work' | null

interface Recommendation {
  itemId: string
  reason: string
}

// Lightweight rule-based recommender — maps user answers to a marketplaceItems id
function recommend(intent: Step1, sub: string | null): Recommendation | null {
  if (!intent) return null
  if (intent === 'spend') {
    if (sub === 'reimburse-me') return { itemId: 'expense', reason: 'Personal or team expenses paid out of pocket → Expense / Reimbursement.' }
    if (sub === 'pay-vendor') return { itemId: 'invoice-payment', reason: 'Vendor invoice for services or products → Invoice / Payment request.' }
    if (sub === 'buy-something') return { itemId: 'purchase-request', reason: 'New purchase needing approval → Purchase Request (deep-links into PO process on approval).' }
    if (sub === 'new-budget') return { itemId: 'budget-requisition', reason: 'Budget that doesn’t exist yet → Budget Requisition.' }
    if (sub === 'change-budget') return { itemId: 'budget-amendment', reason: 'Changing an existing approved budget → Budget Amendment.' }
  }
  if (intent === 'change-data') {
    if (sub === 'vendor') return { itemId: 'vendor-data-change', reason: 'Vendor record edits → Vendor Data Change request.' }
    if (sub === 'customer') return { itemId: 'customer-onboarding', reason: 'New customer / billable party → Customer Onboarding.' }
    if (sub === 'user-role') return { itemId: 'user-role-change', reason: 'User accounts and permissions → User / Role Change.' }
    if (sub === 'cost-centre') return { itemId: 'cost-centre-change', reason: 'Cost centres, categories, or taxonomy edits → Cost Centre / Category Change.' }
  }
  if (intent === 'help') {
    if (sub === 'sync-fail') return { itemId: 'bc-sync-issue', reason: 'BC record not syncing → BC Sync Issue (Drive workspace).' }
    if (sub === 'access') return { itemId: 'access-request', reason: 'Need a permission or scope → Access / Permission Request.' }
    if (sub === 'workflow') return { itemId: 'workflow-issue', reason: 'Workflow misrouting → Workflow / Threshold Issue.' }
    if (sub === 'tax') return { itemId: 'tax-support', reason: 'Tax / VAT / e-invoicing question → Tax & Compliance Support.' }
  }
  if (intent === 'project-work') {
    if (sub === 'project-cost') return { itemId: 'project-cost', reason: 'Costs against an active project → Project Cost Request.' }
    if (sub === 'milestone') return { itemId: 'milestone-update', reason: 'Milestone status or date change → Milestone Update Request.' }
    if (sub === 'service-billing') return { itemId: 'service-billing', reason: 'Trigger client billing on milestone → Service Billing Request.' }
    if (sub === 'project-procurement') return { itemId: 'project-linked-procurement', reason: 'Purchase tied to a project budget → Project-linked Procurement.' }
  }
  return null
}

const SUB_OPTIONS: Record<NonNullable<Step1>, { value: string; label: string }[]> = {
  spend: [
    { value: 'reimburse-me', label: 'Reimburse me for something I paid out of pocket' },
    { value: 'pay-vendor', label: 'Pay a vendor invoice' },
    { value: 'buy-something', label: 'Buy something new (goods, services, tools)' },
    { value: 'new-budget', label: 'Get new budget allocated' },
    { value: 'change-budget', label: 'Change / increase an existing budget' },
  ],
  'change-data': [
    { value: 'vendor', label: 'Vendor record (bank details, terms, status)' },
    { value: 'customer', label: 'Customer record (onboard a new client)' },
    { value: 'user-role', label: 'User account or permissions' },
    { value: 'cost-centre', label: 'Cost centre, category, or taxonomy' },
  ],
  help: [
    { value: 'sync-fail', label: 'Business Central sync failed' },
    { value: 'access', label: 'I need access I don’t have' },
    { value: 'workflow', label: 'A workflow is misrouting or stuck' },
    { value: 'tax', label: 'Tax / VAT / e-invoicing question' },
  ],
  'project-work': [
    { value: 'project-cost', label: 'Add a cost to a project' },
    { value: 'milestone', label: 'Update a milestone status' },
    { value: 'service-billing', label: 'Trigger billing for a client milestone' },
    { value: 'project-procurement', label: 'Buy something for a project' },
  ],
}

export default function DiscernGuidedAssistant() {
  const [intent, setIntent] = useState<Step1>(null)
  const [sub, setSub] = useState<string | null>(null)

  const reset = () => { setIntent(null); setSub(null) }
  const rec = recommend(intent, sub)
  const recItem = rec ? marketplaceItems.find((m) => m.id === rec.itemId) : null

  return (
    <div>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
          S01 Marketplace · Discern
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Guided Request Assistant</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Tell us what you need to do. We’ll recommend the right request type, who approves it, and what evidence to gather.
        </p>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm p-6">
        <div className="flex items-baseline justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-dq-orange" strokeWidth={1.5} />
            <span className="text-sm font-semibold text-text-primary">What are you trying to do?</span>
          </div>
          {(intent || sub) && (
            <button onClick={reset} className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-dq-navy transition-colors">
              <RotateCcw size={12} strokeWidth={2} /> Start over
            </button>
          )}
        </div>

        {/* Step 1 — intent */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { value: 'spend' as const, label: 'Spend money or get budget' },
            { value: 'change-data' as const, label: 'Change master data (vendor, customer, user…)' },
            { value: 'help' as const, label: 'Get platform / integration help' },
            { value: 'project-work' as const, label: 'Do something tied to a project' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setIntent(opt.value); setSub(null) }}
              className={`text-left p-4 rounded-card border transition-colors ${
                intent === opt.value
                  ? 'border-dq-orange bg-orange-50 text-dq-orange'
                  : 'border-border-default bg-white text-text-primary hover:bg-surface-1'
              }`}
            >
              <p className="text-sm font-semibold">{opt.label}</p>
            </button>
          ))}
        </div>

        {/* Step 2 — sub-intent */}
        {intent && (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
              More specifically…
            </p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {SUB_OPTIONS[intent].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSub(opt.value)}
                  className={`text-left p-3 rounded-card border transition-colors ${
                    sub === opt.value
                      ? 'border-dq-orange bg-orange-50 text-dq-orange'
                      : 'border-border-default bg-white text-text-secondary hover:bg-surface-1'
                  }`}
                >
                  <p className="text-sm">{opt.label}</p>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 3 — recommendation */}
        {rec && recItem && (
          <div className="rounded-card p-5 border-2" style={{ borderColor: '#FB5535', background: '#FFF5F2' }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-dq-orange mb-3" style={{ letterSpacing: '0.12em' }}>
              AI Recommendation
            </p>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-btn bg-white flex items-center justify-center shrink-0 text-dq-orange shadow-sm">
                {recItem.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-text-primary mb-1">{recItem.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{rec.reason}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 mb-4">
              <div className="bg-white rounded-card p-3 border border-border-subtle">
                <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1">Approver</p>
                <p className="text-xs text-text-secondary">{recItem.approver}</p>
              </div>
              <div className="bg-white rounded-card p-3 border border-border-subtle">
                <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1">SLA</p>
                <p className="text-xs text-text-secondary">{recItem.sla}</p>
              </div>
              <div className="bg-white rounded-card p-3 border border-border-subtle">
                <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1">Evidence</p>
                <p className="text-xs text-text-secondary">{recItem.evidence.length} items</p>
              </div>
            </div>

            <Link
              to={recItem.ctaRoute ?? '/request-intake'}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Start this request <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
