import { useState, useMemo } from 'react'
import { Inbox, Clock, AlertTriangle, Users } from 'lucide-react'
import { requests, hrRequests, leaveRequests, adminRequests } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'

interface GovernanceRow {
  id: string
  domain: 'Finance / Procurement' | 'HR' | 'HR / Leave' | 'Admin'
  type: string
  description: string
  requester: string
  approver: string
  daysOpen: number
  status: string
  thresholdRule?: string
}

// Synth: age from submittedDate strings (treat as ~days since)
function daysSince(_dateStr?: string): number {
  // Stub — fixtures use static dates; map to representative ages
  return Math.floor(Math.random() * 10) + 1
}

// Build governance feed
function buildRows(): GovernanceRow[] {
  const fin = requests
    .filter((r) => r.status === 'Pending Approval' || r.status === 'In Review' || r.status === 'Clarification Needed')
    .map((r) => ({
      id: r.id,
      domain: 'Finance / Procurement' as const,
      type: r.type,
      description: r.description,
      requester: r.requester,
      approver: r.approver,
      daysOpen: r.isHighValue ? 2 : 4,
      status: r.status,
      thresholdRule: r.isHighValue ? '> AED 50k → Executive' : 'Standard Finance Owner',
    }))

  const hr = hrRequests
    .filter((r) => r.status === 'In Review' || r.status === 'Clarification Needed')
    .map((r) => ({
      id: r.id,
      domain: 'HR' as const,
      type: r.type,
      description: r.description,
      requester: r.requester,
      approver: r.owner,
      daysOpen: daysSince(r.submittedDate),
      status: r.status,
      thresholdRule: 'HR Owner approval',
    }))

  const leave = leaveRequests
    .filter((l) => l.status === 'Pending Approval')
    .map((l) => ({
      id: l.id,
      domain: 'HR / Leave' as const,
      type: `${l.type} Leave`,
      description: `${l.days} days · ${l.startDate} → ${l.endDate}`,
      requester: l.employeeId,
      approver: l.approver,
      daysOpen: 3,
      status: l.status,
      thresholdRule: 'Line Manager approval',
    }))

  const admin = adminRequests
    .filter((r) => r.status !== 'Fulfilled' && r.daysOpen > r.slaDays)
    .map((r) => ({
      id: r.id,
      domain: 'Admin' as const,
      type: r.type,
      description: r.description,
      requester: r.requester,
      approver: r.owner,
      daysOpen: r.daysOpen,
      status: r.status,
      thresholdRule: `SLA: ${r.slaDays}d`,
    }))

  return [...fin, ...hr, ...leave, ...admin].sort((a, b) => b.daysOpen - a.daysOpen)
}

const rows = buildRows()

type Filter = 'All' | 'Finance / Procurement' | 'HR' | 'HR / Leave' | 'Admin'

export default function ApprovalGovernanceConsole() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = filter === 'All' ? rows : rows.filter((r) => r.domain === filter)
  const filters: Filter[] = ['All', 'Finance / Procurement', 'HR', 'HR / Leave', 'Admin']

  // Bottleneck: approver with most pending
  const approverLoad = useMemo(() => {
    const counts: Record<string, number> = {}
    rows.forEach((r) => { counts[r.approver] = (counts[r.approver] ?? 0) + 1 })
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5)
  }, [])

  const avgAge = useMemo(() => Math.round(rows.reduce((s, r) => s + r.daysOpen, 0) / rows.length), [])
  const overSLA = rows.filter((r) => r.daysOpen > 5).length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Approval Governance Console</h1>
      <p className="text-sm text-text-muted mb-6">
        Cross-domain approval health — queue, ageing, threshold rules, escalations, and approver load. Identifies bottlenecks the transactional Approval Console can't surface.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Open Approvals</p>
          <p className="text-2xl font-bold text-dq-navy">{rows.length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Avg Days Open</p>
          <p className="text-2xl font-bold text-dq-navy">{avgAge}d</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Over SLA (&gt;5d)</p>
          <p className="text-2xl font-bold text-status-error-text">{overSLA}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Active Approvers</p>
          <p className="text-2xl font-bold text-dq-navy">{approverLoad.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-6">
        {/* Main queue */}
        <div>
          <div className="flex items-center gap-1 border-b border-border-subtle mb-4 flex-wrap">
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-1 border-b border-border-subtle">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Domain</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Approver</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Age</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Threshold</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={`${r.domain}-${r.id}`} className={`border-b border-border-subtle ${i === filtered.length - 1 ? 'border-b-0' : ''} ${r.daysOpen > 5 ? 'bg-status-error-surface/30' : ''}`}>
                    <td className="px-4 py-2.5"><RequestIDTag id={r.id} /></td>
                    <td className="px-4 py-2.5 text-text-muted text-xs">{r.domain}</td>
                    <td className="px-4 py-2.5 text-text-primary text-xs font-medium">{r.type}</td>
                    <td className="px-4 py-2.5 text-text-secondary text-xs">{r.approver}</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={`font-mono text-xs font-semibold ${r.daysOpen > 5 ? 'text-status-error-text' : 'text-text-secondary'}`}>
                        {r.daysOpen}d
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-text-muted text-[11px] italic">{r.thresholdRule}</td>
                    <td className="px-4 py-2.5"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Users size={16} className="text-dq-orange" strokeWidth={1.5} />
              Approver Load (Top 5)
            </h3>
            <div className="space-y-2">
              {approverLoad.map(([approver, count]) => (
                <div key={approver} className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{approver}</span>
                  <span className="font-mono font-semibold text-text-primary">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <AlertTriangle size={16} className="text-dq-orange" strokeWidth={1.5} />
              Bottleneck Signals
            </h3>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li>• {overSLA} approval(s) past 5-day informal SLA</li>
              <li>• {rows.filter((r) => r.status === 'Clarification Needed').length} blocked on clarification</li>
              <li>• Highest load on {approverLoad[0]?.[0]} ({approverLoad[0]?.[1]} items)</li>
            </ul>
          </div>

          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Clock size={16} className="text-dq-orange" strokeWidth={1.5} />
              Threshold Reference
            </h3>
            <p className="text-xs text-text-muted">
              Approval thresholds and delegation rules are configured in{' '}
              <a href="/approval-rules" className="text-dq-orange hover:underline">Approval Rules & Thresholds</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
