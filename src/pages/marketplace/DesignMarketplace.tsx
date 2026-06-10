import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LayoutTemplate, FileCheck, GitMerge, Map, ArrowRight, Clock, CheckCircle2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { marketplaceItems, domains, type RequestDomain } from '../../data/marketplaceItems'
import { workflowMap, workflows } from '../../data/journeyContent'

interface DesignCard {
  title: string
  description: string
  icon: ReactNode
  route: string
}

const tools: DesignCard[] = [
  { title: 'Request Template Browser', description: 'Preview every request template — fields, evidence, approval path, SLA — before you commit to submit.', icon: <LayoutTemplate size={20} strokeWidth={1.5} />, route: '/marketplace/design/templates' },
  { title: 'Evidence Checklist Library', description: 'Common evidence types — receipts, invoices, quotes, contracts, tax certs — what they are and when they’re required.', icon: <FileCheck size={20} strokeWidth={1.5} />, route: '/marketplace/design/evidence' },
  { title: 'Workflow Blueprints', description: 'Visual flow of common DWS.04 workflows — purchase, vendor onboarding, payment, period close.', icon: <GitMerge size={20} strokeWidth={1.5} />, route: '/marketplace/design/workflows' },
  { title: 'BC Mapping Reference', description: 'How DWS.04 records map to Business Central objects — fields, codes, and sync rules.', icon: <Map size={20} strokeWidth={1.5} />, route: '/bc-mapping' },
]

type Filter = 'All' | RequestDomain

export default function DesignMarketplace() {
  const [filter, setFilter] = useState<Filter>('All')

  const filters: Filter[] = ['All', ...domains]

  const filtered = useMemo(
    () => marketplaceItems.filter((i) => filter === 'All' || i.domain === filter),
    [filter]
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Design — Plan & prepare</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Shape the work before execution — preview templates, gather the right evidence, check the workflow, and confirm the integration mapping. Preparation surfaces, not submission surfaces.
        </p>
      </div>

      {/* Universal tools */}
      <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3" style={{ letterSpacing: '0.12em' }}>
        Universal Tools
      </p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {tools.map((c) => (
          <Link
            key={c.route}
            to={c.route}
            className="bg-white rounded-card border border-border-subtle shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 rounded-btn flex items-center justify-center shrink-0 text-dq-orange" style={{ background: '#FFF5F2' }}>
                {c.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-text-primary leading-tight">{c.title}</h3>
              </div>
            </div>
            <p className="text-xs text-text-muted leading-relaxed flex-1">{c.description}</p>
            <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-xs">
              <span className="text-text-muted">Open</span>
              <ArrowRight size={12} strokeWidth={2} className="text-dq-orange" />
            </div>
          </Link>
        ))}
      </div>

      {/* Per-item grid */}
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted" style={{ letterSpacing: '0.12em' }}>
          Plan by Request Type
        </p>
        <p className="text-[11px] text-text-muted">{filtered.length} of {marketplaceItems.length} request types</p>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-pill text-xs font-semibold transition-colors ${
              filter === f
                ? 'bg-dq-navy text-white'
                : 'bg-surface-1 text-text-secondary hover:bg-border-subtle'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((item) => {
          const workflowId = workflowMap[item.id]
          const workflow = workflowId ? workflows[workflowId] : null

          return (
            <Link
              key={item.id}
              to={`/marketplace/journey/${item.id}?stage=Design`}
              className="bg-white rounded-card border border-border-subtle shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-btn flex items-center justify-center shrink-0 text-dq-orange" style={{ background: '#FFF5F2' }}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary leading-tight">{item.title}</h3>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">{item.domain}</p>
                </div>
              </div>

              {/* Template */}
              <div className="mb-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <LayoutTemplate size={12} className="text-text-muted" strokeWidth={1.5} />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Template</p>
                </div>
                <p className="text-[11px] text-text-secondary truncate">Approver: {item.approver}</p>
                <p className="text-[11px] text-text-muted">SLA: {item.sla}</p>
              </div>

              {/* Evidence */}
              <div className="mb-3 pt-3 border-t border-border-subtle">
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle2 size={12} className="text-text-muted" strokeWidth={1.5} />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Evidence ({item.evidence.length})</p>
                </div>
                <p className="text-[11px] text-text-secondary leading-snug">{item.evidence.join(' · ')}</p>
              </div>

              {/* Workflow */}
              {workflow && (
                <div className="mb-3 pt-3 border-t border-border-subtle">
                  <div className="flex items-center gap-1.5 mb-1">
                    <GitMerge size={12} className="text-text-muted" strokeWidth={1.5} />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Workflow</p>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-snug truncate">{workflow.title}</p>
                  <p className="text-[11px] text-text-muted flex items-center gap-1 mt-0.5">
                    <Clock size={10} strokeWidth={1.5} /> {workflow.duration}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="mt-auto pt-3 border-t border-border-subtle flex items-center justify-between">
                <span className="text-xs font-semibold text-dq-orange">Plan</span>
                <ArrowRight size={12} strokeWidth={2} className="text-dq-orange" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
