import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, AlertTriangle, AlertCircle, Info, Calendar, Target, Zap, Home } from 'lucide-react'
import { usePersona } from '../context/PersonaContext'
import type { PersonaRole } from '../types'
import { welcomeKPIs, todaysFocus, priorityItems } from '../data/orientationContent'

// ── Quick action tiles (Key Action Items) ───────────────────────────────────

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
    { label: 'Financial Health Report', description: 'AR, AP, working capital, forecast', route: '/financial-health', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
  ],
  'FIN-OPS': [
    { label: 'Finance Ops Console', description: 'Processing queue, evidence actions, BC sync', route: '/finance-ops', style: 'bg-dq-navy text-white' },
    { label: 'Evidence Actions', description: 'Missing evidence items requiring upload', route: '/evidence-actions', style: 'bg-status-error-surface text-status-error-text border border-status-error/20' },
    { label: 'Customer Onboarding', description: 'In-flight onboarding evidence', route: '/customer-onboarding', style: 'bg-status-warning-surface text-status-warning-text border border-status-warning/20' },
    { label: 'Invoice & Payment Ops', description: 'Invoice processing and BC sync', route: '/invoice-payment', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
  ],
  REQ: [
    { label: 'Submit a Request', description: 'Expense, purchase, HR letter, travel, asset…', route: '/request-intake', style: 'bg-dq-orange text-white' },
    { label: 'My Requests', description: 'Track your active submissions', route: '/my-requests', style: 'bg-navy-50 text-dq-navy border border-dq-navy/20' },
    { label: 'My Tasks', description: 'Evidence actions and assigned tasks', route: '/my-tasks', style: 'bg-status-warning-surface text-status-warning-text border border-status-warning/20' },
    { label: 'Guided Request Assistant', description: 'Not sure what to submit? Get a recommendation', route: '/marketplace/discern/assistant', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
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
  'HR-OWN': [
    { label: 'HR Home', description: 'People operations overview, approvals, transitions', route: '/hr-home', style: 'bg-dq-navy text-white' },
    { label: 'Leave Management', description: 'Pending leave approvals and team balances', route: '/leave-management', style: 'bg-status-warning-surface text-status-warning-text border border-status-warning/20' },
    { label: 'Onboarding / Offboarding', description: 'Active employee transitions and clearance', route: '/onboarding-offboarding', style: 'bg-status-info-surface text-status-info-text border border-status-info/20' },
    { label: 'HR Service Requests', description: 'Letters, documents, employee admin', route: '/hr-requests', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
  ],
  'INV-OWN': [
    { label: 'Inventory Home', description: 'Stock, devices, licences, recent movements', route: '/inventory-home', style: 'bg-dq-navy text-white' },
    { label: 'Asset Custody & Return', description: '1 return pending from offboarding', route: '/asset-custody', style: 'bg-status-warning-surface text-status-warning-text border border-status-warning/20' },
    { label: 'Inventory Reconciliation', description: 'Stock count vs system variances', route: '/inventory-reconciliation', style: 'bg-status-info-surface text-status-info-text border border-status-info/20' },
    { label: 'Inventory Operations', description: 'Movements, exceptions, reorder actions', route: '/inventory-ops', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
  ],
  'ADM-OWN': [
    { label: 'Back-Office Home', description: 'SLA risks, blocked tasks, travel in flight', route: '/backoffice-home', style: 'bg-dq-navy text-white' },
    { label: 'Back-Office Fulfilment', description: 'All admin requests by status', route: '/backoffice-fulfilment', style: 'bg-status-error-surface text-status-error-text border border-status-error/20' },
    { label: 'Travel & Admin', description: 'Travel bookings, visas, per-diem', route: '/travel-admin', style: 'bg-status-info-surface text-status-info-text border border-status-info/20' },
    { label: 'Back-Office Performance', description: 'SLA + operator load intelligence', route: '/backoffice-performance', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
  ],
  'PROC-OWN': [
    { label: 'Procurement Workspace', description: 'Purchase queue, vendor tasks, renewals', route: '/procurement', style: 'bg-dq-navy text-white' },
    { label: 'Purchase Request Centre', description: 'New and pending purchase requests', route: '/purchase-requests', style: 'bg-status-warning-surface text-status-warning-text border border-status-warning/20' },
    { label: 'Vendor Directory', description: 'Vendor master and BC sync status', route: '/vendor-directory', style: 'bg-status-info-surface text-status-info-text border border-status-info/20' },
    { label: 'Subscription & Renewals', description: 'Upcoming renewals and decisions', route: '/subscriptions', style: 'bg-surface-1 text-text-primary border border-border-subtle' },
  ],
}

// ── Today's Focus tone styles ────────────────────────────────────────────────

const toneStyle = {
  urgent: { bg: 'bg-status-error-surface', border: 'border-status-error', text: 'text-status-error-text', icon: <AlertTriangle size={20} strokeWidth={1.5} /> },
  attention: { bg: 'bg-status-warning-surface', border: 'border-status-warning', text: 'text-status-warning-text', icon: <AlertCircle size={20} strokeWidth={1.5} /> },
  info: { bg: 'bg-navy-50', border: 'border-dq-navy/20', text: 'text-dq-navy', icon: <Info size={20} strokeWidth={1.5} /> },
}

// Priority item tone (smaller indicator)
const priorityToneIcon = {
  urgent: <AlertTriangle size={14} className="text-status-error-text" strokeWidth={2} />,
  attention: <AlertCircle size={14} className="text-status-warning-text" strokeWidth={2} />,
  info: <Info size={14} className="text-status-info-text" strokeWidth={2} />,
}

// ── KPI variant colours ──────────────────────────────────────────────────────

const kpiColor = {
  default: 'text-dq-navy',
  success: 'text-status-success-text',
  warning: 'text-status-warning-text',
  error: 'text-status-error-text',
  mono: 'text-dq-orange font-mono',
}

const today = new Date('2026-05-22').toLocaleDateString('en-GB', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
})

// ── Component ────────────────────────────────────────────────────────────────

export default function PersonalDashboard() {
  const { activePersona } = usePersona()
  const navigate = useNavigate()

  const kpis = welcomeKPIs[activePersona.role]
  const focus = todaysFocus[activePersona.role]
  const focusTone = toneStyle[focus.tone]
  const quickActions = quickActionsByRole[activePersona.role]
  const priorities = priorityItems[activePersona.role]

  return (
    <div>
      {/* Greeting */}
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-1" style={{ letterSpacing: '0.12em' }}>
            Orientation · Personal Dashboard
          </p>
          <h1 className="text-2xl font-bold text-text-primary">Good morning, {activePersona.name.split(' ')[0]}</h1>
          <p className="text-sm text-text-muted mt-1">{today} · Viewing as {activePersona.roleLabel}</p>
        </div>
        <Link to="/" className="text-xs text-text-muted hover:text-dq-orange transition-colors inline-flex items-center gap-1">
          <Home size={12} strokeWidth={2} /> Back to Welcome
        </Link>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SECTION 1: FOCUSED DAY VIEW */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={16} className="text-dq-orange" strokeWidth={1.5} />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary" style={{ letterSpacing: '0.12em' }}>
            Focused Day View
          </p>
        </div>

        {/* Today's Focus card */}
        <div className={`rounded-card p-5 border-2 ${focusTone.bg} ${focusTone.border} mb-3`}>
          <div className="flex items-start gap-3">
            <div className={`${focusTone.text} shrink-0 mt-0.5`}>
              {focusTone.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[11px] font-semibold uppercase tracking-widest ${focusTone.text} mb-1`} style={{ letterSpacing: '0.12em' }}>
                Today's Focus
              </p>
              <p className="text-base font-bold text-text-primary mb-1">{focus.headline}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{focus.subtext}</p>
            </div>
            <button
              onClick={() => navigate(focus.ctaRoute)}
              className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 shrink-0"
            >
              {focus.ctaLabel}
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* KPI strip — operating state */}
        <div className="grid grid-cols-3 gap-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-surface-1 rounded-card shadow-sm p-4">
              <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1.5">{kpi.label}</p>
              <p className={`text-xl font-bold tabular-nums leading-none ${kpiColor[kpi.variant ?? 'default']}`}>
                {kpi.value}
              </p>
              {kpi.sub && <p className="text-[11px] text-text-muted mt-1">{kpi.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SECTION 2: PRIORITY ITEMS */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Target size={16} className="text-dq-orange" strokeWidth={1.5} />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary" style={{ letterSpacing: '0.12em' }}>
            Priority Items
          </p>
        </div>

        <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
          {priorities.map((p, i) => (
            <div
              key={p.id}
              className={`flex items-start gap-3 px-5 py-4 ${i < priorities.length - 1 ? 'border-b border-border-subtle' : ''} hover:bg-surface-1 transition-colors`}
            >
              <div className="shrink-0 mt-0.5">
                {priorityToneIcon[p.tone]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-text-primary">{p.title}</p>
                  <span className="text-[10px] font-mono text-text-muted">{p.id}</span>
                </div>
                <p className="text-xs text-text-muted">{p.subtitle}</p>
              </div>
              <button
                onClick={() => navigate(p.ctaRoute)}
                className="text-xs font-semibold text-dq-orange hover:underline shrink-0 inline-flex items-center gap-1"
              >
                {p.ctaLabel}
                <ArrowRight size={11} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SECTION 3: KEY ACTION ITEMS */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={16} className="text-dq-orange" strokeWidth={1.5} />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary" style={{ letterSpacing: '0.12em' }}>
            Key Action Items
          </p>
        </div>

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
    </div>
  )
}
