import { useState } from 'react'
import { hrRequests, leaveRequests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'

type Filter = 'All' | 'HR Requests' | 'Leave Requests'

export default function HRWorkQueue() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const hrPending = hrRequests.filter(r => r.status === 'In Review' || r.status === 'Clarification Needed').length
  const leavePending = leaveRequests.filter(l => l.status === 'Pending Approval').length
  const totalPending = hrPending + leavePending

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">HR Work Queue</h1>
      <p className="text-sm text-text-muted mb-6">
        Centralized queue for HR service requests, leave approvals, and employee transitions.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Pending</p>
          <p className="text-2xl font-bold text-text-primary">{totalPending}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">HR Requests</p>
          <p className="text-2xl font-bold text-status-warning-text">{hrPending}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Leave Requests</p>
          <p className="text-2xl font-bold text-dq-orange">{leavePending}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Completed (7d)</p>
          <p className="text-2xl font-bold text-status-success-text">{hrRequests.filter(r => r.status === 'Fulfilled').length + leaveRequests.filter(l => l.status === 'Approved').length}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'HR Requests', 'Leave Requests'] as Filter[]).map(f => (
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

      {(filter === 'All' || filter === 'HR Requests') && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-text-primary mb-3">HR Service Requests</h2>
          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border-subtle">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {hrRequests.filter(r => r.status !== 'Fulfilled').map((req, i) => (
                  <tr
                    key={req.id}
                    className="border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer"
                    onClick={() => showToast(`Opening ${req.id} details`, 'info')}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[12px] text-text-muted">{req.id}</span>
                    </td>
                    <td className="px-4 py-3.5 text-text-primary font-medium">{req.type}</td>
                    <td className="px-4 py-3.5 text-text-secondary max-w-[300px] truncate">{req.description}</td>
                    <td className="px-4 py-3.5 text-text-muted">{req.requester}</td>
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

      {(filter === 'All' || filter === 'Leave Requests') && (
        <div>
          <h2 className="text-sm font-semibold text-text-primary mb-3">Leave Requests</h2>
          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border-subtle">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Employee</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Dates</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Days</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.filter(l => l.status !== 'Approved' && l.status !== 'Rejected').map((leave, i) => (
                  <tr
                    key={leave.id}
                    className="border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer"
                    onClick={() => showToast(`Opening ${leave.id} details`, 'info')}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[12px] text-text-muted">{leave.id}</span>
                    </td>
                    <td className="px-4 py-3.5 text-text-primary font-medium">{leave.employeeId}</td>
                    <td className="px-4 py-3.5 text-text-muted">{leave.type}</td>
                    <td className="px-4 py-3.5 text-text-secondary text-xs">{leave.startDate} - {leave.endDate}</td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="font-mono text-text-primary">{leave.days}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={leave.status} />
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
