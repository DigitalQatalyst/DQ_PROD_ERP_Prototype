import { Link } from 'react-router-dom'
import { LayoutTemplate, FileCheck, GitMerge, Map, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface DesignCard {
  title: string
  description: string
  icon: ReactNode
  route: string
}

const cards: DesignCard[] = [
  {
    title: 'Request Template Browser',
    description: 'Preview every request template — fields, evidence, approval path, SLA — before you commit to submit.',
    icon: <LayoutTemplate size={20} strokeWidth={1.5} />,
    route: '/marketplace/design/templates',
  },
  {
    title: 'Evidence Checklist Library',
    description: 'Common evidence types — receipts, invoices, quotes, contracts, tax certs — what they are and when they’re required.',
    icon: <FileCheck size={20} strokeWidth={1.5} />,
    route: '/marketplace/design/evidence',
  },
  {
    title: 'Workflow Blueprints',
    description: 'Visual flow of common DWS.04 workflows — purchase, vendor onboarding, payment, period close.',
    icon: <GitMerge size={20} strokeWidth={1.5} />,
    route: '/marketplace/design/workflows',
  },
  {
    title: 'BC Mapping Reference',
    description: 'How DWS.04 records map to Business Central objects — fields, codes, and sync rules.',
    icon: <Map size={20} strokeWidth={1.5} />,
    route: '/bc-mapping',
  },
]

export default function DesignMarketplace() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
          S01 Marketplace · Design
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Design — Plan & prepare</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Shape the work before execution — preview templates, gather the right evidence, check the workflow, and confirm the integration mapping. Preparation surfaces, not submission surfaces.
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
