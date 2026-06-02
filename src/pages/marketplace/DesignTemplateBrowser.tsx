import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { marketplaceItems, domains, type RequestDomain } from '../../data/marketplaceItems'

type Filter = 'All' | RequestDomain

export default function DesignTemplateBrowser() {
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')

  const filters: Filter[] = ['All', ...domains]

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
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
          S01 Marketplace · Design
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Request Template Browser</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Browse every request template — preview required evidence, approver path, and SLA without committing to submit. When you’re ready, hop over to{' '}
          <span className="text-dq-orange font-medium">Deploy</span> to actually raise the request.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-icon-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search templates…"
          className="w-full h-11 pl-11 pr-4 text-sm bg-white border border-border-default rounded-input text-text-primary placeholder-text-muted focus:outline-none focus:border-dq-navy"
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
          </button>
        ))}
      </div>

      {/* Template rows */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        {filtered.map((item, i) => (
          <div
            key={item.id}
            className={`flex items-start gap-4 px-5 py-4 ${i < filtered.length - 1 ? 'border-b border-border-subtle' : ''}`}
          >
            <div className="w-10 h-10 rounded-btn flex items-center justify-center shrink-0 text-dq-orange"
                 style={{ background: '#FFF5F2' }}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm font-semibold text-text-primary">{item.title}</h3>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">{item.domain}</span>
                </div>
                <Link
                  to={`/marketplace/journey/${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-dq-orange hover:underline shrink-0"
                >
                  View 4D journey <ArrowRight size={11} strokeWidth={2} />
                </Link>
              </div>
              <p className="text-xs text-text-muted mb-3 leading-relaxed">{item.description}</p>
              <div className="grid grid-cols-3 gap-4 text-[11px]">
                <div>
                  <p className="text-text-muted uppercase tracking-wider font-semibold mb-0.5">Approver</p>
                  <p className="text-text-secondary">{item.approver}</p>
                </div>
                <div>
                  <p className="text-text-muted uppercase tracking-wider font-semibold mb-0.5">SLA</p>
                  <p className="text-text-secondary">{item.sla}</p>
                </div>
                <div>
                  <p className="text-text-muted uppercase tracking-wider font-semibold mb-0.5">Evidence required</p>
                  <p className="text-text-secondary">{item.evidence.join(' · ')}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-text-muted">No templates match.</div>
        )}
      </div>
    </div>
  )
}
