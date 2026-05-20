import { TrendingUp, TrendingDown, Clock, AlertTriangle } from 'lucide-react'
import { kpis, requests, costCentres } from '../data/fixtures'

const spendTrend = [
  { month: 'Jan', amount: 142000 },
  { month: 'Feb', amount: 168000 },
  { month: 'Mar', amount: 195000 },
  { month: 'Apr', amount: 187000 },
  { month: 'May', amount: 186400 },
]

const maxAmount = Math.max(...spendTrend.map(d => d.amount))

const approvalMetrics = [
  { label: 'Avg approval cycle time', value: `${kpis.avgRequestCycleTime} days`, trend: 'up', detail: '+0.4 days vs last month' },
  { label: 'Overdue approvals', value: `${kpis.overdueApprovals}`, trend: 'up', detail: '4 more than last period' },
  { label: 'First-pass approval rate', value: '74%', trend: 'down', detail: 'Target: 85%' },
  { label: 'Evidence rejection rate', value: '18%', trend: 'up', detail: 'Up from 12% — training recommended' },
]

export default function FinanceInsights() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Finance Insights</h1>
      <p className="text-sm text-text-muted mb-6">AI-generated finance analytics covering spend trends, approval cycle times, and budget health indicators.</p>

      {/* KPI strip */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">30-Day Payment Exposure</p>
          <p className="text-xl font-bold font-mono text-text-primary">AED {kpis.paymentExposure30d.toLocaleString()}</p>
          <p className="text-xs text-status-warning-text mt-1 flex items-center gap-1"><TrendingUp size={11} strokeWidth={1.5} /> +12% vs prior period</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Budget Consumed YTD</p>
          <p className="text-xl font-bold font-mono text-text-primary">{kpis.budgetConsumedPct}%</p>
          <p className="text-xs text-text-muted mt-1">AED {(kpis.budgetConsumedAmount / 1000000).toFixed(1)}M of AED {(kpis.budgetTotal / 1000000).toFixed(1)}M</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Active Requests</p>
          <p className="text-xl font-bold font-mono text-text-primary">{kpis.totalActiveRequests}</p>
          <p className="text-xs text-status-warning-text mt-1 flex items-center gap-1"><AlertTriangle size={11} strokeWidth={1.5} /> {kpis.overdueApprovals} overdue</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Avg Request Cycle Time</p>
          <p className="text-xl font-bold font-mono text-text-primary">{kpis.avgRequestCycleTime}d</p>
          <p className="text-xs text-status-error-text mt-1 flex items-center gap-1"><TrendingUp size={11} strokeWidth={1.5} /> Above target (2.5d)</p>
        </div>
      </div>

      {/* Spend trend chart */}
      <div className="p-5 bg-white rounded-card border border-border-subtle shadow-sm mb-6">
        <p className="text-sm font-semibold text-text-primary mb-4">Monthly Payment Exposure — 2026 YTD</p>
        <div className="flex items-end gap-4 h-32">
          {spendTrend.map((d) => (
            <div key={d.month} className="flex flex-col items-center gap-2 flex-1">
              <span className="text-xs font-mono text-text-muted">AED {(d.amount / 1000).toFixed(0)}K</span>
              <div
                className="w-full rounded-t bg-dq-navy opacity-80"
                style={{ height: `${(d.amount / maxAmount) * 80}px` }}
              />
              <span className="text-xs text-text-muted">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Approval cycle metrics */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {approvalMetrics.map((m) => (
          <div key={m.label} className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
            <p className="text-xs text-text-muted mb-1">{m.label}</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold font-mono text-text-primary">{m.value}</p>
              {m.trend === 'up' ? (
                <TrendingUp size={16} className="text-status-error" strokeWidth={1.5} />
              ) : (
                <TrendingDown size={16} className="text-status-success" strokeWidth={1.5} />
              )}
            </div>
            <p className="text-xs text-text-muted mt-1">{m.detail}</p>
          </div>
        ))}
      </div>

      {/* AI observation */}
      <div className="p-4 bg-navy-50 rounded-card border border-dq-navy/10">
        <p className="text-xs font-semibold text-dq-navy mb-2">AI Observation — 20 May 2026</p>
        <p className="text-sm text-text-secondary leading-relaxed">Evidence rejection rate has increased 6 percentage points this period, primarily driven by missing per-diem breakdowns in travel claims. Recommend issuing updated expense submission guidance to requestors. Approval cycle time for invoice payments exceeds target by 35% — the Mazrui Holdings and Anthropic invoices account for most of the delay.</p>
      </div>
    </div>
  )
}
