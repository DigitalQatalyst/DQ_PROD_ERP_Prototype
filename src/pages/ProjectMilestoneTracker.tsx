import { useState, useMemo } from 'react'
import { CheckCircle2, Clock, AlertTriangle, Circle, AlertOctagon } from 'lucide-react'
import { milestones, projects } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import type { MilestoneStatus } from '../types'

type FilterType = 'All' | MilestoneStatus

const statusIcon: Record<MilestoneStatus, { icon: React.ReactNode; bg: string; text: string }> = {
  Complete: { icon: <CheckCircle2 size={14} strokeWidth={2} />, bg: '#DCFCE7', text: '#15803D' },
  'In Progress': { icon: <Clock size={14} strokeWidth={2} />, bg: '#DBEAFE', text: '#1D4ED8' },
  'Not Started': { icon: <Circle size={14} strokeWidth={2} />, bg: '#EEEFF6', text: '#5F607F' },
  Overdue: { icon: <AlertOctagon size={14} strokeWidth={2} />, bg: '#FEE2E2', text: '#B91C1C' },
  Delayed: { icon: <AlertTriangle size={14} strokeWidth={2} />, bg: '#FEF3C7', text: '#B45309' },
}

function StatusChip({ status }: { status: MilestoneStatus }) {
  const s = statusIcon[status]
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill text-[11px] font-semibold"
      style={{ background: s.bg, color: s.text }}
    >
      {s.icon}
      {status}
    </span>
  )
}

export default function ProjectMilestoneTracker() {
  const [filter, setFilter] = useState<FilterType>('All')

  const filters: FilterType[] = ['All', 'In Progress', 'Not Started', 'Complete', 'Overdue', 'Delayed']

  const filtered = useMemo(
    () => milestones.filter((m) => filter === 'All' || m.status === filter),
    [filter]
  )

  // Summary counts
  const counts = useMemo(() => {
    const c: Record<string, number> = { Complete: 0, 'In Progress': 0, 'Not Started': 0, Overdue: 0, Delayed: 0 }
    milestones.forEach((m) => { c[m.status] = (c[m.status] || 0) + 1 })
    return c
  }, [])

  const byProject = useMemo(() => {
    const map: Record<string, typeof milestones> = {}
    filtered.forEach((m) => {
      if (!map[m.projectId]) map[m.projectId] = []
      map[m.projectId].push(m)
    })
    return map
  }, [filtered])

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Project Milestone Tracker</h1>
      <p className="text-sm text-text-muted mb-6">
        Visibility across all active project milestones — status, owner, due date, and completion. Available to every internal segment.
      </p>

      {/* Summary chips */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 bg-status-success-surface rounded-pill">
          <span className="text-sm font-semibold text-status-success-text">{counts['Complete']}</span>
          <span className="text-xs text-text-muted">Complete</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-status-info-surface rounded-pill">
          <span className="text-sm font-semibold text-status-info-text">{counts['In Progress']}</span>
          <span className="text-xs text-text-muted">In Progress</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-surface-1 rounded-pill">
          <span className="text-sm font-semibold text-text-secondary">{counts['Not Started']}</span>
          <span className="text-xs text-text-muted">Not Started</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-status-error-surface rounded-pill">
          <span className="text-sm font-semibold text-status-error-text">{counts['Overdue']}</span>
          <span className="text-xs text-text-muted">Overdue</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-status-warning-surface rounded-pill">
          <span className="text-sm font-semibold text-status-warning-text">{counts['Delayed']}</span>
          <span className="text-xs text-text-muted">Delayed</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-4 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              filter === f
                ? 'border-dq-orange text-dq-orange'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grouped by project */}
      <div className="space-y-6">
        {Object.entries(byProject).map(([projectId, items]) => {
          const project = projects.find((p) => p.id === projectId)
          if (!project) return null
          return (
            <div key={projectId}>
              <div className="flex items-baseline gap-2 mb-2">
                <RequestIDTag id={projectId} />
                <h3 className="text-sm font-semibold text-text-primary">{project.name}</h3>
                <span className="text-xs text-text-muted">· Owner: {project.owner}</span>
              </div>
              <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-1 border-b border-border-subtle">
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Milestone</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Owner</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Due</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider w-[180px]">Completion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((m, i) => (
                      <tr
                        key={m.id}
                        className={`border-b border-border-subtle ${i === items.length - 1 ? 'border-b-0' : ''}`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <RequestIDTag id={m.id} />
                            <span className="text-text-primary">{m.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-text-secondary text-xs">{m.owner}</td>
                        <td className="px-4 py-3 text-text-muted text-xs">{m.dueDate}</td>
                        <td className="px-4 py-3"><StatusChip status={m.status} /></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-pill overflow-hidden" style={{ background: '#EEEFF6' }}>
                              <div
                                className="h-full rounded-pill"
                                style={{
                                  width: `${m.completionPct}%`,
                                  background: m.completionPct === 100 ? '#16A34A' : '#FB5535',
                                }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-text-secondary font-mono w-9 text-right">{m.completionPct}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-text-muted py-12 text-center">No milestones match this filter.</p>
      )}
    </div>
  )
}
