import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Calendar } from 'lucide-react'
import { leaveRequests, employees } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'
import type { LeaveRequest } from '../../types'

type Filter = 'All' | LeaveRequest['status']

export default function LeaveManagement() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = leaveRequests.filter((l) => filter === 'All' || l.status === filter)
  const filters: Filter[] = ['All', 'Pending Approval', 'Approved', 'Rejected', 'Cancelled']

  const counts = useMemo(() => {
    const c: Record<string, number> = { totalDays: 0, pendingCount: 0, approvedThisMonth: 0 }
    leaveRequests.forEach((l) => {
      c.totalDays += l.days
      if (l.status === 'Pending Approval') c.pendingCount += 1
      if (l.status === 'Approved') c.approvedThisMonth += 1
    })
    return c
  }, [])

  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Leave Management</h1>
        <Link to="/request-intake" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus size={16} strokeWidth={2} /> Request Leave
        </Link>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Annual, sick, parental, unpaid, and compassionate leave — submission, approval, and balance tracking.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Pending Approvals</p>
          <p className="text-2xl font-bold text-status-warning-text">{counts.pendingCount}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Approved Requests</p>
          <p className="text-2xl font-bold text-status-success-text">{counts.approvedThisMonth}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Total Days Requested</p>
          <p className="text-2xl font-bold text-dq-navy tabular-nums">{counts.totalDays}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Workforce Avg Balance</p>
          <p className="text-2xl font-bold text-dq-navy tabular-nums">
            {Math.round(employees.reduce((s, e) => s + e.leaveBalanceDays, 0) / employees.length)}d
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-4">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Employee</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Dates</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Days</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approver</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Reason</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l, i) => {
              const emp = employees.find((e) => e.id === l.employeeId)
              return (
                <tr key={l.id} className={`border-b border-border-subtle hover:bg-surface-1 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-3"><RequestIDTag id={l.id} /></td>
                  <td className="px-4 py-3 text-text-primary font-medium">{emp?.name}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} strokeWidth={1.5} className="text-icon-muted" />
                      {l.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted text-xs">{l.startDate} → {l.endDate}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold">{l.days}d</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{l.approver}</td>
                  <td className="px-4 py-3 text-text-muted text-xs italic">{l.reason ?? '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-text-muted mt-3">
        Leave requests follow approval rules per the HR policy in{' '}
        <Link to="/marketplace/discern/policies" className="text-dq-orange hover:underline">Policy Library</Link>.
      </p>
    </div>
  )
}
