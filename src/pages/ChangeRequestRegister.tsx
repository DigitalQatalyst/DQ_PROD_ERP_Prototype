import { useState } from 'react'
import { Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { useToast } from '../components/Toast'

type CRStatus = 'Draft' | 'Under Review' | 'Approved' | 'Deployed' | 'Rejected'
type CRType = 'Workflow' | 'Integration' | 'Master Data' | 'Access Control' | 'UI Config'

interface ChangeRequest {
  id: string
  title: string
  type: CRType
  status: CRStatus
  requestedBy: string
  reviewedBy: string
  submitted: string
  priority: 'High' | 'Normal' | 'Low'
  description: string
}

const changeRequests: ChangeRequest[] = [
  { id: 'CR-001', title: 'Add delegated approval scope for Finance Ops → Purchase ≤ AED 5K', type: 'Workflow', status: 'Approved', requestedBy: 'Mohammed Rashid', reviewedBy: 'Tariq Al-Amin', submitted: '16 May 2026', priority: 'Normal', description: 'Allow Finance Ops Practitioner to approve purchase requests up to AED 5,000 without escalation to Finance Control Owner.' },
  { id: 'CR-002', title: 'Fix missing VAT field mapping for Vendor BC sync', type: 'Integration', status: 'Under Review', requestedBy: 'Layla Seitkali', reviewedBy: 'Tariq Al-Amin', submitted: '17 May 2026', priority: 'High', description: 'VND-004 (Anthropic) sync is failing due to missing VAT registration number not being passed in the BC API payload. Field mapping update required.' },
  { id: 'CR-003', title: 'Add Noor Retail as BC customer dimension', type: 'Master Data', status: 'Approved', requestedBy: 'Mohammed Rashid', reviewedBy: 'Tariq Al-Amin', submitted: '1 May 2026', priority: 'High', description: 'Create BC-CUST-NR-001 customer dimension for Noor Retail to enable project billing against PRJ-2403.' },
  { id: 'CR-004', title: 'Increase subscription renewal alert threshold to 30 days', type: 'Workflow', status: 'Deployed', requestedBy: 'Aisha Khalid', reviewedBy: 'Tariq Al-Amin', submitted: '1 Apr 2026', priority: 'Normal', description: 'Change renewal alert trigger from 14 days to 30 days to provide more lead time for approval decisions.' },
  { id: 'CR-005', title: 'Add DigitalQatalyst Iberia to BC connector', type: 'Integration', status: 'Draft', requestedBy: 'Tariq Al-Amin', reviewedBy: '—', submitted: '20 May 2026', priority: 'Normal', description: 'Provision BC API connector for DQ-IB-003 entity to enable Iberia financial records to sync.' },
]

const statusStyle: Record<CRStatus, string> = {
  Draft: 'bg-surface-1 text-text-muted border border-border-subtle',
  'Under Review': 'bg-status-info-surface text-status-info-text',
  Approved: 'bg-status-success-surface text-status-success-text',
  Deployed: 'bg-navy-50 text-dq-navy',
  Rejected: 'bg-status-error-surface text-status-error-text',
}

const priorityStyle: Record<string, string> = {
  High: 'bg-status-error-surface text-status-error-text',
  Normal: 'bg-surface-1 text-text-muted',
  Low: 'bg-status-success-surface text-status-success-text',
}

export default function ChangeRequestRegister() {
  const [filter, setFilter] = useState<'All' | CRStatus>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? changeRequests : changeRequests.filter(cr => cr.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Change Request Register</h1>
        <button
          onClick={() => showToast('New change request form opened.', 'info')}
          className="flex items-center gap-2 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={15} strokeWidth={1.5} />
          New Change Request
        </button>
      </div>
      <p className="text-sm text-text-muted mb-6">Formal change request log for platform configuration, workflow, and integration changes.</p>

      {/* Summary */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2 px-4 py-2 bg-status-info-surface rounded-pill">
          <Clock size={13} className="text-status-info" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-info-text">{changeRequests.filter(cr => cr.status === 'Under Review').length}</span>
          <span className="text-xs text-text-muted">Under Review</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <CheckCircle size={13} className="text-status-success" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-success-text">{changeRequests.filter(cr => cr.status === 'Approved' || cr.status === 'Deployed').length}</span>
          <span className="text-xs text-text-muted">Approved / Deployed</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-border-subtle mb-5">
        {(['All', 'Draft', 'Under Review', 'Approved', 'Deployed'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-dq-orange text-dq-orange' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Change requests */}
      <div className="space-y-3">
        {filtered.map((cr) => (
          <div key={cr.id} className="p-5 bg-white rounded-card border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-text-disabled">{cr.id}</span>
                  <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${statusStyle[cr.status]}`}>{cr.status}</span>
                  <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${priorityStyle[cr.priority]}`}>{cr.priority}</span>
                  <span className="text-xs font-medium bg-surface-1 text-text-muted border border-border-subtle rounded-pill px-2 py-0.5">{cr.type}</span>
                </div>
                <p className="text-sm font-semibold text-text-primary">{cr.title}</p>
                <p className="text-xs text-text-muted mt-0.5">{cr.description}</p>
              </div>
              <button
                onClick={() => showToast(`Change request ${cr.id} opened.`, 'info')}
                className="px-3 py-1.5 text-xs font-semibold rounded-btn border border-border-default text-text-muted hover:bg-surface-1 transition-colors shrink-0"
              >
                View
              </button>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-muted mt-2">
              <span>Requested by: {cr.requestedBy}</span>
              <span>Reviewed by: {cr.reviewedBy}</span>
              <span className="flex items-center gap-1"><Clock size={10} strokeWidth={1.5} />{cr.submitted}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
