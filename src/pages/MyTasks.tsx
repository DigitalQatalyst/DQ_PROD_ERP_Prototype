import { useState } from 'react'
import { CheckCircle, Circle, Clock } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import RequestIDTag from '../components/RequestIDTag'
import { useToast } from '../components/Toast'

type TaskType = 'Evidence' | 'Approval' | 'Clarification' | 'Processing' | 'Review'
type TaskStatus = 'Pending' | 'In Progress' | 'Done'

interface Task {
  id: string
  title: string
  linkedRequest?: string
  type: TaskType
  status: TaskStatus
  due: string
  priority: 'High' | 'Normal'
}

const tasks: Task[] = [
  { id: 'TSK-001', title: 'Upload per-diem breakdown for Kenya travel', linkedRequest: 'REQ-2025-0046', type: 'Evidence', status: 'Pending', due: '21 May 2026', priority: 'High' },
  { id: 'TSK-002', title: 'Review and approve AWS infrastructure request', linkedRequest: 'REQ-2025-0045', type: 'Approval', status: 'Pending', due: '22 May 2026', priority: 'High' },
  { id: 'TSK-003', title: 'Clarify tax registration cert for DataStax onboarding', linkedRequest: 'REQ-2025-0044', type: 'Clarification', status: 'In Progress', due: '23 May 2026', priority: 'High' },
  { id: 'TSK-004', title: 'Process Anthropic May invoice for BC sync', linkedRequest: 'REQ-2025-0043', type: 'Processing', status: 'Done', due: '18 May 2026', priority: 'Normal' },
  { id: 'TSK-005', title: 'Review PRJ-2403 budget amendment request', linkedRequest: 'REQ-2025-0048', type: 'Review', status: 'Pending', due: '25 May 2026', priority: 'Normal' },
  { id: 'TSK-006', title: 'Approve Loom subscription renewal or cancel decision', linkedRequest: 'SUB-005', type: 'Approval', status: 'Pending', due: '27 May 2026', priority: 'High' },
  { id: 'TSK-007', title: 'Confirm Mazrui milestone delivery receipt', linkedRequest: 'REQ-2025-0047', type: 'Review', status: 'Pending', due: '28 May 2026', priority: 'High' },
]

const typeColour: Record<TaskType, string> = {
  Evidence: 'bg-status-warning-surface text-status-warning-text',
  Approval: 'bg-navy-50 text-dq-navy',
  Clarification: 'bg-orange-50 text-dq-orange',
  Processing: 'bg-status-info-surface text-status-info-text',
  Review: 'bg-status-success-surface text-status-success-text',
}

export default function MyTasks() {
  const [filter, setFilter] = useState<'All' | TaskStatus>('All')
  const { showToast } = useToast()

  const filtered = tasks.filter((t) => filter === 'All' || t.status === filter)
  const pending = tasks.filter((t) => t.status === 'Pending').length
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">My Tasks</h1>
      <p className="text-sm text-text-muted mb-6">Evidence actions, approval tasks, clarifications, and processing assignments.</p>

      {/* Summary */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-status-error-surface rounded-pill">
          <span className="text-sm font-semibold text-status-error-text">{pending}</span>
          <span className="text-xs text-text-muted">Pending</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-info-surface rounded-pill">
          <span className="text-sm font-semibold text-status-info-text">{inProgress}</span>
          <span className="text-xs text-text-muted">In Progress</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <span className="text-sm font-semibold text-status-success-text">{tasks.filter(t => t.status === 'Done').length}</span>
          <span className="text-xs text-text-muted">Done</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Pending', 'In Progress', 'Done'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((task) => (
          <div key={task.id}
            className="flex items-start gap-4 p-4 bg-white rounded-card border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => task.status !== 'Done' && showToast(`Task ${task.id} marked complete.`, 'success')}
              className="mt-0.5 shrink-0"
            >
              {task.status === 'Done'
                ? <CheckCircle size={20} className="text-status-success" strokeWidth={1.5} />
                : <Circle size={20} className="text-border-default hover:text-dq-orange transition-colors" strokeWidth={1.5} />
              }
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <p className={`text-sm font-medium ${task.status === 'Done' ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                  {task.title}
                </p>
                {task.priority === 'High' && (
                  <span className="text-[10px] font-semibold text-dq-orange bg-orange-50 rounded-pill px-2 py-0.5 shrink-0">
                    HIGH PRIORITY
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                {task.linkedRequest && <RequestIDTag id={task.linkedRequest} />}
                <span className={`text-[11px] font-medium rounded-pill px-2 py-0.5 ${typeColour[task.type]}`}>{task.type}</span>
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Clock size={11} strokeWidth={1.5} />
                  Due {task.due}
                </span>
              </div>
            </div>
            <StatusBadge status={task.status === 'Done' ? 'Approved' : task.status === 'In Progress' ? 'In Review' : 'Pending Approval'} size="sm" />
          </div>
        ))}
      </div>
    </div>
  )
}
