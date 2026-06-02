import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { marketplaceItems, domains, type RequestDomain } from '../../data/marketplaceItems'

type Filter = 'All' | RequestDomain

export default function DeployMarketplace() {
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')

  const filters: Filter[] = ['All', ...domains]

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: marketplaceItems.length }
    domains.forEach((d) => { c[d] = marketplaceItems.filter((i) => i.domain === d).length })
    return c
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return marketplaceItems.filter((i) => {
      if (filter !== 'All' && i.domain !== filter) return false
      if (!q) return true
      return i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
    })
  }, [filter, query])

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
          S01 Marketplace · Deploy
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Deploy — Submit & activate work</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Start or activate work by submitting requests, launching workflows, and triggering approvals. Every request type DQ supports — finance, procurement, project, admin, master data, integration — is in one place.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-icon-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search request types — try 'invoice', 'vendor', 'milestone'…"
          className="w-full h-12 pl-12 pr-4 text-sm bg-white border border-border-default rounded-input text-text-primary placeholder-text-muted focus:outline-none focus:border-dq-navy"
        />
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
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
            <span className={`ml-1.5 text-[10px] ${filter === f ? 'text-white/70' : 'text-text-muted'}`}>
              {counts[f] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-text-muted py-12 text-center">No request types match "{query}".</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-card border border-border-subtle shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-btn flex items-center justify-center shrink-0 text-dq-orange"
                  style={{ background: '#FFF5F2' }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary leading-tight mb-1">{item.title}</h3>
                  <p className="text-xs text-text-muted leading-snug line-clamp-3">{item.description}</p>
                </div>
              </div>

              <div className="space-y-1 text-[11px] mt-2 pt-2 border-t border-border-subtle flex-1">
                <div className="flex justify-between gap-2">
                  <span className="text-text-muted">Domain</span>
                  <span className="text-text-secondary font-medium">{item.domain}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-text-muted">SLA</span>
                  <span className="text-text-secondary font-medium">{item.sla}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-text-muted">Evidence</span>
                  <span className="text-text-secondary font-medium">{item.evidence.length} items</span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  to={`/marketplace/journey/${item.id}`}
                  className="inline-flex items-center justify-center gap-1 py-2 rounded-btn border border-border-default text-text-primary text-xs font-semibold hover:bg-surface-1 transition-colors"
                >
                  View 4D journey
                </Link>
                <Link
                  to={item.ctaRoute ?? '/request-intake'}
                  className="inline-flex items-center justify-center gap-1.5 py-2 rounded-btn bg-dq-orange text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Start <ArrowRight size={12} strokeWidth={2} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
