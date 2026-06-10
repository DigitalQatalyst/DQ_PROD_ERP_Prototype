import { useState } from 'react'
import { Plus, Edit2, Clock, AlertCircle, TrendingUp, Activity } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface SLARule {
  id: string
  name: string
  category: string
  priority: 'Critical' | 'High' | 'Standard' | 'Low'
  responseTimeHours: number
  resolutionTimeHours: number
  escalationThresholdPct: number
  status: 'Active' | 'Draft' | 'Suspended'
  servicesLinked: number
  currentBreaches: number
  avgCompliancePct: number
  lastModified: string
}

const slaRules: SLARule[] = [
  { id: 'SLA-001', name: 'Critical Finance - High Value Invoice', category: 'Invoice Processing', priority: 'Critical', responseTimeHours: 2, resolutionTimeHours: 24, escalationThresholdPct: 80, status: 'Active', servicesLinked: 3, currentBreaches: 1, avgCompliancePct: 94, lastModified: '15 May 2026' },
  { id: 'SLA-002', name: 'Standard Expense Reimbursement', category: 'Expense Management', priority: 'Standard', responseTimeHours: 4, resolutionTimeHours: 48, escalationThresholdPct: 85, status: 'Active', servicesLinked: 8, currentBreaches: 0, avgCompliancePct: 97, lastModified: '14 May 2026' },
  { id: 'SLA-003', name: 'Travel Expense - Urgent', category: 'Expense Management', priority: 'High', responseTimeHours: 3, resolutionTimeHours: 36, escalationThresholdPct: 80, status: 'Active', servicesLinked: 2, currentBreaches: 0, avgCompliancePct: 96, lastModified: '12 May 2026' },
  { id: 'SLA-004', name: 'Purchase Request - Standard Goods', category: 'Purchase Requests', priority: 'Standard', responseTimeHours: 6, resolutionTimeHours: 72, escalationThresholdPct: 85, status: 'Active', servicesLinked: 12, currentBreaches: 1, avgCompliancePct: 92, lastModified: '16 May 2026' },
  { id: 'SLA-005', name: 'Purchase Request - Services', category: 'Purchase Requests', priority: 'Standard', responseTimeHours: 8, resolutionTimeHours: 96, escalationThresholdPct: 85, status: 'Active', servicesLinked: 7, currentBreaches: 0, avgCompliancePct: 95, lastModified: '13 May 2026' },
  { id: 'SLA-006', name: 'Vendor Onboarding - Critical', category: 'Vendor Management', priority: 'High', responseTimeHours: 4, resolutionTimeHours: 120, escalationThresholdPct: 75, status: 'Active', servicesLinked: 2, currentBreaches: 0, avgCompliancePct: 89, lastModified: '10 May 2026' },
  { id: 'SLA-007', name: 'Vendor Master Data Change', category: 'Vendor Management', priority: 'Standard', responseTimeHours: 12, resolutionTimeHours: 48, escalationThresholdPct: 85, status: 'Active', servicesLinked: 5, currentBreaches: 0, avgCompliancePct: 98, lastModified: '11 May 2026' },
  { id: 'SLA-008', name: 'Annual Leave Request', category: 'Leave Management', priority: 'Standard', responseTimeHours: 6, resolutionTimeHours: 24, escalationThresholdPct: 90, status: 'Active', servicesLinked: 9, currentBreaches: 0, avgCompliancePct: 99, lastModified: '09 May 2026' },
  { id: 'SLA-009', name: 'Sick Leave - Immediate', category: 'Leave Management', priority: 'High', responseTimeHours: 2, resolutionTimeHours: 12, escalationThresholdPct: 85, status: 'Active', servicesLinked: 4, currentBreaches: 0, avgCompliancePct: 98, lastModified: '08 May 2026' },
  { id: 'SLA-010', name: 'Employee Onboarding', category: 'Employee Lifecycle', priority: 'High', responseTimeHours: 8, resolutionTimeHours: 168, escalationThresholdPct: 75, status: 'Active', servicesLinked: 6, currentBreaches: 1, avgCompliancePct: 91, lastModified: '17 May 2026' },
  { id: 'SLA-011', name: 'Employee Change Request', category: 'Employee Lifecycle', priority: 'Standard', responseTimeHours: 12, resolutionTimeHours: 72, escalationThresholdPct: 85, status: 'Active', servicesLinked: 8, currentBreaches: 0, avgCompliancePct: 94, lastModified: '14 May 2026' },
  { id: 'SLA-012', name: 'Employment Letter', category: 'HR Documents', priority: 'Standard', responseTimeHours: 4, resolutionTimeHours: 24, escalationThresholdPct: 90, status: 'Active', servicesLinked: 6, currentBreaches: 0, avgCompliancePct: 97, lastModified: '12 May 2026' },
  { id: 'SLA-013', name: 'Asset Assignment - Standard', category: 'Asset Assignment', priority: 'Standard', responseTimeHours: 6, resolutionTimeHours: 48, escalationThresholdPct: 85, status: 'Active', servicesLinked: 11, currentBreaches: 0, avgCompliancePct: 93, lastModified: '15 May 2026' },
  { id: 'SLA-014', name: 'Asset Assignment - Urgent', category: 'Asset Assignment', priority: 'High', responseTimeHours: 3, resolutionTimeHours: 24, escalationThresholdPct: 80, status: 'Active', servicesLinked: 3, currentBreaches: 1, avgCompliancePct: 88, lastModified: '16 May 2026' },
  { id: 'SLA-015', name: 'Stock Issue Request', category: 'Stock & Consumables', priority: 'Standard', responseTimeHours: 8, resolutionTimeHours: 48, escalationThresholdPct: 85, status: 'Active', servicesLinked: 8, currentBreaches: 0, avgCompliancePct: 96, lastModified: '13 May 2026' },
  { id: 'SLA-016', name: 'Business Travel - Standard', category: 'Travel & Accommodation', priority: 'Standard', responseTimeHours: 12, resolutionTimeHours: 72, escalationThresholdPct: 85, status: 'Active', servicesLinked: 7, currentBreaches: 0, avgCompliancePct: 94, lastModified: '11 May 2026' },
  { id: 'SLA-017', name: 'Business Travel - Urgent', category: 'Travel & Accommodation', priority: 'High', responseTimeHours: 4, resolutionTimeHours: 24, escalationThresholdPct: 80, status: 'Active', servicesLinked: 2, currentBreaches: 0, avgCompliancePct: 92, lastModified: '10 May 2026' },
  { id: 'SLA-018', name: 'Customer Onboarding', category: 'Customer Onboarding', priority: 'High', responseTimeHours: 8, resolutionTimeHours: 120, escalationThresholdPct: 75, status: 'Active', servicesLinked: 4, currentBreaches: 0, avgCompliancePct: 90, lastModified: '14 May 2026' },
  { id: 'SLA-019', name: 'Budget Requisition', category: 'Budget & Allocation', priority: 'Standard', responseTimeHours: 12, resolutionTimeHours: 96, escalationThresholdPct: 85, status: 'Active', servicesLinked: 5, currentBreaches: 0, avgCompliancePct: 93, lastModified: '15 May 2026' },
  { id: 'SLA-020', name: 'Project Setup Request', category: 'Project Setup', priority: 'High', responseTimeHours: 6, resolutionTimeHours: 72, escalationThresholdPct: 80, status: 'Active', servicesLinked: 5, currentBreaches: 0, avgCompliancePct: 91, lastModified: '12 May 2026' },
  { id: 'SLA-021', name: 'Tax Compliance Filing', category: 'Tax Compliance', priority: 'Critical', responseTimeHours: 2, resolutionTimeHours: 48, escalationThresholdPct: 75, status: 'Draft', servicesLinked: 0, currentBreaches: 0, avgCompliancePct: 0, lastModified: '17 May 2026' },
]

export default function SLASetup() {
  const [filter, setFilter] = useState<'All' | 'Critical' | 'High' | 'Standard'>('All')

  const stats = {
    activeRules: slaRules.filter(s => s.status === 'Active').length,
    servicesLinked: slaRules.reduce((sum, s) => sum + s.servicesLinked, 0),
    currentBreaches: slaRules.reduce((sum, s) => sum + s.currentBreaches, 0),
    avgResponseTime: (slaRules.filter(s => s.status === 'Active').reduce((sum, s) => sum + s.responseTimeHours, 0) / slaRules.filter(s => s.status === 'Active').length).toFixed(1),
  }

  const filtered = filter === 'All' ? slaRules : slaRules.filter(s => s.priority === filter)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-status-error-surface text-status-error-text'
      case 'High': return 'bg-status-warning-surface text-status-warning-text'
      case 'Standard': return 'bg-status-info-surface text-status-info-text'
      case 'Low': return 'bg-surface-1 text-text-muted'
      default: return 'bg-surface-1 text-text-secondary'
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">SLA Setup</h1>
          <p className="text-sm text-text-muted">Configure SLA targets by service category, priority, and response requirements</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} strokeWidth={2} />
          Create SLA Rule
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active SLAs</p>
            <Activity size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.activeRules}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Services Mapped</p>
            <TrendingUp size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.servicesLinked}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active Breaches</p>
            <AlertCircle size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.currentBreaches}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Avg. Response (h)</p>
            <Clock size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text font-mono">{stats.avgResponseTime}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Critical', 'High', 'Standard'] as const).map((f) => (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">SLA Rule</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Priority</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Response (h)</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Resolution (h)</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Escalation @</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Services</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Breaches</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Compliance</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((sla) => (
                <tr key={sla.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-text-primary">{sla.name}</p>
                      <p className="text-xs text-text-muted font-mono">{sla.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary">{sla.category}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${getPriorityColor(sla.priority)}`}>
                      {sla.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono text-text-primary">{sla.responseTimeHours}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono text-text-primary">{sla.resolutionTimeHours}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono text-status-warning-text">{sla.escalationThresholdPct}%</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-text-primary">{sla.servicesLinked}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {sla.currentBreaches > 0 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-status-error text-white text-xs font-bold">
                        {sla.currentBreaches}
                      </span>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {sla.status === 'Active' ? (
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-12 h-2 bg-surface-1 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              sla.avgCompliancePct >= 95 ? 'bg-status-success' :
                              sla.avgCompliancePct >= 85 ? 'bg-status-warning' :
                              'bg-status-error'
                            }`}
                            style={{ width: `${sla.avgCompliancePct}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-text-secondary">{sla.avgCompliancePct}%</span>
                      </div>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={sla.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit SLA rule">
                        <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="View compliance history">
                        <Clock size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-status-info-surface border border-status-info/20 rounded-card">
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">SLA Escalation Logic</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Escalation triggers when elapsed time reaches the threshold percentage. Example: a 48h resolution SLA with 85% threshold escalates at 40.8h if unresolved.
          </p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Breach Monitoring</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Active breaches appear in the Escalation Queue and notify service owners. Compliance percentages calculate from completed requests in the last 30 days.
          </p>
        </div>
      </div>
    </div>
  )
}
