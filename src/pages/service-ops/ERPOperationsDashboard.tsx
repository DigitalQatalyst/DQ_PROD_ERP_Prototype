import { Activity, TrendingUp, TrendingDown, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'
import { kpis } from '../../data/fixtures'

const syncMetrics = [
  { period: 'Last 24h', synced: 127, failed: 3, pending: 8, successRate: 97.7 },
  { period: 'Last 7d', synced: 856, failed: 21, pending: 15, successRate: 97.2 },
  { period: 'Last 30d', synced: 3542, failed: 89, pending: 24, successRate: 97.5 },
]

const entityHealth = [
  { entity: 'DigitalQatalyst MENA', status: 'Healthy', syncsToday: 42, failedToday: 1, lastSync: '2 mins ago', connectorVersion: 'v2.4.1' },
  { entity: 'DigitalQatalyst East Africa', status: 'Healthy', syncsToday: 18, failedToday: 0, lastSync: '5 mins ago', connectorVersion: 'v2.4.1' },
  { entity: 'DigitalQatalyst Iberia', status: 'Warning', syncsToday: 12, failedToday: 2, lastSync: '15 mins ago', connectorVersion: 'v2.4.0' },
]

const objectTypeMetrics = [
  { type: 'Invoices', total: 248, synced: 241, failed: 4, pending: 3, successRate: 98.4 },
  { type: 'Purchase Orders', total: 186, synced: 179, failed: 3, pending: 4, successRate: 98.3 },
  { type: 'Vendors', total: 52, synced: 48, failed: 2, pending: 2, successRate: 96.0 },
  { type: 'Customers', total: 38, synced: 36, failed: 1, pending: 1, successRate: 97.3 },
  { type: 'Projects', total: 24, synced: 22, failed: 1, pending: 1, successRate: 95.7 },
  { type: 'Employees', total: 45, synced: 43, failed: 1, pending: 1, successRate: 97.7 },
  { type: 'Assets', total: 67, synced: 64, failed: 2, pending: 1, successRate: 97.0 },
  { type: 'Cost Centres', total: 12, synced: 12, failed: 0, pending: 0, successRate: 100.0 },
]

const recentErrors = [
  { time: '14 mins ago', objectRef: 'VND-004', error: 'Missing VAT registration field', retries: 3 },
  { time: '1 hour ago', objectRef: 'REQ-2401-128', error: 'PO reference not found in BC', retries: 1 },
  { time: '2 hours ago', objectRef: 'CUST-005', error: 'Missing VAT registration cert', retries: 2 },
]

export default function ERPOperationsDashboard() {
  const overallSuccessRate = 97.2
  const isHealthy = overallSuccessRate >= 95

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">ERP Operations Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Business Central integration health and operational KPIs</p>
      </div>

      {/* Overall Health Status */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isHealthy ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              )}
              <h2 className="text-lg font-semibold text-gray-900">
                BC Integration Status: {isHealthy ? 'Healthy' : 'Degraded'}
              </h2>
            </div>
            <p className="text-sm text-gray-700">Last health check: 2 minutes ago</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-900">{overallSuccessRate}%</div>
            <div className="text-sm text-gray-700">7-day success rate</div>
          </div>
        </div>
      </div>

      {/* Sync Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-blue-600" />
            <div className="text-sm text-gray-600">Synced (7d)</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900">{syncMetrics[1].synced}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="h-4 w-4 text-red-600" />
            <div className="text-sm text-gray-600">Failed (7d)</div>
          </div>
          <div className="text-2xl font-semibold text-red-600">{syncMetrics[1].failed}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-orange-600" />
            <div className="text-sm text-gray-600">Pending (7d)</div>
          </div>
          <div className="text-2xl font-semibold text-orange-600">{syncMetrics[1].pending}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="text-2xl font-semibold text-green-600">{syncMetrics[1].successRate}%</div>
        </div>
      </div>

      {/* Entity Health */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Entity Connection Health</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {entityHealth.map((entity) => (
            <div key={entity.entity} className="px-6 py-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900">{entity.entity}</h4>
                  {entity.status === 'Healthy' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3" />
                      Healthy
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      <AlertTriangle className="h-3 w-3" />
                      Warning
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Connector {entity.connectorVersion} • Last sync: {entity.lastSync}
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <div className="text-gray-600">Synced Today</div>
                  <div className="text-lg font-semibold text-gray-900">{entity.syncsToday}</div>
                </div>
                <div>
                  <div className="text-gray-600">Failed Today</div>
                  <div className="text-lg font-semibold text-red-600">{entity.failedToday}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Object Type Metrics */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Sync Performance by Object Type (30d)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Object Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Synced</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Failed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {objectTypeMetrics.map((metric) => (
                <tr key={metric.type} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{metric.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{metric.synced}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{metric.failed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">{metric.pending}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className={`h-2 rounded-full ${
                            metric.successRate >= 98
                              ? 'bg-green-600'
                              : metric.successRate >= 95
                              ? 'bg-blue-600'
                              : 'bg-orange-600'
                          }`}
                          style={{ width: `${metric.successRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{metric.successRate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Errors */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Sync Errors</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentErrors.map((error, idx) => (
            <div key={idx} className="px-6 py-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <div className="font-mono text-sm text-gray-900">{error.objectRef}</div>
                  <div className="text-sm text-gray-600 mt-1">{error.error}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{error.time}</div>
                <div className="text-xs text-orange-600 mt-1">{error.retries} retries</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
