import { useState } from 'react'
import { requests, vendors } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'

type Filter = 'All' | 'Purchase Requests' | 'Vendor Reviews'

export default function ProcurementWorkQueue() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const purchaseRequests = requests.filter(r => r.type === 'Purchase')
  const vendorOnboarding = requests.filter(r => r.type === 'Vendor Onboarding')
  const vendorNeedsReview = vendors.filter(v => v.bcSync === 'Not Synced' || v.bcSync === 'Failed')

  const totalPurchases = purchaseRequests.length
  const totalVendorReviews = vendorOnboarding.length + vendorNeedsReview.length
  const pendingApproval = purchaseRequests.filter(r => r.status === 'Pending Approval').length
  const vendorIssues = vendorNeedsReview.length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Procurement Work Queue</h1>
      <p className="text-sm text-text-muted mb-6">
        Centralized queue for purchase requests, vendor reviews, and procurement approvals.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Items</p>
          <p className="text-2xl font-bold text-text-primary">{totalPurchases + totalVendorReviews}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Purchase Requests</p>
          <p className="text-2xl font-bold text-status-warning-text">{totalPurchases}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending Approval</p>
          <p className="text-2xl font-bold text-dq-orange">{pendingApproval}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Vendor Issues</p>
          <p className="text-2xl font-bold text-status-error-text">{vendorIssues}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Purchase Requests', 'Vendor Reviews'] as Filter[]).map(f => (
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

      {(filter === 'All' || filter === 'Purchase Requests') && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-text-primary mb-3">Purchase Requests</h2>
          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border-subtle">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchaseRequests.map((req, i) => (
                  <tr
                    key={req.id}
                    className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                      i === purchaseRequests.length - 1 ? 'border-b-0' : ''
                    }`}
                    onClick={() => showToast(`Opening ${req.id} details`, 'info')}
                  >
                    <td className="px-4 py-3.5">
                      <RequestIDTag id={req.id} />
                    </td>
                    <td className="px-4 py-3.5 text-text-secondary max-w-[280px] truncate">{req.description}</td>
                    <td className="px-4 py-3.5 text-text-muted">{req.requester}</td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="font-mono font-semibold text-text-primary">
                        AED {req.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-text-primary">{req.vendorName || '—'}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={req.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(filter === 'All' || filter === 'Vendor Reviews') && (
        <div>
          <h2 className="text-sm font-semibold text-text-primary mb-3">Vendor Onboarding & Reviews</h2>
          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border-subtle">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor/Description</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Issue</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {vendorOnboarding.map((req, i) => (
                  <tr
                    key={req.id}
                    className="border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer"
                    onClick={() => showToast(`Opening ${req.id} details`, 'info')}
                  >
                    <td className="px-4 py-3.5">
                      <RequestIDTag id={req.id} />
                    </td>
                    <td className="px-4 py-3.5 text-text-primary font-medium">Onboarding</td>
                    <td className="px-4 py-3.5 text-text-secondary">{req.description}</td>
                    <td className="px-4 py-3.5 text-text-muted text-xs">{req.notes || '—'}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={req.status} />
                    </td>
                  </tr>
                ))}
                {vendorNeedsReview.map((vendor, i) => (
                  <tr
                    key={vendor.id}
                    className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                      i === vendorNeedsReview.length - 1 ? 'border-b-0' : ''
                    } ${vendor.bcSync === 'Failed' ? 'bg-status-error-surface/20' : ''}`}
                    onClick={() => showToast(`Opening ${vendor.id} details`, 'info')}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[12px] text-text-muted">{vendor.id}</span>
                    </td>
                    <td className="px-4 py-3.5 text-text-primary font-medium">Sync Issue</td>
                    <td className="px-4 py-3.5 text-text-secondary">{vendor.name}</td>
                    <td className="px-4 py-3.5 text-text-muted text-xs">BC sync {vendor.bcSync.toLowerCase()}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={vendor.bcSync} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
