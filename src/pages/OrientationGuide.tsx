import { CheckCircle, ArrowRight, FileText, Zap, Users, Activity, Shield } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Start a Request',
    desc: 'Use Universal Request Intake to raise any finance, procurement, or project-linked request. The AI assistant classifies your request, pre-fills fields, and tells you exactly which evidence to attach.',
    icon: <FileText size={20} strokeWidth={1.5} />,
  },
  {
    num: '02',
    title: 'Attach Evidence',
    desc: 'Each request type has a specific evidence checklist. Upload receipts, quotes, invoices, or registration documents before submitting. Incomplete evidence stops the request before it wastes an approver\'s time.',
    icon: <Shield size={20} strokeWidth={1.5} />,
  },
  {
    num: '03',
    title: 'Approval Routing',
    desc: 'DWS.04 routes your request to the correct approver based on amount, category, entity, and project. You can track every status change — submitted, in review, clarification needed, approved — in My Requests.',
    icon: <Users size={20} strokeWidth={1.5} />,
  },
  {
    num: '04',
    title: 'Finance & Procurement Processing',
    desc: 'Approved requests move to the Finance or Procurement Operations queue. Finance Ops processes invoices and expenses. Procurement Ops follows up on purchase orders, vendor onboarding, and subscriptions.',
    icon: <ArrowRight size={20} strokeWidth={1.5} />,
  },
  {
    num: '05',
    title: 'Business Central Sync',
    desc: 'Once processed, records sync to Microsoft Business Central — your ERP system of record. DWS.04 shows the BC reference ID and sync state on every applicable record. Sync errors surface immediately in the Integration Health dashboard.',
    icon: <Activity size={20} strokeWidth={1.5} />,
  },
  {
    num: '06',
    title: 'Leadership Visibility',
    desc: 'Executives and domain owners see live KPIs, AI executive briefs, approval queues, payment exposure, budget health, and project/service economics — without chasing spreadsheets or Teams threads.',
    icon: <Zap size={20} strokeWidth={1.5} />,
  },
]

const faqs = [
  { q: 'What request types can I raise?', a: 'Expense / reimbursement, purchase request, vendor onboarding, subscription renewal, invoice / payment, budget amendment, project-linked cost request, and master data change — all accessible through Universal Request Intake.' },
  { q: 'What is "evidence"?', a: 'Evidence is a typed, governed document linked to your request: receipts, supplier quotes, invoices, contracts, registration certificates, or approval confirmations. Each request type has a defined checklist.' },
  { q: 'Who approves my request?', a: 'Approval authority is configured by request type, amount, entity, cost centre, and project. DWS.04 shows you the approver path before you submit.' },
  { q: 'How does Business Central sync work?', a: 'Approved and processed records are pushed to Business Central by the integration layer. DWS.04 shows Synced, Pending, or Failed status on every applicable record. BC Integration Stewards manage sync errors.' },
  { q: 'Where do I track my requests?', a: 'My Requests (in the My Work section) shows all your active requests with full status history, evidence state, approver, and next action.' },
  { q: 'What does the AI do?', a: 'AI classifies your request type, checks evidence completeness, summarises approval packs for approvers, flags anomalies, and provides operating briefs for leadership. AI never approves spend or releases payments — all decisions remain human.' },
]

export default function OrientationGuide() {
  return (
    <div className="max-w-[800px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Orientation Guide</h1>
        <p className="text-sm text-text-muted">
          DWS.04 Digital ERP — how the platform works, what you can do, and where to go.
        </p>
      </div>

      {/* Hero summary */}
      <div className="rounded-card p-6 mb-8" style={{ background: '#030F35' }}>
        <p className="text-white text-base font-medium mb-2">DWS.04 replaces Excel and MS Teams as the operating record for DQ's finance, procurement, and project work.</p>
        <p className="text-white/70 text-sm leading-relaxed">
          Every request, approval, evidence document, payment, vendor record, and project cost lives here — governed, traceable, and connected to Microsoft Business Central.
        </p>
      </div>

      {/* Step-by-step lifecycle */}
      <h2 className="text-lg font-semibold text-text-primary mb-5">How a request moves through DWS.04</h2>
      <div className="space-y-4 mb-10">
        {steps.map((step, i) => (
          <div key={step.num} className="flex gap-4 bg-surface-1 rounded-card p-5 shadow-sm">
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-dq-orange flex items-center justify-center text-white">
                {step.icon}
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 h-6 bg-border-default" />
              )}
            </div>
            <div className="pt-1">
              <p className="text-[11px] font-semibold text-text-muted uppercase tracking-widest mb-1">Step {step.num}</p>
              <p className="text-base font-semibold text-text-primary mb-1">{step.title}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation reference */}
      <h2 className="text-lg font-semibold text-text-primary mb-4">Where to go for what</h2>
      <div className="grid grid-cols-2 gap-4 mb-10">
        {[
          { label: 'Submit a request', route: 'Universal Request Intake', nav: 'Request & Approval Governance' },
          { label: 'Track my requests', route: 'Request Tracker / My Requests', nav: 'My Work' },
          { label: 'Review approvals', route: 'Approval Console', nav: 'Request & Approval Governance' },
          { label: 'View finance queue', route: 'Finance Workspace', nav: 'Finance Control' },
          { label: 'Check BC sync health', route: 'BC Integration Health', nav: 'Platform Administration' },
          { label: 'View leadership dashboard', route: 'Executive Overview', nav: 'Intelligence' },
          { label: 'Manage vendors', route: 'Vendor Directory', nav: 'Procurement & Vendor Operations' },
          { label: 'Track subscriptions', route: 'Subscription & Renewals', nav: 'Procurement & Vendor Operations' },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3 p-4 bg-white rounded-card border border-border-subtle shadow-sm">
            <CheckCircle size={16} className="text-status-success mt-0.5 shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text-primary">{item.label}</p>
              <p className="text-xs text-dq-orange font-medium mt-0.5">{item.route}</p>
              <p className="text-xs text-text-muted">{item.nav}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <h2 className="text-lg font-semibold text-text-primary mb-4">Frequently asked questions</h2>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq.q} className="bg-white rounded-card border border-border-subtle p-5 shadow-sm">
            <p className="text-sm font-semibold text-text-primary mb-2">{faq.q}</p>
            <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
