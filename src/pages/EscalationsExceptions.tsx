import { useState } from 'react'
import SidePanel from '../components/SidePanel'
import StatusBadge from '../components/StatusBadge'
import RequestIDTag from '../components/RequestIDTag'
import EvidenceChecklist from '../components/EvidenceChecklist'
import { useToast } from '../components/Toast'
import { requests } from '../data/fixtures'

type TabType = 'All' | 'Overdue' | 'High-Value' | 'Missing Evidence' | 'Sync Errors' | 'Blocked'

const exceptions = [
  {
    id: 'REQ-2025-0046',
    type: 'Expense',
    exception: 'Clarification overdue — 4 days',
    owner: 'Kenya delivery team',
    days: 4,
    severity: 'Warning' as const,
    tab: 'Overdue' as TabType,
  },
  {
    id: 'REQ-2025-0047',
    type: 'Invoice',
    exception: 'High-value pending executive approval',
    owner: 'Finance Ops',
    days: 2,
    severity: 'High' as const,
    tab: 'High-Value' as TabType,
  },
  {
    id: 'SYNC-003',
    type: 'Vendor',
    exception: 'BC sync failed — 3 attempts',
    owner: 'BC-STEWARD',
    days: 1,
    severity: 'High' as const,
    tab: 'Sync Errors' as TabType,
  },
  {
    id: 'REQ-2025-0044',
    type: 'Vendor Onboarding',
    exception: 'Missing tax registration cert',
    owner: 'Procurement Ops',
    days: 3,
    severity: 'Warning' as const,
    tab: 'Missing Evidence' as TabType,
  },
]

const TABS: TabType[] = ['All', 'Overdue', 'High-Value', 'Missing Evidence', 'Sync Errors', 'Blocked']

const severityClass: Record<string, string> = {
  High: 'bg-dq-orange text-white',
  Warning: 'bg-status-warning-surface text-status-warning-text',
  Low: 'bg-border-default text-text-secondary',
}

export default function EscalationsExceptions() {
  const [activeTab, setActiveTab] = useState<TabType>('All')
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { showToast } = useToast()

  const filtered = exceptions.filter((e) => activeTab === 'All' || e.tab === activeTab)
  const selectedEx = exceptions.find((e) => e.id === selectedId)
  const selectedReq = selectedId ? requests.find((r) => r.id === selectedId) : null

  const handleRowClick = (id: string) => {
    setSelectedId(id)
    setPanelOpen(true)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Escalations & Exceptions</h1>
      <p className="text-sm text-text-muted mb-6">Active exceptions requiring attention.</p>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-5 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === t
                ? 'border-dq-orange text-dq-orange'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Exception</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Owner</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Days</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Severity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((exc, i) => (
              <tr
                key={exc.id}
                className={`border-b border-border-subtle cursor-pointer hover:bg-surface-1 transition-colors ${
                  i === filtered.length - 1 ? 'border-b-0' : ''
                }`}
                onClick={() => handleRowClick(exc.id)}
              >
                <td className="px-4 py-3.5">
                  <RequestIDTag id={exc.id} />
                </td>
                <td className="px-4 py-3.5 text-text-primary">{exc.type}</td>
                <td className="px-4 py-3.5 text-text-secondary max-w-[240px]">{exc.exception}</td>
                <td className="px-4 py-3.5 text-text-muted">{exc.owner}</td>
                <td className="px-4 py-3.5 text-right font-mono font-semibold text-text-primary">
                  {exc.days}d
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-[12px] font-medium ${severityClass[exc.severity]}`}
                  >
                    {exc.severity}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRowClick(exc.id) }}
                      className="text-xs font-medium text-dq-orange hover:underline"
                    >
                      Review
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-text-muted text-sm">
                  No exceptions in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Side Panel */}
      <SidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={selectedId ?? ''}
        footer={selectedEx && (
          <div className="flex gap-3">
            <button
              onClick={() => {
                setPanelOpen(false)
                showToast(`Clarification chased for ${selectedId}.`, 'info')
              }}
              className="flex-1 py-2.5 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Chase Clarification
            </button>
            <button
              onClick={() => {
                setPanelOpen(false)
                showToast(`${selectedId} override closed.`, 'success')
              }}
              className="flex-1 py-2.5 rounded-btn border border-border-default text-sm font-semibold text-text-primary hover:bg-surface-1 transition-colors"
            >
              Override & Close
            </button>
          </div>
        )}
      >
        {selectedEx && (
          <div className="space-y-4">
            <div>
              <span
                className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-[12px] font-medium ${severityClass[selectedEx.severity]}`}
              >
                {selectedEx.severity}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-muted text-xs mb-1">Type</p>
                <p className="font-medium">{selectedEx.type}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Owner</p>
                <p className="font-medium">{selectedEx.owner}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Days Outstanding</p>
                <p className="font-semibold text-status-error-text">{selectedEx.days} days</p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Category</p>
                <p className="font-medium">{selectedEx.tab}</p>
              </div>
            </div>

            <div className="p-3 bg-status-error-surface rounded-card">
              <p className="text-sm text-status-error-text font-medium">{selectedEx.exception}</p>
            </div>

            {selectedReq && selectedReq.evidence && (
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Evidence</p>
                <EvidenceChecklist items={selectedReq.evidence} />
              </div>
            )}

            {selectedReq && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-text-muted text-xs mb-1">Amount</p>
                  <p className="font-mono font-bold text-dq-orange">
                    {selectedReq.amount > 0 ? `AED ${selectedReq.amount.toLocaleString()}` : '—'}
                  </p>
                </div>
                {selectedReq.dueDate && (
                  <div>
                    <p className="text-text-muted text-xs mb-1">Due Date</p>
                    <p className="font-medium">{selectedReq.dueDate}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </SidePanel>
    </div>
  )
}
