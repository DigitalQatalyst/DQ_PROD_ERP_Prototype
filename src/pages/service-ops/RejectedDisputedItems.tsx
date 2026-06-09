import { AlertTriangle, XCircle, MessageSquare, Calendar, User } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'

const rejectedDisputed = [
  { id: 'REQ-2025-0053', type: 'Budget Requisition', status: 'Rejected', rejectedBy: 'Mohammed Rashid', rejectedDate: '08 May 2026', reason: 'Insufficient business case — resubmit with measurable outcomes', requester: 'Jay Nair', amount: 12000, currency: 'AED', daysOpen: 12 },
  { id: 'REQ-2401-124', type: 'Expense', status: 'Disputed', requester: 'Sara Pereira', disputedBy: 'Finance Ops', disputedDate: '17 May 2026', reason: 'Missing supporting receipts for two line items', amount: 4650, currency: 'AED', daysOpen: 3 },
  { id: 'REQ-2401-098', type: 'Purchase Request', status: 'Rejected', rejectedBy: 'Sara Pereira', rejectedDate: '15 May 2026', reason: 'Vendor not on approved list — require pre-approval', requester: 'Jay Nair', amount: 15800, currency: 'AED', daysOpen: 5 },
  { id: 'REQ-2401-112', type: 'Invoice', status: 'Disputed', requester: 'Procurement Ops', disputedBy: 'Mohammed Rashid', disputedDate: '16 May 2026', reason: 'Invoice amount does not match PO reference', amount: 28900, currency: 'AED', daysOpen: 4 },
  { id: 'LV-006', type: 'Leave Request', status: 'Rejected', rejectedBy: 'Fatima Bin Hammad', rejectedDate: '14 May 2026', reason: 'During onboarding period — policy breach', requester: 'Daniel Kimani', daysOpen: 6 },
  { id: 'REQ-2401-085', type: 'Vendor Onboarding', status: 'Rejected', rejectedBy: 'Yasmin Al-Mansoori', rejectedDate: '12 May 2026', reason: 'Failed compliance check — tax registration invalid', requester: 'Procurement Ops', daysOpen: 8 },
  { id: 'REQ-2401-103', type: 'Purchase Request', status: 'Disputed', requester: 'Layla Seitkali', disputedBy: 'Sara Pereira', disputedDate: '18 May 2026', reason: 'Budget allocation unclear — needs project linkage', amount: 22400, currency: 'AED', daysOpen: 2 },
  { id: 'REQ-2401-076', type: 'Expense', status: 'Rejected', rejectedBy: 'Mohammed Rashid', rejectedDate: '10 May 2026', reason: 'Outside approval threshold — requires CFO sign-off', requester: 'Aisha Khalid', amount: 8200, currency: 'AED', daysOpen: 10 },
  { id: 'REQ-2401-119', type: 'Budget Amendment', status: 'Disputed', requester: 'Mohammed Rashid', disputedBy: 'Aisha Khalid', disputedDate: '17 May 2026', reason: 'Justification insufficient for overage request', amount: 35000, currency: 'AED', daysOpen: 3 },
  { id: 'REQ-2401-067', type: 'Customer Onboarding', status: 'Rejected', rejectedBy: 'Mohammed Rashid', rejectedDate: '11 May 2026', reason: 'Missing master service agreement and VAT cert', requester: 'Sara Pereira', daysOpen: 9 },
  { id: 'HR-008', type: 'HR Request', status: 'Disputed', requester: 'Tariq Al-Amin', disputedBy: 'Fatima Bin Hammad', disputedDate: '16 May 2026', reason: 'Change request does not align with employment contract terms', daysOpen: 4 },
  { id: 'REQ-2401-091', type: 'Asset Transfer', status: 'Rejected', rejectedBy: 'Rashid Ahmed', rejectedDate: '13 May 2026', reason: 'Asset not available — currently assigned', requester: 'Jay Nair', daysOpen: 7 },
]

export default function RejectedDisputedItems() {
  const { showToast } = useToast()
  const rejected = rejectedDisputed.filter(i => i.status === 'Rejected').length
  const disputed = rejectedDisputed.filter(i => i.status === 'Disputed').length
  const urgent = rejectedDisputed.filter(i => i.daysOpen >= 7).length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Rejected / Disputed Items</h1>
        <p className="text-sm text-gray-600 mt-1">Items rejected or disputed requiring resubmission or resolution</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Items</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">{rejectedDisputed.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Rejected</div>
          <div className="text-2xl font-semibold text-red-600 mt-1">{rejected}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Disputed</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">{disputed}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Urgent (7+ days)</div>
          <div className="text-2xl font-semibold text-red-700 mt-1">{urgent}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejected/Disputed By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Open</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rejectedDisputed.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RequestIDTag id={item.id} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.requester}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <User className="h-4 w-4" />
                      {item.status === 'Rejected' ? item.rejectedBy : item.disputedBy}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.status === 'Rejected' ? item.rejectedDate : item.disputedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {item.daysOpen >= 7 && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      <span className={`text-sm font-medium ${item.daysOpen >= 7 ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.daysOpen}d
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.amount ? `${item.currency} ${item.amount.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <div className="flex items-start gap-1">
                      {item.status === 'Rejected' ? (
                        <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                      )}
                      <span className="line-clamp-2">{item.reason}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => showToast(`Opening details for ${item.id}...`, 'info')}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {item.status === 'Rejected' ? 'Resubmit' : 'Resolve'}
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
