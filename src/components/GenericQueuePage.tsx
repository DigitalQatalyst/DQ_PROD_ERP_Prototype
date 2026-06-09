import { Inbox } from 'lucide-react'
import { useToast } from './Toast'

interface QueuePageProps {
  title: string
  description: string
  stat1Label: string
  stat1Value: string | number
  stat2Label: string
  stat2Value: string | number
  stat3Label: string
  stat3Value: string | number
  stat4Label: string
  stat4Value: string | number
  actionLabel?: string
}

export default function GenericQueuePage({
  title,
  description,
  stat1Label,
  stat1Value,
  stat2Label,
  stat2Value,
  stat3Label,
  stat3Value,
  stat4Label,
  stat4Value,
  actionLabel = 'Process Item',
}: QueuePageProps) {
  const { showToast } = useToast()

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">{title}</h1>
      <p className="text-sm text-text-muted mb-6">{description}</p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">{stat1Label}</p>
          <p className="text-2xl font-bold text-text-primary">{stat1Value}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">{stat2Label}</p>
          <p className="text-2xl font-bold text-status-warning-text">{stat2Value}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">{stat3Label}</p>
          <p className="text-2xl font-bold text-status-error-text">{stat3Value}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-text-muted mb-1">{stat4Label}</p>
          <p className="text-2xl font-bold text-status-success-text">{stat4Value}</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-border-subtle shadow-sm p-6">
        <div className="text-center py-12">
          <Inbox size={48} className="text-border-default mx-auto mb-4" strokeWidth={1} />
          <p className="text-sm text-text-muted mb-1">
            Operational queue displays here with live data integration.
          </p>
          <p className="text-xs text-text-disabled">
            Content synchronized with platform fixtures and BC sync status.
          </p>
          <button
            onClick={() => showToast(`${title} action triggered`, 'info')}
            className="mt-6 px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
