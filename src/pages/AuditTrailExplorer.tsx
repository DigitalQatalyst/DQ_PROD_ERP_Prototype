import { useState } from 'react'
import { Search, Shield, Filter } from 'lucide-react'
import { auditEvents } from '../data/fixtures'

const extendedEvents = [
  ...auditEvents,
  { actor: 'System', action: 'BC sync completed', target: 'REQ-2025-0043', timestamp: '18 May 2026 11:42' },
  { actor: 'Sara Pereira', action: 'Requested clarification', target: 'REQ-2025-0046', timestamp: '16 May 2026 14:30' },
  { actor: 'System', action: 'Renewal alert triggered', target: 'SUB-005', timestamp: '20 May 2026 08:00' },
  { actor: 'Layla Seitkali', action: 'BC sync failed (retry 3)', target: 'VND-004', timestamp: '17 May 2026 09:15' },
  { actor: 'Mohammed Rashid', action: 'Drafted budget amendment', target: 'REQ-2025-0048', timestamp: '18 May 2026 10:30' },
  { actor: 'System', action: 'Renewal alert triggered', target: 'SUB-003', timestamp: '20 May 2026 08:00' },
  { actor: 'Sara Pereira', action: 'Escalated overdue claim', target: 'REQ-2025-0046', timestamp: '18 May 2026 11:00' },
  { actor: 'Tariq Al-Amin', action: 'Updated permission: BC-STEWARD', target: 'Layla Seitkali', timestamp: '15 May 2026 09:00' },
]

const actorColor: Record<string, string> = {
  'Mohammed Rashid': 'bg-navy-50 text-dq-navy',
  'Sara Pereira': 'bg-status-info-surface text-status-info-text',
  'Tariq Al-Amin': 'bg-status-success-surface text-status-success-text',
  'Layla Seitkali': 'bg-orange-50 text-dq-orange',
  'Jay Nair': 'bg-status-warning-surface text-status-warning-text',
  'Aisha Khalid': 'bg-status-error-surface text-status-error-text',
  'System': 'bg-surface-1 text-text-muted',
}

const eventTypeStyle = (action: string) => {
  if (action.toLowerCase().includes('approved') || action.toLowerCase().includes('completed')) return 'text-status-success-text'
  if (action.toLowerCase().includes('failed') || action.toLowerCase().includes('escalated')) return 'text-status-error-text'
  if (action.toLowerCase().includes('alert') || action.toLowerCase().includes('overdue')) return 'text-status-warning-text'
  return 'text-text-secondary'
}

export default function AuditTrailExplorer() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'All' | 'User' | 'System'>('All')

  const filtered = extendedEvents.filter(e => {
    const matchSearch = !search || e.actor.toLowerCase().includes(search.toLowerCase()) || e.action.toLowerCase().includes(search.toLowerCase()) || e.target.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || (filter === 'System' ? e.actor === 'System' : e.actor !== 'System')
    return matchSearch && matchFilter
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Audit Trail Explorer</h1>
      <p className="text-sm text-text-muted mb-6">Full immutable audit log of all platform actions, approvals, data changes, and BC sync events.</p>

      {/* Summary */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2 px-4 py-2 bg-navy-50 rounded-pill">
          <Shield size={13} className="text-dq-navy" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-dq-navy">{extendedEvents.length}</span>
          <span className="text-xs text-text-muted">Total Events</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-info-surface rounded-pill">
          <span className="text-sm font-semibold text-status-info-text">{extendedEvents.filter(e => e.actor !== 'System').length}</span>
          <span className="text-xs text-text-muted">User Actions</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface-1 rounded-pill border border-border-subtle">
          <span className="text-sm font-semibold text-text-muted">{extendedEvents.filter(e => e.actor === 'System').length}</span>
          <span className="text-xs text-text-muted">System Events</span>
        </div>
      </div>

      {/* Search and filter */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search by actor, action, or target…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-input border border-border-default text-sm focus:outline-none focus:border-dq-orange"
          />
        </div>
        <div className="flex items-center gap-1 border-b-0 shrink-0">
          {(['All', 'User', 'System'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 text-sm font-medium rounded-btn border transition-colors ${filter === f ? 'border-dq-orange bg-orange-50 text-dq-orange' : 'border-border-subtle bg-white text-text-muted hover:bg-surface-1'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Event log */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-surface-1 border-b border-border-subtle flex items-center justify-between">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Audit Events — Most Recent First</p>
          <p className="text-xs text-text-muted">{filtered.length} event(s) shown</p>
        </div>
        <div className="divide-y divide-border-subtle">
          {filtered.map((e, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-surface-1 transition-colors">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${actorColor[e.actor] || 'bg-surface-1 text-text-muted'}`}>
                {e.actor === 'System' ? 'SYS' : e.actor.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-text-primary">{e.actor}</span>
                  <span className={`text-xs ${eventTypeStyle(e.action)}`}>{e.action}</span>
                  <span className="text-xs font-mono text-dq-navy">{e.target}</span>
                </div>
              </div>
              <span className="text-xs text-text-disabled font-mono shrink-0">{e.timestamp}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-text-muted">No events match your search.</div>
          )}
        </div>
      </div>
    </div>
  )
}
