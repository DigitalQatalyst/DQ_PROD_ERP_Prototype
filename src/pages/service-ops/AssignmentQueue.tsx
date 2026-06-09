import { requests, hrRequests, adminRequests } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'
import { UserPlus, AlertTriangle, Clock } from 'lucide-react'

interface UnassignedItem {
  id: string
  type: string
  description: string
  requester: string
  domain: string
  priority: 'High' | 'Medium' | 'Low'
  submittedDate: string
  daysUnassigned: number
}

const unassignedItems: UnassignedItem[] = [
  { id: 'REQ-2025-0054', type: 'Purchase', description: 'Purchase request: Adobe CC renewals', requester: 'Tariq Al-Amin', domain: 'Procurement', priority: 'Medium', submittedDate: '18 May 2026', daysUnassigned: 2 },
  { id: 'HR-007', type: 'Leave Request', description: 'Annual leave: 5 days', requester: 'Maya Sharma', domain: 'HR', priority: 'High', submittedDate: '17 May 2026', daysUnassigned: 3 },
  { id: 'ADM-008', type: 'Travel', description: 'Flight booking for client meeting', requester: 'Sara Pereira', domain: 'Admin', priority: 'High', submittedDate: '18 May 2026', daysUnassigned: 2 },
  { id: 'REQ-2025-0055', type: 'Expense', description: 'Team dinner reimbursement', requester: 'Jay Nair', domain: 'Finance', priority: 'Low', submittedDate: '19 May 2026', daysUnassigned: 1 },
]

export default function AssignmentQueue() {
  const { showToast } = useToast()

  const high = unassignedItems.filter(i => i.priority === 'High').length
  const overdue = unassignedItems.filter(i => i.daysUnassigned > 2).length
  const avgDaysUnassigned = (unassignedItems.reduce((sum, i) => sum + i.daysUnassigned, 0) / unassignedItems.length).toFixed(1)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Assignment Queue</h1>
      <p className="text-sm text-text-muted mb-6">
        Queue of unassigned service requests awaiting ownership allocation.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Unassigned Items</p>
          <p className="text-2xl font-bold text-text-primary">{unassignedItems.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">High Priority</p>
          <p className="text-2xl font-bold text-status-error-text">{high}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Overdue Assignment</p>
          <p className="text-2xl font-bold text-status-warning-text">{overdue}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Avg Days Unassigned</p>
          <p className="text-2xl font-bold text-dq-orange">{avgDaysUnassigned}d</p>
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Domain</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Priority</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Days Unassigned</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {unassignedItems.map((item, i) => {
              const isOverdue = item.daysUnassigned > 2
              const isHighPriority = item.priority === 'High'

              return (
                <tr
                  key={item.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === unassignedItems.length - 1 ? 'border-b-0' : ''
                  } ${isHighPriority || isOverdue ? 'bg-orange-50/30' : ''}`}
                  onClick={() => showToast(`Opening ${item.id} for assignment`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {(isHighPriority || isOverdue) && <AlertTriangle size={14} className="text-dq-orange" strokeWidth={2} />}
                      <RequestIDTag id={item.id} />
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-text-primary font-medium">{item.type}</td>
                  <td className="px-4 py-3.5 text-text-secondary max-w-[280px] truncate">{item.description}</td>
                  <td className="px-4 py-3.5 text-text-muted">{item.requester}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-medium text-text-primary">{item.domain}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold ${
                      item.priority === 'High' ? 'text-status-error-text' :
                      item.priority === 'Medium' ? 'text-status-warning-text' :
                      'text-text-muted'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {isOverdue && <Clock size={12} className="text-status-warning-text" strokeWidth={2} />}
                      <span className={`text-xs font-mono ${
                        isOverdue ? 'text-status-warning-text font-semibold' : 'text-text-muted'
                      }`}>
                        {item.daysUnassigned}d
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        showToast(`Assigning ${item.id}`, 'success')
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-dq-orange text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      <UserPlus size={12} strokeWidth={2} />
                      Assign
                    </button>
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
