import { Download, AlertCircle } from 'lucide-react'
import { financialHealth, milestones, projects } from '../data/fixtures'
import SummaryTile from '../components/SummaryTile'
import RequestIDTag from '../components/RequestIDTag'

function fmt(n: number) {
  return n.toLocaleString()
}

function Section({ title, hint, children, span = 1 }: { title: string; hint?: string; children: React.ReactNode; span?: 1 | 2 | 3 }) {
  return (
    <div
      className="bg-white rounded-card border border-border-subtle shadow-sm p-5"
      style={{ gridColumn: `span ${span} / span ${span}` }}
    >
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        {hint && <span className="text-[11px] text-text-muted">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

function MiniBar({ amount, max, color }: { amount: number; max: number; color: string }) {
  const pct = max === 0 ? 0 : (amount / max) * 100
  return (
    <div className="flex-1 h-1.5 rounded-pill overflow-hidden" style={{ background: '#EEEFF6' }}>
      <div className="h-full rounded-pill" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

export default function FinancialHealthReport() {
  const fh = financialHealth

  const arTotal = fh.arAging.reduce((s, b) => s + b.amount, 0)
  const apTotal = fh.apAging.reduce((s, b) => s + b.amount, 0)
  const arMax = Math.max(...fh.arAging.map((b) => b.amount))
  const apMax = Math.max(...fh.apAging.map((b) => b.amount))
  const tbTotalDr = fh.trialBalance.reduce((s, r) => s + r.debit, 0)
  const tbTotalCr = fh.trialBalance.reduce((s, r) => s + r.credit, 0)

  // Upcoming milestones — next 30 days, not complete
  const upcoming = milestones
    .filter((m) => m.status === 'In Progress' || m.status === 'Not Started' || m.status === 'Overdue' || m.status === 'Delayed')
    .slice(0, 6)

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-2xl font-bold text-text-primary">Financial Health Report</h1>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn border border-border-default text-sm font-semibold text-text-primary hover:bg-surface-1 transition-colors">
          <Download size={14} strokeWidth={2} />
          Export
        </button>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Consolidated operating finance view — receivables, payables, working capital, forecasts, trial balance, expense summary, and VAT credit position. As of 18 May 2026.
      </p>

      {/* Top-line tiles */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryTile label="Working Capital (AED)" value={fmt(fh.workingCapital.workingCapital)} color="navy" />
        <SummaryTile label="AR Outstanding (AED)" value={fmt(arTotal)} color="green" />
        <SummaryTile label="AP Outstanding (AED)" value={fmt(apTotal)} color="red" />
      </div>

      {/* Sections grid — 3 columns */}
      <div className="grid grid-cols-3 gap-4">

        {/* 1. AR Aging */}
        <Section title="Receivables Aging" hint={`AED ${fmt(arTotal)} total`}>
          <div className="space-y-2.5">
            {fh.arAging.map((b) => (
              <div key={b.bucket}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-text-secondary">{b.bucket}</span>
                  <span className="font-mono font-semibold text-text-primary">AED {fmt(b.amount)}</span>
                </div>
                <MiniBar amount={b.amount} max={arMax} color="#15803D" />
              </div>
            ))}
          </div>
        </Section>

        {/* 2. AP Aging */}
        <Section title="Payables Aging" hint={`AED ${fmt(apTotal)} total`}>
          <div className="space-y-2.5">
            {fh.apAging.map((b) => (
              <div key={b.bucket}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-text-secondary">{b.bucket}</span>
                  <span className="font-mono font-semibold text-text-primary">AED {fmt(b.amount)}</span>
                </div>
                <MiniBar amount={b.amount} max={apMax} color="#991B1B" />
              </div>
            ))}
          </div>
        </Section>

        {/* 3. Working Capital */}
        <Section title="Working Capital">
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Current Assets</span>
              <span className="font-mono font-semibold text-text-primary">AED {fmt(fh.workingCapital.currentAssets)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Current Liabilities</span>
              <span className="font-mono font-semibold text-text-primary">AED {fmt(fh.workingCapital.currentLiabilities)}</span>
            </div>
            <div className="border-t border-border-subtle pt-2.5 flex items-center justify-between">
              <span className="text-text-primary font-medium">Working Capital</span>
              <span className="font-mono font-bold text-status-success-text">AED {fmt(fh.workingCapital.workingCapital)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Current Ratio</span>
              <span className="font-mono font-semibold text-dq-orange">{fh.workingCapital.currentRatio.toFixed(2)}</span>
            </div>
          </div>
        </Section>

        {/* 4. Revenue Forecast */}
        <Section title="Revenue Forecast" hint="Next 6 months">
          <table className="w-full text-xs">
            <tbody>
              {fh.revenueForecast.map((r) => (
                <tr key={r.month} className="border-b border-border-subtle last:border-b-0">
                  <td className="py-2 text-text-secondary">{r.month}</td>
                  <td className="py-2 text-right font-mono font-semibold text-status-success-text">AED {fmt(r.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* 5. Expense Forecast */}
        <Section title="Expense Forecast" hint="Next 6 months">
          <table className="w-full text-xs">
            <tbody>
              {fh.expenseForecast.map((r) => (
                <tr key={r.month} className="border-b border-border-subtle last:border-b-0">
                  <td className="py-2 text-text-secondary">{r.month}</td>
                  <td className="py-2 text-right font-mono font-semibold text-status-error-text">AED {fmt(r.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* 6. VAT Credit Report */}
        <Section title="VAT Credit Report" hint={`Filing due ${fh.vatCredit.nextFilingDue}`}>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Input VAT (Q2)</span>
              <span className="font-mono font-semibold text-text-primary">AED {fmt(fh.vatCredit.inputVatQ2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Output VAT (Q2)</span>
              <span className="font-mono font-semibold text-text-primary">AED {fmt(fh.vatCredit.outputVatQ2)}</span>
            </div>
            <div className="border-t border-border-subtle pt-2.5 flex items-center justify-between">
              <span className="text-text-primary font-medium">Net VAT Payable</span>
              <span className="font-mono font-bold text-status-error-text">AED {fmt(fh.vatCredit.netVatPayable)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Open Credits</span>
              <span className="font-mono font-semibold text-status-success-text">AED {fmt(fh.vatCredit.openCredits)}</span>
            </div>
          </div>
        </Section>

        {/* 7. Milestones Upcoming — full width */}
        <Section title="Milestones Upcoming" hint={`${upcoming.length} active`} span={3}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Milestone</th>
                <th className="text-left py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Project</th>
                <th className="text-left py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Owner</th>
                <th className="text-left py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Due</th>
                <th className="text-left py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Completion</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((m) => {
                const project = projects.find((p) => p.id === m.projectId)
                const isProblem = m.status === 'Overdue' || m.status === 'Delayed'
                return (
                  <tr key={m.id} className="border-b border-border-subtle last:border-b-0">
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <RequestIDTag id={m.id} />
                        <span className="text-text-primary">{m.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-text-secondary text-xs">{project?.name}</td>
                    <td className="py-2.5 text-text-secondary text-xs">{m.owner}</td>
                    <td className="py-2.5 text-text-muted text-xs">{m.dueDate}</td>
                    <td className="py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-pill text-[11px] font-medium ${
                        isProblem ? 'bg-status-error-surface text-status-error-text' :
                        m.status === 'In Progress' ? 'bg-status-info-surface text-status-info-text' :
                        'bg-surface-1 text-text-secondary'
                      }`}>
                        {isProblem && <AlertCircle size={12} strokeWidth={2} />}
                        {m.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono text-xs font-semibold">{m.completionPct}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Section>

        {/* 8. Trial Balance — span 2 */}
        <Section title="Trial Balance" hint={`Dr/Cr balanced at AED ${fmt(tbTotalDr)}`} span={2}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Account</th>
                <th className="text-right py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Debit (AED)</th>
                <th className="text-right py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Credit (AED)</th>
              </tr>
            </thead>
            <tbody>
              {fh.trialBalance.map((r) => (
                <tr key={r.account} className="border-b border-border-subtle last:border-b-0">
                  <td className="py-2 text-text-secondary text-xs">{r.account}</td>
                  <td className="py-2 text-right font-mono text-xs font-semibold">{r.debit > 0 ? fmt(r.debit) : '—'}</td>
                  <td className="py-2 text-right font-mono text-xs font-semibold">{r.credit > 0 ? fmt(r.credit) : '—'}</td>
                </tr>
              ))}
              <tr className="bg-surface-1">
                <td className="py-2 font-semibold text-text-primary">Total</td>
                <td className="py-2 text-right font-mono font-bold text-dq-navy">{fmt(tbTotalDr)}</td>
                <td className="py-2 text-right font-mono font-bold text-dq-navy">{fmt(tbTotalCr)}</td>
              </tr>
            </tbody>
          </table>
        </Section>

        {/* 9. Expense Summary */}
        <Section title="Expense Summary" hint="YTD by category">
          <div className="space-y-3">
            {fh.expenseSummary.map((e) => (
              <div key={e.category}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-text-secondary truncate pr-2">{e.category}</span>
                  <span className="font-mono font-semibold text-text-primary shrink-0">{e.pctOfTotal}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <MiniBar amount={e.amount} max={fh.expenseSummary[0].amount} color="#FB5535" />
                  <span className="font-mono text-[11px] text-text-muted w-20 text-right shrink-0">AED {fmt(e.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  )
}
