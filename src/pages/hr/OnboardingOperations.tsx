import { UserPlus, CheckCircle2, Circle } from 'lucide-react'
import { transitions, employees } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'

export default function OnboardingOperations() {
  const { showToast } = useToast()
  const onboardingTransitions = transitions.filter(t => t.type === 'Onboarding')
  const inProgress = onboardingTransitions.filter(t => t.status === 'In Progress').length
  const total = onboardingTransitions.length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Onboarding Operations</h1>
      <p className="text-sm text-text-muted mb-6">
        Track onboarding transitions, task completion, and new starter readiness.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Onboarding</p>
          <p className="text-2xl font-bold text-text-primary">{total}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">In Progress</p>
          <p className="text-2xl font-bold text-status-warning-text">{inProgress}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Avg Days to Complete</p>
          <p className="text-2xl font-bold text-text-primary">12</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Completed (30d)</p>
          <p className="text-2xl font-bold text-status-success-text">{onboardingTransitions.filter(t => t.status === 'Complete').length}</p>
        </div>
      </div>

      <div className="space-y-4">
        {onboardingTransitions.map(transition => {
          const employee = employees.find(e => e.id === transition.employeeId)
          const completedTasks = transition.tasks.filter(t => t.done).length
          const totalTasks = transition.tasks.length
          const progress = Math.round((completedTasks / totalTasks) * 100)

          return (
            <div key={transition.id} className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <UserPlus size={20} className="text-dq-orange" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary">{employee?.name}</h3>
                    <p className="text-sm text-text-muted">{employee?.role} • Start: {transition.startedDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={transition.status} />
                  <p className="text-xs text-text-muted mt-1">Target: {transition.targetDate}</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>Progress</span>
                  <span>{completedTasks}/{totalTasks} tasks • {progress}%</span>
                </div>
                <div className="w-full bg-border-subtle rounded-full h-1.5">
                  <div className="bg-dq-orange h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                {transition.tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    {task.done ? (
                      <CheckCircle2 size={16} className="text-status-success-text" strokeWidth={2} />
                    ) : (
                      <Circle size={16} className="text-border-default" strokeWidth={1.5} />
                    )}
                    <span className={task.done ? 'text-text-muted line-through' : 'text-text-primary'}>
                      {task.label}
                    </span>
                    <span className="text-xs text-text-disabled">• {task.owner}</span>
                  </div>
                ))}
              </div>

              {transition.status === 'In Progress' && (
                <button
                  onClick={() => showToast(`Opening ${transition.id} details`, 'info')}
                  className="mt-4 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Update Tasks
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
