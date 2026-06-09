import { hrRequests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'

export default function PeopleServiceTracker() {
  const { showToast } = useToast()

  const inReview = hrRequests.filter(r => r.status === 'In Review').length
  const clarificationNeeded = hrRequests.filter(r => r.status === 'Clarification Needed').length
  const fulfilled = hrRequests.filter(r => r.status === 'Fulfilled').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">People Service Tracker</h1>
      <p className="text-sm text-text-muted mb-6">
        Track HR service requests including employment letters, salary certificates, and documentation.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-text-primary">{hrRequests.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">In Review</p>
          <p className="text-2xl font-bold text-status-warning-text">{inReview}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Clarification Needed</p>
          <p className="text-2xl font-bold text-status-error-text">{clarificationNeeded}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Fulfilled (30d)</p>
          <p className="text-2xl font-bold text-status-success-text">{fulfilled}</p>
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Owner</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {hrRequests.map((req, i) => (
              <tr
                key={req.id}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                  i === hrRequests.length - 1 ? 'border-b-0' : ''
                } ${req.status === 'Clarification Needed' ? 'bg-status-error-surface/20' : ''}`}
                onClick={() => showToast(`Opening ${req.id} details`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <span className="font-mono text-[12px] text-text-muted">{req.id}</span>
                </td>
                <td className="px-4 py-3.5 text-text-primary font-medium">{req.type}</td>
                <td className="px-4 py-3.5 text-text-secondary max-w-[280px] truncate">{req.description}</td>
                <td className="px-4 py-3.5 text-text-muted">{req.requester}</td>
                <td className="px-4 py-3.5 text-text-muted">{req.owner}</td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={req.status} />
                </td>
                <td className="px-4 py-3.5 text-text-muted text-xs">{req.submittedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
