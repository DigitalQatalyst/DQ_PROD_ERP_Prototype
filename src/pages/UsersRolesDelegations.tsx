import { useState } from 'react'
import { Search, Shield, User } from 'lucide-react'
import { personas } from '../data/fixtures'
import { useToast } from '../components/Toast'

const delegations = [
  { from: 'Aisha Khalid', to: 'Mohammed Rashid', scope: 'Invoice approval ≤ AED 50,000', validUntil: '30 Jun 2026', status: 'Active' },
  { from: 'Mohammed Rashid', to: 'Sara Pereira', scope: 'Purchase request approval ≤ AED 5,000', validUntil: '31 May 2026', status: 'Active' },
]

const roleColor: Record<string, string> = {
  'EXEC': 'bg-status-error-surface text-status-error-text',
  'FIN-OWN': 'bg-navy-50 text-dq-navy',
  'FIN-OPS': 'bg-status-info-surface text-status-info-text',
  'REQ': 'bg-status-warning-surface text-status-warning-text',
  'ADMIN': 'bg-status-success-surface text-status-success-text',
  'BC-STEWARD': 'bg-orange-50 text-dq-orange',
}

export default function UsersRolesDelegations() {
  const [search, setSearch] = useState('')
  const { showToast } = useToast()

  const filtered = personas.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.role.toLowerCase().includes(search.toLowerCase()) ||
    p.roleLabel.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Users, Roles & Delegations</h1>
      <p className="text-sm text-text-muted mb-6">User directory with role assignments, entity access, and active delegations.</p>

      {/* Stats */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-navy-50 rounded-pill">
          <User size={13} className="text-dq-navy" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-dq-navy">{personas.length}</span>
          <span className="text-xs text-text-muted">Users</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <Shield size={13} className="text-status-success" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-success-text">{delegations.length}</span>
          <span className="text-xs text-text-muted">Active Delegations</span>
        </div>
        <div className="flex-1" />
        <button
          onClick={() => showToast('User invite form opened.', 'info')}
          className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Invite User
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search users by name or role…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-input border border-border-default text-sm focus:outline-none focus:border-dq-orange"
        />
      </div>

      {/* Users table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">User</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Role</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Nav Access</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Landing</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-dq-navy flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {p.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{p.name}</p>
                      <p className="text-xs font-mono text-text-muted">{p.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs font-mono font-semibold rounded-pill px-2 py-0.5 ${roleColor[p.role] || 'bg-surface-1 text-text-muted'}`}>{p.role}</span>
                  <p className="text-xs text-text-muted mt-1">{p.roleLabel}</p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {p.navDomains.slice(0, 3).map((d) => (
                      <span key={d} className="text-[10px] font-medium bg-surface-1 text-text-muted rounded-pill px-1.5 py-0.5 border border-border-subtle">{d}</span>
                    ))}
                    {p.navDomains.length > 3 && (
                      <span className="text-[10px] font-medium bg-surface-1 text-text-muted rounded-pill px-1.5 py-0.5 border border-border-subtle">+{p.navDomains.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 text-xs font-mono text-text-muted">{p.landingRoute}</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => showToast(`User ${p.name} settings opened.`, 'info')}
                    className="text-xs font-semibold text-dq-orange hover:underline"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delegations */}
      <p className="text-sm font-semibold text-text-primary mb-3">Active Delegations</p>
      <div className="space-y-2">
        {delegations.map((d, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-card border border-border-subtle shadow-sm">
            <Shield size={16} className="text-status-info shrink-0" strokeWidth={1.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">{d.from} → {d.to}</p>
              <p className="text-xs text-text-muted">{d.scope} · Valid until {d.validUntil}</p>
            </div>
            <span className="text-xs font-semibold bg-status-success-surface text-status-success-text rounded-pill px-2 py-0.5">{d.status}</span>
            <button
              onClick={() => showToast('Delegation revoked.', 'success')}
              className="text-xs font-semibold text-status-error-text hover:underline"
            >
              Revoke
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
