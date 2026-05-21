import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import { customers, requests } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import EvidenceChecklist from '../components/EvidenceChecklist'
import AIInsightCard from '../components/AIInsightCard'
import SidePanel from '../components/SidePanel'
import { useToast } from '../components/Toast'
import type { Request } from '../types'

const onboardingRequests = requests.filter((r) => r.type === 'Customer Onboarding')
const pendingCustomers = customers.filter((c) => c.status === 'Pending Onboarding')

export default function CustomerOnboarding() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [selected, setSelected] = useState<Request | null>(null)
  const { showToast } = useToast()

  const handleOpen = (req: Request) => {
    setSelected(req)
    setPanelOpen(true)
  }

  const handleApprove = () => {
    setPanelOpen(false)
    if (selected) showToast(`${selected.id} approved. Customer record created.`, 'success')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Customer Onboarding</h1>
      <p className="text-sm text-text-muted mb-6">
        Onboard new customers with required compliance evidence — triggers customer master record creation on approval. Owned by Finance Operations.
      </p>

      {/* Two-column layout */}
      <div className="grid grid-cols-[1fr_320px] gap-6">
        {/* Left — onboarding queue */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3" style={{ letterSpacing: '0.12em' }}>
            In-flight onboardings ({onboardingRequests.length})
          </p>

          {onboardingRequests.length === 0 ? (
            <div className="bg-white rounded-card border border-border-subtle shadow-sm p-8 text-center">
              <p className="text-sm text-text-muted">No customer onboarding requests in progress.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {onboardingRequests.map((req) => {
                const completedEvidence = req.evidence?.filter((e) => e.checked).length ?? 0
                const totalEvidence = req.evidence?.length ?? 0
                return (
                  <div
                    key={req.id}
                    onClick={() => handleOpen(req)}
                    className="bg-white rounded-card border border-border-subtle shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <RequestIDTag id={req.id} />
                          <StatusBadge status={req.status} />
                        </div>
                        <p className="text-sm font-medium text-text-primary">{req.description}</p>
                        <p className="text-xs text-text-muted mt-0.5">
                          Requester: {req.requester} · Approver: {req.approver} · Submitted {req.submittedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border-subtle text-xs">
                      <span className="text-text-muted">
                        Evidence: <span className="font-semibold text-text-secondary">{completedEvidence} / {totalEvidence}</span>
                      </span>
                      {req.notes && (
                        <span className="text-status-warning-text font-medium">{req.notes}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          {/* Quick start */}
          <div className="bg-dq-navy rounded-card p-5 text-white">
            <UserPlus size={20} strokeWidth={1.5} className="text-dq-orange mb-2" />
            <p className="text-sm font-semibold mb-1">Start a new onboarding</p>
            <p className="text-xs text-white/70 leading-relaxed mb-3">
              Gather company registration, VAT certificate, billing contact, and signed MSA before creating the customer record.
            </p>
            <button className="w-full py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              New Customer Request
            </button>
          </div>

          {/* Pending in master data */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <p className="text-sm font-semibold text-text-primary mb-3">Pending in master data ({pendingCustomers.length})</p>
            <div className="space-y-2">
              {pendingCustomers.map((c) => (
                <div key={c.id} className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-medium text-text-primary">{c.name}</p>
                    <p className="text-text-muted">{c.country} · {c.currency}</p>
                  </div>
                  <RequestIDTag id={c.id} />
                </div>
              ))}
            </div>
          </div>

          <AIInsightCard title="AI Insight">
            Galp Energia onboarding is waiting on VAT registration cert. Auto-classified as low risk; ready to advance once evidence is uploaded.
          </AIInsightCard>
        </div>
      </div>

      {/* Side panel */}
      {selected && (
        <SidePanel
          open={panelOpen}
          onClose={() => setPanelOpen(false)}
          title={selected.id}
          footer={
            <div className="flex gap-2">
              <button
                onClick={handleApprove}
                className="flex-1 py-2.5 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Approve & Create
              </button>
              <button className="flex-1 py-2.5 rounded-btn border border-border-default text-sm font-semibold text-text-primary hover:bg-surface-1 transition-colors">
                Request Evidence
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2"><StatusBadge status={selected.status} /></div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-muted text-xs mb-1">Customer</p>
                <p className="font-medium">{selected.description.replace('Customer onboarding: ', '')}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Requester</p>
                <p className="font-medium">{selected.requester}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Approver</p>
                <p className="font-medium">{selected.approver}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Submitted</p>
                <p className="font-medium">{selected.submittedDate}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Evidence</p>
              <EvidenceChecklist items={selected.evidence ?? []} />
            </div>
            {selected.notes && (
              <div className="bg-status-warning-surface rounded-card px-3 py-2">
                <p className="text-xs text-status-warning-text font-medium">{selected.notes}</p>
              </div>
            )}
          </div>
        </SidePanel>
      )}
    </div>
  )
}
