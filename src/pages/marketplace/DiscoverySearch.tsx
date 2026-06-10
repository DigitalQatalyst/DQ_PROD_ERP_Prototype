import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, FileText, Building, FolderOpen, BookOpen, ArrowRight } from 'lucide-react'
import { vendors as vendorFixtures, projects as projectFixtures } from '../../data/fixtures'

type ResultCategory = 'All' | 'Templates' | 'Vendors' | 'Projects' | 'Policies'

interface Result {
  id: string
  title: string
  subtitle: string
  category: 'Templates' | 'Vendors' | 'Projects' | 'Policies'
  route: string
}

const vendors: Result[] = vendorFixtures.map((v) => ({
  id: v.id,
  title: `${v.id} · ${v.name}`,
  subtitle: `${v.category} · ${v.annualValue} · BC: ${v.bcSync}`,
  category: 'Vendors' as const,
  route: '/vendor-directory',
}))

const projects: Result[] = projectFixtures.map((p) => ({
  id: p.id,
  title: `${p.id} · ${p.name}`,
  subtitle: `${p.status} · Owner: ${p.owner} · Budget AED ${p.budget.toLocaleString()}`,
  category: 'Projects' as const,
  route: '/project-register',
}))

const requestTemplates: Result[] = [
  { id: 'T-EXP', title: 'Expense / Reimbursement template', subtitle: 'Finance · 2-day SLA · Approver: Finance Control Owner', category: 'Templates', route: '/marketplace/finance' },
  { id: 'T-INV', title: 'Invoice / Payment template', subtitle: 'Finance · 3-day SLA · BC sync on approval', category: 'Templates', route: '/marketplace/finance' },
  { id: 'T-PUR', title: 'Purchase Request template', subtitle: 'Procurement · 3-day SLA · Project link required', category: 'Templates', route: '/marketplace/procurement' },
  { id: 'T-VND', title: 'Vendor Onboarding template', subtitle: 'Procurement · 5-day SLA · BC vendor record created', category: 'Templates', route: '/marketplace/procurement' },
  { id: 'T-BUD', title: 'Budget Amendment template', subtitle: 'Finance · 5-day SLA · Executive approval', category: 'Templates', route: '/marketplace/finance' },
  { id: 'T-MDC', title: 'Master Data Change template', subtitle: 'Master Data · 2–3 day SLA · Steward review', category: 'Templates', route: '/marketplace/master-data' },
]

const policies: Result[] = [
  { id: 'P-EXP', title: 'Expense policy — UAE entities', subtitle: 'Per-diem rates, receipt requirements, reimbursement limits', category: 'Policies', route: '/orientation' },
  { id: 'P-PROC', title: 'Procurement policy', subtitle: 'Quote thresholds, vendor onboarding requirements, PO routing', category: 'Policies', route: '/orientation' },
  { id: 'P-TAX', title: 'UAE VAT / e-invoicing readiness checklist', subtitle: 'Invoice fields, vendor tax details, audit evidence', category: 'Policies', route: '/orientation' },
  { id: 'P-APP', title: 'Approval threshold policy', subtitle: 'Authority by amount, entity, category, project', category: 'Policies', route: '/orientation' },
]

const iconByCategory = {
  Templates: <FileText size={16} strokeWidth={1.5} />,
  Vendors: <Building size={16} strokeWidth={1.5} />,
  Projects: <FolderOpen size={16} strokeWidth={1.5} />,
  Policies: <BookOpen size={16} strokeWidth={1.5} />,
}

export default function DiscoverySearch() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ResultCategory>('All')

  const allResults: Result[] = useMemo(() => [
    ...requestTemplates,
    ...vendors,
    ...projects,
    ...policies,
  ], [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allResults.filter((r) => {
      if (category !== 'All' && r.category !== category) return false
      if (!q) return true
      return r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q)
    })
  }, [allResults, query, category])

  const grouped = useMemo(() => {
    const groups: Record<string, Result[]> = {}
    filtered.forEach((r) => {
      if (!groups[r.category]) groups[r.category] = []
      groups[r.category].push(r)
    })
    return groups
  }, [filtered])

  const categories: ResultCategory[] = ['All', 'Templates', 'Vendors', 'Projects', 'Policies']

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2"
          style={{ letterSpacing: '0.12em' }}
        >
          Marketplace · Discovery Search
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Discovery Search</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Search across request templates, vendors, projects, and policy guides — results are filtered by your permissions.
        </p>
      </div>

      {/* Search input */}
      <div className="relative mb-4">
        <Search
          size={18}
          strokeWidth={1.5}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-icon-muted"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search request templates, vendors, projects, policies…"
          className="w-full h-12 pl-12 pr-4 text-sm bg-white border border-border-default rounded-input text-text-primary placeholder-text-muted focus:outline-none focus:border-dq-navy"
        />
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              category === c
                ? 'border-dq-orange text-dq-orange'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            {c}
            {c !== 'All' && (
              <span className="ml-1.5 text-[11px] text-text-muted">
                ({allResults.filter((r) => r.category === c).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 && (
        <p className="text-sm text-text-muted py-12 text-center">
          No results match "{query}".
        </p>
      )}

      <div className="space-y-6">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">
              {cat} · {items.length}
            </p>
            <div className="bg-white rounded-card border border-border-subtle shadow-sm divide-y divide-border-subtle">
              {items.map((r) => (
                <Link
                  key={r.id}
                  to={r.route}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-1 transition-colors"
                >
                  <div className="w-8 h-8 rounded-btn flex items-center justify-center text-dq-orange shrink-0"
                       style={{ background: '#FFF5F2' }}>
                    {iconByCategory[r.category]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{r.title}</p>
                    <p className="text-xs text-text-muted truncate">{r.subtitle}</p>
                  </div>
                  <ArrowRight size={14} className="text-icon-muted shrink-0" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
