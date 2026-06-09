import { useState } from 'react'
import { inventoryMovements, transitions, employees } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import { Package, UserPlus, RefreshCw } from 'lucide-react'

type Filter = 'All' | 'Issues' | 'Returns' | 'Onboarding'

export default function InventoryWorkQueue() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const issues = inventoryMovements.filter(m => m.type === 'Issue')
  const returns = inventoryMovements.filter(m => m.type === 'Return')
  const onboardingTransitions = transitions.filter(t => t.type === 'Onboarding' && t.status === 'In Progress')
  
  const totalItems = issues.length + returns.length + onboardingTransitions.length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Asset Work Queue</h1>
      <p className="text-sm text-text-muted mb-6">
        Centralized queue for inventory movements, asset assignments, and stock management.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Items</p>
          <p className="text-2xl font-bold text-text-primary">{totalItems}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending Issues</p>
          <p className="text-2xl font-bold text-status-warning-text">{issues.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending Returns</p>
          <p className="text-2xl font-bold text-dq-orange">{returns.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Onboarding Assets</p>
          <p className="text-2xl font-bold text-status-success-text">{onboardingTransitions.length}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Issues', 'Returns', 'Onboarding'] as Filter[]).map(f => (
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

      {(filter === 'All' || filter === 'Issues') && issues.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-text-primary mb-3">Pending Asset Issues</h2>
          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border-subtle">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Item ID</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Quantity</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Recipient</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Performed By</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue, i) => (
                  <tr
                    key={issue.id}
                    className="border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer"
                    onClick={() => showToast(`Opening ${issue.id} details`, 'info')}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <Package size={14} className="text-status-warning-text" strokeWidth={1.5} />
                        <span className="font-mono text-[12px] text-text-muted">{issue.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-text-primary font-medium">{issue.itemId}</td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="font-mono text-text-primary">{issue.quantity}</span>
                    </td>
                    <td className="px-4 py-3.5 text-text-secondary">{issue.recipient}</td>
                    <td className="px-4 py-3.5 text-text-muted">{issue.performedBy}</td>
                    <td className="px-4 py-3.5 text-text-muted text-xs">{issue.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(filter === 'All' || filter === 'Returns') && returns.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-text-primary mb-3">Pending Asset Returns</h2>
          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border-subtle">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Item ID</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Quantity</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">From</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Performed By</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {returns.map((ret, i) => (
                  <tr
                    key={ret.id}
                    className="border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer"
                    onClick={() => showToast(`Opening ${ret.id} details`, 'info')}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <RefreshCw size={14} className="text-dq-orange" strokeWidth={1.5} />
                        <span className="font-mono text-[12px] text-text-muted">{ret.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-text-primary font-medium">{ret.itemId}</td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="font-mono text-text-primary">{ret.quantity}</span>
                    </td>
                    <td className="px-4 py-3.5 text-text-secondary">{ret.recipient}</td>
                    <td className="px-4 py-3.5 text-text-muted">{ret.performedBy}</td>
                    <td className="px-4 py-3.5 text-text-muted text-xs">{ret.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(filter === 'All' || filter === 'Onboarding') && onboardingTransitions.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-text-primary mb-3">Onboarding Asset Assignments</h2>
          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border-subtle">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Employee</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Start Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Asset Tasks</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {onboardingTransitions.map((transition, i) => {
                  const employee = employees.find(e => e.id === transition.employeeId)
                  const assetTasks = transition.tasks.filter(t => t.label.toLowerCase().includes('laptop') || t.label.toLowerCase().includes('office 365'))
                  const assetTasksComplete = assetTasks.filter(t => t.done).length

                  return (
                    <tr
                      key={transition.id}
                      className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                        i === onboardingTransitions.length - 1 ? 'border-b-0' : ''
                      }`}
                      onClick={() => showToast(`Opening ${transition.id} details`, 'info')}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <UserPlus size={14} className="text-status-success-text" strokeWidth={1.5} />
                          <span className="font-mono text-[12px] text-text-muted">{transition.id}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-text-primary font-medium">{employee?.name}</td>
                      <td className="px-4 py-3.5 text-text-muted text-xs">{transition.startedDate}</td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-text-secondary">
                          {assetTasksComplete}/{assetTasks.length} asset tasks complete
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={transition.status} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
