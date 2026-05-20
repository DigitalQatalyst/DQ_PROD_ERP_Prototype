import { useState } from 'react'
import { TrendingUp, AlertTriangle, Plus } from 'lucide-react'
import { costCentres, kpis, requests } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import { useToast } from '../components/Toast'

const ccBudgets: Record<string, { allocated: number; spent: number }> = {
  'CC-001': { allocated: 320000, spent: 198000 },
  'CC-002': { allocated: 480000, spent: 291000 },
  'CC-003': { allocated: 560000, spent: 382000 },
  'CC-004': { allocated: 420000, spent: 258000 },
  'CC-005': { allocated: 220000, spent: 111000 },
}

const amendments = requests.filter(r => r.type === 'Budget Amendment')

export default function BudgetCostCentre() {
  const [selected, setSelected] = useState<string | null>(null)
  const { showToast } = useToast()

  const totalAllocated = Object.values(ccBudgets).reduce((s, v) => s + v.allocated, 0)
  const totalSpent = Object.values(ccBudgets).reduce((s, v) => s + v.spent, 0)
  const overallPct = Math.round((totalSpent / totalAllocated) * 100)

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Budget & Cost Centre</h1>
        <button
          onClick={() => showToast('Budget amendment request drafted.', 'info')}
          className="flex items-center gap-2 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={15} strokeWidth={1.5} />
          Budget Amendment
        </button>
      </div>
      <p className="text-sm text-text-muted mb-6">Monitor budget consumption by cost centre, approve amendments, and track YTD spend.</p>

      {/* Overall budget bar */}
      <div className="p-5 bg-white rounded-card border border-border-subtle shadow-sm mb-6">
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">DigitalQatalyst MENA — FY 2026 Overall Budget</p>
            <p className="text-2xl font-bold font-mono text-text-primary">AED {totalSpent.toLocaleString()} <span className="text-base font-normal text-text-muted">/ AED {totalAllocated.toLocaleString()}</span></p>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold font-mono ${overallPct > 75 ? 'text-status-error' : overallPct > 50 ? 'text-status-warning' : 'text-status-success'}`}>{overallPct}%</p>
            <p className="text-xs text-text-muted">consumed YTD</p>
          </div>
        </div>
        <div className="w-full h-3 bg-border-subtle rounded-full overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all ${overallPct > 75 ? 'bg-status-error' : overallPct > 50 ? 'bg-status-warning' : 'bg-status-success'}`}
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs text-text-muted">Remaining: <span className="font-semibold font-mono text-text-primary">AED {(totalAllocated - totalSpent).toLocaleString()}</span></span>
          <span className="text-xs text-text-muted">1 cost centre over 75%</span>
        </div>
      </div>

      {/* Cost centre breakdown */}
      <div className="space-y-3 mb-8">
        {costCentres.map((cc) => {
          const b = ccBudgets[cc.id]
          const pct = Math.round((b.spent / b.allocated) * 100)
          const isHigh = pct > 75
          const isSelected = selected === cc.id

          return (
            <button
              key={cc.id}
              onClick={() => setSelected(isSelected ? null : cc.id)}
              className={`w-full text-left p-5 bg-white rounded-card border shadow-sm hover:shadow-md transition-all ${isSelected ? 'border-dq-orange' : 'border-border-subtle'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-text-muted">{cc.id}</span>
                  <span className="text-sm font-semibold text-text-primary">{cc.name}</span>
                  {isHigh && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-status-error-text bg-status-error-surface rounded-pill px-1.5 py-0.5">
                      <AlertTriangle size={9} strokeWidth={2} />
                      HIGH
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold font-mono ${isHigh ? 'text-status-error' : 'text-text-primary'}`}>{pct}%</span>
                  <span className="text-xs text-text-muted ml-2">used</span>
                </div>
              </div>
              <div className="w-full h-2 bg-border-subtle rounded-full overflow-hidden mb-2">
                <div
                  className={`h-2 rounded-full ${isHigh ? 'bg-status-error' : pct > 50 ? 'bg-status-warning' : 'bg-status-success'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>Spent: <span className="font-mono font-semibold text-text-primary">AED {b.spent.toLocaleString()}</span></span>
                <span>Allocated: <span className="font-mono font-semibold text-text-primary">AED {b.allocated.toLocaleString()}</span></span>
                <span>Remaining: <span className="font-mono font-semibold text-text-primary">AED {(b.allocated - b.spent).toLocaleString()}</span></span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Budget amendments */}
      {amendments.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <TrendingUp size={15} className="text-dq-orange" strokeWidth={1.5} />
            Budget Amendment Requests
          </p>
          <div className="space-y-2">
            {amendments.map((r) => (
              <div key={r.id} className="flex items-center gap-4 p-4 bg-white rounded-card border border-status-warning/30 shadow-sm">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <RequestIDTag id={r.id} />
                    <StatusBadge status={r.status as any} size="sm" />
                  </div>
                  <p className="text-sm font-medium text-text-primary">{r.description}</p>
                  <p className="text-xs text-text-muted">Submitted by {r.requester} · {r.submittedDate}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-bold font-mono text-text-primary">AED {r.amount.toLocaleString()}</p>
                  <p className="text-xs text-text-muted">Amendment amount</p>
                </div>
                <button
                  onClick={() => showToast(`Amendment ${r.id} opened for review.`, 'info')}
                  className="px-3 py-1.5 text-xs font-semibold rounded-btn bg-dq-navy text-white hover:opacity-90 transition-opacity shrink-0"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
