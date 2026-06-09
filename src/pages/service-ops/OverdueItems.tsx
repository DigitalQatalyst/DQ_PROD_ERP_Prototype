import { Clock, AlertTriangle, TrendingUp } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'

const overdueItems = [
  { id: 'REQ-2401-089', type: 'Purchase Request', assignee: 'Sara Abdullah', slaTarget: '5d', actualDays: 8, daysOverdue: 3, priority: 'High', blockedReason: null },
  { id: 'REQ-2401-078', type: 'Finance Request', assignee: 'Omar Rashid', slaTarget: '4d', actualDays: 9, daysOverdue: 5, priority: 'High', blockedReason: null },
  { id: 'REQ-2401-091', type: 'Invoice', assignee: 'Layla Hassan', slaTarget: '3d', actualDays: 8, daysOverdue: 5, priority: 'Critical', blockedReason: null },
  { id: 'REQ-2401-067', type: 'Vendor Setup', assignee: 'Khalid Rahman', slaTarget: '10d', actualDays: 14, daysOverdue: 4, priority: 'Medium', blockedReason: 'Awaiting compliance approval' },
  { id: 'REQ-2401-102', type: 'HR Request', assignee: 'Fatima Bin Hammad', slaTarget: '6d', actualDays: 8, daysOverdue: 2, priority: 'High', blockedReason: null },
  { id: 'REQ-2401-055', type: 'Asset Transfer', assignee: 'Noor Al-Mansoori', slaTarget: '5d', actualDays: 9, daysOverdue: 4, priority: 'Medium', blockedReason: 'Location not confirmed' },
  { id: 'REQ-2401-073', type: 'Purchase Request', assignee: 'Ahmed Al-Sayed', slaTarget: '5d', actualDays: 11, daysOverdue: 6, priority: 'Critical', blockedReason: null },
  { id: 'REQ-2401-082', type: 'Finance Request', assignee: 'Sara Abdullah', slaTarget: '4d', actualDays: 7, daysOverdue: 3, priority: 'High', blockedReason: 'Missing budget approval' }
]

export default function OverdueItems() {
  const { showToast } = useToast()
  const critical = overdueItems.filter(i => i.priority === 'Critical').length
  const blocked = overdueItems.filter(i => i.blockedReason).length
  const avgOverdue = (overdueItems.reduce((sum, i) => sum + i.daysOverdue, 0) / overdueItems.length).toFixed(1)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Overdue Items</h1>
        <p className="text-sm text-gray-600 mt-1">Queue of items past SLA or expected completion dates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Overdue</div>
          <div className="text-2xl font-semibold text-red-600 mt-1">{overdueItems.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Critical Priority</div>
          <div className="text-2xl font-semibold text-red-700 mt-1">{critical}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Blocked</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">{blocked}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Avg Days Overdue</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">{avgOverdue}d</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SLA Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blocked Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {overdueItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RequestIDTag id={item.id} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.assignee}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={item.priority === 'Critical' ? 'Blocked' : item.priority === 'High' ? 'At Risk' : 'In Progress'} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {item.slaTarget}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.actualDays}d</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600 font-bold">{item.daysOverdue}d</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {item.blockedReason ? (
                      <div className="flex items-center gap-1 text-orange-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{item.blockedReason}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast('Escalating item...')}
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                      >
                        Escalate
                      </button>
                      <button
                        onClick={() => showToast('Opening item details...')}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Review
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
