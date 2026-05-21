import { Receipt, FileText, TrendingUp, Shield, ClipboardCheck, UserPlus } from 'lucide-react'
import CataloguePage from '../../components/CataloguePage'

export default function FinanceServicesCatalogue() {
  return (
    <CataloguePage
      title="Finance Services Catalogue"
      brsId="F-S1-01"
      description="Discover the finance request types you can raise — expenses, invoices, payments, budget changes, and tax support. Each entry shows who approves, what evidence is required, and how long it typically takes."
      items={[
        {
          title: 'Expense / Reimbursement',
          description: 'Submit personal or team expenses for reimbursement against approved budgets or cost centres.',
          icon: <Receipt size={20} strokeWidth={1.5} />,
          approver: 'Finance Control Owner',
          sla: '2 business days',
          evidence: ['Receipts', 'Justification'],
        },
        {
          title: 'Invoice / Payment',
          description: 'Raise a payment request against a vendor invoice for processing through Accounts Payable and BC sync.',
          icon: <FileText size={20} strokeWidth={1.5} />,
          approver: 'Finance Control Owner (>AED 50k → Executive)',
          sla: '3 business days',
          evidence: ['Signed invoice', 'PO reference', 'Delivery confirmation'],
        },
        {
          title: 'Budget Amendment',
          description: 'Request a budget change for a project, cost centre, or category — including overage or reallocation.',
          icon: <TrendingUp size={20} strokeWidth={1.5} />,
          approver: 'Executive Oversight',
          sla: '5 business days',
          evidence: ['Justification', 'Updated forecast'],
        },
        {
          title: 'Tax & Compliance Support',
          description: 'Raise a query or request supporting documents for UAE VAT, corporate tax, or e-invoicing readiness.',
          icon: <Shield size={20} strokeWidth={1.5} />,
          approver: 'Finance Control Owner',
          sla: '5 business days',
          evidence: ['Supporting documents'],
        },
        {
          title: 'Budget Requisition',
          description: 'Request a new budget allocation for an initiative, project, campaign, or cost item that doesn’t yet have approved funding.',
          icon: <ClipboardCheck size={20} strokeWidth={1.5} />,
          approver: 'Finance Control Owner (>AED 25k → Executive)',
          sla: '4 business days',
          evidence: ['Initiative brief', 'Cost breakdown', 'Expected outcomes'],
        },
        {
          title: 'Customer Onboarding',
          description: 'Onboard a new client / customer for billing, AR, and revenue tracking — creates a customer master record on approval.',
          icon: <UserPlus size={20} strokeWidth={1.5} />,
          approver: 'Finance Operations',
          sla: '5 business days',
          evidence: ['Company registration', 'VAT cert', 'Billing contact', 'Signed MSA'],
          ctaRoute: '/customer-onboarding',
        },
      ]}
    />
  )
}
