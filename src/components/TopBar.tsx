import { Search, Bell } from 'lucide-react'
import { usePersona } from '../context/PersonaContext'
import PersonaSwitcher from './PersonaSwitcher'

export default function TopBar() {
  const { activePersona } = usePersona()

  return (
    <header
      className="fixed top-0 left-0 right-0 h-[60px] flex items-center px-6 gap-6 z-30"
      style={{
        background: '#030F35',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      {/* Logo */}
      <div className="flex flex-col shrink-0 w-[180px]">
        <div className="flex items-baseline gap-0">
          <span className="text-white font-bold text-base leading-none" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            DWS
          </span>
          <span
            className="font-bold text-base leading-none"
            style={{ color: '#FB5535', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            .04
          </span>
        </div>
        <span
          className="text-[11px] font-semibold uppercase tracking-widest mt-0.5"
          style={{ color: '#B5C5F7', letterSpacing: '0.12em' }}
        >
          Digital ERP
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 flex justify-center">
        <div
          className="relative w-[480px]"
        >
          <Search
            size={16}
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-muted"
          />
          <input
            type="text"
            placeholder="Search requests, vendors, projects, documents…"
            className="w-full h-9 pl-9 pr-4 text-sm bg-surface-1 border border-transparent rounded-input text-text-primary placeholder-text-muted focus:outline-none focus:border-dq-navy"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Notification bell */}
        <button className="relative p-1.5 text-white hover:text-white/80 transition-colors">
          <Bell size={20} strokeWidth={1.5} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: '#DC2626' }}
          />
        </button>

        {/* Persona switcher */}
        <PersonaSwitcher />

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-semibold cursor-default"
          style={{ background: '#0D2199' }}
        >
          {activePersona.initials}
        </div>
      </div>
    </header>
  )
}
