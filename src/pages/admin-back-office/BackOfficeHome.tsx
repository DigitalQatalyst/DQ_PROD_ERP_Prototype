import { Link } from 'react-router-dom'
import { Plane, FileText, Briefcase, AlertTriangle } from 'lucide-react'
import KPICard from '../../components/KPICard'
import AIInsightCard from '../../components/AIInsightCard'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'
import { adminRequests } from '../../data/fixtures'

const open = adminRequests.filter((r) => r.status !== 'Fulfilled')
const slaAtRisk = open.filter((r) => r.daysOpen > r.slaDays)
const blocked = open.filter((r) => r.status === 'Blocked')

export default function BackOfficeHome() {
  return (
    <div>
      <p className="text-sm text-text-muted mb-6">
        Good morning, Maya. Back-office operations across travel, admin, office support, and documentation.
      </p>

      <div className="grid grid-cols-4 gap-5 mb-8">
        <KPICard label="Open Requests" value={open.length} icon={<Briefcase size={20} strokeWidth={1.5} />} />
        <KPICard label="SLA at Risk" value={slaAtRisk.length} variant="warning" icon={<AlertTriangle size={20} strokeWidth={1.5} />} />
        <KPICard label="Blocked" value={blocked.length} variant="error" icon={<AlertTriangle size={20} strokeWidth={1.5} />} />
        <KPICard label="Travel in Flight" value={adminRequests.filter((r) => r.type === 'Travel' && r.status !== 'Fulfilled').length} icon={<Plane size={20} strokeWidth={1.5} />} />
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-6">
        <div className="space-y-6">
          <div className="bg-surface-1 rounded-card shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">SLA at Risk</h2>
            {slaAtRisk.length === 0 ? (
              <p className="text-sm text-text-muted">No requests breaching SLA.</p>
            ) : (
              <div className="space-y-3">
                {slaAtRisk.map((r) => (
                  <div key={r.id} className="bg-white rounded-card p-4 border border-border-subtle flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <RequestIDTag id={r.id} />
                        <span className="text-[11px] font-semibold uppercase text-text-muted">{r.type}</span>
                      </div>
                      <p className="text-sm font-medium text-text-primary">{r.description}</p>
                      <p className="text-xs text-text-muted mt-0.5">{r.requester} · Submitted {r.submittedDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-status-error-text">{r.daysOpen}d</p>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">vs {r.slaDays}d SLA</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <AIInsightCard title="AI Back-Office Brief">
            ADM-007 Portugal travel is blocked on bank confirmation — recommend escalating to Mohammed Rashid. ADM-002 visa support is awaiting HR-002 employment letter (cross-domain dependency). Document support volume is up 40% vs last week.
          </AIInsightCard>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/travel-admin" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ Travel & Admin Request Centre</Link>
              <Link to="/office-services" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ Office Services Request Tracker</Link>
              <Link to="/backoffice-fulfilment" className="block text-sm text-text-secondary hover:text-dq-orange transition-colors">→ Back-Office Fulfilment Console</Link>
            </div>
          </div>

          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Recently Submitted</h3>
            <div className="space-y-2">
              {adminRequests.slice(0, 4).map((r) => (
                <div key={r.id} className="flex items-center justify-between text-xs">
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="font-medium text-text-primary truncate">{r.type}</p>
                    <p className="text-text-muted truncate">{r.requester}</p>
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
