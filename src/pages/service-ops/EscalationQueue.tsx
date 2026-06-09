import { AlertTriangle, TrendingUp, User, Clock } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'

const escalations = [
  { id: 'REQ-2401-089', type: 'Purchase Request', reason: 'SLA Breach', daysOverdue: 3, escalatedTo: 'Khalid Rahman (VP Ops)', escalatedBy: 'Sara Abdullah', escalationDate: '2024-01-18', severity: 'High', status: 'Pending Action' },
  { id: 'REQ-2401-078', type: 'Finance Request', reason: 'High Value Exception', daysOverdue: 0, escalatedTo: 'Fatima Bin Hammad (CFO)', escalatedBy: 'Omar Rashid', escalationDate: '2024-01-18', severity: 'Critical', status: 'Under Review' },
  { id: 'REQ-2401-091', type: 'Invoice', reason: 'SLA Breach', daysOverdue: 5, escalatedTo: 'Ahmed Al-Sayed (Director)', escalatedBy: 'Layla Hassan', escalationDate: '2024-01-16', severity: 'High', status: 'Pending Action' },
  { id: 'REQ-2401-067', type: 'Vendor Setup', reason: 'Compliance Flag', daysOverdue: 0, escalatedTo: 'Noor Al-Mansoori (Compliance)', escalatedBy: 'Khalid Rahman', escalationDate: '2024-01-17', severity: 'Critical', status: 'Under Review' },
  { id: 'REQ-2401-102', type: 'HR Request', reason: 'SLA Breach', daysOverdue: 2, escalatedTo: 'Fatima Bin Hammad (CHRO)', escalatedBy: 'Sara Abdullah', escalationDate: '2024-01-17', severity: 'Medium', status: 'Action Taken' },
  { id: 'REQ-2401-055', type: 'Purchase Request', reason: 'Multiple Rejections', daysOverdue: 0, escalatedTo: 'Omar Rashid (VP Procurement)', escalatedBy: 'Ahmed Al-Sayed', escalationDate: '2024-01-15', severity: 'Medium', status: 'Resolved' },
  { id: 'REQ-2401-073', type: 'Asset Transfer', reason: 'SLA Breach', daysOverdue: 4, escalatedTo: 'Khalid Rahman (VP Ops)', escalatedBy: 'Noor Al-Mansoori', escalationDate: '2024-01-15', severity: 'High', status: 'Pending Action' },
  { id: 'REQ-2401-082', type: 'Finance Request', reason: 'Policy Exception', daysOverdue: 0, escalatedTo: 'Fatima Bin Hammad (CFO)', escalatedBy: 'Layla Hassan', escalationDate: '2024-01-14', severity: 'High', status: 'Under Review' }
]

export default function EscalationQueue() {
  const { showToast } = useToast()
  const pending = escalations.filter(e => e.status === 'Pending Action').length
  const slaBreaches = escalations.filter(e => e.reason === 'SLA Breach').length
  const critical = escalations.filter(e => e.severity === 'Critical').length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Escalation Queue</h1>
        <p className="text-sm text-gray-600 mt-1">Items escalated due to SLA breach or policy requirements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Escalations</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">{escalations.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Pending Action</div>
          <div className="text-2xl font-semibold text-red-600 mt-1">{pending}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">SLA Breaches</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">{slaBreaches}</div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Escalated To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Escalated By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {escalations.map((escalation) => (
                <tr key={escalation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RequestIDTag id={escalation.id} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{escalation.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {escalation.reason === 'SLA Breach' && <Clock className="h-4 w-4 text-orange-600" />}
                      {escalation.reason.includes('Exception') && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      {escalation.reason.includes('Flag') && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      <span className="text-sm text-gray-900">{escalation.reason}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={escalation.severity === 'Critical' ? 'Blocked' : escalation.severity === 'High' ? 'At Risk' : 'In Progress'} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {escalation.daysOverdue > 0 ? (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-red-600 font-medium">{escalation.daysOverdue}d</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <User className="h-4 w-4" />
                      {escalation.escalatedTo}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{escalation.escalatedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{escalation.escalationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={escalation.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {escalation.status === 'Pending Action' && (
                      <button
                        onClick={() => showToast('Taking action on escalation...')}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Resolve
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
