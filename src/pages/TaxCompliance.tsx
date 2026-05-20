import { CheckCircle, AlertCircle, FileText, Download } from 'lucide-react'
import { entities } from '../data/fixtures'
import { useToast } from '../components/Toast'

const vatRecords = [
  { entity: 'DigitalQatalyst MENA', vatNo: 'TRN100329847100003', period: 'Q1 2026 (Jan–Mar)', dueDate: '28 Apr 2026', status: 'Filed', amount: 'AED 84,200', refundable: false },
  { entity: 'DigitalQatalyst MENA', vatNo: 'TRN100329847100003', period: 'Q2 2026 (Apr–Jun)', dueDate: '28 Jul 2026', status: 'In Progress', amount: 'AED ~91,000 est.', refundable: false },
  { entity: 'DigitalQatalyst East Africa', vatNo: 'P051873402B', period: 'Q1 2026 (Jan–Mar)', dueDate: '30 Apr 2026', status: 'Filed', amount: 'KES 1,240,000', refundable: false },
  { entity: 'DigitalQatalyst East Africa', vatNo: 'P051873402B', period: 'Q2 2026 (Apr–Jun)', dueDate: '30 Jul 2026', status: 'Pending', amount: 'KES ~900,000 est.', refundable: false },
  { entity: 'DigitalQatalyst Iberia', vatNo: 'PT512944018', period: 'Q1 2026 (Jan–Mar)', dueDate: '15 May 2026', status: 'Filed', amount: 'EUR 22,100', refundable: false },
  { entity: 'DigitalQatalyst Iberia', vatNo: 'PT512944018', period: 'Q2 2026 (Apr–Jun)', dueDate: '15 Aug 2026', status: 'Pending', amount: 'EUR ~18,000 est.', refundable: false },
]

const complianceDocs = [
  { name: 'UAE VAT Registration Certificate', entity: 'DigitalQatalyst MENA', expiry: '—', status: 'Current' },
  { name: 'Kenya KRA Tax Compliance Certificate', entity: 'DigitalQatalyst East Africa', expiry: '31 Dec 2026', status: 'Current' },
  { name: 'Portugal IVA Registration', entity: 'DigitalQatalyst Iberia', expiry: '—', status: 'Current' },
  { name: 'UAE Economic Substance Declaration', entity: 'DigitalQatalyst MENA', expiry: '30 Jun 2026', status: 'Due Soon' },
  { name: 'Audit Readiness Package — Q1 2026', entity: 'All Entities', expiry: '—', status: 'Ready' },
]

const statusStyle: Record<string, string> = {
  Filed: 'bg-status-success-surface text-status-success-text',
  'In Progress': 'bg-status-info-surface text-status-info-text',
  Pending: 'bg-status-warning-surface text-status-warning-text',
  Current: 'bg-status-success-surface text-status-success-text',
  'Due Soon': 'bg-status-warning-surface text-status-warning-text',
  Ready: 'bg-navy-50 text-dq-navy',
}

export default function TaxCompliance() {
  const { showToast } = useToast()

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Tax & Compliance Records</h1>
      <p className="text-sm text-text-muted mb-6">Manage VAT records, compliance documentation, and audit-ready tax filing data across all entities.</p>

      {/* Entity overview */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {entities.map((e) => (
          <div key={e.name} className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
            <p className="text-sm font-semibold text-text-primary">{e.name}</p>
            <p className="text-xs text-text-muted mb-3">{e.country} · {e.currency} · VAT Registered</p>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-status-success" strokeWidth={1.5} />
              <span className="text-xs text-text-muted">Q1 2026 filed</span>
            </div>
          </div>
        ))}
      </div>

      {/* VAT filing table */}
      <p className="text-sm font-semibold text-text-primary mb-3">VAT / Tax Filings</p>
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Entity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Period</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Due Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {vatRecords.map((r, i) => (
              <tr key={i} className="hover:bg-surface-1 transition-colors">
                <td className="px-5 py-3">
                  <p className="text-sm font-medium text-text-primary">{r.entity}</p>
                  <p className="text-xs font-mono text-text-disabled">{r.vatNo}</p>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">{r.period}</td>
                <td className="px-4 py-3 text-right font-mono text-sm font-semibold text-text-primary">{r.amount}</td>
                <td className="px-4 py-3 text-sm text-text-muted">{r.dueDate}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${statusStyle[r.status]}`}>{r.status}</span>
                </td>
                <td className="px-4 py-3">
                  {r.status === 'Filed' && (
                    <button
                      onClick={() => showToast('Filing document downloaded.', 'success')}
                      className="flex items-center gap-1 text-xs font-semibold text-dq-navy hover:underline"
                    >
                      <Download size={11} strokeWidth={1.5} />
                      Download
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compliance documents */}
      <p className="text-sm font-semibold text-text-primary mb-3">Compliance Documents</p>
      <div className="space-y-2">
        {complianceDocs.map((doc, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-card border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <FileText size={18} className="text-dq-navy shrink-0" strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">{doc.name}</p>
              <p className="text-xs text-text-muted">{doc.entity}{doc.expiry !== '—' ? ` · Expires ${doc.expiry}` : ''}</p>
            </div>
            <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 shrink-0 ${statusStyle[doc.status]}`}>{doc.status}</span>
            {doc.status === 'Due Soon' && (
              <AlertCircle size={16} className="text-status-warning shrink-0" strokeWidth={1.5} />
            )}
            <button
              onClick={() => showToast(`${doc.name} downloaded.`, 'success')}
              className="text-xs font-semibold text-dq-navy hover:underline shrink-0"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
