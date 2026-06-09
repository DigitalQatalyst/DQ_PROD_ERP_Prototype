import { useState } from 'react'
import { employees, transitions } from '../../data/fixtures'
import { useToast } from '../../components/Toast'
import StatusBadge from '../../components/StatusBadge'
import { RotateCcw, AlertTriangle, Package } from 'lucide-react'

interface AssetReturnRequest {
  id: string
  employeeId: string
  employeeName: string
  assetType: string
  assetId: string
  requestType: 'Return' | 'Replacement' | 'Disposal'
  reason: string
  status: string
  requestDate: string
  dueDate?: string
}

const returnRequests: AssetReturnRequest[] = [
  { id: 'RET-001', employeeId: 'E-012', employeeName: 'Priya Menon', assetType: 'MacBook Pro M3 14"', assetId: 'AST-008-01', requestType: 'Return', reason: 'Offboarding (TR-002)', status: 'Pending', requestDate: '15 May 2026', dueDate: '30 May 2026' },
  { id: 'RET-002', employeeId: 'E-005', employeeName: 'Tariq Al-Amin', assetType: 'External Monitor', assetId: 'AST-010-03', requestType: 'Replacement', reason: 'Hardware failure - screen flickering', status: 'Approved', requestDate: '16 May 2026' },
  { id: 'RET-003', employeeId: 'E-003', employeeName: 'Sara Pereira', assetType: 'Dell XPS 15', assetId: 'AST-009-02', requestType: 'Replacement', reason: 'Performance degradation', status: 'In Review', requestDate: '17 May 2026' },
  { id: 'RET-004', employeeId: 'E-012', employeeName: 'Priya Menon', assetType: 'AirPods Pro', assetId: 'AST-011-02', requestType: 'Return', reason: 'Offboarding (TR-002)', status: 'Pending', requestDate: '15 May 2026', dueDate: '30 May 2026' },
  { id: 'RET-005', employeeId: 'E-007', employeeName: 'Fatima Bin Hammad', assetType: 'Office 365 E3', assetId: 'LIC-006-08', requestType: 'Disposal', reason: 'Duplicate licence - never activated', status: 'Approved', requestDate: '12 May 2026' },
]

type Filter = 'All' | 'Returns' | 'Replacements' | 'Disposals'

export default function AssetReturnReplacement() {
  const [filter, setFilter] = useState<Filter>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? returnRequests : returnRequests.filter(r => {
    if (filter === 'Returns') return r.requestType === 'Return'
    if (filter === 'Replacements') return r.requestType === 'Replacement'
    if (filter === 'Disposals') return r.requestType === 'Disposal'
    return true
  })

  const returns = returnRequests.filter(r => r.requestType === 'Return').length
  const replacements = returnRequests.filter(r => r.requestType === 'Replacement').length
  const disposals = returnRequests.filter(r => r.requestType === 'Disposal').length
  const pending = returnRequests.filter(r => r.status === 'Pending').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Asset Return / Replacement</h1>
      <p className="text-sm text-text-muted mb-6">
        Process asset returns, replacements, and disposal requests.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-text-primary">{returnRequests.length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Returns</p>
          <p className="text-2xl font-bold text-status-warning-text">{returns}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Replacements</p>
          <p className="text-2xl font-bold text-dq-orange">{replacements}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Pending Action</p>
          <p className="text-2xl font-bold text-status-error-text">{pending}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Returns', 'Replacements', 'Disposals'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              filter === f
                ? 'border-dq-orange text-dq-orange'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Employee</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Asset</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Reason</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Due Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((request, i) => {
              const isOverdue = request.dueDate && new Date(request.dueDate) < new Date()
              const getIcon = () => {
                if (request.requestType === 'Return') return <RotateCcw size={14} className="text-status-warning-text" strokeWidth={1.5} />
                if (request.requestType === 'Replacement') return <Package size={14} className="text-dq-orange" strokeWidth={1.5} />
                return <AlertTriangle size={14} className="text-status-error-text" strokeWidth={1.5} />
              }

              return (
                <tr
                  key={request.id}
                  className={`border-b border-border-subtle hover:bg-surface-1 transition-colors cursor-pointer ${
                    i === filtered.length - 1 ? 'border-b-0' : ''
                  } ${isOverdue ? 'bg-status-error-surface/20' : ''}`}
                  onClick={() => showToast(`Opening ${request.id} details`, 'info')}
                >
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[12px] text-text-muted">{request.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {getIcon()}
                      <span className="text-text-primary font-medium">{request.requestType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-text-primary">{request.employeeName}</p>
                      <p className="text-xs font-mono text-text-muted">{request.employeeId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-text-primary text-xs">{request.assetType}</p>
                      <p className="text-[10px] font-mono text-text-muted">{request.assetId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-text-secondary text-xs max-w-[250px] truncate">{request.reason}</td>
                  <td className="px-4 py-3.5">
                    {request.dueDate ? (
                      <div className="flex items-center gap-1.5">
                        {isOverdue && <AlertTriangle size={12} className="text-status-error-text" strokeWidth={2} />}
                        <span className={`text-xs ${
                          isOverdue ? 'text-status-error-text font-semibold' : 'text-text-muted'
                        }`}>
                          {request.dueDate}
                        </span>
                      </div>
                    ) : (
                      <span className="text-text-disabled text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={request.status} />
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
