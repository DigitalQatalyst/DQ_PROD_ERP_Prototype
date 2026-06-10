import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Sparkles, BookOpen, Scale, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { marketplaceItems, domains, type RequestDomain } from '../../data/marketplaceItems'
import { policyMap, policies } from '../../data/journeyContent'

interface DiscernCard {
  title: string
  description: string
  icon: ReactNode
  route: string
}

const tools: DiscernCard[] = [
  { title: 'Discovery Search', description: 'Search across request templates, vendors, projects, and policies — filtered by your permissions.', icon: <Search size={20} strokeWidth={1.5} />, route: '/marketplace/search' },
  { title: 'Guided Request Assistant', description: 'Tell us what you need — we’ll recommend the right request type, approver, and evidence.', icon: <Sparkles size={20} strokeWidth={1.5} />, route: '/marketplace/discern/assistant' },
  { title: 'Policy Library', description: 'Expense, procurement, tax, travel, and data sovereignty policies that govern DQ operations.', icon: <BookOpen size={20} strokeWidth={1.5} />, route: '/marketplace/discern/policies' },
  { title: 'Threshold & Approval Reference', description: 'Who approves what — by amount, category, entity, and request type.', icon: <Scale size={20} strokeWidth={1.5} />, route: '/marketplace/discern/thresholds' },
]

type Filter = 'All' | RequestDomain

export default function DiscernMarketplace() {
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
        <h1 className="text-2xl font-bold text-text-primary mb-2">Discern — Understand before acting</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Clarify the need, find the right path, and check what policy or threshold applies — before you submit anything. Decision support, search, and reference resources.
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
          Discover by Request Type
        </p>
        <p className="text-[11px] text-text-muted">{filtered.length} of {marketplaceItems.length} request types</p>
      </div>

      {/* Domain filter chips */}
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
          const linkedPolicies = (policyMap[item.id] ?? []).map((id) => policies[id]).filter(Boolean)
          const primaryRule = linkedPolicies[0]?.keyRule

          return (
            <Link
              key={item.id}
              to={`/marketplace/journey/${item.id}?stage=Discern`}
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

              {/* Policies */}
              <div className="mb-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <BookOpen size={12} className="text-text-muted" strokeWidth={1.5} />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Policies that apply</p>
                </div>
                {linkedPolicies.length > 0 ? (
                  <ul className="space-y-0.5">
                    {linkedPolicies.map((p, i) => (
                      <li key={i} className="text-xs text-text-secondary truncate">• {p.title}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-text-muted italic">No specific policy mapped</p>
                )}
              </div>

              {/* Threshold */}
              <div className="mb-3 pt-3 border-t border-border-subtle">
                <div className="flex items-center gap-1.5 mb-1">
                  <Scale size={12} className="text-text-muted" strokeWidth={1.5} />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Threshold</p>
                </div>
                <p className="text-xs text-text-secondary leading-snug">{item.approver}</p>
                <p className="text-[11px] text-text-muted mt-0.5">SLA: {item.sla}</p>
              </div>

              {/* Key rule */}
              {primaryRule && (
                <p className="text-[11px] italic text-text-secondary mb-3 leading-snug">
                  <span className="font-semibold not-italic">Key rule:</span> {primaryRule}
                </p>
              )}

              {/* CTA */}
              <div className="mt-auto pt-3 border-t border-border-subtle flex items-center justify-between">
                <span className="text-xs font-semibold text-dq-orange">Understand</span>
                <ArrowRight size={12} strokeWidth={2} className="text-dq-orange" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
