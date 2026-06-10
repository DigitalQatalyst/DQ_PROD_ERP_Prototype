import { useState } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import {
  ArrowRight, Compass, PenTool, Send, Gauge, BookOpen, FileText,
  GitMerge, Activity, AlertTriangle, Search, ChevronRight, Sparkles, Scale,
  CheckCircle2, Clock, Inbox,
} from 'lucide-react'
import { marketplaceItems } from '../../data/marketplaceItems'
import { policyMap, policies, workflowMap, workflows } from '../../data/journeyContent'

// ── Stages ──────────────────────────────────────────────────────────────────

type Stage = 'Discern' | 'Design' | 'Deploy' | 'Drive'

const stageMeta: Record<Stage, { num: string; tagline: string; description: string }> = {
  Discern: { num: '01', tagline: 'Understand', description: 'Understand the policy, threshold, and requirements before you submit.' },
  Design: { num: '02', tagline: 'Plan', description: 'Preview the template, evidence checklist, and end-to-end workflow.' },
  Deploy: { num: '03', tagline: 'Submit', description: 'Start the request with everything you need ready.' },
  Drive: { num: '04', tagline: 'Track', description: 'Track progress, resolve blockers, and review outcomes.' },
}

const stageIcon: Record<Stage, React.ReactNode> = {
  Discern: <Compass size={16} strokeWidth={1.5} />,
  Design: <PenTool size={16} strokeWidth={1.5} />,
  Deploy: <Send size={16} strokeWidth={1.5} />,
  Drive: <Gauge size={16} strokeWidth={1.5} />,
}

const stages: Stage[] = ['Discern', 'Design', 'Deploy', 'Drive']

// ── Component ───────────────────────────────────────────────────────────────

export default function MarketplaceJourney() {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialStage = (searchParams.get('stage') as Stage) ?? 'Discern'
  const [stage, setStage] = useState<Stage>(
    stages.includes(initialStage) ? initialStage : 'Discern'
  )

  const item = marketplaceItems.find((i) => i.id === itemId)

  if (!item) {
    return (
      <div className="text-center py-16">
        <p className="text-text-muted mb-4">Request type not found.</p>
        <Link to="/marketplace/deploy" className="text-dq-orange font-semibold hover:underline">← Back to Deploy Marketplace</Link>
      </div>
    )
  }

  const linkedPolicies = (policyMap[item.id] ?? []).map((id) => ({ id, ...policies[id] }))
  const linkedWorkflowId = workflowMap[item.id]
  const linkedWorkflow = linkedWorkflowId ? workflows[linkedWorkflowId] : null

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
          Marketplace · 4D Journey
        </p>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-btn flex items-center justify-center shrink-0 text-dq-orange" style={{ background: '#FFF5F2' }}>
            {item.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-1">
              <h1 className="text-2xl font-bold text-text-primary">{item.title}</h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">{item.domain}</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-3xl">{item.description}</p>
          </div>
        </div>
      </div>

      {/* 4-step stepper */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4 mb-6">
        <div className="flex items-stretch gap-1">
          {stages.map((s, i) => {
            const isActive = stage === s
            const isPast = stages.indexOf(stage) > i
            return (
              <div key={s} className="flex items-stretch gap-1 flex-1">
                <button
                  onClick={() => setStage(s)}
                  className={`flex-1 text-left px-4 py-3 rounded-card border transition-colors ${
                    isActive
                      ? 'border-dq-orange bg-orange-50'
                      : isPast
                      ? 'border-status-success/30 bg-status-success-surface/40 hover:bg-status-success-surface/60'
                      : 'border-border-default hover:bg-surface-1'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isActive
                        ? 'bg-dq-orange text-white'
                        : isPast
                        ? 'bg-status-success text-white'
                        : 'bg-border-default text-text-muted'
                    }`}>
                      {isPast ? <CheckCircle2 size={12} strokeWidth={2.5} /> : stageMeta[s].num}
                    </div>
                    <span className={`text-sm font-bold ${isActive ? 'text-dq-orange' : 'text-text-primary'}`}>{s}</span>
                  </div>
                  <p className={`text-[11px] ${isActive ? 'text-dq-orange' : 'text-text-muted'}`}>{stageMeta[s].tagline}</p>
                </button>
                {i < stages.length - 1 && (
                  <ChevronRight size={20} strokeWidth={1.5} className="text-icon-muted self-center shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Stage description */}
      <p className="text-sm text-text-muted mb-5 leading-relaxed">
        <span className="font-semibold text-text-secondary">Step {stageMeta[stage].num} — {stage}.</span> {stageMeta[stage].description}
      </p>

      {/* DISCERN */}
      {stage === 'Discern' && (
        <div className="space-y-4">
          {/* Policies */}
          {linkedPolicies.length > 0 ? (
            <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-dq-orange" strokeWidth={1.5} />
                Policies that apply to {item.title}
              </h3>
              <div className="space-y-3">
                {linkedPolicies.map((p) => (
                  <div key={p.id} className="border border-border-subtle rounded-card p-3">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <p className="text-sm font-semibold text-text-primary">{p.title}</p>
                      <span className="text-[10px] font-mono text-text-muted">{p.id}</span>
                    </div>
                    <p className="text-xs text-text-muted mb-1.5">{p.summary}</p>
                    <p className="text-xs text-text-secondary"><span className="font-semibold">Key rule:</span> {p.keyRule}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-surface-1 rounded-card p-4 border border-border-subtle">
              <p className="text-xs text-text-muted">No specific policy maps directly to this request type. Browse the full library if you'd like to check related rules.</p>
            </div>
          )}

          {/* Threshold + approver */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Scale size={16} className="text-dq-orange" strokeWidth={1.5} />
              Approval threshold
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">Approver path</p>
                <p className="text-sm text-text-secondary">{item.approver}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">Expected SLA</p>
                <p className="text-sm text-text-secondary">{item.sla}</p>
              </div>
            </div>
          </div>

          {/* Cross-links */}
          <div className="grid grid-cols-3 gap-3">
            <Link to="/marketplace/search" className="bg-white rounded-card border border-border-subtle shadow-sm p-4 hover:shadow-md transition-shadow">
              <Search size={18} strokeWidth={1.5} className="text-dq-orange mb-2" />
              <p className="text-sm font-semibold text-text-primary">Search templates</p>
              <p className="text-xs text-text-muted">Discovery Search</p>
            </Link>
            <Link to="/marketplace/discern/assistant" className="bg-white rounded-card border border-border-subtle shadow-sm p-4 hover:shadow-md transition-shadow">
              <Sparkles size={18} strokeWidth={1.5} className="text-dq-orange mb-2" />
              <p className="text-sm font-semibold text-text-primary">Get a recommendation</p>
              <p className="text-xs text-text-muted">Guided Request Assistant</p>
            </Link>
            <Link to="/marketplace/discern/policies" className="bg-white rounded-card border border-border-subtle shadow-sm p-4 hover:shadow-md transition-shadow">
              <BookOpen size={18} strokeWidth={1.5} className="text-dq-orange mb-2" />
              <p className="text-sm font-semibold text-text-primary">Open Policy Library</p>
              <p className="text-xs text-text-muted">Full policies</p>
            </Link>
          </div>

          {/* Next */}
          <div className="flex justify-end">
            <button
              onClick={() => setStage('Design')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-dq-navy text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Next: Design <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      {/* DESIGN */}
      {stage === 'Design' && (
        <div className="space-y-4">
          {/* Template preview */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <FileText size={16} className="text-dq-orange" strokeWidth={1.5} />
              Template Preview
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">Approver</p>
                <p className="text-sm text-text-secondary">{item.approver}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">SLA</p>
                <p className="text-sm text-text-secondary">{item.sla}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">Evidence count</p>
                <p className="text-sm text-text-secondary">{item.evidence.length} items required</p>
              </div>
            </div>
            <div className="border-t border-border-subtle pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">Evidence checklist</p>
              <ul className="space-y-1">
                {item.evidence.map((e, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-icon-muted shrink-0" strokeWidth={2} />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Workflow blueprint */}
          {linkedWorkflow && (
            <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <GitMerge size={16} className="text-dq-orange" strokeWidth={1.5} />
                  End-to-end workflow
                </h3>
                <span className="text-[11px] text-text-muted">⏱ {linkedWorkflow.duration}</span>
              </div>
              <p className="text-sm text-text-secondary mb-3">{linkedWorkflow.title}</p>
              <div className="flex items-stretch gap-1 flex-wrap">
                {linkedWorkflow.steps.map((step, i) => (
                  <div key={i} className="flex items-stretch gap-1">
                    <div className="bg-surface-1 border border-border-subtle rounded-btn px-3 py-2 text-center min-w-[120px]">
                      <p className="text-[10px] font-bold text-text-muted">{i + 1}</p>
                      <p className="text-xs text-text-primary">{step}</p>
                    </div>
                    {i < linkedWorkflow.steps.length - 1 && (
                      <ChevronRight size={16} className="text-icon-muted self-center shrink-0" strokeWidth={1.5} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cross-links */}
          <div className="grid grid-cols-3 gap-3">
            <Link to="/marketplace/design/templates" className="bg-white rounded-card border border-border-subtle shadow-sm p-4 hover:shadow-md transition-shadow">
              <FileText size={18} strokeWidth={1.5} className="text-dq-orange mb-2" />
              <p className="text-sm font-semibold text-text-primary">All templates</p>
              <p className="text-xs text-text-muted">Template Browser</p>
            </Link>
            <Link to="/marketplace/design/evidence" className="bg-white rounded-card border border-border-subtle shadow-sm p-4 hover:shadow-md transition-shadow">
              <CheckCircle2 size={18} strokeWidth={1.5} className="text-dq-orange mb-2" />
              <p className="text-sm font-semibold text-text-primary">Evidence library</p>
              <p className="text-xs text-text-muted">Acceptable formats + examples</p>
            </Link>
            <Link to="/marketplace/design/workflows" className="bg-white rounded-card border border-border-subtle shadow-sm p-4 hover:shadow-md transition-shadow">
              <GitMerge size={18} strokeWidth={1.5} className="text-dq-orange mb-2" />
              <p className="text-sm font-semibold text-text-primary">All workflows</p>
              <p className="text-xs text-text-muted">Workflow Blueprints</p>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button onClick={() => setStage('Discern')} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn border border-border-default text-text-primary text-sm font-semibold hover:bg-surface-1 transition-colors">
              ← Back: Discern
            </button>
            <button onClick={() => setStage('Deploy')} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-dq-navy text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Next: Deploy <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      {/* DEPLOY */}
      {stage === 'Deploy' && (
        <div className="space-y-4">
          {/* Big CTA */}
          <div className="bg-dq-navy rounded-card p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-btn bg-dq-orange flex items-center justify-center shrink-0">
                <Send size={28} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#B5C5F7', letterSpacing: '0.12em' }}>
                  You're ready
                </p>
                <h2 className="text-xl font-bold mb-2">Submit your {item.title}</h2>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  You've reviewed the policy and threshold (Discern) and previewed the template + workflow (Design). Now submit — DWS.04 routes the request, tracks evidence, and triggers approval.
                </p>
                <button
                  onClick={() => navigate(item.ctaRoute ?? '/request-intake')}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Start request <ArrowRight size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Reminder */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Quick reminder before you submit</h3>
            <ul className="space-y-1.5 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-status-success-text mt-0.5 shrink-0" strokeWidth={2} />
                <span>Have <strong>{item.evidence.length} evidence items</strong> ready: {item.evidence.join(', ')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-status-info-text mt-0.5 shrink-0" strokeWidth={2} />
                <span>Expect approval within <strong>{item.sla}</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Inbox size={14} className="text-dq-orange mt-0.5 shrink-0" strokeWidth={2} />
                <span>This will route to: <strong>{item.approver}</strong></span>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button onClick={() => setStage('Design')} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn border border-border-default text-text-primary text-sm font-semibold hover:bg-surface-1 transition-colors">
              ← Back: Design
            </button>
            <button onClick={() => setStage('Drive')} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-dq-navy text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Next: Drive <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      {/* DRIVE */}
      {stage === 'Drive' && (
        <div className="space-y-4">
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
              <Activity size={16} className="text-dq-orange" strokeWidth={1.5} />
              Once submitted, track here
            </h3>
            <p className="text-sm text-text-muted mb-4">After submission your request gets a status, an approver, and an audit trail. Here's where you go to see it.</p>

            <div className="grid grid-cols-3 gap-3">
              <Link to="/my-requests" className="border border-border-subtle rounded-card p-4 hover:bg-surface-1 transition-colors">
                <Inbox size={18} strokeWidth={1.5} className="text-dq-orange mb-2" />
                <p className="text-sm font-semibold text-text-primary mb-0.5">Track your submission</p>
                <p className="text-[11px] text-text-muted">Request Tracker · filter by "{item.title}"</p>
              </Link>
              <Link to="/escalations" className="border border-border-subtle rounded-card p-4 hover:bg-surface-1 transition-colors">
                <AlertTriangle size={18} strokeWidth={1.5} className="text-dq-orange mb-2" />
                <p className="text-sm font-semibold text-text-primary mb-0.5">If blocked</p>
                <p className="text-[11px] text-text-muted">Escalations & Exceptions</p>
              </Link>
              <Link to="/audit-trail" className="border border-border-subtle rounded-card p-4 hover:bg-surface-1 transition-colors">
                <FileText size={18} strokeWidth={1.5} className="text-dq-orange mb-2" />
                <p className="text-sm font-semibold text-text-primary mb-0.5">See the audit trail</p>
                <p className="text-[11px] text-text-muted">Every state change logged</p>
              </Link>
            </div>
          </div>

          <Link to="/marketplace/drive" className="block bg-orange-50 rounded-card p-4 border border-dq-orange/20 hover:bg-orange-50/80 transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-dq-navy">Browse all tracking surfaces</p>
                <p className="text-xs text-text-secondary">Drive Marketplace — request tracker, approval console, escalations, audit, AI briefs, risk alerts</p>
              </div>
              <ArrowRight size={16} strokeWidth={2} className="text-dq-orange shrink-0" />
            </div>
          </Link>

          <div className="flex justify-start">
            <button onClick={() => setStage('Deploy')} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn border border-border-default text-text-primary text-sm font-semibold hover:bg-surface-1 transition-colors">
              ← Back: Deploy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
