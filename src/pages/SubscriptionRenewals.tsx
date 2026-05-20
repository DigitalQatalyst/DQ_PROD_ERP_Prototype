import { RefreshCw, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react'
import { subscriptions } from '../data/fixtures'
import { useToast } from '../components/Toast'

export default function SubscriptionRenewals() {
  const { showToast } = useToast()

  const urgent = subscriptions.filter(s => s.daysUntilRenewal <= 14)
  const upcoming = subscriptions.filter(s => s.daysUntilRenewal > 14 && s.daysUntilRenewal <= 30)
  const future = subscriptions.filter(s => s.daysUntilRenewal > 30)

  const totalAnnual = subscriptions.reduce((s, sub) => s + sub.amount, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Subscription & Renewals</h1>
      <p className="text-sm text-text-muted mb-6">Renewal register for all SaaS and vendor subscriptions with upcoming renewal alerts and auto-renew status.</p>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-4 bg-status-error-surface rounded-card border border-status-error/20">
          <p className="text-xs font-semibold text-status-error-text mb-1">Urgent (≤14 days)</p>
          <p className="text-2xl font-bold font-mono text-text-primary">{urgent.length}</p>
          <p className="text-xs text-text-muted">subscriptions — action required</p>
        </div>
        <div className="p-4 bg-status-warning-surface rounded-card border border-status-warning/20">
          <p className="text-xs font-semibold text-status-warning-text mb-1">Upcoming (15–30 days)</p>
          <p className="text-2xl font-bold font-mono text-text-primary">{upcoming.length}</p>
          <p className="text-xs text-text-muted">subscriptions due soon</p>
        </div>
        <div className="p-4 bg-navy-50 rounded-card border border-dq-navy/10">
          <p className="text-xs font-semibold text-dq-navy mb-1">Total Annual Spend</p>
          <p className="text-2xl font-bold font-mono text-text-primary">AED {totalAnnual.toLocaleString()}</p>
          <p className="text-xs text-text-muted">{subscriptions.length} active subscriptions</p>
        </div>
      </div>

      {/* Subscription cards */}
      <div className="space-y-3">
        {subscriptions
          .sort((a, b) => a.daysUntilRenewal - b.daysUntilRenewal)
          .map((sub) => {
            const isUrgent = sub.daysUntilRenewal <= 14
            const isUpcoming = sub.daysUntilRenewal > 14 && sub.daysUntilRenewal <= 30

            return (
              <div
                key={sub.id}
                className={`p-5 bg-white rounded-card border shadow-sm hover:shadow-md transition-shadow ${
                  isUrgent ? 'border-status-error/30' :
                  isUpcoming ? 'border-status-warning/30' :
                  'border-border-subtle'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      isUrgent ? 'bg-status-error-surface' :
                      isUpcoming ? 'bg-status-warning-surface' :
                      'bg-navy-50'
                    }`}>
                      <RefreshCw size={16} className={
                        isUrgent ? 'text-status-error' :
                        isUpcoming ? 'text-status-warning' :
                        'text-dq-navy'
                      } strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-text-primary">{sub.name}</p>
                        <span className="text-xs font-mono text-text-disabled">{sub.id}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <Clock size={11} strokeWidth={1.5} />
                          Renews {sub.renewalDate}
                        </span>
                        <span>Owner: {sub.owner}</span>
                        {sub.autoRenew ? (
                          <span className="flex items-center gap-1 text-status-success-text font-semibold">
                            <CheckCircle size={11} strokeWidth={1.5} />
                            Auto-renew ON
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-status-error-text font-semibold">
                            <XCircle size={11} strokeWidth={1.5} />
                            Auto-renew OFF
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold font-mono text-text-primary">AED {sub.amount.toLocaleString()}/yr</p>
                    <div className={`text-xs font-semibold mt-1 ${
                      isUrgent ? 'text-status-error-text' :
                      isUpcoming ? 'text-status-warning-text' :
                      'text-text-muted'
                    }`}>
                      {sub.daysUntilRenewal} days
                    </div>
                  </div>
                </div>

                {sub.actionRequired && (
                  <div className="mt-3 flex items-center justify-between gap-3 p-3 bg-status-error-surface rounded-card">
                    <p className="flex items-center gap-1 text-xs font-semibold text-status-error-text">
                      <AlertTriangle size={12} strokeWidth={1.5} />
                      {sub.actionRequired}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast(`${sub.name} renewal approved.`, 'success')}
                        className="px-3 py-1 text-xs font-semibold rounded-btn bg-dq-orange text-white hover:opacity-90"
                      >
                        Approve Renewal
                      </button>
                      <button
                        onClick={() => showToast(`${sub.name} cancellation noted.`, 'info')}
                        className="px-3 py-1 text-xs font-semibold rounded-btn border border-border-default text-text-muted hover:bg-surface-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
