import { useState, useMemo } from 'react'
import { Package, FileText, Download, CheckCircle2, Folder } from 'lucide-react'
import { useToast } from '../../components/Toast'
import { requests, hrRequests, leaveRequests, adminRequests, inventoryMovements } from '../../data/fixtures'

type Domain = 'Finance' | 'HR' | 'Leave' | 'Procurement' | 'Inventory' | 'Admin'

interface DomainOption {
  key: Domain
  label: string
  description: string
  recordCount: number
}

const allDomains: DomainOption[] = [
  { key: 'Finance', label: 'Finance', description: 'Expenses, invoices, payments, budgets', recordCount: requests.filter((r) => ['Expense', 'Invoice', 'Budget Amendment', 'Budget Requisition'].includes(r.type)).length },
  { key: 'Procurement', label: 'Procurement', description: 'Purchases, vendor onboarding, subscriptions', recordCount: requests.filter((r) => ['Purchase', 'Vendor Onboarding'].includes(r.type)).length },
  { key: 'HR', label: 'HR & People', description: 'Employee letters, documents, onboarding/offboarding', recordCount: hrRequests.length },
  { key: 'Leave', label: 'Leave Records', description: 'Annual, sick, parental, unpaid leave', recordCount: leaveRequests.length },
  { key: 'Inventory', label: 'Inventory & Assets', description: 'Stock movements, asset custody, returns', recordCount: inventoryMovements.length },
  { key: 'Admin', label: 'Admin & Back-Office', description: 'Travel, visa, office support, documentation', recordCount: adminRequests.length },
]

type DateRange = '30d' | '90d' | 'ytd' | 'custom'

export default function AuditPackBuilder() {
  const [selected, setSelected] = useState<Set<Domain>>(new Set(['Finance', 'Procurement']))
  const [dateRange, setDateRange] = useState<DateRange>('30d')
  const [includeEvidence, setIncludeEvidence] = useState(true)
  const [includeAudit, setIncludeAudit] = useState(true)
  const [generated, setGenerated] = useState(false)
  const { showToast } = useToast()

  const toggle = (d: Domain) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(d)) next.delete(d); else next.add(d)
      return next
    })
  }

  const summary = useMemo(() => {
    const domains = Array.from(selected)
    const records = domains.reduce((sum, d) => sum + (allDomains.find((x) => x.key === d)?.recordCount ?? 0), 0)
    return {
      domains: domains.length,
      records,
      evidence: includeEvidence ? Math.round(records * 2.3) : 0,
      auditEvents: includeAudit ? records * 4 : 0,
    }
  }, [selected, includeEvidence, includeAudit])

  const handleGenerate = () => {
    setGenerated(true)
    showToast('Audit pack assembled. Ready for export.', 'success')
  }

  const dateRangeLabel: Record<DateRange, string> = {
    '30d': 'Last 30 days',
    '90d': 'Last 90 days',
    'ytd': 'Year to date (2026)',
    'custom': 'Custom range',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Audit Pack Builder</h1>
      <p className="text-sm text-text-muted mb-6">
        Assemble scoped evidence packs for internal control review, external audit, tax filing, or assurance partners. Records, evidence, and audit events bundled per your selection.
      </p>

      <div className="grid grid-cols-[1fr_340px] gap-6">
        {/* Left — builder */}
        <div className="space-y-5">
          {/* Step 1 — domains */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3" style={{ letterSpacing: '0.12em' }}>
              Step 1 — Select Domains
            </p>
            <div className="grid grid-cols-2 gap-3">
              {allDomains.map((d) => {
                const isSel = selected.has(d.key)
                return (
                  <button
                    key={d.key}
                    onClick={() => toggle(d.key)}
                    className={`text-left p-3 rounded-card border transition-colors ${
                      isSel ? 'border-dq-orange bg-orange-50' : 'border-border-default hover:bg-surface-1'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className={`text-sm font-semibold ${isSel ? 'text-dq-orange' : 'text-text-primary'}`}>{d.label}</p>
                      {isSel && <CheckCircle2 size={16} className="text-dq-orange" strokeWidth={2} />}
                    </div>
                    <p className="text-xs text-text-muted">{d.description}</p>
                    <p className="text-[10px] font-mono text-text-muted mt-1">{d.recordCount} records</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2 — range */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3" style={{ letterSpacing: '0.12em' }}>
              Step 2 — Date Range
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {(Object.keys(dateRangeLabel) as DateRange[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`px-3 py-1.5 rounded-pill text-xs font-semibold transition-colors ${
                    dateRange === r ? 'bg-dq-navy text-white' : 'bg-surface-1 text-text-secondary hover:bg-border-subtle'
                  }`}
                >
                  {dateRangeLabel[r]}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 — options */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3" style={{ letterSpacing: '0.12em' }}>
              Step 3 — Include
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={includeEvidence} onChange={(e) => setIncludeEvidence(e.target.checked)} />
                <span className="text-sm text-text-secondary">Evidence files (receipts, invoices, contracts, certificates)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={includeAudit} onChange={(e) => setIncludeAudit(e.target.checked)} />
                <span className="text-sm text-text-secondary">Audit events (state changes, approvals, comments, sync events)</span>
              </label>
            </div>
          </div>

          {/* Generated pack preview */}
          {generated && (
            <div className="bg-status-success-surface border-2 border-status-success rounded-card p-5">
              <div className="flex items-start gap-3">
                <Package size={24} className="text-status-success-text shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex-1">
                  <p className="text-base font-semibold text-status-success-text mb-1">Audit Pack Generated</p>
                  <p className="text-xs text-text-secondary mb-3">
                    PACK-2026-{Math.floor(Math.random() * 9000) + 1000} · {dateRangeLabel[dateRange]} · {summary.records} records · {summary.evidence} evidence files · {summary.auditEvents} audit events
                  </p>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-status-success text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                    <Download size={14} strokeWidth={2} /> Export ZIP
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right — summary */}
        <div className="space-y-4">
          <div className="bg-dq-navy rounded-card p-5 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-3" style={{ letterSpacing: '0.12em' }}>
              Pack Summary
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-[11px] text-white/60">Domains</p>
                <p className="text-2xl font-bold font-mono">{summary.domains}</p>
              </div>
              <div>
                <p className="text-[11px] text-white/60">Records</p>
                <p className="text-2xl font-bold font-mono">{summary.records}</p>
              </div>
              <div>
                <p className="text-[11px] text-white/60">Evidence files</p>
                <p className="text-lg font-bold font-mono">{summary.evidence}</p>
              </div>
              <div>
                <p className="text-[11px] text-white/60">Audit events</p>
                <p className="text-lg font-bold font-mono">{summary.auditEvents}</p>
              </div>
            </div>
            <button
              onClick={handleGenerate}
              disabled={selected.size === 0}
              className="mt-5 w-full py-2.5 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Generate Pack
            </button>
          </div>

          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Folder size={16} className="text-dq-orange" strokeWidth={1.5} />
              Recent Packs
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">PACK-2026-1042</p>
                  <p className="text-text-muted">Q1 finance + procurement</p>
                </div>
                <span className="text-text-muted">15 Apr</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">PACK-2026-0987</p>
                  <p className="text-text-muted">Bloom Accounting handover</p>
                </div>
                <span className="text-text-muted">28 Mar</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">PACK-2026-0834</p>
                  <p className="text-text-muted">Year-end 2025</p>
                </div>
                <span className="text-text-muted">12 Jan</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-card p-4 border border-dq-orange/20">
            <div className="flex gap-2">
              <FileText size={16} className="text-dq-orange shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-text-secondary leading-relaxed">
                Audit packs auto-redact sensitive PII unless explicitly authorised. External assurance partners receive scoped read-only versions per the Data Sovereignty policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
