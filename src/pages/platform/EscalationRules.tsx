import { useState } from 'react'
import { Plus, Edit2, Clock, AlertTriangle, TrendingUp, Zap } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface EscalationRule {
  id: string
  name: string
  description: string
  triggerType: 'Time-Based' | 'Condition-Based' | 'SLA-Based' | 'Manual'
  category: string
  status: 'Active' | 'Draft' | 'Suspended'
  thresholdHours?: number
  thresholdCondition?: string
  escalationPath: string[]
  notifyOwner: boolean
  autoReassign: boolean
  servicesLinked: number
  triggerCount: number
  avgEscalationTime: number
  resolutionRate: number
  lastModified: string
}

const escalationRules: EscalationRule[] = [
  { id: 'ESC-001', name: 'Expense Approval - 48h Overdue', description: 'Escalate expense approvals pending over 48 hours', triggerType: 'Time-Based', category: 'Expense Management', status: 'Active', thresholdHours: 48, escalationPath: ['Direct Manager', 'Finance Owner'], notifyOwner: true, autoReassign: false, servicesLinked: 3, triggerCount: 34, avgEscalationTime: 52.3, resolutionRate: 91, lastModified: '14 May 2026' },
  { id: 'ESC-002', name: 'High-Value Expense - 24h Overdue', description: 'Escalate expenses over AED 20K pending 24h', triggerType: 'Time-Based', category: 'Expense Management', status: 'Active', thresholdHours: 24, escalationPath: ['Finance Owner', 'Executive'], notifyOwner: true, autoReassign: false, servicesLinked: 1, triggerCount: 8, avgEscalationTime: 28.7, resolutionRate: 88, lastModified: '15 May 2026' },
  { id: 'ESC-003', name: 'Invoice Payment - 72h Overdue', description: 'Escalate invoice payments pending over 72 hours', triggerType: 'Time-Based', category: 'Invoice Processing', status: 'Active', thresholdHours: 72, escalationPath: ['Finance Ops', 'Finance Owner', 'Executive'], notifyOwner: true, autoReassign: false, servicesLinked: 6, triggerCount: 18, avgEscalationTime: 84.2, resolutionRate: 94, lastModified: '16 May 2026' },
  { id: 'ESC-004', name: 'Critical Invoice - Payment Due in 48h', description: 'Escalate unpaid invoices nearing payment deadline', triggerType: 'Condition-Based', category: 'Invoice Processing', status: 'Active', thresholdCondition: 'Payment due within 48h', escalationPath: ['Finance Owner', 'Executive'], notifyOwner: true, autoReassign: true, servicesLinked: 2, triggerCount: 12, avgEscalationTime: 36.5, resolutionRate: 96, lastModified: '15 May 2026' },
  { id: 'ESC-005', name: 'Purchase Request - 96h Overdue', description: 'Escalate purchase requests pending over 96 hours', triggerType: 'Time-Based', category: 'Purchase Requests', status: 'Active', thresholdHours: 96, escalationPath: ['Procurement Owner', 'Finance Owner'], notifyOwner: true, autoReassign: false, servicesLinked: 12, triggerCount: 27, avgEscalationTime: 108.4, resolutionRate: 89, lastModified: '13 May 2026' },
  { id: 'ESC-006', name: 'High-Value Purchase - 48h Overdue', description: 'Escalate purchases over AED 50K pending 48h', triggerType: 'Time-Based', category: 'Purchase Requests', status: 'Active', thresholdHours: 48, escalationPath: ['Procurement Owner', 'Finance Owner', 'Executive'], notifyOwner: true, autoReassign: false, servicesLinked: 2, triggerCount: 6, avgEscalationTime: 56.8, resolutionRate: 83, lastModified: '12 May 2026' },
  { id: 'ESC-007', name: 'Vendor Onboarding - 7 Days Overdue', description: 'Escalate vendor onboarding pending over 7 days', triggerType: 'Time-Based', category: 'Vendor Management', status: 'Active', thresholdHours: 168, escalationPath: ['Procurement Owner', 'Finance Owner'], notifyOwner: true, autoReassign: false, servicesLinked: 2, triggerCount: 4, avgEscalationTime: 192.3, resolutionRate: 75, lastModified: '10 May 2026' },
  { id: 'ESC-008', name: 'Leave Request - 24h Overdue', description: 'Escalate leave approvals pending over 24 hours', triggerType: 'Time-Based', category: 'Leave Management', status: 'Active', thresholdHours: 24, escalationPath: ['Direct Manager', 'HR Owner'], notifyOwner: true, autoReassign: true, servicesLinked: 9, triggerCount: 21, avgEscalationTime: 28.4, resolutionRate: 97, lastModified: '09 May 2026' },
  { id: 'ESC-009', name: 'Urgent Leave - Immediate Escalation', description: 'Escalate sick leave if not approved within 4 hours', triggerType: 'Time-Based', category: 'Leave Management', status: 'Active', thresholdHours: 4, escalationPath: ['HR Owner', 'Department Head'], notifyOwner: true, autoReassign: true, servicesLinked: 4, triggerCount: 7, avgEscalationTime: 5.2, resolutionRate: 100, lastModified: '08 May 2026' },
  { id: 'ESC-010', name: 'Employee Onboarding - 48h Overdue', description: 'Escalate onboarding tasks pending over 48 hours', triggerType: 'Time-Based', category: 'Employee Lifecycle', status: 'Active', thresholdHours: 48, escalationPath: ['HR Owner', 'Department Head'], notifyOwner: true, autoReassign: false, servicesLinked: 6, triggerCount: 3, avgEscalationTime: 56.7, resolutionRate: 100, lastModified: '17 May 2026' },
  { id: 'ESC-011', name: 'Asset Assignment - 24h Overdue', description: 'Escalate asset assignments pending over 24 hours', triggerType: 'Time-Based', category: 'Asset Assignment', status: 'Active', thresholdHours: 24, escalationPath: ['IT Manager', 'Operations Lead'], notifyOwner: true, autoReassign: false, servicesLinked: 11, triggerCount: 14, avgEscalationTime: 32.1, resolutionRate: 93, lastModified: '14 May 2026' },
  { id: 'ESC-012', name: 'Critical Asset - Immediate Escalation', description: 'Escalate urgent asset requests if not processed within 6h', triggerType: 'Condition-Based', category: 'Asset Assignment', status: 'Active', thresholdCondition: 'Priority = Urgent', escalationPath: ['Operations Lead', 'Executive'], notifyOwner: true, autoReassign: true, servicesLinked: 3, triggerCount: 2, avgEscalationTime: 8.5, resolutionRate: 100, lastModified: '13 May 2026' },
  { id: 'ESC-013', name: 'Business Travel - 72h Overdue', description: 'Escalate travel approvals pending over 72 hours', triggerType: 'Time-Based', category: 'Travel & Accommodation', status: 'Active', thresholdHours: 72, escalationPath: ['Direct Manager', 'Finance Owner'], notifyOwner: true, autoReassign: false, servicesLinked: 7, triggerCount: 9, avgEscalationTime: 84.3, resolutionRate: 89, lastModified: '11 May 2026' },
  { id: 'ESC-014', name: 'Urgent Travel - 24h Before Departure', description: 'Escalate travel requests not approved 24h before departure', triggerType: 'Condition-Based', category: 'Travel & Accommodation', status: 'Active', thresholdCondition: 'Departure within 24h', escalationPath: ['Finance Owner', 'Executive'], notifyOwner: true, autoReassign: true, servicesLinked: 2, triggerCount: 3, avgEscalationTime: 12.7, resolutionRate: 100, lastModified: '10 May 2026' },
  { id: 'ESC-015', name: 'Customer Onboarding - 5 Days Overdue', description: 'Escalate customer onboarding pending over 5 days', triggerType: 'Time-Based', category: 'Customer Onboarding', status: 'Active', thresholdHours: 120, escalationPath: ['Sales Lead', 'Finance Owner', 'Executive'], notifyOwner: true, autoReassign: false, servicesLinked: 4, triggerCount: 2, avgEscalationTime: 136.4, resolutionRate: 100, lastModified: '16 May 2026' },
  { id: 'ESC-016', name: 'Budget Requisition - 72h Overdue', description: 'Escalate budget requisitions pending over 72 hours', triggerType: 'Time-Based', category: 'Budget & Allocation', status: 'Active', thresholdHours: 72, escalationPath: ['Finance Owner', 'Executive'], notifyOwner: true, autoReassign: false, servicesLinked: 5, triggerCount: 6, avgEscalationTime: 84.2, resolutionRate: 83, lastModified: '15 May 2026' },
  { id: 'ESC-017', name: 'Master Data Change - 48h Overdue', description: 'Escalate master data changes pending over 48 hours', triggerType: 'Time-Based', category: 'Master Data Changes', status: 'Active', thresholdHours: 48, escalationPath: ['Data Steward', 'Platform Admin'], notifyOwner: true, autoReassign: false, servicesLinked: 6, triggerCount: 5, avgEscalationTime: 56.3, resolutionRate: 100, lastModified: '13 May 2026' },
  { id: 'ESC-018', name: 'Evidence Missing - 24h Warning', description: 'Escalate requests with missing evidence after 24h', triggerType: 'Condition-Based', category: 'All Categories', status: 'Active', thresholdCondition: 'Evidence pending > 24h', escalationPath: ['Request Owner', 'Service Owner'], notifyOwner: true, autoReassign: false, servicesLinked: 156, triggerCount: 47, avgEscalationTime: 32.6, resolutionRate: 87, lastModified: '14 May 2026' },
  { id: 'ESC-019', name: 'SLA Breach - 80% Threshold', description: 'Escalate when SLA time reaches 80% without action', triggerType: 'SLA-Based', category: 'All Categories', status: 'Active', thresholdCondition: 'SLA elapsed >= 80%', escalationPath: ['Service Owner', 'Operations Lead'], notifyOwner: true, autoReassign: false, servicesLinked: 156, triggerCount: 23, avgEscalationTime: 18.4, resolutionRate: 91, lastModified: '15 May 2026' },
]

export default function EscalationRules() {
  const [filter, setFilter] = useState<'All' | 'Time-Based' | 'Condition-Based' | 'SLA-Based'>('All')

  const stats = {
    activeRules: escalationRules.filter(r => r.status === 'Active').length,
    timeBased: escalationRules.filter(r => r.triggerType === 'Time-Based').length,
    conditionBased: escalationRules.filter(r => r.triggerType === 'Condition-Based' || r.triggerType === 'SLA-Based').length,
    totalEscalationPaths: escalationRules.reduce((sum, r) => sum + r.escalationPath.length, 0),
  }

  const filtered = filter === 'All' ? escalationRules : escalationRules.filter(r => r.triggerType === filter)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Escalation Rules</h1>
          <p className="text-sm text-text-muted">Configure escalation triggers and escalation paths</p>
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
            <Zap size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.activeRules}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Time-Based</p>
            <Clock size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.timeBased}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Condition-Based</p>
            <AlertTriangle size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.conditionBased}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Escalation Paths</p>
            <TrendingUp size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text">{stats.totalEscalationPaths}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Time-Based', 'Condition-Based', 'SLA-Based'] as const).map((f) => (
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
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Trigger Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Threshold</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Escalation Path</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Auto-Reassign</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Triggers</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Resolution</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((rule) => (
                <tr key={rule.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-text-primary">{rule.name}</p>
                      <p className="text-xs text-text-muted">{rule.description}</p>
                      <p className="text-xs text-text-disabled font-mono mt-0.5">{rule.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-secondary">
                      {rule.triggerType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary">{rule.category}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {rule.thresholdHours ? (
                      <div className="flex items-center justify-center gap-1">
                        <Clock size={12} className="text-status-warning" strokeWidth={1.5} />
                        <span className="text-xs font-mono text-text-primary">{rule.thresholdHours}h</span>
                      </div>
                    ) : (
                      <span className="text-xs text-text-muted italic">{rule.thresholdCondition}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      {rule.escalationPath.map((step, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-status-error-surface text-status-error-text">
                          {i + 1}. {step}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {rule.autoReassign ? (
                      <span className="text-status-warning">✓</span>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {rule.triggerCount > 0 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-status-warning-surface text-status-warning-text text-xs font-bold">
                        {rule.triggerCount}
                      </span>
                    ) : (
                      <span className="text-text-disabled">0</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {rule.triggerCount > 0 ? (
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-12 h-2 bg-surface-1 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              rule.resolutionRate >= 90 ? 'bg-status-success' :
                              rule.resolutionRate >= 75 ? 'bg-status-warning' :
                              'bg-status-error'
                            }`}
                            style={{ width: `${rule.resolutionRate}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-text-secondary">{rule.resolutionRate}%</span>
                      </div>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={rule.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit rule">
                        <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
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
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Auto-Reassign Behavior</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            When auto-reassign is enabled, escalated items are automatically transferred to the next approver in the path. When disabled, items remain with the original approver and notification-only is sent to escalation contacts.
          </p>
        </div>
        <div className="p-4 bg-status-error-surface border border-status-error/20 rounded-card">
          <p className="text-xs font-semibold text-status-error-text uppercase tracking-wider mb-2">Escalation Path Priority</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Escalation paths are followed sequentially. If step 1 doesn't resolve within the next threshold period, escalation proceeds to step 2, and so on. Each escalation sends notifications and logs an audit event.
          </p>
        </div>
      </div>
    </div>
  )
}
