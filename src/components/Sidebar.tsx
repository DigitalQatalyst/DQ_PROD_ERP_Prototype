import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home, Compass, Brain,
  Search, PenTool, Send, Gauge,
  LayoutDashboard, Inbox, CreditCard, FileText, BarChart2, ClipboardList,
  Users, UserPlus, ClipboardCheck, CheckSquare, BarChart,
  ShoppingCart, Building, ShoppingBag, GitPullRequest, ListOrdered,
  Package, Activity, HardDrive, UserCheck, RefreshCw, AlertCircle,
  FolderOpen, DollarSign, Database, Map, FileCheck,
  Layers, ClipboardEdit, UserCog, Shield, Award,
  Zap, AlertTriangle, ArrowUpCircle, Lock, XCircle,
  Monitor, AlertOctagon, Clock, GitMerge, Link,
  Tag, Globe, Settings, Server, Code,
  BookOpen, ShieldCheck, ScrollText, FileSearch, GanttChart,
  ChevronLeft, ChevronRight, ChevronDown,
} from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavItem {
  label: string
  icon: React.ReactNode
  route: string
  badge?: number
}

interface NavGroup {
  label: string
  items: NavItem[]
}

interface NavArea {
  label: string
  groups: NavGroup[]
}

const NAV: NavArea[] = [
  {
    label: 'ORIENTATION',
    groups: [
      {
        label: '',
        items: [
          { label: 'Home', icon: <Home size={16} strokeWidth={1.5} />, route: '/' },
          { label: 'Orientation', icon: <Compass size={16} strokeWidth={1.5} />, route: '/orientation' },
          { label: 'AI Cockpit', icon: <Brain size={16} strokeWidth={1.5} />, route: '/ai-cockpit' },
        ],
      },
    ],
  },
  {
    label: 'MARKETPLACE',
    groups: [
      {
        label: '',
        items: [
          { label: 'Discern Marketplace', icon: <Search size={16} strokeWidth={1.5} />, route: '/marketplace/discern' },
          { label: 'Design Marketplace', icon: <PenTool size={16} strokeWidth={1.5} />, route: '/marketplace/design' },
          { label: 'Deploy Marketplace', icon: <Send size={16} strokeWidth={1.5} />, route: '/marketplace/deploy' },
          { label: 'Drive Marketplace', icon: <Gauge size={16} strokeWidth={1.5} />, route: '/marketplace/drive' },
        ],
      },
    ],
  },
  {
    label: 'WORKSPACES',
    groups: [
      {
        label: 'Finance Workspace',
        items: [
          { label: 'Finance Work Queue', icon: <Inbox size={16} strokeWidth={1.5} />, route: '/finance/work-queue' },
          { label: 'Payment Processing', icon: <CreditCard size={16} strokeWidth={1.5} />, route: '/finance/payment-processing' },
          { label: 'Invoice Review', icon: <FileText size={16} strokeWidth={1.5} />, route: '/finance/invoice-review' },
          { label: 'Budget Review', icon: <BarChart2 size={16} strokeWidth={1.5} />, route: '/finance/budget-review' },
          { label: 'Finance Request Tracker', icon: <ClipboardList size={16} strokeWidth={1.5} />, route: '/finance/request-tracker' },
        ],
      },
      {
        label: 'HR & People Workspace',
        items: [
          { label: 'HR Work Queue', icon: <Inbox size={16} strokeWidth={1.5} />, route: '/hr/work-queue' },
          { label: 'Onboarding Operations', icon: <UserPlus size={16} strokeWidth={1.5} />, route: '/hr/onboarding-operations' },
          { label: 'Employee Change Operations', icon: <UserCheck size={16} strokeWidth={1.5} />, route: '/hr/employee-change-operations' },
          { label: 'People Service Tracker', icon: <ClipboardList size={16} strokeWidth={1.5} />, route: '/hr/people-service-tracker' },
          { label: 'HR Approval Readiness', icon: <ClipboardCheck size={16} strokeWidth={1.5} />, route: '/hr/approval-readiness' },
        ],
      },
      {
        label: 'Procurement & Vendor Workspace',
        items: [
          { label: 'Procurement Work Queue', icon: <Inbox size={16} strokeWidth={1.5} />, route: '/procurement/work-queue' },
          { label: 'Vendor Review', icon: <Building size={16} strokeWidth={1.5} />, route: '/procurement/vendor-review' },
          { label: 'Purchase Request Review', icon: <ShoppingBag size={16} strokeWidth={1.5} />, route: '/procurement/purchase-request-review' },
          { label: 'Quotation Review', icon: <FileText size={16} strokeWidth={1.5} />, route: '/procurement/quotation-review' },
          { label: 'PO Readiness Tracker', icon: <GitPullRequest size={16} strokeWidth={1.5} />, route: '/procurement/po-readiness-tracker' },
        ],
      },
      {
        label: 'Inventory & Asset Workspace',
        items: [
          { label: 'Asset Work Queue', icon: <Inbox size={16} strokeWidth={1.5} />, route: '/inventory/work-queue' },
          { label: 'Inventory Movement Tracker', icon: <Activity size={16} strokeWidth={1.5} />, route: '/inventory/movement-tracker' },
          { label: 'Asset Assignment Tracker', icon: <HardDrive size={16} strokeWidth={1.5} />, route: '/inventory/asset-assignment-tracker' },
          { label: 'Asset Return / Replacement', icon: <RefreshCw size={16} strokeWidth={1.5} />, route: '/inventory/asset-return-replacement' },
          { label: 'Stock Exception Review', icon: <AlertCircle size={16} strokeWidth={1.5} />, route: '/inventory/stock-exception-review' },
        ],
      },
      {
        label: 'Project Economics & Master Data Workspace',
        items: [
          { label: 'Project Economics Queue', icon: <FolderOpen size={16} strokeWidth={1.5} />, route: '/project/economics-queue' },
          { label: 'Cost / Billing Readiness Tracker', icon: <DollarSign size={16} strokeWidth={1.5} />, route: '/project/cost-billing-readiness' },
          { label: 'Master Data Review Queue', icon: <Database size={16} strokeWidth={1.5} />, route: '/project/master-data-review-queue' },
          { label: 'Dimension / Entity Change Review', icon: <Map size={16} strokeWidth={1.5} />, route: '/project/dimension-entity-change-review' },
          { label: 'ERP Record Readiness Tracker', icon: <FileCheck size={16} strokeWidth={1.5} />, route: '/project/erp-record-readiness' },
        ],
      },
    ],
  },
  {
    label: 'SERVICE OPERATIONS',
    groups: [
      {
        label: 'Fulfilment Management',
        items: [
          { label: 'Fulfilment Console', icon: <Monitor size={16} strokeWidth={1.5} />, route: '/service-ops/fulfilment-console' },
          { label: 'Assignment Queue', icon: <Inbox size={16} strokeWidth={1.5} />, route: '/service-ops/assignment-queue' },
          { label: 'Service Owner View', icon: <Users size={16} strokeWidth={1.5} />, route: '/service-ops/service-owner-view' },
          { label: 'Returned Items', icon: <RefreshCw size={16} strokeWidth={1.5} />, route: '/service-ops/returned-items' },
          { label: 'Closure & Handover', icon: <CheckSquare size={16} strokeWidth={1.5} />, route: '/service-ops/closure-handover' },
        ],
      },
      {
        label: 'Approval & Control Operations',
        items: [
          { label: 'Approval Queue', icon: <Inbox size={16} strokeWidth={1.5} />, route: '/service-ops/approval-queue' },
          { label: 'Approval Tracker', icon: <ClipboardList size={16} strokeWidth={1.5} />, route: '/service-ops/approval-tracker' },
          { label: 'Control Checks', icon: <ShieldCheck size={16} strokeWidth={1.5} />, route: '/service-ops/control-checks' },
          { label: 'Policy Exception Review', icon: <FileSearch size={16} strokeWidth={1.5} />, route: '/service-ops/policy-exception-review' },
          { label: 'Decision History', icon: <ScrollText size={16} strokeWidth={1.5} />, route: '/service-ops/decision-history' },
        ],
      },
      {
        label: 'SLA, Escalation & Exceptions',
        items: [
          { label: 'SLA Dashboard', icon: <BarChart size={16} strokeWidth={1.5} />, route: '/service-ops/sla-dashboard' },
          { label: 'Overdue Items', icon: <Clock size={16} strokeWidth={1.5} />, route: '/service-ops/overdue-items' },
          { label: 'Escalation Queue', icon: <ArrowUpCircle size={16} strokeWidth={1.5} />, route: '/service-ops/escalation-queue' },
          { label: 'Blocked Requests', icon: <Lock size={16} strokeWidth={1.5} />, route: '/service-ops/blocked-requests' },
          { label: 'Rejected / Disputed Items', icon: <XCircle size={16} strokeWidth={1.5} />, route: '/service-ops/rejected-disputed-items' },
        ],
      },
      {
        label: 'Business Central Sync Operations',
        items: [
          { label: 'Sync Monitor', icon: <Activity size={16} strokeWidth={1.5} />, route: '/service-ops/sync-monitor' },
          { label: 'Failed Syncs', icon: <AlertOctagon size={16} strokeWidth={1.5} />, route: '/service-ops/failed-syncs' },
          { label: 'Pending Syncs', icon: <Clock size={16} strokeWidth={1.5} />, route: '/service-ops/pending-syncs' },
          { label: 'Reconciliation Queue', icon: <GitMerge size={16} strokeWidth={1.5} />, route: '/service-ops/reconciliation-queue' },
          { label: 'ERP Reference Mapping', icon: <Link size={16} strokeWidth={1.5} />, route: '/service-ops/erp-reference-mapping' },
        ],
      },
      {
        label: 'Operational Intelligence & Audit Evidence',
        items: [
          { label: 'ERP Operations Dashboard', icon: <Monitor size={16} strokeWidth={1.5} />, route: '/service-ops/erp-operations-dashboard' },
          { label: 'Service Performance Dashboard', icon: <BarChart2 size={16} strokeWidth={1.5} />, route: '/service-ops/service-performance-dashboard' },
          { label: 'Approval Bottleneck Insights', icon: <AlertTriangle size={16} strokeWidth={1.5} />, route: '/service-ops/approval-bottleneck-insights' },
          { label: 'Evidence Repository', icon: <Database size={16} strokeWidth={1.5} />, route: '/service-ops/evidence-repository' },
          { label: 'Audit Trail', icon: <FileSearch size={16} strokeWidth={1.5} />, route: '/service-ops/audit-trail' },
        ],
      },
    ],
  },
  {
    label: 'PLATFORM MANAGEMENT',
    groups: [
      {
        label: 'Service Catalogue Configuration',
        items: [
          { label: 'Service Categories', icon: <Tag size={16} strokeWidth={1.5} />, route: '/platform/service-categories' },
          { label: 'Service Forms', icon: <ClipboardEdit size={16} strokeWidth={1.5} />, route: '/platform/service-forms' },
          { label: 'Required Evidence Setup', icon: <FileCheck size={16} strokeWidth={1.5} />, route: '/platform/required-evidence-setup' },
          { label: 'SLA Setup', icon: <Clock size={16} strokeWidth={1.5} />, route: '/platform/sla-setup' },
          { label: 'Catalogue Visibility Rules', icon: <Globe size={16} strokeWidth={1.5} />, route: '/platform/catalogue-visibility-rules' },
        ],
      },
      {
        label: 'Workflow & Approval Configuration',
        items: [
          { label: 'Workflow Builder', icon: <GitMerge size={16} strokeWidth={1.5} />, route: '/platform/workflow-builder' },
          { label: 'Approval Rules', icon: <CheckSquare size={16} strokeWidth={1.5} />, route: '/platform/approval-rules' },
          { label: 'Approval Thresholds', icon: <Layers size={16} strokeWidth={1.5} />, route: '/platform/approval-thresholds' },
          { label: 'Escalation Rules', icon: <ArrowUpCircle size={16} strokeWidth={1.5} />, route: '/platform/escalation-rules' },
          { label: 'Routing Rules', icon: <ListOrdered size={16} strokeWidth={1.5} />, route: '/platform/routing-rules' },
        ],
      },
      {
        label: 'Users, Roles & Access Administration',
        items: [
          { label: 'User Management', icon: <Users size={16} strokeWidth={1.5} />, route: '/platform/user-management' },
          { label: 'Role Management', icon: <Award size={16} strokeWidth={1.5} />, route: '/platform/role-management' },
          { label: 'Permission Groups', icon: <ShieldCheck size={16} strokeWidth={1.5} />, route: '/platform/permission-groups' },
          { label: 'Workspace Access Rules', icon: <Lock size={16} strokeWidth={1.5} />, route: '/platform/workspace-access-rules' },
          { label: 'Delegation / Proxy Rules', icon: <UserCog size={16} strokeWidth={1.5} />, route: '/platform/delegation-proxy-rules' },
        ],
      },
      {
        label: 'Integration & Data Governance',
        items: [
          { label: 'Business Central Integration Settings', icon: <Settings size={16} strokeWidth={1.5} />, route: '/platform/bc-integration-settings' },
          { label: 'Data Mapping Rules', icon: <Map size={16} strokeWidth={1.5} />, route: '/platform/data-mapping-rules' },
          { label: 'Sync Rules', icon: <RefreshCw size={16} strokeWidth={1.5} />, route: '/platform/sync-rules' },
          { label: 'Master Data Governance', icon: <Database size={16} strokeWidth={1.5} />, route: '/platform/master-data-governance' },
          { label: 'Entity / Dimension Governance', icon: <Globe size={16} strokeWidth={1.5} />, route: '/platform/entity-dimension-governance' },
        ],
      },
      {
        label: 'Security, Audit & Platform Governance',
        items: [
          { label: 'Access Control', icon: <Shield size={16} strokeWidth={1.5} />, route: '/platform/access-control' },
          { label: 'Audit Permissions', icon: <BookOpen size={16} strokeWidth={1.5} />, route: '/platform/audit-permissions' },
          { label: 'Platform Change Log', icon: <ScrollText size={16} strokeWidth={1.5} />, route: '/platform/platform-change-log' },
          { label: 'Configuration Audit Trail', icon: <FileSearch size={16} strokeWidth={1.5} />, route: '/platform/configuration-audit-trail' },
          { label: 'Platform Health', icon: <Activity size={16} strokeWidth={1.5} />, route: '/platform/platform-health' },
        ],
      },
    ],
  },
]

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [groupCollapsed, setGroupCollapsed] = useState<Record<string, boolean>>({})
  const toggleGroup = (key: string) =>
    setGroupCollapsed((g) => ({ ...g, [key]: !g[key] }))

  return (
    <aside
      className="fixed top-[60px] left-0 h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden transition-[width] duration-200 ease-out"
      style={{ background: '#F6F6FB', borderRight: '1px solid #EEEFF6', width: collapsed ? 48 : 240 }}
    >
      {/* Collapse toggle */}
      <div className={`flex items-center pt-3 pb-2 ${collapsed ? 'justify-center' : 'justify-end px-3'}`}>
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="w-6 h-6 rounded flex items-center justify-center text-icon-muted hover:bg-border-subtle hover:text-dq-navy transition-colors"
        >
          {collapsed ? <ChevronRight size={14} strokeWidth={1.75} /> : <ChevronLeft size={14} strokeWidth={1.75} />}
        </button>
      </div>

      <nav className="pb-8">
        {NAV.map((area) => (
          <div key={area.label} className="mt-4 first:mt-1">
            {/* Feature Area header — NOT collapsible */}
            {!collapsed && (
              <div className="px-4 pb-1">
                <span
                  className="text-[10px] font-bold uppercase text-dq-orange"
                  style={{ letterSpacing: '0.1em' }}
                >
                  {area.label}
                </span>
              </div>
            )}
            {collapsed && (
              <div className="flex justify-center py-1">
                <div className="w-4 h-px bg-dq-orange opacity-60" />
              </div>
            )}

            {/* Feature Groups */}
            {area.groups.map((group) => {
              const groupKey = area.label + group.label
              const isCollapsed = !!group.label && !!groupCollapsed[groupKey]

              return (
                <div key={groupKey} className={group.label ? 'mt-1' : ''}>
                  {/* Group header — collapsible if has label */}
                  {group.label && !collapsed && (
                    <button
                      onClick={() => toggleGroup(groupKey)}
                      aria-expanded={!isCollapsed}
                      className="w-full px-4 py-1.5 flex items-center justify-between gap-2 hover:bg-border-subtle transition-colors"
                    >
                      <span
                        className="text-[10px] font-semibold uppercase text-text-muted truncate"
                        style={{ letterSpacing: '0.1em' }}
                      >
                        {group.label}
                      </span>
                      <ChevronDown
                        size={11}
                        strokeWidth={1.75}
                        className={`text-icon-muted shrink-0 transition-transform duration-150 ${isCollapsed ? '-rotate-90' : ''}`}
                      />
                    </button>
                  )}

                  {/* Feature items */}
                  {!isCollapsed && group.items.map((item) => (
                    <NavLink
                      key={item.route}
                      to={item.route}
                      end={item.route === '/'}
                      title={collapsed ? item.label : undefined}
                      className={({ isActive }) =>
                        `flex items-center h-9 text-[13px] font-medium transition-colors relative ${
                          collapsed ? 'justify-center px-0' : 'gap-2.5 px-4'
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
                          <span className={isActive ? 'text-dq-orange' : 'text-icon-muted'}>
                            {item.icon}
                          </span>
                          {!collapsed && (
                            <span className="flex-1 truncate">{item.label}</span>
                          )}
                          {!collapsed && item.badge !== undefined && (
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
          </div>
        ))}
      </nav>
    </aside>
  )
}
