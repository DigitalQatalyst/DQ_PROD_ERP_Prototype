import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export default function SidePanel({ open, onClose, title, children, footer }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', onKey)
    }
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      {/* Overlay is transparent — underlying content stays accessible */}
      {open && (
        <div
          className="fixed inset-0 z-40 pointer-events-none"
          aria-hidden="true"
        />
      )}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-[400px] bg-white z-50 flex flex-col"
        style={{
          boxShadow: 'var(--shadow-lg)',
          borderRadius: '12px 0 0 12px',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 220ms ease-out',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b border-border-subtle"
          style={{ minHeight: 64 }}
        >
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-btn hover:bg-surface-1 text-text-muted transition-colors"
            aria-label="Close panel"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {children}
        </div>

        {/* Sticky footer */}
        {footer && (
          <div className="border-t border-border-subtle px-6 py-4 bg-white">
            {footer}
          </div>
        )}
      </div>
    </>
  )
}
