import { CheckCircle, XCircle, Clock, User, FileText } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import RequestIDTag from '../../components/RequestIDTag'

const decisions = [
  { id: 'REQ-2401-089', type: 'Purchase Request', decision: 'Approved with Conditions', approver: 'Khalid Rahman', date: '2024-01-18', rationale: 'Single source justified but requires quarterly performance review', amount: 85000, conditions: 2 },
  { id: 'REQ-2401-078', type: 'Finance Request', decision: 'Rejected', approver: 'Fatima Bin Hammad', date: '2024-01-17', rationale: 'Advance payment not aligned with project risk profile, recommend milestone-based', amount: 120000, conditions: 0 },
  { id: 'REQ-2401-091', type: 'Vendor Setup', decision: 'Approved', approver: 'Omar Rashid', date: '2024-01-18', rationale: 'Strategic partnership value outweighs payment term variance', amount: 0, conditions: 0 },
  { id: 'REQ-2401-065', type: 'Invoice', decision: 'Approved', approver: 'Sara Abdullah', date: '2024-01-16', rationale: 'Late submission due to external factors, vendor relationship maintained', amount: 45000, conditions: 1 },
  { id: 'REQ-2401-073', type: 'Purchase Request', decision: 'Rejected', approver: 'Ahmed Al-Sayed', date: '2024-01-15', rationale: 'Insufficient justification for non-preferred vendor, alternative options available', amount: 28000, conditions: 0 },
  { id: 'REQ-2401-054', type: 'Budget Transfer', decision: 'Approved with Conditions', approver: 'Layla Hassan', date: '2024-01-14', rationale: 'Year-end reallocation approved, requires CFO notification', amount: 75000, conditions: 1 },
  { id: 'REQ-2401-042', type: 'Contract Amendment', decision: 'Approved', approver: 'Noor Al-Mansoori', date: '2024-01-13', rationale: 'Scope change within contractual framework, pricing remains competitive', amount: 52000, conditions: 0 },
  { id: 'REQ-2401-038', type: 'Asset Purchase', decision: 'Rejected', approver: 'Khalid Rahman', date: '2024-01-12', rationale: 'Capital expenditure not in approved budget cycle, defer to Q2', amount: 95000, conditions: 0 },
  { id: 'REQ-2401-029', type: 'HR Exception', decision: 'Approved', approver: 'Fatima Bin Hammad', date: '2024-01-11', rationale: 'Accelerated hiring justified by project timeline, additional oversight required', amount: 0, conditions: 2 },
  { id: 'REQ-2401-021', type: 'Policy Override', decision: 'Approved with Conditions', approver: 'Omar Rashid', date: '2024-01-10', rationale: 'Business continuity exception, policy review scheduled for Q2', amount: 38000, conditions: 3 }
]

export default function DecisionHistory() {
  const { showToast } = useToast()
  const approved = decisions.filter(d => d.decision.includes('Approved')).length
  const rejected = decisions.filter(d => d.decision === 'Rejected').length
  const withConditions = decisions.filter(d => d.conditions > 0).length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Decision History</h1>
        <p className="text-sm text-gray-600 mt-1">Historical log of approval decisions and override rationale</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Decisions</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">{decisions.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Approved</div>
          <div className="text-2xl font-semibold text-green-600 mt-1">{approved}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Rejected</div>
          <div className="text-2xl font-semibold text-red-600 mt-1">{rejected}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">With Conditions</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">{withConditions}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decision</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rationale</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conditions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {decisions.map((decision) => (
                <tr key={decision.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RequestIDTag id={decision.id} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{decision.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {decision.decision === 'Rejected' ? (
                        <><XCircle className="h-4 w-4 text-red-600" /><span className="text-sm text-red-600">Rejected</span></>
                      ) : decision.decision === 'Approved with Conditions' ? (
                        <><CheckCircle className="h-4 w-4 text-orange-600" /><span className="text-sm text-orange-600">Conditional</span></>
                      ) : (
                        <><CheckCircle className="h-4 w-4 text-green-600" /><span className="text-sm text-green-600">Approved</span></>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      {decision.approver}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {decision.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md">{decision.rationale}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {decision.conditions > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {decision.conditions}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => showToast('Viewing full decision details...')}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                      <FileText className="h-4 w-4" />
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
