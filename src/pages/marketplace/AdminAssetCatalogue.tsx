import { Package, HardDrive, UserPlus, Plane } from 'lucide-react'
import CataloguePage from '../../components/CataloguePage'

export default function AdminAssetCatalogue() {
  return (
    <CataloguePage
      title="Admin & Asset Services Catalogue"
      brsId="F-S1-04"
      description="Discover admin and asset service requests — office supplies, equipment, asset assignment, and travel / admin support. Each entry routes to the appropriate admin or procurement owner."
      items={[
        {
          title: 'Office Supplies Request',
          description: 'Request office supplies, stationery, or consumables for a DQ entity or location.',
          icon: <Package size={20} strokeWidth={1.5} />,
          approver: 'Admin / Procurement Ops',
          sla: '2 business days',
          evidence: ['Items list', 'Justification'],
        },
        {
          title: 'Equipment / Asset Request',
          description: 'Request laptops, peripherals, or other DQ-managed equipment — creates an asset record on approval.',
          icon: <HardDrive size={20} strokeWidth={1.5} />,
          approver: 'Procurement Owner',
          sla: '5 business days',
          evidence: ['Item specification', 'Custodian', 'Cost reference'],
        },
        {
          title: 'Asset Assignment / Return',
          description: 'Reassign a tracked asset between custodians, or mark an asset as returned, retired, or disposed.',
          icon: <UserPlus size={20} strokeWidth={1.5} />,
          approver: 'Admin Owner',
          sla: '1 business day',
          evidence: ['Asset ID', 'New custodian'],
        },
        {
          title: 'Travel / Admin Request',
          description: 'Raise a travel, visa, or admin support request — captures cost estimate, per-diem, and approval route.',
          icon: <Plane size={20} strokeWidth={1.5} />,
          approver: 'Finance Control Owner',
          sla: '5 business days',
          evidence: ['Travel details', 'Cost estimate', 'Per-diem breakdown'],
        },
      ]}
    />
  )
}
