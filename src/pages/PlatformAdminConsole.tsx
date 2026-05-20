import { useState } from 'react'
import { UserCog, Sliders, Database, Server } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import RequestIDTag from '../components/RequestIDTag'
import { auditEvents } from '../data/fixtures'

const tiles = [
  {
    id: 'access',
    icon: <UserCog size={28} strokeWidth={1.5} />,
    label: 'Access & Roles',
    sub: '12 pending actions',
    badgeVariant: 'error' as const,
    badgeLabel: '12',
  },
  {
    id: 'workflow',
    icon: <Sliders size={28} strokeWidth={1.5} />,
    label: 'Workflow Rules',
    sub: '2 threshold changes needed',
    badgeVariant: 'warning' as const,
    badgeLabel: '2',
  },
  {
    id: 'master',
    icon: <Database size={28} strokeWidth={1.5} />,
    label: 'Master Data Quality',
    sub: '4 data issues flagged',
    badgeVariant: 'warning' as const,
    badgeLabel: '4',
  },
  {
    id: 'release',
    icon: <Server size={28} strokeWidth={1.5} />,
    label: 'Release & Config',
    sub: '1 pending release',
    badgeVariant: 'info' as const,
    badgeLabel: '1',
  },
]

const users = [
  { name: 'Aisha Khalid', segment: 'EXEC', entity: 'DQ MENA', domains: 'Finance, Intelligence, Governance', lastLogin: '20 May 2026', status: 'Active' },
  { name: 'Mohammed Rashid', segment: 'FIN-OWN', entity: 'DQ MENA', domains: 'Finance, Master Data, Intelligence', lastLogin: '20 May 2026', status: 'Active' },
  { name: 'Sara Pereira', segment: 'FIN-OPS', entity: 'DQ Iberia', domains: 'Finance, Governance, Master Data', lastLogin: '19 May 2026', status: 'Active' },
  { name: 'Jay Nair', segment: 'REQ', entity: 'DQ MENA', domains: 'My Work, Request Intake', lastLogin: '18 May 2026', status: 'Active' },
  { name: 'Tariq Al-Amin', segment: 'ADMIN', entity: 'DQ MENA', domains: 'All', lastLogin: '20 May 2026', status: 'Active' },
  { name: 'Layla Seitkali', segment: 'BC-STEWARD', entity: 'DQ MENA', domains: 'Platform Admin, Master Data', lastLogin: '17 May 2026', status: 'Active' },
]

const badgeColour: Record<string, string> = {
  error: 'bg-status-error-surface text-status-error-text',
  warning: 'bg-status-warning-surface text-status-warning-text',
  info: 'bg-status-info-surface text-status-info-text',
}

export default function PlatformAdminConsole() {
  const [expandedTile, setExpandedTile] = useState<string | null>(null)

  const handleTileClick = (id: string) => {
    setExpandedTile((prev) => (prev === id ? null : id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Platform Admin Console</h1>
      <p className="text-sm text-text-muted mb-6">Tariq Al-Amin · Platform Admin</p>

      {/* Admin task tiles */}
      <div className="grid grid-cols-2 gap-5 mb-8">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleTileClick(tile.id)}
            className={`p-6 rounded-card text-left transition-all card-hover shadow-sm ${
              expandedTile === tile.id
                ? 'bg-dq-navy text-white shadow-md'
                : 'bg-surface-1 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className={expandedTile === tile.id ? 'text-white/80' : 'text-text-muted'}>
                {tile.icon}
              </span>
              <span
                className={`text-[11px] font-semibold rounded-pill px-2 py-0.5 ${badgeColour[tile.badgeVariant]}`}
              >
                {tile.badgeLabel}
              </span>
            </div>
            <p className={`text-base font-semibold mb-1 ${expandedTile === tile.id ? 'text-white' : 'text-text-primary'}`}>
              {tile.label}
            </p>
            <p className={`text-sm ${expandedTile === tile.id ? 'text-white/70' : 'text-text-muted'}`}>
              {tile.sub}
            </p>
          </button>
        ))}
      </div>

      {/* Expanded Users & Roles table */}
      {expandedTile === 'access' && (
        <div className="mb-8 bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border-subtle bg-surface-1">
            <h3 className="text-sm font-semibold text-text-primary">Users & Roles</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Segment</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Entity</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Domains</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Login</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.name} className={`border-b border-border-subtle ${i === users.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-5 py-3.5 font-medium text-text-primary">{u.name}</td>
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs text-text-muted">{u.segment}</span>
                  </td>
                  <td className="px-5 py-3.5 text-text-secondary">{u.entity}</td>
                  <td className="px-5 py-3.5 text-text-muted text-xs max-w-[180px] truncate">{u.domains}</td>
                  <td className="px-5 py-3.5 text-text-muted text-xs">{u.lastLogin}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={u.status === 'Active' ? 'Approved' : 'Rejected'} size="sm" />
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs font-medium text-dq-orange hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recent Audit Events */}
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Audit Events</h2>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-1 border-b border-border-subtle">
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actor</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Action</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Target</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {auditEvents.map((event, i) => (
                <tr key={i} className={`border-b border-border-subtle ${i === auditEvents.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-5 py-3.5 font-medium text-text-primary">{event.actor}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{event.action}</td>
                  <td className="px-5 py-3.5">
                    <RequestIDTag id={event.target} />
                  </td>
                  <td className="px-5 py-3.5 text-text-muted text-xs">{event.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
