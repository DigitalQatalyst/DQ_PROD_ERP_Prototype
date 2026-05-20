import { useState } from 'react'
import { Search, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { vendors } from '../data/fixtures'
import { useToast } from '../components/Toast'

const bcSyncIcon = {
  Synced: <CheckCircle size={14} className="text-status-success" strokeWidth={1.5} />,
  'Not Synced': <AlertCircle size={14} className="text-status-warning" strokeWidth={1.5} />,
  Failed: <XCircle size={14} className="text-status-error" strokeWidth={1.5} />,
}

const bcSyncStyle: Record<string, string> = {
  Synced: 'bg-status-success-surface text-status-success-text',
  'Not Synced': 'bg-status-warning-surface text-status-warning-text',
  Failed: 'bg-status-error-surface text-status-error-text',
}

export default function VendorDirectory() {
  const [search, setSearch] = useState('')
  const { showToast } = useToast()

  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.category.toLowerCase().includes(search.toLowerCase()) ||
    v.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Vendor Directory</h1>
      <p className="text-sm text-text-muted mb-6">Searchable directory of all active vendors with BC sync status, onboarding state, and contract data.</p>

      {/* Stats */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <CheckCircle size={13} className="text-status-success" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-success-text">{vendors.filter(v => v.bcSync === 'Synced').length}</span>
          <span className="text-xs text-text-muted">Synced</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-warning-surface rounded-pill">
          <AlertCircle size={13} className="text-status-warning" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-warning-text">{vendors.filter(v => v.bcSync === 'Not Synced').length}</span>
          <span className="text-xs text-text-muted">Not Synced</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-error-surface rounded-pill">
          <XCircle size={13} className="text-status-error" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-error-text">{vendors.filter(v => v.bcSync === 'Failed').length}</span>
          <span className="text-xs text-text-muted">Failed</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search vendors by name, category, or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-input border border-border-default text-sm focus:outline-none focus:border-dq-orange"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Annual Value</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map((v) => (
              <tr key={v.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-text-primary">{v.name}</p>
                  <p className="text-xs font-mono text-text-muted">{v.id}</p>
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary">{v.category}</td>
                <td className="px-4 py-4 text-sm font-mono text-text-secondary">{v.annualValue}</td>
                <td className="px-4 py-4">
                  <span className={`flex items-center gap-1 w-fit text-xs font-semibold rounded-pill px-2 py-0.5 ${bcSyncStyle[v.bcSync]}`}>
                    {bcSyncIcon[v.bcSync as keyof typeof bcSyncIcon]}
                    {v.bcSync}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs font-semibold bg-status-success-surface text-status-success-text rounded-pill px-2 py-0.5">{v.status}</span>
                </td>
                <td className="px-4 py-4 flex items-center gap-3">
                  <button
                    onClick={() => showToast(`Vendor profile opened: ${v.name}.`, 'info')}
                    className="text-xs font-semibold text-dq-orange hover:underline"
                  >
                    View
                  </button>
                  {v.bcSync !== 'Synced' && (
                    <button
                      onClick={() => showToast(`Sync initiated for ${v.name}.`, 'success')}
                      className="text-xs font-semibold text-dq-navy hover:underline"
                    >
                      Sync
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-text-muted">No vendors match your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
