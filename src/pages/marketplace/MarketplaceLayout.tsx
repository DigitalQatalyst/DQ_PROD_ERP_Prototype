import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom'
import { Search, PenTool, Send, Gauge } from 'lucide-react'

const tabs = [
  {
    num: '01',
    label: 'Discern',
    tagline: 'Understand',
    icon: <Search size={16} strokeWidth={1.5} />,
    route: '/marketplace/discern',
  },
  {
    num: '02',
    label: 'Design',
    tagline: 'Plan',
    icon: <PenTool size={16} strokeWidth={1.5} />,
    route: '/marketplace/design',
  },
  {
    num: '03',
    label: 'Deploy',
    tagline: 'Submit',
    icon: <Send size={16} strokeWidth={1.5} />,
    route: '/marketplace/deploy',
  },
  {
    num: '04',
    label: 'Drive',
    tagline: 'Track',
    icon: <Gauge size={16} strokeWidth={1.5} />,
    route: '/marketplace/drive',
  },
]

export default function MarketplaceLayout() {
  const { pathname } = useLocation()

  // Redirect bare /marketplace to Discern
  if (pathname === '/marketplace' || pathname === '/marketplace/') {
    return <Navigate to="/marketplace/discern" replace />
  }

  return (
    <div>
      {/* Section eyebrow */}
      <p
        className="text-[11px] font-semibold uppercase text-text-muted mb-4"
        style={{ letterSpacing: '0.12em' }}
      >
        Marketplace
      </p>

      {/* 4D Tab bar */}
      <div className="flex gap-1 mb-6 bg-white border border-border-subtle rounded-card p-1 w-fit">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.route)
          return (
            <NavLink
              key={tab.route}
              to={tab.route}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-btn text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-dq-orange text-white shadow-sm'
                  : 'text-text-secondary hover:bg-border-subtle hover:text-text-primary'
              }`}
            >
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-white/20 text-white' : 'bg-border-subtle text-text-muted'
                }`}
              >
                {tab.num}
              </span>
              <span className={isActive ? 'text-white' : 'text-icon-muted'}>{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`text-[11px] hidden sm:inline ${
                  isActive ? 'text-white/70' : 'text-text-muted'
                }`}
              >
                — {tab.tagline}
              </span>
            </NavLink>
          )
        })}
      </div>

      {/* Active D content */}
      <Outlet />
    </div>
  )
}
