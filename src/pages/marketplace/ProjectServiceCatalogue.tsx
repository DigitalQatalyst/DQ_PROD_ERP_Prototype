import { DollarSign, Briefcase, Layers, Link as LinkIcon, Flag } from 'lucide-react'
import CataloguePage from '../../components/CataloguePage'

export default function ProjectServiceCatalogue() {
  return (
    <CataloguePage
      title="Project & Service Operations Catalogue"
      brsId="F-S1-03"
      description="Discover request types linked to project and service economics — project costs, billing milestones, delivery support, and project-linked procurement. Every catalogue entry connects to a project or service record."
      items={[
        {
          title: 'Project Cost Request',
          description: 'Raise a cost item against an active project — staff time, vendor cost, tool cost, or other direct project spend.',
          icon: <DollarSign size={20} strokeWidth={1.5} />,
          approver: 'Project / Service Economics Owner',
          sla: '2 business days',
          evidence: ['Cost breakdown', 'Project link'],
        },
        {
          title: 'Service Billing Request',
          description: 'Trigger a client billing event when a delivery milestone is reached, ready for invoicing through Finance.',
          icon: <Briefcase size={20} strokeWidth={1.5} />,
          approver: 'Finance Control Owner',
          sla: '3 business days',
          evidence: ['Milestone evidence', 'Client approval'],
        },
        {
          title: 'Delivery Support Request',
          description: 'Request internal delivery support — additional resourcing, blocker resolution, or escalation on an active project.',
          icon: <Layers size={20} strokeWidth={1.5} />,
          approver: 'Project / Service Owner',
          sla: '1 business day',
          evidence: ['Issue description', 'Affected milestones'],
        },
        {
          title: 'Project-linked Procurement',
          description: 'Raise a purchase that must be tracked against a specific project budget and delivery commitment.',
          icon: <LinkIcon size={20} strokeWidth={1.5} />,
          approver: 'Project Owner + Finance Control Owner',
          sla: '3 business days',
          evidence: ['Supplier quote', 'Project link', 'Budget reference'],
        },
        {
          title: 'Milestone Update Request',
          description: 'Request a status change, date shift, or completion update on a project milestone — tracked in the Milestone Tracker.',
          icon: <Flag size={20} strokeWidth={1.5} />,
          approver: 'Project / Service Owner',
          sla: '1 business day',
          evidence: ['Milestone reference', 'Update reason'],
          ctaRoute: '/milestone-tracker',
        },
      ]}
    />
  )
}
