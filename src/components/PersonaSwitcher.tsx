import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { usePersona } from '../context/PersonaContext'
import type { PersonaId } from '../types'

export default function PersonaSwitcher() {
  const { activePersona, personas, switchPersona } = usePersona()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handleSelect = (id: PersonaId) => {
    switchPersona(id)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-pill px-3 py-1.5 text-white text-[12px] font-medium transition-colors"
        style={{ background: '#1A2B5E' }}
      >
        <span className="font-semibold">{activePersona.initials}</span>
        <span className="text-white/80">
          Viewing as: {activePersona.name} — {activePersona.roleLabel.split(' ')[0]}
        </span>
        <ChevronDown size={14} strokeWidth={1.5} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] w-72 bg-white rounded-card shadow-lg z-50 py-2 border border-border-subtle"
        >
          <p
            className="px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-text-muted"
          >
            Switch Persona
          </p>
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id as PersonaId)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-1 transition-colors text-left"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-semibold shrink-0"
                style={{ background: '#0D2199' }}
              >
                {p.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{p.name}</p>
                <p className="text-[11px] text-text-muted truncate">{p.roleLabel}</p>
              </div>
              {p.id === activePersona.id && (
                <span
                  className="w-2 h-2 rounded-full bg-dq-orange shrink-0"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
