import { requests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'
import { Clock, TrendingUp, TrendingDown } from 'lucide-react'

const approvalItems = requests.filter(r => r.approver)

export default function ApprovalTracker() {
  const { showToast } = useToast()

  const pending = approvalItems.filter(r => r.status === 'Pending Approval' || r.status === 'In Review').length
  const approved = approvalItems.filter(r => r.status === 'Approved').length
  const avgCycleTime = 3.4

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Approval Tracker</h1>
      <p className="text-sm text-text-muted mb-6">
        Track approval progress, bottlenecks, and cycle times.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total in Approval</p>
          <p className="text-2xl font-bold text-text-primary">{approvalItems.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending</p>
          <p className="text-2xl font-bold text-status-warning-text">{pending}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Approved (7d)</p>
          <p className="text-2xl font-bold text-status-success-text">{approved}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Avg Cycle Time</p>
          <p className="text-2xl font-bold text-dq-orange">{avgCycleTime}d</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approver</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Days in Approval</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {approvalItems.map((item, i) => {
              const daysInApproval = Math.floor(Math.random() * 6) + 1
              const isBottleneck = daysInApproval > 4

              return (
                <tr
                  key={item.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === approvalItems.length - 1 ? 'border-b-0' : ''
                  } ${isBottleneck ? 'bg-status-warning-surface/20' : ''}`}
                  onClick={() => showToast(`Opening ${item.id} approval details`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <RequestIDTag id={item.id} />
                  </td>
                  <td className="px-4 py-3.5 text-text-primary font-medium">{item.type}</td>
                  <td className="px-4 py-3.5 text-text-secondary max-w-[280px] truncate">{item.description}</td>
                  <td className="px-4 py-3.5 text-text-muted">{item.approver}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {isBottleneck ? (
                        <TrendingUp size={12} className="text-status-warning-text" strokeWidth={2} />
                      ) : (
                        <TrendingDown size={12} className="text-status-success-text" strokeWidth={2} />
                      )}
                      <span className={`text-xs font-mono ${
                        isBottleneck ? 'text-status-warning-text font-semibold' : 'text-text-muted'
                      }`}>
                        {daysInApproval}d
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={item.status} />
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
