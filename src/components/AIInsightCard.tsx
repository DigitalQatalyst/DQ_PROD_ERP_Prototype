import { Zap } from 'lucide-react'

interface Props {
  children: React.ReactNode
  title?: string
}

export default function AIInsightCard({ children, title = 'AI Insight' }: Props) {
  return (
    <div
      className="rounded-card p-4 border-l-2"
      style={{
        background: '#FFF5F2',
        borderLeftColor: '#FB5535',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Zap size={16} className="text-dq-orange" strokeWidth={1.5} />
        <span
          className="text-[11px] font-semibold uppercase tracking-widest text-dq-orange"
        >
          {title}
        </span>
      </div>
      <p className="text-sm text-text-secondary italic leading-relaxed">{children}</p>
    </div>
  )
}
