import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { projects, kpis } from '../data/fixtures'

const projectFinancials: Record<string, { committed: number; actuals: number; billed: number }> = {
  'PRJ-2401': { committed: 280000, actuals: 187000, billed: 160000 },
  'PRJ-2402': { committed: 95000, actuals: 52000, billed: 40000 },
  'PRJ-2403': { committed: 450000, actuals: 495000, billed: 420000 },
  'PRJ-2404': { committed: 160000, actuals: 18000, billed: 0 },
  'PRJ-2405': { committed: 75000, actuals: 41000, billed: 35000 },
}

const healthColor = (pct: number) => {
  if (pct > 100) return 'text-status-error'
  if (pct > 85) return 'text-status-warning'
  return 'text-status-success'
}

const healthBg = (pct: number) => {
  if (pct > 100) return 'bg-status-error'
  if (pct > 85) return 'bg-status-warning'
  return 'bg-status-success'
}

export default function ProjectInsights() {
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0)
  const totalActuals = Object.values(projectFinancials).reduce((s, f) => s + f.actuals, 0)
  const totalBilled = Object.values(projectFinancials).reduce((s, f) => s + f.billed, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Project / Service Insights</h1>
      <p className="text-sm text-text-muted mb-6">Project economics analytics covering budget variance, delivery velocity, and billing pipeline.</p>

      {/* Portfolio summary */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Active Projects</p>
          <p className="text-xl font-bold font-mono text-text-primary">{kpis.activeProjects}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Projects with Overruns</p>
          <p className="text-xl font-bold font-mono text-status-error">{kpis.projectsWithOverruns}</p>
          <p className="text-xs text-text-muted mt-1">PRJ-2403: AED 45K overage</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Actuals vs Budget</p>
          <p className="text-xl font-bold font-mono text-text-primary">{Math.round((totalActuals / totalBudget) * 100)}%</p>
          <p className="text-xs text-text-muted mt-1">AED {(totalActuals / 1000).toFixed(0)}K / AED {(totalBudget / 1000).toFixed(0)}K</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Billing Pipeline</p>
          <p className="text-xl font-bold font-mono text-text-primary">AED {(totalBilled / 1000).toFixed(0)}K</p>
          <p className="text-xs text-status-success-text mt-1 flex items-center gap-1"><CheckCircle size={11} strokeWidth={1.5} /> billed to date</p>
        </div>
      </div>

      {/* Project budget health */}
      <p className="text-sm font-semibold text-text-primary mb-3">Project Budget Health</p>
      <div className="space-y-3 mb-8">
        {projects.map((p) => {
          const fin = projectFinancials[p.id]
          const pct = Math.round((fin.actuals / fin.committed) * 100)
          const billingPct = fin.committed > 0 ? Math.round((fin.billed / fin.actuals) * 100) : 0
          return (
            <div key={p.id} className={`p-5 bg-white rounded-card border shadow-sm ${pct > 100 ? 'border-status-error/30' : 'border-border-subtle'}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono text-text-muted">{p.id}</span>
                    <span className={`text-[10px] font-semibold rounded-pill px-1.5 py-0.5 ${p.status === 'Active' ? 'bg-status-success-surface text-status-success-text' : 'bg-status-info-surface text-status-info-text'}`}>{p.status}</span>
                    {pct > 100 && <span className="text-[10px] font-semibold text-status-error-text bg-status-error-surface rounded-pill px-1.5 py-0.5 flex items-center gap-0.5"><AlertTriangle size={9} strokeWidth={2} /> OVERRUN</span>}
                  </div>
                  <p className="text-sm font-semibold text-text-primary">{p.name}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold font-mono ${healthColor(pct)}`}>{pct}%</p>
                  <p className="text-xs text-text-muted">budget consumed</p>
                </div>
              </div>
              <div className="w-full h-2 bg-border-subtle rounded-full overflow-hidden mb-2">
                <div className={`h-2 rounded-full ${healthBg(pct)}`} style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              <div className="flex items-center gap-6 text-xs text-text-muted">
                <span>Budget: <span className="font-mono font-semibold text-text-primary">AED {fin.committed.toLocaleString()}</span></span>
                <span>Actuals: <span className={`font-mono font-semibold ${pct > 100 ? 'text-status-error' : 'text-text-primary'}`}>AED {fin.actuals.toLocaleString()}</span></span>
                <span>Billed: <span className="font-mono font-semibold text-text-primary">AED {fin.billed.toLocaleString()}</span></span>
                {fin.billed > 0 && <span>Billing: <span className="font-semibold">{billingPct}% of actuals</span></span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* AI observation */}
      <div className="p-4 bg-navy-50 rounded-card border border-dq-navy/10">
        <p className="text-xs font-semibold text-dq-navy mb-2">AI Observation — 20 May 2026</p>
        <p className="text-sm text-text-secondary leading-relaxed">PRJ-2403 (Client: Noor Retail DXP) is tracking AED 45,000 over its committed budget. The outstanding budget amendment (REQ-2025-0048) has been drafted by Mohammed Rashid but remains in Draft status — pending Executive approval. Phase 3 delivery is committed for 28 May 2026, which creates billing risk if the amendment is not approved before the milestone invoice is raised.</p>
      </div>
    </div>
  )
}
