import { useMemo } from 'react'
import { Users, TrendingUp, Calendar, HardDrive } from 'lucide-react'
import SummaryTile from '../../components/SummaryTile'
import { employees, hrRequests, leaveRequests, transitions, entities } from '../../data/fixtures'

// Synthetic cost data — would come from BC in production
const workforceCostYTD = 745000  // matches FinancialHealthReport expense summary
const avgMonthlyCost = Math.round(workforceCostYTD / 5)

interface CostByEntity {
  entity: string
  headcount: number
  monthlyCost: number
}

function fmt(n: number) { return n.toLocaleString() }

export default function WorkforceCostAnalytics() {
  const active = employees.filter((e) => e.status === 'Active').length
  const onboarding = employees.filter((e) => e.status === 'Onboarding').length
  const offboarding = employees.filter((e) => e.status === 'Offboarding').length

  const costByEntity: CostByEntity[] = useMemo(() => {
    return entities.map((ent) => {
      const headcount = employees.filter((e) => e.entity === ent.name).length
      return {
        entity: ent.name,
        headcount,
        monthlyCost: headcount * 12500,
      }
    })
  }, [])

  // HR request volume by type
  const hrVolume = useMemo(() => {
    const counts: Record<string, number> = {}
    hrRequests.forEach((r) => { counts[r.type] = (counts[r.type] ?? 0) + 1 })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [])

  // Leave taken (approved) by type
  const leaveByType = useMemo(() => {
    const counts: Record<string, number> = {}
    leaveRequests.filter((l) => l.status === 'Approved').forEach((l) => {
      counts[l.type] = (counts[l.type] ?? 0) + l.days
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [])

  const avgAssetsPerEmp = (employees.reduce((s, e) => s + e.assetsAssigned, 0) / employees.length).toFixed(1)
  const transitionsBacklog = transitions.filter((t) => t.status === 'In Progress').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Workforce Cost & HR Analytics</h1>
      <p className="text-sm text-text-muted mb-6">
        People-related costs, request volume, transition backlog, and employee asset exposure across DQ entities. Sources: HR records, transitions, asset custody, finance ledger.
      </p>

      {/* Top tiles */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <SummaryTile label="Workforce Cost YTD (AED)" value={fmt(workforceCostYTD)} color="navy" />
        <SummaryTile label="Avg Monthly Cost (AED)" value={fmt(avgMonthlyCost)} color="navy" />
        <SummaryTile label="Active Headcount" value={String(active)} color="green" />
        <SummaryTile label="Transitions Backlog" value={String(transitionsBacklog)} color="brown" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Cost by entity */}
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Users size={16} className="text-dq-orange" strokeWidth={1.5} />
            Cost by Entity
          </h3>
          <div className="space-y-3">
            {costByEntity.map((c) => {
              const pct = (c.monthlyCost / Math.max(...costByEntity.map((x) => x.monthlyCost))) * 100
              return (
                <div key={c.entity}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-text-secondary truncate pr-2">{c.entity}</span>
                    <span className="font-mono font-semibold">{c.headcount} hc</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-pill overflow-hidden" style={{ background: '#EEEFF6' }}>
                      <div className="h-full rounded-pill" style={{ width: `${pct}%`, background: '#030F35' }} />
                    </div>
                    <span className="text-[11px] font-mono text-text-muted w-20 text-right shrink-0">AED {fmt(c.monthlyCost)}/mo</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* HR request volume */}
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-dq-orange" strokeWidth={1.5} />
            HR Request Volume
          </h3>
          <div className="space-y-2">
            {hrVolume.map(([type, count]) => (
              <div key={type} className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">{type}</span>
                <span className="font-mono font-semibold text-text-primary">{count}</span>
              </div>
            ))}
            <div className="border-t border-border-subtle pt-2 mt-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-text-primary">Total</span>
              <span className="font-mono font-bold text-dq-orange">{hrRequests.length}</span>
            </div>
          </div>
        </div>

        {/* Leave taken */}
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-dq-orange" strokeWidth={1.5} />
            Leave Days Taken (approved)
          </h3>
          <div className="space-y-2">
            {leaveByType.map(([type, days]) => (
              <div key={type} className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">{type}</span>
                <span className="font-mono font-semibold text-text-primary">{days}d</span>
              </div>
            ))}
            <div className="border-t border-border-subtle pt-2 mt-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-text-primary">Total</span>
              <span className="font-mono font-bold text-dq-orange">{leaveByType.reduce((s, [_, d]) => s + (d as number), 0)}d</span>
            </div>
          </div>
        </div>

        {/* Transition state */}
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Workforce State</h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Active</span>
              <span className="font-mono font-bold text-status-success-text">{active}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Onboarding</span>
              <span className="font-mono font-bold text-status-info-text">{onboarding}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Offboarding</span>
              <span className="font-mono font-bold text-status-warning-text">{offboarding}</span>
            </div>
            <div className="border-t border-border-subtle pt-2 mt-2 flex items-center justify-between">
              <span className="text-text-primary font-semibold">Total</span>
              <span className="font-mono font-bold text-dq-navy">{employees.length}</span>
            </div>
          </div>
        </div>

        {/* Asset exposure */}
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <HardDrive size={16} className="text-dq-orange" strokeWidth={1.5} />
            Employee Asset Exposure
          </h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Total assets in custody</span>
              <span className="font-mono font-bold text-text-primary">{employees.reduce((s, e) => s + e.assetsAssigned, 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Avg per employee</span>
              <span className="font-mono font-bold text-text-primary">{avgAssetsPerEmp}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Return pending</span>
              <span className="font-mono font-bold text-status-warning-text">1</span>
            </div>
          </div>
        </div>

        {/* Admin / HR SLA trends */}
        <div className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">HR / Admin SLA Trends</h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-muted">HR Letters avg</span>
              <span className="font-mono font-semibold text-text-secondary">2.4 days <span className="text-status-success-text">↓</span></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Onboarding avg</span>
              <span className="font-mono font-semibold text-text-secondary">8.6 days <span className="text-status-warning-text">→</span></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Offboarding avg</span>
              <span className="font-mono font-semibold text-text-secondary">10.2 days <span className="text-status-error-text">↑</span></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Leave approval avg</span>
              <span className="font-mono font-semibold text-text-secondary">1.4 days <span className="text-status-success-text">↓</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
