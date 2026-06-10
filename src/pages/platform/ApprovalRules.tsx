import { useState } from 'react'
import { Plus, Edit2, Eye, CheckCircle2, GitBranch, AlertCircle, Zap } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface ApprovalRule {
  id: string
  name: string
  description: string
  ruleType: 'Amount-Based' | 'Role-Based' | 'Entity-Based' | 'Conditional'
  status: 'Active' | 'Draft' | 'Suspended'
  priority: number
  appliesTo: string[]
  approverType: 'Fixed' | 'Dynamic' | 'Hierarchical' | 'Role-Based'
  approverCount: number
  requiresSequential: boolean
  requiresUnanimous: boolean
  servicesLinked: number
  executionCount: number
  lastModified: string
  modifiedBy: string
}

const approvalRules: ApprovalRule[] = [
  { id: 'AR-001', name: 'Expense < AED 5K - Direct Manager', description: 'Expenses under AED 5,000 require only direct manager approval', ruleType: 'Amount-Based', status: 'Active', priority: 10, appliesTo: ['Expense Management'], approverType: 'Hierarchical', approverCount: 1, requiresSequential: false, requiresUnanimous: false, servicesLinked: 3, executionCount: 1247, lastModified: '14 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'AR-002', name: 'Expense AED 5K-20K - Manager + Finance', description: 'Expenses AED 5K-20K need manager and finance owner approval', ruleType: 'Amount-Based', status: 'Active', priority: 9, appliesTo: ['Expense Management'], approverType: 'Fixed', approverCount: 2, requiresSequential: true, requiresUnanimous: true, servicesLinked: 2, executionCount: 342, lastModified: '15 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'AR-003', name: 'Expense > AED 20K - Manager + Finance + Exec', description: 'High-value expenses require executive sign-off', ruleType: 'Amount-Based', status: 'Active', priority: 8, appliesTo: ['Expense Management'], approverType: 'Fixed', approverCount: 3, requiresSequential: true, requiresUnanimous: true, servicesLinked: 1, executionCount: 67, lastModified: '14 May 2026', modifiedBy: 'Aisha Khalid' },
  { id: 'AR-004', name: 'Invoice < AED 10K - Finance Ops', description: 'Standard invoices approved by finance operations', ruleType: 'Amount-Based', status: 'Active', priority: 10, appliesTo: ['Invoice Processing'], approverType: 'Dynamic', approverCount: 1, requiresSequential: false, requiresUnanimous: false, servicesLinked: 4, executionCount: 623, lastModified: '16 May 2026', modifiedBy: 'Sara Pereira' },
  { id: 'AR-005', name: 'Invoice AED 10K-50K - Finance Owner', description: 'Medium-value invoices need finance owner approval', ruleType: 'Amount-Based', status: 'Active', priority: 9, appliesTo: ['Invoice Processing'], approverType: 'Fixed', approverCount: 1, requiresSequential: false, requiresUnanimous: false, servicesLinked: 2, executionCount: 189, lastModified: '15 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'AR-006', name: 'Invoice > AED 50K - Finance Owner + Exec', description: 'High-value invoices require executive approval', ruleType: 'Amount-Based', status: 'Active', priority: 8, appliesTo: ['Invoice Processing'], approverType: 'Fixed', approverCount: 2, requiresSequential: true, requiresUnanimous: true, servicesLinked: 1, executionCount: 42, lastModified: '16 May 2026', modifiedBy: 'Aisha Khalid' },
  { id: 'AR-007', name: 'Purchase < AED 10K - Manager + Procurement', description: 'Standard purchases need manager and procurement approval', ruleType: 'Amount-Based', status: 'Active', priority: 10, appliesTo: ['Purchase Requests'], approverType: 'Fixed', approverCount: 2, requiresSequential: false, requiresUnanimous: true, servicesLinked: 8, executionCount: 412, lastModified: '13 May 2026', modifiedBy: 'Yasmin Al-Mansoori' },
  { id: 'AR-008', name: 'Purchase AED 10K-50K - Manager + Procurement + Finance', description: 'Medium purchases include finance approval', ruleType: 'Amount-Based', status: 'Active', priority: 9, appliesTo: ['Purchase Requests'], approverType: 'Fixed', approverCount: 3, requiresSequential: true, requiresUnanimous: true, servicesLinked: 4, executionCount: 134, lastModified: '12 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'AR-009', name: 'Purchase > AED 50K - Full Approval Chain', description: 'High-value procurement requires executive sign-off', ruleType: 'Amount-Based', status: 'Active', priority: 8, appliesTo: ['Purchase Requests'], approverType: 'Fixed', approverCount: 4, requiresSequential: true, requiresUnanimous: true, servicesLinked: 2, executionCount: 64, lastModified: '14 May 2026', modifiedBy: 'Aisha Khalid' },
  { id: 'AR-010', name: 'Vendor Onboarding - Procurement + Finance + Compliance', description: 'New vendors require multi-department approval', ruleType: 'Conditional', status: 'Active', priority: 5, appliesTo: ['Vendor Management'], approverType: 'Fixed', approverCount: 3, requiresSequential: false, requiresUnanimous: true, servicesLinked: 2, executionCount: 47, lastModified: '10 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'AR-011', name: 'Annual Leave - Direct Manager', description: 'Leave requests approved by direct manager', ruleType: 'Role-Based', status: 'Active', priority: 10, appliesTo: ['Leave Management'], approverType: 'Hierarchical', approverCount: 1, requiresSequential: false, requiresUnanimous: false, servicesLinked: 9, executionCount: 678, lastModified: '09 May 2026', modifiedBy: 'Fatima Bin Hammad' },
  { id: 'AR-012', name: 'Extended Leave (>10 days) - Manager + HR', description: 'Long leave requires HR approval', ruleType: 'Conditional', status: 'Active', priority: 9, appliesTo: ['Leave Management'], approverType: 'Fixed', approverCount: 2, requiresSequential: false, requiresUnanimous: true, servicesLinked: 3, executionCount: 89, lastModified: '08 May 2026', modifiedBy: 'Fatima Bin Hammad' },
  { id: 'AR-013', name: 'Employee Onboarding - Manager + HR + IT', description: 'New employee setup requires cross-functional approval', ruleType: 'Conditional', status: 'Active', priority: 5, appliesTo: ['Employee Lifecycle'], approverType: 'Fixed', approverCount: 3, requiresSequential: false, requiresUnanimous: true, servicesLinked: 6, executionCount: 23, lastModified: '17 May 2026', modifiedBy: 'Fatima Bin Hammad' },
  { id: 'AR-014', name: 'Asset Assignment < AED 5K - IT Manager', description: 'Standard asset assignments approved by IT manager', ruleType: 'Amount-Based', status: 'Active', priority: 10, appliesTo: ['Asset Assignment'], approverType: 'Dynamic', approverCount: 1, requiresSequential: false, requiresUnanimous: false, servicesLinked: 9, executionCount: 278, lastModified: '14 May 2026', modifiedBy: 'Rashid Ahmed' },
  { id: 'AR-015', name: 'Asset Assignment > AED 5K - IT Manager + Finance', description: 'High-value assets require finance approval', ruleType: 'Amount-Based', status: 'Active', priority: 9, appliesTo: ['Asset Assignment'], approverType: 'Fixed', approverCount: 2, requiresSequential: false, requiresUnanimous: true, servicesLinked: 3, executionCount: 34, lastModified: '13 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'AR-016', name: 'Business Travel Domestic - Manager', description: 'Domestic travel approved by direct manager', ruleType: 'Conditional', status: 'Active', priority: 10, appliesTo: ['Travel & Accommodation'], approverType: 'Hierarchical', approverCount: 1, requiresSequential: false, requiresUnanimous: false, servicesLinked: 4, executionCount: 92, lastModified: '11 May 2026', modifiedBy: 'Maya Sharma' },
  { id: 'AR-017', name: 'Business Travel International - Manager + Finance', description: 'International travel requires finance approval', ruleType: 'Conditional', status: 'Active', priority: 9, appliesTo: ['Travel & Accommodation'], approverType: 'Fixed', approverCount: 2, requiresSequential: true, requiresUnanimous: true, servicesLinked: 3, executionCount: 53, lastModified: '10 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'AR-018', name: 'Customer Onboarding - Sales + Finance + Compliance', description: 'New customer requires multi-stakeholder approval', ruleType: 'Conditional', status: 'Active', priority: 5, appliesTo: ['Customer Onboarding'], approverType: 'Fixed', approverCount: 3, requiresSequential: false, requiresUnanimous: true, servicesLinked: 4, executionCount: 31, lastModified: '16 May 2026', modifiedBy: 'Sara Pereira' },
  { id: 'AR-019', name: 'Budget Requisition < AED 25K - Finance Owner', description: 'Small budget requests approved by finance owner', ruleType: 'Amount-Based', status: 'Active', priority: 10, appliesTo: ['Budget & Allocation'], approverType: 'Fixed', approverCount: 1, requiresSequential: false, requiresUnanimous: false, servicesLinked: 3, executionCount: 52, lastModified: '15 May 2026', modifiedBy: 'Mohammed Rashid' },
  { id: 'AR-020', name: 'Budget Requisition > AED 25K - Finance Owner + Exec', description: 'Large budget requests require executive approval', ruleType: 'Amount-Based', status: 'Active', priority: 9, appliesTo: ['Budget & Allocation'], approverType: 'Fixed', approverCount: 2, requiresSequential: true, requiresUnanimous: true, servicesLinked: 2, executionCount: 26, lastModified: '14 May 2026', modifiedBy: 'Aisha Khalid' },
  { id: 'AR-021', name: 'Master Data Change - Entity-Specific Approver', description: 'Master data changes routed by entity ownership', ruleType: 'Entity-Based', status: 'Active', priority: 8, appliesTo: ['Master Data Changes'], approverType: 'Dynamic', approverCount: 2, requiresSequential: true, requiresUnanimous: true, servicesLinked: 6, executionCount: 67, lastModified: '13 May 2026', modifiedBy: 'Tariq Al-Amin' },
]

export default function ApprovalRules() {
  const [filter, setFilter] = useState<'All' | 'Amount-Based' | 'Role-Based' | 'Entity-Based' | 'Conditional'>('All')

  const stats = {
    activeRules: approvalRules.filter(r => r.status === 'Active').length,
    draftRules: approvalRules.filter(r => r.status === 'Draft').length,
    conditionalRules: approvalRules.filter(r => r.ruleType === 'Conditional' && r.status === 'Active').length,
    servicesCovered: [...new Set(approvalRules.flatMap(r => r.appliesTo))].length,
  }

  const filtered = filter === 'All' ? approvalRules : approvalRules.filter(r => r.ruleType === filter)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Approval Rules</h1>
          <p className="text-sm text-text-muted">Configure approval routing rules and decision logic</p>
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
            <CheckCircle2 size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.activeRules}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Draft Rules</p>
            <Edit2 size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.draftRules}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Conditional Rules</p>
            <GitBranch size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.conditionalRules}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Categories Covered</p>
            <Zap size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text">{stats.servicesCovered}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Amount-Based', 'Role-Based', 'Entity-Based', 'Conditional'] as const).map((f) => (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Applies To</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approver Type</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Count</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Sequential</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Unanimous</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Priority</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Executions</th>
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
                      {rule.ruleType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {rule.appliesTo.map((cat) => (
                        <span key={cat} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-status-info-surface text-status-info-text">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs text-text-secondary">{rule.approverType}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-text-primary">{rule.approverCount}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {rule.requiresSequential ? (
                      <span className="text-status-warning">✓</span>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {rule.requiresUnanimous ? (
                      <span className="text-status-error">✓</span>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono text-text-primary">{rule.priority}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono text-text-secondary text-xs">{rule.executionCount}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={rule.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit rule">
                        <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="View execution history">
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

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-status-info-surface border border-status-info/20 rounded-card">
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Sequential vs Parallel Approval</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            <strong>Sequential:</strong> Approvers must act in order (step 1, then step 2). <strong>Parallel:</strong> All approvers receive the request simultaneously.
          </p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Unanimous vs Any Approval</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            <strong>Unanimous:</strong> All approvers must approve. <strong>Any:</strong> A single approval is sufficient to proceed.
          </p>
        </div>
      </div>
    </div>
  )
}
