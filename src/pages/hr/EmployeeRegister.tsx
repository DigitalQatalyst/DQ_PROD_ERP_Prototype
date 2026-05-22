import { useState } from 'react'
import { Users } from 'lucide-react'
import { employees } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'
import type { Employee, EmployeeStatus } from '../../types'

type Filter = 'All' | EmployeeStatus

const statusStyle: Record<EmployeeStatus, string> = {
  Active: 'bg-status-success-surface text-status-success-text',
  Onboarding: 'bg-status-info-surface text-status-info-text',
  Offboarding: 'bg-status-warning-surface text-status-warning-text',
  'On Leave': 'bg-orange-50 text-dq-orange',
  Inactive: 'bg-border-default text-text-secondary',
}

export default function EmployeeRegister() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = employees.filter((e) => filter === 'All' || e.status === filter)

  const filters: Filter[] = ['All', 'Active', 'Onboarding', 'Offboarding', 'On Leave', 'Inactive']

  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Employee Register</h1>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Shared employee / associate master records with manager hierarchy, assets, and leave balance visibility.
      </p>

      {/* Summary chips */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        {(['Active', 'Onboarding', 'Offboarding', 'On Leave', 'Inactive'] as EmployeeStatus[]).map((s) => {
          const count = employees.filter((e) => e.status === s).length
          return (
            <div key={s} className={`flex items-center gap-2 px-3 py-2 rounded-pill ${statusStyle[s]}`}>
              <span className="text-sm font-semibold">{count}</span>
              <span className="text-xs opacity-80">{s}</span>
            </div>
          )
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-4 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              filter === f ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Role</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Entity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Manager</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Assets</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Leave bal.</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e: Employee, i) => {
              const manager = e.managerId ? employees.find((m) => m.id === e.managerId) : null
              return (
                <tr key={e.id} className={`border-b border-border-subtle hover:bg-surface-1 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-3"><RequestIDTag id={e.id} /></td>
                  <td className="px-4 py-3 font-medium text-text-primary">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-navy-50 text-dq-navy text-[11px] font-bold flex items-center justify-center">
                        {e.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      {e.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{e.role}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{e.entity}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{manager?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs">{e.assetsAssigned}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs">{e.leaveBalanceDays}d</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-[11px] font-medium ${statusStyle[e.status]}`}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-text-muted mt-3 flex items-center gap-1">
        <Users size={12} strokeWidth={1.5} />
        Employee data is HR-scoped — bound by HR data minimisation per BRS design constraints.
      </p>
    </div>
  )
}
