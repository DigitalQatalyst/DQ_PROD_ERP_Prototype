import { useState } from 'react'
import { Search } from 'lucide-react'

const mappings = [
  { dws04Field: 'Request.id', bcTable: 'Purchase Header', bcField: 'No.', direction: 'DWS.04 → BC', syncTrigger: 'On approval', required: true },
  { dws04Field: 'Request.amount', bcTable: 'Purchase Header', bcField: 'Amount', direction: 'DWS.04 → BC', syncTrigger: 'On approval', required: true },
  { dws04Field: 'Request.vendorId', bcTable: 'Vendor', bcField: 'No.', direction: 'Both', syncTrigger: 'On vendor creation', required: true },
  { dws04Field: 'Request.currency', bcTable: 'Purchase Header', bcField: 'Currency Code', direction: 'DWS.04 → BC', syncTrigger: 'On approval', required: true },
  { dws04Field: 'Vendor.id', bcTable: 'Vendor', bcField: 'No.', direction: 'DWS.04 → BC', syncTrigger: 'On onboarding complete', required: true },
  { dws04Field: 'Vendor.name', bcTable: 'Vendor', bcField: 'Name', direction: 'DWS.04 → BC', syncTrigger: 'On onboarding complete', required: true },
  { dws04Field: 'Vendor.vatNo', bcTable: 'Vendor', bcField: 'VAT Registration No.', direction: 'DWS.04 → BC', syncTrigger: 'On onboarding complete', required: true },
  { dws04Field: 'CostCentre.id', bcTable: 'Dimension Value', bcField: 'Code', direction: 'Both', syncTrigger: 'Manual / Admin', required: true },
  { dws04Field: 'Project.id', bcTable: 'Job', bcField: 'No.', direction: 'DWS.04 → BC', syncTrigger: 'On project creation', required: true },
  { dws04Field: 'Project.budget', bcTable: 'Job Planning Line', bcField: 'Total Cost (LCY)', direction: 'DWS.04 → BC', syncTrigger: 'On budget amendment', required: false },
  { dws04Field: 'Invoice.bcRef', bcTable: 'Posted Purchase Invoice', bcField: 'No.', direction: 'BC → DWS.04', syncTrigger: 'On BC posting', required: false },
  { dws04Field: 'SyncRecord.status', bcTable: 'Integration Log Entry', bcField: 'Status', direction: 'BC → DWS.04', syncTrigger: 'Polling every 5 min', required: false },
  { dws04Field: 'Entity.bcCompany', bcTable: 'Company', bcField: 'Name', direction: 'Both', syncTrigger: 'Admin config', required: true },
]

const directionStyle: Record<string, string> = {
  'DWS.04 → BC': 'bg-navy-50 text-dq-navy',
  'BC → DWS.04': 'bg-status-info-surface text-status-info-text',
  'Both': 'bg-status-success-surface text-status-success-text',
}

export default function BCMappingReference() {
  const [search, setSearch] = useState('')

  const filtered = mappings.filter(m =>
    m.dws04Field.toLowerCase().includes(search.toLowerCase()) ||
    m.bcTable.toLowerCase().includes(search.toLowerCase()) ||
    m.bcField.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">BC Mapping Reference</h1>
      <p className="text-sm text-text-muted mb-6">Field-level mapping reference between DWS.04 data model and Business Central integration schema.</p>

      {/* Stats */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2 px-4 py-2 bg-navy-50 rounded-pill">
          <span className="text-sm font-semibold text-dq-navy">{mappings.length}</span>
          <span className="text-xs text-text-muted">Field Mappings</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-status-error-surface rounded-pill">
          <span className="text-sm font-semibold text-status-error-text">{mappings.filter(m => m.required).length}</span>
          <span className="text-xs text-text-muted">Required</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search by field name, table, or BC field…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-input border border-border-default text-sm focus:outline-none focus:border-dq-orange"
        />
      </div>

      {/* Mapping table */}
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">DWS.04 Field</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Table</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Field</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Direction</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Sync Trigger</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Required</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map((m, i) => (
              <tr key={i} className="hover:bg-surface-1 transition-colors">
                <td className="px-5 py-3 font-mono text-xs text-text-primary">{m.dws04Field}</td>
                <td className="px-4 py-3 text-xs text-text-secondary">{m.bcTable}</td>
                <td className="px-4 py-3 font-mono text-xs text-dq-navy">{m.bcField}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-semibold rounded-pill px-1.5 py-0.5 ${directionStyle[m.direction]}`}>{m.direction}</span>
                </td>
                <td className="px-4 py-3 text-xs text-text-muted">{m.syncTrigger}</td>
                <td className="px-4 py-3">
                  {m.required ? (
                    <span className="text-xs font-semibold text-status-error-text">Required</span>
                  ) : (
                    <span className="text-xs text-text-disabled">Optional</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-text-muted">No mappings match your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
