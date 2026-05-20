import { useState } from 'react'
import { Search, CheckCircle, AlertCircle, XCircle, RefreshCw } from 'lucide-react'
import { vendors } from '../data/fixtures'
import { useToast } from '../components/Toast'

const bcSyncStyle: Record<string, { cls: string; icon: React.ReactNode }> = {
  Synced: { cls: 'bg-status-success-surface text-status-success-text', icon: <CheckCircle size={12} strokeWidth={1.5} /> },
  'Not Synced': { cls: 'bg-status-warning-surface text-status-warning-text', icon: <AlertCircle size={12} strokeWidth={1.5} /> },
  Failed: { cls: 'bg-status-error-surface text-status-error-text', icon: <XCircle size={12} strokeWidth={1.5} /> },
}

const dataQualityIssues: Record<string, string[]> = {
  'VND-004': ['Missing VAT registration number', 'BC sync failed — 3 retry attempts'],
  'VND-006': ['No BC record — manual order only'],
}

export default function VendorCustomerMasterData() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'Vendors' | 'Customers'>('Vendors')
  const { showToast } = useToast()

  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.id.toLowerCase().includes(search.toLowerCase()) ||
    v.category.toLowerCase().includes(search.toLowerCase())
  )

  const withIssues = vendors.filter(v => dataQualityIssues[v.id]).length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Vendor / Customer Master Data</h1>
      <p className="text-sm text-text-muted mb-6">Master data management for vendors and customers including BC sync status and data quality flags.</p>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-6">
        {(['Vendors', 'Customers'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Vendors' && (
        <>
          {/* Summary */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
              <CheckCircle size={13} className="text-status-success" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-status-success-text">{vendors.filter(v => v.bcSync === 'Synced').length}</span>
              <span className="text-xs text-text-muted">BC Synced</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-status-error-surface rounded-pill">
              <XCircle size={13} className="text-status-error" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-status-error-text">{withIssues}</span>
              <span className="text-xs text-text-muted">Data Quality Issues</span>
            </div>
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search vendors…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-input border border-border-default text-sm focus:outline-none focus:border-dq-orange"
              />
            </div>
          </div>

          {/* Vendor master table */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border-subtle">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Annual Value</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Data Quality</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((v) => {
                  const issues = dataQualityIssues[v.id]
                  const syncInfo = bcSyncStyle[v.bcSync]
                  return (
                    <tr key={v.id} className="hover:bg-surface-1 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-text-primary">{v.name}</p>
                        <p className="text-xs font-mono text-text-muted">{v.id}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-text-secondary">{v.category}</td>
                      <td className="px-4 py-4 text-sm font-mono text-text-secondary">{v.annualValue}</td>
                      <td className="px-4 py-4">
                        <span className={`flex items-center gap-1 w-fit text-xs font-semibold rounded-pill px-2 py-0.5 ${syncInfo.cls}`}>
                          {syncInfo.icon}{v.bcSync}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {issues ? (
                          <div className="space-y-0.5">
                            {issues.map((issue, i) => (
                              <p key={i} className="text-xs text-status-error-text">{issue}</p>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-status-success-text flex items-center gap-1">
                            <CheckCircle size={11} strokeWidth={1.5} />
                            No issues
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 flex items-center gap-2">
                        <button onClick={() => showToast(`Vendor ${v.id} master record opened.`, 'info')} className="text-xs font-semibold text-dq-orange hover:underline">Edit</button>
                        {v.bcSync !== 'Synced' && (
                          <button onClick={() => showToast(`Sync initiated for ${v.id}.`, 'success')} className="flex items-center gap-1 text-xs font-semibold text-dq-navy hover:underline">
                            <RefreshCw size={10} strokeWidth={1.5} />Sync
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'Customers' && (
        <div className="p-8 bg-white rounded-card border border-border-subtle shadow-sm text-center">
          <p className="text-sm font-semibold text-text-primary mb-1">Customer Master Data</p>
          <p className="text-xs text-text-muted">Customer records are managed in Business Central. DWS.04 displays customer data in billing and project economics views.</p>
          <p className="text-xs font-mono text-dq-navy mt-3">1 active client: Noor Retail (PRJ-2403) — managed via BC-CUST-NR-001</p>
        </div>
      )}
    </div>
  )
}
