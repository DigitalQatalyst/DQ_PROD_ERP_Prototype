import { useState } from 'react'
import { Plus, Edit2, Wifi, WifiOff, AlertTriangle, RefreshCw } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface BCConnection {
  id: string
  name: string
  description: string
  environment: 'Production' | 'Sandbox' | 'UAT'
  connectionType: 'REST API' | 'OData' | 'Webhook'
  authMethod: 'OAuth 2.0' | 'API Key' | 'Service Account'
  endpoint: string
  tenantId: string
  status: 'Connected' | 'Degraded' | 'Disconnected' | 'Maintenance'
  lastSyncAt: string
  syncFrequencyMinutes: number
  recordsSyncedToday: number
  failedToday: number
  avgResponseMs: number
  lastTestedBy: string
  lastModified: string
}

const bcConnections: BCConnection[] = [
  { id: 'BC-001', name: 'Finance GL Sync', description: 'Synchronises General Ledger accounts, journal entries, and posted transactions from DWS.04 to BC Finance module', environment: 'Production', connectionType: 'REST API', authMethod: 'OAuth 2.0', endpoint: 'api.businesscentral.microsoft.com/v2.0/DQ-PROD/api/v2.0/companies(...)/generalLedgerEntries', tenantId: 'a3f8...c29d', status: 'Connected', lastSyncAt: '10 Jun 2026, 14:45', syncFrequencyMinutes: 15, recordsSyncedToday: 1842, failedToday: 0, avgResponseMs: 213, lastTestedBy: 'Rashid Ahmed', lastModified: '01 Jun 2026' },
  { id: 'BC-002', name: 'Vendor Master Sync', description: 'Syncs vendor profiles, payment terms, bank details, and approval statuses between DWS.04 Procurement and BC Purchase module', environment: 'Production', connectionType: 'OData', authMethod: 'OAuth 2.0', endpoint: 'api.businesscentral.microsoft.com/v2.0/DQ-PROD/ODataV4/Company(...)/Vendors', tenantId: 'a3f8...c29d', status: 'Connected', lastSyncAt: '10 Jun 2026, 14:30', syncFrequencyMinutes: 30, recordsSyncedToday: 47, failedToday: 0, avgResponseMs: 318, lastTestedBy: 'Rashid Ahmed', lastModified: '28 May 2026' },
  { id: 'BC-003', name: 'Customer Master Sync', description: 'Syncs customer records, credit limits, payment terms, and contact details from DWS.04 to BC Sales module', environment: 'Production', connectionType: 'OData', authMethod: 'OAuth 2.0', endpoint: 'api.businesscentral.microsoft.com/v2.0/DQ-PROD/ODataV4/Company(...)/Customers', tenantId: 'a3f8...c29d', status: 'Connected', lastSyncAt: '10 Jun 2026, 14:00', syncFrequencyMinutes: 60, recordsSyncedToday: 23, failedToday: 0, avgResponseMs: 274, lastTestedBy: 'Rashid Ahmed', lastModified: '25 May 2026' },
  { id: 'BC-004', name: 'Dimension Code Sync', description: 'Syncs cost centre, department, and project dimension values and hierarchies from BC to DWS.04 for dropdown population', environment: 'Production', connectionType: 'REST API', authMethod: 'OAuth 2.0', endpoint: 'api.businesscentral.microsoft.com/v2.0/DQ-PROD/api/v2.0/companies(...)/dimensions', tenantId: 'a3f8...c29d', status: 'Degraded', lastSyncAt: '10 Jun 2026, 11:15', syncFrequencyMinutes: 60, recordsSyncedToday: 12, failedToday: 4, avgResponseMs: 1840, lastTestedBy: 'Rashid Ahmed', lastModified: '09 Jun 2026' },
  { id: 'BC-005', name: 'Purchase Order Sync', description: 'Pushes approved purchase orders from DWS.04 Procurement to BC Purchase module and pulls back GRN and invoice matching status', environment: 'Production', connectionType: 'REST API', authMethod: 'OAuth 2.0', endpoint: 'api.businesscentral.microsoft.com/v2.0/DQ-PROD/api/v2.0/companies(...)/purchaseOrders', tenantId: 'a3f8...c29d', status: 'Connected', lastSyncAt: '10 Jun 2026, 14:45', syncFrequencyMinutes: 15, recordsSyncedToday: 386, failedToday: 1, avgResponseMs: 341, lastTestedBy: 'Rashid Ahmed', lastModified: '03 Jun 2026' },
  { id: 'BC-006', name: 'Employee Master Sync', description: 'Syncs employee records, department assignments, and cost centre allocations between DWS.04 HR and BC HR module', environment: 'Production', connectionType: 'REST API', authMethod: 'Service Account', endpoint: 'api.businesscentral.microsoft.com/v2.0/DQ-PROD/api/v2.0/companies(...)/employees', tenantId: 'a3f8...c29d', status: 'Connected', lastSyncAt: '10 Jun 2026, 08:00', syncFrequencyMinutes: 480, recordsSyncedToday: 38, failedToday: 0, avgResponseMs: 198, lastTestedBy: 'Fatima Bin Hammad', lastModified: '02 Jun 2026' },
  { id: 'BC-007', name: 'Item & Inventory Sync', description: 'Syncs inventory item master, stock levels, unit costs, and reorder points from BC Inventory module to DWS.04 IT Operations workspace', environment: 'Production', connectionType: 'OData', authMethod: 'OAuth 2.0', endpoint: 'api.businesscentral.microsoft.com/v2.0/DQ-PROD/ODataV4/Company(...)/Items', tenantId: 'a3f8...c29d', status: 'Connected', lastSyncAt: '10 Jun 2026, 12:00', syncFrequencyMinutes: 120, recordsSyncedToday: 214, failedToday: 0, avgResponseMs: 287, lastTestedBy: 'Rashid Ahmed', lastModified: '31 May 2026' },
  { id: 'BC-008', name: 'BC→DWS Webhook — Real-Time Events', description: 'Receives real-time push notifications from BC for posted invoices, approved POs, and GL period close events to trigger DWS.04 workflow actions', environment: 'Production', connectionType: 'Webhook', authMethod: 'API Key', endpoint: 'api.businesscentral.microsoft.com/v2.0/DQ-PROD/api/webhooks → dws04.digitalqatalyst.ae/api/bc/events', tenantId: 'a3f8...c29d', status: 'Connected', lastSyncAt: '10 Jun 2026, 14:52', syncFrequencyMinutes: 0, recordsSyncedToday: 63, failedToday: 0, avgResponseMs: 88, lastTestedBy: 'Rashid Ahmed', lastModified: '05 Jun 2026' },
]

const sandboxConnections: BCConnection[] = [
  { id: 'BC-SBX-001', name: 'Finance GL Sync (Sandbox)', description: 'Sandbox mirror of BC-001 for testing GL mapping changes and period configuration before Production promotion', environment: 'Sandbox', connectionType: 'REST API', authMethod: 'OAuth 2.0', endpoint: 'api.businesscentral.microsoft.com/v2.0/DQ-SANDBOX/api/v2.0/companies(...)/generalLedgerEntries', tenantId: 'a3f8...c29d', status: 'Connected', lastSyncAt: '09 Jun 2026, 17:00', syncFrequencyMinutes: 60, recordsSyncedToday: 0, failedToday: 0, avgResponseMs: 224, lastTestedBy: 'Rashid Ahmed', lastModified: '06 Jun 2026' },
  { id: 'BC-SBX-002', name: 'Dimension Sync (Sandbox)', description: 'Sandbox connection for testing dimension hierarchy changes — used to validate WAR-016 entity isolation before go-live', environment: 'Sandbox', connectionType: 'REST API', authMethod: 'OAuth 2.0', endpoint: 'api.businesscentral.microsoft.com/v2.0/DQ-SANDBOX/api/v2.0/companies(...)/dimensions', tenantId: 'a3f8...c29d', status: 'Connected', lastSyncAt: '10 Jun 2026, 10:30', syncFrequencyMinutes: 120, recordsSyncedToday: 8, failedToday: 0, avgResponseMs: 196, lastTestedBy: 'Rashid Ahmed', lastModified: '06 Jun 2026' },
]

const allConnections = [...bcConnections, ...sandboxConnections]

export default function BCIntegrationSettings() {
  const [filter, setFilter] = useState<'All' | 'Connected' | 'Degraded' | 'Disconnected'>('All')

  const stats = {
    total: allConnections.length,
    connected: allConnections.filter(c => c.status === 'Connected').length,
    recordsSyncedToday: allConnections.reduce((sum, c) => sum + c.recordsSyncedToday, 0),
    failedToday: allConnections.reduce((sum, c) => sum + c.failedToday, 0),
  }

  const filtered = filter === 'All' ? allConnections : allConnections.filter(c => c.status === filter)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Business Central Integration Settings</h1>
          <p className="text-sm text-text-muted">Configure BC API connections, authentication, and sync parameters for DWS.04 ↔ BC data flow</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} strokeWidth={2} />
          Add Connection
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Total Connections</p>
            <Wifi size={14} className="text-text-muted" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Connected</p>
            <Wifi size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-success-text">{stats.connected}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Records Synced Today</p>
            <RefreshCw size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text">{stats.recordsSyncedToday.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Failed Today</p>
            <AlertTriangle size={14} className={stats.failedToday > 0 ? 'text-status-error' : 'text-text-muted'} strokeWidth={1.5} />
          </div>
          <p className={`text-2xl font-bold ${stats.failedToday > 0 ? 'text-status-error-text' : 'text-text-primary'}`}>{stats.failedToday}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Connected', 'Degraded', 'Disconnected'] as const).map((f) => (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Connection</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Environment</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Auth</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Endpoint</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Freq.</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Synced Today</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Failed</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Avg ms</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((conn) => (
                <tr key={conn.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-text-primary">{conn.name}</p>
                      <p className="text-xs text-text-muted mt-0.5 max-w-xs">{conn.description}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-text-disabled font-mono">{conn.id}</p>
                        <span className="text-xs text-text-disabled">·</span>
                        <p className="text-xs text-text-disabled">Last sync: {conn.lastSyncAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      conn.environment === 'Production'
                        ? 'bg-status-error-surface text-status-error-text'
                        : conn.environment === 'Sandbox'
                        ? 'bg-status-info-surface text-status-info-text'
                        : 'bg-status-warning-surface text-status-warning-text'
                    }`}>
                      {conn.environment}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-secondary">
                      {conn.connectionType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs text-text-secondary">{conn.authMethod}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-mono text-text-muted truncate max-w-[200px]" title={conn.endpoint}>{conn.endpoint}</p>
                    <p className="text-xs text-text-disabled mt-0.5">Tenant: {conn.tenantId}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {conn.syncFrequencyMinutes === 0 ? (
                      <span className="text-xs text-status-info-text font-medium">Real-time</span>
                    ) : (
                      <span className="text-xs font-mono text-text-secondary">{conn.syncFrequencyMinutes}m</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-mono text-text-primary">{conn.recordsSyncedToday.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {conn.failedToday > 0 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-status-error-surface text-status-error-text text-xs font-bold">
                        {conn.failedToday}
                      </span>
                    ) : (
                      <span className="text-text-disabled text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-mono ${
                      conn.avgResponseMs > 1000 ? 'text-status-error-text' :
                      conn.avgResponseMs > 500 ? 'text-status-warning-text' :
                      'text-status-success-text'
                    }`}>
                      {conn.avgResponseMs}ms
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                      conn.status === 'Connected'
                        ? 'bg-status-success-surface text-status-success-text'
                        : conn.status === 'Degraded'
                        ? 'bg-status-warning-surface text-status-warning-text'
                        : conn.status === 'Disconnected'
                        ? 'bg-status-error-surface text-status-error-text'
                        : 'bg-surface-1 text-text-muted'
                    }`}>
                      {conn.status === 'Connected' && <Wifi size={10} strokeWidth={2} />}
                      {conn.status === 'Degraded' && <AlertTriangle size={10} strokeWidth={2} />}
                      {conn.status === 'Disconnected' && <WifiOff size={10} strokeWidth={2} />}
                      {conn.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit connection">
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
        <div className="p-4 bg-status-info-surface border border-status-info/20 rounded-card">
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Connection Health</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Degraded connections trigger an immediate alert to the Integration Team (Rashid Ahmed) and log a P2 incident. The system performs automatic retry up to 3 times with exponential backoff before marking the connection as Failed. BC-004 Dimension Sync is currently degraded — high response times indicate a BC environment issue under investigation.
          </p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Sandbox Testing</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            All configuration changes — including auth method updates, endpoint changes, and sync frequency adjustments — must be tested in the Sandbox environment before applying to Production. Sandbox connections are clearly labelled and do not count toward Production sync metrics. Promote to Production via the standard change request workflow only.
          </p>
        </div>
      </div>
    </div>
  )
}
