import { useState } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import { projects, requests } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import { useToast } from '../components/Toast'

const projectFinancials: Record<string, {
  committed: number
  actuals: number
  billed: number
  variance: number
  forecastCompletion: string
  billingStatus: string
}> = {
  'PRJ-2401': { committed: 280000, actuals: 187000, billed: 160000, variance: 0, forecastCompletion: 'Aug 2026', billingStatus: 'On Track' },
  'PRJ-2402': { committed: 95000, actuals: 52000, billed: 40000, variance: 0, forecastCompletion: 'Jun 2026', billingStatus: 'On Track' },
  'PRJ-2403': { committed: 450000, actuals: 495000, billed: 420000, variance: 45000, forecastCompletion: 'Jul 2026', billingStatus: 'Overrun' },
  'PRJ-2404': { committed: 160000, actuals: 18000, billed: 0, variance: 0, forecastCompletion: 'Dec 2026', billingStatus: 'Planning' },
  'PRJ-2405': { committed: 75000, actuals: 41000, billed: 35000, variance: 0, forecastCompletion: 'Sep 2026', billingStatus: 'On Track' },
}

export default function ProjectEconomicsWorkspace() {
  const [selected, setSelected] = useState<string>(projects[0].id)
  const { showToast } = useToast()

  const activeProject = projects.find(p => p.id === selected)!
  const fin = projectFinancials[selected]
  const linkedReqs = requests.filter(r => r.linkedProject === selected)

  const utilizationPct = Math.round((fin.actuals / fin.committed) * 100)
  const billingPct = Math.round((fin.billed / Math.max(fin.actuals, 1)) * 100)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Project Economics Workspace</h1>
      <p className="text-sm text-text-muted mb-6">Project-level P&L view including committed costs, actuals, variances, and billing status.</p>

      {/* Project selector */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {projects.map((p) => {
          const f = projectFinancials[p.id]
          const hasOverrun = f.variance > 0
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-btn border text-sm font-medium transition-all ${
                selected === p.id
                  ? 'border-dq-orange bg-orange-50 text-dq-orange'
                  : 'border-border-subtle bg-white text-text-secondary hover:bg-surface-1'
              }`}
            >
              {hasOverrun && <AlertTriangle size={12} className="text-status-error" strokeWidth={1.5} />}
              <span className="font-mono text-xs">{p.id}</span>
              <span className="hidden sm:inline">{p.name}</span>
            </button>
          )
        })}
      </div>

      {/* Active project detail */}
      <div className="p-5 bg-white rounded-card border border-border-subtle shadow-sm mb-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-text-muted">{activeProject.id}</span>
              <span className={`text-[10px] font-semibold rounded-pill px-1.5 py-0.5 ${activeProject.status === 'Active' ? 'bg-status-success-surface text-status-success-text' : 'bg-status-info-surface text-status-info-text'}`}>{activeProject.status}</span>
              {fin.variance > 0 && (
                <span className="text-[10px] font-semibold text-status-error-text bg-status-error-surface rounded-pill px-1.5 py-0.5">OVER BUDGET</span>
              )}
            </div>
            <h2 className="text-lg font-bold text-text-primary">{activeProject.name}</h2>
            <p className="text-xs text-text-muted">Owner: {activeProject.owner} · Forecast completion: {fin.forecastCompletion}</p>
          </div>
          <span className={`text-sm font-semibold px-3 py-1 rounded-pill ${fin.billingStatus === 'On Track' ? 'bg-status-success-surface text-status-success-text' : fin.billingStatus === 'Overrun' ? 'bg-status-error-surface text-status-error-text' : 'bg-status-info-surface text-status-info-text'}`}>
            {fin.billingStatus}
          </span>
        </div>

        {/* Financial metrics */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          <div>
            <p className="text-xs text-text-muted mb-0.5">Budget Committed</p>
            <p className="text-lg font-bold font-mono text-text-primary">AED {fin.committed.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-0.5">Actuals to Date</p>
            <p className={`text-lg font-bold font-mono ${fin.actuals > fin.committed ? 'text-status-error' : 'text-text-primary'}`}>AED {fin.actuals.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-0.5">Billed to Client</p>
            <p className="text-lg font-bold font-mono text-text-primary">AED {fin.billed.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-0.5">Variance</p>
            <p className={`text-lg font-bold font-mono ${fin.variance > 0 ? 'text-status-error' : 'text-status-success'}`}>
              {fin.variance > 0 ? `+AED ${fin.variance.toLocaleString()}` : 'On track'}
            </p>
          </div>
        </div>

        {/* Budget bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-text-muted mb-1">
            <span>Budget utilisation</span>
            <span className={`font-bold font-mono ${utilizationPct > 100 ? 'text-status-error' : utilizationPct > 80 ? 'text-status-warning' : 'text-status-success'}`}>{utilizationPct}%</span>
          </div>
          <div className="w-full h-3 bg-border-subtle rounded-full overflow-hidden">
            <div
              className={`h-3 rounded-full ${utilizationPct > 100 ? 'bg-status-error' : utilizationPct > 80 ? 'bg-status-warning' : 'bg-status-success'}`}
              style={{ width: `${Math.min(utilizationPct, 100)}%` }}
            />
          </div>
        </div>

        {fin.variance > 0 && (
          <div className="flex items-center justify-between p-3 bg-status-error-surface rounded-card">
            <p className="text-xs font-semibold text-status-error-text flex items-center gap-1">
              <AlertTriangle size={12} strokeWidth={1.5} />
              Budget amendment request REQ-2025-0048 (AED {fin.variance.toLocaleString()}) is in Draft.
            </p>
            <button
              onClick={() => showToast('Budget amendment review opened.', 'info')}
              className="px-3 py-1 text-xs font-semibold rounded-btn bg-dq-orange text-white hover:opacity-90"
            >
              Review
            </button>
          </div>
        )}
      </div>

      {/* Linked requests */}
      {linkedReqs.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-text-primary mb-3">Linked Finance Requests</p>
          <div className="space-y-2">
            {linkedReqs.map((r) => (
              <div key={r.id} className="flex items-center gap-4 p-4 bg-white rounded-card border border-border-subtle shadow-sm">
                <RequestIDTag id={r.id} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{r.description}</p>
                  <p className="text-xs text-text-muted">Submitted by {r.requester} · {r.submittedDate}</p>
                </div>
                <p className="font-mono text-sm font-semibold text-text-primary">{r.currency} {r.amount.toLocaleString()}</p>
                <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${r.status === 'Approved' ? 'bg-status-success-surface text-status-success-text' : r.status === 'Draft' ? 'bg-surface-1 text-text-muted border border-border-subtle' : 'bg-status-warning-surface text-status-warning-text'}`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
