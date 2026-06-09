import { requests, hrRequests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'
import { CheckCircle, Package } from 'lucide-react'

const completedItems = [
  ...requests.filter(r => r.status === 'Approved'),
  ...hrRequests.filter(r => r.status === 'Fulfilled')
]

export default function ClosureHandover() {
  const { showToast } = useToast()

  const readyForClosure = completedItems.length
  const awaitingHandover = completedItems.filter(r => !r.notes?.includes('handed over')).length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Closure & Handover</h1>
      <p className="text-sm text-text-muted mb-6">
        Manage service request closure and handover to requestors.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Ready for Closure</p>
          <p className="text-2xl font-bold text-text-primary">{readyForClosure}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Awaiting Handover</p>
          <p className="text-2xl font-bold text-status-warning-text">{awaitingHandover}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Closed (7d)</p>
          <p className="text-2xl font-bold text-status-success-text">42</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Avg Closure Time</p>
          <p className="text-2xl font-bold text-dq-orange">3.2d</p>
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Completion Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {completedItems.slice(0, 8).map((item, i) => (
              <tr
                key={item.id}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                  i === 7 ? 'border-b-0' : ''
                } bg-green-50/20`}
                onClick={() => showToast(`Opening ${item.id} for closure`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-status-success-text" strokeWidth={2} />
                    <RequestIDTag id={item.id} />
                  </div>
                </td>
                <td className="px-4 py-3.5 text-text-primary font-medium">{item.type}</td>
                <td className="px-4 py-3.5 text-text-secondary max-w-[280px] truncate">{item.description}</td>
                <td className="px-4 py-3.5 text-text-muted">{item.requester}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={12} className="text-status-success-text" strokeWidth={2} />
                    <span className="text-xs text-status-success-text font-medium">Complete</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      showToast(`Closing ${item.id}`, 'success')
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-status-success-text text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Package size={12} strokeWidth={2} />
                    Close & Handover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
