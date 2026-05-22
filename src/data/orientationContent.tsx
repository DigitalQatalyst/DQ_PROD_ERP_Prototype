import type { PersonaRole } from '../types'

// ── Welcome page data ───────────────────────────────────────────────────────

export interface WelcomeKPI {
  label: string
  value: string | number
  variant?: 'default' | 'success' | 'warning' | 'error' | 'mono'
  sub?: string
}

export const welcomeKPIs: Record<PersonaRole, WelcomeKPI[]> = {
  EXEC: [
    { label: 'Payment Exposure (30d)', value: 'AED 186,400', variant: 'mono' },
    { label: 'Pending Approvals', value: 23 },
    { label: 'Operating Health', value: 'Amber', variant: 'warning' },
  ],
  'FIN-OWN': [
    { label: 'Pending Approvals', value: 23 },
    { label: 'Overdue', value: 6, variant: 'error' },
    { label: 'Period Close Readiness', value: '78%', sub: 'May 2026 close' },
  ],
  'FIN-OPS': [
    { label: 'Items in Queue', value: 8 },
    { label: 'Evidence Pending', value: 2, variant: 'warning' },
    { label: 'BC Sync Ready', value: 5, variant: 'success' },
  ],
  REQ: [
    { label: 'My Open Requests', value: 1 },
    { label: 'Awaiting Clarification', value: 0 },
    { label: 'Approved This Week', value: 0 },
  ],
  ADMIN: [
    { label: 'Access Changes (week)', value: 12 },
    { label: 'Workflow Changes Pending', value: 2, variant: 'warning' },
    { label: 'Audit Events Today', value: 6 },
  ],
  'BC-STEWARD': [
    { label: 'Sync Success Rate (7d)', value: '97.2%', variant: 'success' },
    { label: 'Failed Records', value: 3, variant: 'error' },
    { label: 'Retry Queue', value: 1 },
  ],
  'HR-OWN': [
    { label: 'Pending Leave Approvals', value: 2, variant: 'warning' },
    { label: 'Transitions In Progress', value: 2 },
    { label: 'Open HR Requests', value: 4 },
  ],
  'INV-OWN': [
    { label: 'Low / Out of Stock', value: 4, variant: 'warning' },
    { label: 'Return Pending', value: 1, variant: 'warning' },
    { label: 'Open Inventory Requests', value: 3 },
  ],
  'ADM-OWN': [
    { label: 'SLA at Risk', value: 3, variant: 'warning' },
    { label: 'Blocked', value: 1, variant: 'error' },
    { label: 'Travel in Flight', value: 2 },
  ],
  'PROC-OWN': [
    { label: 'Open Purchase Requests', value: 5 },
    { label: 'Renewals < 30 days', value: 3, variant: 'warning' },
    { label: 'Vendor Onboarding Open', value: 1 },
  ],
}

// ── Today's Focus ───────────────────────────────────────────────────────────

export interface TodaysFocus {
  headline: string
  subtext: string
  ctaLabel: string
  ctaRoute: string
  tone: 'urgent' | 'attention' | 'info'
}

export const todaysFocus: Record<PersonaRole, TodaysFocus> = {
  EXEC: {
    headline: 'REQ-2025-0047 · Mazrui Holdings AED 90,000',
    subtext: 'High-value invoice due 28 May — awaiting your approval. Evidence complete, budget available.',
    ctaLabel: 'Review & Approve',
    ctaRoute: '/approval-console',
    tone: 'urgent',
  },
  'FIN-OWN': {
    headline: 'REQ-2025-0045 · AWS infrastructure AED 28,600',
    subtext: 'Pending your approval. Quote attached, no anomaly detected. Budget available in CC-003.',
    ctaLabel: 'Open Finance Workspace',
    ctaRoute: '/finance-control',
    tone: 'attention',
  },
  'FIN-OPS': {
    headline: 'Anthropic invoice ready for processing',
    subtext: 'REQ-2025-0043 approved — payment preparation + BC sync next. 5 records in your queue.',
    ctaLabel: 'Open Finance Ops Console',
    ctaRoute: '/finance-ops',
    tone: 'info',
  },
  REQ: {
    headline: 'Need to raise something?',
    subtext: 'Submit expenses, purchases, HR letters, travel, or any operational request from the universal intake.',
    ctaLabel: 'Submit a Request',
    ctaRoute: '/request-intake',
    tone: 'info',
  },
  ADMIN: {
    headline: '3 BC sync errors awaiting resolution',
    subtext: 'Failed records flagged in the sync error queue. 1 vendor mapping fix expected today.',
    ctaLabel: 'Open Sync Error Queue',
    ctaRoute: '/sync-error-queue',
    tone: 'attention',
  },
  'BC-STEWARD': {
    headline: 'VND-004 Anthropic · missing VAT field',
    subtext: 'Sync failed after 3 retries. Update vendor master and retry, or escalate to Procurement.',
    ctaLabel: 'Open BC Integration Health',
    ctaRoute: '/bc-integration',
    tone: 'attention',
  },
  'HR-OWN': {
    headline: 'Maya Sharma · 10-day annual leave',
    subtext: 'LV-004 awaiting your approval. Plus TR-001 Daniel Kimani onboarding has 2 outstanding asset tasks.',
    ctaLabel: 'Open HR Home',
    ctaRoute: '/hr-home',
    tone: 'attention',
  },
  'INV-OWN': {
    headline: '4 items below reorder threshold',
    subtext: 'HP Toner, Coffee Capsules, Branded Notebooks, External Monitor. Plus 1 MacBook return pending from offboarding.',
    ctaLabel: 'Open Inventory Home',
    ctaRoute: '/inventory-home',
    tone: 'attention',
  },
  'ADM-OWN': {
    headline: 'ADM-007 · Portugal travel blocked 12 days',
    subtext: 'Awaiting Portugal entity bank confirmation. Plus 2 more SLA-at-risk items today.',
    ctaLabel: 'Open Back-Office Home',
    ctaRoute: '/backoffice-home',
    tone: 'urgent',
  },
  'PROC-OWN': {
    headline: 'Loom Business renewal · 7 days',
    subtext: 'SUB-005 auto-renew OFF. Decide renew or cancel by 24 May. Anthropic API also renews in 13 days.',
    ctaLabel: 'Open Subscription Renewals',
    ctaRoute: '/subscriptions',
    tone: 'urgent',
  },
}

// ── Priority Items (Personal Dashboard) ─────────────────────────────────────

export interface PriorityItem {
  id: string
  title: string
  subtitle: string
  tone: 'urgent' | 'attention' | 'info'
  ctaLabel: string
  ctaRoute: string
}

export const priorityItems: Record<PersonaRole, PriorityItem[]> = {
  EXEC: [
    { id: 'REQ-2025-0047', title: 'Mazrui Holdings · AED 90,000', subtitle: 'High-value invoice · Due 28 May · Evidence complete', tone: 'urgent', ctaLabel: 'Approve', ctaRoute: '/approval-console' },
    { id: 'REQ-2025-0048', title: 'Budget amendment · PRJ-2403 overrun AED 45k', subtitle: 'Draft pending your executive approval', tone: 'attention', ctaLabel: 'Review', ctaRoute: '/approval-console' },
    { id: 'PRJ-2403', title: 'Project Noor Retail DXP — design milestone overdue', subtitle: 'M-008 Design System Delivered overdue by 8 days', tone: 'attention', ctaLabel: 'Open Milestone Tracker', ctaRoute: '/milestone-tracker' },
    { id: 'AIB-008', title: 'AI: SLA risk prediction — back-office travel queue', subtitle: 'Travel/Visa SLA hit rate trending to 65% (target 90%)', tone: 'info', ctaLabel: 'Open AI Brief', ctaRoute: '/ai-briefs' },
  ],
  'FIN-OWN': [
    { id: 'REQ-2025-0045', title: 'AWS infrastructure · AED 28,600', subtitle: 'Pending your approval · Quote attached · CC-003 has budget', tone: 'attention', ctaLabel: 'Approve', ctaRoute: '/approval-console' },
    { id: 'OVERDUE', title: '6 overdue approvals', subtitle: 'Past 5-day informal SLA — affects period close', tone: 'urgent', ctaLabel: 'Open Escalations', ctaRoute: '/escalations' },
    { id: 'REQ-2025-0041', title: 'Aisha expense reimbursement · AED 3,200', subtitle: 'Receipts attached · Pending Finance Control Owner review', tone: 'info', ctaLabel: 'Approve', ctaRoute: '/approval-console' },
    { id: 'CLOSE', title: 'May 2026 period close · 78% ready', subtitle: 'AP queue clear · AR pending 3 invoices · BC reconciliation due', tone: 'info', ctaLabel: 'Open Period Close', ctaRoute: '/period-close' },
  ],
  'FIN-OPS': [
    { id: 'REQ-2025-0043', title: 'Anthropic invoice · AED 12,400', subtitle: 'Approved · Ready for payment + BC sync', tone: 'info', ctaLabel: 'Process', ctaRoute: '/finance-ops' },
    { id: 'EVID', title: '2 requests have missing evidence', subtitle: 'REQ-2025-0046 per-diem · REQ-2025-0044 tax cert', tone: 'attention', ctaLabel: 'Open Evidence Actions', ctaRoute: '/evidence-actions' },
    { id: 'REQ-2025-0050', title: 'Customer Onboarding · Galp Energia (Portugal)', subtitle: 'Awaiting VAT cert · Owns the customer master creation', tone: 'attention', ctaLabel: 'Open Customer Onboarding', ctaRoute: '/customer-onboarding' },
  ],
  REQ: [
    { id: 'REQ-2025-0042', title: 'Your purchase request · Notion Teams AED 5,800', subtitle: 'In Review by Sara Pereira · Submitted 15 May', tone: 'info', ctaLabel: 'Track', ctaRoute: '/my-requests' },
    { id: 'NEW', title: 'Raise a new request', subtitle: 'Expense, purchase, HR letter, travel, leave — all in one place', tone: 'info', ctaLabel: 'Submit Request', ctaRoute: '/request-intake' },
    { id: 'GUIDE', title: 'Not sure what to submit?', subtitle: 'Try the Guided Request Assistant — recommends the right type', tone: 'info', ctaLabel: 'Open Assistant', ctaRoute: '/marketplace/discern/assistant' },
  ],
  ADMIN: [
    { id: 'SYNC', title: '3 BC sync errors pending resolution', subtitle: 'VND-004 + 2 others — coordinate with BC Steward', tone: 'attention', ctaLabel: 'Open Sync Error Queue', ctaRoute: '/sync-error-queue' },
    { id: 'WORKFLOW', title: '2 workflow threshold changes pending', subtitle: 'Approval rule edits awaiting your review', tone: 'attention', ctaLabel: 'Open Workflow Config', ctaRoute: '/workflow-config' },
    { id: 'CHANGE', title: '12 access changes this week', subtitle: 'New roles, delegations, persona moves — audit visible', tone: 'info', ctaLabel: 'Open Change Register', ctaRoute: '/change-register' },
  ],
  'BC-STEWARD': [
    { id: 'VND-004', title: 'Anthropic vendor sync failed · missing VAT field', subtitle: '3 retries exhausted · Coordinate fix with Procurement', tone: 'urgent', ctaLabel: 'Open BC Integration', ctaRoute: '/bc-integration' },
    { id: 'SYNC-002', title: 'Mazrui invoice (REQ-2025-0047) awaiting approval', subtitle: 'Will auto-sync to BC on approval', tone: 'info', ctaLabel: 'Monitor', ctaRoute: '/bc-integration' },
    { id: 'RETRY', title: '1 record in retry queue', subtitle: 'Connector healthy · 97.2% sync success (7d)', tone: 'info', ctaLabel: 'Open Sync Queue', ctaRoute: '/sync-error-queue' },
  ],
  'HR-OWN': [
    { id: 'LV-004', title: 'Maya Sharma · 10-day annual leave', subtitle: '1–12 Jul 2026 · Wedding + travel · Awaiting your approval', tone: 'attention', ctaLabel: 'Approve', ctaRoute: '/leave-management' },
    { id: 'TR-001', title: 'Daniel Kimani onboarding · 2 asset tasks open', subtitle: 'Laptop + Office 365 licence · Start date 25 May', tone: 'attention', ctaLabel: 'Open Transitions', ctaRoute: '/onboarding-offboarding' },
    { id: 'TR-002', title: 'Priya Menon offboarding · laptop return pending', subtitle: 'Target 30 May · 5 of 6 tasks open', tone: 'urgent', ctaLabel: 'Open Transitions', ctaRoute: '/onboarding-offboarding' },
    { id: 'HR-006', title: 'Mohammed bank update · awaiting bank confirmation', subtitle: 'HR-006 in Clarification Needed', tone: 'info', ctaLabel: 'Open HR Requests', ctaRoute: '/hr-requests' },
  ],
  'INV-OWN': [
    { id: 'INV-002', title: 'HP Toner · Low Stock (3 of 5)', subtitle: 'Below reorder threshold · Raise purchase request via Al Fardan', tone: 'attention', ctaLabel: 'Open Register', ctaRoute: '/inventory-register' },
    { id: 'INV-004', title: 'Branded Notebooks · Out of Stock', subtitle: 'Quantity 0 · Reorder threshold 30 units', tone: 'urgent', ctaLabel: 'Open Register', ctaRoute: '/inventory-register' },
    { id: 'AST-MBP-004', title: 'MacBook AST-MBP-004 · Return Pending', subtitle: 'Priya Menon offboarding TR-002 · Target 30 May', tone: 'attention', ctaLabel: 'Open Custody', ctaRoute: '/asset-custody' },
    { id: 'INV-007', title: 'Postman Enterprise licence pool low', subtitle: 'Only 2 seats remaining · Layla custody', tone: 'info', ctaLabel: 'Open Register', ctaRoute: '/inventory-register' },
  ],
  'ADM-OWN': [
    { id: 'ADM-007', title: 'Portugal travel blocked 12 days', subtitle: 'Awaiting Portugal entity bank confirmation', tone: 'urgent', ctaLabel: 'Open Fulfilment', ctaRoute: '/backoffice-fulfilment' },
    { id: 'ADM-002', title: 'UK visa · awaiting employment letter HR-002', subtitle: 'Cross-domain dependency on HR', tone: 'attention', ctaLabel: 'Open Travel & Admin', ctaRoute: '/travel-admin' },
    { id: 'SLA', title: '3 requests at SLA risk', subtitle: 'Travel/Visa hit rate trending down · Maya owner-load above threshold', tone: 'attention', ctaLabel: 'Open SLA Dashboard', ctaRoute: '/sla-dashboard' },
  ],
  'PROC-OWN': [
    { id: 'SUB-005', title: 'Loom Business renewal · 7 days', subtitle: 'Auto-renew OFF · AED 4,100 · Decide renew or cancel', tone: 'urgent', ctaLabel: 'Open Subscriptions', ctaRoute: '/subscriptions' },
    { id: 'SUB-003', title: 'Anthropic API Credits renewal · 13 days', subtitle: 'Auto-renew OFF · AED 42,000 · Approval needed', tone: 'attention', ctaLabel: 'Open Subscriptions', ctaRoute: '/subscriptions' },
    { id: 'VND-004', title: 'Anthropic vendor · BC sync failed', subtitle: 'Coordinate VAT field fix with BC Steward', tone: 'attention', ctaLabel: 'Open Vendor Directory', ctaRoute: '/vendor-directory' },
    { id: 'REQ-2025-0044', title: 'DataStax vendor onboarding · missing tax cert', subtitle: 'Evidence pending 3 days', tone: 'attention', ctaLabel: 'Open Vendor Onboarding', ctaRoute: '/vendor-onboarding' },
  ],
}

// ── Role Guide (Onboarding "Your Role" tab) ─────────────────────────────────

export interface RoleGuide {
  headline: string
  responsibilities: string
  approvalsYouOwn: string[]
  recordsYouManage: string[]
  reportsYouConsume: string[]
  firstWeekChecklist: string[]
  crossDomainNote?: string
}

export const roleGuide: Record<PersonaRole, RoleGuide> = {
  EXEC: {
    headline: 'You provide strategic oversight and make escalated decisions across DQ operations.',
    responsibilities: 'Review enterprise operating position, approve high-value requests (>AED 50k), monitor budget/payment exposure, oversee project economics, and consume AI briefs for early-warning signals.',
    approvalsYouOwn: ['High-value finance requests (>AED 50k)', 'Budget amendments', 'Escalated procurement (>AED 250k)', 'Strategic / policy exceptions'],
    recordsYouManage: ['Approval thresholds at executive level', 'Strategic risk acknowledgements', 'Escalation decisions'],
    reportsYouConsume: ['Executive Overview', 'Financial Health Report', 'AI Briefs & Recommendations', 'Operational SLA Dashboard'],
    firstWeekChecklist: [
      'Confirm your default landing page (Executive Overview)',
      'Set up delegation for travel windows',
      'Review approval threshold configuration',
      'Bookmark Approval Console for high-value items',
    ],
  },
  'FIN-OWN': {
    headline: 'You own finance control, period close, and the approval routing for financial transactions.',
    responsibilities: 'Govern finance rules, validate invoices and payments, manage budgets and cost centres, monitor tax / VAT readiness, approve finance transactions within authority, and lead period close.',
    approvalsYouOwn: ['All finance requests up to AED 50k', 'Budget requisitions <AED 25k', 'Vendor master changes (financial fields)', 'Customer onboarding'],
    recordsYouManage: ['Budgets, cost centres, expense categories', 'Vendor master (financial fields)', 'Customer master', 'Period close checklist'],
    reportsYouConsume: ['Finance Workspace', 'Financial Health Report', 'Finance Insights', 'Operational SLA Dashboard'],
    firstWeekChecklist: [
      'Review threshold rules and configure delegate',
      'Walk through period close readiness checklist',
      'Verify your finance queue and SLA targets',
      'Bookmark Customer Onboarding for AR setup',
    ],
    crossDomainNote: 'Final settlement on offboarding crosses HR + Finance. Customer onboarding crosses with Procurement (where MSAs originate).',
  },
  'FIN-OPS': {
    headline: 'You execute day-to-day finance processing and keep records moving toward BC sync.',
    responsibilities: 'Process invoices, expenses, payments, and reconciliations. Validate evidence, prepare records for approval, and confirm BC sync state. You are the engine of finance ops.',
    approvalsYouOwn: ['Delegated approvals only (FIN-OWN absence)', 'Initial AP triage'],
    recordsYouManage: ['Invoice processing queue', 'Expense settlement queue', 'Customer master records (operational fields)', 'Customer onboarding evidence'],
    reportsYouConsume: ['Finance Ops Console', 'Finance Insights', 'BC Integration Health'],
    firstWeekChecklist: [
      'Familiarize with BC sync states (Synced / Pending / Failed / Not Synced)',
      'Process today\'s queue end-to-end as practice',
      'Review evidence checklist library in Design marketplace',
      'Set notification preferences for your domain',
    ],
  },
  'HR-OWN': {
    headline: 'You own people operations: transitions, leave, HR requests, and employee records.',
    responsibilities: 'Govern HR request flow, approve leave and HR letters, run onboarding/offboarding clearance, and own the employee master record. You are the people lifecycle owner.',
    approvalsYouOwn: ['HR letters & employment certificates', 'Onboarding / offboarding clearance', 'Manager-route leave (where you are the manager)', 'HR document edits'],
    recordsYouManage: ['Employee / Associate Register', 'Active transitions (TR-001, TR-002)', 'Leave records and balances', 'HR service requests'],
    reportsYouConsume: ['HR Home', 'Workforce Cost Analytics', 'AI Brief: HR Routing (AIB-006)'],
    firstWeekChecklist: [
      'Walk through the Employee Register and verify manager hierarchy',
      'Review active transitions TR-001 + TR-002',
      'Configure leave approval delegation for your absence',
      'Familiarize with the Onboarding / Offboarding task checklist',
    ],
    crossDomainNote: 'Offboarding clearance crosses HR + Inventory (asset return) + Finance (final settlement) + Platform Admin (access revocation). Watch all four owners.',
  },
  'PROC-OWN': {
    headline: 'You own vendor and purchasing discipline across DQ entities.',
    responsibilities: 'Govern purchase request flow, validate vendor records, manage quotes and POs, monitor subscription renewals, and own vendor performance. You ensure procurement integrity.',
    approvalsYouOwn: ['Purchase requests up to AED 250k', 'Vendor onboarding (joint with BC Steward)', 'Subscription renewals', 'Quote / RFQ decisions'],
    recordsYouManage: ['Vendor master', 'Quote & PO tracker', 'Subscription & renewal register'],
    reportsYouConsume: ['Procurement Workspace', 'Procurement Insights', 'Renewal alerts'],
    firstWeekChecklist: [
      'Walk through vendor onboarding flow end-to-end',
      'Review subscription renewals due in next 30 days',
      'Check Vendor Master & Risk Queue for compliance gaps',
      'Confirm quote thresholds vs. policy library',
    ],
    crossDomainNote: 'Vendor onboarding requires BC Integration Steward co-approval for sync. Subscription renewals cross with Finance for payment readiness.',
  },
  'INV-OWN': {
    headline: 'You own stock and asset accountability across the company.',
    responsibilities: 'Track inventory items (consumables, licences, devices), manage asset custody and lifecycle, approve adjustments, run reconciliations, and resolve return queue items from offboarding.',
    approvalsYouOwn: ['Inventory adjustments', 'Asset write-off requests', 'Custody transfers'],
    recordsYouManage: ['Inventory / Stock Register (3 sub-types)', 'Asset Register & lifecycle', 'Custody assignments', 'Movement history'],
    reportsYouConsume: ['Inventory Home', 'Inventory Reconciliation Pack', 'Asset Lifecycle Pack', 'AI Brief: Inventory Exception (AIB-007)'],
    firstWeekChecklist: [
      'Run a stock count vs system using the Reconciliation Pack',
      'Verify all devices in custody match the register',
      'Set reorder thresholds for consumables',
      'Walk through one offboarding asset return',
    ],
    crossDomainNote: 'Asset custody links into HR (custodian = employee) and Procurement (asset originates from PO). Return queue is triggered by HR offboarding transitions.',
  },
  'ADM-OWN': {
    headline: 'You own back-office fulfilment: travel, admin, office services, and documentation.',
    responsibilities: 'Run the admin queue, assign owners, manage SLA targets, resolve blocked items, and coordinate cross-functional support (travel, visas, office, facilities, documents).',
    approvalsYouOwn: ['Travel & admin requests', 'Office services / facilities tickets', 'Document support', 'Business card / letterhead'],
    recordsYouManage: ['Travel & admin request register', 'Office services tracker', 'Operator load and SLA targets'],
    reportsYouConsume: ['Back-Office Home', 'Back-Office Performance Intelligence', 'Operational SLA Dashboard'],
    firstWeekChecklist: [
      'Review SLA targets per service type',
      'Claim ownership of all current open requests',
      'Set escalation rules for blocked items',
      'Walk through travel + visa flow end-to-end',
    ],
    crossDomainNote: 'Travel requests often depend on HR (visa letters), Finance (per-diem approval), and entity setup. ADM-007 Portugal travel is currently blocked on Finance entity bank confirmation — a recurring pattern.',
  },
  REQ: {
    headline: 'You raise and track operational requests across all DQ domains.',
    responsibilities: 'Use the universal request intake (or marketplace catalogues) to submit expenses, purchases, HR letters, travel, asset requests, and more. Track status through approval and fulfilment.',
    approvalsYouOwn: ['None — you are the requester, not the approver'],
    recordsYouManage: ['Your own requests and submitted evidence'],
    reportsYouConsume: ['My Requests / Request Tracker', 'My Tasks', 'Clarifications'],
    firstWeekChecklist: [
      'Submit a test expense request end-to-end',
      'Try the Guided Request Assistant in S01 → Discern',
      'Browse the Policy Library for spending rules',
      'Bookmark Request Tracker',
    ],
    crossDomainNote: 'If unsure which request type to use, open Marketplace → Discern → Guided Request Assistant — it routes you to the right template based on intent.',
  },
  ADMIN: {
    headline: 'You configure DWS.04 safely and govern platform change.',
    responsibilities: 'Manage users, roles, permissions, menus, workflow rules, threshold rules, notifications, audit settings, and release controls. Every change creates an audit event.',
    approvalsYouOwn: ['Platform configuration changes', 'Workflow threshold edits', 'User / role assignments', 'Workflow / threshold issues'],
    recordsYouManage: ['Users, roles, delegations', 'Workflow configuration', 'Approval threshold rules', 'AI guardrails & audit log', 'Change request register'],
    reportsYouConsume: ['Platform Admin Console', 'All cross-cutting dashboards (full visibility)'],
    firstWeekChecklist: [
      'Review the change request register and audit recent changes',
      'Verify role gating across all 10 personas',
      'Walk through workflow configuration patterns',
      'Confirm release control + environment setup',
    ],
  },
  'BC-STEWARD': {
    headline: 'You own Business Central sync integrity and the integration mapping layer.',
    responsibilities: 'Monitor connector health, resolve sync errors, manage field mappings, govern integration changes, and keep DWS.04 records aligned with the Business Central source of truth.',
    approvalsYouOwn: ['Sync error escalations', 'Vendor / customer mapping changes', 'BC reference corrections'],
    recordsYouManage: ['BC mapping reference', 'Sync error queue', 'API / connector configuration', 'Business Central extension governance'],
    reportsYouConsume: ['BC Integration Health', 'AI Brief: BC Sync Health (AIB-005)'],
    firstWeekChecklist: [
      'Walk through a sync error end-to-end (try VND-004)',
      'Review BC mapping reference and field-level rules',
      'Verify connector status and retry policy',
      'Read the BC Extension Governance register',
    ],
  },
}

// ── Domain Explainers (Onboarding "Domains" tab) ────────────────────────────

export interface DomainExplainer {
  name: string
  question: string
  primaryUsers: string
  capabilities: string[]
  linkRoute: string
  linkLabel: string
}

export const domainExplainers: DomainExplainer[] = [
  {
    name: 'Enterprise Finance & Accounting Control',
    question: 'How does DQ control financial records, budgets, invoices, expenses, payments, tax, and period reporting?',
    primaryUsers: 'EXEC, FIN-OWN, FIN-OPS',
    capabilities: ['Budget & cost centre control', 'Expense / invoice / payment processing', 'VAT & tax readiness', 'Period close', 'Customer master + AR'],
    linkRoute: '/finance-control',
    linkLabel: 'Open Finance Workspace',
  },
  {
    name: 'HR, People Admin & Workforce Operations',
    question: 'How does DQ govern HR / admin workflows and people-linked operating records?',
    primaryUsers: 'HR-OWN, REQ, EXEC',
    capabilities: ['Employee register + manager hierarchy', 'Leave management', 'Onboarding / offboarding transitions', 'HR service requests', 'Employee document support'],
    linkRoute: '/hr-home',
    linkLabel: 'Open HR Home',
  },
  {
    name: 'Procurement & Vendor Management',
    question: 'How does DQ request, approve, buy, receive, renew, and assess vendors?',
    primaryUsers: 'PROC-OWN, FIN-OWN, REQ',
    capabilities: ['Purchase requests + PO tracking', 'Vendor onboarding + master', 'Quote / RFQ capture', 'Subscription & renewal register', 'Vendor risk notes'],
    linkRoute: '/procurement',
    linkLabel: 'Open Procurement Workspace',
  },
  {
    name: 'Inventory, Asset & Stock Operations',
    question: 'How does DQ control stock, assets, custody, movement, and reconciliation?',
    primaryUsers: 'INV-OWN, HR-OWN, ADM-OWN',
    capabilities: ['Inventory register (Consumable / Licence / Device)', 'Asset register + lifecycle', 'Custody assignment + return', 'Stock movement & reconciliation', 'Write-off control'],
    linkRoute: '/inventory-home',
    linkLabel: 'Open Inventory Home',
  },
  {
    name: 'Administration & Back-Office Services',
    question: 'How does DQ run internal support services and admin fulfilment?',
    primaryUsers: 'ADM-OWN, REQ',
    capabilities: ['Travel & admin requests', 'Office services tracker', 'Document support', 'Facilities tickets', 'Back-office fulfilment console'],
    linkRoute: '/backoffice-home',
    linkLabel: 'Open Back-Office Home',
  },
  {
    name: 'Project, Service & Delivery Economics',
    question: 'How does DQ connect delivery work to cost, revenue, commitments, and resources?',
    primaryUsers: 'EXEC, FIN-OWN, project leads',
    capabilities: ['Project / service register', 'Project economics workspace', 'Project-linked cost view', 'Service billing readiness', 'Milestone tracker'],
    linkRoute: '/project-register',
    linkLabel: 'Open Project Register',
  },
  {
    name: 'Request, Approval & Control Governance',
    question: 'How does every ERP / back-office request move from intake to decision and audit?',
    primaryUsers: 'All internal',
    capabilities: ['Universal request intake', 'Approval console + governance', 'Approval rules & thresholds', 'Escalations & exceptions', 'Audit trail + pack builder'],
    linkRoute: '/approval-governance',
    linkLabel: 'Open Approval Governance',
  },
  {
    name: 'Enterprise Master Data & Operating Structure',
    question: 'What shared data keeps entities, employees, vendors, assets, inventory, projects, cost centres consistent?',
    primaryUsers: 'ADMIN, BC-STEWARD, FIN-OWN',
    capabilities: ['Entity & location structure', 'Cost centres & categories', 'Vendor + customer master', 'Project + service master', 'BC mapping reference'],
    linkRoute: '/entity-structure',
    linkLabel: 'Open Entity Structure',
  },
  {
    name: 'Intelligence, Reporting & AI Decision Support',
    question: 'How does DWS.04 turn operating data into decisions?',
    primaryUsers: 'EXEC, domain owners',
    capabilities: ['Executive overview', 'Financial health + workforce + back-office reports', 'Operational SLA dashboard', 'AI briefs & recommendations', 'Risk / exception alerts'],
    linkRoute: '/executive-home',
    linkLabel: 'Open Executive Overview',
  },
  {
    name: 'Platform Administration, Integration & Change Control',
    question: 'How is DWS.04 configured, integrated, secured, and changed safely?',
    primaryUsers: 'ADMIN, BC-STEWARD',
    capabilities: ['User & role management', 'Workflow configuration', 'BC integration health + sync errors', 'API mapping reference', 'Change request register'],
    linkRoute: '/admin-console',
    linkLabel: 'Open Admin Console',
  },
]
