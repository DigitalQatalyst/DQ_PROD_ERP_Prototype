import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home, LayoutDashboard, CheckSquare, ClipboardList,
  MessageCircle, FileCheck, Bell, BarChart2, Receipt, FileText,
  TrendingUp, Shield, CalendarCheck, ShoppingCart, PlusSquare,
  Users, UserPlus, GitPullRequest, RefreshCw, Package, FolderOpen,
  DollarSign, Link, Briefcase, Layers, PlusCircle, ListOrdered,
  Inbox, Sliders, AlertTriangle, Search, Globe, UserCog, Tag,
  Building, Map, Cpu, ShoppingBag, BarChart, Zap, AlertCircle,
  Settings, Activity, AlertOctagon, Code, GitMerge, ShieldCheck,
  ClipboardEdit, Server,
  ChevronLeft, ChevronRight, ChevronDown,
  Flag, HeartPulse, ClipboardCheck,
  Compass, PenTool, Send, Gauge,
} from 'lucide-react'
import { usePersona } from '../context/PersonaContext'
import type { PersonaRole } from '../types'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavItemDef {
  label: string
  icon: React.ReactNode
  route: string
  badge?: number
  roles: PersonaRole[]
}

interface NavGroupDef {
  label: string
  roles: PersonaRole[]
  items: NavItemDef[]
}

interface NavStageDef {
  code: 'S00' | 'S01' | 'S02'
  label: string
  roles: PersonaRole[]
  groups: NavGroupDef[]
}

const ALL_INTERNAL: PersonaRole[] = ['EXEC', 'FIN-OWN', 'FIN-OPS', 'REQ', 'ADMIN', 'BC-STEWARD']

// ── S00 Orientations ─────────────────────────────────────────────────────────
const STAGE_S00: NavStageDef = {
  code: 'S00',
  label: 'Orientations',
  roles: ALL_INTERNAL,
  groups: [
    {
      label: '',
      roles: ALL_INTERNAL,
      items: [
        { label: 'DWS.04 Home', icon: <Home size={20} strokeWidth={1.5} />, route: '/', roles: ALL_INTERNAL },
      ],
    },
  ],
}

// ── S01 Marketplace — 4D structure (Discern / Design / Deploy / Drive) ────────
const STAGE_S01: NavStageDef = {
  code: 'S01',
  label: 'Marketplace',
  roles: ALL_INTERNAL,
  groups: [
    {
      label: '',
      roles: ALL_INTERNAL,
      items: [
        { label: 'Discern', icon: <Compass size={20} strokeWidth={1.5} />, route: '/marketplace/discern', roles: ALL_INTERNAL },
        { label: 'Design', icon: <PenTool size={20} strokeWidth={1.5} />, route: '/marketplace/design', roles: ALL_INTERNAL },
        { label: 'Deploy', icon: <Send size={20} strokeWidth={1.5} />, route: '/marketplace/deploy', roles: ALL_INTERNAL },
        { label: 'Drive', icon: <Gauge size={20} strokeWidth={1.5} />, route: '/marketplace/drive', roles: ALL_INTERNAL },
      ],
    },
  ],
}

// ── S02 WorkSpaces — BRS Stages 2–4 ───────────────────────────────────────────
const STAGE_S02: NavStageDef = {
  code: 'S02',
  label: 'WorkSpaces',
  roles: ALL_INTERNAL,
  groups: [
    {
      label: 'My Work',
      roles: ALL_INTERNAL,
      items: [
        { label: 'My Requests', icon: <LayoutDashboard size={20} strokeWidth={1.5} />, route: '/my-requests', roles: ALL_INTERNAL },
        { label: 'My Approvals', icon: <CheckSquare size={20} strokeWidth={1.5} />, route: '/approval-console', badge: 3, roles: ['EXEC', 'FIN-OWN'] },
        { label: 'My Tasks', icon: <ClipboardList size={20} strokeWidth={1.5} />, route: '/my-tasks', roles: ALL_INTERNAL },
        { label: 'Clarifications', icon: <MessageCircle size={20} strokeWidth={1.5} />, route: '/clarifications', badge: 2, roles: ALL_INTERNAL },
        { label: 'Evidence Actions', icon: <FileCheck size={20} strokeWidth={1.5} />, route: '/evidence-actions', roles: ALL_INTERNAL },
        { label: 'Notifications', icon: <Bell size={20} strokeWidth={1.5} />, route: '/notifications', roles: ALL_INTERNAL },
      ],
    },
    {
      label: 'Finance Control',
      roles: ALL_INTERNAL,
      items: [
        { label: 'Finance Workspace', icon: <BarChart2 size={20} strokeWidth={1.5} />, route: '/finance-control', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS'] },
        { label: 'Expense & Reimbursement', icon: <Receipt size={20} strokeWidth={1.5} />, route: '/expense-reimbursement', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS', 'REQ'] },
        { label: 'Invoice & Payment Ops', icon: <FileText size={20} strokeWidth={1.5} />, route: '/invoice-payment', roles: ['FIN-OWN', 'FIN-OPS'] },
        { label: 'Budget & Cost Centre', icon: <TrendingUp size={20} strokeWidth={1.5} />, route: '/budget-cost', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS'] },
        { label: 'Budget Requisitions', icon: <ClipboardCheck size={20} strokeWidth={1.5} />, route: '/budget-requisitions', roles: ALL_INTERNAL },
        { label: 'Customer Onboarding', icon: <UserPlus size={20} strokeWidth={1.5} />, route: '/customer-onboarding', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS', 'ADMIN'] },
        { label: 'Tax & Compliance Records', icon: <Shield size={20} strokeWidth={1.5} />, route: '/tax-compliance', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS'] },
        { label: 'Period Close Readiness', icon: <CalendarCheck size={20} strokeWidth={1.5} />, route: '/period-close', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS'] },
      ],
    },
    {
      label: 'Procurement & Vendor Operations',
      roles: ['FIN-OWN', 'ADMIN'],
      items: [
        { label: 'Procurement Workspace', icon: <ShoppingCart size={20} strokeWidth={1.5} />, route: '/procurement', roles: ['ADMIN'] },
        { label: 'Purchase Request Centre', icon: <PlusSquare size={20} strokeWidth={1.5} />, route: '/purchase-requests', roles: ['ADMIN'] },
        { label: 'Vendor Directory', icon: <Users size={20} strokeWidth={1.5} />, route: '/vendor-directory', roles: ['FIN-OWN', 'FIN-OPS', 'ADMIN', 'BC-STEWARD'] },
        { label: 'Vendor Onboarding', icon: <UserPlus size={20} strokeWidth={1.5} />, route: '/vendor-onboarding', roles: ['FIN-OWN', 'FIN-OPS', 'ADMIN', 'BC-STEWARD'] },
        { label: 'Quote & PO Tracker', icon: <GitPullRequest size={20} strokeWidth={1.5} />, route: '/quote-po', roles: ['FIN-OWN', 'ADMIN'] },
        { label: 'Subscription & Renewals', icon: <RefreshCw size={20} strokeWidth={1.5} />, route: '/subscriptions', roles: ['FIN-OWN', 'ADMIN'] },
        { label: 'Asset Register', icon: <Package size={20} strokeWidth={1.5} />, route: '/assets', roles: ['ADMIN'] },
      ],
    },
    {
      label: 'Project & Service Economics',
      roles: ALL_INTERNAL,
      items: [
        { label: 'Project Milestone Tracker', icon: <Flag size={20} strokeWidth={1.5} />, route: '/milestone-tracker', roles: ALL_INTERNAL },
        { label: 'Project / Service Register', icon: <FolderOpen size={20} strokeWidth={1.5} />, route: '/project-register', roles: ['EXEC', 'FIN-OWN'] },
        { label: 'Project Economics Workspace', icon: <DollarSign size={20} strokeWidth={1.5} />, route: '/project-economics', roles: ['EXEC', 'FIN-OWN'] },
        { label: 'Project-linked Cost View', icon: <Link size={20} strokeWidth={1.5} />, route: '/project-costs', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS'] },
        { label: 'Service Billing Readiness', icon: <Briefcase size={20} strokeWidth={1.5} />, route: '/billing-readiness', roles: ['EXEC', 'FIN-OWN'] },
      ],
    },
    {
      label: 'Request & Approval Governance',
      roles: ALL_INTERNAL,
      items: [
        { label: 'Universal Request Intake', icon: <PlusCircle size={20} strokeWidth={1.5} />, route: '/request-intake', roles: ALL_INTERNAL },
        { label: 'Request Tracker', icon: <ListOrdered size={20} strokeWidth={1.5} />, route: '/request-tracker', roles: ALL_INTERNAL },
        { label: 'Approval Console', icon: <Inbox size={20} strokeWidth={1.5} />, route: '/approval-console', roles: ['EXEC', 'FIN-OWN'] },
        { label: 'Approval Rules & Thresholds', icon: <Sliders size={20} strokeWidth={1.5} />, route: '/approval-rules', roles: ['ADMIN', 'FIN-OWN'] },
        { label: 'Escalations & Exceptions', icon: <AlertTriangle size={20} strokeWidth={1.5} />, route: '/escalations', badge: 6, roles: ['EXEC', 'FIN-OWN', 'ADMIN'] },
        { label: 'Audit Trail Explorer', icon: <Search size={20} strokeWidth={1.5} />, route: '/audit-trail', roles: ['EXEC', 'FIN-OWN', 'ADMIN'] },
      ],
    },
    {
      label: 'Master Data & Structure',
      roles: ALL_INTERNAL,
      items: [
        { label: 'Entity & Location Structure', icon: <Globe size={20} strokeWidth={1.5} />, route: '/entity-structure', roles: ['ADMIN', 'BC-STEWARD', 'FIN-OWN'] },
        { label: 'Users, Roles & Delegations', icon: <UserCog size={20} strokeWidth={1.5} />, route: '/users-roles', roles: ['ADMIN', 'BC-STEWARD'] },
        { label: 'Cost Centres & Categories', icon: <Tag size={20} strokeWidth={1.5} />, route: '/cost-centres', roles: ['ADMIN', 'FIN-OWN'] },
        { label: 'Vendor Master', icon: <Building size={20} strokeWidth={1.5} />, route: '/vendor-master', roles: ['ADMIN', 'BC-STEWARD', 'FIN-OWN'] },
        { label: 'Customer Master', icon: <Users size={20} strokeWidth={1.5} />, route: '/customer-master', roles: ALL_INTERNAL },
        { label: 'Project & Service Master Data', icon: <FolderOpen size={20} strokeWidth={1.5} />, route: '/project-master', roles: ['ADMIN'] },
        { label: 'BC Mapping Reference', icon: <Map size={20} strokeWidth={1.5} />, route: '/bc-mapping', roles: ['ADMIN', 'BC-STEWARD'] },
      ],
    },
    {
      label: 'Intelligence',
      roles: ['EXEC', 'FIN-OWN', 'FIN-OPS', 'ADMIN'],
      items: [
        { label: 'Executive Overview', icon: <Cpu size={20} strokeWidth={1.5} />, route: '/executive-home', roles: ['EXEC', 'FIN-OWN', 'ADMIN'] },
        { label: 'Financial Health Report', icon: <HeartPulse size={20} strokeWidth={1.5} />, route: '/financial-health', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS', 'ADMIN'] },
        { label: 'Finance Insights', icon: <TrendingUp size={20} strokeWidth={1.5} />, route: '/finance-insights', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS'] },
        { label: 'Procurement Insights', icon: <ShoppingBag size={20} strokeWidth={1.5} />, route: '/procurement-insights', roles: ['EXEC', 'ADMIN'] },
        { label: 'Project / Service Insights', icon: <BarChart size={20} strokeWidth={1.5} />, route: '/project-insights', roles: ['EXEC', 'FIN-OWN', 'ADMIN'] },
        { label: 'AI Briefs & Recommendations', icon: <Zap size={20} strokeWidth={1.5} />, route: '/ai-briefs', roles: ['EXEC', 'FIN-OWN', 'ADMIN'] },
        { label: 'Risk / Exception Alerts', icon: <AlertCircle size={20} strokeWidth={1.5} />, route: '/risk-alerts', roles: ['EXEC', 'FIN-OWN', 'ADMIN'] },
      ],
    },
    {
      label: 'Platform Administration',
      roles: ['ADMIN', 'BC-STEWARD'],
      items: [
        { label: 'Platform Admin Console', icon: <Settings size={20} strokeWidth={1.5} />, route: '/admin-console', roles: ['ADMIN', 'BC-STEWARD'] },
        { label: 'BC Integration Health', icon: <Activity size={20} strokeWidth={1.5} />, route: '/bc-integration', roles: ['ADMIN', 'BC-STEWARD'] },
        { label: 'Sync Error Queue', icon: <AlertOctagon size={20} strokeWidth={1.5} />, route: '/sync-error-queue', badge: 3, roles: ['ADMIN', 'BC-STEWARD'] },
        { label: 'API / Connector Mapping', icon: <Code size={20} strokeWidth={1.5} />, route: '/api-connector', roles: ['ADMIN', 'BC-STEWARD'] },
        { label: 'Workflow Configuration', icon: <GitMerge size={20} strokeWidth={1.5} />, route: '/workflow-config', roles: ['ADMIN'] },
        { label: 'AI Guardrails & Audit Log', icon: <ShieldCheck size={20} strokeWidth={1.5} />, route: '/ai-guardrails', roles: ['ADMIN'] },
        { label: 'Change Request Register', icon: <ClipboardEdit size={20} strokeWidth={1.5} />, route: '/change-register', roles: ['ADMIN'] },
        { label: 'Release & Environment Control', icon: <Server size={20} strokeWidth={1.5} />, route: '/release-control', roles: ['ADMIN'] },
      ],
    },
  ],
}

const STAGES: NavStageDef[] = [STAGE_S00, STAGE_S01, STAGE_S02]

function hasAccess(roles: PersonaRole[], personaRole: PersonaRole): boolean {
  return roles.includes(personaRole)
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { activePersona } = usePersona()
  const role = activePersona.role
  const [stageCollapsed, setStageCollapsed] = useState<Record<string, boolean>>({})
  const [groupCollapsed, setGroupCollapsed] = useState<Record<string, boolean>>({})
  const toggleStage = (code: string) =>
    setStageCollapsed((s) => ({ ...s, [code]: !s[code] }))
  const toggleGroup = (key: string) =>
    setGroupCollapsed((g) => ({ ...g, [key]: !g[key] }))

  return (
    <aside
      className="fixed top-[60px] left-0 h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden transition-[width] duration-200 ease-out"
      style={{
        background: '#F6F6FB',
        borderRight: '1px solid #EEEFF6',
        width: collapsed ? 64 : 240,
      }}
    >
      {/* Header row — role label + collapse toggle */}
      <div className={`flex items-center pt-4 pb-2 ${collapsed ? 'justify-center px-2' : 'justify-between px-4'}`}>
        {!collapsed && (
          <p
            className="text-[11px] font-semibold uppercase tracking-widest text-text-muted"
            style={{ letterSpacing: '0.12em' }}
          >
            {activePersona.role}
          </p>
        )}
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="w-7 h-7 rounded-btn flex items-center justify-center text-icon-muted hover:bg-border-subtle hover:text-dq-navy transition-colors"
        >
          {collapsed
            ? <ChevronRight size={16} strokeWidth={1.75} />
            : <ChevronLeft size={16} strokeWidth={1.75} />}
        </button>
      </div>

      <nav className="pb-8">
        {STAGES.filter((s) => hasAccess(s.roles, role)).map((stage) => {
          const visibleGroups = stage.groups
            .filter((g) => hasAccess(g.roles, role))
            .map((g) => ({ ...g, items: g.items.filter((i) => hasAccess(i.roles, role)) }))
            .filter((g) => g.items.length > 0)

          if (visibleGroups.length === 0) return null

          const isStageCollapsed = !collapsed && !!stageCollapsed[stage.code]

          return (
            <div key={stage.code} className="mt-5 first:mt-2">
              {/* Stage header */}
              {collapsed ? (
                <div className="px-2 py-1 flex justify-center">
                  <span
                    className="text-[10px] font-bold text-dq-orange"
                    style={{ letterSpacing: '0.04em' }}
                    title={stage.label}
                  >
                    {stage.code}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => toggleStage(stage.code)}
                  aria-expanded={!isStageCollapsed}
                  className="w-full px-4 py-2 flex items-center justify-between gap-2 hover:bg-border-subtle transition-colors group"
                >
                  <span className="flex items-baseline gap-2">
                    <span
                      className="text-[10px] font-bold text-dq-orange"
                      style={{ letterSpacing: '0.08em' }}
                    >
                      {stage.code}
                    </span>
                    <span
                      className="text-[12px] font-bold uppercase text-dq-navy"
                      style={{ letterSpacing: '0.14em' }}
                    >
                      {stage.label}
                    </span>
                  </span>
                  <ChevronDown
                    size={14}
                    strokeWidth={1.75}
                    className={`text-icon-muted transition-transform duration-150 ${
                      isStageCollapsed ? '-rotate-90' : ''
                    }`}
                  />
                </button>
              )}

              {!isStageCollapsed && visibleGroups.map((group) => {
                const groupKey = stage.code + group.label
                const isGroupCollapsed = !collapsed && !!group.label && !!groupCollapsed[groupKey]

                return (
                <div key={groupKey} className={group.label ? 'mt-2' : 'mt-0.5'}>
                  {group.label && !collapsed && (
                    <button
                      onClick={() => toggleGroup(groupKey)}
                      aria-expanded={!isGroupCollapsed}
                      className="w-full px-4 py-1 flex items-center justify-between gap-2 hover:bg-border-subtle transition-colors"
                    >
                      <span
                        className="text-[10px] font-semibold uppercase tracking-widest text-text-muted"
                        style={{ letterSpacing: '0.12em' }}
                      >
                        {group.label}
                      </span>
                      <ChevronDown
                        size={12}
                        strokeWidth={1.75}
                        className={`text-icon-muted transition-transform duration-150 ${
                          isGroupCollapsed ? '-rotate-90' : ''
                        }`}
                      />
                    </button>
                  )}
                  {!isGroupCollapsed && group.items.map((item) => (
                    <NavLink
                      key={item.route + item.label}
                      to={item.route}
                      end={item.route === '/'}
                      title={collapsed ? item.label : undefined}
                      className={({ isActive }) =>
                        `flex items-center h-10 text-sm font-medium transition-colors relative ${
                          collapsed ? 'justify-center px-0' : 'gap-2 px-4'
                        } ${
                          isActive
                            ? 'text-dq-orange bg-orange-50'
                            : 'text-text-primary hover:bg-border-subtle'
                        }`
                      }
                      style={({ isActive }) =>
                        isActive
                          ? { borderLeft: '2px solid #FB5535' }
                          : { borderLeft: '2px solid transparent' }
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className={`relative ${isActive ? 'text-dq-orange' : 'text-icon-muted'}`}>
                            {item.icon}
                            {collapsed && item.badge !== undefined && (
                              <span
                                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2"
                                style={{ background: '#DC2626', boxShadow: '0 0 0 2px #F6F6FB' }}
                              />
                            )}
                          </span>
                          {!collapsed && (
                            <>
                              <span className="flex-1 truncate">{item.label}</span>
                              {item.badge !== undefined && (
                                <span
                                  className="text-[11px] font-semibold text-white rounded-pill px-1.5 py-0.5 min-w-[20px] text-center"
                                  style={{ background: '#DC2626' }}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              )
              })}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
