import { requests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'
import { RotateCcw, AlertTriangle } from 'lucide-react'

const returnedItems = requests.filter(r => r.status === 'Clarification Needed' || r.status === 'Evidence Pending')

export default function ReturnedItems() {
  const { showToast } = useToast()

  const clarificationNeeded = returnedItems.filter(r => r.status === 'Clarification Needed').length
  const evidencePending = returnedItems.filter(r => r.status === 'Evidence Pending').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Returned Items</h1>
      <p className="text-sm text-text-muted mb-6">
        Track returned or rejected items requiring rework or clarification.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Returned</p>
          <p className="text-2xl font-bold text-text-primary">{returnedItems.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Clarification Needed</p>
          <p className="text-2xl font-bold text-status-error-text">{clarificationNeeded}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Evidence Pending</p>
          <p className="text-2xl font-bold text-status-warning-text">{evidencePending}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Avg Return Rate</p>
          <p className="text-2xl font-bold text-dq-orange">12%</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Return Reason</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {returnedItems.map((item, i) => (
              <tr
                key={item.id}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                  i === returnedItems.length - 1 ? 'border-b-0' : ''
                } bg-status-error-surface/20`}
                onClick={() => showToast(`Opening ${item.id} for rework`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <RotateCcw size={14} className="text-status-error-text" strokeWidth={1.5} />
                    <RequestIDTag id={item.id} />
                  </div>
                </td>
                <td className="px-4 py-3.5 text-text-primary font-medium">{item.type}</td>
                <td className="px-4 py-3.5 text-text-secondary max-w-[280px] truncate">{item.description}</td>
                <td className="px-4 py-3.5 text-text-muted">{item.requester}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle size={12} className="text-status-error-text" strokeWidth={2} />
                    <span className="text-xs text-status-error-text">{item.notes || 'Missing required information'}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
