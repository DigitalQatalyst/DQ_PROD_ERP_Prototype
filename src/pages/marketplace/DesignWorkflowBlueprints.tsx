import { ChevronRight } from 'lucide-react'

interface WorkflowStep {
  label: string
  owner: string
}

interface Workflow {
  id: string
  title: string
  description: string
  steps: WorkflowStep[]
  typicalDuration: string
}

const workflows: Workflow[] = [
  {
    id: 'purchase',
    title: 'Purchase Request → PO → Payment',
    description: 'End-to-end flow from raising a purchase request through PO issuance, receipt confirmation, vendor invoicing, and payment.',
    typicalDuration: '12–18 business days',
    steps: [
      { label: 'Submit Purchase Request', owner: 'Requestor' },
      { label: 'Quote review', owner: 'Procurement Owner' },
      { label: 'Finance approval', owner: 'Finance Control Owner' },
      { label: 'PO issuance', owner: 'Procurement Ops' },
      { label: 'Goods / service receipt', owner: 'Requestor / Project Owner' },
      { label: 'Vendor invoice intake', owner: 'Finance Ops' },
      { label: 'Payment + BC sync', owner: 'Finance Ops + BC Steward' },
    ],
  },
  {
    id: 'vendor-onboarding',
    title: 'Vendor Onboarding → BC Vendor Record',
    description: 'Onboard a new vendor with compliance evidence — terminates in a Business Central vendor master record.',
    typicalDuration: '5–7 business days',
    steps: [
      { label: 'Submit Vendor Onboarding request', owner: 'Procurement Ops / Requestor' },
      { label: 'Evidence collection (reg, tax, bank)', owner: 'Procurement Ops + Vendor' },
      { label: 'Compliance review', owner: 'Procurement Owner' },
      { label: 'BC sync (vendor record created)', owner: 'BC Integration Steward' },
      { label: 'Active vendor in Vendor Directory', owner: 'System' },
    ],
  },
  {
    id: 'expense',
    title: 'Expense → Approval → Reimbursement',
    description: 'Submit a personal or team expense for reimbursement; settled after Finance approval and BC sync.',
    typicalDuration: '3–5 business days',
    steps: [
      { label: 'Submit expense with receipts', owner: 'Requestor' },
      { label: 'AI evidence check', owner: 'AI (Analytical)' },
      { label: 'Finance approval', owner: 'Finance Control Owner' },
      { label: 'Reimbursement payment', owner: 'Finance Ops' },
      { label: 'BC sync (settlement record)', owner: 'BC Integration Steward' },
    ],
  },
  {
    id: 'customer-onboarding',
    title: 'Customer Onboarding → Customer Master',
    description: 'Stand up a new billable customer record — MSA, tax / VAT, billing contact — ready for AR and invoicing.',
    typicalDuration: '5–7 business days',
    steps: [
      { label: 'Submit Customer Onboarding request', owner: 'Finance Ops' },
      { label: 'Evidence collection (reg, VAT, contact, MSA)', owner: 'Finance Ops' },
      { label: 'Finance approval', owner: 'Finance Control Owner' },
      { label: 'Customer master record created', owner: 'Finance Ops' },
      { label: 'BC sync (customer record)', owner: 'BC Integration Steward' },
    ],
  },
  {
    id: 'period-close',
    title: 'Period Close — Monthly',
    description: 'Month-end financial close — AP, AR, expense settlement, journal review, BC reconciliation, sign-off.',
    typicalDuration: '4–6 business days',
    steps: [
      { label: 'Close AP queue (all invoices processed)', owner: 'Finance Ops' },
      { label: 'Close AR (invoices issued, collections updated)', owner: 'Finance Ops' },
      { label: 'Expense settlement', owner: 'Finance Ops' },
      { label: 'Journal review', owner: 'Finance Control Owner' },
      { label: 'BC reconciliation', owner: 'BC Integration Steward' },
      { label: 'Period sign-off', owner: 'Finance Control Owner + Executive' },
    ],
  },
  {
    id: 'milestone-billing',
    title: 'Milestone → Service Billing → Client Invoice',
    description: 'Project milestone reached triggers a service billing request, which generates a client invoice and AR entry.',
    typicalDuration: '4–6 business days',
    steps: [
      { label: 'Milestone marked complete', owner: 'Project / Service Owner' },
      { label: 'Submit Service Billing Request', owner: 'Project / Service Owner' },
      { label: 'Finance approval', owner: 'Finance Control Owner' },
      { label: 'Client invoice generated', owner: 'Finance Ops' },
      { label: 'AR entry in customer master', owner: 'System + BC sync' },
    ],
  },
]

export default function DesignWorkflowBlueprints() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
          S01 Marketplace · Design
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Workflow Blueprints</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Visual flow of common DWS.04 workflows — see who owns each step and roughly how long the end-to-end takes. Use these blueprints to plan capacity, set expectations, and identify which steps you control.
        </p>
      </div>

      <div className="space-y-6">
        {workflows.map((wf) => (
          <div key={wf.id} className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border-subtle bg-surface-1 flex items-baseline justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-1">{wf.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{wf.description}</p>
              </div>
              <span className="text-[11px] font-semibold text-text-muted shrink-0 whitespace-nowrap">
                ⏱ {wf.typicalDuration}
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-stretch gap-1.5 flex-wrap">
                {wf.steps.map((step, i) => (
                  <div key={i} className="flex items-stretch gap-1.5">
                    <div className="flex flex-col items-center gap-1 min-w-[140px] max-w-[180px]">
                      <div className="w-7 h-7 rounded-full bg-dq-orange text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </div>
                      <div className="bg-white border border-border-subtle rounded-card px-3 py-2 text-center flex-1 flex flex-col justify-center">
                        <p className="text-xs font-semibold text-text-primary leading-tight">{step.label}</p>
                        <p className="text-[10px] text-text-muted mt-0.5">{step.owner}</p>
                      </div>
                    </div>
                    {i < wf.steps.length - 1 && (
                      <ChevronRight size={18} strokeWidth={2} className="text-icon-muted self-center shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
