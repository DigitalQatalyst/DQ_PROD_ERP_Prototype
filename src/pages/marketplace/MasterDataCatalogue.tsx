import { Building, Tag, UserCog, FolderOpen } from 'lucide-react'
import CataloguePage from '../../components/CataloguePage'

export default function MasterDataCatalogue() {
  return (
    <CataloguePage
      title="Master Data Change Catalogue"
      brsId="F-S1-05"
      description="Request a controlled change to shared master data — vendor records, cost centres, user roles, or project / entity structures. Master data changes are reviewed before being synced to Business Central."
      items={[
        {
          title: 'Vendor Data Change',
          description: 'Update a vendor record — payment terms, banking details, category, status, or compliance evidence.',
          icon: <Building size={20} strokeWidth={1.5} />,
          approver: 'BC Integration Steward',
          sla: '2 business days',
          evidence: ['Change reason', 'Updated fields', 'Supporting docs'],
        },
        {
          title: 'Cost Centre / Category Change',
          description: 'Add, rename, or retire a cost centre, expense category, or procurement category — affects budgets and reporting.',
          icon: <Tag size={20} strokeWidth={1.5} />,
          approver: 'Finance Control Owner',
          sla: '3 business days',
          evidence: ['Justification', 'Effective date'],
        },
        {
          title: 'User / Role Change',
          description: 'Request a new user, role assignment, delegation, or permission change for an internal team member.',
          icon: <UserCog size={20} strokeWidth={1.5} />,
          approver: 'Platform Administrator',
          sla: '2 business days',
          evidence: ['Role specification', 'Manager approval'],
        },
        {
          title: 'Project / Entity Change',
          description: 'Create a new project, change project status, or update an entity / geography master record.',
          icon: <FolderOpen size={20} strokeWidth={1.5} />,
          approver: 'Platform Administrator',
          sla: '3 business days',
          evidence: ['Change rationale', 'Impact analysis'],
        },
      ]}
    />
  )
}
