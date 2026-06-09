import { useState } from 'react'
import { vendors, projects, costCentres, customers } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import { Building, Folder, Map, Users } from 'lucide-react'

interface MasterDataItem {
  id: string
  type: 'Vendor' | 'Customer' | 'Project' | 'Cost Centre'
  name: string
  status: string
  lastModified: string
  syncStatus: string
  reviewRequired: boolean
}

const masterDataItems: MasterDataItem[] = [
  ...vendors.map(v => ({
    id: v.id,
    type: 'Vendor' as const,
    name: v.name,
    status: v.status,
    lastModified: '15 May 2026',
    syncStatus: v.bcSync,
    reviewRequired: v.bcSync !== 'Synced'
  })),
  ...customers.map(c => ({
    id: c.id,
    type: 'Customer' as const,
    name: c.name,
    status: c.status,
    lastModified: '16 May 2026',
    syncStatus: 'Synced',
    reviewRequired: c.status === 'Pending Onboarding'
  })),
  ...projects.slice(0, 3).map(p => ({
    id: p.id,
    type: 'Project' as const,
    name: p.name,
    status: p.status,
    lastModified: '14 May 2026',
    syncStatus: 'Synced',
    reviewRequired: false
  })),
  ...costCentres.slice(0, 2).map(cc => ({
    id: cc.id,
    type: 'Cost Centre' as const,
    name: cc.name,
    status: 'Active',
    lastModified: '10 May 2026',
    syncStatus: 'Synced',
    reviewRequired: false
  }))
]

type Filter = 'All' | 'Vendor' | 'Customer' | 'Project' | 'Cost Centre'

export default function MasterDataReviewQueue() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? masterDataItems : masterDataItems.filter(m => m.type === filter)

  const needsReview = masterDataItems.filter(m => m.reviewRequired).length
  const syncIssues = masterDataItems.filter(m => m.syncStatus !== 'Synced').length
  const vendors = masterDataItems.filter(m => m.type === 'Vendor').length
  const customers = masterDataItems.filter(m => m.type === 'Customer').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Master Data Review Queue</h1>
      <p className="text-sm text-text-muted mb-6">
        Review master data changes for vendors, customers, cost centres, and projects.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Records</p>
          <p className="text-2xl font-bold text-text-primary">{masterDataItems.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Needs Review</p>
          <p className="text-2xl font-bold text-status-warning-text">{needsReview}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Sync Issues</p>
          <p className="text-2xl font-bold text-status-error-text">{syncIssues}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Vendors</p>
          <p className="text-2xl font-bold text-dq-orange">{vendors}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Vendor', 'Customer', 'Project', 'Cost Centre'] as Filter[]).map(f => (
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Modified</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Review</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => {
              const getIcon = () => {
                if (item.type === 'Vendor') return <Building size={14} className="text-dq-navy" strokeWidth={1.5} />
                if (item.type === 'Customer') return <Users size={14} className="text-status-success-text" strokeWidth={1.5} />
                if (item.type === 'Project') return <Folder size={14} className="text-dq-orange" strokeWidth={1.5} />
                return <Map size={14} className="text-status-warning-text" strokeWidth={1.5} />
              }

              return (
                <tr
                  key={item.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === filtered.length - 1 ? 'border-b-0' : ''
                  } ${item.reviewRequired ? 'bg-orange-50/30' : ''}`}
                  onClick={() => showToast(`Opening ${item.id} details`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[12px] text-text-muted">{item.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {getIcon()}
                      <span className="text-text-primary font-medium">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-text-primary">{item.name}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={item.status} size="sm" />
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={item.syncStatus} size="sm" />
                  </td>
                  <td className="px-4 py-3.5 text-text-muted text-xs">{item.lastModified}</td>
                  <td className="px-4 py-3.5">
                    {item.reviewRequired ? (
                      <span className="text-xs font-semibold text-dq-orange">Required</span>
                    ) : (
                      <span className="text-xs text-text-disabled">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
