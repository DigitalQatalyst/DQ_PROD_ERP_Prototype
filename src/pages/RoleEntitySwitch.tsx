import { usePersona } from '../context/PersonaContext'
import { entities } from '../data/fixtures'
import type { PersonaId } from '../types'
import { Check } from 'lucide-react'

export default function RoleEntitySwitch() {
  const { activePersona, personas, switchPersona } = usePersona()

  return (
    <div className="max-w-[700px]">
      <h1 className="text-2xl font-bold text-text-primary mb-1">Role / Entity Switch</h1>
      <p className="text-sm text-text-muted mb-8">Switch your active persona or entity context. Nav and content rescope instantly.</p>

      {/* Active persona */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3">Currently viewing as</p>
        <div className="flex items-center gap-4 p-4 bg-dq-navy rounded-card">
          <div className="w-12 h-12 rounded-full bg-dq-orange flex items-center justify-center text-white text-lg font-bold">
            {activePersona.initials}
          </div>
          <div>
            <p className="text-white font-semibold">{activePersona.name}</p>
            <p className="text-white/70 text-sm">{activePersona.roleLabel}</p>
            <p className="text-white/50 text-xs font-mono mt-0.5">{activePersona.role}</p>
          </div>
        </div>
      </div>

      {/* Switch persona */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3">Switch Persona</p>
        <div className="space-y-2">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => switchPersona(p.id as PersonaId)}
              className={`w-full flex items-center gap-4 p-4 rounded-card border transition-all text-left ${
                p.id === activePersona.id
                  ? 'border-dq-orange bg-orange-50'
                  : 'border-border-subtle bg-white hover:bg-surface-1'
              }`}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
                style={{ background: '#0D2199' }}
              >
                {p.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">{p.name}</p>
                <p className="text-xs text-text-muted">{p.roleLabel}</p>
                <p className="text-xs font-mono text-text-disabled">{p.role} · Landing: {p.landingRoute}</p>
              </div>
              {p.id === activePersona.id && (
                <Check size={18} className="text-dq-orange shrink-0" strokeWidth={2} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Entity context */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3">Operating Entities</p>
        <div className="space-y-2">
          {entities.map((e, i) => (
            <div
              key={e.name}
              className={`flex items-center justify-between p-4 rounded-card border ${
                i === 0 ? 'border-dq-orange bg-orange-50' : 'border-border-subtle bg-white'
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-text-primary">{e.name}</p>
                <p className="text-xs text-text-muted">{e.country} · {e.currency}</p>
              </div>
              <div className="flex items-center gap-2">
                {i === 0 && (
                  <span className="text-xs font-semibold text-dq-orange bg-orange-50 border border-dq-orange/30 rounded-pill px-2 py-0.5">
                    Active
                  </span>
                )}
                <button
                  className={`text-xs font-medium px-3 py-1.5 rounded-btn border ${
                    i === 0
                      ? 'border-border-default text-text-muted bg-white'
                      : 'border-dq-navy text-dq-navy hover:bg-dq-navy hover:text-white transition-colors'
                  }`}
                  disabled={i === 0}
                >
                  {i === 0 ? 'Current' : 'Switch'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
