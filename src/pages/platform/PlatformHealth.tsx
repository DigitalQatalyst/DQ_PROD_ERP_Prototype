import { useState } from 'react'
import { Activity, CheckCircle2, AlertTriangle, Wrench, Zap, Globe, Server, Clock } from 'lucide-react'

interface ServiceHealth {
  id: string
  serviceName: string
  serviceType: 'Core API' | 'BC Integration' | 'Auth Service' | 'Background Jobs' | 'Notification Service' | 'AI Engine' | 'Storage' | 'Audit Logger'
  status: 'Operational' | 'Degraded' | 'Down' | 'Maintenance'
  uptimePercent: number
  avgResponseMs: number
  p99ResponseMs: number
  errorRatePct: number
  lastIncident: string
  lastCheckedAt: string
  checksLast24h: number
  incidentsLast30d: number
  region: 'UAE North' | 'UAE South' | 'Global CDN'
  version: string
}

const services: ServiceHealth[] = [
  { id: 'SVC-001', serviceName: 'DWS.04 Core API', serviceType: 'Core API', status: 'Operational', uptimePercent: 99.97, avgResponseMs: 112, p99ResponseMs: 340, errorRatePct: 0.02, lastIncident: '14 Apr 2026', lastCheckedAt: '10 Jun 2026, 14:30', checksLast24h: 288, incidentsLast30d: 0, region: 'UAE North', version: 'v4.6.2' },
  { id: 'SVC-002', serviceName: 'BC Sync Engine', serviceType: 'BC Integration', status: 'Degraded', uptimePercent: 97.4, avgResponseMs: 1840, p99ResponseMs: 6200, errorRatePct: 4.8, lastIncident: '09 Jun 2026', lastCheckedAt: '10 Jun 2026, 14:30', checksLast24h: 288, incidentsLast30d: 3, region: 'UAE North', version: 'v2.3.1' },
  { id: 'SVC-003', serviceName: 'Auth & SSO', serviceType: 'Auth Service', status: 'Operational', uptimePercent: 99.99, avgResponseMs: 48, p99ResponseMs: 130, errorRatePct: 0.00, lastIncident: '02 Mar 2026', lastCheckedAt: '10 Jun 2026, 14:30', checksLast24h: 288, incidentsLast30d: 0, region: 'UAE North', version: 'v3.1.0' },
  { id: 'SVC-004', serviceName: 'Background Job Runner', serviceType: 'Background Jobs', status: 'Operational', uptimePercent: 99.85, avgResponseMs: 0, p99ResponseMs: 0, errorRatePct: 0.15, lastIncident: '28 Apr 2026', lastCheckedAt: '10 Jun 2026, 14:29', checksLast24h: 288, incidentsLast30d: 1, region: 'UAE North', version: 'v2.8.4' },
  { id: 'SVC-005', serviceName: 'Email Notifications', serviceType: 'Notification Service', status: 'Operational', uptimePercent: 99.90, avgResponseMs: 220, p99ResponseMs: 880, errorRatePct: 0.10, lastIncident: '05 May 2026', lastCheckedAt: '10 Jun 2026, 14:30', checksLast24h: 288, incidentsLast30d: 1, region: 'Global CDN', version: 'v1.9.3' },
  { id: 'SVC-006', serviceName: 'AI Classification Engine', serviceType: 'AI Engine', status: 'Operational', uptimePercent: 99.80, avgResponseMs: 380, p99ResponseMs: 1100, errorRatePct: 0.05, lastIncident: '18 May 2026', lastCheckedAt: '10 Jun 2026, 14:29', checksLast24h: 288, incidentsLast30d: 0, region: 'UAE North', version: 'v1.4.1' },
  { id: 'SVC-007', serviceName: 'AI Evidence Checker', serviceType: 'AI Engine', status: 'Operational', uptimePercent: 99.75, avgResponseMs: 490, p99ResponseMs: 1400, errorRatePct: 0.08, lastIncident: '22 Apr 2026', lastCheckedAt: '10 Jun 2026, 14:29', checksLast24h: 288, incidentsLast30d: 0, region: 'UAE North', version: 'v1.2.0' },
  { id: 'SVC-008', serviceName: 'Document Storage', serviceType: 'Storage', status: 'Operational', uptimePercent: 99.99, avgResponseMs: 65, p99ResponseMs: 200, errorRatePct: 0.00, lastIncident: '10 Jan 2026', lastCheckedAt: '10 Jun 2026, 14:30', checksLast24h: 288, incidentsLast30d: 0, region: 'UAE North', version: 'v5.2.0' },
  { id: 'SVC-009', serviceName: 'Audit Logger', serviceType: 'Audit Logger', status: 'Operational', uptimePercent: 100.00, avgResponseMs: 28, p99ResponseMs: 80, errorRatePct: 0.00, lastIncident: '(none)', lastCheckedAt: '10 Jun 2026, 14:30', checksLast24h: 288, incidentsLast30d: 0, region: 'UAE North', version: 'v2.0.5' },
  { id: 'SVC-010', serviceName: 'DQ Admin Portal API', serviceType: 'Core API', status: 'Operational', uptimePercent: 99.95, avgResponseMs: 95, p99ResponseMs: 280, errorRatePct: 0.02, lastIncident: '30 Mar 2026', lastCheckedAt: '10 Jun 2026, 14:30', checksLast24h: 288, incidentsLast30d: 0, region: 'UAE North', version: 'v4.6.2' },
  { id: 'SVC-011', serviceName: 'Mobile API Gateway', serviceType: 'Core API', status: 'Maintenance', uptimePercent: 0.00, avgResponseMs: 0, p99ResponseMs: 0, errorRatePct: 0.00, lastIncident: '(scheduled maintenance)', lastCheckedAt: '10 Jun 2026, 08:00', checksLast24h: 96, incidentsLast30d: 0, region: 'UAE North', version: 'v1.1.0' },
  { id: 'SVC-012', serviceName: 'Webhook Receiver', serviceType: 'Notification Service', status: 'Operational', uptimePercent: 99.88, avgResponseMs: 145, p99ResponseMs: 420, errorRatePct: 0.12, lastIncident: '11 May 2026', lastCheckedAt: '10 Jun 2026, 14:30', checksLast24h: 288, incidentsLast30d: 1, region: 'UAE North', version: 'v1.5.2' },
  { id: 'SVC-013', serviceName: 'Rate Limiter', serviceType: 'Auth Service', status: 'Operational', uptimePercent: 99.99, avgResponseMs: 8, p99ResponseMs: 22, errorRatePct: 0.00, lastIncident: '(none)', lastCheckedAt: '10 Jun 2026, 14:30', checksLast24h: 288, incidentsLast30d: 0, region: 'Global CDN', version: 'v3.0.1' },
  { id: 'SVC-014', serviceName: 'Monitoring Agent', serviceType: 'Background Jobs', status: 'Operational', uptimePercent: 100.00, avgResponseMs: 12, p99ResponseMs: 35, errorRatePct: 0.00, lastIncident: '(none)', lastCheckedAt: '10 Jun 2026, 14:30', checksLast24h: 288, incidentsLast30d: 0, region: 'UAE North', version: 'v2.1.3' },
]

export default function PlatformHealth() {
  const [filter, setFilter] = useState<'All' | 'Operational' | 'Degraded' | 'Maintenance'>('All')

  const activeServices = services.filter(s => s.status !== 'Maintenance')
  const degradedServices = services.filter(s => s.status === 'Degraded' || s.status === 'Down')
  const weightedUptime = (
    activeServices.reduce((sum, s) => sum + s.uptimePercent, 0) / activeServices.length
  ).toFixed(2)

  const stats = {
    total: services.length,
    operational: services.filter(s => s.status === 'Operational').length,
    systemUptime: weightedUptime,
    activeIncidents: degradedServices.length,
  }

  const filtered = filter === 'All' ? services : services.filter(s => s.status === filter)

  const statusColor = (status: string) => {
    if (status === 'Operational') return 'bg-status-success-surface text-status-success-text'
    if (status === 'Degraded') return 'bg-status-warning-surface text-status-warning-text'
    if (status === 'Down') return 'bg-status-error-surface text-status-error-text'
    if (status === 'Maintenance') return 'bg-status-info-surface text-status-info-text'
    return 'bg-surface-1 text-text-muted'
  }

  const uptimeBarColor = (pct: number, status: string) => {
    if (status === 'Maintenance') return 'bg-status-info'
    if (pct >= 99.9) return 'bg-status-success'
    if (pct >= 98) return 'bg-status-warning'
    return 'bg-status-error'
  }

  const responseColor = (ms: number) => {
    if (ms === 0) return 'text-text-disabled'
    if (ms < 200) return 'text-status-success-text'
    if (ms < 800) return 'text-status-warning-text'
    return 'text-status-error-text'
  }

  const serviceTypeIcon = (type: string) => {
    if (type === 'Core API') return <Server size={13} className="text-dq-navy" strokeWidth={1.5} />
    if (type === 'BC Integration') return <Globe size={13} className="text-status-warning" strokeWidth={1.5} />
    if (type === 'AI Engine') return <Zap size={13} className="text-dq-orange" strokeWidth={1.5} />
    if (type === 'Auth Service') return <Activity size={13} className="text-status-success" strokeWidth={1.5} />
    return <Activity size={13} className="text-text-muted" strokeWidth={1.5} />
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Platform Health</h1>
          <p className="text-sm text-text-muted">Real-time service uptime, API health, sync status and performance metrics</p>
        </div>
      </div>

      {degradedServices.length > 0 && (
        <div className="mb-5 flex items-center gap-3 px-4 py-3 bg-status-warning-surface border border-status-warning/30 rounded-card">
          <AlertTriangle size={16} className="text-status-warning flex-shrink-0" strokeWidth={2} />
          <div className="flex-1">
            <span className="text-sm font-semibold text-status-warning-text">
              {degradedServices.length} service{degradedServices.length > 1 ? 's' : ''} degraded
            </span>
            <span className="text-sm text-status-warning-text ml-2">
              — {degradedServices.map(s => s.serviceName).join(', ')}
            </span>
            <span className="text-xs text-text-muted ml-2">· On-call integration team notified via PagerDuty</span>
          </div>
          <span className="text-xs text-status-warning-text font-medium whitespace-nowrap">Last checked: 14:30 GST</span>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Total Services</p>
            <Server size={14} className="text-dq-navy" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
          <p className="text-xs text-text-disabled mt-0.5">monitored</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Operational</p>
            <CheckCircle2 size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-success-text">{stats.operational}</p>
          <p className="text-xs text-text-disabled mt-0.5">of {stats.total} services</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">System Uptime</p>
            <Activity size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.systemUptime}%</p>
          <p className="text-xs text-text-disabled mt-0.5">weighted average</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active Incidents</p>
            <AlertTriangle size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.activeIncidents}</p>
          <p className="text-xs text-text-disabled mt-0.5">requires attention</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Operational', 'Degraded', 'Maintenance'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-btn transition-colors ${
              filter === f
                ? 'bg-dq-navy text-white'
                : 'bg-surface-1 text-text-muted hover:bg-border-subtle'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-1 border-b border-border-subtle">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Service</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Uptime (30d)</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Avg (ms)</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">p99 (ms)</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Error %</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Incidents (30d)</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Incident</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Region</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Version</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((svc) => (
                <tr key={svc.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {serviceTypeIcon(svc.serviceType)}
                      <div>
                        <p className="font-semibold text-text-primary">{svc.serviceName}</p>
                        <p className="text-xs text-text-disabled font-mono">{svc.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary whitespace-nowrap">{svc.serviceType}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${statusColor(svc.status)}`}>
                      {svc.status === 'Operational' && <span className="w-1.5 h-1.5 rounded-full bg-status-success mr-1.5 inline-block" />}
                      {svc.status === 'Degraded' && <span className="w-1.5 h-1.5 rounded-full bg-status-warning mr-1.5 inline-block animate-pulse" />}
                      {svc.status === 'Maintenance' && <Wrench size={10} className="mr-1" />}
                      {svc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <div className="flex-1 h-1.5 bg-surface-1 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${uptimeBarColor(svc.uptimePercent, svc.status)}`}
                          style={{ width: svc.status === 'Maintenance' ? '100%' : `${Math.min(svc.uptimePercent, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-text-secondary whitespace-nowrap">
                        {svc.status === 'Maintenance' ? '—' : `${svc.uptimePercent}%`}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-mono font-semibold ${responseColor(svc.avgResponseMs)}`}>
                      {svc.avgResponseMs > 0 ? svc.avgResponseMs : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-mono ${responseColor(svc.p99ResponseMs)}`}>
                      {svc.p99ResponseMs > 0 ? svc.p99ResponseMs : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-mono font-semibold ${
                      svc.errorRatePct === 0 ? 'text-text-disabled' :
                      svc.errorRatePct < 1 ? 'text-status-warning-text' : 'text-status-error-text'
                    }`}>
                      {svc.status === 'Maintenance' ? '—' : `${svc.errorRatePct.toFixed(2)}%`}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold ${
                      svc.incidentsLast30d === 0 ? 'text-text-disabled' :
                      svc.incidentsLast30d >= 3 ? 'text-status-error-text' : 'text-status-warning-text'
                    }`}>
                      {svc.incidentsLast30d > 0 ? svc.incidentsLast30d : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Clock size={11} className="text-text-disabled flex-shrink-0" />
                      <span className="text-xs text-text-secondary">{svc.lastIncident}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary">{svc.region}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-mono text-text-disabled bg-surface-1 px-1.5 py-0.5 rounded">{svc.version}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-status-info-surface border border-status-info/20 rounded-card">
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Incident Response</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Degraded or Down services automatically trigger PagerDuty alerts to the on-call Integration Team. SLA: <strong>acknowledge within 15 minutes</strong>, initial triage within 30 min, escalation to IT Director if unresolved after 1 hour. BC Sync Engine incidents additionally alert Tariq Al-Amin (Finance) due to downstream payment impact.
          </p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Maintenance Windows</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Scheduled maintenance is posted <strong>48 hours in advance</strong> via in-app banner and email notification to all active users. BC sync is paused automatically during any maintenance window affecting the Core API or BC Sync Engine. Current window: Mobile API Gateway — 10 Jun 2026, 08:00–16:00 GST (iOS app v2 deployment).
          </p>
        </div>
      </div>
    </div>
  )
}
