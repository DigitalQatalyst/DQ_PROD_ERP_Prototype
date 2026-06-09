import { syncRecords } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import { Activity } from 'lucide-react'

export default function SyncMonitor() {
  const { showToast } = useToast()

  const synced = syncRecords.filter(s => s.status === 'Synced').length
  const pending = syncRecords.filter(s => s.status === 'Pending').length
  const failed = syncRecords.filter(s => s.status === 'Failed').length
  const notSynced = syncRecords.filter(s => s.status === 'Not Synced').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Sync Monitor</h1>
      <p className="text-sm text-text-muted mb-6">
        Real-time Business Central sync status monitor.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Synced</p>
          <p className="text-2xl font-bold text-status-success-text">{synced}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending</p>
          <p className="text-2xl font-bold text-status-warning-text">{pending}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Failed</p>
          <p className="text-2xl font-bold text-status-error-text">{failed}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Not Synced</p>
          <p className="text-2xl font-bold text-text-primary">{notSynced}</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Sync ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Object Ref</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Entity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Ref</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Attempt</th>
            </tr>
          </thead>
          <tbody>
            {syncRecords.map((record, i) => (
              <tr
                key={record.id}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                  i === syncRecords.length - 1 ? 'border-b-0' : ''
                } ${record.status === 'Failed' ? 'bg-status-error-surface/20' : ''}`}
                onClick={() => showToast(`Opening ${record.id} details`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <span className="font-mono text-[12px] text-text-muted">{record.id}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-dq-orange" strokeWidth={1.5} />
                    <span className="font-mono text-[12px] text-text-primary">{record.objectRef}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-text-muted">{record.objectType}</td>
                <td className="px-4 py-3.5 text-text-secondary text-xs">{record.entity}</td>
                <td className="px-4 py-3.5">
                  {record.bcRef ? (
                    <span className="font-mono text-[11px] text-status-success-text">{record.bcRef}</span>
                  ) : (
                    <span className="text-text-disabled text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={record.status} size="sm" />
                  {record.retryCount && record.retryCount > 0 && (
                    <span className="ml-2 text-[10px] text-text-muted">Retry {record.retryCount}</span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <div>
                    <p className="text-xs text-text-muted">{record.lastAttempt}</p>
                    {record.errorMessage && (
                      <p className="text-[10px] text-status-error-text mt-0.5">{record.errorMessage}</p>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
