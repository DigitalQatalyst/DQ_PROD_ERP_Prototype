import { useState } from 'react'
import { Plus, Edit2, RefreshCw, Clock, Zap, AlertTriangle, CheckCircle } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface SyncRule {
  id: string
  name: string
  description: string
  trigger: 'On-Approval' | 'On-Process' | 'Scheduled' | 'Manual' | 'Real-Time Webhook'
  module: 'Finance' | 'Procurement' | 'HR' | 'Inventory' | 'Master Data'
  direction: 'DWS→BC' | 'BC→DWS' | 'Bidirectional'
  filterCondition: string
  batchSize: number
  priorityLevel: 'Critical' | 'High' | 'Standard' | 'Low'
  retryAttempts: number
  lastRunAt: string
  nextRunAt: string
  successCount: number
  failCount: number
  avgDurationSecs: number
  status: 'Active' | 'Paused' | 'Draft'
  lastModified: string
}

const syncRules: SyncRule[] = [
  { id: 'SR-001', name: 'GL Journal Sync on Approval', description: 'Syncs approved GL journal entries to BC General Ledger', trigger: 'On-Approval', module: 'Finance', direction: 'DWS→BC', filterCondition: 'status = Approved AND type = GL_JOURNAL', batchSize: 50, priorityLevel: 'Critical', retryAttempts: 5, lastRunAt: '2026-06-10 14:32', nextRunAt: '—', successCount: 4821, failCount: 12, avgDurationSecs: 3.2, status: 'Active', lastModified: '2026-05-01' },
  { id: 'SR-002', name: 'Vendor Create on Approval', description: 'Creates new vendor records in BC upon DWS approval', trigger: 'On-Approval', module: 'Master Data', direction: 'DWS→BC', filterCondition: 'entity = VENDOR AND status = Approved', batchSize: 10, priorityLevel: 'Critical', retryAttempts: 5, lastRunAt: '2026-06-10 11:15', nextRunAt: '—', successCount: 312, failCount: 4, avgDurationSecs: 5.1, status: 'Active', lastModified: '2026-04-15' },
  { id: 'SR-003', name: 'Purchase Order Sync', description: 'Pushes confirmed POs from DWS procurement to BC', trigger: 'On-Approval', module: 'Procurement', direction: 'DWS→BC', filterCondition: 'status = Approved AND type = PO', batchSize: 25, priorityLevel: 'High', retryAttempts: 3, lastRunAt: '2026-06-10 13:50', nextRunAt: '—', successCount: 1893, failCount: 27, avgDurationSecs: 4.8, status: 'Active', lastModified: '2026-03-20' },
  { id: 'SR-004', name: 'Leave Record Sync', description: 'Syncs approved leave records to BC HR module', trigger: 'On-Approval', module: 'HR', direction: 'DWS→BC', filterCondition: 'status = Approved AND type = LEAVE', batchSize: 100, priorityLevel: 'Standard', retryAttempts: 3, lastRunAt: '2026-06-10 09:00', nextRunAt: '—', successCount: 2340, failCount: 8, avgDurationSecs: 1.9, status: 'Active', lastModified: '2026-02-10' },
  { id: 'SR-005', name: 'Employee Create Sync', description: 'Creates new employee records in BC upon HR onboarding approval', trigger: 'On-Approval', module: 'HR', direction: 'DWS→BC', filterCondition: 'entity = EMPLOYEE AND action = CREATE AND status = Approved', batchSize: 5, priorityLevel: 'High', retryAttempts: 5, lastRunAt: '2026-06-09 16:45', nextRunAt: '—', successCount: 87, failCount: 2, avgDurationSecs: 6.3, status: 'Active', lastModified: '2026-01-25' },
  { id: 'SR-006', name: 'Inventory Movement Sync', description: 'Scheduled batch sync of inventory movements to BC', trigger: 'Scheduled', module: 'Inventory', direction: 'DWS→BC', filterCondition: 'type IN (GRN, TRANSFER, ADJUSTMENT)', batchSize: 200, priorityLevel: 'High', retryAttempts: 3, lastRunAt: '2026-06-10 06:00', nextRunAt: '2026-06-10 18:00', successCount: 9124, failCount: 45, avgDurationSecs: 12.4, status: 'Active', lastModified: '2026-04-01' },
  { id: 'SR-007', name: 'Dimension Code Sync', description: 'Scheduled sync of dimension values between DWS and BC', trigger: 'Scheduled', module: 'Master Data', direction: 'Bidirectional', filterCondition: 'entity = DIMENSION_VALUE AND status = Active', batchSize: 500, priorityLevel: 'Standard', retryAttempts: 2, lastRunAt: '2026-06-10 02:00', nextRunAt: '2026-06-11 02:00', successCount: 5670, failCount: 18, avgDurationSecs: 22.1, status: 'Active', lastModified: '2026-03-05' },
  { id: 'SR-008', name: 'BC→DWS Exchange Rate Pull', description: 'Pulls current exchange rates from BC to DWS finance module', trigger: 'Scheduled', module: 'Finance', direction: 'BC→DWS', filterCondition: 'entity = EXCHANGE_RATE', batchSize: 50, priorityLevel: 'Critical', retryAttempts: 5, lastRunAt: '2026-06-10 08:00', nextRunAt: '2026-06-11 08:00', successCount: 1460, failCount: 3, avgDurationSecs: 2.7, status: 'Active', lastModified: '2025-11-20' },
  { id: 'SR-009', name: 'Customer Record Sync', description: 'Syncs approved customer records to BC sales module', trigger: 'On-Approval', module: 'Master Data', direction: 'DWS→BC', filterCondition: 'entity = CUSTOMER AND status = Approved', batchSize: 10, priorityLevel: 'High', retryAttempts: 3, lastRunAt: '2026-06-10 10:30', nextRunAt: '—', successCount: 218, failCount: 6, avgDurationSecs: 4.5, status: 'Active', lastModified: '2026-02-28' },
  { id: 'SR-010', name: 'Payment Voucher Sync', description: 'Real-time webhook push of payment vouchers to BC on posting', trigger: 'Real-Time Webhook', module: 'Finance', direction: 'DWS→BC', filterCondition: 'type = PAYMENT_VOUCHER AND status = Posted', batchSize: 1, priorityLevel: 'Critical', retryAttempts: 5, lastRunAt: '2026-06-10 14:55', nextRunAt: '—', successCount: 3204, failCount: 9, avgDurationSecs: 1.1, status: 'Active', lastModified: '2026-05-15' },
  { id: 'SR-011', name: 'Cost Centre Sync', description: 'Pushes new or updated cost centres from DWS to BC on process', trigger: 'On-Process', module: 'Finance', direction: 'DWS→BC', filterCondition: 'entity = COST_CENTRE AND action IN (CREATE, UPDATE)', batchSize: 20, priorityLevel: 'High', retryAttempts: 3, lastRunAt: '2026-06-08 15:20', nextRunAt: '—', successCount: 643, failCount: 7, avgDurationSecs: 3.8, status: 'Active', lastModified: '2026-04-10' },
  { id: 'SR-012', name: 'BC Vendor Balance Pull', description: 'Pulls vendor outstanding balances from BC to DWS daily', trigger: 'Scheduled', module: 'Procurement', direction: 'BC→DWS', filterCondition: 'entity = VENDOR_LEDGER_ENTRY', batchSize: 1000, priorityLevel: 'Standard', retryAttempts: 2, lastRunAt: '2026-06-10 07:00', nextRunAt: '2026-06-11 07:00', successCount: 3285, failCount: 14, avgDurationSecs: 18.6, status: 'Active', lastModified: '2026-03-15' },
  { id: 'SR-013', name: 'Budget Allocation Sync', description: 'Syncs approved budget lines to BC budget module on approval', trigger: 'On-Approval', module: 'Finance', direction: 'DWS→BC', filterCondition: 'type = BUDGET_LINE AND status = Approved', batchSize: 100, priorityLevel: 'High', retryAttempts: 3, lastRunAt: '2026-06-05 12:00', nextRunAt: '—', successCount: 728, failCount: 11, avgDurationSecs: 7.2, status: 'Active', lastModified: '2026-01-10' },
  { id: 'SR-014', name: 'Payroll Summary Sync', description: 'Scheduled monthly sync of payroll totals to BC finance', trigger: 'Scheduled', module: 'HR', direction: 'DWS→BC', filterCondition: 'type = PAYROLL_SUMMARY AND period = CLOSED', batchSize: 12, priorityLevel: 'Critical', retryAttempts: 5, lastRunAt: '2026-05-31 23:00', nextRunAt: '2026-06-30 23:00', successCount: 36, failCount: 0, avgDurationSecs: 45.0, status: 'Active', lastModified: '2025-12-01' },
  { id: 'SR-015', name: 'GL Account Master Sync', description: 'Real-time push of new GL accounts to BC chart of accounts', trigger: 'Real-Time Webhook', module: 'Finance', direction: 'DWS→BC', filterCondition: 'entity = GL_ACCOUNT AND action = CREATE', batchSize: 1, priorityLevel: 'Critical', retryAttempts: 5, lastRunAt: '2026-06-09 09:14', nextRunAt: '—', successCount: 94, failCount: 1, avgDurationSecs: 2.4, status: 'Active', lastModified: '2026-02-20' },
  { id: 'SR-016', name: 'Project Code Sync', description: 'Syncs approved project records to BC job module', trigger: 'On-Approval', module: 'Master Data', direction: 'DWS→BC', filterCondition: 'entity = PROJECT AND status = Approved', batchSize: 10, priorityLevel: 'High', retryAttempts: 3, lastRunAt: '2026-06-10 10:00', nextRunAt: '—', successCount: 156, failCount: 5, avgDurationSecs: 4.1, status: 'Active', lastModified: '2026-04-22' },
  { id: 'SR-017', name: 'BC Customer Ledger Pull', description: 'Pulls customer outstanding invoices from BC for DWS AR view', trigger: 'Scheduled', module: 'Finance', direction: 'BC→DWS', filterCondition: 'entity = CUSTOMER_LEDGER_ENTRY AND open = true', batchSize: 500, priorityLevel: 'Standard', retryAttempts: 2, lastRunAt: '2026-06-10 07:30', nextRunAt: '2026-06-11 07:30', successCount: 1820, failCount: 22, avgDurationSecs: 14.3, status: 'Paused', lastModified: '2026-06-01' },
  { id: 'SR-018', name: 'Item Master Sync', description: 'Manual trigger sync for item catalogue updates to BC', trigger: 'Manual', module: 'Inventory', direction: 'Bidirectional', filterCondition: 'entity = ITEM AND action IN (CREATE, UPDATE, RETIRE)', batchSize: 50, priorityLevel: 'Low', retryAttempts: 2, lastRunAt: '2026-06-03 11:00', nextRunAt: '—', successCount: 412, failCount: 8, avgDurationSecs: 9.7, status: 'Draft', lastModified: '2026-05-28' },
]

export default function SyncRules() {
  const [filter, setFilter] = useState<'All' | 'On-Approval' | 'Scheduled' | 'Real-Time Webhook'>('All')

  const stats = {
    active: syncRules.filter(r => r.status === 'Active').length,
    onApproval: syncRules.filter(r => r.trigger === 'On-Approval').length,
    scheduled: syncRules.filter(r => r.trigger === 'Scheduled').length,
    totalSyncs: syncRules.reduce((sum, r) => sum + r.successCount, 0),
  }

  const filtered = filter === 'All' ? syncRules : syncRules.filter(r => r.trigger === filter)

  const priorityColor: Record<string, string> = {
    Critical: 'bg-status-error-surface text-status-error-text',
    High: 'bg-status-warning-surface text-status-warning-text',
    Standard: 'bg-status-info-surface text-status-info-text',
    Low: 'bg-surface-1 text-text-muted',
  }

  const directionColor: Record<string, string> = {
    'DWS→BC': 'bg-status-info-surface text-status-info-text',
    'BC→DWS': 'bg-status-warning-surface text-status-warning-text',
    'Bidirectional': 'bg-status-success-surface text-status-success-text',
  }

  const triggerIcon = (trigger: string) => {
    if (trigger === 'On-Approval') return <CheckCircle size={13} className="mr-1" />
    if (trigger === 'Scheduled') return <Clock size={13} className="mr-1" />
    if (trigger === 'Real-Time Webhook') return <Zap size={13} className="mr-1" />
    return <RefreshCw size={13} className="mr-1" />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Sync Rules</h1>
          <p className="text-sm text-text-muted mt-1">Define when and what data syncs between DWS.04 and Business Central</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} /> Add Sync Rule
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Active Rules</p>
          <p className="text-2xl font-bold text-text-primary">{stats.active}</p>
          <p className="text-xs text-text-muted mt-1">of {syncRules.length} total</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">On-Approval</p>
          <p className="text-2xl font-bold text-text-primary">{stats.onApproval}</p>
          <p className="text-xs text-text-muted mt-1">event-driven rules</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Scheduled</p>
          <p className="text-2xl font-bold text-text-primary">{stats.scheduled}</p>
          <p className="text-xs text-text-muted mt-1">time-based rules</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Total Syncs</p>
          <p className="text-2xl font-bold text-text-primary">{stats.totalSyncs.toLocaleString()}</p>
          <p className="text-xs text-text-muted mt-1">successful pushes</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'On-Approval', 'Scheduled', 'Real-Time Webhook'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-btn transition-colors ${filter === f ? 'bg-dq-navy text-white' : 'bg-surface-1 text-text-muted hover:bg-border-subtle'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-1 border-b border-border-subtle">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Rule Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Trigger</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Module</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Direction</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Priority</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Batch</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Success</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Fails</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Avg (s)</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map(rule => (
              <tr key={rule.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-4 py-3 text-xs text-text-muted font-mono">{rule.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-text-primary">{rule.name}</p>
                  <p className="text-xs text-text-muted mt-0.5 max-w-xs truncate">{rule.description}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-status-info-surface text-status-info-text">
                    {triggerIcon(rule.trigger)}{rule.trigger}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-text-secondary">{rule.module}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${directionColor[rule.direction]}`}>
                    {rule.direction}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${priorityColor[rule.priorityLevel]}`}>
                    {rule.priorityLevel}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-text-secondary">{rule.batchSize}</td>
                <td className="px-4 py-3 text-xs text-status-success-text font-semibold">{rule.successCount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold ${rule.failCount > 10 ? 'text-status-error-text' : 'text-text-secondary'}`}>
                    {rule.failCount > 0 && <AlertTriangle size={12} className="inline mr-1" />}{rule.failCount}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-text-secondary">{rule.avgDurationSecs}s</td>
                <td className="px-4 py-3">
                  <StatusBadge status={rule.status === 'Paused' ? 'Suspended' : rule.status === 'Draft' ? 'Draft' : 'Active'} />
                </td>
                <td className="px-4 py-3">
                  <button className="text-text-muted hover:text-dq-navy transition-colors"><Edit2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-status-info-surface border border-status-info/20 rounded-card">
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Sync Ordering</p>
          <p className="text-sm text-text-secondary">Critical-priority sync rules execute before High, Standard, and Low rules within the same trigger event. If a Critical sync fails, it is retried up to its configured retryAttempts before an alert is raised to the Integration Team. Standard and Low rules continue independently.</p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Bidirectional Conflict</p>
          <p className="text-sm text-text-secondary">When a BC→DWS sync attempts to overwrite a record that has a pending DWS change (status = Pending Approval or Draft), the DWS value is held and the incoming BC value is flagged for manual resolution. Finance or Master Data Admins review conflicts within 1 business day.</p>
        </div>
      </div>
    </div>
  )
}
