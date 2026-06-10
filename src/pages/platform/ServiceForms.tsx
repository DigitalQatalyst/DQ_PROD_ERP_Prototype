import { useState } from 'react'
import { Plus, Edit2, Eye, Copy, FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface ServiceForm {
  id: string
  name: string
  category: string
  description: string
  status: 'Active' | 'Draft' | 'Deprecated'
  fieldCount: number
  validationRules: number
  submissionCount: number
  lastModified: string
  modifiedBy: string
  requiresEvidence: boolean
  hasConditionalLogic: boolean
}

const forms: ServiceForm[] = [
  { id: 'FRM-001', name: 'Expense Reimbursement Request', category: 'Expense Management', description: 'Standard employee expense claim with receipt upload', status: 'Active', fieldCount: 12, validationRules: 8, submissionCount: 342, lastModified: '12 May 2026', modifiedBy: 'Tariq Al-Amin', requiresEvidence: true, hasConditionalLogic: true },
  { id: 'FRM-002', name: 'Travel Expense Claim', category: 'Expense Management', description: 'Travel-specific expenses with per-diem calculation', status: 'Active', fieldCount: 18, validationRules: 14, submissionCount: 187, lastModified: '08 May 2026', modifiedBy: 'Tariq Al-Amin', requiresEvidence: true, hasConditionalLogic: true },
  { id: 'FRM-003', name: 'Invoice Payment Request', category: 'Invoice Processing', description: 'Vendor invoice submission and payment request', status: 'Active', fieldCount: 15, validationRules: 11, submissionCount: 521, lastModified: '15 May 2026', modifiedBy: 'Sara Pereira', requiresEvidence: true, hasConditionalLogic: true },
  { id: 'FRM-004', name: 'Purchase Request — Goods', category: 'Purchase Requests', description: 'Physical goods procurement request', status: 'Active', fieldCount: 14, validationRules: 9, submissionCount: 298, lastModified: '10 May 2026', modifiedBy: 'Yasmin Al-Mansoori', requiresEvidence: true, hasConditionalLogic: true },
  { id: 'FRM-005', name: 'Purchase Request — Services', category: 'Purchase Requests', description: 'Professional services procurement request', status: 'Active', fieldCount: 16, validationRules: 12, submissionCount: 176, lastModified: '11 May 2026', modifiedBy: 'Yasmin Al-Mansoori', requiresEvidence: true, hasConditionalLogic: true },
  { id: 'FRM-006', name: 'Vendor Onboarding Form', category: 'Vendor Management', description: 'New vendor registration and compliance check', status: 'Active', fieldCount: 28, validationRules: 22, submissionCount: 47, lastModified: '14 May 2026', modifiedBy: 'Mohammed Rashid', requiresEvidence: true, hasConditionalLogic: false },
  { id: 'FRM-007', name: 'Vendor Master Data Change', category: 'Vendor Management', description: 'Update existing vendor details', status: 'Active', fieldCount: 10, validationRules: 7, submissionCount: 89, lastModified: '09 May 2026', modifiedBy: 'Yasmin Al-Mansoori', requiresEvidence: false, hasConditionalLogic: false },
  { id: 'FRM-008', name: 'Annual Leave Request', category: 'Leave Management', description: 'Standard annual leave application', status: 'Active', fieldCount: 8, validationRules: 5, submissionCount: 412, lastModified: '07 May 2026', modifiedBy: 'Fatima Bin Hammad', requiresEvidence: false, hasConditionalLogic: true },
  { id: 'FRM-009', name: 'Sick Leave Notification', category: 'Leave Management', description: 'Sick leave notification with medical cert', status: 'Active', fieldCount: 7, validationRules: 4, submissionCount: 134, lastModified: '06 May 2026', modifiedBy: 'Fatima Bin Hammad', requiresEvidence: true, hasConditionalLogic: true },
  { id: 'FRM-010', name: 'Employee Onboarding Request', category: 'Employee Lifecycle', description: 'New employee setup and asset assignment', status: 'Active', fieldCount: 32, validationRules: 18, submissionCount: 23, lastModified: '16 May 2026', modifiedBy: 'Fatima Bin Hammad', requiresEvidence: true, hasConditionalLogic: true },
  { id: 'FRM-011', name: 'Employee Change Request', category: 'Employee Lifecycle', description: 'Role, entity, or cost centre change', status: 'Active', fieldCount: 11, validationRules: 8, submissionCount: 67, lastModified: '13 May 2026', modifiedBy: 'Fatima Bin Hammad', requiresEvidence: false, hasConditionalLogic: true },
  { id: 'FRM-012', name: 'Employment Letter Request', category: 'HR Documents', description: 'Request for employment verification letter', status: 'Active', fieldCount: 6, validationRules: 3, submissionCount: 91, lastModified: '05 May 2026', modifiedBy: 'Fatima Bin Hammad', requiresEvidence: false, hasConditionalLogic: false },
  { id: 'FRM-013', name: 'Asset Assignment Request', category: 'Asset Assignment', description: 'IT equipment or device assignment', status: 'Active', fieldCount: 9, validationRules: 6, submissionCount: 156, lastModified: '17 May 2026', modifiedBy: 'Rashid Ahmed', requiresEvidence: false, hasConditionalLogic: true },
  { id: 'FRM-014', name: 'Stock Issue Request', category: 'Stock & Consumables', description: 'Office supplies and consumables request', status: 'Active', fieldCount: 7, validationRules: 4, submissionCount: 284, lastModified: '11 May 2026', modifiedBy: 'Maya Sharma', requiresEvidence: false, hasConditionalLogic: false },
  { id: 'FRM-015', name: 'Business Travel Request', category: 'Travel & Accommodation', description: 'Flight and hotel booking request', status: 'Active', fieldCount: 16, validationRules: 10, submissionCount: 112, lastModified: '14 May 2026', modifiedBy: 'Maya Sharma', requiresEvidence: false, hasConditionalLogic: true },
  { id: 'FRM-016', name: 'Customer Onboarding Form', category: 'Customer Onboarding', description: 'New customer master data setup', status: 'Active', fieldCount: 24, validationRules: 16, submissionCount: 31, lastModified: '16 May 2026', modifiedBy: 'Sara Pereira', requiresEvidence: true, hasConditionalLogic: false },
  { id: 'FRM-017', name: 'Budget Requisition Form', category: 'Budget & Allocation', description: 'Budget allocation request and justification', status: 'Active', fieldCount: 13, validationRules: 9, submissionCount: 78, lastModified: '15 May 2026', modifiedBy: 'Mohammed Rashid', requiresEvidence: true, hasConditionalLogic: true },
  { id: 'FRM-018', name: 'Project Setup Request', category: 'Project Setup', description: 'New project dimension creation', status: 'Active', fieldCount: 19, validationRules: 13, submissionCount: 42, lastModified: '12 May 2026', modifiedBy: 'Layla Seitkali', requiresEvidence: false, hasConditionalLogic: true },
  { id: 'FRM-019', name: 'SaaS Subscription Request', category: 'Purchase Requests', description: 'Software subscription procurement', status: 'Draft', fieldCount: 11, validationRules: 0, submissionCount: 0, lastModified: '18 May 2026', modifiedBy: 'Yasmin Al-Mansoori', requiresEvidence: true, hasConditionalLogic: true },
  { id: 'FRM-020', name: 'Tax Compliance Submission', category: 'Tax Compliance', description: 'VAT return and tax filing support', status: 'Draft', fieldCount: 14, validationRules: 0, submissionCount: 0, lastModified: '17 May 2026', modifiedBy: 'Mohammed Rashid', requiresEvidence: true, hasConditionalLogic: false },
]

export default function ServiceForms() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Draft'>('All')

  const stats = {
    active: forms.filter(f => f.status === 'Active').length,
    draft: forms.filter(f => f.status === 'Draft').length,
    totalValidations: forms.reduce((sum, f) => sum + f.validationRules, 0),
    totalFields: forms.reduce((sum, f) => sum + f.fieldCount, 0),
  }

  const filtered = filter === 'All' ? forms : forms.filter(f => f.status === filter)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Service Forms</h1>
          <p className="text-sm text-text-muted">Design and configure service request forms, fields, and validation rules</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} strokeWidth={2} />
          Create Form
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active Forms</p>
            <CheckCircle2 size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.active}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Draft Forms</p>
            <Edit2 size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.draft}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Validation Rules</p>
            <AlertCircle size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.totalValidations}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Total Fields</p>
            <FileText size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text">{stats.totalFields}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Active', 'Draft'] as const).map((f) => (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Form Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Fields</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Validations</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Submissions</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Evidence Req.</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Modified</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((form) => (
                <tr key={form.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-1 flex items-center justify-center shrink-0">
                        <FileText size={16} className="text-dq-navy" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{form.name}</p>
                        <p className="text-xs text-text-muted font-mono">{form.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary">{form.category}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-text-primary">{form.fieldCount}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-text-primary">{form.validationRules}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-text-primary font-mono">{form.submissionCount}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {form.requiresEvidence ? (
                      <span className="text-status-warning">✓</span>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={form.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-xs text-text-secondary">{form.lastModified}</p>
                      <p className="text-xs text-text-muted">by {form.modifiedBy}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit form">
                        <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Duplicate form">
                        <Copy size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Preview form">
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
    </div>
  )
}
