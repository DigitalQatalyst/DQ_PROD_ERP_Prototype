import { useState } from 'react'
import { Plus, Edit2, ShieldCheck, UserX, Users } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface PlatformUser {
  id: string
  name: string
  email: string
  department: string
  entity: 'DQ HQ' | 'DQ Abu Dhabi' | 'DQ Dubai' | 'DQ International'
  role: string
  roleLabel: string
  status: 'Active' | 'Inactive' | 'Suspended'
  workspaceCount: number
  lastLogin: string
  pendingApprovals: number
  pendingTasks: number
  mfaEnabled: boolean
  createdDate: string
}

const platformUsers: PlatformUser[] = [
  {
    id: 'USR-001',
    name: 'Tariq Al-Amin',
    email: 'tariq.alamin@digitalqatalyst.com',
    department: 'Finance',
    entity: 'DQ HQ',
    role: 'finance-owner',
    roleLabel: 'Finance Owner',
    status: 'Active',
    workspaceCount: 4,
    lastLogin: '2025-06-10',
    pendingApprovals: 7,
    pendingTasks: 3,
    mfaEnabled: true,
    createdDate: '2024-01-15',
  },
  {
    id: 'USR-002',
    name: 'Fatima Bin Hammad',
    email: 'fatima.binhammad@digitalqatalyst.com',
    department: 'Human Resources',
    entity: 'DQ HQ',
    role: 'hr-owner',
    roleLabel: 'HR Owner',
    status: 'Active',
    workspaceCount: 3,
    lastLogin: '2025-06-10',
    pendingApprovals: 4,
    pendingTasks: 6,
    mfaEnabled: true,
    createdDate: '2024-01-15',
  },
  {
    id: 'USR-003',
    name: 'Yasmin Al-Mansoori',
    email: 'yasmin.almansoori@digitalqatalyst.com',
    department: 'Procurement',
    entity: 'DQ HQ',
    role: 'procurement-owner',
    roleLabel: 'Procurement Owner',
    status: 'Active',
    workspaceCount: 3,
    lastLogin: '2025-06-09',
    pendingApprovals: 11,
    pendingTasks: 5,
    mfaEnabled: true,
    createdDate: '2024-01-15',
  },
  {
    id: 'USR-004',
    name: 'Mohammed Rashid',
    email: 'mohammed.rashid@digitalqatalyst.com',
    department: 'Executive',
    entity: 'DQ HQ',
    role: 'executive',
    roleLabel: 'Executive',
    status: 'Active',
    workspaceCount: 6,
    lastLogin: '2025-06-10',
    pendingApprovals: 3,
    pendingTasks: 1,
    mfaEnabled: true,
    createdDate: '2024-01-10',
  },
  {
    id: 'USR-005',
    name: 'Sara Pereira',
    email: 'sara.pereira@digitalqatalyst.com',
    department: 'Finance',
    entity: 'DQ HQ',
    role: 'finance-operator',
    roleLabel: 'Finance Operator',
    status: 'Active',
    workspaceCount: 3,
    lastLogin: '2025-06-10',
    pendingApprovals: 0,
    pendingTasks: 9,
    mfaEnabled: true,
    createdDate: '2024-02-01',
  },
  {
    id: 'USR-006',
    name: 'Maya Sharma',
    email: 'maya.sharma@digitalqatalyst.com',
    department: 'Operations',
    entity: 'DQ Dubai',
    role: 'service-desk',
    roleLabel: 'Service Desk',
    status: 'Active',
    workspaceCount: 2,
    lastLogin: '2025-06-10',
    pendingApprovals: 0,
    pendingTasks: 14,
    mfaEnabled: true,
    createdDate: '2024-03-10',
  },
  {
    id: 'USR-007',
    name: 'Layla Seitkali',
    email: 'layla.seitkali@digitalqatalyst.com',
    department: 'Projects',
    entity: 'DQ HQ',
    role: 'project-manager',
    roleLabel: 'Project Manager',
    status: 'Active',
    workspaceCount: 4,
    lastLogin: '2025-06-09',
    pendingApprovals: 2,
    pendingTasks: 8,
    mfaEnabled: true,
    createdDate: '2024-02-20',
  },
  {
    id: 'USR-008',
    name: 'Rashid Ahmed',
    email: 'rashid.ahmed@digitalqatalyst.com',
    department: 'IT',
    entity: 'DQ HQ',
    role: 'platform-admin',
    roleLabel: 'Platform Admin',
    status: 'Active',
    workspaceCount: 7,
    lastLogin: '2025-06-10',
    pendingApprovals: 1,
    pendingTasks: 4,
    mfaEnabled: true,
    createdDate: '2024-01-12',
  },
  {
    id: 'USR-009',
    name: 'Aisha Al-Hamdan',
    email: 'aisha.alhamdan@digitalqatalyst.com',
    department: 'Finance',
    entity: 'DQ Abu Dhabi',
    role: 'finance-operator',
    roleLabel: 'Finance Operator',
    status: 'Active',
    workspaceCount: 2,
    lastLogin: '2025-06-08',
    pendingApprovals: 0,
    pendingTasks: 6,
    mfaEnabled: true,
    createdDate: '2024-04-01',
  },
  {
    id: 'USR-010',
    name: 'Khalid Al-Zaabi',
    email: 'khalid.alzaabi@digitalqatalyst.com',
    department: 'Procurement',
    entity: 'DQ Abu Dhabi',
    role: 'procurement-operator',
    roleLabel: 'Procurement Operator',
    status: 'Active',
    workspaceCount: 2,
    lastLogin: '2025-06-07',
    pendingApprovals: 0,
    pendingTasks: 11,
    mfaEnabled: false,
    createdDate: '2024-04-15',
  },
  {
    id: 'USR-011',
    name: 'Nour Karimi',
    email: 'nour.karimi@digitalqatalyst.com',
    department: 'Human Resources',
    entity: 'DQ Dubai',
    role: 'hr-operator',
    roleLabel: 'HR Operator',
    status: 'Active',
    workspaceCount: 2,
    lastLogin: '2025-06-09',
    pendingApprovals: 0,
    pendingTasks: 7,
    mfaEnabled: false,
    createdDate: '2024-05-01',
  },
  {
    id: 'USR-012',
    name: 'Priya Menon',
    email: 'priya.menon@digitalqatalyst.com',
    department: 'Finance',
    entity: 'DQ International',
    role: 'auditor',
    roleLabel: 'Auditor',
    status: 'Active',
    workspaceCount: 3,
    lastLogin: '2025-06-06',
    pendingApprovals: 0,
    pendingTasks: 2,
    mfaEnabled: true,
    createdDate: '2024-03-20',
  },
  {
    id: 'USR-013',
    name: 'Omar Bin Saeed',
    email: 'omar.binsaeed@digitalqatalyst.com',
    department: 'Operations',
    entity: 'DQ Dubai',
    role: 'inventory-manager',
    roleLabel: 'Inventory Manager',
    status: 'Active',
    workspaceCount: 2,
    lastLogin: '2025-06-10',
    pendingApprovals: 0,
    pendingTasks: 5,
    mfaEnabled: false,
    createdDate: '2024-06-01',
  },
  {
    id: 'USR-014',
    name: 'Hessa Al-Nuaimi',
    email: 'hessa.alnuaimi@digitalqatalyst.com',
    department: 'Executive',
    entity: 'DQ HQ',
    role: 'read-only',
    roleLabel: 'Read-Only',
    status: 'Active',
    workspaceCount: 2,
    lastLogin: '2025-05-30',
    pendingApprovals: 0,
    pendingTasks: 0,
    mfaEnabled: true,
    createdDate: '2024-07-10',
  },
  {
    id: 'USR-015',
    name: 'Faisal Al-Rashidi',
    email: 'faisal.alrashidi@digitalqatalyst.com',
    department: 'IT',
    entity: 'DQ HQ',
    role: 'ai-analyst',
    roleLabel: 'AI Analyst',
    status: 'Active',
    workspaceCount: 3,
    lastLogin: '2025-06-09',
    pendingApprovals: 0,
    pendingTasks: 3,
    mfaEnabled: true,
    createdDate: '2024-08-15',
  },
  {
    id: 'USR-016',
    name: 'Dana Al-Farsi',
    email: 'dana.alfarsi@digitalqatalyst.com',
    department: 'Procurement',
    entity: 'DQ HQ',
    role: 'master-data-steward',
    roleLabel: 'Master Data Steward',
    status: 'Inactive',
    workspaceCount: 2,
    lastLogin: '2025-04-12',
    pendingApprovals: 0,
    pendingTasks: 0,
    mfaEnabled: false,
    createdDate: '2024-05-20',
  },
  {
    id: 'USR-017',
    name: 'Jassim Al-Kuwari',
    email: 'jassim.alkuwari@digitalqatalyst.com',
    department: 'Finance',
    entity: 'DQ Abu Dhabi',
    role: 'finance-owner',
    roleLabel: 'Finance Owner',
    status: 'Suspended',
    workspaceCount: 0,
    lastLogin: '2025-03-28',
    pendingApprovals: 0,
    pendingTasks: 0,
    mfaEnabled: false,
    createdDate: '2024-02-10',
  },
  {
    id: 'USR-018',
    name: 'Rania Osman',
    email: 'rania.osman@digitalqatalyst.com',
    department: 'Human Resources',
    entity: 'DQ International',
    role: 'delegation-proxy',
    roleLabel: 'Delegation Proxy',
    status: 'Active',
    workspaceCount: 2,
    lastLogin: '2025-06-05',
    pendingApprovals: 1,
    pendingTasks: 2,
    mfaEnabled: true,
    createdDate: '2024-09-01',
  },
]

export default function UserManagement() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Inactive' | 'Suspended'>('All')

  const stats = {
    totalUsers: platformUsers.length,
    activeUsers: platformUsers.filter(u => u.status === 'Active').length,
    pendingApprovals: platformUsers.reduce((sum, u) => sum + u.pendingApprovals, 0),
    mfaEnabled: platformUsers.filter(u => u.mfaEnabled).length,
  }

  const filtered = filter === 'All' ? platformUsers : platformUsers.filter(u => u.status === filter)

  const filterOptions: Array<'All' | 'Active' | 'Inactive' | 'Suspended'> = ['All', 'Active', 'Inactive', 'Suspended']

  const entityColors: Record<string, string> = {
    'DQ HQ': 'bg-status-info-surface text-status-info',
    'DQ Abu Dhabi': 'bg-purple-50 text-purple-700',
    'DQ Dubai': 'bg-status-success-surface text-status-success',
    'DQ International': 'bg-status-warning-surface text-status-warning',
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
          <p className="text-sm text-text-muted mt-1">
            Manage all DWS.04 platform users — add, edit, suspend, and reassign roles across entities and workspaces.
          </p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Total Users</p>
          <p className="text-3xl font-bold text-text-primary">{stats.totalUsers}</p>
          <p className="text-xs text-text-muted mt-1">across all entities</p>
        </div>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Active</p>
          <p className="text-3xl font-bold text-status-success">{stats.activeUsers}</p>
          <p className="text-xs text-text-muted mt-1">users with platform access</p>
        </div>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Pending Approvals</p>
          <p className="text-3xl font-bold text-status-warning">{stats.pendingApprovals}</p>
          <p className="text-xs text-text-muted mt-1">items awaiting action</p>
        </div>
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">MFA Enabled</p>
          <p className="text-3xl font-bold text-status-info">{stats.mfaEnabled}</p>
          <p className="text-xs text-text-muted mt-1">of {stats.totalUsers} users</p>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 mb-4">
        {filterOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === opt ? 'bg-dq-navy text-white' : 'bg-surface-1 text-text-muted hover:bg-border-subtle'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm">
        <table className="w-full">
          <thead className="bg-surface-1 border-b border-border-subtle">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">User</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Department</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Entity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Role</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Workspaces</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Pending</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">MFA</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Login</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-surface-1 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-dq-navy/10 flex items-center justify-center text-xs font-bold text-dq-navy">
                      {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{user.name}</p>
                      <p className="text-xs text-text-muted">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary">{user.department}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${entityColors[user.entity]}`}>
                    {user.entity}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary">{user.roleLabel}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-text-primary">{user.workspaceCount}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    {user.pendingApprovals > 0 && (
                      <span className="text-xs text-status-warning font-medium">{user.pendingApprovals} approvals</span>
                    )}
                    {user.pendingTasks > 0 && (
                      <span className="text-xs text-status-info font-medium">{user.pendingTasks} tasks</span>
                    )}
                    {user.pendingApprovals === 0 && user.pendingTasks === 0 && (
                      <span className="text-xs text-text-muted">—</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {user.mfaEnabled ? (
                    <span className="inline-flex items-center gap-1 text-xs text-status-success font-medium">
                      <ShieldCheck size={12} /> Enabled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-status-error font-medium">
                      <UserX size={12} /> Disabled
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-secondary">{user.lastLogin}</span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-4 py-3">
                  <button className="p-1.5 rounded hover:bg-surface-1 text-text-muted hover:text-text-primary transition-colors">
                    <Edit2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Governance Notes */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-status-info-surface border border-status-info/20 rounded-card">
          <div className="flex items-start gap-3">
            <Users size={18} className="text-status-info mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">User Offboarding</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Suspended users retain their full audit history, past approvals, and activity logs. Platform access is revoked immediately upon suspension, but all records remain intact for compliance purposes. Suspended accounts must be reviewed by a Platform Admin within 30 days for permanent deactivation or reinstatement.
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} className="text-status-warning mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">MFA Policy</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Multi-factor authentication is mandatory for all users assigned an approver-level role or above — including Finance Owner, HR Owner, Procurement Owner, Platform Admin, and Executive roles. Users without MFA enabled at these levels will be flagged and automatically blocked from processing approvals until MFA is configured.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
