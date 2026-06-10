import { useState } from 'react'
import { Plus, Edit2, GitBranch, CheckCircle, Database, AlertCircle } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

interface DataMappingRule {
  id: string
  name: string
  dwsField: string
  bcModule: 'General Ledger' | 'Purchase' | 'Sales' | 'HR' | 'Inventory' | 'Fixed Assets'
  bcEntity: string
  bcField: string
  transformType: 'Direct' | 'Lookup' | 'Calculated' | 'Conditional' | 'Static'
  transformLogic: string
  isMandatory: boolean
  validationRule: string
  exampleDwsValue: string
  exampleBcValue: string
  status: 'Active' | 'Draft' | 'Deprecated'
  lastModified: string
}

const dataMappingRules: DataMappingRule[] = [
  { id: 'DM-001', name: 'Expense Category → GL Account', dwsField: 'expenseCategory', bcModule: 'General Ledger', bcEntity: 'G/L Account', bcField: 'No.', transformType: 'Lookup', transformLogic: 'Lookup table: DWS expense category code → BC GL Account No. (e.g. TRAVEL → 6110, IT_EQUIP → 7200)', isMandatory: true, validationRule: 'Value must exist in BC GL Account master; blocks sync if not found', exampleDwsValue: 'TRAVEL', exampleBcValue: '6110', status: 'Active', lastModified: '01 Jun 2026' },
  { id: 'DM-002', name: 'Vendor Name → BC Vendor Name', dwsField: 'vendorDisplayName', bcModule: 'Purchase', bcEntity: 'Vendor', bcField: 'Name', transformType: 'Direct', transformLogic: 'Direct pass-through; trim whitespace and normalise to Title Case before write', isMandatory: true, validationRule: 'Max 100 characters; must not contain special characters except &, -, .', exampleDwsValue: 'Al Futtaim Trading LLC', exampleBcValue: 'Al Futtaim Trading LLC', status: 'Active', lastModified: '28 May 2026' },
  { id: 'DM-003', name: 'Cost Centre → BC Dimension Code', dwsField: 'costCentreCode', bcModule: 'General Ledger', bcEntity: 'Default Dimension', bcField: 'Dimension Value Code', transformType: 'Lookup', transformLogic: 'Lookup DWS cost centre code against BC Dimension Value master for DEPARTMENT dimension; fail on missing', isMandatory: true, validationRule: 'Must match active BC Dimension Value; suspended values blocked', exampleDwsValue: 'CC-FIN-01', exampleBcValue: 'FIN-01', status: 'Active', lastModified: '02 Jun 2026' },
  { id: 'DM-004', name: 'Project Code → BC Job No.', dwsField: 'projectCode', bcModule: 'General Ledger', bcEntity: 'Job', bcField: 'No.', transformType: 'Lookup', transformLogic: 'Lookup DWS project reference against BC Jobs master; creates job link on PO and GL entries', isMandatory: false, validationRule: 'If provided, must exist in BC Jobs master with status Open', exampleDwsValue: 'PRJ-2026-042', exampleBcValue: 'J-2026-042', status: 'Active', lastModified: '29 May 2026' },
  { id: 'DM-005', name: 'Employee ID → BC Employee No.', dwsField: 'employeeId', bcModule: 'HR', bcEntity: 'Employee', bcField: 'No.', transformType: 'Direct', transformLogic: 'Direct mapping; DWS employee ID format EMP-XXXX maps directly to BC Employee No.', isMandatory: true, validationRule: 'Employee must exist and be active in BC HR module; terminated employees blocked from new submissions', exampleDwsValue: 'EMP-0047', exampleBcValue: 'EMP-0047', status: 'Active', lastModified: '30 May 2026' },
  { id: 'DM-006', name: 'Purchase Amount → BC Amount (AED)', dwsField: 'requestedAmount', bcModule: 'Purchase', bcEntity: 'Purchase Line', bcField: 'Amount', transformType: 'Calculated', transformLogic: 'Multiply unit price × quantity; apply currency conversion if non-AED using live rate from BC Currency Exchange Rate table', isMandatory: true, validationRule: 'Must be positive, non-zero; maximum AED 10,000,000 per line', exampleDwsValue: '15000.00 AED', exampleBcValue: '15000.00', status: 'Active', lastModified: '01 Jun 2026' },
  { id: 'DM-007', name: 'Invoice Date → BC Posting Date', dwsField: 'invoiceDate', bcModule: 'Purchase', bcEntity: 'Purchase Header', bcField: 'Posting Date', transformType: 'Direct', transformLogic: 'Direct date pass-through; convert from DWS ISO 8601 format to BC date format DD/MM/YYYY', isMandatory: true, validationRule: 'Date must fall within an open accounting period in BC; future dates blocked; dates >90 days past require Finance Owner override', exampleDwsValue: '2026-06-05', exampleBcValue: '05/06/2026', status: 'Active', lastModified: '28 May 2026' },
  { id: 'DM-008', name: 'Currency Code → BC Currency Code', dwsField: 'currencyCode', bcModule: 'General Ledger', bcEntity: 'Currency', bcField: 'Code', transformType: 'Conditional', transformLogic: 'If DWS currency = AED, map to BC blank (functional currency); else map to 3-letter ISO code; validate against BC Currency master', isMandatory: true, validationRule: 'Must be ISO 4217 code present in BC Currency master; AED maps to empty string', exampleDwsValue: 'USD', exampleBcValue: 'USD', status: 'Active', lastModified: '29 May 2026' },
  { id: 'DM-009', name: 'Legal Entity → BC Company Code', dwsField: 'entityCode', bcModule: 'General Ledger', bcEntity: 'Company', bcField: 'Name', transformType: 'Lookup', transformLogic: 'Lookup DWS entity short code against BC Company table; routes record to correct BC company database', isMandatory: true, validationRule: 'Entity must map to an active BC company; cross-entity posting requires explicit Finance Owner permission', exampleDwsValue: 'DQ-MAIN', exampleBcValue: 'DigitalQatalyst Consulting LLC', status: 'Active', lastModified: '01 Jun 2026' },
  { id: 'DM-010', name: 'Approval Status → BC Status', dwsField: 'approvalStatus', bcModule: 'Purchase', bcEntity: 'Purchase Header', bcField: 'Status', transformType: 'Lookup', transformLogic: 'Map DWS approval states to BC purchase order statuses: Approved→Released, Pending→Open, Rejected→no sync, Draft→no sync', isMandatory: true, validationRule: 'Only Approved records trigger BC sync; Rejected and Draft records are suppressed', exampleDwsValue: 'Approved', exampleBcValue: 'Released', status: 'Active', lastModified: '03 Jun 2026' },
  { id: 'DM-011', name: 'Vendor Tax No. → BC VAT Reg. No.', dwsField: 'vendorTaxRegistration', bcModule: 'Purchase', bcEntity: 'Vendor', bcField: 'VAT Registration No.', transformType: 'Direct', transformLogic: 'Direct pass-through; format validation applied for UAE TRN format (15 digits)', isMandatory: false, validationRule: 'If provided, must match 15-digit UAE TRN format; warning raised if blank for vendors with invoices >AED 5,000', exampleDwsValue: '100234567890123', exampleBcValue: '100234567890123', status: 'Active', lastModified: '30 May 2026' },
  { id: 'DM-012', name: 'Payment Terms → BC Payment Terms Code', dwsField: 'paymentTerms', bcModule: 'Purchase', bcEntity: 'Vendor', bcField: 'Payment Terms Code', transformType: 'Lookup', transformLogic: 'Map DWS payment term description to BC Payment Terms codes: Net 30→NET30, Net 60→NET60, Immediate→COD, etc.', isMandatory: true, validationRule: 'Must match a valid BC Payment Terms Code; unmapped values default to NET30 with a warning', exampleDwsValue: 'Net 30 Days', exampleBcValue: 'NET30', status: 'Active', lastModified: '28 May 2026' },
  { id: 'DM-013', name: 'Purchase Category → BC Item Category', dwsField: 'purchaseCategoryCode', bcModule: 'Inventory', bcEntity: 'Item Category', bcField: 'Code', transformType: 'Lookup', transformLogic: 'Lookup DWS purchase category against BC Item Category master for non-service items', isMandatory: false, validationRule: 'Required for inventory items; optional for direct expense items; validated against BC Item Category table', exampleDwsValue: 'IT-HARDWARE', exampleBcValue: 'COMP-HW', status: 'Active', lastModified: '02 Jun 2026' },
  { id: 'DM-014', name: 'Asset Tag → BC Fixed Asset No.', dwsField: 'assetTag', bcModule: 'Fixed Assets', bcEntity: 'Fixed Asset', bcField: 'No.', transformType: 'Lookup', transformLogic: 'Lookup DWS asset tag against BC Fixed Asset register; links expense and depreciation entries to asset record', isMandatory: false, validationRule: 'If provided, must exist in BC Fixed Asset master with status Active', exampleDwsValue: 'AST-IT-2026-0112', exampleBcValue: 'FA-0112', status: 'Active', lastModified: '03 Jun 2026' },
  { id: 'DM-015', name: 'Department Code → BC Responsibility Centre', dwsField: 'departmentCode', bcModule: 'General Ledger', bcEntity: 'Responsibility Center', bcField: 'Code', transformType: 'Lookup', transformLogic: 'Map DWS department codes to BC Responsibility Centre codes for P&L reporting segmentation', isMandatory: false, validationRule: 'Must match active BC Responsibility Centre; warning if blank on GL entries above AED 10,000', exampleDwsValue: 'DEPT-OPS', exampleBcValue: 'OPS', status: 'Active', lastModified: '29 May 2026' },
  { id: 'DM-016', name: 'Customer Reference → BC Customer No.', dwsField: 'customerId', bcModule: 'Sales', bcEntity: 'Customer', bcField: 'No.', transformType: 'Lookup', transformLogic: 'Lookup DWS customer UUID against BC Customer master via external document reference field', isMandatory: true, validationRule: 'Customer must exist in BC Sales module with status Active; blocked customers trigger rejection', exampleDwsValue: 'CUST-UAE-00391', exampleBcValue: 'C-00391', status: 'Active', lastModified: '01 Jun 2026' },
  { id: 'DM-017', name: 'Leave Type → BC Absence Code', dwsField: 'leaveType', bcModule: 'HR', bcEntity: 'Employee Absence', bcField: 'Cause of Absence Code', transformType: 'Lookup', transformLogic: 'Map DWS leave type labels to BC Absence Cause codes: Annual Leave→ANNUAL, Sick→SICK, Maternity→MATLEAVE, Unpaid→UNPAID', isMandatory: true, validationRule: 'Must match a BC Cause of Absence Code; all approved leave is synced; cancelled leave triggers a reversal entry', exampleDwsValue: 'Annual Leave', exampleBcValue: 'ANNUAL', status: 'Active', lastModified: '02 Jun 2026' },
  { id: 'DM-018', name: 'Bank Account → BC Bank Account Code', dwsField: 'companyBankAccountId', bcModule: 'General Ledger', bcEntity: 'Bank Account', bcField: 'No.', transformType: 'Lookup', transformLogic: 'Map DWS internal bank account reference to BC Bank Account No. for payment journal entries', isMandatory: true, validationRule: 'Must be an active BC Bank Account; blocked or closed accounts reject the payment sync', exampleDwsValue: 'BANK-AED-ENBD-01', exampleBcValue: 'ENBD-AED-01', status: 'Active', lastModified: '28 May 2026' },
  { id: 'DM-019', name: 'Approval Tier → BC Purchaser Code', dwsField: 'finalApproverCode', bcModule: 'Purchase', bcEntity: 'Purchase Header', bcField: 'Purchaser Code', transformType: 'Conditional', transformLogic: 'If approval tier = L1 set purchaser to requesting dept head; if L2 set to Finance Owner; if L3 set to MD user code in BC', isMandatory: false, validationRule: 'Purchaser Code must exist in BC Salesperson/Purchaser table; missing code triggers a warning but does not block sync', exampleDwsValue: 'L2-FINANCE', exampleBcValue: 'TARIQ.A', status: 'Draft', lastModified: '06 Jun 2026' },
  { id: 'DM-020', name: 'DWS Created Date → BC Document Date', dwsField: 'requestCreatedAt', bcModule: 'Purchase', bcEntity: 'Purchase Header', bcField: 'Document Date', transformType: 'Direct', transformLogic: 'Map DWS request creation timestamp (UTC+4) to BC document date; strip time component, retain date only', isMandatory: true, validationRule: 'Document date must not precede the BC company creation date; dates in closed periods require re-open authorisation', exampleDwsValue: '2026-06-03T09:42:00+04:00', exampleBcValue: '03/06/2026', status: 'Active', lastModified: '03 Jun 2026' },
]

export default function DataMappingRules() {
  const [filter, setFilter] = useState<'All' | 'Direct' | 'Lookup' | 'Calculated' | 'Conditional'>('All')

  const stats = {
    activeMappings: dataMappingRules.filter(r => r.status === 'Active').length,
    mandatoryMappings: dataMappingRules.filter(r => r.isMandatory).length,
    modulesCovered: new Set(dataMappingRules.map(r => r.bcModule)).size,
    draftCount: dataMappingRules.filter(r => r.status === 'Draft').length,
  }

  const filtered = filter === 'All' ? dataMappingRules : dataMappingRules.filter(r => r.transformType === filter)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Data Mapping Rules</h1>
          <p className="text-sm text-text-muted">Map DWS.04 request fields to Business Central entity fields for accurate BC sync</p>
        </div>
        <button className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={16} strokeWidth={2} />
          Create Mapping
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Active Mappings</p>
            <CheckCircle size={14} className="text-status-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-text-primary">{stats.activeMappings}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Mandatory Mappings</p>
            <AlertCircle size={14} className="text-status-error" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-error-text">{stats.mandatoryMappings}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">BC Modules Covered</p>
            <Database size={14} className="text-status-info" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-info-text">{stats.modulesCovered}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-text-muted">Draft Mappings</p>
            <GitBranch size={14} className="text-status-warning" strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-bold text-status-warning-text">{stats.draftCount}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(['All', 'Direct', 'Lookup', 'Calculated', 'Conditional'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-btn transition-colors ${
              filter === f
                ? 'bg-dq-navy text-white'
                : 'bg-surface-1 text-text-muted hover:bg-border-subtle'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-1 border-b border-border-subtle">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Mapping</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">DWS Field</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Target</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Transform</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Logic</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Mandatory</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Example</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((rule) => (
                <tr key={rule.id} className="hover:bg-surface-1 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-text-primary">{rule.name}</p>
                      <p className="text-xs text-text-disabled font-mono mt-0.5">{rule.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-text-primary bg-surface-1 px-1.5 py-0.5 rounded">{rule.dwsField}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-xs font-medium text-text-primary">{rule.bcEntity}</p>
                      <p className="text-xs text-text-muted">{rule.bcModule} · <span className="font-mono">{rule.bcField}</span></p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      rule.transformType === 'Direct'
                        ? 'bg-status-success-surface text-status-success-text'
                        : rule.transformType === 'Lookup'
                        ? 'bg-status-info-surface text-status-info-text'
                        : rule.transformType === 'Calculated'
                        ? 'bg-status-warning-surface text-status-warning-text'
                        : rule.transformType === 'Conditional'
                        ? 'bg-status-error-surface text-status-error-text'
                        : 'bg-surface-1 text-text-secondary'
                    }`}>
                      {rule.transformType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-text-secondary max-w-[220px] leading-relaxed">{rule.transformLogic}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {rule.isMandatory ? (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-status-error-surface text-status-error-text">
                        Required
                      </span>
                    ) : (
                      <span className="text-xs text-text-disabled">Optional</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono text-text-muted bg-surface-1 px-1.5 py-0.5 rounded">{rule.exampleDwsValue}</span>
                      <span className="text-xs text-text-disabled">→</span>
                      <span className="text-xs font-mono text-text-primary bg-surface-1 px-1.5 py-0.5 rounded">{rule.exampleBcValue}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={rule.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 hover:bg-border-subtle rounded transition-colors" title="Edit mapping">
                      <Edit2 size={14} className="text-text-muted" strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-status-info-surface border border-status-info/20 rounded-card">
          <p className="text-xs font-semibold text-status-info-text uppercase tracking-wider mb-2">Mapping Validation</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Mandatory mappings block the BC sync job if the source field value is missing, null, or fails validation. Blocked records are quarantined in the Sync Error queue with the specific field and rule that failed. Finance or Platform Admin must resolve and re-trigger sync; records do not auto-retry after a validation failure.
          </p>
        </div>
        <div className="p-4 bg-status-warning-surface border border-status-warning/20 rounded-card">
          <p className="text-xs font-semibold text-status-warning-text uppercase tracking-wider mb-2">Transform Audit</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            All transform functions are version-controlled. Any change to transform logic, validation rules, or field mappings is recorded with the user, timestamp, and before/after values in the Configuration Audit Trail. Changes to Active mappings require Platform Admin approval and are promoted through Sandbox before Production deployment.
          </p>
        </div>
      </div>
    </div>
  )
}
