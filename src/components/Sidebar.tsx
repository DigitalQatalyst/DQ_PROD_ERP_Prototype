import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home, Info, Shuffle, LayoutDashboard, CheckSquare, ClipboardList,
  MessageCircle, FileCheck, Bell, BarChart2, Receipt, FileText,
  TrendingUp, Shield, CalendarCheck, ShoppingCart, PlusSquare,
  Users, UserPlus, GitPullRequest, RefreshCw, Package, FolderOpen,
  DollarSign, Link, Briefcase, Layers, PlusCircle, ListOrdered,
  Inbox, Sliders, AlertTriangle, Search, Globe, UserCog, Tag,
  Building, Map, Cpu, ShoppingBag, BarChart, Zap, AlertCircle,
  Settings, Activity, AlertOctagon, Code, GitMerge, ShieldCheck,
  ClipboardEdit, Server,
} from 'lucide-react'
import { usePersona } from '../context/PersonaContext'
import type { PersonaRole } from '../types'

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

const ALL_INTERNAL: PersonaRole[] = ['EXEC', 'FIN-OWN', 'FIN-OPS', 'REQ', 'ADMIN', 'BC-STEWARD']
const DOMAIN_OWNERS: PersonaRole[] = ['EXEC', 'FIN-OWN', 'PROC-OWN' as PersonaRole, 'PSE-OWN' as PersonaRole]
const EXEC_DOMAIN: PersonaRole[] = ['EXEC', 'FIN-OWN']
const ADMIN_STEWARD: PersonaRole[] = ['ADMIN', 'BC-STEWARD']

const NAV_GROUPS: NavGroupDef[] = [
  {
    label: 'Home',
    roles: ALL_INTERNAL,
    items: [
      { label: 'DWS.04 Home', icon: <Home size={20} strokeWidth={1.5} />, route: '/', roles: ALL_INTERNAL },
      { label: 'Orientation Guide', icon: <Info size={20} strokeWidth={1.5} />, route: '/orientation', roles: ALL_INTERNAL },
      { label: 'Role / Entity Switch', icon: <Shuffle size={20} strokeWidth={1.5} />, route: '/role-switch', roles: ['EXEC', 'FIN-OWN', 'ADMIN', 'BC-STEWARD'] },
    ],
  },
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
    roles: ['EXEC', 'FIN-OWN', 'FIN-OPS'],
    items: [
      { label: 'Finance Workspace', icon: <BarChart2 size={20} strokeWidth={1.5} />, route: '/finance-control', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS'] },
      { label: 'Expense & Reimbursement', icon: <Receipt size={20} strokeWidth={1.5} />, route: '/expense-reimbursement', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS', 'REQ'] },
      { label: 'Invoice & Payment Ops', icon: <FileText size={20} strokeWidth={1.5} />, route: '/invoice-payment', roles: ['FIN-OWN', 'FIN-OPS'] },
      { label: 'Budget & Cost Centre', icon: <TrendingUp size={20} strokeWidth={1.5} />, route: '/budget-cost', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS'] },
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
    roles: ['EXEC', 'FIN-OWN'],
    items: [
      { label: 'Project / Service Register', icon: <FolderOpen size={20} strokeWidth={1.5} />, route: '/project-register', roles: ['EXEC', 'FIN-OWN'] },
      { label: 'Project Economics Workspace', icon: <DollarSign size={20} strokeWidth={1.5} />, route: '/project-economics', roles: ['EXEC', 'FIN-OWN'] },
      { label: 'Project-linked Cost View', icon: <Link size={20} strokeWidth={1.5} />, route: '/project-costs', roles: ['EXEC', 'FIN-OWN', 'FIN-OPS'] },
      { label: 'Service Billing Readiness', icon: <Briefcase size={20} strokeWidth={1.5} />, route: '/billing-readiness', roles: ['EXEC', 'FIN-OWN'] },
      { label: 'Delivery Commitments', icon: <Layers size={20} strokeWidth={1.5} />, route: '/delivery-commitments', roles: ['EXEC', 'FIN-OWN'] },
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
    roles: ['ADMIN', 'BC-STEWARD', 'FIN-OWN'],
    items: [
      { label: 'Entity & Location Structure', icon: <Globe size={20} strokeWidth={1.5} />, route: '/entity-structure', roles: ['ADMIN', 'BC-STEWARD', 'FIN-OWN'] },
      { label: 'Users, Roles & Delegations', icon: <UserCog size={20} strokeWidth={1.5} />, route: '/users-roles', roles: ['ADMIN', 'BC-STEWARD'] },
      { label: 'Cost Centres & Categories', icon: <Tag size={20} strokeWidth={1.5} />, route: '/cost-centres', roles: ['ADMIN', 'FIN-OWN'] },
      { label: 'Vendor / Customer Master Data', icon: <Building size={20} strokeWidth={1.5} />, route: '/vendor-master', roles: ['ADMIN', 'BC-STEWARD', 'FIN-OWN'] },
      { label: 'Project & Service Master Data', icon: <FolderOpen size={20} strokeWidth={1.5} />, route: '/project-master', roles: ['ADMIN'] },
      { label: 'BC Mapping Reference', icon: <Map size={20} strokeWidth={1.5} />, route: '/bc-mapping', roles: ['ADMIN', 'BC-STEWARD'] },
    ],
  },
  {
    label: 'Intelligence',
    roles: ['EXEC', 'FIN-OWN', 'ADMIN'],
    items: [
      { label: 'Executive Overview', icon: <Cpu size={20} strokeWidth={1.5} />, route: '/executive-home', roles: ['EXEC', 'FIN-OWN', 'ADMIN'] },
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
]

function hasAccess(roles: PersonaRole[], personaRole: PersonaRole): boolean {
  return roles.includes(personaRole)
}

export default function Sidebar() {
  const { activePersona } = usePersona()
  const role = activePersona.role
  const navigate = useNavigate()

  const filteredGroups = NAV_GROUPS.filter((g) => hasAccess(g.roles, role))

  return (
    <aside
      className="fixed top-[60px] left-0 h-[calc(100vh-60px)] w-[240px] overflow-y-auto"
      style={{
        background: '#F6F6FB',
        borderRight: '1px solid #EEEFF6',
      }}
    >
      {/* Role label */}
      <div className="px-4 pt-4 pb-2">
        <p
          className="text-[11px] font-semibold uppercase tracking-widest text-text-muted"
          style={{ letterSpacing: '0.12em' }}
        >
          {activePersona.role}
        </p>
      </div>

      <nav className="pb-8">
        {filteredGroups.map((group) => {
          const visibleItems = group.items.filter((item) => hasAccess(item.roles, role))
          if (visibleItems.length === 0) return null

          return (
            <div key={group.label} className="mt-4 first:mt-1">
              <p
                className="px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-text-muted"
                style={{ letterSpacing: '0.12em' }}
              >
                {group.label}
              </p>
              {visibleItems.map((item) => (
                <NavLink
                  key={item.route + item.label}
                  to={item.route}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 h-10 text-sm font-medium transition-colors relative ${
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
                      <span className={isActive ? 'text-dq-orange' : 'text-icon-muted'}>
                        {item.icon}
                      </span>
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
                </NavLink>
              ))}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
