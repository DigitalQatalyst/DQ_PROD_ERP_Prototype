import { Server, CheckCircle, AlertCircle, RefreshCw, Package } from 'lucide-react'
import { useToast } from '../components/Toast'

const environments = [
  { id: 'ENV-PROD', name: 'Production', url: 'https://dws04.digitalqatalyst.com', status: 'Healthy', version: 'v1.4.2', lastDeploy: '15 May 2026 18:00', deployedBy: 'Tariq Al-Amin', uptime: '99.97%' },
  { id: 'ENV-STG', name: 'Staging', url: 'https://staging.dws04.digitalqatalyst.com', status: 'Healthy', version: 'v1.5.0-rc1', lastDeploy: '19 May 2026 14:30', deployedBy: 'Tariq Al-Amin', uptime: '99.2%' },
  { id: 'ENV-DEV', name: 'Development', url: 'https://dev.dws04.digitalqatalyst.com', status: 'Warning', version: 'v1.5.0-dev', lastDeploy: '20 May 2026 09:15', deployedBy: 'Layla Seitkali', uptime: '94.1%' },
]

const releases = [
  { id: 'REL-1.5.0', title: 'v1.5.0 — Project Economics & AI Briefs', status: 'In Staging', targetDate: '27 May 2026', notes: 'Project Economics Workspace, AI Briefs page, risk alert improvements. CR-002 VAT field mapping fix included.' },
  { id: 'REL-1.4.2', title: 'v1.4.2 — Renewal Alert Threshold Update', status: 'Deployed', targetDate: '15 May 2026', notes: 'Subscription renewal alert threshold changed from 14 to 30 days (CR-004). Minor UI polish.' },
  { id: 'REL-1.4.1', title: 'v1.4.1 — Noor Retail BC Dimension', status: 'Deployed', targetDate: '5 May 2026', notes: 'Added BC-CUST-NR-001 customer dimension for PRJ-2403 billing (CR-003). BC connector fix.' },
]

const featureFlags = [
  { name: 'ai_briefs_v2', description: 'New AI brief generation engine with project context', enabled: false, env: 'Staging only' },
  { name: 'project_economics_v2', description: 'Enhanced project P&L with variance charts', enabled: true, env: 'All environments' },
  { name: 'bc_iberia_connector', description: 'Business Central connector for DQ Iberia entity', enabled: false, env: 'Development only' },
  { name: 'bulk_approval_mode', description: 'Allow approving multiple requests in one action', enabled: false, env: 'Off everywhere' },
]

const envStatusConfig = {
  Healthy: { icon: <CheckCircle size={14} className="text-status-success" strokeWidth={1.5} />, cls: 'bg-status-success-surface text-status-success-text' },
  Warning: { icon: <AlertCircle size={14} className="text-status-warning" strokeWidth={1.5} />, cls: 'bg-status-warning-surface text-status-warning-text' },
  Down: { icon: <AlertCircle size={14} className="text-status-error" strokeWidth={1.5} />, cls: 'bg-status-error-surface text-status-error-text' },
}

export default function ReleaseEnvironmentControl() {
  const { showToast } = useToast()

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Release & Environment Control</h1>
      <p className="text-sm text-text-muted mb-6">Environment management including staging, production deployments, and feature flag configuration.</p>

      {/* Environments */}
      <p className="text-sm font-semibold text-text-primary mb-3">Environments</p>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {environments.map((env) => {
          const cfg = envStatusConfig[env.status as keyof typeof envStatusConfig]
          return (
            <div key={env.id} className="p-5 bg-white rounded-card border border-border-subtle shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Server size={16} className="text-dq-navy" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-bold text-text-primary">{env.name}</p>
                    <p className="text-xs font-mono text-text-disabled">{env.id}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold rounded-pill px-2 py-0.5 ${cfg.cls}`}>
                  {cfg.icon}{env.status}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <p className="text-text-muted">Version</p>
                  <p className="font-mono font-semibold text-text-primary">{env.version}</p>
                </div>
                <div>
                  <p className="text-text-muted">Last Deploy</p>
                  <p className="text-text-secondary">{env.lastDeploy}</p>
                  <p className="text-text-muted">by {env.deployedBy}</p>
                </div>
                <div>
                  <p className="text-text-muted">Uptime (30d)</p>
                  <p className="font-semibold text-text-primary">{env.uptime}</p>
                </div>
                <p className="font-mono text-[10px] text-text-disabled truncate">{env.url}</p>
              </div>
              {env.name === 'Staging' && (
                <button
                  onClick={() => showToast('Staging → Production promotion initiated.', 'success')}
                  className="mt-3 w-full px-3 py-1.5 text-xs font-semibold rounded-btn bg-dq-orange text-white hover:opacity-90 transition-opacity"
                >
                  Promote to Production
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Releases */}
      <p className="text-sm font-semibold text-text-primary mb-3">Release History</p>
      <div className="space-y-2 mb-8">
        {releases.map((r) => (
          <div key={r.id} className="flex items-start gap-4 p-4 bg-white rounded-card border border-border-subtle shadow-sm">
            <Package size={16} className="text-dq-navy shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-text-primary">{r.title}</span>
                <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${r.status === 'Deployed' ? 'bg-status-success-surface text-status-success-text' : 'bg-status-info-surface text-status-info-text'}`}>{r.status}</span>
              </div>
              <p className="text-xs text-text-muted">{r.notes}</p>
              <p className="text-xs text-text-disabled mt-0.5">{r.id} · {r.status === 'Deployed' ? 'Deployed' : 'Target'}: {r.targetDate}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Feature flags */}
      <p className="text-sm font-semibold text-text-primary mb-3">Feature Flags</p>
      <div className="space-y-2">
        {featureFlags.map((ff) => (
          <div key={ff.name} className="flex items-center gap-4 p-4 bg-white rounded-card border border-border-subtle shadow-sm">
            <div className="flex-1">
              <p className="text-sm font-mono font-semibold text-text-primary">{ff.name}</p>
              <p className="text-xs text-text-muted">{ff.description}</p>
              <p className="text-[10px] text-text-disabled mt-0.5">{ff.env}</p>
            </div>
            <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 shrink-0 ${ff.enabled ? 'bg-status-success-surface text-status-success-text' : 'bg-surface-1 text-text-muted border border-border-subtle'}`}>
              {ff.enabled ? 'Enabled' : 'Disabled'}
            </span>
            <button
              onClick={() => showToast(`Feature flag "${ff.name}" ${ff.enabled ? 'disabled' : 'enabled'}.`, 'success')}
              className="px-3 py-1 text-xs font-semibold rounded-btn border border-dq-navy text-dq-navy hover:bg-navy-50 transition-colors shrink-0"
            >
              {ff.enabled ? 'Disable' : 'Enable'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
