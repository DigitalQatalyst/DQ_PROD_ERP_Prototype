import { useState } from 'react'
import { Building } from 'lucide-react'
import { vendors } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'

type Filter = 'All' | 'Pending Review' | 'Synced' | 'Failed'

export default function VendorReview() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? vendors : vendors.filter(v => {
    if (filter === 'Pending Review') return v.bcSync === 'Not Synced'
    if (filter === 'Synced') return v.bcSync === 'Synced'
    if (filter === 'Failed') return v.bcSync === 'Failed'
    return true
  })

  const totalVendors = vendors.length
  const needsReview = vendors.filter(v => v.bcSync === 'Not Synced').length
  const syncFailed = vendors.filter(v => v.bcSync === 'Failed').length
  const synced = vendors.filter(v => v.bcSync === 'Synced').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Vendor Review</h1>
      <p className="text-sm text-text-muted mb-6">
        Review vendor onboarding requests, validation, and BC sync readiness.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Vendors</p>
          <p className="text-2xl font-bold text-text-primary">{totalVendors}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Needs Review</p>
          <p className="text-2xl font-bold text-status-warning-text">{needsReview}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Sync Failed</p>
          <p className="text-2xl font-bold text-status-error-text">{syncFailed}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Synced</p>
          <p className="text-2xl font-bold text-status-success-text">{synced}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Pending Review', 'Synced', 'Failed'] as Filter[]).map(f => (
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

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Annual Value</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((vendor, i) => (
              <tr
                key={vendor.id}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                  i === filtered.length - 1 ? 'border-b-0' : ''
                } ${vendor.bcSync === 'Failed' ? 'bg-status-error-surface/20' : ''}`}
                onClick={() => showToast(`Opening ${vendor.id} details`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <span className="font-mono text-[12px] text-text-muted">{vendor.id}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <Building size={16} className="text-text-muted" strokeWidth={1.5} />
                    <span className="font-medium text-text-primary">{vendor.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-text-muted">{vendor.category}</td>
                <td className="px-4 py-3.5 text-text-secondary">{vendor.annualValue}</td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={vendor.bcSync} />
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={vendor.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
