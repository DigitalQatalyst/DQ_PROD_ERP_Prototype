import { Activity, Code, Key, GitMerge } from 'lucide-react'
import CataloguePage from '../../components/CataloguePage'

export default function IntegrationSupportCatalogue() {
  return (
    <CataloguePage
      title="Integration & Platform Support Catalogue"
      brsId="F-S1-06"
      description="Raise support requests for the DWS.04 platform — Business Central sync issues, API and mapping problems, access requests, or workflow / threshold issues. Routed to the appropriate steward or admin."
      items={[
        {
          title: 'BC Sync Issue',
          description: 'Report a Business Central sync failure for an invoice, vendor, purchase, or cost centre record.',
          icon: <Activity size={20} strokeWidth={1.5} />,
          approver: 'BC Integration Steward',
          sla: '1 business day',
          evidence: ['Error message', 'Affected record ID'],
        },
        {
          title: 'API / Mapping Issue',
          description: 'Report an API endpoint or field mapping problem between DWS.04 and Business Central.',
          icon: <Code size={20} strokeWidth={1.5} />,
          approver: 'BC Integration Steward',
          sla: '2 business days',
          evidence: ['Endpoint', 'Expected vs actual'],
        },
        {
          title: 'Access / Permission Request',
          description: 'Request a new permission, role assignment, or scope expansion for the DWS.04 platform.',
          icon: <Key size={20} strokeWidth={1.5} />,
          approver: 'Platform Administrator',
          sla: '2 business days',
          evidence: ['Role needed', 'Manager approval'],
        },
        {
          title: 'Workflow / Threshold Issue',
          description: 'Report a workflow misrouting, approval threshold problem, or escalation rule that needs review.',
          icon: <GitMerge size={20} strokeWidth={1.5} />,
          approver: 'Platform Administrator',
          sla: '3 business days',
          evidence: ['Issue description', 'Affected workflow'],
        },
      ]}
    />
  )
}
