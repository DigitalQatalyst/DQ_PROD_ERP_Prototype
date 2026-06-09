import { employees } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import { UserCog, TrendingUp, MapPin } from 'lucide-react'

interface ChangeRequest {
  id: string
  employeeId: string
  employeeName: string
  changeType: 'Role Change' | 'Entity Transfer' | 'Salary Adjustment' | 'Cost Centre Change'
  currentValue: string
  newValue: string
  effectiveDate: string
  status: string
  requestedBy: string
}

const changeRequests: ChangeRequest[] = [
  { id: 'CHG-001', employeeId: 'E-004', employeeName: 'Jay Nair', changeType: 'Role Change', currentValue: 'Project Coordinator', newValue: 'Senior Project Coordinator', effectiveDate: '01 Jun 2026', status: 'Pending Approval', requestedBy: 'Layla Seitkali' },
  { id: 'CHG-002', employeeId: 'E-003', employeeName: 'Sara Pereira', changeType: 'Salary Adjustment', currentValue: 'AED 18,000', newValue: 'AED 20,500', effectiveDate: '01 Jul 2026', status: 'Pending Approval', requestedBy: 'Mohammed Rashid' },
  { id: 'CHG-003', employeeId: 'E-009', employeeName: 'Maya Sharma', changeType: 'Cost Centre Change', currentValue: 'CC-002', newValue: 'CC-001', effectiveDate: '15 Jun 2026', status: 'In Review', requestedBy: 'Fatima Bin Hammad' },
  { id: 'CHG-004', employeeId: 'E-005', employeeName: 'Tariq Al-Amin', changeType: 'Entity Transfer', currentValue: 'DigitalQatalyst MENA', newValue: 'DigitalQatalyst East Africa', effectiveDate: '01 Aug 2026', status: 'Draft', requestedBy: 'Aisha Khalid' },
  { id: 'CHG-005', employeeId: 'E-008', employeeName: 'Rashid Ahmed', changeType: 'Role Change', currentValue: 'Operations & Inventory Lead', newValue: 'Operations Director', effectiveDate: '01 Sep 2026', status: 'Approved', requestedBy: 'Mohammed Rashid' },
]

export default function EmployeeChangeOperations() {
  const { showToast } = useToast()

  const pendingApproval = changeRequests.filter(c => c.status === 'Pending Approval').length
  const inReview = changeRequests.filter(c => c.status === 'In Review').length
  const approved = changeRequests.filter(c => c.status === 'Approved').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Employee Change Operations</h1>
      <p className="text-sm text-text-muted mb-6">
        Process employee data changes, role updates, and organizational movements.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Changes</p>
          <p className="text-2xl font-bold text-text-primary">{changeRequests.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending Approval</p>
          <p className="text-2xl font-bold text-status-warning-text">{pendingApproval}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">In Review</p>
          <p className="text-2xl font-bold text-dq-orange">{inReview}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Approved (30d)</p>
          <p className="text-2xl font-bold text-status-success-text">{approved}</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Employee</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Change Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Current Value</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">New Value</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Effective Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {changeRequests.map((change, i) => {
              const getChangeIcon = () => {
                if (change.changeType === 'Role Change') return <TrendingUp size={14} className="text-dq-orange" strokeWidth={1.5} />
                if (change.changeType === 'Entity Transfer') return <MapPin size={14} className="text-dq-navy" strokeWidth={1.5} />
                return <UserCog size={14} className="text-text-muted" strokeWidth={1.5} />
              }

              return (
                <tr
                  key={change.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === changeRequests.length - 1 ? 'border-b-0' : ''
                  }`}
                  onClick={() => showToast(`Opening ${change.id} details`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[12px] text-text-muted">{change.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="font-medium text-text-primary">{change.employeeName}</p>
                      <p className="text-xs font-mono text-text-muted">{change.employeeId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {getChangeIcon()}
                      <span className="text-text-primary">{change.changeType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-text-muted text-xs">{change.currentValue}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-text-primary font-medium text-xs">{change.newValue}</span>
                  </td>
                  <td className="px-4 py-3.5 text-text-muted text-xs">{change.effectiveDate}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={change.status} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
