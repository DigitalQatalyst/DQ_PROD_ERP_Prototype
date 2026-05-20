import { useState } from 'react'
import { Activity, Clock, AlertTriangle, TrendingUp } from 'lucide-react'
import KPICard from '../components/KPICard'
import SummaryTile from '../components/SummaryTile'
import AIInsightCard from '../components/AIInsightCard'
import StatusBadge from '../components/StatusBadge'
import BCSyncChip from '../components/BCSyncChip'
import SidePanel from '../components/SidePanel'
import EvidenceChecklist from '../components/EvidenceChecklist'
import RequestIDTag from '../components/RequestIDTag'
import { useToast } from '../components/Toast'
import { requests, subscriptions, kpis } from '../data/fixtures'

const req0047 = requests.find((r) => r.id === 'REQ-2025-0047')!
const req0045 = requests.find((r) => r.id === 'REQ-2025-0045')!
const loom = subscriptions.find((s) => s.id === 'SUB-005')!
const anthropic = subscriptions.find((s) => s.id === 'SUB-003')!

export default function ExecutiveHome() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedReq, setSelectedReq] = useState(req0047)
  const [approveModal, setApproveModal] = useState(false)
  const { showToast } = useToast()

  const handleRowClick = (req: typeof req0047) => {
    setSelectedReq(req)
    setPanelOpen(true)
  }

  const handleApprove = () => {
    setApproveModal(true)
  }

  const handleConfirmApprove = () => {
    setApproveModal(false)
    setPanelOpen(false)
    showToast(`${selectedReq.id} approved. Finance team notified.`, 'success')
  }

  return (
    <div>
      {/* Greeting */}
      <p className="text-sm text-text-muted mb-6">
        Good morning, Aisha. Here's your operating overview.
      </p>

      {/* Executive Summary Dashboard */}
      <div className="mb-8">
        <p
          className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3"
          style={{ letterSpacing: '0.12em' }}
        >
          Executive Summary — Contract & Delivery
        </p>
        <div className="grid grid-cols-3 gap-4">
          <SummaryTile label="Total Contract Value (AED)" value="1,060,000" color="navy" />
          <SummaryTile label="Total Billed (AED)" value="638,000" color="green" />
          <SummaryTile label="Total Collected (AED)" value="393,000" color="green" />
          <SummaryTile label="Milestones Completed" value="8" color="green" />
          <SummaryTile label="Milestones Overdue / Delayed" value="2" color="brown" />
          <SummaryTile label="Outstanding AR (AED)" value="245,000" color="red" />
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <KPICard
          label="Payment Exposure (30d)"
          value="AED 186,400"
          variant="mono"
          icon={<TrendingUp size={20} strokeWidth={1.5} />}
        />
        <KPICard
          label="Pending Approvals"
          value={kpis.pendingApprovals}
          icon={<Clock size={20} strokeWidth={1.5} />}
        />
        <KPICard
          label="High-Value Pending"
          value={kpis.highValuePending}
          variant="warning"
          icon={<AlertTriangle size={20} strokeWidth={1.5} />}
        />
        <KPICard
          label="BC Sync Health"
          value="Healthy"
          variant="success"
          icon={<Activity size={20} strokeWidth={1.5} />}
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-[1fr_340px] gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Your Approvals */}
          <div className="bg-surface-1 rounded-card shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Your Approvals</h2>
            <div className="space-y-3">
              {/* REQ-2025-0047 */}
              <div
                className="bg-white rounded-card p-4 shadow-sm border border-border-subtle cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleRowClick(req0047)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <RequestIDTag id="REQ-2025-0047" />
                      <StatusBadge status="High Value" />
                    </div>
                    <p className="text-sm font-medium text-text-primary truncate">
                      Invoice: Mazrui Holdings delivery milestone
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      Mazrui Holdings Ltd. · Due 28 May 2026
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className="font-mono text-lg font-bold text-dq-orange"
                      style={{ fontFeatureSettings: "'tnum' on" }}
                    >
                      AED 90,000
                    </p>
                    <div className="flex gap-2 mt-2 justify-end">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedReq(req0047); handleApprove() }}
                        className="px-3 py-1.5 rounded-btn text-xs font-semibold bg-dq-orange text-white hover:opacity-90 transition-opacity"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRowClick(req0047) }}
                        className="px-3 py-1.5 rounded-btn text-xs font-semibold bg-white text-dq-navy border border-border-default hover:bg-surface-1 transition-colors"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* REQ-2025-0045 */}
              <div
                className="bg-white rounded-card p-4 shadow-sm border border-border-subtle cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleRowClick(req0045)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <RequestIDTag id="REQ-2025-0045" className="block mb-1" />
                    <p className="text-sm font-medium text-text-primary truncate">
                      Purchase: AWS infrastructure top-up
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">Sara Pereira · Pending</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-base font-bold text-text-primary"
                       style={{ fontFeatureSettings: "'tnum' on" }}>
                      AED 28,600
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedReq(req0045); handleApprove() }}
                      className="mt-2 px-3 py-1.5 rounded-btn text-xs font-semibold bg-dq-orange text-white hover:opacity-90 transition-opacity"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Executive Brief */}
          <AIInsightCard title="AI Executive Brief">
            3 high-value approvals are pending. Loom subscription expires in 7 days — no auto-renew.
            PRJ-2403 has an AED 45,000 overage request awaiting your review.
          </AIInsightCard>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Finance Health Donut */}
          <div className="bg-surface-1 rounded-card shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Finance Health</h3>
            <div className="flex items-center gap-4">
              {/* Simple donut SVG */}
              <div className="relative w-24 h-24 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#030F35" strokeWidth="4" />
                  <circle
                    cx="18" cy="18" r="14"
                    fill="none"
                    stroke="#FB5535"
                    strokeWidth="4"
                    strokeDasharray={`${kpis.budgetConsumedPct * 0.879} ${87.9 - kpis.budgetConsumedPct * 0.879}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-text-primary">{kpis.budgetConsumedPct}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Budget Consumed YTD</p>
                <p className="font-mono text-sm text-dq-orange mt-1">AED 1.24M</p>
                <p className="text-xs text-text-muted">of AED 2.0M total</p>
              </div>
            </div>
          </div>

          {/* Renewal Alerts */}
          <div className="bg-surface-1 rounded-card shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Renewal Alerts</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 bg-white rounded-card border border-border-subtle">
                <div>
                  <p className="text-sm font-medium text-text-primary">{loom.name}</p>
                  <p className="text-xs text-text-muted">Renews {loom.renewalDate}</p>
                </div>
                <StatusBadge status="High Value" size="sm" />
              </div>
              <div className="flex items-center justify-between p-2.5 bg-white rounded-card border border-border-subtle">
                <div>
                  <p className="text-sm font-medium text-text-primary">{anthropic.name}</p>
                  <p className="text-xs text-text-muted">{anthropic.daysUntilRenewal} days · {anthropic.renewalDate}</p>
                </div>
                <span className="text-xs font-semibold text-dq-orange bg-orange-50 rounded-pill px-2 py-0.5">
                  Action Needed
                </span>
              </div>
            </div>
          </div>

          {/* Exception Summary */}
          <div className="bg-surface-1 rounded-card shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Exception Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Overdue approvals</span>
                <span className="font-semibold text-status-error-text">{kpis.overdueApprovals}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Sync failures</span>
                <span className="font-semibold text-status-error-text">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel — Request Detail */}
      <SidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={selectedReq.id}
        footer={
          <div className="flex gap-3">
            <button
              onClick={handleApprove}
              className="flex-1 py-2.5 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Approve
            </button>
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
              <p className="text-text-muted text-xs mb-1">Vendor</p>
              <p className="font-medium">{selectedReq.vendorName ?? '—'}</p>
            </div>
            <div>
              <p className="text-text-muted text-xs mb-1">Due Date</p>
              <p className="font-medium">{selectedReq.dueDate ?? '—'}</p>
            </div>
            {selectedReq.linkedProject && (
              <div>
                <p className="text-text-muted text-xs mb-1">Project</p>
                <p className="font-mono text-sm">{selectedReq.linkedProject}</p>
              </div>
            )}
            {selectedReq.bcSync && (
              <div>
                <p className="text-text-muted text-xs mb-1">BC Sync</p>
                <BCSyncChip status={selectedReq.bcSync} bcRef={selectedReq.bcRef} />
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Evidence</p>
            <EvidenceChecklist items={selectedReq.evidence ?? []} />
          </div>

          <AIInsightCard>
            Evidence complete. Mazrui Holdings is an active vendor (Synced to BC). Amount within executive approval authority. No duplicate detected. Budget in CC-004 has AED 112,000 remaining.
          </AIInsightCard>
        </div>
      </SidePanel>

      {/* Approve Confirmation Modal */}
      {approveModal && (
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
              <button
                onClick={handleConfirmApprove}
                className="flex-1 py-2.5 rounded-btn bg-dq-orange text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Confirm
              </button>
              <button
                onClick={() => setApproveModal(false)}
                className="flex-1 py-2.5 rounded-btn border border-border-default text-text-primary font-semibold hover:bg-surface-1 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
