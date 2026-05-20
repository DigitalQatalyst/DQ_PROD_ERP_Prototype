import { Construction } from 'lucide-react'

interface Props {
  title: string
  description?: string
  phase?: string
}

export default function PlaceholderPage({
  title,
  description = 'This screen is in scope for the Full Prototype iteration. Fixture data and interactions will be fully built in the next sprint.',
  phase = 'Full Prototype',
}: Props) {
  return (
    <div className="flex items-start justify-center pt-16">
      <div
        className="w-full max-w-xl rounded-card p-10 text-center"
        style={{
          border: '1px dashed var(--color-border-default)',
          background: '#fff',
        }}
      >
        <Construction size={48} className="text-dq-orange mx-auto mb-5" strokeWidth={1.5} />
        <h1 className="text-xl font-semibold text-text-primary mb-3">{title}</h1>
        <p className="text-sm text-text-muted mb-5 max-w-sm mx-auto leading-relaxed">{description}</p>
        <span
          className="inline-flex items-center rounded-pill px-3 py-1 text-[12px] font-semibold"
          style={{ background: '#EEF2FF', color: '#030F35' }}
        >
          Coming in {phase}
        </span>
      </div>
    </div>
  )
}
