import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { hrRequests, employees } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'
import type { HRRequest } from '../../types'

type Filter = 'All' | HRRequest['status']

export default function HRServiceRequestCentre() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = hrRequests.filter((r) => filter === 'All' || r.status === filter)
  const filters: Filter[] = ['All', 'Submitted', 'In Review', 'Approved', 'Fulfilled', 'Clarification Needed']

  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">HR Service Request Centre</h1>
        <Link to="/request-intake" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus size={16} strokeWidth={2} /> New HR Request
        </Link>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Raise and track HR / people requests — letters, employment / salary certificates, onboarding support, offboarding clearance, and document support.
      </p>

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

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Employee</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Owner</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Submitted</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const emp = r.employeeId ? employees.find((e) => e.id === r.employeeId) : null
              return (
                <tr key={r.id} className={`border-b border-border-subtle hover:bg-surface-1 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-3"><RequestIDTag id={r.id} /></td>
                  <td className="px-4 py-3 text-text-primary text-xs font-medium">{r.type}</td>
                  <td className="px-4 py-3 text-text-secondary">
                    <p>{r.description}</p>
                    {r.notes && <p className="text-xs text-status-warning-text mt-0.5">{r.notes}</p>}
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{emp?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{r.requester}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{r.owner}</td>
                  <td className="px-4 py-3 text-text-muted text-xs">{r.submittedDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
