import { useState } from 'react'
import { hrRequests, leaveRequests, transitions, employees } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'

type Tab = 'All' | 'HR Requests' | 'Leave' | 'Transitions'

export default function HROperationsConsole() {
  const [tab, setTab] = useState<Tab>('All')

  const tabs: Tab[] = ['All', 'HR Requests', 'Leave', 'Transitions']

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">HR Operations Console</h1>
      <p className="text-sm text-text-muted mb-6">
        Practitioner workspace for HR &amp; people operations — requests, leave approvals, and active onboarding / offboarding tasks.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">HR Requests Open</p>
          <p className="text-2xl font-bold text-dq-navy">{hrRequests.filter((r) => r.status !== 'Fulfilled').length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Leave Pending</p>
          <p className="text-2xl font-bold text-dq-orange">{leaveRequests.filter((l) => l.status === 'Pending Approval').length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Active Transitions</p>
          <p className="text-2xl font-bold text-status-info-text">{transitions.filter((t) => t.status === 'In Progress').length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Clarification Needed</p>
          <p className="text-2xl font-bold text-status-warning-text">{hrRequests.filter((r) => r.status === 'Clarification Needed').length}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-4">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {t}
          </button>
        ))}
      </div>

      {(tab === 'All' || tab === 'HR Requests') && (
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>HR Requests</p>
          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border-subtle">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {hrRequests.filter((r) => r.status !== 'Fulfilled').map((r) => (
                  <tr key={r.id} className="border-b border-border-subtle last:border-b-0">
                    <td className="px-4 py-2.5"><RequestIDTag id={r.id} /></td>
                    <td className="px-4 py-2.5 text-text-primary text-xs">{r.type}</td>
                    <td className="px-4 py-2.5 text-text-secondary text-xs">{r.requester}</td>
                    <td className="px-4 py-2.5"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-2.5 text-text-muted text-xs">{r.submittedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(tab === 'All' || tab === 'Leave') && (
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>Leave Approvals</p>
          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border-subtle">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Employee</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Days</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Dates</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.filter((l) => l.status === 'Pending Approval').map((l) => {
                  const emp = employees.find((e) => e.id === l.employeeId)
                  return (
                    <tr key={l.id} className="border-b border-border-subtle last:border-b-0">
                      <td className="px-4 py-2.5"><RequestIDTag id={l.id} /></td>
                      <td className="px-4 py-2.5 text-text-primary">{emp?.name}</td>
                      <td className="px-4 py-2.5 text-text-secondary text-xs">{l.type}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-xs">{l.days}d</td>
                      <td className="px-4 py-2.5 text-text-muted text-xs">{l.startDate} → {l.endDate}</td>
                      <td className="px-4 py-2.5"><StatusBadge status={l.status} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(tab === 'All' || tab === 'Transitions') && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>Active Onboarding / Offboarding</p>
          <div className="space-y-3">
            {transitions.filter((t) => t.status === 'In Progress').map((t) => {
              const emp = employees.find((e) => e.id === t.employeeId)
              const done = t.tasks.filter((x) => x.done).length
              const total = t.tasks.length
              return (
                <div key={t.id} className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <RequestIDTag id={t.id} />
                        <span className="text-[11px] font-semibold uppercase text-text-muted">{t.type}</span>
                      </div>
                      <p className="text-sm font-medium text-text-primary">{emp?.name}</p>
                      <p className="text-xs text-text-muted">Started {t.startedDate} · Target {t.targetDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-dq-orange">{done}/{total}</p>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">tasks</p>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-pill overflow-hidden mt-2" style={{ background: '#EEEFF6' }}>
                    <div className="h-full rounded-pill" style={{ width: `${(done / total) * 100}%`, background: '#FB5535' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
