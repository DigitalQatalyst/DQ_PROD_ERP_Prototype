import { AlertTriangle, FileText, DollarSign, Shield, Clock } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import StatusBadge from '../../components/StatusBadge'
import RequestIDTag from '../../components/RequestIDTag'

const exceptions = [
  { id: 'REQ-2401-089', type: 'Purchase Request', policy: 'Single Source Procurement', requestor: 'Ahmed Al-Sayed', amount: 85000, justification: 'Only certified vendor for specialized equipment', status: 'Pending Review', daysOpen: 2, risk: 'Medium' },
  { id: 'REQ-2401-078', type: 'Finance Request', policy: 'Advance Payment Terms', requestor: 'Layla Hassan', amount: 120000, justification: 'Critical project milestone requires upfront deposit', status: 'Pending Review', daysOpen: 4, risk: 'High' },
  { id: 'REQ-2401-091', type: 'Vendor Setup', policy: 'Standard Payment Terms', requestor: 'Omar Rashid', amount: 0, justification: 'Strategic partner requires NET-15 instead of NET-45', status: 'Approved', daysOpen: 1, risk: 'Low' },
  { id: 'REQ-2401-102', type: 'Purchase Request', policy: 'Competitive Bidding Threshold', requestor: 'Sara Abdullah', amount: 95000, justification: 'Urgent requirement, no time for full RFQ process', status: 'Pending Review', daysOpen: 1, risk: 'High' },
  { id: 'REQ-2401-065', type: 'Invoice', policy: 'Late Invoice Acceptance', requestor: 'Fatima Bin Hammad', amount: 45000, justification: 'Vendor invoice delayed due to system migration', status: 'Approved', daysOpen: 5, risk: 'Low' },
  { id: 'REQ-2401-088', type: 'Finance Request', policy: 'Budget Transfer Limit', requestor: 'Khalid Rahman', amount: 75000, justification: 'Year-end reallocation to complete critical deliverable', status: 'Pending Review', daysOpen: 3, risk: 'Medium' },
  { id: 'REQ-2401-073', type: 'Purchase Request', policy: 'Preferred Vendor List', requestor: 'Noor Al-Mansoori', amount: 28000, justification: 'New technology not covered by existing vendor contracts', status: 'Rejected', daysOpen: 6, risk: 'Low' }
]

export default function PolicyExceptionReview() {
  const { showToast } = useToast()
  const pending = exceptions.filter(e => e.status === 'Pending Review').length
  const high = exceptions.filter(e => e.risk === 'High').length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Policy Exception Review</h1>
        <p className="text-sm text-gray-600 mt-1">Review requests flagged for policy exceptions or overrides</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Exceptions</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">{exceptions.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Pending Review</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">{pending}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">High Risk</div>
          <div className="text-2xl font-semibold text-red-600 mt-1">{high}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Avg Review Time</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">3.2d</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requestor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Justification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Open</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exceptions.map((exception) => (
                <tr key={exception.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RequestIDTag id={exception.id} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exception.type}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs">{exception.policy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exception.requestor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {exception.amount > 0 ? (
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <DollarSign className="h-4 w-4" />
                        {exception.amount.toLocaleString()}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">{exception.justification}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {exception.risk === 'High' ? (
                        <><Shield className="h-4 w-4 text-red-600" /><span className="text-sm text-red-600">High</span></>
                      ) : exception.risk === 'Medium' ? (
                        <><Shield className="h-4 w-4 text-orange-600" /><span className="text-sm text-orange-600">Medium</span></>
                      ) : (
                        <><Shield className="h-4 w-4 text-green-600" /><span className="text-sm text-green-600">Low</span></>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={exception.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {exception.daysOpen}d
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {exception.status === 'Pending Review' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => showToast('Approving exception...')}
                          className="text-sm text-green-600 hover:text-green-800 font-medium"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => showToast('Rejecting exception...')}
                          className="text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                          Reject
                        </button>
                      </div>
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
