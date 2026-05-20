import { CheckCircle, AlertCircle, RefreshCw, Zap } from 'lucide-react'
import { kpis } from '../data/fixtures'
import { useToast } from '../components/Toast'

const connectors = [
  { id: 'CON-001', name: 'Business Central MENA', endpoint: 'https://api.businesscentral.dynamics.com/v2.0/DQ-MENA-001', status: 'Connected', lastCheck: '20 May 2026 07:30', version: 'v2.0', authMethod: 'OAuth 2.0', entity: 'DigitalQatalyst MENA' },
  { id: 'CON-002', name: 'Business Central East Africa', endpoint: 'https://api.businesscentral.dynamics.com/v2.0/DQ-EA-002', status: 'Connected', lastCheck: '20 May 2026 07:30', version: 'v2.0', authMethod: 'OAuth 2.0', entity: 'DigitalQatalyst East Africa' },
  { id: 'CON-003', name: 'Business Central Iberia', endpoint: 'https://api.businesscentral.dynamics.com/v2.0/DQ-IB-003', status: 'Warning', lastCheck: '20 May 2026 07:30', version: 'v2.0', authMethod: 'OAuth 2.0', entity: 'DigitalQatalyst Iberia', note: 'Token refresh pending — auto-renews in 2h' },
]

const webhooks = [
  { id: 'WH-001', event: 'Invoice Posted', target: '/webhooks/bc/invoice-posted', status: 'Active', lastTriggered: '18 May 2026 11:42' },
  { id: 'WH-002', event: 'Vendor Created', target: '/webhooks/bc/vendor-created', status: 'Active', lastTriggered: '16 May 2026 14:30' },
  { id: 'WH-003', event: 'Payment Made', target: '/webhooks/bc/payment-made', status: 'Active', lastTriggered: '18 May 2026 11:42' },
  { id: 'WH-004', event: 'Sync Error', target: '/webhooks/bc/sync-error', status: 'Active', lastTriggered: '17 May 2026 09:15' },
]

const statusConfig = {
  Connected: { icon: <CheckCircle size={14} className="text-status-success" strokeWidth={1.5} />, cls: 'bg-status-success-surface text-status-success-text' },
  Warning: { icon: <AlertCircle size={14} className="text-status-warning" strokeWidth={1.5} />, cls: 'bg-status-warning-surface text-status-warning-text' },
  Error: { icon: <AlertCircle size={14} className="text-status-error" strokeWidth={1.5} />, cls: 'bg-status-error-surface text-status-error-text' },
}

export default function APIConnectorMapping() {
  const { showToast } = useToast()

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">API / Connector Mapping</h1>
      <p className="text-sm text-text-muted mb-6">Business Central API connector configuration, field mapping, and connection health monitoring.</p>

      {/* Health summary */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="p-4 bg-status-success-surface rounded-card border border-status-success/20">
          <p className="text-xs font-semibold text-status-success-text mb-1">Connector Status</p>
          <p className="text-xl font-bold font-mono text-text-primary">{kpis.bcConnectorStatus}</p>
          <p className="text-xs text-text-muted">{connectors.filter(c => c.status === 'Connected').length} of {connectors.length} connected</p>
        </div>
        <div className="p-4 bg-navy-50 rounded-card border border-dq-navy/10">
          <p className="text-xs font-semibold text-dq-navy mb-1">Sync Success Rate (7d)</p>
          <p className="text-xl font-bold font-mono text-text-primary">{kpis.syncSuccessRate7d}%</p>
        </div>
        <div className="p-4 bg-status-error-surface rounded-card border border-status-error/20">
          <p className="text-xs font-semibold text-status-error-text mb-1">Failed Sync Records</p>
          <p className="text-xl font-bold font-mono text-text-primary">{kpis.failedSyncRecords}</p>
          <p className="text-xs text-text-muted">In retry queue: {kpis.retryQueue}</p>
        </div>
      </div>

      {/* Connectors */}
      <p className="text-sm font-semibold text-text-primary mb-3">BC API Connectors</p>
      <div className="space-y-3 mb-8">
        {connectors.map((con) => {
          const cfg = statusConfig[con.status as keyof typeof statusConfig]
          return (
            <div key={con.id} className={`p-5 bg-white rounded-card border shadow-sm ${con.status === 'Warning' ? 'border-status-warning/30' : 'border-border-subtle'}`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono text-text-disabled">{con.id}</span>
                    <span className={`flex items-center gap-1 text-xs font-semibold rounded-pill px-2 py-0.5 ${cfg.cls}`}>
                      {cfg.icon}{con.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-text-primary">{con.name}</p>
                  <p className="text-xs text-text-muted">{con.entity}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => showToast(`Connection test for ${con.id}: ${con.status}.`, 'info')}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-btn border border-border-default text-text-muted hover:bg-surface-1 transition-colors"
                  >
                    <Zap size={11} strokeWidth={1.5} />
                    Test
                  </button>
                  <button
                    onClick={() => showToast(`Connector ${con.id} settings opened.`, 'info')}
                    className="px-3 py-1.5 text-xs font-semibold rounded-btn border border-dq-navy text-dq-navy hover:bg-navy-50 transition-colors"
                  >
                    Configure
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="text-text-muted mb-0.5">Endpoint</p>
                  <p className="font-mono text-text-primary truncate">{con.endpoint}</p>
                </div>
                <div>
                  <p className="text-text-muted mb-0.5">Auth Method</p>
                  <p className="font-semibold text-text-primary">{con.authMethod}</p>
                </div>
                <div>
                  <p className="text-text-muted mb-0.5">Last Check</p>
                  <p className="text-text-primary">{con.lastCheck}</p>
                </div>
              </div>
              {con.note && (
                <p className="mt-2 text-xs text-status-warning-text flex items-center gap-1">
                  <AlertCircle size={11} strokeWidth={1.5} />
                  {con.note}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Webhooks */}
      <p className="text-sm font-semibold text-text-primary mb-3">BC Event Webhooks</p>
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Event</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Target Endpoint</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Triggered</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {webhooks.map((wh) => (
              <tr key={wh.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-5 py-3 text-xs font-mono text-text-muted">{wh.id}</td>
                <td className="px-4 py-3 text-sm font-medium text-text-primary">{wh.event}</td>
                <td className="px-4 py-3 text-xs font-mono text-dq-navy">{wh.target}</td>
                <td className="px-4 py-3 text-xs text-text-muted">{wh.lastTriggered}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-semibold bg-status-success-surface text-status-success-text rounded-pill px-2 py-0.5">{wh.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
