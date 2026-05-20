import { RefreshCw, XCircle, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import { syncRecords } from '../data/fixtures'
import { useToast } from '../components/Toast'

const extendedSyncRecords = [
  ...syncRecords,
  { id: 'SYNC-006', objectRef: 'VND-006', objectType: 'Vendor', entity: 'DigitalQatalyst MENA', status: 'Not Synced' as const, lastAttempt: '—', errorMessage: 'No BC record — manual vendor. Sync not applicable.' },
]

const statusConfig: Record<string, { icon: React.ReactNode; cls: string }> = {
  Synced: { icon: <CheckCircle size={16} className="text-status-success" strokeWidth={1.5} />, cls: 'bg-status-success-surface text-status-success-text' },
  Pending: { icon: <Clock size={16} className="text-status-info" strokeWidth={1.5} />, cls: 'bg-status-info-surface text-status-info-text' },
  Failed: { icon: <XCircle size={16} className="text-status-error" strokeWidth={1.5} />, cls: 'bg-status-error-surface text-status-error-text' },
  'Not Synced': { icon: <AlertTriangle size={16} className="text-status-warning" strokeWidth={1.5} />, cls: 'bg-status-warning-surface text-status-warning-text' },
}

export default function SyncErrorQueue() {
  const { showToast } = useToast()

  const failed = extendedSyncRecords.filter(s => s.status === 'Failed')
  const pending = extendedSyncRecords.filter(s => s.status === 'Pending')
  const notSynced = extendedSyncRecords.filter(s => s.status === 'Not Synced')
  const synced = extendedSyncRecords.filter(s => s.status === 'Synced')

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Sync Error Queue</h1>
      <p className="text-sm text-text-muted mb-6">All failed and pending BC sync records requiring manual resolution or retry.</p>

      {/* Summary */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-status-error-surface rounded-pill">
          <XCircle size={13} className="text-status-error" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-error-text">{failed.length}</span>
          <span className="text-xs text-text-muted">Failed</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-info-surface rounded-pill">
          <Clock size={13} className="text-status-info" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-info-text">{pending.length}</span>
          <span className="text-xs text-text-muted">Pending</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-warning-surface rounded-pill">
          <AlertTriangle size={13} className="text-status-warning" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-warning-text">{notSynced.length}</span>
          <span className="text-xs text-text-muted">Not Synced</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <CheckCircle size={13} className="text-status-success" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-success-text">{synced.length}</span>
          <span className="text-xs text-text-muted">Synced</span>
        </div>
        <div className="flex-1" />
        <button
          onClick={() => showToast('Retry queue initiated for all failed records.', 'success')}
          className="flex items-center gap-2 px-4 py-2 rounded-btn bg-dq-navy text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={14} strokeWidth={1.5} />
          Retry All Failed
        </button>
      </div>

      {/* Sync records table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Sync ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Object</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Entity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Attempt</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Error / Note</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {extendedSyncRecords.map((s) => {
              const cfg = statusConfig[s.status]
              return (
                <tr key={s.id} className={`hover:bg-surface-1 transition-colors ${s.status === 'Failed' ? 'bg-status-error-surface/20' : ''}`}>
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono font-semibold text-text-primary">{s.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-mono text-dq-navy font-semibold">{s.objectRef}</span>
                    {(s as any).bcRef && <p className="text-xs font-mono text-status-success-text">{(s as any).bcRef}</p>}
                  </td>
                  <td className="px-4 py-4 text-sm text-text-secondary">{s.objectType}</td>
                  <td className="px-4 py-4 text-xs text-text-muted">{s.entity}</td>
                  <td className="px-4 py-4 text-xs font-mono text-text-muted">{s.lastAttempt}</td>
                  <td className="px-4 py-4">
                    <span className={`flex items-center gap-1 w-fit text-xs font-semibold rounded-pill px-2 py-0.5 ${cfg.cls}`}>
                      {cfg.icon}{s.status}
                    </span>
                    {(s as any).retryCount && <p className="text-[10px] text-text-muted mt-0.5">{(s as any).retryCount} retries</p>}
                  </td>
                  <td className="px-4 py-4 text-xs text-text-muted max-w-[180px]">{s.errorMessage || '—'}</td>
                  <td className="px-4 py-4">
                    {s.status === 'Failed' && (
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => showToast(`Retry initiated for ${s.id}.`, 'success')}
                          className="flex items-center gap-1 text-xs font-semibold text-dq-navy hover:underline"
                        >
                          <RefreshCw size={10} strokeWidth={1.5} />
                          Retry
                        </button>
                        <button
                          onClick={() => showToast(`${s.id} opened for manual resolution.`, 'info')}
                          className="text-xs font-semibold text-dq-orange hover:underline"
                        >
                          Resolve
                        </button>
                      </div>
                    )}
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
