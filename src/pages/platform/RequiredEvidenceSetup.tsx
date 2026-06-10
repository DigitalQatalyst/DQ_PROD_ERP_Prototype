import { useState } from 'react'
import { Plus, Edit2, FileCheck, Link, AlertTriangle, CheckCircle2 } from 'lucide-react'

interface EvidenceType {
  id: string
  name: string
  description: string
  fileTypes: string[]
  maxSizeMB: number
  linkedServices: number
  mandatoryCount: number
  optionalCount: number
  exampleAvailable: boolean
  autoValidation: boolean
  lastModified: string
}

const evidenceTypes: EvidenceType[] = [
  { id: 'EV-001', name: 'Receipt / Invoice Original', description: 'Original receipt or invoice document with VAT breakdown', fileTypes: ['PDF', 'JPG', 'PNG'], maxSizeMB: 5, linkedServices: 28, mandatoryCount: 24, optionalCount: 4, exampleAvailable: true, autoValidation: true, lastModified: '15 May 2026' },
  { id: 'EV-002', name: 'Business Justification', description: 'Written business case or justification memo', fileTypes: ['PDF', 'DOCX'], maxSizeMB: 2, linkedServices: 42, mandatoryCount: 38, optionalCount: 4, exampleAvailable: true, autoValidation: false, lastModified: '14 May 2026' },
  { id: 'EV-003', name: 'Supplier Quote', description: 'Formal quotation from vendor with pricing breakdown', fileTypes: ['PDF', 'XLSX'], maxSizeMB: 3, linkedServices: 31, mandatoryCount: 28, optionalCount: 3, exampleAvailable: true, autoValidation: false, lastModified: '12 May 2026' },
  { id: 'EV-004', name: 'Purchase Order Reference', description: 'PO number or copy of approved purchase order', fileTypes: ['PDF', 'TXT'], maxSizeMB: 1, linkedServices: 18, mandatoryCount: 18, optionalCount: 0, exampleAvailable: true, autoValidation: true, lastModified: '10 May 2026' },
  { id: 'EV-005', name: 'Approval Email / Memo', description: 'Email or memo showing management approval', fileTypes: ['PDF', 'EML', 'MSG'], maxSizeMB: 2, linkedServices: 36, mandatoryCount: 22, optionalCount: 14, exampleAvailable: true, autoValidation: false, lastModified: '16 May 2026' },
  { id: 'EV-006', name: 'Tax Registration Certificate', description: 'Valid VAT or tax registration document', fileTypes: ['PDF'], maxSizeMB: 3, linkedServices: 12, mandatoryCount: 12, optionalCount: 0, exampleAvailable: true, autoValidation: true, lastModified: '08 May 2026' },
  { id: 'EV-007', name: 'Company Registration Document', description: 'Trade licence or certificate of incorporation', fileTypes: ['PDF'], maxSizeMB: 5, linkedServices: 15, mandatoryCount: 15, optionalCount: 0, exampleAvailable: true, autoValidation: false, lastModified: '09 May 2026' },
  { id: 'EV-008', name: 'Bank Account Details', description: 'Bank letter or IBAN confirmation document', fileTypes: ['PDF'], maxSizeMB: 2, linkedServices: 14, mandatoryCount: 14, optionalCount: 0, exampleAvailable: true, autoValidation: true, lastModified: '11 May 2026' },
  { id: 'EV-009', name: 'Medical Certificate', description: 'Doctor note or medical certificate for sick leave', fileTypes: ['PDF', 'JPG'], maxSizeMB: 3, linkedServices: 4, mandatoryCount: 3, optionalCount: 1, exampleAvailable: true, autoValidation: false, lastModified: '07 May 2026' },
  { id: 'EV-010', name: 'Signed Contract / MSA', description: 'Executed contract or master service agreement', fileTypes: ['PDF'], maxSizeMB: 10, linkedServices: 9, mandatoryCount: 9, optionalCount: 0, exampleAvailable: true, autoValidation: false, lastModified: '13 May 2026' },
  { id: 'EV-011', name: 'Delivery Confirmation', description: 'Proof of delivery or service completion', fileTypes: ['PDF', 'JPG'], maxSizeMB: 3, linkedServices: 21, mandatoryCount: 18, optionalCount: 3, exampleAvailable: true, autoValidation: false, lastModified: '14 May 2026' },
  { id: 'EV-012', name: 'Budget Allocation Reference', description: 'Budget code or cost centre approval reference', fileTypes: ['PDF', 'XLSX'], maxSizeMB: 2, linkedServices: 38, mandatoryCount: 31, optionalCount: 7, exampleAvailable: true, autoValidation: true, lastModified: '15 May 2026' },
  { id: 'EV-013', name: 'Travel Itinerary', description: 'Flight/hotel booking confirmation', fileTypes: ['PDF'], maxSizeMB: 2, linkedServices: 8, mandatoryCount: 6, optionalCount: 2, exampleAvailable: true, autoValidation: false, lastModified: '10 May 2026' },
  { id: 'EV-014', name: 'Per-Diem Breakdown', description: 'Daily allowance calculation and justification', fileTypes: ['XLSX', 'PDF'], maxSizeMB: 1, linkedServices: 7, mandatoryCount: 7, optionalCount: 0, exampleAvailable: true, autoValidation: true, lastModified: '09 May 2026' },
  { id: 'EV-015', name: 'Identity Document Copy', description: 'Passport or Emirates ID copy', fileTypes: ['PDF', 'JPG'], maxSizeMB: 3, linkedServices: 11, mandatoryCount: 10, optionalCount: 1, exampleAvailable: false, autoValidation: false, lastModified: '08 May 2026' },
  { id: 'EV-016', name: 'Educational Certificates', description: 'Degree or professional certification copies', fileTypes: ['PDF'], maxSizeMB: 5, linkedServices: 3, mandatoryCount: 3, optionalCount: 0, exampleAvailable: false, autoValidation: false, lastModified: '06 May 2026' },
  { id: 'EV-017', name: 'Insurance Certificate', description: 'Valid insurance policy document', fileTypes: ['PDF'], maxSizeMB: 3, linkedServices: 6, mandatoryCount: 5, optionalCount: 1, exampleAvailable: true, autoValidation: false, lastModified: '12 May 2026' },
  { id: 'EV-018', name: 'Asset Return Confirmation', description: 'Proof of equipment/asset return', fileTypes: ['PDF', 'JPG'], maxSizeMB: 2, linkedServices: 5, mandatoryCount: 5, optionalCount: 0, exampleAvailable: true, autoValidation: false, lastModified: '11 May 2026' },
]

export default function RequiredEvidenceSetup() {
  const [search, setSearch] = useState('')

  const stats = {
    totalTypes: evidenceTypes.length,
    totalLinks: evidenceTypes.reduce((sum, e) => sum + e.linkedServices, 0),
    mandatoryRules: evidenceTypes.reduce((sum, e) => sum + e.mandatoryCount, 0),
    withExamples: evidenceTypes.filter(e => e.exampleAvailable).length,
  }

  const filtered = evidenceTypes.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Required Evidence Setup</h1>
          <p className="text-sm text-text-muted">Configure required evidence types, file rules, and service mappings</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} strokeWidth={2} />
          Add Evidence Type
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Evidence Types</p>
            <FileCheck size={14} className="text-dq-navy" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.totalTypes}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Service Links</p>
            <Link size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.totalLinks}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Mandatory Rules</p>
            <AlertTriangle size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.mandatoryRules}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">With Examples</p>
            <CheckCircle2 size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-success-text">{stats.withExamples}</p>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search evidence types..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 text-sm border border-border-default rounded-input focus:outline-none focus:border-dq-navy"
        />
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-1 border-b border-border-subtle">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Evidence Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Accepted Formats</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Max Size</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Linked Services</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Mandatory</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Optional</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Example</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Auto-Validate</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((ev) => (
                <tr key={ev.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-orange-50 flex items-center justify-center shrink-0">
                        <FileCheck size={16} className="text-dq-orange" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{ev.name}</p>
                        <p className="text-xs text-text-muted">{ev.description}</p>
                        <p className="text-xs text-text-disabled font-mono mt-0.5">{ev.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {ev.fileTypes.map((ft) => (
                        <span key={ft} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-1 text-text-secondary">
                          {ft}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs text-text-secondary font-mono">{ev.maxSizeMB} MB</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-text-primary">{ev.linkedServices}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-status-error-surface text-status-error-text text-xs font-bold">
                      {ev.mandatoryCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-status-info-surface text-status-info-text text-xs font-bold">
                      {ev.optionalCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {ev.exampleAvailable ? (
                      <span className="text-status-success">✓</span>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {ev.autoValidation ? (
                      <span className="text-status-info">✓</span>
                    ) : (
                      <span className="text-text-disabled">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit evidence type">
                        <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="View service links">
                        <Link size={14} className="text-text-muted" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-4 bg-orange-50 border border-dq-orange/20 rounded-card">
        <p className="text-xs font-semibold text-dq-orange uppercase tracking-wider mb-2">Evidence Governance Note</p>
        <p className="text-sm text-text-secondary leading-relaxed">
          Evidence types marked as <strong>mandatory</strong> block request progression until uploaded. Auto-validation checks file format, size, and (where enabled) OCR content matching. All evidence is logged in the audit trail and synced to the Evidence Repository.
        </p>
      </div>
    </div>
  )
}
