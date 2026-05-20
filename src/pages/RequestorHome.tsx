import { useNavigate } from 'react-router-dom'
import { Receipt, ShoppingCart, AlertTriangle, UserPlus } from 'lucide-react'
import AIInsightCard from '../components/AIInsightCard'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import { requests } from '../data/fixtures'

const req0042 = requests.find((r) => r.id === 'REQ-2025-0042')!

const STEPS = ['Draft', 'Submitted', 'In Review', 'Approved', 'Fulfilled']

export default function RequestorHome() {
  const navigate = useNavigate()

  const shortcuts = [
    { label: 'Submit an expense', icon: <Receipt size={24} strokeWidth={1.5} />, route: '/request-intake?type=expense' },
    { label: 'Request a purchase', icon: <ShoppingCart size={24} strokeWidth={1.5} />, route: '/request-intake?type=purchase' },
    { label: 'Report an issue', icon: <AlertTriangle size={24} strokeWidth={1.5} />, route: '/request-intake?type=issue' },
    { label: 'Start a vendor request', icon: <UserPlus size={24} strokeWidth={1.5} />, route: '/request-intake?type=vendor' },
  ]

  const currentStep = 'In Review'
  const currentStepIdx = STEPS.indexOf(currentStep)

  return (
    <div>
      {/* Hero banner */}
      <div
        className="rounded-card p-8 mb-8"
        style={{ background: '#030F35' }}
      >
        <h1 className="text-2xl font-semibold text-white mb-6">
          What do you need to do today?
        </h1>
        <div className="grid grid-cols-2 gap-3">
          {shortcuts.map((s) => (
            <button
              key={s.label}
              onClick={() => navigate(s.route)}
              className="flex items-center gap-3 p-4 bg-white rounded-card text-left hover:bg-orange-50 hover:shadow-md transition-all card-hover"
            >
              <span className="text-dq-orange">{s.icon}</span>
              <span className="text-sm font-semibold text-text-primary">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-[1fr_280px] gap-6">
        {/* My Active Requests */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">My Active Requests</h2>
          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border-subtle">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approver</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-subtle">
                  <td className="px-4 py-4">
                    <RequestIDTag id={req0042.id} />
                  </td>
                  <td className="px-4 py-4 text-text-primary">{req0042.type}</td>
                  <td className="px-4 py-4 text-right font-mono font-semibold"
                      style={{ fontFeatureSettings: "'tnum' on" }}>
                    AED 5,800
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={req0042.status} />
                  </td>
                  <td className="px-4 py-4 text-text-secondary">{req0042.approver}</td>
                  <td className="px-4 py-4 text-text-muted text-xs">{req0042.submittedDate}</td>
                </tr>
              </tbody>
            </table>

            {/* Status tracker */}
            <div className="px-4 py-3 bg-surface-1 border-t border-border-subtle">
              <div className="flex items-center gap-0">
                {STEPS.map((step, idx) => {
                  const isActive = idx === currentStepIdx
                  const isPast = idx < currentStepIdx
                  return (
                    <div key={step} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-3 h-3 rounded-full mb-1 ${
                            isActive
                              ? 'bg-dq-orange'
                              : isPast
                              ? 'bg-status-success'
                              : 'bg-border-default'
                          }`}
                        />
                        <span
                          className={`text-[10px] font-medium text-center ${
                            isActive ? 'text-dq-orange' : isPast ? 'text-status-success-text' : 'text-text-disabled'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                      {idx < STEPS.length - 1 && (
                        <div
                          className={`h-0.5 flex-1 -mt-4 ${
                            idx < currentStepIdx ? 'bg-status-success' : 'bg-border-default'
                          }`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right rail — Guidance */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Guidance</h2>
          <AIInsightCard>
            Your Notion request is in review. Sara usually reviews within 1 business day. Evidence checklist is complete.
          </AIInsightCard>
        </div>
      </div>
    </div>
  )
}
