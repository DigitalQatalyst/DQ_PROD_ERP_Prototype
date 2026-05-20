import { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import BCSyncChip from '../components/BCSyncChip'
import RequestIDTag from '../components/RequestIDTag'
import SidePanel from '../components/SidePanel'
import EvidenceChecklist from '../components/EvidenceChecklist'
import AIInsightCard from '../components/AIInsightCard'
import { useToast } from '../components/Toast'
import { requests, kpis } from '../data/fixtures'
import type { Request } from '../types'

const financeRequests = [
  requests.find((r) => r.id === 'REQ-2025-0047')!,
  requests.find((r) => r.id === 'REQ-2025-0045')!,
  requests.find((r) => r.id === 'REQ-2025-0043')!,
  requests.find((r) => r.id === 'REQ-2025-0041')!,
  requests.find((r) => r.id === 'REQ-2025-0046')!,
]

type FilterType = 'All' | 'Invoices' | 'Expenses' | 'Purchases' | 'Overdue' | 'Clarification Needed'

export default function FinanceControlHome() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedReq, setSelectedReq] = useState<Request | null>(null)
  const [approveModal, setApproveModal] = useState(false)
  const { showToast } = useToast()

  const filtered = financeRequests.filter((r) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Invoices') return r.type === 'Invoice'
    if (activeFilter === 'Expenses') return r.type === 'Expense'
    if (activeFilter === 'Purchases') return r.type === 'Purchase'
    if (activeFilter === 'Clarification Needed') return r.status === 'Clarification Needed'
    if (activeFilter === 'Overdue') return !!r.dueDate
    return true
  })

  const handleRowClick = (req: Request) => {
    setSelectedReq(req)
    setPanelOpen(true)
  }

  const handleApprove = () => setApproveModal(true)

  const handleConfirmApprove = () => {
    setApproveModal(false)
    setPanelOpen(false)
    if (selectedReq) {
      showToast(`${selectedReq.id} approved. Finance team notified.`, 'success')
    }
  }

  const filters: FilterType[] = ['All', 'Invoices', 'Expenses', 'Purchases', 'Overdue', 'Clarification Needed']

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Finance Control</h1>
      <p className="text-sm text-text-muted mb-6">Mohammed Rashid · Finance Control Owner</p>

      {/* Summary chips */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-navy-50 rounded-pill">
          <span className="text-sm font-semibold text-dq-navy">{kpis.pendingApprovals}</span>
          <span className="text-xs text-text-muted">Pending Approval</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-warning-surface rounded-pill">
          <span className="text-sm font-semibold text-status-warning-text">{kpis.clarificationNeeded}</span>
          <span className="text-xs text-text-muted">Clarification Needed</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-error-surface rounded-pill">
          <span className="text-sm font-semibold text-status-error-text">{kpis.overdueApprovals}</span>
          <span className="text-xs text-text-muted">Overdue</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeFilter === f
                ? 'border-dq-orange text-dq-orange'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            {f}
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
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor / Owner</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Due Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req, i) => (
              <tr
                key={req.id}
                className={`border-b border-border-subtle cursor-pointer hover:bg-surface-1 transition-colors ${
                  i === filtered.length - 1 ? 'border-b-0' : ''
                }`}
                onClick={() => handleRowClick(req)}
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <RequestIDTag id={req.id} />
                    {req.isHighValue && (
                      <span className="text-[10px] font-semibold bg-dq-orange text-white rounded-pill px-1.5 py-0.5">
                        HIGH VALUE
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-text-primary">{req.type}</td>
                <td className="px-4 py-3.5 text-right font-mono font-semibold"
                    style={{ fontFeatureSettings: "'tnum' on" }}>
                  {req.amount > 0 ? `AED ${req.amount.toLocaleString()}` : '—'}
                </td>
                <td className="px-4 py-3.5 text-text-secondary">
                  {req.vendorName ?? req.requester}
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={req.status} />
                </td>
                <td className="px-4 py-3.5">
                  {req.bcSync ? (
                    <BCSyncChip status={req.bcSync} bcRef={req.bcRef} />
                  ) : (
                    <span className="text-text-disabled text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-3.5 text-text-muted text-xs">
                  {req.dueDate ?? '—'}
                </td>
                <td className="px-4 py-3.5">
                  {req.status === 'Approved' ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRowClick(req) }}
                      className="text-xs font-medium text-text-muted hover:text-text-primary"
                    >
                      View
                    </button>
                  ) : req.status === 'Clarification Needed' ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRowClick(req) }}
                      className="text-xs font-medium text-status-warning-text hover:underline"
                    >
                      Review
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedReq(req)
                        setApproveModal(true)
                      }}
                      className="px-3 py-1.5 rounded-btn text-xs font-semibold bg-dq-orange text-white hover:opacity-90 transition-opacity"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side Panel */}
      {selectedReq && (
        <SidePanel
          open={panelOpen}
          onClose={() => setPanelOpen(false)}
          title={selectedReq.id}
          footer={
            <div className="flex gap-2">
              {selectedReq.status !== 'Approved' && (
                <button
                  onClick={handleApprove}
                  className="flex-1 py-2.5 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Approve
                </button>
              )}
              <button className="flex-1 py-2.5 rounded-btn border border-border-default text-sm font-semibold text-text-primary hover:bg-surface-1 transition-colors">
                Return
              </button>
              <button className="flex-1 py-2.5 rounded-btn border border-border-default text-sm font-semibold text-text-muted hover:bg-surface-1 transition-colors">
                Clarify
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={selectedReq.status} />
              {selectedReq.isHighValue && <StatusBadge status="High Value" />}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-muted text-xs mb-1">Type</p>
                <p className="font-medium">{selectedReq.type}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Amount</p>
                <p className="font-mono font-bold text-dq-orange"
                   style={{ fontFeatureSettings: "'tnum' on" }}>
                  {selectedReq.currency} {selectedReq.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Requester</p>
                <p className="font-medium">{selectedReq.requester}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Approver</p>
                <p className="font-medium">{selectedReq.approver}</p>
              </div>
              {selectedReq.vendorName && (
                <div>
                  <p className="text-text-muted text-xs mb-1">Vendor</p>
                  <p className="font-medium">{selectedReq.vendorName}</p>
                </div>
              )}
              {selectedReq.dueDate && (
                <div>
                  <p className="text-text-muted text-xs mb-1">Due Date</p>
                  <p className="font-medium">{selectedReq.dueDate}</p>
                </div>
              )}
            </div>

            {selectedReq.bcSync && (
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">BC Sync</p>
                <BCSyncChip status={selectedReq.bcSync} bcRef={selectedReq.bcRef} />
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Evidence</p>
              <EvidenceChecklist items={selectedReq.evidence ?? []} />
            </div>

            <AIInsightCard>
              Quote attached. Budget available in CC-003. No anomaly detected. Vendor not on BC — sync pending approval.
            </AIInsightCard>
          </div>
        </SidePanel>
      )}

      {/* Approve Modal */}
      {approveModal && selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
             style={{ background: 'rgba(3,15,53,0.35)' }}>
          <div className="bg-white rounded-modal shadow-lg p-8 w-[420px]">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Confirm Approval</h3>
            <p className="text-sm text-text-muted mb-6">
              Confirm approval of <span className="font-mono font-semibold">{selectedReq.id}</span> for{' '}
              <span className="font-mono font-bold text-dq-orange">
                {selectedReq.currency} {selectedReq.amount.toLocaleString()}
              </span>?
            </p>
            <div className="flex gap-3">
              <button onClick={handleConfirmApprove}
                className="flex-1 py-2.5 rounded-btn bg-dq-orange text-white font-semibold hover:opacity-90 transition-opacity">
                Confirm
              </button>
              <button onClick={() => setApproveModal(false)}
                className="flex-1 py-2.5 rounded-btn border border-border-default text-text-primary font-semibold hover:bg-surface-1 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
