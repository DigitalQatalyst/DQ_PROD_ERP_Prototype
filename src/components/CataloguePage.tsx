import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

export interface CatalogueItem {
  title: string
  description: string
  icon: ReactNode
  approver: string
  sla: string
  evidence: string[]
  ctaLabel?: string
  ctaRoute?: string
}

interface Props {
  title: string
  description: string
  brsId: string
  items: CatalogueItem[]
}

export default function CataloguePage({ title, description, brsId, items }: Props) {
  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <p
          className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2"
          style={{ letterSpacing: '0.12em' }}
        >
          S01 Marketplace · {brsId}
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">{title}</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">{description}</p>
      </div>

      {/* Catalogue grid */}
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-card border border-border-subtle shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow"
          >
            {/* Title block */}
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-btn flex items-center justify-center shrink-0 text-dq-orange"
                style={{ background: '#FFF5F2' }}
              >
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-text-primary leading-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-[13px] text-text-muted leading-relaxed">{item.description}</p>
              </div>
            </div>

            {/* Preview metadata — F-S1-08 / F-S1-09 */}
            <div className="space-y-1.5 text-xs mt-3 pt-3 border-t border-border-subtle">
              <div className="flex justify-between gap-3">
                <span className="text-text-muted shrink-0">Approver</span>
                <span className="text-text-secondary font-medium text-right truncate">
                  {item.approver}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-text-muted shrink-0">Expected SLA</span>
                <span className="text-text-secondary font-medium">{item.sla}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-text-muted shrink-0">
                  Evidence ({item.evidence.length})
                </span>
                <span className="text-text-secondary text-right text-[11px] truncate">
                  {item.evidence.join(' · ')}
                </span>
              </div>
            </div>

            {/* CTA */}
            <Link
              to={item.ctaRoute ?? '/request-intake'}
              className="mt-4 inline-flex items-center justify-center gap-1.5 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {item.ctaLabel ?? 'Start request'}
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
