import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import BCSyncChip from '../components/BCSyncChip'
import RequestIDTag from '../components/RequestIDTag'
import EvidenceChecklist from '../components/EvidenceChecklist'
import { useToast } from '../components/Toast'
import { requests } from '../data/fixtures'
import type { Request } from '../types'

const opsRequests = [
  requests.find((r) => r.id === 'REQ-2025-0043')!,
  requests.find((r) => r.id === 'REQ-2025-0047')!,
  requests.find((r) => r.id === 'REQ-2025-0045')!,
  requests.find((r) => r.id === 'REQ-2025-0046')!,
  requests.find((r) => r.id === 'REQ-2025-0041')!,
]

type TabType = 'All' | 'Invoice Processing' | 'Expense Settlement' | 'BC Sync Required'

export default function FinanceOpsConsole() {
  const [activeTab, setActiveTab] = useState<TabType>('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { showToast } = useToast()

  const filtered = opsRequests.filter((r) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Invoice Processing') return r.type === 'Invoice'
    if (activeTab === 'Expense Settlement') return r.type === 'Expense'
    if (activeTab === 'BC Sync Required') return r.bcSync === 'Pending' || r.bcSync === 'Failed' || r.bcSync === 'Not Synced'
    return true
  })

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  const tabs: TabType[] = ['All', 'Invoice Processing', 'Expense Settlement', 'BC Sync Required']

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Finance Operations Console</h1>
      <p className="text-sm text-text-muted mb-6">Sara Pereira · Finance Ops Practitioner</p>

      {/* Tab strip */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {tabs.map((t) => (
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

      {/* Dense table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider w-8" />
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Evidence</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC State</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Due</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req, i) => (
              <>
                <tr
                  key={req.id}
                  className={`border-b border-border-subtle cursor-pointer hover:bg-surface-1 transition-colors ${
                    expandedId === req.id ? 'bg-surface-1' : ''
                  } ${i === filtered.length - 1 && expandedId !== req.id ? 'border-b-0' : ''}`}
                  onClick={() => toggleExpand(req.id)}
                >
                  <td className="px-3 py-3">
                    {expandedId === req.id ? (
                      <ChevronUp size={14} className="text-text-muted" strokeWidth={1.5} />
                    ) : (
                      <ChevronDown size={14} className="text-text-muted" strokeWidth={1.5} />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <RequestIDTag id={req.id} />
                  </td>
                  <td className="px-4 py-3 text-text-primary max-w-[200px] truncate">
                    {req.description}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold"
                      style={{ fontFeatureSettings: "'tnum' on" }}>
                    {req.amount > 0 ? `AED ${req.amount.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="px-4 py-3">
                    {req.evidence && req.evidence.length > 0 ? (
                      <span className={`text-xs font-medium ${
                        req.evidence.every((e) => e.checked)
                          ? 'text-status-success-text'
                          : 'text-status-warning-text'
                      }`}>
                        {req.evidence.filter((e) => e.checked).length}/{req.evidence.length} items
                      </span>
                    ) : (
                      <span className="text-text-disabled text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {req.bcSync ? (
                      <BCSyncChip status={req.bcSync} bcRef={req.bcRef} />
                    ) : (
                      <span className="text-text-disabled text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text-muted text-xs">
                    {req.dueDate ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleExpand(req.id) }}
                      className="text-xs font-medium text-dq-orange hover:underline"
                    >
                      {expandedId === req.id ? 'Collapse' : 'Expand'}
                    </button>
                  </td>
                </tr>

                {/* Inline expanded detail */}
                {expandedId === req.id && (
                  <tr key={`${req.id}-expanded`} className="border-b border-border-subtle bg-surface-1">
                    <td colSpan={9} className="px-6 py-5">
                      <div className="grid grid-cols-[1fr_auto] gap-6">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Evidence Checklist</p>
                            <EvidenceChecklist items={req.evidence ?? []} />
                          </div>
                          {req.notes && (
                            <div className="p-3 bg-status-warning-surface rounded-card text-sm text-status-warning-text">
                              <span className="font-semibold">Note:</span> {req.notes}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 min-w-[160px]">
                          <button
                            onClick={() => showToast(`${req.id} marked as processed.`, 'success')}
                            className="px-4 py-2 rounded-btn bg-dq-orange text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                          >
                            Mark as Processed
                          </button>
                          <button
                            onClick={() => showToast(`Issue flagged on ${req.id}.`, 'info')}
                            className="px-4 py-2 rounded-btn border border-border-default text-xs font-semibold text-text-primary hover:bg-white transition-colors"
                          >
                            Flag Issue
                          </button>
                          {req.bcRef && (
                            <button className="px-4 py-2 rounded-btn border border-border-default text-xs font-semibold text-text-primary hover:bg-white transition-colors">
                              View BC Record
                            </button>
                          )}
                        </div>
                      </div>
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
