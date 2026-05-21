import { ShoppingCart, UserPlus, GitPullRequest, RefreshCw } from 'lucide-react'
import CataloguePage from '../../components/CataloguePage'

export default function ProcurementServicesCatalogue() {
  return (
    <CataloguePage
      title="Procurement & Vendor Services Catalogue"
      brsId="F-S1-02"
      description="Discover the procurement and vendor workflows available — purchasing, vendor onboarding, quotes, and subscription renewals. Every entry shows the approval path, expected evidence, and target SLA."
      items={[
        {
          title: 'Purchase Request',
          description: 'Request goods, services, tools, or platform infrastructure against a project or cost centre budget.',
          icon: <ShoppingCart size={20} strokeWidth={1.5} />,
          approver: 'Finance Control Owner',
          sla: '3 business days',
          evidence: ['Supplier quote', 'Business justification', 'Project link'],
        },
        {
          title: 'Vendor Onboarding',
          description: 'Onboard a new vendor with company, tax, and bank evidence — triggers BC vendor record creation on approval.',
          icon: <UserPlus size={20} strokeWidth={1.5} />,
          approver: 'Procurement Owner + BC Steward',
          sla: '5 business days',
          evidence: ['Company registration', 'Tax certificate', 'Bank details'],
        },
        {
          title: 'Quote / RFQ',
          description: 'Capture supplier quotations and comparisons for a planned purchase before raising the PO.',
          icon: <GitPullRequest size={20} strokeWidth={1.5} />,
          approver: 'Procurement Owner',
          sla: '7 business days',
          evidence: ['Specification', 'Vendor shortlist', 'Comparison notes'],
        },
        {
          title: 'Subscription Renewal',
          description: 'Review and approve a SaaS / licence renewal before auto-renew or cancellation deadline.',
          icon: <RefreshCw size={20} strokeWidth={1.5} />,
          approver: 'Procurement Owner',
          sla: '5 business days',
          evidence: ['Renewal terms', 'Usage review'],
        },
      ]}
    />
  )
}
