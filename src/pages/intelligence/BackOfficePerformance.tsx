import { useMemo } from 'react'
import { Briefcase, AlertTriangle, TrendingUp, Users } from 'lucide-react'
import SummaryTile from '../../components/SummaryTile'
import { adminRequests } from '../../data/fixtures'
import type { AdminRequestType } from '../../types'

// Volume by service type
function buildVolumeByType() {
  const counts: Record<string, { total: number; breached: number; fulfilled: number; avgDays: number; totalDays: number }> = {}
  adminRequests.forEach((r) => {
    if (!counts[r.type]) counts[r.type] = { total: 0, breached: 0, fulfilled: 0, avgDays: 0, totalDays: 0 }
    counts[r.type].total += 1
    counts[r.type].totalDays += r.daysOpen
    if (r.daysOpen > r.slaDays) counts[r.type].breached += 1
    if (r.status === 'Fulfilled') counts[r.type].fulfilled += 1
  })
  return Object.entries(counts).map(([type, m]) => ({
    type: type as AdminRequestType,
    ...m,
    avgDays: m.totalDays / Math.max(1, m.total),
  }))
}

// Owner load
function buildOwnerLoad() {
  const counts: Record<string, number> = {}
  adminRequests.filter((r) => r.status !== 'Fulfilled').forEach((r) => {
    counts[r.owner] = (counts[r.owner] ?? 0) + 1
  })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
}

// Synthetic week-over-week trend per type (mock)
const trendByType: Record<string, 'up' | 'down' | 'flat'> = {
  'Travel': 'up',
  'Visa / Admin': 'flat',
  'Office Supplies': 'down',
  'Document Support': 'up',
  'Facilities': 'flat',
  'Business Card / Letter': 'down',
}

export default function BackOfficePerformance() {
  const volume = useMemo(buildVolumeByType, [])
  const ownerLoad = useMemo(buildOwnerLoad, [])

  const totalReqs = adminRequests.length
  const totalBreached = adminRequests.filter((r) => r.daysOpen > r.slaDays && r.status !== 'Fulfilled').length
  const fulfilmentRate = Math.round(
    (adminRequests.filter((r) => r.status === 'Fulfilled').length / totalReqs) * 100
  )
  const avgCycle = (adminRequests.reduce((s, r) => s + r.daysOpen, 0) / totalReqs).toFixed(1)

  const maxVolume = Math.max(...volume.map((v) => v.total))

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Back-Office Performance Intelligence</h1>
      <p className="text-sm text-text-muted mb-6">
        Fulfilment volume, SLA breaches, demand by service type, backlog trends, and operator load — performance signals for Admin & Back-Office ownership.
      </p>

      {/* Top tiles */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <SummaryTile label="Total Requests (period)" value={String(totalReqs)} color="navy" />
        <SummaryTile label="Fulfilment Rate" value={`${fulfilmentRate}%`} color="green" />
        <SummaryTile label="SLA Breached" value={String(totalBreached)} color="red" />
        <SummaryTile label="Avg Cycle (days)" value={avgCycle} color="brown" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Volume by service type */}
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Briefcase size={16} className="text-dq-orange" strokeWidth={1.5} />
            Volume by Service Type
          </h3>
          <div className="space-y-3">
            {volume.map((v) => {
              const pct = (v.total / maxVolume) * 100
              const trend = trendByType[v.type] ?? 'flat'
              return (
                <div key={v.type}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-text-secondary truncate pr-2">{v.type}</span>
                    <span className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold ${
                        trend === 'up' ? 'text-status-success-text' :
                        trend === 'down' ? 'text-status-error-text' : 'text-text-muted'
                      }`}>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}</span>
                      <span className="font-mono font-semibold text-text-primary">{v.total}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-pill overflow-hidden" style={{ background: '#EEEFF6' }}>
                      <div className="h-full rounded-pill" style={{ width: `${pct}%`, background: '#FB5535' }} />
                    </div>
                    <span className="text-[11px] font-mono text-text-muted w-32 text-right shrink-0">
                      avg {v.avgDays.toFixed(1)}d · {v.breached} breach
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* SLA breach by type */}
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <AlertTriangle size={16} className="text-dq-orange" strokeWidth={1.5} />
            SLA Performance by Type
          </h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-2 text-text-muted uppercase tracking-wider font-semibold">Type</th>
                <th className="text-right py-2 text-text-muted uppercase tracking-wider font-semibold">Total</th>
                <th className="text-right py-2 text-text-muted uppercase tracking-wider font-semibold">Breached</th>
                <th className="text-right py-2 text-text-muted uppercase tracking-wider font-semibold">Breach %</th>
              </tr>
            </thead>
            <tbody>
              {volume.map((v) => {
                const pct = Math.round((v.breached / v.total) * 100)
                return (
                  <tr key={v.type} className="border-b border-border-subtle last:border-b-0">
                    <td className="py-2 text-text-secondary">{v.type}</td>
                    <td className="py-2 text-right font-mono font-semibold">{v.total}</td>
                    <td className="py-2 text-right font-mono font-semibold" style={{ color: v.breached > 0 ? '#B91C1C' : '#5F607F' }}>{v.breached}</td>
                    <td className="py-2 text-right font-mono font-semibold" style={{ color: pct > 25 ? '#B91C1C' : pct > 0 ? '#B45309' : '#15803D' }}>
                      {pct}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Owner load */}
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Users size={16} className="text-dq-orange" strokeWidth={1.5} />
            Operator Load
          </h3>
          <div className="space-y-2">
            {ownerLoad.map(([owner, count]) => {
              const pct = (count / ownerLoad[0][1]) * 100
              return (
                <div key={owner}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-text-secondary">{owner}</span>
                    <span className="font-mono font-semibold text-text-primary">{count} open</span>
                  </div>
                  <div className="h-1.5 rounded-pill overflow-hidden" style={{ background: '#EEEFF6' }}>
                    <div className="h-full rounded-pill" style={{ width: `${pct}%`, background: '#030F35' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Backlog trend */}
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-dq-orange" strokeWidth={1.5} />
            Backlog Trend (last 6 weeks)
          </h3>
          <table className="w-full text-xs">
            <tbody>
              {[
                { week: 'Week of 13 Apr', open: 4, fulfilled: 12 },
                { week: 'Week of 20 Apr', open: 6, fulfilled: 9 },
                { week: 'Week of 27 Apr', open: 5, fulfilled: 11 },
                { week: 'Week of 04 May', open: 7, fulfilled: 8 },
                { week: 'Week of 11 May', open: 6, fulfilled: 10 },
                { week: 'Week of 18 May', open: 5, fulfilled: 2 },
              ].map((w) => (
                <tr key={w.week} className="border-b border-border-subtle last:border-b-0">
                  <td className="py-2 text-text-secondary">{w.week}</td>
                  <td className="py-2 text-right font-mono">
                    <span className="text-status-warning-text font-semibold">{w.open} open</span>
                    <span className="text-text-muted"> · </span>
                    <span className="text-status-success-text font-semibold">{w.fulfilled} done</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
