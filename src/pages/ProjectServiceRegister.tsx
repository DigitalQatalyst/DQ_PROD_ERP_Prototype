import { useState } from 'react'
import { Folder, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { projects, requests } from '../data/fixtures'
import { useToast } from '../components/Toast'

type Filter = 'All' | 'Active' | 'Planning'

const projectSpend: Record<string, number> = {
  'PRJ-2401': 187000,
  'PRJ-2402': 52000,
  'PRJ-2403': 495000,
  'PRJ-2404': 18000,
  'PRJ-2405': 41000,
}

export default function ProjectServiceRegister() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? projects : projects.filter(p => p.status === filter)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Project / Service Register</h1>
      <p className="text-sm text-text-muted mb-6">Complete register of active and planned projects with budget, owner, and linked request data.</p>

      {/* Summary */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <span className="text-sm font-semibold text-status-success-text">{projects.filter(p => p.status === 'Active').length}</span>
          <span className="text-xs text-text-muted">Active</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-info-surface rounded-pill">
          <span className="text-sm font-semibold text-status-info-text">{projects.filter(p => p.status === 'Planning').length}</span>
          <span className="text-xs text-text-muted">Planning</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-error-surface rounded-pill">
          <AlertTriangle size={13} className="text-status-error" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-error-text">1</span>
          <span className="text-xs text-text-muted">Over Budget</span>
        </div>
        <div className="flex-1" />
        <div className="text-right">
          <p className="text-xs text-text-muted">Total Budget (All Projects)</p>
          <p className="text-lg font-bold font-mono text-text-primary">
            AED {projects.reduce((s, p) => s + p.budget, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Active', 'Planning'] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <div className="space-y-3">
        {filtered.map((p) => {
          const spent = projectSpend[p.id] || 0
          const pct = Math.round((spent / p.budget) * 100)
          const isOverBudget = spent > p.budget
          const linkedReqs = requests.filter(r => r.linkedProject === p.id)

          return (
            <div
              key={p.id}
              className={`p-5 bg-white rounded-card border shadow-sm hover:shadow-md transition-shadow ${isOverBudget ? 'border-status-error/30' : 'border-border-subtle'}`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-navy-50 flex items-center justify-center shrink-0">
                    <Folder size={16} className="text-dq-navy" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono font-semibold text-text-muted">{p.id}</span>
                      <span className={`text-[10px] font-semibold rounded-pill px-1.5 py-0.5 ${p.status === 'Active' ? 'bg-status-success-surface text-status-success-text' : 'bg-status-info-surface text-status-info-text'}`}>{p.status}</span>
                      {isOverBudget && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-status-error-text bg-status-error-surface rounded-pill px-1.5 py-0.5">
                          <AlertTriangle size={9} strokeWidth={2} />
                          OVER BUDGET
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-text-primary">{p.name}</p>
                    <p className="text-xs text-text-muted">Owner: {p.owner}</p>
                  </div>
                </div>
                <button
                  onClick={() => showToast(`Project ${p.id} economics opened.`, 'info')}
                  className="px-3 py-1.5 text-xs font-semibold rounded-btn border border-dq-navy text-dq-navy hover:bg-navy-50 transition-colors shrink-0"
                >
                  View Economics
                </button>
              </div>

              {/* Budget bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                  <span>Budget Consumed: <span className="font-mono font-semibold text-text-primary">{p.currency} {spent.toLocaleString()}</span></span>
                  <span className={`font-bold font-mono ${isOverBudget ? 'text-status-error' : pct > 75 ? 'text-status-warning' : 'text-status-success'}`}>{pct}%</span>
                </div>
                <div className="w-full h-2 bg-border-subtle rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${isOverBudget ? 'bg-status-error' : pct > 75 ? 'bg-status-warning' : 'bg-status-success'}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted mt-1">
                  <span>Total Budget: <span className="font-mono">{p.currency} {p.budget.toLocaleString()}</span></span>
                  {isOverBudget ? (
                    <span className="text-status-error-text font-semibold">Overage: {p.currency} {(spent - p.budget).toLocaleString()}</span>
                  ) : (
                    <span>Remaining: {p.currency} {(p.budget - spent).toLocaleString()}</span>
                  )}
                </div>
              </div>

              {linkedReqs.length > 0 && (
                <p className="text-xs text-text-muted mt-2">{linkedReqs.length} linked request(s)</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
