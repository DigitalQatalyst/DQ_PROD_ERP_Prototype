import { CheckCircle, FileText, Shield, Users, ArrowRight, Activity, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePersona } from '../context/PersonaContext'
import type { PersonaRole } from '../types'

// ── Role-aware quick actions ─────────────────────────────────────────────────

interface QuickAction {
  label: string
  description: string
  route: string
  style: string
}

const quickActionsByRole: Record<PersonaRole, QuickAction[]> = {
  EXEC: [
    { label: 'Executive Overview', description: 'KPIs, approval queue, AI brief, payment exposure', route: '/executive-home', style: 'bg-dq-navy text-white' },
    { label: 'Pending Approvals', description: '3 items awaiting your decision', route: '/approval-console', style: 'bg-status-error-surface text-status-error-text border border-status-error/20' },
    { label: 'Risk Alerts', description: 'Critical and high-risk signals', route: '/risk-alerts', style: 'bg-status-warning-surface text-status-warning-text border border-status-warning/20' },
    { label: 'AI Briefs', description: 'Daily operating summaries', route: '/ai-briefs', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
  ],
  'FIN-OWN': [
    { label: 'Finance Workspace', description: 'Request queue, approvals, finance control', route: '/finance-control', style: 'bg-dq-navy text-white' },
    { label: 'Approval Console', description: 'Requests awaiting Finance Control Owner review', route: '/approval-console', style: 'bg-status-error-surface text-status-error-text border border-status-error/20' },
    { label: 'Period Close Readiness', description: 'May 2026 close checklist', route: '/period-close', style: 'bg-status-warning-surface text-status-warning-text border border-status-warning/20' },
    { label: 'Finance Insights', description: 'Spend analytics and cycle time', route: '/finance-insights', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
  ],
  'FIN-OPS': [
    { label: 'Finance Ops Console', description: 'Processing queue, evidence actions, BC sync', route: '/finance-ops', style: 'bg-dq-navy text-white' },
    { label: 'Evidence Actions', description: 'Missing evidence items requiring upload', route: '/evidence-actions', style: 'bg-status-error-surface text-status-error-text border border-status-error/20' },
    { label: 'Clarifications', description: '2 open clarification threads', route: '/clarifications', style: 'bg-status-warning-surface text-status-warning-text border border-status-warning/20' },
    { label: 'Invoice & Payment Ops', description: 'Invoice processing and BC sync', route: '/invoice-payment', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
  ],
  REQ: [
    { label: 'Submit a Request', description: 'Raise expense, purchase, invoice, or vendor request', route: '/request-intake', style: 'bg-dq-orange text-white' },
    { label: 'My Requests', description: 'Track your active submissions', route: '/my-requests', style: 'bg-navy-50 text-dq-navy border border-dq-navy/20' },
    { label: 'My Tasks', description: 'Evidence actions and assigned tasks', route: '/my-tasks', style: 'bg-status-warning-surface text-status-warning-text border border-status-warning/20' },
    { label: 'Clarifications', description: 'Reply to finance team queries', route: '/clarifications', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
  ],
  ADMIN: [
    { label: 'Platform Admin Console', description: 'Users, sync health, workflow config', route: '/admin-console', style: 'bg-dq-navy text-white' },
    { label: 'Sync Error Queue', description: '3 BC sync failures pending resolution', route: '/sync-error-queue', style: 'bg-status-error-surface text-status-error-text border border-status-error/20' },
    { label: 'Change Request Register', description: 'Platform change and integration requests', route: '/change-register', style: 'bg-status-info-surface text-status-info-text border border-status-info/20' },
    { label: 'AI Guardrails & Audit Log', description: 'AI decision log and guardrail config', route: '/ai-guardrails', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
  ],
  'BC-STEWARD': [
    { label: 'BC Integration Health', description: 'Connector status and sync success rate', route: '/bc-integration', style: 'bg-dq-navy text-white' },
    { label: 'Sync Error Queue', description: '3 failed records requiring action', route: '/sync-error-queue', style: 'bg-status-error-surface text-status-error-text border border-status-error/20' },
    { label: 'Vendor Directory', description: 'Vendor BC sync status and data quality', route: '/vendor-directory', style: 'bg-status-warning-surface text-status-warning-text border border-status-warning/20' },
    { label: 'BC Mapping Reference', description: 'Field mapping between DWS.04 and BC', route: '/bc-mapping', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
  ],
}

// ── Lifecycle steps ──────────────────────────────────────────────────────────

const steps = [
  { num: '01', title: 'Start a Request', icon: <FileText size={18} strokeWidth={1.5} />, desc: 'Use Universal Request Intake to raise any finance, procurement, or project-linked request. The system classifies your request and tells you exactly which evidence to attach.' },
  { num: '02', title: 'Attach Evidence', icon: <Shield size={18} strokeWidth={1.5} />, desc: 'Each request type has a defined evidence checklist. Incomplete evidence stops the request before it reaches an approver.' },
  { num: '03', title: 'Approval Routing', icon: <Users size={18} strokeWidth={1.5} />, desc: 'DWS.04 routes your request to the correct approver based on amount, category, entity, and project. Track every status change in My Requests.' },
  { num: '04', title: 'Finance Processing', icon: <ArrowRight size={18} strokeWidth={1.5} />, desc: 'Approved requests move to the Finance or Procurement Operations queue for processing, PO issuance, or vendor action.' },
  { num: '05', title: 'Business Central Sync', icon: <Activity size={18} strokeWidth={1.5} />, desc: 'Processed records sync to Microsoft Business Central — the ERP system of record. DWS.04 shows the BC reference and sync state on every record.' },
  { num: '06', title: 'Leadership Visibility', icon: <Zap size={18} strokeWidth={1.5} />, desc: 'Executives see live KPIs, AI briefs, approval queues, payment exposure, budget health, and project economics — without chasing spreadsheets.' },
]

// ── FAQs ─────────────────────────────────────────────────────────────────────

const faqs = [
  { q: 'What request types can I raise?', a: 'Expense / reimbursement, purchase request, vendor onboarding, subscription renewal, invoice / payment, budget amendment, and project-linked cost request — all through Universal Request Intake.' },
  { q: 'Who approves my request?', a: 'Approval authority is configured by request type, amount, entity, and project. DWS.04 shows you the approver path before you submit.' },
  { q: 'How does Business Central sync work?', a: 'Approved and processed records are pushed to BC by the integration layer. DWS.04 shows Synced, Pending, or Failed status on every applicable record.' },
  { q: 'What does the AI do?', a: 'AI classifies request types, checks evidence completeness, summarises approval packs for approvers, and provides operating briefs for leadership. AI never approves spend — all decisions remain human.' },
  { q: 'Where do I track my requests?', a: 'My Requests (in the My Work section) shows all your active requests with full status history, evidence state, approver, and next action.' },
]

const navReference = [
  { label: 'Submit a request', route: 'Universal Request Intake', group: 'Request & Approval Governance' },
  { label: 'Track my requests', route: 'Request Tracker', group: 'My Work' },
  { label: 'Review / give approvals', route: 'Approval Console', group: 'Request & Approval Governance' },
  { label: 'Upload evidence', route: 'Evidence Actions', group: 'My Work' },
  { label: 'Reply to clarifications', route: 'Clarifications', group: 'My Work' },
  { label: 'Check BC sync', route: 'BC Integration Health', group: 'Platform Administration' },
  { label: 'Manage vendors', route: 'Vendor Directory', group: 'Procurement & Vendor Operations' },
  { label: 'View finance analytics', route: 'Finance Insights', group: 'Intelligence' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function PlatformHome() {
  const { activePersona } = usePersona()
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const quickActions = quickActionsByRole[activePersona.role]

  return (
    <div>

      {/* Hero */}
      <div className="rounded-card p-8 mb-8" style={{ background: '#030F35' }}>
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#B5C5F7' }}>
          DigitalQatalyst · Digital ERP
        </p>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome to DWS.04</h1>
        <p className="text-white/70 text-sm leading-relaxed max-w-[600px]">
          DWS.04 is the operating record for DQ's finance, procurement, and project work. Every request, approval, evidence document, payment, vendor record, and project cost lives here — governed, traceable, and connected to Microsoft Business Central.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-dq-orange flex items-center justify-center text-white text-xs font-bold">{activePersona.initials}</div>
          <span className="text-white/60 text-sm">Viewing as <span className="text-white font-semibold">{activePersona.name}</span> · {activePersona.roleLabel}</span>
        </div>
      </div>

      {/* Role-aware quick actions */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-4" style={{ letterSpacing: '0.12em' }}>
          Quick Actions — {activePersona.roleLabel}
        </p>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.route}
              onClick={() => navigate(action.route)}
              className={`text-left p-4 rounded-card transition-all hover:opacity-90 hover:-translate-y-0.5 ${action.style}`}
            >
              <p className="text-sm font-semibold mb-1">{action.label}</p>
              <p className="text-xs opacity-70 leading-snug">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* How DWS.04 works */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-4" style={{ letterSpacing: '0.12em' }}>
          How a request moves through DWS.04
        </p>
        <div className="grid grid-cols-3 gap-3">
          {steps.map((step, i) => (
            <div key={step.num} className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-dq-orange flex items-center justify-center text-white shrink-0">
                  {step.icon}
                </div>
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Step {step.num}</span>
              </div>
              <p className="text-sm font-semibold text-text-primary mb-1">{step.title}</p>
              <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation reference */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-4" style={{ letterSpacing: '0.12em' }}>
          Where to go for what
        </p>
        <div className="grid grid-cols-2 gap-2">
          {navReference.map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-3 bg-white rounded-card border border-border-subtle shadow-sm">
              <CheckCircle size={14} className="text-status-success mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-text-primary">{item.label}</p>
                <p className="text-xs text-dq-orange font-medium">{item.route}</p>
                <p className="text-[10px] text-text-muted">{item.group}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-4" style={{ letterSpacing: '0.12em' }}>
          Frequently asked questions
        </p>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <p className="text-sm font-semibold text-text-primary">{faq.q}</p>
                {openFaq === i
                  ? <ChevronUp size={15} className="text-text-muted shrink-0" strokeWidth={1.5} />
                  : <ChevronDown size={15} className="text-text-muted shrink-0" strokeWidth={1.5} />
                }
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 border-t border-border-subtle">
                  <p className="text-sm text-text-secondary leading-relaxed pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
