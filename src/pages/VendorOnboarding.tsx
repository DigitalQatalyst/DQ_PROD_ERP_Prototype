import { CheckCircle, XCircle, AlertTriangle, Plus, Clock } from 'lucide-react'
import { requests } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import { useToast } from '../components/Toast'

const onboardingCases = requests.filter(r => r.type === 'Vendor Onboarding')

const stages = ['Document Collection', 'Compliance Review', 'Finance Approval', 'BC Registration', 'Active']

const caseStageMap: Record<string, number> = {
  'REQ-2025-0044': 1,
}

const pendingNewCases = [
  { name: 'Noor Digital Solutions', country: 'UAE', category: 'Technology', submitted: '20 May 2026', stage: 0 },
]

export default function VendorOnboarding() {
  const { showToast } = useToast()

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Vendor Onboarding</h1>
        <button
          onClick={() => showToast('New vendor onboarding form opened.', 'info')}
          className="flex items-center gap-2 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={15} strokeWidth={1.5} />
          Onboard Vendor
        </button>
      </div>
      <p className="text-sm text-text-muted mb-6">Guided vendor onboarding workflow covering document collection, compliance checks, and BC registration.</p>

      {/* Summary */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-status-warning-surface rounded-pill">
          <Clock size={13} className="text-status-warning" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-warning-text">{onboardingCases.length + pendingNewCases.length}</span>
          <span className="text-xs text-text-muted">In Progress</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-error-surface rounded-pill">
          <AlertTriangle size={13} className="text-status-error" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-error-text">{onboardingCases.filter(r => r.status === 'Evidence Pending').length}</span>
          <span className="text-xs text-text-muted">Evidence Pending</span>
        </div>
      </div>

      {/* Active onboarding cases */}
      <p className="text-sm font-semibold text-text-primary mb-3">Active Onboarding Cases</p>
      <div className="space-y-5 mb-8">
        {onboardingCases.map((r) => {
          const currentStage = caseStageMap[r.id] ?? 0
          return (
            <div key={r.id} className="p-5 bg-white rounded-card border border-border-subtle shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <RequestIDTag id={r.id} />
                    <StatusBadge status={r.status as any} size="sm" />
                  </div>
                  <p className="text-sm font-semibold text-text-primary">{r.description}</p>
                  <p className="text-xs text-text-muted">Submitted by {r.requester} · {r.submittedDate} · Approver: {r.approver}</p>
                </div>
                <button
                  onClick={() => showToast(`Onboarding case ${r.id} opened.`, 'info')}
                  className="px-3 py-1.5 text-xs font-semibold rounded-btn bg-dq-navy text-white hover:opacity-90 transition-opacity shrink-0"
                >
                  Manage
                </button>
              </div>

              {/* Stage progress */}
              <div className="flex items-center gap-0 mb-4">
                {stages.map((stage, idx) => (
                  <div key={stage} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx < currentStage ? 'bg-status-success text-white' :
                        idx === currentStage ? 'bg-dq-orange text-white' :
                        'bg-border-subtle text-text-muted'
                      }`}>
                        {idx < currentStage ? <CheckCircle size={12} strokeWidth={2} /> : idx + 1}
                      </div>
                      <p className="text-[10px] text-text-muted mt-1 text-center leading-tight max-w-[70px]">{stage}</p>
                    </div>
                    {idx < stages.length - 1 && (
                      <div className={`h-0.5 flex-1 -mt-4 ${idx < currentStage ? 'bg-status-success' : 'bg-border-subtle'}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Evidence checklist */}
              {r.evidence && r.evidence.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-text-muted mb-2">Required Documents</p>
                  <div className="space-y-1">
                    {r.evidence.map((ev, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {ev.checked
                          ? <CheckCircle size={13} className="text-status-success" strokeWidth={1.5} />
                          : <XCircle size={13} className="text-status-error" strokeWidth={1.5} />
                        }
                        <span className={`text-xs ${ev.checked ? 'text-text-muted' : 'text-status-error-text font-semibold'}`}>{ev.label}</span>
                        {!ev.checked && <span className="text-[10px] text-status-error-text bg-status-error-surface rounded-pill px-1.5 py-0.5">Missing</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {r.notes && (
                <p className="text-xs font-semibold text-status-error-text mt-3 flex items-center gap-1">
                  <AlertTriangle size={11} strokeWidth={1.5} />
                  {r.notes}
                </p>
              )}
            </div>
          )
        })}

        {/* New pending cases */}
        {pendingNewCases.map((c, i) => (
          <div key={i} className="p-5 bg-white rounded-card border border-border-subtle shadow-sm opacity-80">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-sm font-semibold text-text-primary">{c.name}</p>
                <p className="text-xs text-text-muted">{c.country} · {c.category} · Submitted {c.submitted}</p>
              </div>
              <StatusBadge status="Pending Approval" size="sm" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-status-info-surface rounded-card text-xs text-status-info-text">
              <Clock size={12} strokeWidth={1.5} />
              Intake form submitted. Document collection not yet started.
            </div>
          </div>
        ))}
      </div>

      {/* Onboarding policy note */}
      <div className="p-4 bg-surface-1 rounded-card border border-border-subtle">
        <p className="text-xs font-semibold text-text-muted mb-1">Vendor Onboarding Policy</p>
        <p className="text-xs text-text-muted">All new vendors require company registration, bank details, and tax documentation before BC registration. Non-UAE vendors must provide equivalent cross-border compliance documents. Average onboarding time: 5–7 business days.</p>
      </div>
    </div>
  )
}
