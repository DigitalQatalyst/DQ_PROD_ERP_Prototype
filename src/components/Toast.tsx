import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { CheckCircle, Info, X } from 'lucide-react'

interface ToastMessage {
  id: string
  message: string
  variant: 'success' | 'info'
  duration?: number
}

interface ToastContextValue {
  showToast: (message: string, variant?: 'success' | 'info', duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const show = setTimeout(() => setVisible(true), 10)
    const hide = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onRemove(toast.id), 300)
    }, toast.duration ?? 4000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [toast.id, toast.duration, onRemove])

  const isSuccess = toast.variant === 'success'

  return (
    <div
      className="flex items-start gap-3 rounded-card px-4 py-3 shadow-lg min-w-[300px] max-w-sm"
      style={{
        background: isSuccess ? '#DCFCE7' : '#DBEAFE',
        color: isSuccess ? '#15803D' : '#1D4ED8',
        transform: visible ? 'translateX(0)' : 'translateX(20px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 300ms ease-out, opacity 300ms ease-out',
      }}
    >
      {isSuccess ? (
        <CheckCircle size={18} strokeWidth={1.5} className="shrink-0 mt-0.5" />
      ) : (
        <Info size={18} strokeWidth={1.5} className="shrink-0 mt-0.5" />
      )}
      <span className="text-sm font-medium flex-1">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X size={16} strokeWidth={1.5} />
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback(
    (message: string, variant: 'success' | 'info' = 'success', duration = 4000) => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev, { id, message, variant, duration }])
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
