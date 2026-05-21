import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { requests } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import type { RequestStatus } from '../types'

type Filter = 'All' | 'Pending Approval' | 'Approved' | 'Draft' | 'Rejected'

const requisitions = requests.filter((r) => r.type === 'Budget Requisition')

export default function BudgetRequisitions() {
  const [filter, setFilter] = useState<Filter>('All')

  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    requisitions.forEach((r) => { c[r.status] = (c[r.status] ?? 0) + 1 })
    return c
  }, [])

  const totalRequested = useMemo(
    () => requisitions.reduce((s, r) => s + r.amount, 0),
    []
  )
  const totalApproved = useMemo(
    () => requisitions.filter((r) => r.status === 'Approved').reduce((s, r) => s + r.amount, 0),
    []
  )

  const filtered = requisitions.filter((r) => filter === 'All' || r.status === (filter as RequestStatus))

  const filters: Filter[] = ['All', 'Pending Approval', 'Approved', 'Draft', 'Rejected']

  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Budget Requisitions</h1>
        <Link
          to="/request-intake"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} strokeWidth={2} />
          Submit Budget Requisition
        </Link>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Requests for new budget allocations not yet covered by an approved budget. Once approved, the allocation appears in
        {' '}
        <Link to="/budget-cost" className="text-dq-orange hover:underline">Budget &amp; Cost Centre</Link>.
        Visible to all internal users.
      </p>

      {/* Summary strip */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Total Requisitions</p>
          <p className="text-2xl font-bold text-dq-navy tabular-nums">{requisitions.length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Total Requested (AED)</p>
          <p className="text-2xl font-bold text-dq-navy tabular-nums font-mono">{totalRequested.toLocaleString()}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Approved YTD (AED)</p>
          <p className="text-2xl font-bold text-status-success-text tabular-nums font-mono">{totalApproved.toLocaleString()}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Pending Approval</p>
          <p className="text-2xl font-bold text-dq-orange tabular-nums">{counts['Pending Approval'] ?? 0}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-4">
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
            {f !== 'All' && (
              <span className="ml-1.5 text-[11px] text-text-muted">
                ({counts[f as RequestStatus] ?? 0})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approver</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Linked Project</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr
                key={r.id}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}
              >
                <td className="px-4 py-3.5"><RequestIDTag id={r.id} /></td>
                <td className="px-4 py-3.5 text-text-primary">
                  <p className="font-medium">{r.description.replace('Budget requisition: ', '')}</p>
                  {r.notes && <p className="text-xs text-status-warning-text mt-0.5">{r.notes}</p>}
                </td>
                <td className="px-4 py-3.5 text-right font-mono font-semibold tabular-nums">
                  AED {r.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3.5 text-text-secondary text-xs">{r.requester}</td>
                <td className="px-4 py-3.5 text-text-secondary text-xs">{r.approver}</td>
                <td className="px-4 py-3.5">
                  {r.linkedProject ? <RequestIDTag id={r.linkedProject} /> : <span className="text-text-disabled text-xs">—</span>}
                </td>
                <td className="px-4 py-3.5"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3.5 text-text-muted text-xs">{r.submittedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-text-muted">
            No budget requisitions match this filter.
          </div>
        )}
      </div>
    </div>
  )
}
