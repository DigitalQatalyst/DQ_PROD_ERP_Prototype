import { AlertTriangle, RefreshCw, XCircle, Activity } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'

const failedSyncs = [
  { id: 'SYNC-003', objectRef: 'VND-004', objectType: 'Vendor', entity: 'DigitalQatalyst MENA', status: 'Failed', lastAttempt: '17 May 2026 09:15', retryCount: 3, errorMessage: 'Missing VAT registration field', errorCode: 'BC-ERR-1042', daysOpen: 3 },
  { id: 'SYNC-007', objectRef: 'REQ-2025-0044', objectType: 'Vendor Onboarding', entity: 'DigitalQatalyst MENA', status: 'Failed', lastAttempt: '16 May 2026 14:22', retryCount: 2, errorMessage: 'Tax registration cert validation failed', errorCode: 'BC-ERR-1043', daysOpen: 4 },
  { id: 'SYNC-009', objectRef: 'CUST-005', objectType: 'Customer', entity: 'DigitalQatalyst Iberia', status: 'Failed', lastAttempt: '16 May 2026 11:05', retryCount: 2, errorMessage: 'Missing VAT registration cert', errorCode: 'BC-ERR-1042', daysOpen: 4 },
  { id: 'SYNC-012', objectRef: 'REQ-2401-128', objectType: 'Invoice', entity: 'DigitalQatalyst MENA', status: 'Failed', lastAttempt: '18 May 2026 08:30', retryCount: 1, errorMessage: 'PO reference not found in BC', errorCode: 'BC-ERR-2105', daysOpen: 2 },
  { id: 'SYNC-015', objectRef: 'CC-006', objectType: 'Cost Centre', entity: 'DigitalQatalyst East Africa', status: 'Failed', lastAttempt: '15 May 2026 16:45', retryCount: 4, errorMessage: 'Dimension mapping conflict', errorCode: 'BC-ERR-3021', daysOpen: 5 },
  { id: 'SYNC-018', objectRef: 'PRJ-2406', objectType: 'Project', entity: 'DigitalQatalyst MENA', status: 'Failed', lastAttempt: '17 May 2026 13:18', retryCount: 2, errorMessage: 'Project dimension not configured in BC', errorCode: 'BC-ERR-3022', daysOpen: 3 },
  { id: 'SYNC-021', objectRef: 'REQ-2401-134', objectType: 'Purchase Order', entity: 'DigitalQatalyst MENA', status: 'Failed', lastAttempt: '18 May 2026 10:52', retryCount: 1, errorMessage: 'Vendor not synced to BC', errorCode: 'BC-ERR-2001', daysOpen: 2 },
  { id: 'SYNC-024', objectRef: 'E-013', objectType: 'Employee', entity: 'DigitalQatalyst East Africa', status: 'Failed', lastAttempt: '14 May 2026 09:33', retryCount: 5, errorMessage: 'IBAN validation failed', errorCode: 'BC-ERR-4012', daysOpen: 6 },
  { id: 'SYNC-027', objectRef: 'INV-013', objectType: 'Asset', entity: 'DigitalQatalyst MENA', status: 'Failed', lastAttempt: '17 May 2026 15:41', retryCount: 2, errorMessage: 'Asset category not mapped', errorCode: 'BC-ERR-5001', daysOpen: 3 },
]

export default function FailedSyncs() {
  const { showToast } = useToast()
  const highRetry = failedSyncs.filter(s => s.retryCount >= 3).length
  const urgent = failedSyncs.filter(s => s.daysOpen >= 5).length
  const dataErrors = failedSyncs.filter(s => s.errorCode.includes('ERR-1') || s.errorCode.includes('ERR-4')).length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Failed Syncs</h1>
        <p className="text-sm text-gray-600 mt-1">Queue of failed BC sync attempts requiring intervention</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Failed</div>
          <div className="text-2xl font-semibold text-red-600 mt-1">{failedSyncs.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">High Retry (3+)</div>
          <div className="text-2xl font-semibold text-red-700 mt-1">{highRetry}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Urgent (5+ days)</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">{urgent}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Data Quality Issues</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">{dataErrors}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sync ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Object Ref</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Attempt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retry Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Open</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {failedSyncs.map((sync) => (
                <tr key={sync.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-xs text-gray-600">{sync.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4 text-orange-600" />
                      <RequestIDTag id={sync.objectRef} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sync.objectType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{sync.entity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{sync.lastAttempt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {sync.retryCount >= 3 && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      <span className={`text-sm font-medium ${sync.retryCount >= 3 ? 'text-red-600' : 'text-gray-900'}`}>
                        {sync.retryCount}x
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${sync.daysOpen >= 5 ? 'text-orange-600' : 'text-gray-900'}`}>
                      {sync.daysOpen}d
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <div className="flex items-start gap-1">
                      <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="line-clamp-2">{sync.errorMessage}</div>
                        <div className="text-xs text-gray-400 font-mono mt-0.5">{sync.errorCode}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => showToast(`Retrying sync for ${sync.objectRef}...`, 'info')}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Retry
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
