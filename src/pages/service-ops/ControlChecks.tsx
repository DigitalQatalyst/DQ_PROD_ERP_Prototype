import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'

const checks = [
  { id: 'REQ-2401-089', type: 'Purchase Request', check: 'Budget Availability', status: 'Failed', severity: 'High', message: 'Budget code DPT-2024-OPS exceeds allocated limit by 15%', daysOpen: 2 },
  { id: 'REQ-2401-101', type: 'Invoice', check: 'Duplicate Detection', status: 'Failed', severity: 'Critical', message: 'Invoice INV-45823 matches existing entry from same vendor', daysOpen: 1 },
  { id: 'REQ-2401-067', type: 'Finance Request', check: 'Approval Authority', status: 'Warning', severity: 'Medium', message: 'Approver lacks authority for amount $125,000 (limit: $100,000)', daysOpen: 3 },
  { id: 'REQ-2401-098', type: 'Vendor Setup', check: 'Sanctions Screening', status: 'Failed', severity: 'Critical', message: 'Vendor appears on restricted parties list', daysOpen: 1 },
  { id: 'REQ-2401-073', type: 'HR Request', check: 'Segregation of Duties', status: 'Warning', severity: 'Medium', message: 'Employee would have conflicting roles: Requestor + Approver', daysOpen: 4 },
  { id: 'REQ-2401-055', type: 'Purchase Request', check: 'Preferred Vendor', status: 'Warning', severity: 'Low', message: 'Selected vendor not on preferred list for this category', daysOpen: 5 },
  { id: 'REQ-2401-091', type: 'Invoice', check: 'Three-Way Match', status: 'Failed', severity: 'High', message: 'Invoice quantity (100) exceeds PO quantity (85)', daysOpen: 2 },
  { id: 'REQ-2401-082', type: 'Asset Transfer', check: 'Location Validation', status: 'Failed', severity: 'Medium', message: 'Target location not authorized for asset class', daysOpen: 3 }
]

export default function ControlChecks() {
  const { showToast } = useToast()
  const failed = checks.filter(c => c.status === 'Failed').length
  const warnings = checks.filter(c => c.status === 'Warning').length
  const critical = checks.filter(c => c.severity === 'Critical').length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Control Checks</h1>
        <p className="text-sm text-gray-600 mt-1">Automated control and validation check results</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Checks</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">{checks.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Failed</div>
          <div className="text-2xl font-semibold text-red-600 mt-1">{failed}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Warnings</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">{warnings}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Critical Severity</div>
          <div className="text-2xl font-semibold text-red-700 mt-1">{critical}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Open</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {checks.map((check) => (
                <tr key={check.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RequestIDTag id={check.id} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{check.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{check.check}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {check.status === 'Failed' ? (
                        <><XCircle className="h-4 w-4 text-red-600" /><span className="text-sm text-red-600">Failed</span></>
                      ) : check.status === 'Warning' ? (
                        <><AlertTriangle className="h-4 w-4 text-orange-600" /><span className="text-sm text-orange-600">Warning</span></>
                      ) : (
                        <><CheckCircle className="h-4 w-4 text-green-600" /><span className="text-sm text-green-600">Passed</span></>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      status={check.severity === 'Critical' ? 'Blocked' : check.severity === 'High' ? 'At Risk' : check.severity === 'Medium' ? 'In Progress' : 'Ready'} 
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">{check.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {check.daysOpen}d
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => showToast('Opening control check details...')}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Review
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
