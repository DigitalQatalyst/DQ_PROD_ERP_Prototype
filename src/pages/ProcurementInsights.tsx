import { TrendingUp, TrendingDown, RefreshCw, AlertTriangle } from 'lucide-react'
import { vendors, subscriptions, kpis } from '../data/fixtures'

const vendorMetrics = [
  { vendor: 'Microsoft (MENA)', bcSync: 'Synced', ytdSpend: 214000, category: 'SaaS/ERP', riskLevel: 'Low' },
  { vendor: 'Mazrui Holdings Ltd.', bcSync: 'Synced', ytdSpend: 90000, category: 'Services', riskLevel: 'Medium' },
  { vendor: 'Gulf Recruitment Corp.', bcSync: 'Synced', ytdSpend: 96000, category: 'HR/Staffing', riskLevel: 'Low' },
  { vendor: 'Anthropic', bcSync: 'Failed', ytdSpend: 42000, category: 'AI Services', riskLevel: 'High' },
  { vendor: 'Vercel Inc.', bcSync: 'Synced', ytdSpend: 18400, category: 'SaaS/Cloud', riskLevel: 'Low' },
]

const riskColor: Record<string, string> = {
  Low: 'bg-status-success-surface text-status-success-text',
  Medium: 'bg-status-warning-surface text-status-warning-text',
  High: 'bg-status-error-surface text-status-error-text',
}

const urgentRenewals = subscriptions.filter(s => s.daysUntilRenewal <= 30 && !s.autoRenew)

export default function ProcurementInsights() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Procurement Insights</h1>
      <p className="text-sm text-text-muted mb-6">Procurement analytics including vendor performance, PO cycle times, and renewal risk summary.</p>

      {/* KPI strip */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Open Purchase Requests</p>
          <p className="text-xl font-bold font-mono text-text-primary">{kpis.openPurchaseRequests}</p>
          <p className="text-xs text-text-muted mt-1">2 high-value pending</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">PO Commitment Exposure</p>
          <p className="text-xl font-bold font-mono text-text-primary">AED {(kpis.poCommitmentExposure / 1000).toFixed(0)}K</p>
          <p className="text-xs text-status-warning-text mt-1 flex items-center gap-1"><TrendingUp size={11} strokeWidth={1.5} /> +18% vs last month</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Vendor Actions Pending</p>
          <p className="text-xl font-bold font-mono text-text-primary">{kpis.pendingVendorActions}</p>
          <p className="text-xs text-status-error-text mt-1 flex items-center gap-1"><AlertTriangle size={11} strokeWidth={1.5} /> 1 sync failure</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">Renewals Due (30d)</p>
          <p className="text-xl font-bold font-mono text-text-primary">{kpis.renewalsDue30d}</p>
          <p className="text-xs text-status-error-text mt-1">{urgentRenewals.length} require manual action</p>
        </div>
      </div>

      {/* Vendor performance */}
      <p className="text-sm font-semibold text-text-primary mb-3">Top Vendors by YTD Spend</p>
      <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-1 border-b border-border-subtle">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Vendor</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">YTD Spend</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">BC Sync</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Risk Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {vendorMetrics.sort((a, b) => b.ytdSpend - a.ytdSpend).map((v, i) => (
              <tr key={i} className="hover:bg-surface-1 transition-colors">
                <td className="px-5 py-3 text-sm font-medium text-text-primary">{v.vendor}</td>
                <td className="px-4 py-3 text-sm text-text-secondary">{v.category}</td>
                <td className="px-4 py-3 text-right font-mono text-sm font-bold text-text-primary">AED {v.ytdSpend.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${v.bcSync === 'Synced' ? 'bg-status-success-surface text-status-success-text' : 'bg-status-error-surface text-status-error-text'}`}>{v.bcSync}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold rounded-pill px-2 py-0.5 ${riskColor[v.riskLevel]}`}>{v.riskLevel}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Renewal risk */}
      <p className="text-sm font-semibold text-text-primary mb-3">Renewal Risk — Upcoming 30 Days</p>
      <div className="space-y-2">
        {urgentRenewals.map((sub) => (
          <div key={sub.id} className="flex items-center gap-4 p-4 bg-status-error-surface rounded-card border border-status-error/20">
            <AlertTriangle size={16} className="text-status-error shrink-0" strokeWidth={1.5} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary">{sub.name}</p>
              <p className="text-xs text-text-muted">Renews {sub.renewalDate} · {sub.daysUntilRenewal} days · AED {sub.amount.toLocaleString()}/yr · Owner: {sub.owner}</p>
            </div>
            <span className="text-xs font-semibold text-status-error-text">{sub.actionRequired}</span>
          </div>
        ))}
        {subscriptions.filter(s => s.daysUntilRenewal <= 30 && s.autoRenew).map((sub) => (
          <div key={sub.id} className="flex items-center gap-4 p-4 bg-surface-1 rounded-card border border-border-subtle">
            <RefreshCw size={16} className="text-text-muted shrink-0" strokeWidth={1.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">{sub.name}</p>
              <p className="text-xs text-text-muted">Renews {sub.renewalDate} · Auto-renew ON · AED {sub.amount.toLocaleString()}/yr</p>
            </div>
            <span className="text-xs font-semibold text-status-success-text bg-status-success-surface rounded-pill px-2 py-0.5">Auto-renew</span>
          </div>
        ))}
      </div>

      {/* AI observation */}
      <div className="mt-6 p-4 bg-navy-50 rounded-card border border-dq-navy/10">
        <p className="text-xs font-semibold text-dq-navy mb-2">AI Observation — 20 May 2026</p>
        <p className="text-sm text-text-secondary leading-relaxed">2 subscriptions (Loom Business, Anthropic API Credits) require manual renewal decisions in the next 13 days. Deferring these past their renewal dates will result in service disruption. Recommend escalating Loom Business to Jay Nair for a cost-benefit decision — AED 4,100/yr with limited usage data available.</p>
      </div>
    </div>
  )
}
