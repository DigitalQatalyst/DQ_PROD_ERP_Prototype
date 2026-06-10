import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ListOrdered, Inbox, AlertTriangle, Search, AlertOctagon, Zap, AlertCircle,
  ArrowRight, Activity, CheckCircle2, MessageCircle,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { marketplaceItems, domains, type RequestDomain } from '../../data/marketplaceItems'
import { getActivity } from '../../data/journeyContent'

interface DriveCard {
  title: string
  description: string
  icon: ReactNode
  route: string
  meta?: string
  metaTone?: 'error' | 'warning' | 'info'
}

const tools: DriveCard[] = [
  { title: 'Request Tracker',            description: 'Follow every request from draft through fulfilment — your own and across the platform.', icon: <ListOrdered size={20} strokeWidth={1.5} />, route: '/request-tracker', meta: '47 active', metaTone: 'info' },
  { title: 'Approval Console',           description: 'Decision queue for approvers — review, approve, return, or escalate pending requests.',     icon: <Inbox size={20} strokeWidth={1.5} />, route: '/approval-console', meta: '23 pending', metaTone: 'warning' },
  { title: 'Escalations & Exceptions',   description: 'Blocked, overdue, missing-evidence, and high-value items needing intervention.',           icon: <AlertTriangle size={20} strokeWidth={1.5} />, route: '/escalations', meta: '6 escalated', metaTone: 'error' },
  { title: 'Audit Trail Explorer',       description: 'Search every state change, decision, evidence upload, and override across DWS.04.',         icon: <Search size={20} strokeWidth={1.5} />, route: '/audit-trail' },
  { title: 'Sync Error Queue',           description: 'Failed Business Central syncs — assign, retry, ignore with reason, or escalate.',           icon: <AlertOctagon size={20} strokeWidth={1.5} />, route: '/sync-error-queue', meta: '3 failed', metaTone: 'error' },
  { title: 'AI Briefs & Recommendations', description: 'Cross-cutting AI summaries and improvement signals — finance, procurement, HR, inventory.', icon: <Zap size={20} strokeWidth={1.5} />, route: '/ai-briefs' },
  { title: 'Risk / Exception Alerts',    description: 'Operating risks, budget exposures, vendor flags, sync failures, renewal warnings.',        icon: <AlertCircle size={20} strokeWidth={1.5} />, route: '/risk-alerts' },
]

const metaStyle = {
  error: 'bg-status-error-surface text-status-error-text',
  warning: 'bg-status-warning-surface text-status-warning-text',
  info: 'bg-status-info-surface text-status-info-text',
}

type Filter = 'All' | RequestDomain

export default function DriveMarketplace() {
  const [filter, setFilter] = useState<Filter>('All')

  const filters: Filter[] = ['All', ...domains]

  const filtered = useMemo(
    () => marketplaceItems.filter((i) => filter === 'All' || i.domain === filter),
    [filter]
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Drive — Track, govern & improve</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Monitor progress, manage outcomes, resolve blockers, govern performance. Cross-cutting tracking surfaces plus per-request-type drill-down.
        </p>
      </div>

      {/* Universal tools */}
      <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3" style={{ letterSpacing: '0.12em' }}>
        Universal Tools
      </p>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {tools.map((c) => (
          <Link
            key={c.route}
            to={c.route}
            className="bg-white rounded-card border border-border-subtle shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-btn flex items-center justify-center shrink-0 text-dq-orange" style={{ background: '#FFF5F2' }}>
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-text-primary leading-tight">{c.title}</h3>
                {c.meta && (
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-pill text-[10px] font-semibold ${metaStyle[c.metaTone ?? 'info']}`}>
                    {c.meta}
                  </span>
                )}
              </div>
            </div>
            <p className="text-[13px] text-text-muted leading-relaxed flex-1">{c.description}</p>
            <div className="mt-3 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
              <span className="text-text-muted">Open workspace</span>
              <ArrowRight size={14} strokeWidth={2} className="text-dq-orange" />
            </div>
          </Link>
        ))}
      </div>

      {/* Per-item grid */}
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted" style={{ letterSpacing: '0.12em' }}>
          Track by Request Type
        </p>
        <p className="text-[11px] text-text-muted">{filtered.length} of {marketplaceItems.length} request types</p>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-pill text-xs font-semibold transition-colors ${
              filter === f
                ? 'bg-dq-navy text-white'
                : 'bg-surface-1 text-text-secondary hover:bg-border-subtle'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((item) => {
          const activity = getActivity(item.id)
          const hasActivity = activity.inProgress > 0 || activity.awaitingClarification > 0 || activity.approvedThisWeek > 0

          return (
            <Link
              key={item.id}
              to={`/marketplace/journey/${item.id}?stage=Drive`}
              className="bg-white rounded-card border border-border-subtle shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-btn flex items-center justify-center shrink-0 text-dq-orange" style={{ background: '#FFF5F2' }}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary leading-tight">{item.title}</h3>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">{item.domain}</p>
                </div>
              </div>

              {/* Tracking surfaces */}
              <div className="mb-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Activity size={12} className="text-text-muted" strokeWidth={1.5} />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Tracking surfaces</p>
                </div>
                <ul className="space-y-0.5 text-[11px] text-text-secondary">
                  <li>• Request Tracker (filter: {item.title})</li>
                  <li>• Approval Console</li>
                  <li>• Audit Trail</li>
                </ul>
              </div>

              {/* Current activity */}
              <div className="mb-3 pt-3 border-t border-border-subtle">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Current activity</p>
                {hasActivity ? (
                  <div className="space-y-1 text-[11px]">
                    {activity.inProgress > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary flex items-center gap-1"><Activity size={10} strokeWidth={1.5} /> In progress</span>
                        <span className="font-mono font-semibold text-status-info-text">{activity.inProgress}</span>
                      </div>
                    )}
                    {activity.awaitingClarification > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary flex items-center gap-1"><MessageCircle size={10} strokeWidth={1.5} /> Awaiting clarification</span>
                        <span className="font-mono font-semibold text-status-warning-text">{activity.awaitingClarification}</span>
                      </div>
                    )}
                    {activity.approvedThisWeek > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary flex items-center gap-1"><CheckCircle2 size={10} strokeWidth={1.5} /> Approved this week</span>
                        <span className="font-mono font-semibold text-status-success-text">{activity.approvedThisWeek}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-[11px] text-text-muted italic">No activity this week</p>
                )}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-3 border-t border-border-subtle flex items-center justify-between">
                <span className="text-xs font-semibold text-dq-orange">Track</span>
                <ArrowRight size={12} strokeWidth={2} className="text-dq-orange" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
