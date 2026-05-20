import { useState } from 'react'
import { AlertTriangle, AlertCircle, Clock, ShieldAlert } from 'lucide-react'
import RequestIDTag from '../components/RequestIDTag'
import { useToast } from '../components/Toast'

type Severity = 'Critical' | 'High' | 'Medium' | 'Low'
type RiskFilter = 'All' | Severity

const risks = [
  { id: 'RSK-001', severity: 'Critical' as Severity, domain: 'Finance', title: 'Mazrui Holdings invoice overdue for approval', detail: 'REQ-2025-0047 (AED 90,000) due 28 May 2026 — 8 days from now. Executive approval required. BC sync blocked until approved.', linkedRef: 'REQ-2025-0047', time: '20 May 2026' },
  { id: 'RSK-002', severity: 'High' as Severity, domain: 'Procurement', title: 'Loom Business subscription expires in 7 days', detail: 'SUB-005 (AED 4,100/yr) auto-renew is OFF. Failure to act before 27 May 2026 will result in service cancellation.', linkedRef: 'SUB-005', time: '20 May 2026' },
  { id: 'RSK-003', severity: 'High' as Severity, domain: 'Finance', title: 'Kenya travel claim 4 days overdue — escalation risk', detail: 'REQ-2025-0046: Per-diem breakdown has not been submitted despite 3 reminders. Sara Pereira has flagged for escalation.', linkedRef: 'REQ-2025-0046', time: '18 May 2026' },
  { id: 'RSK-004', severity: 'High' as Severity, domain: 'Platform', title: 'Vendor BC sync failure — 3 retries exhausted', detail: 'VND-004 (Anthropic) sync failed due to missing VAT registration field. Manual data correction required before next retry.', linkedRef: 'SYNC-003', time: '17 May 2026' },
  { id: 'RSK-005', severity: 'Medium' as Severity, domain: 'Project', title: 'PRJ-2403 budget overage — amendment pending approval', detail: 'Client: Noor Retail DXP tracking AED 45,000 over budget. Amendment REQ-2025-0048 in Draft. Phase 3 milestone billing at risk.', linkedRef: 'REQ-2025-0048', time: '18 May 2026' },
  { id: 'RSK-006', severity: 'Medium' as Severity, domain: 'Procurement', title: 'Anthropic API Credits renewal — 13 days', detail: 'SUB-003 (AED 42,000/yr) auto-renew is OFF. Approval required before 1 Jun 2026 to avoid API service interruption.', linkedRef: 'SUB-003', time: '20 May 2026' },
  { id: 'RSK-007', severity: 'Medium' as Severity, domain: 'Finance', title: '6 approvals overdue — period close risk', detail: 'Period close target: 31 May 2026. 6 overdue approvals must be cleared or escalated before close.', linkedRef: null, time: '19 May 2026' },
  { id: 'RSK-008', severity: 'Low' as Severity, domain: 'Procurement', title: 'DataStax vendor onboarding blocked on documentation', detail: 'REQ-2025-0044: Tax registration cert pending. Procurement Ops has contacted DataStax finance team.', linkedRef: 'REQ-2025-0044', time: '17 May 2026' },
]

const severityConfig: Record<Severity, { icon: React.ReactNode; cls: string; labelCls: string }> = {
  Critical: { icon: <ShieldAlert size={18} className="text-status-error" strokeWidth={1.5} />, cls: 'border-status-error/40 bg-status-error-surface/30', labelCls: 'bg-status-error text-white' },
  High: { icon: <AlertTriangle size={18} className="text-status-error" strokeWidth={1.5} />, cls: 'border-status-error/20', labelCls: 'bg-status-error-surface text-status-error-text' },
  Medium: { icon: <AlertCircle size={18} className="text-status-warning" strokeWidth={1.5} />, cls: 'border-status-warning/30', labelCls: 'bg-status-warning-surface text-status-warning-text' },
  Low: { icon: <Clock size={18} className="text-status-info" strokeWidth={1.5} />, cls: 'border-border-subtle', labelCls: 'bg-status-info-surface text-status-info-text' },
}

export default function RiskAlerts() {
  const [filter, setFilter] = useState<RiskFilter>('All')
  const { showToast } = useToast()

  const filtered = filter === 'All' ? risks : risks.filter(r => r.severity === filter)

  const counts = {
    Critical: risks.filter(r => r.severity === 'Critical').length,
    High: risks.filter(r => r.severity === 'High').length,
    Medium: risks.filter(r => r.severity === 'Medium').length,
    Low: risks.filter(r => r.severity === 'Low').length,
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Risk / Exception Alerts</h1>
      <p className="text-sm text-text-muted mb-6">Proactive risk signals across finance exposure, vendor sync failures, and approval bottlenecks.</p>

      {/* Severity summary */}
      <div className="flex items-center gap-3 mb-6">
        {(['All', 'Critical', 'High', 'Medium', 'Low'] as (RiskFilter)[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-btn border text-sm font-medium transition-all ${filter === f ? 'border-dq-orange bg-orange-50 text-dq-orange' : 'border-border-subtle bg-white text-text-muted hover:bg-surface-1'}`}
          >
            {f} {f !== 'All' && <span className="ml-1 font-bold">{counts[f as Severity]}</span>}
            {f === 'All' && <span className="ml-1 font-bold">{risks.length}</span>}
          </button>
        ))}
      </div>

      {/* Risk list */}
      <div className="space-y-3">
        {filtered.map((risk) => {
          const cfg = severityConfig[risk.severity]
          return (
            <div key={risk.id} className={`flex items-start gap-4 p-5 bg-white rounded-card border shadow-sm ${cfg.cls}`}>
              <div className="shrink-0 mt-0.5">{cfg.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold rounded-pill px-1.5 py-0.5 ${cfg.labelCls}`}>{risk.severity.toUpperCase()}</span>
                  <span className="text-[10px] font-semibold text-text-muted bg-surface-1 border border-border-subtle rounded-pill px-1.5 py-0.5">{risk.domain}</span>
                  <span className="text-xs font-mono text-text-disabled">{risk.id}</span>
                </div>
                <p className="text-sm font-semibold text-text-primary">{risk.title}</p>
                <p className="text-xs text-text-muted leading-relaxed mt-0.5">{risk.detail}</p>
                <div className="flex items-center gap-3 mt-2">
                  {risk.linkedRef && <RequestIDTag id={risk.linkedRef} />}
                  <span className="flex items-center gap-1 text-xs text-text-disabled">
                    <Clock size={10} strokeWidth={1.5} />
                    {risk.time}
                  </span>
                </div>
              </div>
              <button
                onClick={() => showToast(`Risk ${risk.id} action panel opened.`, 'info')}
                className="px-3 py-1.5 text-xs font-semibold rounded-btn border border-dq-orange text-dq-orange hover:bg-orange-50 transition-colors shrink-0"
              >
                Act
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
