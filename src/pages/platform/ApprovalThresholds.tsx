import { useState } from 'react'
import { Plus, Edit2, DollarSign, AlertCircle, Users, TrendingUp } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface ApprovalThreshold {
  id: string
  name: string
  description: string
  thresholdType: 'Amount' | 'Priority' | 'Risk Score' | 'Recurrence'
  category: string
  currency?: string
  minAmount?: number
  maxAmount?: number
  priorityLevel?: string
  status: 'Active' | 'Draft' | 'Suspended'
  approver1Role: string
  approver2Role?: string
  approver3Role?: string
  approver4Role?: string
  servicesLinked: number
  avgApprovalTimeHours: number
  executionCount: number
  lastModified: string
}

const thresholds: ApprovalThreshold[] = [
  { id: 'TH-001', name: 'Expense Tier 1 - Under AED 5K', description: 'Low-value expenses', thresholdType: 'Amount', category: 'Expense Management', currency: 'AED', minAmount: 0, maxAmount: 5000, status: 'Active', approver1Role: 'Direct Manager', servicesLinked: 3, avgApprovalTimeHours: 4.2, executionCount: 1247, lastModified: '14 May 2026' },
  { id: 'TH-002', name: 'Expense Tier 2 - AED 5K-20K', description: 'Medium-value expenses', thresholdType: 'Amount', category: 'Expense Management', currency: 'AED', minAmount: 5000, maxAmount: 20000, status: 'Active', approver1Role: 'Direct Manager', approver2Role: 'Finance Owner', servicesLinked: 2, avgApprovalTimeHours: 18.5, executionCount: 342, lastModified: '15 May 2026' },
  { id: 'TH-003', name: 'Expense Tier 3 - Over AED 20K', description: 'High-value expenses', thresholdType: 'Amount', category: 'Expense Management', currency: 'AED', minAmount: 20000, status: 'Active', approver1Role: 'Direct Manager', approver2Role: 'Finance Owner', approver3Role: 'Executive', servicesLinked: 1, avgApprovalTimeHours: 32.8, executionCount: 67, lastModified: '14 May 2026' },
  { id: 'TH-004', name: 'Invoice Tier 1 - Under AED 10K', description: 'Standard invoices', thresholdType: 'Amount', category: 'Invoice Processing', currency: 'AED', minAmount: 0, maxAmount: 10000, status: 'Active', approver1Role: 'Finance Ops', servicesLinked: 4, avgApprovalTimeHours: 6.4, executionCount: 623, lastModified: '16 May 2026' },
  { id: 'TH-005', name: 'Invoice Tier 2 - AED 10K-50K', description: 'Medium-value invoices', thresholdType: 'Amount', category: 'Invoice Processing', currency: 'AED', minAmount: 10000, maxAmount: 50000, status: 'Active', approver1Role: 'Finance Owner', servicesLinked: 2, avgApprovalTimeHours: 12.3, executionCount: 189, lastModified: '15 May 2026' },
  { id: 'TH-006', name: 'Invoice Tier 3 - Over AED 50K', description: 'High-value invoices', thresholdType: 'Amount', category: 'Invoice Processing', currency: 'AED', minAmount: 50000, status: 'Active', approver1Role: 'Finance Owner', approver2Role: 'Executive', servicesLinked: 1, avgApprovalTimeHours: 28.7, executionCount: 42, lastModified: '16 May 2026' },
  { id: 'TH-007', name: 'Purchase Tier 1 - Under AED 10K', description: 'Low-value purchases', thresholdType: 'Amount', category: 'Purchase Requests', currency: 'AED', minAmount: 0, maxAmount: 10000, status: 'Active', approver1Role: 'Direct Manager', approver2Role: 'Procurement Owner', servicesLinked: 8, avgApprovalTimeHours: 24.3, executionCount: 412, lastModified: '13 May 2026' },
  { id: 'TH-008', name: 'Purchase Tier 2 - AED 10K-50K', description: 'Medium-value purchases', thresholdType: 'Amount', category: 'Purchase Requests', currency: 'AED', minAmount: 10000, maxAmount: 50000, status: 'Active', approver1Role: 'Direct Manager', approver2Role: 'Procurement Owner', approver3Role: 'Finance Owner', servicesLinked: 4, avgApprovalTimeHours: 42.8, executionCount: 134, lastModified: '12 May 2026' },
  { id: 'TH-009', name: 'Purchase Tier 3 - Over AED 50K', description: 'High-value purchases', thresholdType: 'Amount', category: 'Purchase Requests', currency: 'AED', minAmount: 50000, status: 'Active', approver1Role: 'Direct Manager', approver2Role: 'Procurement Owner', approver3Role: 'Finance Owner', approver4Role: 'Executive', servicesLinked: 2, avgApprovalTimeHours: 64.2, executionCount: 64, lastModified: '14 May 2026' },
  { id: 'TH-010', name: 'Asset Tier 1 - Under AED 5K', description: 'Standard asset assignments', thresholdType: 'Amount', category: 'Asset Assignment', currency: 'AED', minAmount: 0, maxAmount: 5000, status: 'Active', approver1Role: 'IT Manager', servicesLinked: 9, avgApprovalTimeHours: 12.1, executionCount: 278, lastModified: '14 May 2026' },
  { id: 'TH-011', name: 'Asset Tier 2 - Over AED 5K', description: 'High-value asset assignments', thresholdType: 'Amount', category: 'Asset Assignment', currency: 'AED', minAmount: 5000, status: 'Active', approver1Role: 'IT Manager', approver2Role: 'Finance Owner', servicesLinked: 3, avgApprovalTimeHours: 28.4, executionCount: 34, lastModified: '13 May 2026' },
  { id: 'TH-012', name: 'Budget Tier 1 - Under AED 25K', description: 'Small budget requisitions', thresholdType: 'Amount', category: 'Budget & Allocation', currency: 'AED', minAmount: 0, maxAmount: 25000, status: 'Active', approver1Role: 'Finance Owner', servicesLinked: 3, avgApprovalTimeHours: 18.6, executionCount: 52, lastModified: '15 May 2026' },
  { id: 'TH-013', name: 'Budget Tier 2 - Over AED 25K', description: 'Large budget requisitions', thresholdType: 'Amount', category: 'Budget & Allocation', currency: 'AED', minAmount: 25000, status: 'Active', approver1Role: 'Finance Owner', approver2Role: 'Executive', servicesLinked: 2, avgApprovalTimeHours: 42.3, executionCount: 26, lastModified: '14 May 2026' },
  { id: 'TH-014', name: 'Leave Priority - Standard (≤5 days)', description: 'Short leave requests', thresholdType: 'Priority', category: 'Leave Management', priorityLevel: 'Standard', status: 'Active', approver1Role: 'Direct Manager', servicesLinked: 6, avgApprovalTimeHours: 2.8, executionCount: 589, lastModified: '09 May 2026' },
  { id: 'TH-015', name: 'Leave Priority - Extended (>5 days)', description: 'Long leave requests', thresholdType: 'Priority', category: 'Leave Management', priorityLevel: 'High', status: 'Active', approver1Role: 'Direct Manager', approver2Role: 'HR Owner', servicesLinked: 3, avgApprovalTimeHours: 8.4, executionCount: 89, lastModified: '08 May 2026' },
  { id: 'TH-016', name: 'Travel Priority - Domestic', description: 'Local travel requests', thresholdType: 'Priority', category: 'Travel & Accommodation', priorityLevel: 'Standard', status: 'Active', approver1Role: 'Direct Manager', servicesLinked: 4, avgApprovalTimeHours: 14.2, executionCount: 92, lastModified: '11 May 2026' },
  { id: 'TH-017', name: 'Travel Priority - International', description: 'International travel', thresholdType: 'Priority', category: 'Travel & Accommodation', priorityLevel: 'High', status: 'Active', approver1Role: 'Direct Manager', approver2Role: 'Finance Owner', servicesLinked: 3, avgApprovalTimeHours: 32.1, executionCount: 53, lastModified: '10 May 2026' },
  { id: 'TH-018', name: 'Risk Score - High Risk Vendor', description: 'Vendors flagged as high-risk', thresholdType: 'Risk Score', category: 'Vendor Management', status: 'Active', approver1Role: 'Procurement Owner', approver2Role: 'Finance Owner', approver3Role: 'Compliance Officer', servicesLinked: 2, avgApprovalTimeHours: 96.2, executionCount: 12, lastModified: '10 May 2026' },
]

export default function ApprovalThresholds() {
  const [filter, setFilter] = useState<'All' | 'Amount' | 'Priority' | 'Risk Score'>('All')

  const stats = {
    activeThresholds: thresholds.filter(t => t.status === 'Active').length,
    amountBased: thresholds.filter(t => t.thresholdType === 'Amount').length,
    priorityBased: thresholds.filter(t => t.thresholdType === 'Priority').length,
    totalApprovers: thresholds.reduce((sum, t) => {
      let count = 1
      if (t.approver2Role) count++
      if (t.approver3Role) count++
      if (t.approver4Role) count++
      return sum + count
    }, 0),
  }

  const filtered = filter === 'All' ? thresholds : thresholds.filter(t => t.thresholdType === filter)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Approval Thresholds</h1>
          <p className="text-sm text-text-muted">Configure monetary and priority thresholds for approval routing</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} strokeWidth={2} />
          Add Threshold
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active Thresholds</p>
            <TrendingUp size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.activeThresholds}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Amount-Based</p>
            <DollarSign size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.amountBased}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Priority-Based</p>
            <AlertCircle size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.priorityBased}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Total Approvers</p>
            <Users size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text">{stats.totalApprovers}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Amount', 'Priority', 'Risk Score'] as const).map((f) => (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Threshold Name</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Range/Level</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approvers</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Services</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Avg Time (h)</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Executions</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((th) => {
                const approvers = [th.approver1Role, th.approver2Role, th.approver3Role, th.approver4Role].filter(Boolean)
                
                return (
                  <tr key={th.id} className="hover:bg-surface-1 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-text-primary">{th.name}</p>
                        <p className="text-xs text-text-muted">{th.description}</p>
                        <p className="text-xs text-text-disabled font-mono mt-0.5">{th.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-secondary">
                        {th.thresholdType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-text-secondary">{th.category}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {th.thresholdType === 'Amount' ? (
                        <div className="text-xs font-mono text-text-primary">
                          {th.minAmount !== undefined && th.maxAmount !== undefined ? (
                            <>{th.currency} {th.minAmount.toLocaleString()} - {th.maxAmount.toLocaleString()}</>
                          ) : (
                            <>&gt;{th.currency} {th.minAmount?.toLocaleString()}</>
                          )}
                        </div>
                      ) : th.thresholdType === 'Priority' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-status-warning-surface text-status-warning-text">
                          {th.priorityLevel}
                        </span>
                      ) : (
                        <span className="text-xs text-text-secondary">Risk-based</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {approvers.map((approver, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-status-info-surface text-status-info-text">
                            {i + 1}. {approver}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-semibold text-text-primary">{th.servicesLinked}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-mono text-text-secondary text-xs">{th.avgApprovalTimeHours.toFixed(1)}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-mono text-text-secondary text-xs">{th.executionCount}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={th.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit threshold">
                          <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-4 bg-orange-50 border border-dq-orange/20 rounded-card">
        <p className="text-xs font-semibold text-dq-orange uppercase tracking-wider mb-2">Threshold Priority Logic</p>
        <p className="text-sm text-text-secondary leading-relaxed">
          When multiple thresholds could apply, the system selects the most specific match. Amount-based thresholds take precedence, followed by priority-based, then risk-based. Within amount bands, the highest applicable tier is selected.
        </p>
      </div>
    </div>
  )
}
