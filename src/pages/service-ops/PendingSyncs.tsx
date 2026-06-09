import { Clock, Activity, CheckCircle, TrendingUp } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'

const pendingSyncs = [
  { id: 'SYNC-002', objectRef: 'REQ-2025-0047', objectType: 'Invoice', entity: 'DigitalQatalyst MENA', status: 'Pending', trigger: 'Awaiting approval before sync', requester: 'Finance Ops', amount: 90000, currency: 'AED', daysWaiting: 5, priority: 'High' },
  { id: 'SYNC-004', objectRef: 'REQ-2025-0042', objectType: 'Purchase Order', entity: 'DigitalQatalyst MENA', status: 'Pending', trigger: 'Pending approval; sync will trigger on approval', requester: 'Jay Nair', amount: 5800, currency: 'AED', daysWaiting: 5, priority: 'Normal' },
  { id: 'SYNC-008', objectRef: 'REQ-2025-0045', objectType: 'Purchase Order', entity: 'DigitalQatalyst MENA', status: 'Pending', trigger: 'Awaiting approval', requester: 'Sara Pereira', amount: 28600, currency: 'AED', daysWaiting: 4, priority: 'Normal' },
  { id: 'SYNC-011', objectRef: 'REQ-2025-0049', objectType: 'Budget Allocation', entity: 'DigitalQatalyst MENA', status: 'Pending', trigger: 'Awaiting approval', requester: 'Jay Nair', amount: 32000, currency: 'AED', daysWaiting: 3, priority: 'Normal' },
  { id: 'SYNC-014', objectRef: 'REQ-2401-118', objectType: 'Invoice', entity: 'DigitalQatalyst Iberia', status: 'Pending', trigger: 'Scheduled for next sync batch', requester: 'Finance Ops', amount: 18400, currency: 'EUR', daysWaiting: 1, priority: 'Normal' },
  { id: 'SYNC-016', objectRef: 'CUST-007', objectType: 'Customer', entity: 'DigitalQatalyst East Africa', status: 'Pending', trigger: 'Awaiting master data validation', requester: 'Sales Ops', daysWaiting: 2, priority: 'Normal' },
  { id: 'SYNC-019', objectRef: 'VND-009', objectType: 'Vendor', entity: 'DigitalQatalyst MENA', status: 'Pending', trigger: 'Awaiting vendor onboarding completion', requester: 'Procurement Ops', daysWaiting: 6, priority: 'High' },
  { id: 'SYNC-022', objectRef: 'E-014', objectType: 'Employee', entity: 'DigitalQatalyst MENA', status: 'Pending', trigger: 'Awaiting HR onboarding completion', requester: 'Fatima Bin Hammad', daysWaiting: 3, priority: 'Normal' },
  { id: 'SYNC-025', objectRef: 'PRJ-2407', objectType: 'Project', entity: 'DigitalQatalyst Iberia', status: 'Pending', trigger: 'Awaiting project setup approval', requester: 'Sara Pereira', amount: 125000, currency: 'EUR', daysWaiting: 4, priority: 'High' },
  { id: 'SYNC-028', objectRef: 'REQ-2401-142', objectType: 'Asset Transfer', entity: 'DigitalQatalyst East Africa', status: 'Pending', trigger: 'Awaiting custody confirmation', requester: 'Rashid Ahmed', daysWaiting: 2, priority: 'Normal' },
  { id: 'SYNC-031', objectRef: 'CC-007', objectType: 'Cost Centre', entity: 'DigitalQatalyst MENA', status: 'Pending', trigger: 'Scheduled for next sync batch', requester: 'Mohammed Rashid', daysWaiting: 1, priority: 'Normal' },
]

export default function PendingSyncs() {
  const { showToast } = useToast()
  const highPriority = pendingSyncs.filter(s => s.priority === 'High').length
  const awaitingApproval = pendingSyncs.filter(s => s.trigger.includes('approval')).length
  const delayed = pendingSyncs.filter(s => s.daysWaiting >= 4).length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Pending Syncs</h1>
        <p className="text-sm text-gray-600 mt-1">Records awaiting BC sync after approval or state change</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Pending</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">{pendingSyncs.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">High Priority</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">{highPriority}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Awaiting Approval</div>
          <div className="text-2xl font-semibold text-blue-600 mt-1">{awaitingApproval}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Delayed (4+ days)</div>
          <div className="text-2xl font-semibold text-red-600 mt-1">{delayed}</div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Waiting</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger Condition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingSyncs.map((sync) => (
                <tr key={sync.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-xs text-gray-600">{sync.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <RequestIDTag id={sync.objectRef} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sync.objectType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{sync.entity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={sync.priority === 'High' ? 'At Risk' : 'In Progress'} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {sync.daysWaiting >= 4 ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-600">{sync.daysWaiting}d</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{sync.daysWaiting}d</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sync.amount ? `${sync.currency} ${sync.amount.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <div className="flex items-start gap-1">
                      {sync.trigger.includes('approval') ? (
                        <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      )}
                      <span className="line-clamp-2">{sync.trigger}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => showToast(`Checking status for ${sync.objectRef}...`, 'info')}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View
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
