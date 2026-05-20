import { useState } from 'react'
import { Activity, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import BCSyncChip from '../components/BCSyncChip'
import RequestIDTag from '../components/RequestIDTag'
import { useToast } from '../components/Toast'
import { syncRecords, kpis } from '../data/fixtures'

export default function BCIntegrationHealth() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { showToast } = useToast()

  const displayRecords = syncRecords.filter((r) =>
    ['SYNC-001', 'SYNC-003', 'SYNC-004'].includes(r.id)
  )

  const handleRetry = (id: string) => {
    showToast(`Retry initiated for ${id}. BC connector will attempt sync.`, 'info')
  }

  const handleEscalate = (id: string) => {
    showToast(`${id} escalated to Platform Admin.`, 'info')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">BC Integration Health</h1>
      <p className="text-sm text-text-muted mb-6">Layla Seitkali · BC Integration Steward</p>

      {/* Status banner */}
      <div
        className="w-full rounded-card px-6 py-4 mb-6 flex items-center justify-between"
        style={{ background: '#DCFCE7', border: '1px solid #16A34A30' }}
      >
        <div className="flex items-center gap-3">
          <Activity size={20} className="text-status-success" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-semibold text-status-success-text">
              Connector Status: Healthy
            </p>
            <p className="text-xs text-status-success-text opacity-75 mt-0.5">
              Last sync: 18 May 2026 14:23 UTC
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-sm font-medium text-status-success-text hover:underline">
          View connector details
          <ExternalLink size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-surface-1 rounded-card shadow-sm p-5 text-center card-hover">
          <p className="text-3xl font-bold text-status-success-text mb-1">{kpis.syncSuccessRate7d}%</p>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Sync Success Rate (7d)</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-5 text-center card-hover">
          <p className="text-3xl font-bold text-status-error-text mb-1">{kpis.failedSyncRecords}</p>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Failed Records</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-5 text-center card-hover">
          <p className="text-3xl font-bold text-status-warning-text mb-1">{kpis.retryQueue}</p>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Retry Queue</p>
        </div>
      </div>

      {/* Sync records table */}
      <h2 className="text-lg font-semibold text-text-primary mb-4">Sync Records</h2>
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider w-8" />
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Object</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Entity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Reference</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Attempt</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayRecords.map((rec, i) => (
              <>
                <tr
                  key={rec.id}
                  className={`border-b border-border-subtle cursor-pointer hover:bg-surface-1 transition-colors ${
                    expandedId === rec.id ? 'bg-surface-1' : ''
                  } ${i === displayRecords.length - 1 && expandedId !== rec.id ? 'border-b-0' : ''}`}
                  onClick={() => setExpandedId((prev) => (prev === rec.id ? null : rec.id))}
                >
                  <td className="px-3 py-3.5">
                    {expandedId === rec.id ? (
                      <ChevronUp size={14} className="text-text-muted" strokeWidth={1.5} />
                    ) : (
                      <ChevronDown size={14} className="text-text-muted" strokeWidth={1.5} />
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <RequestIDTag id={rec.objectRef} />
                      <span className="text-xs text-text-muted">{rec.objectType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-text-secondary text-xs">{rec.entity}</td>
                  <td className="px-4 py-3.5">
                    {rec.bcRef ? (
                      <span className="font-mono text-xs text-text-primary">{rec.bcRef}</span>
                    ) : (
                      <span className="text-text-disabled text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <BCSyncChip status={rec.status} bcRef={rec.bcRef} />
                  </td>
                  <td className="px-4 py-3.5 text-text-muted text-xs">{rec.lastAttempt}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {rec.status === 'Failed' && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleRetry(rec.id) }}
                            className="text-xs font-medium text-dq-orange hover:underline"
                          >
                            Retry
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleEscalate(rec.id) }}
                            className="text-xs font-medium text-text-muted hover:text-text-primary hover:underline"
                          >
                            Escalate
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); }}
                            className="text-xs font-medium text-text-disabled hover:text-text-muted hover:underline"
                          >
                            Ignore
                          </button>
                        </>
                      )}
                      {rec.status === 'Synced' && (
                        <button className="text-xs font-medium text-text-muted hover:underline">View</button>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Inline error detail for SYNC-003 */}
                {expandedId === rec.id && (
                  <tr key={`${rec.id}-detail`} className="border-b border-border-subtle bg-surface-1">
                    <td colSpan={7} className="px-6 py-5">
                      {rec.status === 'Failed' ? (
                        <div className="space-y-3">
                          <div className="p-4 bg-status-error-surface rounded-card border border-status-error/20">
                            <p className="text-sm font-semibold text-status-error-text mb-1">Sync Error</p>
                            <p className="text-sm text-status-error-text">
                              Error: {rec.errorMessage} on vendor record{' '}
                              <span className="font-mono">{rec.objectRef}</span> (Anthropic).{' '}
                              Retry attempts: {rec.retryCount}. Last attempted: {rec.lastAttempt}.
                            </p>
                            <p className="text-sm text-status-error-text mt-2">
                              To resolve: update vendor record with VAT registration number then retry sync.
                            </p>
                          </div>
                          <button
                            onClick={() => showToast('Navigating to vendor record VND-004.', 'info')}
                            className="flex items-center gap-1.5 text-sm font-medium text-dq-orange hover:underline"
                          >
                            Go to Vendor Record
                            <ExternalLink size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      ) : rec.errorMessage ? (
                        <p className="text-sm text-text-muted">{rec.errorMessage}</p>
                      ) : (
                        <p className="text-sm text-status-success-text font-medium">Sync completed successfully.</p>
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
