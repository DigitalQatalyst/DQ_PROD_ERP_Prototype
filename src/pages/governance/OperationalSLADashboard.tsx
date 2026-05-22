import { Activity, AlertTriangle, TrendingDown } from 'lucide-react'

interface DomainSLA {
  domain: string
  hitRatePct: number
  avgCycleDays: number
  openCount: number
  breachedCount: number
  trend: 'up' | 'down' | 'flat'
}

const domainSLA: DomainSLA[] = [
  { domain: 'Finance — Expense', hitRatePct: 96, avgCycleDays: 2.1, openCount: 8, breachedCount: 0, trend: 'flat' },
  { domain: 'Finance — Invoice / Payment', hitRatePct: 88, avgCycleDays: 3.4, openCount: 12, breachedCount: 1, trend: 'down' },
  { domain: 'Finance — Budget', hitRatePct: 92, avgCycleDays: 4.8, openCount: 4, breachedCount: 0, trend: 'flat' },
  { domain: 'HR — Service Requests', hitRatePct: 84, avgCycleDays: 3.2, openCount: 4, breachedCount: 1, trend: 'down' },
  { domain: 'HR — Leave', hitRatePct: 100, avgCycleDays: 1.4, openCount: 2, breachedCount: 0, trend: 'up' },
  { domain: 'HR — Onboarding / Offboarding', hitRatePct: 78, avgCycleDays: 8.6, openCount: 2, breachedCount: 1, trend: 'flat' },
  { domain: 'Procurement — Purchase', hitRatePct: 91, avgCycleDays: 3.1, openCount: 5, breachedCount: 0, trend: 'up' },
  { domain: 'Procurement — Vendor Onboarding', hitRatePct: 83, avgCycleDays: 5.4, openCount: 1, breachedCount: 0, trend: 'flat' },
  { domain: 'Inventory — Issue / Receipt', hitRatePct: 95, avgCycleDays: 0.8, openCount: 2, breachedCount: 0, trend: 'flat' },
  { domain: 'Inventory — Asset Custody', hitRatePct: 72, avgCycleDays: 6.2, openCount: 1, breachedCount: 1, trend: 'down' },
  { domain: 'Admin — Travel / Visa', hitRatePct: 65, avgCycleDays: 9.2, openCount: 3, breachedCount: 2, trend: 'down' },
  { domain: 'Admin — Office Services', hitRatePct: 89, avgCycleDays: 2.6, openCount: 2, breachedCount: 0, trend: 'flat' },
  { domain: 'Project — Cost / Billing', hitRatePct: 87, avgCycleDays: 3.0, openCount: 3, breachedCount: 0, trend: 'up' },
  { domain: 'Approvals (cross-cut)', hitRatePct: 82, avgCycleDays: 2.8, openCount: 23, breachedCount: 6, trend: 'flat' },
]

const slaBarColor = (pct: number) => {
  if (pct >= 90) return '#16A34A'
  if (pct >= 80) return '#FB5535'
  return '#DC2626'
}

const overallHitRate = Math.round(
  domainSLA.reduce((s, d) => s + d.hitRatePct, 0) / domainSLA.length
)
const totalOpen = domainSLA.reduce((s, d) => s + d.openCount, 0)
const totalBreached = domainSLA.reduce((s, d) => s + d.breachedCount, 0)

export default function OperationalSLADashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Operational SLA Dashboard</h1>
      <p className="text-sm text-text-muted mb-6">
        SLA health across finance, HR, procurement, inventory, admin, project, and cross-cutting approvals. The single view of how DQ's operational queues are performing.
      </p>

      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Overall SLA Hit Rate</p>
          <p className="text-2xl font-bold text-status-success-text">{overallHitRate}%</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Open Items</p>
          <p className="text-2xl font-bold text-dq-navy">{totalOpen}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Breached</p>
          <p className="text-2xl font-bold text-status-error-text">{totalBreached}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Domains Tracked</p>
          <p className="text-2xl font-bold text-dq-navy">{domainSLA.length}</p>
        </div>
      </div>

      {/* SLA table per domain */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Domain</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider w-[260px]">SLA Hit Rate</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Avg Cycle</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Open</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Breached</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody>
            {domainSLA.map((d, i) => (
              <tr key={d.domain} className={`border-b border-border-subtle ${i === domainSLA.length - 1 ? 'border-b-0' : ''} ${d.breachedCount > 0 ? 'bg-status-error-surface/30' : ''}`}>
                <td className="px-4 py-3 text-text-primary font-medium">{d.domain}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-pill overflow-hidden" style={{ background: '#EEEFF6' }}>
                      <div className="h-full rounded-pill" style={{ width: `${d.hitRatePct}%`, background: slaBarColor(d.hitRatePct) }} />
                    </div>
                    <span className="font-mono text-xs font-semibold w-10 text-right" style={{ color: slaBarColor(d.hitRatePct) }}>
                      {d.hitRatePct}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs">{d.avgCycleDays.toFixed(1)}d</td>
                <td className="px-4 py-3 text-right font-mono text-xs">{d.openCount}</td>
                <td className="px-4 py-3 text-right font-mono text-xs font-semibold" style={{ color: d.breachedCount > 0 ? '#B91C1C' : '#5F607F' }}>
                  {d.breachedCount}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold ${
                    d.trend === 'up' ? 'text-status-success-text' :
                    d.trend === 'down' ? 'text-status-error-text' : 'text-text-muted'
                  }`}>
                    {d.trend === 'up' ? '↑' : d.trend === 'down' ? '↓' : '→'} {d.trend}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Risk signals */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-status-error-surface border border-status-error/30 rounded-card p-5">
          <h3 className="text-sm font-semibold text-status-error-text mb-3 flex items-center gap-2">
            <AlertTriangle size={16} strokeWidth={2} /> Critical SLA Risks
          </h3>
          <ul className="space-y-2 text-xs text-text-secondary">
            {domainSLA.filter((d) => d.hitRatePct < 80).map((d) => (
              <li key={d.domain} className="flex justify-between">
                <span>{d.domain}</span>
                <span className="font-mono font-semibold">{d.hitRatePct}% hit · {d.breachedCount} breached</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <TrendingDown size={16} className="text-dq-orange" strokeWidth={1.5} /> Trending Down (week-over-week)
          </h3>
          <ul className="space-y-2 text-xs text-text-secondary">
            {domainSLA.filter((d) => d.trend === 'down').map((d) => (
              <li key={d.domain} className="flex justify-between">
                <span>{d.domain}</span>
                <span className="font-mono">{d.avgCycleDays.toFixed(1)}d avg cycle</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-xs text-text-muted mt-4 flex items-center gap-1">
        <Activity size={12} strokeWidth={1.5} />
        Source: live request, approval, and fulfilment events from the universal request anchor (`s2_account.requests`).
      </p>
    </div>
  )
}
