import { hrRequests, leaveRequests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react'

export default function HRApprovalReadiness() {
  const { showToast } = useToast()

  const readyForApproval = hrRequests.filter(r => r.status === 'In Review')
  const leaveReadyForApproval = leaveRequests.filter(l => l.status === 'Pending Approval')
  const totalReady = readyForApproval.length + leaveReadyForApproval.length

  const needsClarification = hrRequests.filter(r => r.status === 'Clarification Needed').length
  const avgSLADays = 3
  const onTrack = readyForApproval.filter(r => !r.dueDate || new Date(r.dueDate) > new Date()).length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">HR Approval Readiness</h1>
      <p className="text-sm text-text-muted mb-6">
        Monitor HR requests ready for approval with evidence complete and SLA tracking.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Ready for Approval</p>
          <p className="text-2xl font-bold text-text-primary">{totalReady}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">On Track (SLA)</p>
          <p className="text-2xl font-bold text-status-success-text">{onTrack}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Needs Clarification</p>
          <p className="text-2xl font-bold text-status-error-text">{needsClarification}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Avg SLA Days</p>
          <p className="text-2xl font-bold text-dq-orange">{avgSLADays}d</p>
        </div>
      </div>

      {/* HR Service Requests */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-text-primary mb-3">HR Service Requests Ready for Approval</h2>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-1 border-b border-border-subtle">
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Due Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Readiness</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {readyForApproval.map((req, i) => {
                const isOverdue = req.dueDate && new Date(req.dueDate) < new Date()
                const isNearDue = req.dueDate && !isOverdue && new Date(req.dueDate).getTime() - new Date().getTime() < 2 * 24 * 60 * 60 * 1000

                return (
                  <tr
                    key={req.id}
                    className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                      i === readyForApproval.length - 1 ? 'border-b-0' : ''
                    } ${isOverdue ? 'bg-status-error-surface/20' : ''}`}
                    onClick={() => showToast(`Opening ${req.id} for approval`, 'info')}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[12px] text-text-muted">{req.id}</span>
                    </td>
                    <td className="px-4 py-3.5 text-text-primary font-medium">{req.type}</td>
                    <td className="px-4 py-3.5 text-text-secondary max-w-[280px] truncate">{req.description}</td>
                    <td className="px-4 py-3.5 text-text-muted">{req.requester}</td>
                    <td className="px-4 py-3.5">
                      {req.dueDate ? (
                        <div className="flex items-center gap-1.5">
                          {isOverdue && <AlertTriangle size={12} className="text-status-error-text" strokeWidth={2} />}
                          {isNearDue && <Clock size={12} className="text-status-warning-text" strokeWidth={2} />}
                          <span className={`text-xs ${
                            isOverdue ? 'text-status-error-text font-semibold' :
                            isNearDue ? 'text-status-warning-text' :
                            'text-text-muted'
                          }`}>
                            {req.dueDate}
                          </span>
                        </div>
                      ) : (
                        <span className="text-text-disabled text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-status-success-text" strokeWidth={2} />
                        <span className="text-xs text-status-success-text font-medium">Ready</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={req.status} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Requests */}
      <div>
        <h2 className="text-sm font-semibold text-text-primary mb-3">Leave Requests Ready for Approval</h2>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-1 border-b border-border-subtle">
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Employee</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Dates</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Days</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approver</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveReadyForApproval.map((leave, i) => (
                <tr
                  key={leave.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === leaveReadyForApproval.length - 1 ? 'border-b-0' : ''
                  }`}
                  onClick={() => showToast(`Opening ${leave.id} for approval`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[12px] text-text-muted">{leave.id}</span>
                  </td>
                  <td className="px-4 py-3.5 text-text-primary font-medium">{leave.employeeId}</td>
                  <td className="px-4 py-3.5 text-text-muted">{leave.type}</td>
                  <td className="px-4 py-3.5 text-text-secondary text-xs">
                    {leave.startDate} - {leave.endDate}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="font-mono text-text-primary">{leave.days}</span>
                  </td>
                  <td className="px-4 py-3.5 text-text-muted">{leave.approver}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={leave.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
