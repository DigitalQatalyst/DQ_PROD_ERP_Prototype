import { useState } from 'react'
import { CheckCircle2, Circle, UserPlus, UserMinus } from 'lucide-react'
import { transitions, employees } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'
import type { TransitionType } from '../../types'

type Filter = 'All' | TransitionType

export default function OnboardingOffboardingTracker() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = transitions.filter((t) => filter === 'All' || t.type === filter)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Onboarding / Offboarding Tracker</h1>
      <p className="text-sm text-text-muted mb-6">
        Active employee transitions — joiners and leavers with full task checklist, owners, and clearance state.
      </p>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Onboarding', 'Offboarding'] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((t) => {
          const emp = employees.find((e) => e.id === t.employeeId)
          const done = t.tasks.filter((x) => x.done).length
          const total = t.tasks.length
          const pct = (done / total) * 100
          const Icon = t.type === 'Onboarding' ? UserPlus : UserMinus

          return (
            <div key={t.id} className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-border-subtle flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-btn flex items-center justify-center shrink-0 ${t.type === 'Onboarding' ? 'bg-status-info-surface text-status-info-text' : 'bg-status-warning-surface text-status-warning-text'}`}>
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <RequestIDTag id={t.id} />
                      <span className="text-[11px] font-semibold uppercase text-text-muted">{t.type}</span>
                    </div>
                    <h3 className="text-base font-semibold text-text-primary">{emp?.name}</h3>
                    <p className="text-xs text-text-muted">{emp?.role} · {emp?.entity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-text-muted uppercase tracking-wider">Started · Target</p>
                  <p className="text-xs text-text-secondary">{t.startedDate} → {t.targetDate}</p>
                  <div className="mt-2 flex items-center gap-2 justify-end">
                    <span className="text-sm font-bold text-dq-orange">{done}/{total}</span>
                    <span className={`px-2 py-0.5 rounded-pill text-[10px] font-semibold ${t.status === 'Complete' ? 'bg-status-success-surface text-status-success-text' : t.status === 'Blocked' ? 'bg-status-error-surface text-status-error-text' : 'bg-status-info-surface text-status-info-text'}`}>
                      {t.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-5 pt-3 pb-2">
                <div className="h-1.5 rounded-pill overflow-hidden" style={{ background: '#EEEFF6' }}>
                  <div className="h-full rounded-pill" style={{ width: `${pct}%`, background: pct === 100 ? '#16A34A' : '#FB5535' }} />
                </div>
              </div>

              {/* Tasks */}
              <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-2">
                {t.tasks.map((task, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    {task.done
                      ? <CheckCircle2 size={16} className="text-status-success-text mt-0.5 shrink-0" strokeWidth={2} />
                      : <Circle size={16} className="text-icon-muted mt-0.5 shrink-0" strokeWidth={1.5} />
                    }
                    <div className="min-w-0">
                      <p className={`${task.done ? 'text-text-muted line-through' : 'text-text-primary'}`}>{task.label}</p>
                      <p className="text-xs text-text-muted">{task.owner}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
