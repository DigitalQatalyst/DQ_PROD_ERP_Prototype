import { XCircle, Clock, AlertTriangle, FileText } from 'lucide-react'
import { useToast } from '../../components/Toast'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'

const blockedRequests = [
  { id: 'REQ-2401-089', type: 'Purchase Request', blockReason: 'Missing Evidence', details: 'Invoice copy not attached', blockedBy: 'Sara Abdullah', daysBlocked: 5, priority: 'High', requiredAction: 'Upload invoice' },
  { id: 'REQ-2401-078', type: 'Finance Request', blockReason: 'Clarification Needed', details: 'Budget allocation code unclear', blockedBy: 'System Validation', daysBlocked: 3, priority: 'Medium', requiredAction: 'Provide budget code' },
  { id: 'REQ-2401-091', type: 'Vendor Setup', blockReason: 'External Dependency', details: 'Awaiting banking details from vendor', blockedBy: 'Omar Rashid', daysBlocked: 7, priority: 'High', requiredAction: 'Vendor to provide info' },
  { id: 'REQ-2401-067', type: 'Invoice', blockReason: 'Missing Evidence', details: 'Goods receipt document not found', blockedBy: 'Layla Hassan', daysBlocked: 4, priority: 'Critical', requiredAction: 'Upload GR document' },
  { id: 'REQ-2401-102', type: 'HR Request', blockReason: 'Clarification Needed', details: 'Start date conflicts with notice period', blockedBy: 'Fatima Bin Hammad', daysBlocked: 2, priority: 'High', requiredAction: 'Confirm dates' },
  { id: 'REQ-2401-055', type: 'Asset Transfer', blockReason: 'External Dependency', details: 'Target location approval pending', blockedBy: 'Khalid Rahman', daysBlocked: 6, priority: 'Medium', requiredAction: 'Location head approval' },
  { id: 'REQ-2401-073', type: 'Purchase Request', blockReason: 'Missing Evidence', details: 'Technical specification document required', blockedBy: 'Ahmed Al-Sayed', daysBlocked: 3, priority: 'High', requiredAction: 'Upload tech specs' },
  { id: 'REQ-2401-082', type: 'Finance Request', blockReason: 'Clarification Needed', details: 'Payment terms not matching contract', blockedBy: 'Noor Al-Mansoori', daysBlocked: 4, priority: 'Medium', requiredAction: 'Clarify payment terms' }
]

export default function BlockedRequests() {
  const { showToast } = useToast()
  const evidence = blockedRequests.filter(r => r.blockReason === 'Missing Evidence').length
  const clarification = blockedRequests.filter(r => r.blockReason === 'Clarification Needed').length
  const external = blockedRequests.filter(r => r.blockReason === 'External Dependency').length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Blocked Requests</h1>
        <p className="text-sm text-gray-600 mt-1">Requests blocked on evidence, clarification, or external dependencies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Blocked</div>
          <div className="text-2xl font-semibold text-red-600 mt-1">{blockedRequests.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Missing Evidence</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">{evidence}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Need Clarification</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">{clarification}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">External Dependency</div>
          <div className="text-2xl font-semibold text-gray-600 mt-1">{external}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blocked By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Blocked</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blockedRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RequestIDTag id={request.id} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {request.blockReason === 'Missing Evidence' && (
                        <><FileText className="h-4 w-4 text-orange-600" /><span className="text-sm text-orange-600">Missing Evidence</span></>
                      )}
                      {request.blockReason === 'Clarification Needed' && (
                        <><AlertTriangle className="h-4 w-4 text-orange-600" /><span className="text-sm text-orange-600">Clarification</span></>
                      )}
                      {request.blockReason === 'External Dependency' && (
                        <><Clock className="h-4 w-4 text-gray-600" /><span className="text-sm text-gray-600">External</span></>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">{request.details}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.blockedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600 font-medium">{request.daysBlocked}d</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={request.priority === 'Critical' ? 'Blocked' : request.priority === 'High' ? 'At Risk' : 'In Progress'} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">{request.requiredAction}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast('Notifying requestor...')}
                        className="text-sm text-orange-600 hover:text-orange-800 font-medium"
                      >
                        Notify
                      </button>
                      <button
                        onClick={() => showToast('Opening request details...')}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </button>
                    </div>
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
