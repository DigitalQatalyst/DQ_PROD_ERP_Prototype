import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { adminRequests } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'

type Filter = 'All' | 'Office Supplies' | 'Document Support' | 'Facilities' | 'Business Card / Letter'

const officeTypes: Filter[] = ['Office Supplies', 'Document Support', 'Facilities', 'Business Card / Letter']

export default function OfficeServicesTracker() {
  const [filter, setFilter] = useState<Filter>('All')

  const base = adminRequests.filter((r) => officeTypes.includes(r.type as Filter))
  const filtered = base.filter((r) => filter === 'All' || r.type === filter)

  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Office Services Request Tracker</h1>
        <Link to="/request-intake" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus size={16} strokeWidth={2} /> New Office Request
        </Link>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Office supplies, document support, facilities issues, and business cards / letterhead requests — tracked through fulfilment and SLA.
      </p>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-4 flex-wrap">
        {(['All', ...officeTypes] as Filter[]).map((f) => (
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Owner</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">SLA</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const breached = r.daysOpen > r.slaDays
              return (
                <tr key={r.id} className={`border-b border-border-subtle ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-3"><RequestIDTag id={r.id} /></td>
                  <td className="px-4 py-3 text-text-primary text-xs font-medium">{r.type}</td>
                  <td className="px-4 py-3 text-text-secondary">{r.description}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{r.requester}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{r.owner}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-mono text-xs font-semibold ${breached ? 'text-status-error-text' : 'text-text-secondary'}`}>
                      {r.daysOpen}d / {r.slaDays}d
                    </span>
                  </td>
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
