import { useState } from 'react'
import { requests, projects } from '../data/fixtures'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import { useToast } from '../components/Toast'

export default function ProjectLinkedCostView() {
  const [selectedProject, setSelectedProject] = useState<string>('All')
  const { showToast } = useToast()

  const linkedRequests = requests.filter(r => r.linkedProject)
  const filtered = selectedProject === 'All' ? linkedRequests : linkedRequests.filter(r => r.linkedProject === selectedProject)

  const projectsWithLinked = projects.filter(p => requests.some(r => r.linkedProject === p.id))

  const totalCost = filtered.reduce((s, r) => s + r.amount, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Project-linked Cost View</h1>
      <p className="text-sm text-text-muted mb-6">Drill-down into cost records linked to specific projects across all entities and cost centres.</p>

      {/* Project selector */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedProject('All')}
          className={`px-4 py-2 rounded-btn border text-sm font-medium transition-all ${selectedProject === 'All' ? 'border-dq-orange bg-orange-50 text-dq-orange' : 'border-border-subtle bg-white text-text-secondary hover:bg-surface-1'}`}
        >
          All Projects
        </button>
        {projectsWithLinked.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProject(p.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-btn border text-sm font-medium transition-all ${selectedProject === p.id ? 'border-dq-orange bg-orange-50 text-dq-orange' : 'border-border-subtle bg-white text-text-secondary hover:bg-surface-1'}`}
          >
            <span className="font-mono text-xs">{p.id}</span>
            <span className="hidden sm:inline text-xs">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-center gap-4 mb-5 p-4 bg-navy-50 rounded-card border border-dq-navy/10">
        <div>
          <p className="text-xs text-text-muted">Total Cost Records</p>
          <p className="text-xl font-bold font-mono text-text-primary">{filtered.length}</p>
        </div>
        <div className="w-px h-10 bg-border-subtle" />
        <div>
          <p className="text-xs text-text-muted">Total Value</p>
          <p className="text-xl font-bold font-mono text-text-primary">AED {totalCost.toLocaleString()}</p>
        </div>
        {selectedProject !== 'All' && (
          <>
            <div className="w-px h-10 bg-border-subtle" />
            <div>
              <p className="text-xs text-text-muted">Project Budget</p>
              <p className="text-xl font-bold font-mono text-text-primary">
                AED {(projects.find(p => p.id === selectedProject)?.budget || 0).toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Cost records table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Request</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Project</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map((r) => {
              const project = projects.find(p => p.id === r.linkedProject)
              return (
                <tr key={r.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-5 py-4">
                    <RequestIDTag id={r.id} />
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-medium text-text-secondary">{r.type}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-text-secondary max-w-[200px]">{r.description}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-mono font-semibold text-dq-navy">{r.linkedProject}</span>
                    {project && <p className="text-xs text-text-muted">{project.name}</p>}
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-sm font-bold text-text-primary">
                    {r.amount > 0 ? `${r.currency} ${r.amount.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={r.status as any} size="sm" />
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => showToast(`Request ${r.id} opened.`, 'info')}
                      className="text-xs font-semibold text-dq-orange hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-text-muted">No cost records linked to this project.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
