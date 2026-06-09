import { Link2, CheckCircle, AlertCircle, RefreshCw, Activity } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'
import BCSyncChip from '../../components/BCSyncChip'

const mappings = [
  { id: 'MAP-001', platformRef: 'REQ-2025-0043', platformType: 'Invoice', entity: 'DigitalQatalyst MENA', bcRef: 'BC-INV-48821', bcType: 'Purchase Invoice', status: 'Mapped', mappedDate: '18 May 2026 11:42', mappedBy: 'System Auto', lastSync: '18 May 2026 11:42' },
  { id: 'MAP-002', platformRef: 'VND-002', platformType: 'Vendor', entity: 'DigitalQatalyst MENA', bcRef: 'BC-VND-1205', bcType: 'Vendor Master', status: 'Mapped', mappedDate: '12 Mar 2026 08:15', mappedBy: 'System Auto', lastSync: '15 May 2026 03:00' },
  { id: 'MAP-003', platformRef: 'CC-003', platformType: 'Cost Centre', entity: 'DigitalQatalyst MENA', bcRef: 'BC-CC-1043', bcType: 'Dimension Value', status: 'Mapped', mappedDate: '01 Apr 2026 08:00', mappedBy: 'Tariq Al-Amin', lastSync: '18 May 2026 03:00' },
  { id: 'MAP-004', platformRef: 'PRJ-2401', platformType: 'Project', entity: 'DigitalQatalyst MENA', bcRef: 'BC-JOB-2401', bcType: 'Job', status: 'Mapped', mappedDate: '15 Jan 2026 10:30', mappedBy: 'System Auto', lastSync: '18 May 2026 03:00' },
  { id: 'MAP-005', platformRef: 'CUST-001', platformType: 'Customer', entity: 'DigitalQatalyst MENA', bcRef: 'BC-CUST-4012', bcType: 'Customer Master', status: 'Mapped', mappedDate: '08 Feb 2026 09:22', mappedBy: 'System Auto', lastSync: '17 May 2026 03:00' },
  { id: 'MAP-006', platformRef: 'VND-004', platformType: 'Vendor', entity: 'DigitalQatalyst MENA', bcRef: '', bcType: '', status: 'Unmapped', mappedDate: '', mappedBy: '', lastSync: '', reason: 'Sync failed - Missing VAT registration' },
  { id: 'MAP-007', platformRef: 'E-002', platformType: 'Employee', entity: 'DigitalQatalyst MENA', bcRef: 'BC-EMP-1002', bcType: 'Resource', status: 'Mapped', mappedDate: '15 Mar 2026 14:20', mappedBy: 'System Auto', lastSync: '18 May 2026 03:00' },
  { id: 'MAP-008', platformRef: 'REQ-2401-112', platformType: 'Invoice', entity: 'DigitalQatalyst MENA', bcRef: '', bcType: '', status: 'Unmapped', mappedDate: '', mappedBy: '', lastSync: '', reason: 'Disputed - Amount mismatch' },
  { id: 'MAP-009', platformRef: 'INV-008', platformType: 'Asset', entity: 'DigitalQatalyst MENA', bcRef: 'BC-FA-0385', bcType: 'Fixed Asset', status: 'Mapped', mappedDate: '22 Apr 2026 11:05', mappedBy: 'Rashid Ahmed', lastSync: '17 May 2026 03:00' },
  { id: 'MAP-010', platformRef: 'CUST-005', platformType: 'Customer', entity: 'DigitalQatalyst Iberia', bcRef: '', bcType: '', status: 'Unmapped', mappedDate: '', mappedBy: '', lastSync: '', reason: 'Pending onboarding completion' },
  { id: 'MAP-011', platformRef: 'VND-001', platformType: 'Vendor', entity: 'DigitalQatalyst MENA', bcRef: 'BC-VND-1087', bcType: 'Vendor Master', status: 'Mapped', mappedDate: '05 Jan 2026 09:45', mappedBy: 'System Auto', lastSync: '18 May 2026 03:00' },
  { id: 'MAP-012', platformRef: 'PRJ-2406', platformType: 'Project', entity: 'DigitalQatalyst MENA', bcRef: '', bcType: '', status: 'Unmapped', mappedDate: '', mappedBy: '', lastSync: '', reason: 'Sync failed - Dimension not configured' },
  { id: 'MAP-013', platformRef: 'CC-005', platformType: 'Cost Centre', entity: 'DigitalQatalyst MENA', bcRef: 'BC-CC-1047', bcType: 'Dimension Value', status: 'Mapped', mappedDate: '01 Apr 2026 08:05', mappedBy: 'Tariq Al-Amin', lastSync: '18 May 2026 03:00' },
  { id: 'MAP-014', platformRef: 'REQ-2025-0047', platformType: 'Invoice', entity: 'DigitalQatalyst MENA', bcRef: '', bcType: '', status: 'Unmapped', mappedDate: '', mappedBy: '', lastSync: '', reason: 'Awaiting approval' },
  { id: 'MAP-015', platformRef: 'VND-005', platformType: 'Vendor', entity: 'DigitalQatalyst MENA', bcRef: 'BC-VND-1298', bcType: 'Vendor Master', status: 'Mapped', mappedDate: '18 Mar 2026 16:33', mappedBy: 'System Auto', lastSync: '17 May 2026 03:00' },
]

export default function ERPReferenceMapping() {
  const { showToast } = useToast()
  const mapped = mappings.filter(m => m.status === 'Mapped').length
  const unmapped = mappings.filter(m => m.status === 'Unmapped').length
  const autoMapped = mappings.filter(m => m.mappedBy === 'System Auto').length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">ERP Reference Mapping</h1>
        <p className="text-sm text-gray-600 mt-1">Mapping between platform records and BC ERP references</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Mappings</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">{mappings.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Mapped</div>
          <div className="text-2xl font-semibold text-green-600 mt-1">{mapped}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Unmapped</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">{unmapped}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Auto-Mapped</div>
          <div className="text-2xl font-semibold text-blue-600 mt-1">{autoMapped}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mapping ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform Ref</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BC Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BC Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mapped By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mappings.map((mapping) => (
                <tr key={mapping.id} className={`hover:bg-gray-50 ${mapping.status === 'Unmapped' ? 'bg-orange-50/30' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-xs text-gray-600">{mapping.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <RequestIDTag id={mapping.platformRef} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mapping.platformType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {mapping.bcRef ? (
                      <div className="flex items-center gap-1">
                        <Link2 className="h-4 w-4 text-green-600" />
                        <span className="font-mono text-xs text-green-700">{mapping.bcRef}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {mapping.bcType || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mapping.entity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {mapping.status === 'Mapped' ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <StatusBadge status="Complete" />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                          <StatusBadge status="Pending" />
                        </div>
                        {mapping.reason && (
                          <span className="text-xs text-orange-600">{mapping.reason}</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {mapping.mappedBy || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {mapping.lastSync || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {mapping.status === 'Unmapped' ? (
                      <button
                        onClick={() => showToast(`Attempting to map ${mapping.platformRef}...`, 'info')}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Retry
                      </button>
                    ) : (
                      <button
                        onClick={() => showToast(`Viewing details for ${mapping.platformRef}...`, 'info')}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </button>
                    )}
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
