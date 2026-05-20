import { useState } from 'react'
import { Folder, Plus } from 'lucide-react'
import { projects, costCentres } from '../data/fixtures'
import { useToast } from '../components/Toast'

const projectExtended = [
  { id: 'PRJ-2401', bcDimension: 'DIM-PRJ-2401', category: 'Internal Build', serviceType: 'Technology', billingModel: 'Internal', client: '—' },
  { id: 'PRJ-2402', bcDimension: 'DIM-PRJ-2402', category: 'Internal Build', serviceType: 'Technology', billingModel: 'Internal', client: '—' },
  { id: 'PRJ-2403', bcDimension: 'DIM-PRJ-2403', category: 'Client Project', serviceType: 'Digital Experience', billingModel: 'Milestone', client: 'Noor Retail' },
  { id: 'PRJ-2404', bcDimension: 'DIM-PRJ-2404', category: 'Internal Build', serviceType: 'AI/ML', billingModel: 'Internal', client: '—' },
  { id: 'PRJ-2405', bcDimension: 'DIM-PRJ-2405', category: 'Internal Build', serviceType: 'Design', billingModel: 'Internal', client: '—' },
]

const billingModelColor: Record<string, string> = {
  'Milestone': 'bg-status-success-surface text-status-success-text',
  'Internal': 'bg-surface-1 text-text-muted border border-border-subtle',
  'Retainer': 'bg-navy-50 text-dq-navy',
}

export default function ProjectServiceMasterData() {
  const { showToast } = useToast()

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Project & Service Master Data</h1>
        <button
          onClick={() => showToast('New project form opened.', 'info')}
          className="flex items-center gap-2 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={15} strokeWidth={1.5} />
          New Project
        </button>
      </div>
      <p className="text-sm text-text-muted mb-6">Master project and service record configuration linked to BC dimensions and cost structures.</p>

      {/* Projects table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden mb-8">
        <div className="px-5 py-3 bg-surface-1 border-b border-border-subtle">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Projects — {projects.length} records</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Project</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Dimension</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Billing Model</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Client</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Budget</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {projects.map((p) => {
              const ext = projectExtended.find(e => e.id === p.id)!
              return (
                <tr key={p.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Folder size={14} className="text-dq-navy" strokeWidth={1.5} />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{p.name}</p>
                        <p className="text-xs font-mono text-text-muted">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs font-mono text-dq-navy">{ext.bcDimension}</td>
                  <td className="px-4 py-4 text-sm text-text-secondary">{ext.category}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${billingModelColor[ext.billingModel]}`}>{ext.billingModel}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-text-secondary">{ext.client}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${p.status === 'Active' ? 'bg-status-success-surface text-status-success-text' : 'bg-status-info-surface text-status-info-text'}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-sm font-semibold text-text-primary">
                    {p.currency} {p.budget.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => showToast(`Project ${p.id} master record opened.`, 'info')}
                      className="text-xs font-semibold text-dq-orange hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Service types */}
      <p className="text-sm font-semibold text-text-primary mb-3">Service Type Configuration</p>
      <div className="grid grid-cols-3 gap-3">
        {['Digital Experience', 'Technology', 'AI/ML', 'Design', 'Consulting', 'Managed Services'].map((type) => (
          <div key={type} className="flex items-center justify-between p-4 bg-white rounded-card border border-border-subtle shadow-sm">
            <p className="text-sm font-medium text-text-primary">{type}</p>
            <button
              onClick={() => showToast(`Service type "${type}" configuration opened.`, 'info')}
              className="text-xs font-semibold text-dq-orange hover:underline"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
