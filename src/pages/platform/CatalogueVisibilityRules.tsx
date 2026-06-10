import { useState } from 'react'
import { Plus, Edit2, Eye, Users, Shield, Globe, Building2 } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface VisibilityRule {
  id: string
  name: string
  description: string
  ruleType: 'Role-Based' | 'Entity-Based' | 'Department-Based' | 'Hybrid'
  status: 'Active' | 'Draft' | 'Suspended'
  affectedRoles: string[]
  affectedEntities: string[]
  servicesControlled: number
  servicesVisible: number
  servicesHidden: number
  priority: number
  lastModified: string
  modifiedBy: string
}

const visibilityRules: VisibilityRule[] = [
  { id: 'VIS-001', name: 'Finance Control Owner - Full Access', description: 'Finance owners see all finance, procurement, and budget services', ruleType: 'Role-Based', status: 'Active', affectedRoles: ['FIN-OWN'], affectedEntities: ['All'], servicesControlled: 42, servicesVisible: 42, servicesHidden: 0, priority: 1, lastModified: '15 May 2026', modifiedBy: 'Tariq Al-Amin' },
  { id: 'VIS-002', name: 'Finance Ops - Execution Only', description: 'Finance ops see expense, invoice, and budget services but not master data changes', ruleType: 'Role-Based', status: 'Active', affectedRoles: ['FIN-OPS'], affectedEntities: ['All'], servicesControlled: 42, servicesVisible: 34, servicesHidden: 8, priority: 2, lastModified: '14 May 2026', modifiedBy: 'Tariq Al-Amin' },
  { id: 'VIS-003', name: 'Executive - Oversight Only', description: 'Executives see approval and reporting services but not operational forms', ruleType: 'Role-Based', status: 'Active', affectedRoles: ['EXEC'], affectedEntities: ['All'], servicesControlled: 156, servicesVisible: 28, servicesHidden: 128, priority: 1, lastModified: '16 May 2026', modifiedBy: 'Tariq Al-Amin' },
  { id: 'VIS-004', name: 'Requestor - Standard Services', description: 'Internal requestors see expense, leave, asset, and travel services', ruleType: 'Role-Based', status: 'Active', affectedRoles: ['REQ'], affectedEntities: ['All'], servicesControlled: 156, servicesVisible: 38, servicesHidden: 118, priority: 3, lastModified: '12 May 2026', modifiedBy: 'Tariq Al-Amin' },
  { id: 'VIS-005', name: 'HR Owner - People Services', description: 'HR owners see leave, onboarding, offboarding, and HR document services', ruleType: 'Role-Based', status: 'Active', affectedRoles: ['HR-OWN'], affectedEntities: ['All'], servicesControlled: 35, servicesVisible: 35, servicesHidden: 0, priority: 1, lastModified: '13 May 2026', modifiedBy: 'Fatima Bin Hammad' },
  { id: 'VIS-006', name: 'Inventory Owner - Asset Services', description: 'Inventory owners see asset, stock, and equipment services', ruleType: 'Role-Based', status: 'Active', affectedRoles: ['INV-OWN'], affectedEntities: ['All'], servicesControlled: 24, servicesVisible: 24, servicesHidden: 0, priority: 1, lastModified: '11 May 2026', modifiedBy: 'Rashid Ahmed' },
  { id: 'VIS-007', name: 'Procurement Owner - Vendor Services', description: 'Procurement owners see purchase, vendor, and subscription services', ruleType: 'Role-Based', status: 'Active', affectedRoles: ['PROC-OWN'], affectedEntities: ['All'], servicesControlled: 38, servicesVisible: 38, servicesHidden: 0, priority: 1, lastModified: '10 May 2026', modifiedBy: 'Yasmin Al-Mansoori' },
  { id: 'VIS-008', name: 'Admin Owner - Back-Office Services', description: 'Admin owners see travel, office services, and facilities', ruleType: 'Role-Based', status: 'Active', affectedRoles: ['ADM-OWN'], affectedEntities: ['All'], servicesControlled: 18, servicesVisible: 18, servicesHidden: 0, priority: 1, lastModified: '09 May 2026', modifiedBy: 'Maya Sharma' },
  { id: 'VIS-009', name: 'BC Steward - Integration Services', description: 'BC stewards see sync, mapping, and integration support services', ruleType: 'Role-Based', status: 'Active', affectedRoles: ['BC-STEWARD'], affectedEntities: ['All'], servicesControlled: 12, servicesVisible: 12, servicesHidden: 0, priority: 1, lastModified: '14 May 2026', modifiedBy: 'Layla Seitkali' },
  { id: 'VIS-010', name: 'Platform Admin - Full Catalogue', description: 'Platform admins see all services across all domains', ruleType: 'Role-Based', status: 'Active', affectedRoles: ['ADMIN'], affectedEntities: ['All'], servicesControlled: 156, servicesVisible: 156, servicesHidden: 0, priority: 0, lastModified: '17 May 2026', modifiedBy: 'Tariq Al-Amin' },
  { id: 'VIS-011', name: 'UAE Entity - Local Services Only', description: 'Users in UAE entity see UAE-specific tax and compliance services', ruleType: 'Entity-Based', status: 'Active', affectedRoles: ['All'], affectedEntities: ['DigitalQatalyst MENA'], servicesControlled: 14, servicesVisible: 14, servicesHidden: 0, priority: 5, lastModified: '12 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'VIS-012', name: 'Kenya Entity - Local Services Only', description: 'Users in Kenya entity see Kenya-specific compliance and currency services', ruleType: 'Entity-Based', status: 'Active', affectedRoles: ['All'], affectedEntities: ['DigitalQatalyst East Africa'], servicesControlled: 8, servicesVisible: 8, servicesHidden: 0, priority: 5, lastModified: '11 May 2026', modifiedBy: 'Layla Seitkali' },
  { id: 'VIS-013', name: 'Portugal Entity - EUR Services', description: 'Users in Portugal entity see EUR-denominated and EU compliance services', ruleType: 'Entity-Based', status: 'Active', affectedRoles: ['All'], affectedEntities: ['DigitalQatalyst Iberia'], servicesControlled: 9, servicesVisible: 9, servicesHidden: 0, priority: 5, lastModified: '10 May 2026', modifiedBy: 'Sara Pereira' },
  { id: 'VIS-014', name: 'Technology Department - IT Services', description: 'Tech team sees asset, licence, and subscription services', ruleType: 'Department-Based', status: 'Active', affectedRoles: ['All'], affectedEntities: ['All'], servicesControlled: 22, servicesVisible: 22, servicesHidden: 0, priority: 4, lastModified: '13 May 2026', modifiedBy: 'Tariq Al-Amin' },
  { id: 'VIS-015', name: 'Delivery Team - Project Services', description: 'Delivery associates see project, customer, and service-linked requests', ruleType: 'Hybrid', status: 'Active', affectedRoles: ['REQ'], affectedEntities: ['All'], servicesControlled: 18, servicesVisible: 18, servicesHidden: 0, priority: 3, lastModified: '14 May 2026', modifiedBy: 'Layla Seitkali' },
  { id: 'VIS-016', name: 'Contractor - Limited Access', description: 'Contractors see only expense reimbursement and leave requests', ruleType: 'Role-Based', status: 'Draft', affectedRoles: ['CONTRACTOR'], affectedEntities: ['All'], servicesControlled: 156, servicesVisible: 12, servicesHidden: 144, priority: 4, lastModified: '16 May 2026', modifiedBy: 'Fatima Bin Hammad' },
]

export default function CatalogueVisibilityRules() {
  const [filter, setFilter] = useState<'All' | 'Role-Based' | 'Entity-Based' | 'Department-Based' | 'Hybrid'>('All')

  const stats = {
    activeRules: visibilityRules.filter(v => v.status === 'Active').length,
    roleFilters: visibilityRules.filter(v => v.ruleType === 'Role-Based' && v.status === 'Active').length,
    entityFilters: visibilityRules.filter(v => v.ruleType === 'Entity-Based' && v.status === 'Active').length,
    totalServicesControlled: 156, // Total catalogue size
  }

  const filtered = filter === 'All' ? visibilityRules : visibilityRules.filter(v => v.ruleType === filter)

  const getRuleTypeIcon = (type: string) => {
    switch (type) {
      case 'Role-Based': return <Users size={16} className="text-status-info" strokeWidth={1.5} />
      case 'Entity-Based': return <Building2 size={16} className="text-status-success" strokeWidth={1.5} />
      case 'Department-Based': return <Shield size={16} className="text-status-warning" strokeWidth={1.5} />
      case 'Hybrid': return <Globe size={16} className="text-dq-orange" strokeWidth={1.5} />
      default: return <Eye size={16} className="text-text-muted" strokeWidth={1.5} />
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Catalogue Visibility Rules</h1>
          <p className="text-sm text-text-muted">Configure service catalogue visibility by role, entity, and department</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} strokeWidth={2} />
          Create Rule
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active Rules</p>
            <Eye size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.activeRules}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Role Filters</p>
            <Users size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.roleFilters}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Entity Filters</p>
            <Building2 size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.entityFilters}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Services Controlled</p>
            <Globe size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text">{stats.totalServicesControlled}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Role-Based', 'Entity-Based', 'Department-Based', 'Hybrid'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-btn transition-colors ${
              filter === f
                ? 'bg-dq-navy text-white'
                : 'bg-surface-1 text-text-muted hover:bg-border-subtle'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-1 border-b border-border-subtle">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Rule Name</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Affected Roles</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Entities</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Services</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Visible</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Hidden</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Priority</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((rule) => (
                <tr key={rule.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-1 flex items-center justify-center shrink-0">
                        {getRuleTypeIcon(rule.ruleType)}
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{rule.name}</p>
                        <p className="text-xs text-text-muted">{rule.description}</p>
                        <p className="text-xs text-text-disabled font-mono mt-0.5">{rule.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-secondary">
                      {rule.ruleType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {rule.affectedRoles.slice(0, 3).map((role) => (
                        <span key={role} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-status-info-surface text-status-info-text">
                          {role}
                        </span>
                      ))}
                      {rule.affectedRoles.length > 3 && (
                        <span className="text-xs text-text-muted">+{rule.affectedRoles.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {rule.affectedEntities[0] === 'All' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-secondary">
                          All Entities
                        </span>
                      ) : (
                        rule.affectedEntities.map((entity) => (
                          <span key={entity} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-status-success-surface text-status-success-text">
                            {entity.split(' ')[1]}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-text-primary">{rule.servicesControlled}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-status-success-surface text-status-success-text text-xs font-bold">
                      {rule.servicesVisible}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {rule.servicesHidden > 0 ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-status-error-surface text-status-error-text text-xs font-bold">
                        {rule.servicesHidden}
                      </span>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono text-text-primary">{rule.priority}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={rule.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit rule">
                        <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Preview catalogue">
                        <Eye size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-4 bg-navy-50 border border-dq-navy/20 rounded-card">
        <p className="text-xs font-semibold text-dq-navy uppercase tracking-wider mb-2">Rule Priority & Inheritance</p>
        <p className="text-sm text-text-secondary leading-relaxed">
          Rules are applied in priority order (0 = highest). <strong>Role-based</strong> rules take precedence over entity or department rules. When multiple rules apply to a user, the most restrictive visibility is enforced. Platform admins (priority 0) always see the full catalogue.
        </p>
      </div>
    </div>
  )
}
