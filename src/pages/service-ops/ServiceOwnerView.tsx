import { hrRequests, adminRequests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import { User, Clock, CheckCircle } from 'lucide-react'

const serviceOwner = 'Fatima Bin Hammad'

interface AssignedItem {
  id: string
  type: string
  description: string
  requester: string
  status: string
  dueDate?: string
  daysToSLA: number
}

const assignedItems: AssignedItem[] = [
  ...hrRequests.filter(r => r.owner === serviceOwner && r.status !== 'Fulfilled').map(r => ({
    id: r.id,
    type: r.type,
    description: r.description,
    requester: r.requester,
    status: r.status,
    dueDate: r.dueDate,
    daysToSLA: r.dueDate ? Math.ceil((new Date(r.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 999
  })),
  ...adminRequests.filter(r => r.owner === serviceOwner && r.status !== 'Fulfilled').map(r => ({
    id: r.id,
    type: r.type,
    description: r.description,
    requester: r.requester,
    status: r.status,
    dueDate: r.dueDate,
    daysToSLA: r.dueDate ? Math.ceil((new Date(r.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 999
  }))
]

export default function ServiceOwnerView() {
  const { showToast } = useToast()

  const onTrack = assignedItems.filter(i => i.daysToSLA > 2 || i.daysToSLA === 999).length
  const atRisk = assignedItems.filter(i => i.daysToSLA >= 0 && i.daysToSLA <= 2).length
  const overdue = assignedItems.filter(i => i.daysToSLA < 0).length
  const completed7d = hrRequests.filter(r => r.owner === serviceOwner && r.status === 'Fulfilled').length + adminRequests.filter(r => r.owner === serviceOwner && r.status === 'Fulfilled').length

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-dq-navy flex items-center justify-center">
          <User size={24} className="text-white" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{serviceOwner}</h1>
          <p className="text-sm text-text-muted">Service Owner - HR & People Operations</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">My Workload</p>
          <p className="text-2xl font-bold text-text-primary">{assignedItems.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">On Track</p>
          <p className="text-2xl font-bold text-status-success-text">{onTrack}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">At Risk</p>
          <p className="text-2xl font-bold text-status-warning-text">{atRisk}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Completed (7d)</p>
          <p className="text-2xl font-bold text-dq-orange">{completed7d}</p>
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Due Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">SLA Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignedItems.sort((a, b) => a.daysToSLA - b.daysToSLA).map((item, i) => {
              const isOverdue = item.daysToSLA < 0
              const isAtRisk = item.daysToSLA >= 0 && item.daysToSLA <= 2

              return (
                <tr
                  key={item.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === assignedItems.length - 1 ? 'border-b-0' : ''
                  } ${isOverdue ? 'bg-status-error-surface/20' : isAtRisk ? 'bg-orange-50/30' : ''}`}
                  onClick={() => showToast(`Opening ${item.id} details`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[12px] text-text-muted">{item.id}</span>
                  </td>
                  <td className="px-4 py-3.5 text-text-primary font-medium">{item.type}</td>
                  <td className="px-4 py-3.5 text-text-secondary max-w-[280px] truncate">{item.description}</td>
                  <td className="px-4 py-3.5 text-text-muted">{item.requester}</td>
                  <td className="px-4 py-3.5">
                    {item.dueDate ? (
                      <span className={`text-xs ${
                        isOverdue ? 'text-status-error-text font-semibold' :
                        isAtRisk ? 'text-status-warning-text' :
                        'text-text-muted'
                      }`}>
                        {item.dueDate}
                      </span>
                    ) : (
                      <span className="text-text-disabled text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    {item.daysToSLA !== 999 && (
                      <div className="flex items-center gap-1.5">
                        {isOverdue && <Clock size={12} className="text-status-error-text" strokeWidth={2} />}
                        {isAtRisk && <Clock size={12} className="text-status-warning-text" strokeWidth={2} />}
                        {!isOverdue && !isAtRisk && <CheckCircle size={12} className="text-status-success-text" strokeWidth={2} />}
                        <span className={`text-xs font-medium ${
                          isOverdue ? 'text-status-error-text' :
                          isAtRisk ? 'text-status-warning-text' :
                          'text-status-success-text'
                        }`}>
                          {isOverdue ? `${Math.abs(item.daysToSLA)}d overdue` :
                           isAtRisk ? `${item.daysToSLA}d left` :
                           'On track'}
                        </span>
                      </div>
                    )}
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
