import { Upload, CheckCircle, AlertTriangle, Clock } from 'lucide-react'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import { useToast } from '../components/Toast'

const evidenceItems = [
  {
    requestId: 'REQ-2025-0046',
    requestDesc: 'Expense: Kenya team travel',
    item: 'Per-diem breakdown (individual day/person detail)',
    required: true,
    daysOverdue: 4,
    severity: 'high' as const,
    status: 'Missing' as const,
  },
  {
    requestId: 'REQ-2025-0044',
    requestDesc: 'Vendor Onboarding: DataStax Ltd.',
    item: 'UAE Tax registration certificate (or equivalent cross-border document)',
    required: true,
    daysOverdue: 3,
    severity: 'high' as const,
    status: 'Missing' as const,
  },
  {
    requestId: 'REQ-2025-0042',
    requestDesc: 'Purchase: Notion Teams annual',
    item: 'Supplier quote or price reference',
    required: true,
    daysOverdue: 0,
    severity: 'normal' as const,
    status: 'Uploaded' as const,
  },
  {
    requestId: 'REQ-2025-0045',
    requestDesc: 'Purchase: AWS infrastructure top-up',
    item: 'AWS infrastructure quote',
    required: true,
    daysOverdue: 0,
    severity: 'normal' as const,
    status: 'Uploaded' as const,
  },
  {
    requestId: 'REQ-2025-0041',
    requestDesc: 'Expense reimbursement — Aisha Khalid',
    item: 'Receipt 1',
    required: true,
    daysOverdue: 0,
    severity: 'normal' as const,
    status: 'Uploaded' as const,
  },
  {
    requestId: 'REQ-2025-0041',
    requestDesc: 'Expense reimbursement — Aisha Khalid',
    item: 'Receipt 2',
    required: true,
    daysOverdue: 0,
    severity: 'normal' as const,
    status: 'Uploaded' as const,
  },
]

export default function EvidenceActions() {
  const { showToast } = useToast()
  const missing = evidenceItems.filter(e => e.status === 'Missing').length
  const uploaded = evidenceItems.filter(e => e.status === 'Uploaded').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Evidence Actions</h1>
      <p className="text-sm text-text-muted mb-6">Outstanding evidence upload and verification actions across your active requests.</p>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-status-error-surface rounded-pill">
          <AlertTriangle size={14} className="text-status-error" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-error-text">{missing}</span>
          <span className="text-xs text-text-muted">Missing</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <CheckCircle size={14} className="text-status-success" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-success-text">{uploaded}</span>
          <span className="text-xs text-text-muted">Uploaded</span>
        </div>
      </div>

      <div className="space-y-3">
        {evidenceItems.map((item, i) => (
          <div key={i}
            className={`flex items-start gap-4 p-5 bg-white rounded-card border shadow-sm ${
              item.status === 'Missing' ? 'border-status-error/30' : 'border-border-subtle'
            }`}>
            <div className="shrink-0 mt-0.5">
              {item.status === 'Uploaded'
                ? <CheckCircle size={20} className="text-status-success" strokeWidth={1.5} />
                : <AlertTriangle size={20} className="text-status-error" strokeWidth={1.5} />
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <RequestIDTag id={item.requestId} />
                <StatusBadge status={item.status === 'Uploaded' ? 'Approved' : 'Evidence Pending'} size="sm" />
                {item.daysOverdue > 0 && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-status-error-text">
                    <Clock size={11} strokeWidth={1.5} />
                    {item.daysOverdue}d overdue
                  </span>
                )}
              </div>
              <p className="text-xs text-text-muted mb-1">{item.requestDesc}</p>
              <p className="text-sm font-medium text-text-primary">{item.item}</p>
              {item.required && (
                <p className="text-xs text-text-muted mt-0.5">(Required)</p>
              )}
            </div>
            {item.status === 'Missing' ? (
              <button
                onClick={() => showToast(`Upload interface opened for ${item.requestId}.`, 'info')}
                className="flex items-center gap-2 px-4 py-2 rounded-btn bg-dq-orange text-white text-xs font-semibold hover:opacity-90 transition-opacity shrink-0"
              >
                <Upload size={14} strokeWidth={1.5} />
                Upload
              </button>
            ) : (
              <span className="text-xs font-medium text-status-success-text bg-status-success-surface rounded-pill px-2 py-0.5 shrink-0">
                ✓ Uploaded
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
