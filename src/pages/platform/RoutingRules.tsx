import { useState } from 'react'
import { Plus, Edit2, GitBranch, AlertCircle } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface RoutingRule {
  id: string
  name: string
  description: string
  routingType: 'Service-Based' | 'Attribute-Based' | 'Entity-Based' | 'Role-Based'
  triggerCondition: string
  destinationType: 'Team' | 'User Queue' | 'Auto-Assign'
  destination: string
  priority: number
  servicesLinked: number
  executionCount: number
  matchRate: number
  status: 'Active' | 'Draft'
  lastModified: string
}

const routingRules: RoutingRule[] = [
  {
    id: 'RR-001',
    name: 'Expense Report → Finance Ops',
    description: 'Routes all expense report submissions to the Finance Operations team queue',
    routingType: 'Service-Based',
    triggerCondition: 'service.category = "Expense Report"',
    destinationType: 'Team',
    destination: 'Finance Operations',
    priority: 2,
    servicesLinked: 3,
    executionCount: 1842,
    matchRate: 98.4,
    status: 'Active',
    lastModified: '2025-05-10',
  },
  {
    id: 'RR-002',
    name: 'Invoice Processing → Finance Ops',
    description: 'Routes vendor invoice processing requests to Finance Operations team',
    routingType: 'Service-Based',
    triggerCondition: 'service.category = "Invoice Processing"',
    destinationType: 'Team',
    destination: 'Finance Operations',
    priority: 2,
    servicesLinked: 4,
    executionCount: 2107,
    matchRate: 99.1,
    status: 'Active',
    lastModified: '2025-05-10',
  },
  {
    id: 'RR-003',
    name: 'Purchase Request → Procurement Team',
    description: 'Routes all purchase requests and RFQs to the Procurement team',
    routingType: 'Service-Based',
    triggerCondition: 'service.category = "Purchase Request"',
    destinationType: 'Team',
    destination: 'Procurement Team',
    priority: 2,
    servicesLinked: 5,
    executionCount: 1593,
    matchRate: 97.8,
    status: 'Active',
    lastModified: '2025-05-12',
  },
  {
    id: 'RR-004',
    name: 'Vendor Onboarding → Procurement Team',
    description: 'New vendor registration and KYC requests routed to Procurement',
    routingType: 'Service-Based',
    triggerCondition: 'service.category = "Vendor Management"',
    destinationType: 'Team',
    destination: 'Procurement Team',
    priority: 3,
    servicesLinked: 2,
    executionCount: 341,
    matchRate: 100.0,
    status: 'Active',
    lastModified: '2025-04-28',
  },
  {
    id: 'RR-005',
    name: 'Leave Request → HR Ops',
    description: 'All leave and absence requests are routed to HR Operations queue',
    routingType: 'Service-Based',
    triggerCondition: 'service.category = "Leave Management"',
    destinationType: 'Team',
    destination: 'HR Operations',
    priority: 3,
    servicesLinked: 6,
    executionCount: 2914,
    matchRate: 99.6,
    status: 'Active',
    lastModified: '2025-05-01',
  },
  {
    id: 'RR-006',
    name: 'Employee Onboarding → HR Ops',
    description: 'New hire onboarding workflows routed to HR Ops for processing',
    routingType: 'Service-Based',
    triggerCondition: 'service.category = "Onboarding"',
    destinationType: 'Team',
    destination: 'HR Operations',
    priority: 2,
    servicesLinked: 4,
    executionCount: 128,
    matchRate: 100.0,
    status: 'Active',
    lastModified: '2025-04-15',
  },
  {
    id: 'RR-007',
    name: 'Asset Request → IT Ops',
    description: 'Hardware, software, and access provisioning requests routed to IT',
    routingType: 'Service-Based',
    triggerCondition: 'service.category = "Asset Management"',
    destinationType: 'Team',
    destination: 'IT Operations',
    priority: 3,
    servicesLinked: 5,
    executionCount: 874,
    matchRate: 96.2,
    status: 'Active',
    lastModified: '2025-05-08',
  },
  {
    id: 'RR-008',
    name: 'Travel Request → Admin Ops',
    description: 'Business travel bookings and advance requests routed to Admin',
    routingType: 'Service-Based',
    triggerCondition: 'service.category = "Travel & Accommodation"',
    destinationType: 'Team',
    destination: 'Admin Operations',
    priority: 4,
    servicesLinked: 3,
    executionCount: 612,
    matchRate: 97.5,
    status: 'Active',
    lastModified: '2025-05-02',
  },
  {
    id: 'RR-009',
    name: 'High-Value Request → Finance Owner',
    description: 'Any request above AED 50,000 is automatically routed to Finance Owner',
    routingType: 'Attribute-Based',
    triggerCondition: 'request.amount > 50000 AND currency = "AED"',
    destinationType: 'User Queue',
    destination: 'Finance Owner Queue',
    priority: 1,
    servicesLinked: 12,
    executionCount: 387,
    matchRate: 94.1,
    status: 'Active',
    lastModified: '2025-05-15',
  },
  {
    id: 'RR-010',
    name: 'Urgent Flag → Priority Queue',
    description: 'Requests flagged as urgent are escalated to priority processing queue',
    routingType: 'Attribute-Based',
    triggerCondition: 'request.urgency = "High" OR slaBreached = true',
    destinationType: 'Auto-Assign',
    destination: 'Priority Processing Queue',
    priority: 1,
    servicesLinked: 18,
    executionCount: 219,
    matchRate: 91.3,
    status: 'Active',
    lastModified: '2025-05-18',
  },
  {
    id: 'RR-011',
    name: 'Master Data Change → Data Stewardship',
    description: 'All master data create/edit requests routed to Data Stewardship team',
    routingType: 'Entity-Based',
    triggerCondition: 'entity.type IN ("Vendor","Customer","Employee","CoA")',
    destinationType: 'Team',
    destination: 'Data Stewardship',
    priority: 2,
    servicesLinked: 7,
    executionCount: 543,
    matchRate: 98.9,
    status: 'Active',
    lastModified: '2025-04-20',
  },
  {
    id: 'RR-012',
    name: 'BC Sync Error → Integration Team',
    description: 'Failed BC sync events and integration errors route to Integration team',
    routingType: 'Attribute-Based',
    triggerCondition: 'event.type = "SyncError" AND source = "BusinessCentral"',
    destinationType: 'Team',
    destination: 'Integration Team',
    priority: 1,
    servicesLinked: 1,
    executionCount: 94,
    matchRate: 100.0,
    status: 'Active',
    lastModified: '2025-05-20',
  },
  {
    id: 'RR-013',
    name: 'Budget Amendment → Finance Owner',
    description: 'Budget revision and reallocation requests route to Finance Owner',
    routingType: 'Service-Based',
    triggerCondition: 'service.category = "Budget Management"',
    destinationType: 'User Queue',
    destination: 'Finance Owner Queue',
    priority: 2,
    servicesLinked: 2,
    executionCount: 167,
    matchRate: 97.0,
    status: 'Active',
    lastModified: '2025-04-30',
  },
  {
    id: 'RR-014',
    name: 'Customer Onboarding → Sales & Finance',
    description: 'New customer account setup routes jointly to Sales and Finance queues',
    routingType: 'Service-Based',
    triggerCondition: 'service.category = "Customer Management" AND action = "Create"',
    destinationType: 'Auto-Assign',
    destination: 'Sales & Finance Joint Queue',
    priority: 3,
    servicesLinked: 2,
    executionCount: 83,
    matchRate: 95.2,
    status: 'Active',
    lastModified: '2025-05-05',
  },
  {
    id: 'RR-015',
    name: 'Unmatched Request → Platform Admin',
    description: 'Fallback rule: requests not matched by other rules route to Platform Admin',
    routingType: 'Role-Based',
    triggerCondition: 'routing.matched = false',
    destinationType: 'User Queue',
    destination: 'Platform Admin Queue',
    priority: 10,
    servicesLinked: 0,
    executionCount: 47,
    matchRate: 100.0,
    status: 'Active',
    lastModified: '2025-03-01',
  },
  {
    id: 'RR-016',
    name: 'Project Finance → Project Manager',
    description: 'Project-related financial requests route to the assigned Project Manager',
    routingType: 'Entity-Based',
    triggerCondition: 'entity.type = "Project" AND request.type = "Finance"',
    destinationType: 'Auto-Assign',
    destination: 'Assigned Project Manager',
    priority: 3,
    servicesLinked: 4,
    executionCount: 298,
    matchRate: 93.6,
    status: 'Active',
    lastModified: '2025-05-11',
  },
  {
    id: 'RR-017',
    name: 'Delegated Approval → Proxy Queue',
    description: 'When primary approver is on leave, route to configured delegation proxy',
    routingType: 'Role-Based',
    triggerCondition: 'approver.status = "OnLeave" AND delegation.configured = true',
    destinationType: 'User Queue',
    destination: 'Delegation Proxy Queue',
    priority: 2,
    servicesLinked: 8,
    executionCount: 156,
    matchRate: 88.7,
    status: 'Active',
    lastModified: '2025-05-14',
  },
  {
    id: 'RR-018',
    name: 'Inventory Reorder → Procurement Draft',
    description: 'Auto-triggered inventory reorder alerts routed to Procurement for review',
    routingType: 'Attribute-Based',
    triggerCondition: 'inventory.level <= inventory.reorderPoint',
    destinationType: 'Team',
    destination: 'Procurement Team',
    priority: 4,
    servicesLinked: 1,
    executionCount: 0,
    matchRate: 0,
    status: 'Draft',
    lastModified: '2025-06-01',
  },
]

export default function RoutingRules() {
  const [filter, setFilter] = useState<'All' | 'Service-Based' | 'Attribute-Based' | 'Entity-Based' | 'Role-Based'>('All')

  const stats = {
    activeRules: routingRules.filter(r => r.status === 'Active').length,
    serviceBased: routingRules.filter(r => r.routingType === 'Service-Based').length,
    attributeBased: routingRules.filter(r => r.routingType === 'Attribute-Based').length,
    avgMatchRate: Math.round(
      routingRules
        .filter(r => r.status === 'Active' && r.executionCount > 0)
        .reduce((sum, r) => sum + r.matchRate, 0) /
        routingRules.filter(r => r.status === 'Active' && r.executionCount > 0).length
    ),
  }

  const filtered = filter === 'All' ? routingRules : routingRules.filter(r => r.routingType === filter)

  const filterOptions: Array<'All' | 'Service-Based' | 'Attribute-Based' | 'Entity-Based' | 'Role-Based'> = [
    'All', 'Service-Based', 'Attribute-Based', 'Entity-Based', 'Role-Based',
  ]

  const typeColors: Record<string, string> = {
    'Service-Based': 'bg-status-info-surface text-status-info',
    'Attribute-Based': 'bg-status-warning-surface text-status-warning',
    'Entity-Based': 'bg-purple-50 text-purple-700',
    'Role-Based': 'bg-status-success-surface text-status-success',
  }

  const destColors: Record<string, string> = {
    'Team': 'bg-status-info-surface text-status-info',
    'User Queue': 'bg-status-warning-surface text-status-warning',
    'Auto-Assign': 'bg-status-success-surface text-status-success',
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Routing Rules</h1>
          <p className="text-sm text-text-muted mt-1">
            Configure how incoming requests are automatically routed to the correct team or queue based on service type, attributes, and entity.
          </p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} />
          Add Rule
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Active Rules</p>
          <p className="text-3xl font-bold text-text-primary">{stats.activeRules}</p>
          <p className="text-xs text-text-muted mt-1">of {routingRules.length} total</p>
        </div>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Service-Based</p>
          <p className="text-3xl font-bold text-status-info">{stats.serviceBased}</p>
          <p className="text-xs text-text-muted mt-1">rules by service category</p>
        </div>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Attribute-Based</p>
          <p className="text-3xl font-bold text-status-warning">{stats.attributeBased}</p>
          <p className="text-xs text-text-muted mt-1">rules by request attributes</p>
        </div>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Avg Match Rate</p>
          <p className="text-3xl font-bold text-status-success">{stats.avgMatchRate}%</p>
          <p className="text-xs text-text-muted mt-1">across active rules</p>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 mb-4">
        {filterOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === opt ? 'bg-dq-navy text-white' : 'bg-surface-1 text-text-muted hover:bg-border-subtle'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm">
        <table className="w-full">
          <thead className="bg-surface-1 border-b border-border-subtle">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Rule Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Trigger Condition</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Destination</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Dest. Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Priority</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Match Rate</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Executions</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map(rule => (
              <tr key={rule.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-4 py-3">
                  <span className="text-xs font-mono text-text-muted">{rule.id}</span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-text-primary">{rule.name}</p>
                  <p className="text-xs text-text-muted mt-0.5">{rule.description}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColors[rule.routingType]}`}>
                    {rule.routingType}
                  </span>
                </td>
                <td className="px-4 py-3 max-w-[200px]">
                  <code className="text-xs bg-surface-1 text-text-secondary px-1.5 py-0.5 rounded font-mono break-all">
                    {rule.triggerCondition}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-text-primary">{rule.destination}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${destColors[rule.destinationType]}`}>
                    {rule.destinationType}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${rule.priority <= 2 ? 'bg-status-error' : rule.priority <= 4 ? 'bg-status-warning' : 'bg-status-success'}`} />
                    <span className="text-sm font-semibold text-text-primary">{rule.priority}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {rule.executionCount > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 bg-surface-1 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-status-success rounded-full"
                          style={{ width: `${rule.matchRate}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-text-primary">{rule.matchRate}%</span>
                    </div>
                  ) : (
                    <span className="text-xs text-text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary">{rule.executionCount.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={rule.status} />
                </td>
                <td className="px-4 py-3">
                  <button className="p-1.5 rounded hover:bg-surface-1 text-text-muted hover:text-text-primary transition-colors">
                    <Edit2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Governance Notes */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-status-info-surface border border-status-info/20 rounded-card">
          <div className="flex items-start gap-3">
            <GitBranch size={18} className="text-status-info mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">Routing Priority</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Rules are evaluated in ascending priority order (1 = highest). When multiple rules match a request, the rule with the lowest priority number takes effect. Rules with equal priority are evaluated by creation date. Review priority assignments regularly to prevent conflicts between overlapping trigger conditions.
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-status-warning mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">Fallback Routing</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Any request that does not match a configured routing rule is automatically directed to the Platform Admin queue (rule RR-015). This ensures no request is silently dropped. Platform Admins should review unmatched requests weekly and create new routing rules for recurring patterns to reduce overall fallback volume.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
