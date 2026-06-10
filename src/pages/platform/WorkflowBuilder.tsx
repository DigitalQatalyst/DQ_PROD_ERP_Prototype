import { useState } from 'react'
import { Plus, Edit2, Play, Copy, GitMerge, Layers, CheckCircle2, AlertTriangle } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface Workflow {
  id: string
  name: string
  description: string
  category: string
  status: 'Active' | 'Draft' | 'Testing'
  triggerType: 'Manual' | 'Automatic' | 'Scheduled'
  stepCount: number
  approvalNodes: number
  conditionNodes: number
  servicesLinked: number
  executionCount: number
  successRate: number
  avgDurationHours: number
  lastModified: string
  modifiedBy: string
}

const workflows: Workflow[] = [
  { id: 'WF-001', name: 'Standard Expense Approval', description: 'Single-tier approval for expenses under AED 5,000', category: 'Finance', status: 'Active', triggerType: 'Automatic', stepCount: 5, approvalNodes: 1, conditionNodes: 2, servicesLinked: 3, executionCount: 1247, successRate: 98, avgDurationHours: 4.2, lastModified: '14 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'WF-002', name: 'High-Value Expense Approval', description: 'Multi-tier approval for expenses over AED 5,000', category: 'Finance', status: 'Active', triggerType: 'Automatic', stepCount: 8, approvalNodes: 3, conditionNodes: 3, servicesLinked: 2, executionCount: 342, successRate: 94, avgDurationHours: 18.5, lastModified: '15 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'WF-003', name: 'Invoice Payment Processing', description: 'Vendor invoice review and payment approval', category: 'Finance', status: 'Active', triggerType: 'Automatic', stepCount: 9, approvalNodes: 2, conditionNodes: 4, servicesLinked: 6, executionCount: 892, successRate: 96, avgDurationHours: 12.3, lastModified: '16 May 2026', modifiedBy: 'Sara Pereira' },
  { id: 'WF-004', name: 'Purchase Request — Standard', description: 'Procurement approval for goods under AED 10,000', category: 'Procurement', status: 'Active', triggerType: 'Automatic', stepCount: 7, approvalNodes: 2, conditionNodes: 3, servicesLinked: 8, executionCount: 567, successRate: 93, avgDurationHours: 28.7, lastModified: '13 May 2026', modifiedBy: 'Yasmin Al-Mansoori' },
  { id: 'WF-005', name: 'Purchase Request — High Value', description: 'Multi-level procurement approval over AED 10,000', category: 'Procurement', status: 'Active', triggerType: 'Automatic', stepCount: 11, approvalNodes: 4, conditionNodes: 5, servicesLinked: 4, executionCount: 198, successRate: 89, avgDurationHours: 52.4, lastModified: '12 May 2026', modifiedBy: 'Yasmin Al-Mansoori' },
  { id: 'WF-006', name: 'Vendor Onboarding', description: 'New vendor registration and compliance approval', category: 'Procurement', status: 'Active', triggerType: 'Manual', stepCount: 12, approvalNodes: 3, conditionNodes: 6, servicesLinked: 2, executionCount: 47, successRate: 87, avgDurationHours: 96.2, lastModified: '10 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'WF-007', name: 'Annual Leave Approval', description: 'Manager approval for annual leave requests', category: 'HR', status: 'Active', triggerType: 'Automatic', stepCount: 4, approvalNodes: 1, conditionNodes: 1, servicesLinked: 9, executionCount: 678, successRate: 99, avgDurationHours: 2.8, lastModified: '09 May 2026', modifiedBy: 'Fatima Bin Hammad' },
  { id: 'WF-008', name: 'Sick Leave Notification', description: 'Immediate notification with post-approval for medical cert', category: 'HR', status: 'Active', triggerType: 'Automatic', stepCount: 6, approvalNodes: 1, conditionNodes: 2, servicesLinked: 4, executionCount: 234, successRate: 97, avgDurationHours: 8.1, lastModified: '08 May 2026', modifiedBy: 'Fatima Bin Hammad' },
  { id: 'WF-009', name: 'Employee Onboarding', description: 'Multi-department onboarding checklist workflow', category: 'HR', status: 'Active', triggerType: 'Manual', stepCount: 16, approvalNodes: 2, conditionNodes: 7, servicesLinked: 6, executionCount: 23, successRate: 91, avgDurationHours: 120.5, lastModified: '17 May 2026', modifiedBy: 'Fatima Bin Hammad' },
  { id: 'WF-010', name: 'Employee Offboarding', description: 'Exit clearance and asset return workflow', category: 'HR', status: 'Active', triggerType: 'Manual', stepCount: 14, approvalNodes: 3, conditionNodes: 5, servicesLinked: 5, executionCount: 8, successRate: 88, avgDurationHours: 156.3, lastModified: '15 May 2026', modifiedBy: 'Rashid Ahmed' },
  { id: 'WF-011', name: 'Asset Assignment', description: 'IT equipment assignment and custody tracking', category: 'Inventory', status: 'Active', triggerType: 'Automatic', stepCount: 6, approvalNodes: 1, conditionNodes: 2, servicesLinked: 11, executionCount: 312, successRate: 95, avgDurationHours: 18.2, lastModified: '14 May 2026', modifiedBy: 'Rashid Ahmed' },
  { id: 'WF-012', name: 'Stock Issue Request', description: 'Office supplies and consumables approval', category: 'Inventory', status: 'Active', triggerType: 'Automatic', stepCount: 4, approvalNodes: 1, conditionNodes: 1, servicesLinked: 8, executionCount: 487, successRate: 98, avgDurationHours: 6.4, lastModified: '13 May 2026', modifiedBy: 'Maya Sharma' },
  { id: 'WF-013', name: 'Business Travel Approval', description: 'Travel booking approval and per-diem calculation', category: 'Admin', status: 'Active', triggerType: 'Manual', stepCount: 8, approvalNodes: 2, conditionNodes: 3, servicesLinked: 7, executionCount: 145, successRate: 92, avgDurationHours: 32.1, lastModified: '11 May 2026', modifiedBy: 'Maya Sharma' },
  { id: 'WF-014', name: 'Customer Onboarding', description: 'New customer master data and credit approval', category: 'Finance', status: 'Active', triggerType: 'Manual', stepCount: 10, approvalNodes: 2, conditionNodes: 4, servicesLinked: 4, executionCount: 31, successRate: 90, avgDurationHours: 84.7, lastModified: '16 May 2026', modifiedBy: 'Sara Pereira' },
  { id: 'WF-015', name: 'Budget Requisition', description: 'Budget allocation request and justification approval', category: 'Finance', status: 'Active', triggerType: 'Manual', stepCount: 7, approvalNodes: 2, conditionNodes: 3, servicesLinked: 5, executionCount: 78, successRate: 85, avgDurationHours: 48.3, lastModified: '15 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'WF-016', name: 'Project Setup', description: 'New project dimension creation and approval', category: 'Project', status: 'Active', triggerType: 'Manual', stepCount: 9, approvalNodes: 2, conditionNodes: 4, servicesLinked: 5, executionCount: 42, successRate: 88, avgDurationHours: 56.2, lastModified: '12 May 2026', modifiedBy: 'Layla Seitkali' },
  { id: 'WF-017', name: 'Master Data Change', description: 'Entity, cost centre, or dimension change approval', category: 'Governance', status: 'Active', triggerType: 'Manual', stepCount: 8, approvalNodes: 3, conditionNodes: 3, servicesLinked: 6, executionCount: 67, successRate: 91, avgDurationHours: 36.8, lastModified: '14 May 2026', modifiedBy: 'Tariq Al-Amin' },
  { id: 'WF-018', name: 'SaaS Subscription Renewal', description: 'Subscription renewal approval and budget check', category: 'Procurement', status: 'Draft', triggerType: 'Scheduled', stepCount: 6, approvalNodes: 2, conditionNodes: 2, servicesLinked: 0, executionCount: 0, successRate: 0, avgDurationHours: 0, lastModified: '17 May 2026', modifiedBy: 'Yasmin Al-Mansoori' },
  { id: 'WF-019', name: 'Tax Compliance Filing', description: 'VAT return review and submission approval', category: 'Finance', status: 'Draft', triggerType: 'Manual', stepCount: 7, approvalNodes: 2, conditionNodes: 3, servicesLinked: 0, executionCount: 0, successRate: 0, avgDurationHours: 0, lastModified: '16 May 2026', modifiedBy: 'Mohammed Rashid' },
]

export default function WorkflowBuilder() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Draft' | 'Testing'>('All')

  const stats = {
    active: workflows.filter(w => w.status === 'Active').length,
    draft: workflows.filter(w => w.status === 'Draft').length,
    totalSteps: workflows.reduce((sum, w) => sum + w.stepCount, 0),
    servicesLinked: workflows.filter(w => w.status === 'Active').reduce((sum, w) => sum + w.servicesLinked, 0),
  }

  const filtered = filter === 'All' ? workflows : workflows.filter(w => w.status === filter)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Workflow Builder</h1>
          <p className="text-sm text-text-muted">Visual workflow builder for approval and routing configuration</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} strokeWidth={2} />
          Build Workflow
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active Workflows</p>
            <CheckCircle2 size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.active}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Draft Workflows</p>
            <Edit2 size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.draft}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Total Steps</p>
            <Layers size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.totalSteps}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Services Linked</p>
            <GitMerge size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text">{stats.servicesLinked}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Active', 'Draft', 'Testing'] as const).map((f) => (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Workflow Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Trigger</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Steps</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approvals</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Conditions</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Services</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Executions</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Success Rate</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((wf) => (
                <tr key={wf.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-1 flex items-center justify-center shrink-0">
                        <GitMerge size={16} className="text-dq-orange" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{wf.name}</p>
                        <p className="text-xs text-text-muted">{wf.description}</p>
                        <p className="text-xs text-text-disabled font-mono mt-0.5">{wf.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-secondary">
                      {wf.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs text-text-secondary">{wf.triggerType}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-text-primary">{wf.stepCount}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-status-info-surface text-status-info-text text-xs font-bold">
                      {wf.approvalNodes}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-status-warning-surface text-status-warning-text text-xs font-bold">
                      {wf.conditionNodes}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-text-primary">{wf.servicesLinked}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {wf.executionCount > 0 ? (
                      <span className="font-mono text-text-secondary text-xs">{wf.executionCount}</span>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {wf.status === 'Active' ? (
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-12 h-2 bg-surface-1 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              wf.successRate >= 95 ? 'bg-status-success' :
                              wf.successRate >= 85 ? 'bg-status-warning' :
                              'bg-status-error'
                            }`}
                            style={{ width: `${wf.successRate}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-text-secondary">{wf.successRate}%</span>
                      </div>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={wf.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit workflow">
                        <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Duplicate workflow">
                        <Copy size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Test workflow">
                        <Play size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-4 bg-orange-50 border border-dq-orange/20 rounded-card">
        <p className="text-xs font-semibold text-dq-orange uppercase tracking-wider mb-2">Workflow Node Types</p>
        <div className="grid grid-cols-3 gap-4 text-sm text-text-secondary">
          <div>
            <span className="font-semibold text-text-primary">Approval Node:</span> Requires human decision (approve/reject/clarify)
          </div>
          <div>
            <span className="font-semibold text-text-primary">Condition Node:</span> Branching logic based on amount, entity, or attribute
          </div>
          <div>
            <span className="font-semibold text-text-primary">Action Node:</span> Automated tasks (notification, sync, assignment)
          </div>
        </div>
      </div>
    </div>
  )
}
