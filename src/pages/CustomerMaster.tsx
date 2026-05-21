import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { customers } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import type { Customer } from '../types'

type Filter = 'All' | 'Active' | 'Pending Onboarding' | 'Inactive'

const statusStyle: Record<Customer['status'], string> = {
  'Active': 'bg-status-success-surface text-status-success-text',
  'Pending Onboarding': 'bg-status-warning-surface text-status-warning-text',
  'Inactive': 'bg-border-default text-text-secondary',
}

export default function CustomerMaster() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = customers.filter((c) => filter === 'All' || c.status === filter)
  const totalAR = customers.reduce((sum, c) => sum + (c.currency === 'AED' ? c.arBalance : 0), 0)

  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Customer Master</h1>
        <Link
          to="/customer-onboarding"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} strokeWidth={2} />
          Onboard Customer
        </Link>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Shared customer master records — drives AR, billing, invoicing, and revenue reporting. Owned by Finance Operations.
      </p>

      {/* Summary chips */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2 px-3 py-2 bg-status-success-surface rounded-pill">
          <span className="text-sm font-semibold text-status-success-text">{customers.filter((c) => c.status === 'Active').length}</span>
          <span className="text-xs text-text-muted">Active</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-status-warning-surface rounded-pill">
          <span className="text-sm font-semibold text-status-warning-text">{customers.filter((c) => c.status === 'Pending Onboarding').length}</span>
          <span className="text-xs text-text-muted">Pending Onboarding</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-navy-50 rounded-pill">
          <span className="text-sm font-semibold text-dq-navy font-mono">AED {totalAR.toLocaleString()}</span>
          <span className="text-xs text-text-muted">AR Balance (AED only)</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-4">
        {(['All', 'Active', 'Pending Onboarding', 'Inactive'] as Filter[]).map((f) => (
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

      {/* Table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Customer</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Country</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Billing Terms</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">AR Balance</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Linked Project</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id} className={`border-b border-border-subtle hover:bg-surface-1 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-4 py-3"><RequestIDTag id={c.id} /></td>
                <td className="px-4 py-3 text-text-primary font-medium">{c.name}</td>
                <td className="px-4 py-3 text-text-secondary text-xs">{c.country}</td>
                <td className="px-4 py-3 text-text-secondary text-xs">{c.billingTerms}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold" style={{ fontFeatureSettings: "'tnum' on" }}>
                  {c.arBalance > 0 ? `${c.currency} ${c.arBalance.toLocaleString()}` : '—'}
                </td>
                <td className="px-4 py-3">
                  {c.linkedProject ? <RequestIDTag id={c.linkedProject} /> : <span className="text-text-disabled text-xs">—</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap ${statusStyle[c.status]}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
