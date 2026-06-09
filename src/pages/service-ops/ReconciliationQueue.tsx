import { Scale, AlertTriangle, DollarSign, Activity, CheckCircle } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'

const reconciliationItems = [
  { id: 'REC-001', platformRef: 'REQ-2025-0043', bcRef: 'BC-INV-48821', type: 'Invoice', entity: 'DigitalQatalyst MENA', platformAmount: 12400, bcAmount: 12400, currency: 'AED', variance: 0, status: 'Matched', reconciledDate: '18 May 2026 12:05', reconciledBy: 'System Auto' },
  { id: 'REC-002', platformRef: 'REQ-2401-112', bcRef: 'BC-INV-48756', type: 'Invoice', entity: 'DigitalQatalyst MENA', platformAmount: 28900, bcAmount: 27600, currency: 'AED', variance: 1300, status: 'Variance', reconciledDate: '', reconciledBy: '', reason: 'Amount mismatch - manual review required' },
  { id: 'REC-003', platformRef: 'VND-002', bcRef: 'BC-VND-1205', type: 'Vendor', entity: 'DigitalQatalyst MENA', platformAmount: 214000, bcAmount: 214000, currency: 'AED', variance: 0, status: 'Matched', reconciledDate: '15 May 2026 03:15', reconciledBy: 'System Auto' },
  { id: 'REC-004', platformRef: 'REQ-2401-087', bcRef: 'BC-PO-12045', type: 'Purchase Order', entity: 'DigitalQatalyst MENA', platformAmount: 45800, bcAmount: 45800, currency: 'AED', variance: 0, status: 'Matched', reconciledDate: '17 May 2026 14:22', reconciledBy: 'System Auto' },
  { id: 'REC-005', platformRef: 'CUST-001', bcRef: 'BC-CUST-4012', type: 'Customer AR', entity: 'DigitalQatalyst MENA', platformAmount: 240000, bcAmount: 235000, currency: 'AED', variance: 5000, status: 'Variance', reconciledDate: '', reconciledBy: '', reason: 'Receivable balance discrepancy - pending payment posting' },
  { id: 'REC-006', platformRef: 'PRJ-2401', bcRef: 'BC-JOB-2401', type: 'Project WIP', entity: 'DigitalQatalyst MENA', platformAmount: 182000, bcAmount: 182000, currency: 'AED', variance: 0, status: 'Matched', reconciledDate: '18 May 2026 03:45', reconciledBy: 'System Auto' },
  { id: 'REC-007', platformRef: 'REQ-2401-095', bcRef: 'BC-INV-48834', type: 'Invoice', entity: 'DigitalQatalyst Iberia', platformAmount: 18400, bcAmount: 19200, currency: 'EUR', variance: 800, status: 'Variance', reconciledDate: '', reconciledBy: '', reason: 'Currency conversion timing difference' },
  { id: 'REC-008', platformRef: 'CC-003', bcRef: 'BC-CC-1043', type: 'Cost Centre Budget', entity: 'DigitalQatalyst MENA', platformAmount: 280000, bcAmount: 280000, currency: 'AED', variance: 0, status: 'Matched', reconciledDate: '18 May 2026 03:10', reconciledBy: 'System Auto' },
  { id: 'REC-009', platformRef: 'VND-005', bcRef: 'BC-VND-1298', type: 'Vendor AP', entity: 'DigitalQatalyst MENA', platformAmount: 90000, bcAmount: 0, currency: 'AED', variance: 90000, status: 'Variance', reconciledDate: '', reconciledBy: '', reason: 'Invoice not yet posted in BC - timing issue' },
  { id: 'REC-010', platformRef: 'E-002', bcRef: 'BC-EMP-1002', type: 'Employee Expense', entity: 'DigitalQatalyst MENA', platformAmount: 3200, bcAmount: 3200, currency: 'AED', variance: 0, status: 'Matched', reconciledDate: '17 May 2026 11:20', reconciledBy: 'System Auto' },
  { id: 'REC-011', platformRef: 'REQ-2401-103', bcRef: 'BC-PO-12089', type: 'Purchase Order', entity: 'DigitalQatalyst MENA', platformAmount: 22400, bcAmount: 21900, currency: 'AED', variance: 500, status: 'Variance', reconciledDate: '', reconciledBy: '', reason: 'Tax calculation difference - review required' },
  { id: 'REC-012', platformRef: 'INV-008', bcRef: 'BC-FA-0385', type: 'Fixed Asset', entity: 'DigitalQatalyst MENA', platformAmount: 2800, bcAmount: 2800, currency: 'AED', variance: 0, status: 'Matched', reconciledDate: '17 May 2026 03:30', reconciledBy: 'System Auto' },
]

export default function ReconciliationQueue() {
  const { showToast } = useToast()
  const matched = reconciliationItems.filter(r => r.status === 'Matched').length
  const variances = reconciliationItems.filter(r => r.status === 'Variance').length
  const totalVariance = reconciliationItems
    .filter(r => r.status === 'Variance')
    .reduce((sum, r) => sum + Math.abs(r.variance), 0)
  const highVariance = reconciliationItems.filter(r => Math.abs(r.variance) >= 5000).length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Reconciliation Queue</h1>
        <p className="text-sm text-gray-600 mt-1">BC reconciliation items requiring manual review</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Items</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">{reconciliationItems.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Matched</div>
          <div className="text-2xl font-semibold text-green-600 mt-1">{matched}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Variances</div>
          <div className="text-2xl font-semibold text-red-600 mt-1">{variances}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Variance</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">AED {totalVariance.toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recon ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform Ref</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BC Ref</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BC Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reconciliationItems.map((item) => (
                <tr key={item.id} className={`hover:bg-gray-50 ${item.status === 'Variance' ? 'bg-red-50/30' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-xs text-gray-600">{item.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <RequestIDTag id={item.platformRef} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-xs text-green-700">{item.bcRef}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.entity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{item.currency} {item.platformAmount.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{item.currency} {item.bcAmount.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.variance === 0 ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600 font-medium">0</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          {Math.abs(item.variance) >= 5000 ? (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          ) : (
                            <Scale className="h-4 w-4 text-orange-600" />
                          )}
                          <span className={`text-sm font-medium ${Math.abs(item.variance) >= 5000 ? 'text-red-600' : 'text-orange-600'}`}>
                            {item.currency} {Math.abs(item.variance).toLocaleString()}
                          </span>
                        </div>
                        {item.reason && (
                          <span className="text-xs text-gray-600 line-clamp-1">{item.reason}</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={item.status === 'Matched' ? 'Complete' : 'At Risk'} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.status === 'Variance' ? (
                      <button
                        onClick={() => showToast(`Opening reconciliation details for ${item.platformRef}...`, 'info')}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Investigate
                      </button>
                    ) : (
                      <button
                        onClick={() => showToast(`Viewing details for ${item.platformRef}...`, 'info')}
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
