import { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import RequestIDTag from '../components/RequestIDTag'
import BCSyncChip from '../components/BCSyncChip'
import EvidenceChecklist from '../components/EvidenceChecklist'
import AIInsightCard from '../components/AIInsightCard'
import { useToast } from '../components/Toast'
import { requests } from '../data/fixtures'
import type { Request } from '../types'

const pendingApprovals = [
  requests.find((r) => r.id === 'REQ-2025-0047')!,
  requests.find((r) => r.id === 'REQ-2025-0045')!,
  requests.find((r) => r.id === 'REQ-2025-0041')!,
]

export default function ApprovalConsole() {
  const [selectedReq, setSelectedReq] = useState<Request>(pendingApprovals[0])
  const [approveModal, setApproveModal] = useState(false)
  const [returnModal, setReturnModal] = useState(false)
  const [returnComment, setReturnComment] = useState('')
  const { showToast } = useToast()

  const handleApprove = () => setApproveModal(true)
  const handleConfirmApprove = () => {
    setApproveModal(false)
    showToast(`${selectedReq.id} approved. Finance team notified.`, 'success')
  }

  const handleReturn = () => setReturnModal(true)
  const handleConfirmReturn = () => {
    setReturnModal(false)
    showToast(`${selectedReq.id} returned with comments.`, 'info')
    setReturnComment('')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Approval Console</h1>
      <p className="text-sm text-text-muted mb-6">Review and approve pending requests.</p>

      <div className="flex gap-5 h-[calc(100vh-200px)] min-h-[500px]">
        {/* Left panel — approval queue */}
        <div
          className="w-[340px] shrink-0 rounded-card border border-border-subtle bg-white shadow-sm overflow-hidden flex flex-col"
        >
          <div className="px-5 py-4 border-b border-border-subtle bg-surface-1">
            <p className="text-sm font-semibold text-text-primary">
              Pending Approvals <span className="text-text-muted font-normal">(23)</span>
            </p>
          </div>
          <div className="overflow-y-auto flex-1">
            {pendingApprovals.map((req) => (
              <button
                key={req.id}
                onClick={() => setSelectedReq(req)}
                className={`w-full text-left px-5 py-4 border-b border-border-subtle transition-all ${
                  selectedReq.id === req.id
                    ? 'bg-navy-50 border-l-2 border-l-dq-orange'
                    : 'hover:bg-surface-1 border-l-2 border-l-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <RequestIDTag id={req.id} />
                  {req.isHighValue && <StatusBadge status="High Value" size="sm" />}
                </div>
                <p className="text-sm font-medium text-text-primary truncate mb-1">
                  {req.vendorName ?? req.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-text-primary"
                        style={{ fontFeatureSettings: "'tnum' on" }}>
                    AED {req.amount.toLocaleString()}
                  </span>
                  {req.dueDate && (
                    <span className="text-xs text-text-muted">Due {req.dueDate}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right — detail panel */}
        <div className="flex-1 rounded-card border border-border-subtle bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-border-subtle bg-surface-1 flex items-center gap-3">
            <RequestIDTag id={selectedReq.id} />
            <span className="text-lg font-semibold text-text-primary">{selectedReq.type}</span>
            {selectedReq.isHighValue && <StatusBadge status="High Value" />}
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Fields */}
            <div className="grid grid-cols-2 gap-5 text-sm">
              <div>
                <p className="text-text-muted text-xs mb-1">Requester</p>
                <p className="font-medium">Finance Ops</p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Vendor</p>
                <p className="font-medium">{selectedReq.vendorName ?? '—'}</p>
                {selectedReq.vendorId && (
                  <span className="font-mono text-xs text-text-muted">{selectedReq.vendorId}</span>
                )}
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Amount</p>
                <p
                  className="font-mono text-2xl font-bold text-dq-orange"
                  style={{ fontFeatureSettings: "'tnum' on" }}
                >
                  AED {selectedReq.amount.toLocaleString()}
                </p>
              </div>
              {selectedReq.linkedProject && (
                <div>
                  <p className="text-text-muted text-xs mb-1">Project</p>
                  <p className="font-mono text-sm font-medium">{selectedReq.linkedProject}</p>
                </div>
              )}
              {selectedReq.dueDate && (
                <div>
                  <p className="text-text-muted text-xs mb-1">Due Date</p>
                  <p className="font-medium">{selectedReq.dueDate}</p>
                </div>
              )}
              {selectedReq.bcSync && (
                <div>
                  <p className="text-text-muted text-xs mb-1">BC Sync</p>
                  <BCSyncChip status={selectedReq.bcSync} bcRef={selectedReq.bcRef} />
                </div>
              )}
            </div>

            {/* Evidence */}
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Evidence Checklist</p>
              <EvidenceChecklist items={selectedReq.evidence ?? []} />
            </div>

            {/* AI Summary */}
            <AIInsightCard title="AI Approval Summary">
              Evidence complete. Mazrui Holdings is an active vendor (Synced to BC). Amount within executive approval authority. No duplicate detected. Budget in CC-004 has AED 112,000 remaining.
            </AIInsightCard>
          </div>

          {/* Action buttons */}
          <div className="border-t border-border-subtle px-6 py-4 bg-white flex items-center gap-3">
            <button
              onClick={handleApprove}
              className="flex-1 py-2.5 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Approve
            </button>
            <button
              onClick={handleReturn}
              className="flex-1 py-2.5 rounded-btn border border-border-default text-sm font-semibold text-text-primary hover:bg-surface-1 transition-colors"
            >
              Return with Comments
            </button>
            <button className="flex-1 py-2.5 rounded-btn border border-border-default text-sm font-semibold text-text-muted hover:bg-surface-1 transition-colors">
              Request Clarification
            </button>
            <button className="text-sm font-medium text-text-muted hover:text-dq-navy hover:underline px-2">
              Delegate
            </button>
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      {approveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
             style={{ background: 'rgba(3,15,53,0.35)' }}>
          <div className="bg-white rounded-modal shadow-lg p-8 w-[420px]">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Confirm Approval</h3>
            <p className="text-sm text-text-muted mb-6">
              Confirm approval of <span className="font-mono font-semibold">{selectedReq.id}</span> for{' '}
              <span className="font-mono font-bold text-dq-orange">
                AED {selectedReq.amount.toLocaleString()}
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

      {/* Return Modal */}
      {returnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
             style={{ background: 'rgba(3,15,53,0.35)' }}>
          <div className="bg-white rounded-modal shadow-lg p-8 w-[460px]">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Return with Comments</h3>
            <p className="text-sm text-text-muted mb-4">
              Return <span className="font-mono font-semibold">{selectedReq.id}</span> to the requester.
            </p>
            <textarea
              value={returnComment}
              onChange={(e) => setReturnComment(e.target.value)}
              placeholder="Enter return reason or required changes…"
              rows={4}
              className="w-full px-4 py-3 rounded-input border border-border-default text-sm focus:outline-none resize-none mb-4"
            />
            <div className="flex gap-3">
              <button onClick={handleConfirmReturn}
                className="flex-1 py-2.5 rounded-btn bg-dq-navy text-white font-semibold hover:opacity-90 transition-opacity">
                Return
              </button>
              <button onClick={() => setReturnModal(false)}
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
