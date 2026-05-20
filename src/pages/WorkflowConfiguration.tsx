import { GitBranch, Settings, CheckCircle } from 'lucide-react'
import { useToast } from '../components/Toast'

const workflows = [
  {
    id: 'WF-001',
    name: 'Expense Reimbursement Approval',
    trigger: 'Expense request submitted',
    steps: ['Requestor submits claim + evidence', 'Evidence validation (auto)', 'Route: ≤AED 5K → Manager, >AED 5K → Finance Control Owner', 'Approval decision', 'BC sync on approval'],
    status: 'Active',
    lastModified: '1 Mar 2026',
  },
  {
    id: 'WF-002',
    name: 'Purchase Request Approval',
    trigger: 'Purchase request submitted',
    steps: ['Requestor submits with business justification', 'Evidence validation (auto)', 'Route: ≤AED 10K → Finance Ops, >AED 10K → Finance Control Owner', 'Approval decision', 'PO generation', 'BC sync on approval'],
    status: 'Active',
    lastModified: '15 Feb 2026',
  },
  {
    id: 'WF-003',
    name: 'Invoice Payment Processing',
    trigger: 'Invoice payment request submitted',
    steps: ['Finance Ops submits invoice + PO reference', 'High-value flag: >AED 50K → Executive', 'Approval decision', 'BC sync: standard auto, high-value manual confirm', 'Payment authorisation'],
    status: 'Active',
    lastModified: '1 Mar 2026',
  },
  {
    id: 'WF-004',
    name: 'Vendor Onboarding',
    trigger: 'Vendor onboarding request submitted',
    steps: ['Document collection (company reg, tax cert, bank details)', 'Compliance review by Finance Control Owner', 'Approval decision', 'BC vendor record creation', 'Vendor activated'],
    status: 'Active',
    lastModified: '10 Jan 2026',
  },
  {
    id: 'WF-005',
    name: 'Subscription Renewal',
    trigger: 'Renewal alert (30 days before expiry)',
    steps: ['Auto-renew ON: notify owner, auto-process on renewal date', 'Auto-renew OFF: alert + approval request', 'Finance Control Owner approval required', 'Renewal processed or cancellation noted', 'BC sync updated'],
    status: 'Active',
    lastModified: '1 Apr 2026',
  },
  {
    id: 'WF-006',
    name: 'Budget Amendment',
    trigger: 'Budget amendment request submitted',
    steps: ['Finance Control Owner submits amendment with justification', 'Executive review required', 'Approval decision', 'Budget updated in system', 'BC cost centre/project dimension updated'],
    status: 'Active',
    lastModified: '1 Mar 2026',
  },
]

export default function WorkflowConfiguration() {
  const { showToast } = useToast()

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Workflow Configuration</h1>
      <p className="text-sm text-text-muted mb-6">Visual workflow builder for configuring approval chains, routing rules, and automation triggers.</p>

      {/* Summary */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <CheckCircle size={13} className="text-status-success" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-success-text">{workflows.filter(w => w.status === 'Active').length}</span>
          <span className="text-xs text-text-muted">Active Workflows</span>
        </div>
        <div className="flex-1" />
        <button
          onClick={() => showToast('New workflow builder opened.', 'info')}
          className="flex items-center gap-2 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <GitBranch size={14} strokeWidth={1.5} />
          New Workflow
        </button>
      </div>

      {/* Workflow cards */}
      <div className="space-y-3">
        {workflows.map((wf) => (
          <div key={wf.id} className="p-5 bg-white rounded-card border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono text-text-disabled">{wf.id}</span>
                  <span className="text-xs font-semibold bg-status-success-surface text-status-success-text rounded-pill px-2 py-0.5">{wf.status}</span>
                </div>
                <p className="text-sm font-semibold text-text-primary">{wf.name}</p>
                <p className="text-xs text-text-muted">Trigger: {wf.trigger} · Last modified: {wf.lastModified}</p>
              </div>
              <button
                onClick={() => showToast(`Workflow ${wf.id} editor opened.`, 'info')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-btn border border-dq-navy text-dq-navy hover:bg-navy-50 transition-colors shrink-0"
              >
                <Settings size={11} strokeWidth={1.5} />
                Edit
              </button>
            </div>

            {/* Steps */}
            <div className="flex items-center gap-0 overflow-x-auto pb-1">
              {wf.steps.map((step, i) => (
                <div key={i} className="flex items-center shrink-0">
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-dq-navy text-white flex items-center justify-center text-[10px] font-bold">{i + 1}</div>
                    <p className="text-[10px] text-text-muted mt-1 text-center max-w-[90px] leading-tight">{step}</p>
                  </div>
                  {i < wf.steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-border-subtle mx-1 -mt-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
