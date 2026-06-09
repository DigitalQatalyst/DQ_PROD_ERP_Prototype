import { employees } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import { Laptop } from 'lucide-react'

export default function AssetAssignmentTracker() {
  const { showToast } = useToast()

  const totalAssets = employees.reduce((sum, e) => sum + e.assetsAssigned, 0)
  const employeesWithAssets = employees.filter(e => e.assetsAssigned > 0).length
  const activeEmployees = employees.filter(e => e.status === 'Active').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Asset Assignment Tracker</h1>
      <p className="text-sm text-text-muted mb-6">
        Track asset custody assignments and employee asset records.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Assets Assigned</p>
          <p className="text-2xl font-bold text-text-primary">{totalAssets}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Employees with Assets</p>
          <p className="text-2xl font-bold text-status-warning-text">{employeesWithAssets}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Active Employees</p>
          <p className="text-2xl font-bold text-status-success-text">{activeEmployees}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Avg Assets/Employee</p>
          <p className="text-2xl font-bold text-dq-orange">{(totalAssets / employeesWithAssets).toFixed(1)}</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Employee</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Role</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Entity</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Assets Assigned</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => (
              <tr
                key={emp.id}
                className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                  i === employees.length - 1 ? 'border-b-0' : ''
                }`}
                onClick={() => showToast(`Opening ${emp.id} asset details`, 'info')}
              >
                <td className="px-4 py-3.5">
                  <span className="font-mono text-[12px] text-text-muted">{emp.id}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    {emp.assetsAssigned > 0 && <Laptop size={16} className="text-dq-orange" strokeWidth={1.5} />}
                    <span className="font-medium text-text-primary">{emp.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-text-muted">{emp.role}</td>
                <td className="px-4 py-3.5 text-text-secondary">{emp.entity}</td>
                <td className="px-4 py-3.5 text-right">
                  <span className={`font-mono font-semibold ${
                    emp.assetsAssigned > 0 ? 'text-text-primary' : 'text-text-disabled'
                  }`}>
                    {emp.assetsAssigned}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium ${
                    emp.status === 'Active' ? 'bg-status-success-surface text-status-success-text' :
                    emp.status === 'Onboarding' ? 'bg-status-warning-surface text-status-warning-text' :
                    'bg-status-error-surface text-status-error-text'
                  }`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
