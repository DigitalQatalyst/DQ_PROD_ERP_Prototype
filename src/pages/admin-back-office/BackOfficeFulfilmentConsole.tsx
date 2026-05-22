import { useState } from 'react'
import { adminRequests } from '../../data/fixtures'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'
import type { AdminRequest } from '../../types'

type Tab = 'All' | AdminRequest['status']

export default function BackOfficeFulfilmentConsole() {
  const [tab, setTab] = useState<Tab>('All')

  const tabs: Tab[] = ['All', 'Submitted', 'In Progress', 'Awaiting Evidence', 'Blocked', 'Fulfilled']
  const filtered = adminRequests.filter((r) => tab === 'All' || r.status === tab)

  const open = adminRequests.filter((r) => r.status !== 'Fulfilled')
  const breached = open.filter((r) => r.daysOpen > r.slaDays)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Back-Office Fulfilment Console</h1>
      <p className="text-sm text-text-muted mb-6">
        Practitioner workspace for all back-office requests — travel, visa, office support, documentation, facilities, and stationery. SLA, owner, and blockers in one view.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Total Open</p>
          <p className="text-2xl font-bold text-dq-navy">{open.length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">SLA Breached</p>
          <p className="text-2xl font-bold text-status-error-text">{breached.length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Awaiting Evidence</p>
          <p className="text-2xl font-bold text-status-warning-text">{adminRequests.filter((r) => r.status === 'Awaiting Evidence').length}</p>
        </div>
        <div className="bg-surface-1 rounded-card shadow-sm p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Blocked</p>
          <p className="text-2xl font-bold text-status-error-text">{adminRequests.filter((r) => r.status === 'Blocked').length}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-4 flex-wrap">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Owner</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">SLA</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const slaBreach = r.daysOpen > r.slaDays
              return (
                <tr key={r.id} className={`border-b border-border-subtle hover:bg-surface-1 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-3"><RequestIDTag id={r.id} /></td>
                  <td className="px-4 py-3 text-text-primary text-xs font-medium">{r.type}</td>
                  <td className="px-4 py-3 text-text-secondary">
                    <p>{r.description}</p>
                    {r.notes && <p className="text-xs text-status-warning-text mt-0.5">{r.notes}</p>}
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{r.requester}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{r.owner}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-mono text-xs font-semibold ${slaBreach ? 'text-status-error-text' : 'text-text-secondary'}`}>
                      {r.daysOpen}d / {r.slaDays}d
                    </span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3">
                    {r.status !== 'Fulfilled' && (
                      <button className="text-xs font-medium text-dq-orange hover:underline">Advance</button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
