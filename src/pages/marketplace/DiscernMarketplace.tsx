import { Link } from 'react-router-dom'
import { Search, Sparkles, BookOpen, Scale, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface DiscernCard {
  title: string
  description: string
  icon: ReactNode
  route: string
}

const cards: DiscernCard[] = [
  {
    title: 'Discovery Search',
    description: 'Search across request templates, vendors, projects, and policies — filtered by your permissions.',
    icon: <Search size={20} strokeWidth={1.5} />,
    route: '/marketplace/search',
  },
  {
    title: 'Guided Request Assistant',
    description: 'Tell us what you need — we’ll recommend the right request type, approver, and evidence.',
    icon: <Sparkles size={20} strokeWidth={1.5} />,
    route: '/marketplace/discern/assistant',
  },
  {
    title: 'Policy Library',
    description: 'Expense, procurement, tax, travel, and data sovereignty policies that govern DQ operations.',
    icon: <BookOpen size={20} strokeWidth={1.5} />,
    route: '/marketplace/discern/policies',
  },
  {
    title: 'Threshold & Approval Reference',
    description: 'Who approves what — by amount, category, entity, and request type.',
    icon: <Scale size={20} strokeWidth={1.5} />,
    route: '/marketplace/discern/thresholds',
  },
]

export default function DiscernMarketplace() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
          S01 Marketplace · Discern
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Discern — Understand before acting</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Clarify the need, find the right path, and check what policy or threshold applies — before you submit anything. Decision support, search, and reference resources.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((c) => (
          <Link
            key={c.route}
            to={c.route}
            className="bg-white rounded-card border border-border-subtle shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-11 h-11 rounded-btn flex items-center justify-center shrink-0 text-dq-orange"
                style={{ background: '#FFF5F2' }}
              >
                {c.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary leading-tight">{c.title}</h3>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed flex-1">{c.description}</p>
            <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
              <span className="text-text-muted">Open</span>
              <ArrowRight size={14} strokeWidth={2} className="text-dq-orange" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
