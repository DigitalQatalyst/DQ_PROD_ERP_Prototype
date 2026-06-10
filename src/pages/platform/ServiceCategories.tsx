import { useState } from 'react'
import { Plus, Edit2, Eye, EyeOff, Layers, Tag, ArrowUpDown } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface ServiceCategory {
  id: string
  name: string
  domain: string
  description: string
  icon: string
  status: 'Active' | 'Draft' | 'Inactive'
  serviceCount: number
  colorHex: string
  displayOrder: number
  requiresApproval: boolean
  bcMapped: boolean
}

const categories: ServiceCategory[] = [
  { id: 'CAT-001', name: 'Expense Management', domain: 'Finance', description: 'Employee expense claims and reimbursements', icon: 'Receipt', status: 'Active', serviceCount: 8, colorHex: '#16A34A', displayOrder: 1, requiresApproval: true, bcMapped: true },
  { id: 'CAT-002', name: 'Invoice Processing', domain: 'Finance', description: 'Vendor invoice review and payment processing', icon: 'FileText', status: 'Active', serviceCount: 6, colorHex: '#2563EB', displayOrder: 2, requiresApproval: true, bcMapped: true },
  { id: 'CAT-003', name: 'Budget & Allocation', domain: 'Finance', description: 'Budget requisitions and cost centre allocation', icon: 'DollarSign', status: 'Active', serviceCount: 5, colorHex: '#D97706', displayOrder: 3, requiresApproval: true, bcMapped: true },
  { id: 'CAT-004', name: 'Purchase Requests', domain: 'Procurement', description: 'Goods and services procurement requests', icon: 'ShoppingCart', status: 'Active', serviceCount: 12, colorHex: '#8B5CF6', displayOrder: 4, requiresApproval: true, bcMapped: true },
  { id: 'CAT-005', name: 'Vendor Management', domain: 'Procurement', description: 'Vendor onboarding, changes, and offboarding', icon: 'Building2', status: 'Active', serviceCount: 7, colorHex: '#0891B2', displayOrder: 5, requiresApproval: true, bcMapped: true },
  { id: 'CAT-006', name: 'Leave Management', domain: 'HR', description: 'Annual, sick, and special leave requests', icon: 'Calendar', status: 'Active', serviceCount: 9, colorHex: '#EC4899', displayOrder: 6, requiresApproval: true, bcMapped: false },
  { id: 'CAT-007', name: 'Employee Lifecycle', domain: 'HR', description: 'Onboarding, changes, and offboarding', icon: 'Users', status: 'Active', serviceCount: 14, colorHex: '#F59E0B', displayOrder: 7, requiresApproval: true, bcMapped: true },
  { id: 'CAT-008', name: 'HR Documents', domain: 'HR', description: 'Employment letters, certificates, and records', icon: 'FileCheck', status: 'Active', serviceCount: 6, colorHex: '#10B981', displayOrder: 8, requiresApproval: false, bcMapped: false },
  { id: 'CAT-009', name: 'Asset Assignment', domain: 'Inventory', description: 'IT equipment, devices, and asset custody', icon: 'Laptop', status: 'Active', serviceCount: 11, colorHex: '#6366F1', displayOrder: 9, requiresApproval: true, bcMapped: true },
  { id: 'CAT-010', name: 'Stock & Consumables', domain: 'Inventory', description: 'Office supplies and consumable inventory', icon: 'Package', status: 'Active', serviceCount: 8, colorHex: '#14B8A6', displayOrder: 10, requiresApproval: false, bcMapped: true },
  { id: 'CAT-011', name: 'Travel & Accommodation', domain: 'Admin', description: 'Business travel booking and arrangements', icon: 'Plane', status: 'Active', serviceCount: 7, colorHex: '#EF4444', displayOrder: 11, requiresApproval: true, bcMapped: false },
  { id: 'CAT-012', name: 'Office Services', domain: 'Admin', description: 'Facilities, supplies, and office support', icon: 'Home', status: 'Active', serviceCount: 9, colorHex: '#A855F7', displayOrder: 12, requiresApproval: false, bcMapped: false },
  { id: 'CAT-013', name: 'Project Setup', domain: 'Project', description: 'Project creation and dimension management', icon: 'FolderPlus', status: 'Active', serviceCount: 5, colorHex: '#F97316', displayOrder: 13, requiresApproval: true, bcMapped: true },
  { id: 'CAT-014', name: 'Customer Onboarding', domain: 'Finance', description: 'New customer master data and AR setup', icon: 'UserPlus', status: 'Active', serviceCount: 4, colorHex: '#06B6D4', displayOrder: 14, requiresApproval: true, bcMapped: true },
  { id: 'CAT-015', name: 'Master Data Changes', domain: 'Governance', description: 'Entity, cost centre, and dimension changes', icon: 'Database', status: 'Active', serviceCount: 6, colorHex: '#84CC16', displayOrder: 15, requiresApproval: true, bcMapped: true },
  { id: 'CAT-016', name: 'Integration Support', domain: 'Platform', description: 'BC sync issues and API troubleshooting', icon: 'RefreshCw', status: 'Active', serviceCount: 3, colorHex: '#64748B', displayOrder: 16, requiresApproval: false, bcMapped: false },
  { id: 'CAT-017', name: 'Subscription Renewals', domain: 'Procurement', description: 'SaaS and recurring subscription management', icon: 'RotateCw', status: 'Draft', serviceCount: 0, colorHex: '#9333EA', displayOrder: 17, requiresApproval: true, bcMapped: false },
  { id: 'CAT-018', name: 'Tax Compliance', domain: 'Finance', description: 'VAT, WHT, and tax-related submissions', icon: 'Scale', status: 'Draft', serviceCount: 0, colorHex: '#DC2626', displayOrder: 18, requiresApproval: true, bcMapped: true },
  { id: 'CAT-019', name: 'Asset Maintenance', domain: 'Inventory', description: 'Equipment servicing and repairs', icon: 'Wrench', status: 'Draft', serviceCount: 0, colorHex: '#78716C', displayOrder: 19, requiresApproval: false, bcMapped: false },
]

export default function ServiceCategories() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Draft' | 'Inactive'>('All')

  const stats = {
    active: categories.filter(c => c.status === 'Active').length,
    draft: categories.filter(c => c.status === 'Draft').length,
    inactive: categories.filter(c => c.status === 'Inactive').length,
    totalServices: categories.reduce((sum, c) => sum + c.serviceCount, 0),
  }

  const filtered = filter === 'All' ? categories : categories.filter(c => c.status === filter)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Service Categories</h1>
          <p className="text-sm text-text-muted">Configure and manage service request categories across all domains</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} strokeWidth={2} />
          Create Category
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active Categories</p>
            <Tag size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.active}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Draft Categories</p>
            <Edit2 size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.draft}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Inactive</p>
            <EyeOff size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.inactive}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Services Linked</p>
            <Layers size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text">{stats.totalServices}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Active', 'Draft', 'Inactive'] as const).map((f) => (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Category
                    <ArrowUpDown size={12} strokeWidth={1.5} />
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Domain</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Services</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approval Req.</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Mapped</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((cat) => (
                <tr key={cat.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${cat.colorHex}15`, color: cat.colorHex }}
                      >
                        <Tag size={16} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{cat.name}</p>
                        <p className="text-xs text-text-muted font-mono">{cat.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-secondary">
                      {cat.domain}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary max-w-xs">
                    <p className="truncate">{cat.description}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-text-primary">{cat.serviceCount}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={cat.status} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    {cat.requiresApproval ? (
                      <span className="text-status-info">✓</span>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {cat.bcMapped ? (
                      <span className="text-status-success">✓</span>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit category">
                        <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="View details">
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
