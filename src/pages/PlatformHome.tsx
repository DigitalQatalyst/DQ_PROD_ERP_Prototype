import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, FileText, Shield, Users, Activity, Zap, Brain,
  Compass, PenTool, Send, Gauge, CheckCircle2, BookOpen, ChevronDown,
  LayoutDashboard,
} from 'lucide-react'
import { usePersona } from '../context/PersonaContext'
import { roleGuide, domainExplainers } from '../data/orientationContent'

type Tab = 'Overview' | 'Your Role' | 'Lifecycle' | 'Domains' | 'FAQ'

const tabs: Tab[] = ['Overview', 'Your Role', 'Lifecycle', 'Domains', 'FAQ']

// ── Lifecycle steps ─────────────────────────────────────────────────────────

const lifecycleSteps = [
  { num: '01', title: 'Start a Request', icon: <FileText size={18} strokeWidth={1.5} />, desc: 'Use Universal Request Intake (or pick from a Marketplace catalogue) to raise any finance, HR, procurement, inventory, admin, or project-linked request. AI classifies the request and tells you exactly which evidence to attach.' },
  { num: '02', title: 'Attach Evidence', icon: <Shield size={18} strokeWidth={1.5} />, desc: 'Each request type has a defined evidence checklist. Incomplete evidence stops the request before it reaches an approver. The Evidence Library (Design marketplace) shows what each evidence type looks like.' },
  { num: '03', title: 'Approval Routing', icon: <Users size={18} strokeWidth={1.5} />, desc: 'DWS.04 routes your request to the correct approver based on amount, category, entity, project, and domain. Threshold rules are configurable. Track every status change in My Requests.' },
  { num: '04', title: 'Operational Processing', icon: <ArrowRight size={18} strokeWidth={1.5} />, desc: 'Approved requests move to the relevant operations queue — Finance Ops, Procurement, HR Ops, Inventory Ops, or Back-Office Fulfilment — for processing, fulfilment, or vendor action.' },
  { num: '05', title: 'Business Central Sync', icon: <Activity size={18} strokeWidth={1.5} />, desc: 'Processed records sync to Microsoft Business Central — the ERP system of record. DWS.04 shows the BC reference and sync state on every record (Synced / Pending / Failed / Not Synced).' },
  { num: '06', title: 'Leadership Visibility', icon: <Zap size={18} strokeWidth={1.5} />, desc: 'Executives see live KPIs, AI briefs, approval queues, payment exposure, budget health, project economics, workforce cost, inventory exceptions, and back-office SLA — without chasing spreadsheets.' },
]

const stageMap = [
  { code: 'S00', label: 'Orientations', desc: 'Welcome + Personal Dashboard. Where every user lands first.' },
  { code: 'S01', label: 'Marketplace (4D)', desc: 'Discern → Design → Deploy → Drive. Discovery, planning, submission, and tracking surfaces.' },
  { code: 'S02', label: 'WorkSpaces', desc: '10 domain workspaces: Finance, HR, Procurement, Inventory & Assets, Admin, Project Economics, Approvals, Master Data, Intelligence, Platform Admin.' },
]

const fourD = [
  { letter: 'Discern', icon: <Compass size={16} strokeWidth={1.5} />, desc: 'Understand before acting — search, policy library, guided assistant, threshold reference' },
  { letter: 'Design', icon: <PenTool size={16} strokeWidth={1.5} />, desc: 'Plan and prepare — template browser, evidence library, workflow blueprints, BC mapping' },
  { letter: 'Deploy', icon: <Send size={16} strokeWidth={1.5} />, desc: 'Submit and activate — unified catalogue of 35 request types across 8 domains' },
  { letter: 'Drive', icon: <Gauge size={16} strokeWidth={1.5} />, desc: 'Track, govern, improve — request tracker, approval console, escalations, audit, AI briefs' },
]

// ── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What request types can I raise?',
    a: '35 types across 8 domains: Finance (expense, invoice, budget, tax, customer onboarding), HR (leave, letters, onboarding, offboarding, documents), Procurement (purchase, vendor onboarding, quote, renewal), Inventory & Assets (equipment, stock issue, asset assignment, licence), Admin (travel, office supplies, document support, facilities, business card), plus Project, Master Data, and Integration support. Use Marketplace → Discover or the Guided Assistant if unsure.',
  },
  {
    q: 'Who approves my request?',
    a: 'Approval authority is configured by request type, amount, entity, project, and domain. The intake form shows you the approver path before you submit, and the Threshold & Approval Reference (S01 Discern) has the full matrix.',
  },
  {
    q: 'How does Business Central sync work?',
    a: 'Approved and processed records push to BC by the integration layer. DWS.04 shows Synced, Pending, Failed, or Not Synced state on every applicable record. BC stewards manage mappings and resolve sync errors in the BC Integration Health workspace.',
  },
  {
    q: 'What does the AI do?',
    a: 'AI classifies request types, checks evidence completeness, summarises approval packs for approvers, detects anomalies and exceptions, and produces operating briefs. AI never approves spend, releases payment, or changes BC data — all decisions remain human-owned with full audit trail.',
  },
  {
    q: 'Where do I track my requests?',
    a: 'My Requests (in My Work) shows all your active requests with full status history, evidence state, approver, and next action. Request Tracker shows the same with broader filtering. Marketplace → Drive is the curated entry-point if you prefer.',
  },
  {
    q: 'What about leave, expenses tied to HR rules, manager hierarchies?',
    a: 'Leave is in HR & People Operations — submission, manager-based approval, balance tracking. Expense rules (per-diem, receipt requirements, reimbursement limits) live in the Policy Library (Discern). Manager hierarchies live in the Employee Register and drive leave approval routing.',
  },
  {
    q: 'What replaces Excel and Teams as the operating record?',
    a: 'DWS.04 is the source of truth for ERP/back-office requests and their approvals, evidence, status, and audit history. Teams stays as a communication channel; Excel may be used for transition exports. Neither holds the final operational record any more.',
  },
  {
    q: 'How do I see what\'s changed recently?',
    a: 'Audit Trail Explorer (in Approvals & Controls) is the single source for every state change, approval, evidence action, sync event, and admin change. The Change Request Register tracks platform-level changes.',
  },
]

// ── Component ───────────────────────────────────────────────────────────────

export default function PlatformHome() {
  const { activePersona } = usePersona()
  const [tab, setTab] = useState<Tab>('Overview')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const guide = roleGuide[activePersona.role]

  return (
    <div>
      {/* Welcome hero */}
      <div className="rounded-card p-6 mb-6" style={{ background: '#030F35' }}>
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#B5C5F7' }}>
          DigitalQatalyst · Digital ERP · S00 Welcome
        </p>
        <h1 className="text-2xl font-bold text-white mb-1">Welcome, {activePersona.name.split(' ')[0]}</h1>
        <p className="text-white/70 text-sm">
          Viewing as <span className="text-white font-semibold">{activePersona.roleLabel}</span>. DWS.04 is DQ's internal ERP and back-office operations platform — finance, HR, procurement, inventory, assets, administration, approvals, controls, and reporting in one governed working layer.
        </p>
      </div>

      {/* Primary next-step links */}
      <div className="grid grid-cols-3 gap-3 mb-7">
        <Link to="/personal-dashboard" className="bg-dq-orange text-white rounded-card p-4 hover:opacity-90 transition-opacity">
          <div className="flex items-start gap-3">
            <LayoutDashboard size={22} strokeWidth={1.5} className="shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Personal Dashboard</p>
              <p className="text-xs opacity-80 mt-0.5">Your focused day view, priority items, and key actions</p>
            </div>
          </div>
        </Link>
        <Link to="/marketplace/deploy" className="bg-navy-50 text-dq-navy rounded-card p-4 border border-dq-navy/20 hover:bg-navy-50/80 transition-colors">
          <div className="flex items-start gap-3">
            <Send size={22} strokeWidth={1.5} className="shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Browse Marketplace</p>
              <p className="text-xs opacity-80 mt-0.5">Discern, Design, Deploy, Drive — find or submit a request</p>
            </div>
          </div>
        </Link>
        <Link to={activePersona.landingRoute} className="bg-surface-1 text-dq-navy rounded-card p-4 border border-border-subtle hover:bg-border-subtle transition-colors">
          <div className="flex items-start gap-3">
            <Activity size={22} strokeWidth={1.5} className="shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Open Your Workspace</p>
              <p className="text-xs opacity-80 mt-0.5">Go straight to your {activePersona.roleLabel} home</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === 'Overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-6">
            <h2 className="text-lg font-bold text-text-primary mb-2">What is DWS.04?</h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              DWS.04 Digital ERP is DigitalQatalyst's <strong>internal ERP and back-office operations platform</strong> — a custom AI-assisted React front end over Microsoft Business Central. It governs finance, HR, procurement, inventory, assets, administration, approvals, controls, reporting, and multi-entity execution.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              DWS.04 replaces Excel and Teams as the source of operational movement. Every request has an owner, status, evidence, approval trail, and Business Central reference — in one place.
            </p>
          </div>

          {/* 3-stage model */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4">The 3-Stage Navigation Model</h2>
            <div className="grid grid-cols-3 gap-3">
              {stageMap.map((s) => (
                <div key={s.code} className="p-4 rounded-card border border-border-subtle">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-dq-orange" style={{ letterSpacing: '0.08em' }}>{s.code}</span>
                    <span className="text-[12px] font-bold uppercase text-dq-navy" style={{ letterSpacing: '0.14em' }}>{s.label}</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4D Marketplace */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-6">
            <h2 className="text-lg font-bold text-text-primary mb-1">The 4D Marketplace (S01)</h2>
            <p className="text-sm text-text-muted mb-4">Organised by stage of intent, not by domain.</p>
            <div className="grid grid-cols-4 gap-3">
              {fourD.map((d) => (
                <div key={d.letter} className="p-3 rounded-card border border-border-subtle">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-dq-orange">{d.icon}</span>
                    <p className="text-sm font-bold text-text-primary">{d.letter}</p>
                  </div>
                  <p className="text-xs text-text-muted leading-snug">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Anchor + AI */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-2">Universal Request Anchor</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Every Stage 2+ transaction — expense, purchase, vendor change, leave request, asset issue, customer onboarding, sync issue — creates a single <code className="text-[11px] bg-surface-1 px-1 rounded">s2_account.requests</code> record. One shared lifecycle, one audit trail. No parallel workflow models per domain.
              </p>
            </div>
            <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                <Brain size={16} className="text-dq-navy" strokeWidth={1.5} />
                AI is Infrastructure, Not a Feature
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                AI guides request creation, classifies, checks evidence, summarises approval packs, flags anomalies, and produces operating briefs. It never approves spend, releases payment, or writes to BC. Every AI output is source-traceable, permission-aware, and logged.
              </p>
            </div>
          </div>

          {/* What replaces */}
          <div className="bg-orange-50 rounded-card p-5 border border-dq-orange/20">
            <h3 className="text-sm font-semibold text-dq-navy mb-2">What DWS.04 replaces</h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• <strong>Excel trackers</strong> as the operating database (Excel can stay as a transition/export format)</li>
              <li>• <strong>MS Teams chats</strong> as the final record for approvals, evidence, and status (Teams stays as a communication channel)</li>
              <li>• <strong>Manual chasing</strong> across multiple systems — every record now has one owner, one status, one timeline</li>
            </ul>
          </div>
        </div>
      )}

      {/* YOUR ROLE */}
      {tab === 'Your Role' && (
        <div className="space-y-5">
          {/* Headline card */}
          <div className="bg-dq-navy rounded-card p-6 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#B5C5F7', letterSpacing: '0.12em' }}>
              {activePersona.roleLabel} · {activePersona.name}
            </p>
            <h2 className="text-xl font-bold mb-2">{guide.headline}</h2>
            <p className="text-sm text-white/80 leading-relaxed">{guide.responsibilities}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-dq-orange" strokeWidth={1.5} />
                Approvals You Own
              </h3>
              <ul className="space-y-1.5">
                {guide.approvalsYouOwn.map((a, i) => (
                  <li key={i} className="text-sm text-text-secondary flex gap-2">
                    <span className="text-dq-orange shrink-0">•</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <FileText size={16} className="text-dq-orange" strokeWidth={1.5} />
                Records You Manage
              </h3>
              <ul className="space-y-1.5">
                {guide.recordsYouManage.map((r, i) => (
                  <li key={i} className="text-sm text-text-secondary flex gap-2">
                    <span className="text-dq-orange shrink-0">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Activity size={16} className="text-dq-orange" strokeWidth={1.5} />
                Reports You Consume
              </h3>
              <ul className="space-y-1.5">
                {guide.reportsYouConsume.map((r, i) => (
                  <li key={i} className="text-sm text-text-secondary flex gap-2">
                    <span className="text-dq-orange shrink-0">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-dq-orange" strokeWidth={1.5} />
                First-Week Checklist
              </h3>
              <ul className="space-y-2">
                {guide.firstWeekChecklist.map((c, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                    <input type="checkbox" className="mt-0.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {guide.crossDomainNote && (
            <div className="bg-orange-50 rounded-card p-4 border border-dq-orange/20">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-dq-orange mb-1.5" style={{ letterSpacing: '0.12em' }}>
                Cross-Domain Note
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">{guide.crossDomainNote}</p>
            </div>
          )}
        </div>
      )}

      {/* LIFECYCLE */}
      {tab === 'Lifecycle' && (
        <div className="space-y-5">
          <p className="text-sm text-text-muted">
            Every request — finance, HR, procurement, inventory, admin, project — follows the same 6-step lifecycle. The universal request anchor (<code className="text-[11px] bg-surface-1 px-1 rounded">s2_account.requests</code>) holds the full timeline.
          </p>

          <div className="grid grid-cols-3 gap-3">
            {lifecycleSteps.map((step) => (
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

          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Status badge meanings</h3>
            <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-xs">
              <div><span className="font-semibold text-dq-navy">Draft</span> — saved, not submitted</div>
              <div><span className="font-semibold text-status-info-text">Submitted</span> — sent for review</div>
              <div><span className="font-semibold text-status-warning-text">In Review</span> — owner is looking</div>
              <div><span className="font-semibold text-dq-navy">Pending Approval</span> — awaiting approver decision</div>
              <div><span className="font-semibold text-dq-orange">Clarification Needed</span> — sent back to you</div>
              <div><span className="font-semibold text-status-warning-text">Evidence Pending</span> — missing documents</div>
              <div><span className="font-semibold text-status-success-text">Approved</span> — moving to processing</div>
              <div><span className="font-semibold text-status-success-text">Fulfilled</span> — done</div>
              <div><span className="font-semibold text-status-error-text">Rejected</span> — declined with reason</div>
            </div>
          </div>
        </div>
      )}

      {/* DOMAINS */}
      {tab === 'Domains' && (
        <div className="space-y-4">
          <p className="text-sm text-text-muted">
            DWS.04 covers 10 operating domains. Each has its own workspace, its own owners, and connects to others through the shared data model and universal request anchor.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {domainExplainers.map((d, i) => (
              <div key={d.name} className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[10px] font-bold text-dq-orange">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-sm font-semibold text-text-primary">{d.name}</h3>
                </div>
                <p className="text-xs text-text-muted italic mb-3">{d.question}</p>
                <p className="text-[11px] text-text-muted mb-2"><span className="font-semibold">Primary users:</span> {d.primaryUsers}</p>
                <div className="mb-3">
                  <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">Capabilities</p>
                  <ul className="text-xs text-text-secondary space-y-0.5">
                    {d.capabilities.map((c, j) => (
                      <li key={j}>• {c}</li>
                    ))}
                  </ul>
                </div>
                <Link to={d.linkRoute} className="inline-flex items-center gap-1 text-xs font-semibold text-dq-orange hover:underline">
                  {d.linkLabel} <ArrowRight size={12} strokeWidth={2} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {tab === 'FAQ' && (
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface-1 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <p className="text-sm font-semibold text-text-primary">{faq.q}</p>
                <ChevronDown
                  size={15}
                  className={`text-text-muted shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  strokeWidth={1.5}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 border-t border-border-subtle">
                  <p className="text-sm text-text-secondary leading-relaxed pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
