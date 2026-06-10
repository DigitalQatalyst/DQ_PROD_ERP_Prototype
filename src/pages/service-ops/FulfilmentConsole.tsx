import { useState } from 'react'
import { Inbox, Clock, AlertTriangle, CheckCircle2, Edit2, UserCheck } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

type Domain = 'Finance' | 'HR' | 'Procurement' | 'Inventory' | 'Admin' | 'Master Data'
type FulfilmentStatus = 'Pending Assignment' | 'In Progress' | 'Pending Info' | 'Escalated'
type Priority = 'Critical' | 'High' | 'Standard' | 'Low'
type SLAStatus = 'On Track' | 'At Risk' | 'Breached'

interface FulfilmentItem {
  id: string
  type: string
  domain: Domain
  description: string
  requester: string
  submittedAt: string
  slaDeadline: string
  slaStatus: SLAStatus
  priority: Priority
  status: FulfilmentStatus
  assignedTo: string
  evidenceComplete: boolean
}

const items: FulfilmentItem[] = [
  { id: 'REQ-2026-0341', type: 'Invoice Payment', domain: 'Finance', description: 'Mazrui Holdings vendor invoice AED 90,000 — final payment', requester: 'Sara Pereira', submittedAt: '10 Jun 2026, 08:14', slaDeadline: '12 Jun 2026', slaStatus: 'At Risk', priority: 'Critical', status: 'In Progress', assignedTo: 'Tariq Al-Amin', evidenceComplete: true },
  { id: 'REQ-2026-0338', type: 'Purchase Request — Services', domain: 'Procurement', description: 'Bloom Accounting audit support engagement AED 35,000', requester: 'Yasmin Al-Mansoori', submittedAt: '09 Jun 2026, 14:32', slaDeadline: '13 Jun 2026', slaStatus: 'On Track', priority: 'High', status: 'In Progress', assignedTo: 'Yasmin Al-Mansoori', evidenceComplete: true },
  { id: 'REQ-2026-0335', type: 'Employee Onboarding', domain: 'HR', description: 'Daniel Kimani onboarding — asset assignment and access setup', requester: 'Fatima Bin Hammad', submittedAt: '09 Jun 2026, 09:45', slaDeadline: '11 Jun 2026', slaStatus: 'At Risk', priority: 'High', status: 'Pending Assignment', assignedTo: '—', evidenceComplete: false },
  { id: 'REQ-2026-0332', type: 'Asset Assignment', domain: 'Inventory', description: 'MacBook Pro + external monitor for new engineer hire', requester: 'Fatima Bin Hammad', submittedAt: '08 Jun 2026, 16:00', slaDeadline: '11 Jun 2026', slaStatus: 'On Track', priority: 'High', status: 'In Progress', assignedTo: 'Rashid Ahmed', evidenceComplete: true },
  { id: 'REQ-2026-0329', type: 'Vendor Onboarding', domain: 'Procurement', description: 'Gulf Recruitment Corp. — new staffing vendor registration', requester: 'Yasmin Al-Mansoori', submittedAt: '07 Jun 2026, 11:20', slaDeadline: '14 Jun 2026', slaStatus: 'On Track', priority: 'Standard', status: 'Pending Info', assignedTo: 'Yasmin Al-Mansoori', evidenceComplete: false },
  { id: 'REQ-2026-0326', type: 'Expense Reimbursement', domain: 'Finance', description: 'Client travel expenses AED 4,200 — Abu Dhabi site visit', requester: 'Layla Seitkali', submittedAt: '07 Jun 2026, 09:15', slaDeadline: '10 Jun 2026', slaStatus: 'Breached', priority: 'Standard', status: 'Escalated', assignedTo: 'Sara Pereira', evidenceComplete: true },
  { id: 'REQ-2026-0323', type: 'Business Travel Request', domain: 'Admin', description: 'Flight + hotel for Dubai–Riyadh client visit 18–20 Jun', requester: 'Layla Seitkali', submittedAt: '06 Jun 2026, 14:55', slaDeadline: '12 Jun 2026', slaStatus: 'On Track', priority: 'Standard', status: 'In Progress', assignedTo: 'Maya Sharma', evidenceComplete: true },
  { id: 'REQ-2026-0320', type: 'Annual Leave Request', domain: 'HR', description: 'Annual leave 23–30 Jun 2026 — 6 working days', requester: 'Mohammed Rashid', submittedAt: '06 Jun 2026, 10:30', slaDeadline: '11 Jun 2026', slaStatus: 'On Track', priority: 'Standard', status: 'In Progress', assignedTo: 'Fatima Bin Hammad', evidenceComplete: true },
  { id: 'REQ-2026-0317', type: 'Budget Requisition', domain: 'Finance', description: 'Q3 marketing budget allocation AED 120,000 approval', requester: 'Mohammed Rashid', submittedAt: '05 Jun 2026, 15:10', slaDeadline: '09 Jun 2026', slaStatus: 'Breached', priority: 'High', status: 'Escalated', assignedTo: 'Tariq Al-Amin', evidenceComplete: true },
  { id: 'REQ-2026-0314', type: 'Vendor Master Data Change', domain: 'Master Data', description: 'Al Fardan Office Supp. bank account update', requester: 'Sara Pereira', submittedAt: '05 Jun 2026, 11:00', slaDeadline: '12 Jun 2026', slaStatus: 'On Track', priority: 'Standard', status: 'Pending Assignment', assignedTo: '—', evidenceComplete: false },
  { id: 'REQ-2026-0311', type: 'Stock Issue Request', domain: 'Inventory', description: 'Office stationery restock — 3 departments', requester: 'Maya Sharma', submittedAt: '04 Jun 2026, 09:40', slaDeadline: '11 Jun 2026', slaStatus: 'On Track', priority: 'Low', status: 'In Progress', assignedTo: 'Rashid Ahmed', evidenceComplete: true },
  { id: 'REQ-2026-0308', type: 'Employment Letter Request', domain: 'HR', description: 'Employment verification letter for Sara Pereira — visa renewal', requester: 'Sara Pereira', submittedAt: '03 Jun 2026, 16:20', slaDeadline: '10 Jun 2026', slaStatus: 'Breached', priority: 'High', status: 'Pending Info', assignedTo: 'Fatima Bin Hammad', evidenceComplete: false },
]

const slaStyle: Record<SLAStatus, string> = {
  'On Track': 'bg-status-success-surface text-status-success-text',
  'At Risk': 'bg-status-warning-surface text-status-warning-text',
  'Breached': 'bg-status-error-surface text-status-error-text',
}

const priorityStyle: Record<Priority, string> = {
  Critical: 'bg-status-error-surface text-status-error-text',
  High: 'bg-status-warning-surface text-status-warning-text',
  Standard: 'bg-status-info-surface text-status-info-text',
  Low: 'bg-surface-1 text-text-muted',
}

type Filter = 'All' | Domain

export default function FulfilmentConsole() {
  const [filter, setFilter] = useState<Filter>('All')

  const stats = {
    total: items.length,
    pendingAssignment: items.filter(i => i.status === 'Pending Assignment').length,
    atRiskOrBreached: items.filter(i => i.slaStatus === 'At Risk' || i.slaStatus === 'Breached').length,
    escalated: items.filter(i => i.status === 'Escalated').length,
  }

  const filtered = filter === 'All' ? items : items.filter(i => i.domain === filter)
  const domains: Domain[] = ['Finance', 'HR', 'Procurement', 'Inventory', 'Admin', 'Master Data']

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Fulfilment Console</h1>
          <p className="text-sm text-text-muted">Central view of all approved requests requiring operational action — assign, process, and close.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active Items</p>
            <Inbox size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Pending Assignment</p>
            <UserCheck size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.pendingAssignment}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">SLA At Risk / Breached</p>
            <Clock size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.atRiskOrBreached}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Escalated</p>
            <AlertTriangle size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.escalated}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', ...domains] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-btn transition-colors ${
              filter === f ? 'bg-dq-navy text-white' : 'bg-surface-1 text-text-muted hover:bg-border-subtle'
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Request</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Priority</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Domain</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Assigned To</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Evidence</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">SLA</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-text-primary">{item.type}</p>
                    <p className="text-xs text-text-muted truncate max-w-[240px]">{item.description}</p>
                    <p className="text-xs font-mono text-text-disabled mt-0.5">{item.id}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${priorityStyle[item.priority]}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-text-secondary">{item.domain}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-text-primary">{item.requester}</p>
                    <p className="text-[10px] text-text-muted">{item.submittedAt}</p>
                  </td>
                  <td className="px-4 py-3">
                    {item.assignedTo === '—' ? (
                      <span className="text-xs text-status-warning-text font-medium italic">Unassigned</span>
                    ) : (
                      <span className="text-xs text-text-primary">{item.assignedTo}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.evidenceComplete ? (
                      <CheckCircle2 size={15} className="text-status-success-text mx-auto" strokeWidth={1.75} />
                    ) : (
                      <AlertTriangle size={15} className="text-status-warning-text mx-auto" strokeWidth={1.75} />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${slaStyle[item.slaStatus]}`}>
                      {item.slaStatus}
                    </span>
                    <p className="text-[10px] text-text-muted mt-0.5">{item.slaDeadline}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={item.status === 'Pending Assignment' ? 'Draft' : item.status === 'Escalated' ? 'Suspended' : 'Active'} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit">
                      <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Unassigned Items</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Items showing "Unassigned" have been approved but not yet picked up by a service owner. Use the Assignment Queue to allocate them. Unassigned items count against SLA from the moment they are approved.
          </p>
        </div>
        <div className="p-4 bg-status-error-surface border border-status-error/20 rounded-card">
          <p className="text-xs font-semibold text-status-error-text uppercase tracking-wider mb-2">Escalated Items</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Escalated items have breached SLA or been manually escalated by a service owner. They appear in the Escalation Queue and trigger notifications to the relevant domain owner and Platform Admin.
          </p>
        </div>
      </div>
    </div>
  )
}
