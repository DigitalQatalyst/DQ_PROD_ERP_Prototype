import { Link } from 'react-router-dom'
import { Users, Calendar, UserPlus, FileText, ClipboardList, TrendingUp } from 'lucide-react'
import KPICard from '../../components/KPICard'
import AIInsightCard from '../../components/AIInsightCard'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'
import { hrRequests, leaveRequests, transitions, employees } from '../../data/fixtures'

const pendingApprovals = leaveRequests.filter((l) => l.status === 'Pending Approval')
const openHRReqs = hrRequests.filter((r) => r.status === 'In Review' || r.status === 'Clarification Needed')
const transitionsInProgress = transitions.filter((t) => t.status === 'In Progress')

export default function HRHome() {
  return (
    <div>
      <p className="text-sm text-text-muted mb-6">
        Good morning, Fatima. People operations overview for DQ across all entities.
      </p>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <KPICard label="Open HR Requests" value={openHRReqs.length} icon={<FileText size={20} strokeWidth={1.5} />} />
        <KPICard label="Pending Leave Approvals" value={pendingApprovals.length} variant="warning" icon={<Calendar size={20} strokeWidth={1.5} />} />
        <KPICard label="Transitions In Progress" value={transitionsInProgress.length} icon={<UserPlus size={20} strokeWidth={1.5} />} />
        <KPICard label="Workforce" value={employees.filter((e) => e.status === 'Active').length} sub={`${employees.length} total incl. on-/off-boarding`} icon={<Users size={20} strokeWidth={1.5} />} />
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-6">
        {/* Left — pending approvals */}
        <div className="space-y-6">
          <div className="bg-surface-1 rounded-card shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Pending Your Approval</h2>
            <div className="space-y-3">
              {pendingApprovals.map((l) => {
                const emp = employees.find((e) => e.id === l.employeeId)
                return (
                  <div key={l.id} className="bg-white rounded-card p-4 border border-border-subtle">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <RequestIDTag id={l.id} />
                          <span className="text-[11px] font-semibold uppercase text-text-muted">{l.type} Leave</span>
                        </div>
                        <p className="text-sm font-medium text-text-primary">{emp?.name} · {l.days} days</p>
                        <p className="text-xs text-text-muted mt-0.5">{l.startDate} → {l.endDate}{l.reason ? ` · ${l.reason}` : ''}</p>
                      </div>
                      <Link to="/leave-management" className="px-3 py-1.5 rounded-btn text-xs font-semibold bg-dq-orange text-white hover:opacity-90 transition-opacity">
                        Review
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <AIInsightCard title="AI HR Brief">
            Daniel Kimani's onboarding (TR-001) has 2 outstanding asset tasks before his start date. Priya Menon's offboarding (TR-002) is on track but laptop return is still pending. Maya Sharma's 10-day annual leave request is awaiting your approval.
          </AIInsightCard>
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <ClipboardList size={16} className="text-dq-orange" strokeWidth={1.5} />
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link to="/employee-register" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ Employee Register</Link>
              <Link to="/hr-requests" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ HR Service Request Centre</Link>
              <Link to="/hr-ops" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ HR Operations Console</Link>
              <Link to="/leave-management" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ Leave Management</Link>
              <Link to="/onboarding-offboarding" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ Onboarding / Offboarding Tracker</Link>
            </div>
          </div>

          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <TrendingUp size={16} className="text-dq-orange" strokeWidth={1.5} />
              Open HR Work
            </h3>
            <div className="space-y-2">
              {openHRReqs.slice(0, 4).map((r) => (
                <div key={r.id} className="flex items-center justify-between text-xs">
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="font-medium text-text-primary truncate">{r.type}</p>
                    <p className="text-text-muted truncate">{r.description}</p>
                  </div>
                  <StatusBadge status={r.status} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
