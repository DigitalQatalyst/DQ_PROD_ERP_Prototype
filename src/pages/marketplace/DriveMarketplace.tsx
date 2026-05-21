import { Link } from 'react-router-dom'
import {
  ListOrdered, Inbox, AlertTriangle, Search, AlertOctagon, Zap, AlertCircle, ArrowRight,
} from 'lucide-react'
import type { ReactNode } from 'react'

interface DriveCard {
  title: string
  description: string
  icon: ReactNode
  route: string
  meta?: string
  metaTone?: 'error' | 'warning' | 'info'
}

const cards: DriveCard[] = [
  {
    title: 'Request Tracker',
    description: 'Follow every request from draft through fulfilment — your own and across the platform.',
    icon: <ListOrdered size={20} strokeWidth={1.5} />,
    route: '/request-tracker',
    meta: '47 active',
    metaTone: 'info',
  },
  {
    title: 'Approval Console',
    description: 'Decision queue for approvers — review, approve, return, or escalate pending requests.',
    icon: <Inbox size={20} strokeWidth={1.5} />,
    route: '/approval-console',
    meta: '23 pending',
    metaTone: 'warning',
  },
  {
    title: 'Escalations & Exceptions',
    description: 'Blocked, overdue, missing-evidence, and high-value items needing intervention.',
    icon: <AlertTriangle size={20} strokeWidth={1.5} />,
    route: '/escalations',
    meta: '6 escalated',
    metaTone: 'error',
  },
  {
    title: 'Audit Trail Explorer',
    description: 'Search every state change, decision, evidence upload, and override across DWS.04.',
    icon: <Search size={20} strokeWidth={1.5} />,
    route: '/audit-trail',
  },
  {
    title: 'Sync Error Queue',
    description: 'Failed Business Central syncs — assign, retry, ignore with reason, or escalate.',
    icon: <AlertOctagon size={20} strokeWidth={1.5} />,
    route: '/sync-error-queue',
    meta: '3 failed',
    metaTone: 'error',
  },
  {
    title: 'AI Briefs & Recommendations',
    description: 'Cross-cutting AI summaries and improvement signals — finance, procurement, project economics.',
    icon: <Zap size={20} strokeWidth={1.5} />,
    route: '/ai-briefs',
  },
  {
    title: 'Risk / Exception Alerts',
    description: 'Operating risks, budget exposures, vendor flags, sync failures, renewal warnings.',
    icon: <AlertCircle size={20} strokeWidth={1.5} />,
    route: '/risk-alerts',
  },
]

const metaStyle = {
  error: 'bg-status-error-surface text-status-error-text',
  warning: 'bg-status-warning-surface text-status-warning-text',
  info: 'bg-status-info-surface text-status-info-text',
}

export default function DriveMarketplace() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
          S01 Marketplace · Drive
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Drive — Track, govern & improve</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Monitor progress, manage outcomes, resolve blockers, govern performance. Every cross-cutting tracking and governance surface in DWS.04 — curated as one entry-point.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.route}
            to={c.route}
            className="bg-white rounded-card border border-border-subtle shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-btn flex items-center justify-center shrink-0 text-dq-orange"
                style={{ background: '#FFF5F2' }}
              >
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
    </div>
  )
}
