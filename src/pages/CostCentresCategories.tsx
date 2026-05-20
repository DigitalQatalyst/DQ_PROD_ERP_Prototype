import { Tag } from 'lucide-react'
import { costCentres } from '../data/fixtures'
import { useToast } from '../components/Toast'

const spendCategories = [
  { id: 'CAT-01', name: 'Personnel & HR', bcCode: 'PERS', linkedCC: ['CC-001', 'CC-002', 'CC-003', 'CC-004', 'CC-005'] },
  { id: 'CAT-02', name: 'SaaS & Software', bcCode: 'SAAS', linkedCC: ['CC-003', 'CC-005'] },
  { id: 'CAT-03', name: 'Cloud & Infrastructure', bcCode: 'INFRA', linkedCC: ['CC-003'] },
  { id: 'CAT-04', name: 'Professional Services', bcCode: 'PROF', linkedCC: ['CC-002', 'CC-004'] },
  { id: 'CAT-05', name: 'Travel & Accommodation', bcCode: 'TRVL', linkedCC: ['CC-001', 'CC-004'] },
  { id: 'CAT-06', name: 'Office & Admin', bcCode: 'ADMN', linkedCC: ['CC-002'] },
  { id: 'CAT-07', name: 'Marketing & Growth', bcCode: 'MKTG', linkedCC: ['CC-005'] },
  { id: 'CAT-08', name: 'Assurance & Tax', bcCode: 'TAX', linkedCC: ['CC-002'] },
]

const ccColor = ['bg-navy-50 text-dq-navy', 'bg-status-info-surface text-status-info-text', 'bg-orange-50 text-dq-orange', 'bg-status-success-surface text-status-success-text', 'bg-status-warning-surface text-status-warning-text']

export default function CostCentresCategories() {
  const { showToast } = useToast()

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Cost Centres & Categories</h1>
      <p className="text-sm text-text-muted mb-6">Cost centre hierarchy and spend category configuration used across all finance and procurement workflows.</p>

      <div className="grid grid-cols-2 gap-6">
        {/* Cost Centres */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-text-primary">Cost Centres</p>
            <button
              onClick={() => showToast('New cost centre form opened.', 'info')}
              className="text-xs font-semibold text-dq-orange hover:underline"
            >
              + Add
            </button>
          </div>
          <div className="space-y-2">
            {costCentres.map((cc, i) => (
              <div key={cc.id} className="flex items-center gap-4 p-4 bg-white rounded-card border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${ccColor[i % ccColor.length]}`}>
                  {cc.id.split('-')[1]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">{cc.name}</p>
                  <p className="text-xs font-mono text-text-muted">{cc.id}</p>
                </div>
                <button
                  onClick={() => showToast(`Cost centre ${cc.id} settings opened.`, 'info')}
                  className="text-xs font-semibold text-dq-orange hover:underline shrink-0"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Spend Categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-text-primary">Spend Categories</p>
            <button
              onClick={() => showToast('New category form opened.', 'info')}
              className="text-xs font-semibold text-dq-orange hover:underline"
            >
              + Add
            </button>
          </div>
          <div className="space-y-2">
            {spendCategories.map((cat) => (
              <div key={cat.id} className="p-4 bg-white rounded-card border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-dq-navy" strokeWidth={1.5} />
                    <p className="text-sm font-semibold text-text-primary">{cat.name}</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-dq-navy bg-navy-50 rounded-pill px-2 py-0.5 shrink-0">{cat.bcCode}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {cat.linkedCC.map((cc) => (
                    <span key={cc} className="text-[10px] font-mono font-medium bg-surface-1 text-text-muted rounded-pill px-1.5 py-0.5 border border-border-subtle">{cc}</span>
                  ))}
                </div>
                <p className="text-[10px] text-text-disabled mt-1">{cat.id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
