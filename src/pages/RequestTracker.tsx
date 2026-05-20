import { useState } from 'react'
import { Search } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import RequestIDTag from '../components/RequestIDTag'
import BCSyncChip from '../components/BCSyncChip'
import SidePanel from '../components/SidePanel'
import EvidenceChecklist from '../components/EvidenceChecklist'
import { usePersona } from '../context/PersonaContext'
import { requests } from '../data/fixtures'
import type { Request } from '../types'

const STATUS_FILTERS = ['All', 'Draft', 'Submitted', 'In Review', 'Approved', 'Clarification Needed', 'Rejected', 'Fulfilled']

const timelineEvents = [
  { status: 'Submitted', timestamp: '13 May 2026 09:15', actor: 'Jay Nair' },
  { status: 'In Review', timestamp: '14 May 2026 10:30', actor: 'Sara Pereira' },
  { status: 'Clarification Needed', timestamp: '16 May 2026 14:30', actor: 'Sara Pereira' },
]

export default function RequestTracker() {
  const { activePersona } = usePersona()
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedReq, setSelectedReq] = useState<Request | null>(null)

  const isJN = activePersona.role === 'REQ'
  const displayRequests = isJN
    ? requests.filter((r) => r.requester === 'Jay Nair')
    : requests

  const filtered = displayRequests.filter((r) => {
    const matchStatus = statusFilter === 'All' || r.status === statusFilter
    const matchSearch = !search || r.id.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const handleRowClick = (req: Request) => {
    setSelectedReq(req)
    setPanelOpen(true)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Request Tracker</h1>
      <p className="text-sm text-text-muted mb-6">
        {isJN ? 'Your requests' : 'All active requests'}
      </p>

      {/* Filter row */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID or description…"
            className="w-full pl-9 pr-4 py-2.5 rounded-input border border-border-default text-sm focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-input border border-border-default text-sm text-text-primary bg-white focus:outline-none"
        >
          {STATUS_FILTERS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Approver</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Evidence</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req, i) => (
              <tr
                key={req.id}
                className={`border-b border-border-subtle cursor-pointer hover:bg-surface-1 transition-colors ${
                  i === filtered.length - 1 ? 'border-b-0' : ''
                }`}
                onClick={() => handleRowClick(req)}
              >
                <td className="px-4 py-3.5">
                  <RequestIDTag id={req.id} />
                </td>
                <td className="px-4 py-3.5 text-text-primary">{req.type}</td>
                <td className="px-4 py-3.5 text-right font-mono font-semibold"
                    style={{ fontFeatureSettings: "'tnum' on" }}>
                  {req.amount > 0 ? `AED ${req.amount.toLocaleString()}` : '—'}
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={req.status} />
                </td>
                <td className="px-4 py-3.5 text-text-secondary">{req.approver}</td>
                <td className="px-4 py-3.5">
                  {req.evidence && req.evidence.length > 0 ? (
                    <span className={`text-xs font-medium ${
                      req.evidence.every((e) => e.checked) ? 'text-status-success-text' : 'text-status-warning-text'
                    }`}>
                      {req.evidence.filter((e) => e.checked).length}/{req.evidence.length}
                    </span>
                  ) : (
                    <span className="text-text-disabled text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-3.5 text-text-muted text-xs">{req.submittedDate}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-text-muted text-sm">
                  No requests match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Side Panel */}
      {selectedReq && (
        <SidePanel
          open={panelOpen}
          onClose={() => setPanelOpen(false)}
          title={selectedReq.id}
        >
          <div className="space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={selectedReq.status} />
              {selectedReq.isHighValue && <StatusBadge status="High Value" />}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-muted text-xs mb-1">Type</p>
                <p className="font-medium">{selectedReq.type}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Amount</p>
                <p className="font-mono font-bold text-dq-orange"
                   style={{ fontFeatureSettings: "'tnum' on" }}>
                  {selectedReq.currency} {selectedReq.amount > 0 ? selectedReq.amount.toLocaleString() : '—'}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Requester</p>
                <p className="font-medium">{selectedReq.requester}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Approver</p>
                <p className="font-medium">{selectedReq.approver}</p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Status History</p>
              <div className="space-y-3">
                {timelineEvents.map((e, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-dq-orange shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{e.status}</p>
                      <p className="text-xs text-text-muted">{e.actor} · {e.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence */}
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Evidence</p>
              <EvidenceChecklist items={selectedReq.evidence ?? []} />
            </div>

            {/* Comment */}
            <div className="p-3 bg-status-warning-surface rounded-card">
              <p className="text-sm text-status-warning-text">
                <span className="font-semibold">Sara Pereira:</span> Please provide per-diem breakdown —{' '}
                <span className="text-xs">16 May 14:30</span>
              </p>
            </div>

            {selectedReq.bcSync && (
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">BC Sync</p>
                <BCSyncChip status={selectedReq.bcSync} bcRef={selectedReq.bcRef} />
              </div>
            )}
          </div>
        </SidePanel>
      )}
    </div>
  )
}
