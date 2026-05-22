import type {
  Persona,
  Entity,
  CostCentre,
  Project,
  Vendor,
  Request,
  Subscription,
  SyncRecord,
  AuditEvent,
  Milestone,
  Customer,
  Employee,
  LeaveRequest,
  HRRequest,
  EmployeeTransition,
  InventoryItem,
  InventoryMovement,
  AdminRequest,
} from '../types'

// ── Personas ────────────────────────────────────────────────────────────────
export const personas: Persona[] = [
  {
    id: 'AK',
    initials: 'AK',
    name: 'Aisha Khalid',
    role: 'EXEC',
    roleLabel: 'Executive & Enterprise Oversight',
    landingRoute: '/executive-home',
    navDomains: ['Home', 'My Work', 'Finance Control', 'Request & Approval Governance', 'Intelligence'],
  },
  {
    id: 'MR',
    initials: 'MR',
    name: 'Mohammed Rashid',
    role: 'FIN-OWN',
    roleLabel: 'Finance Control Owner',
    landingRoute: '/finance-control',
    navDomains: ['Home', 'My Work', 'Finance Control', 'Request & Approval Governance', 'Master Data & Structure', 'Intelligence'],
  },
  {
    id: 'SP',
    initials: 'SP',
    name: 'Sara Pereira',
    role: 'FIN-OPS',
    roleLabel: 'Finance Ops Practitioner',
    landingRoute: '/finance-ops',
    navDomains: ['Home', 'My Work', 'Finance Control', 'Request & Approval Governance', 'Master Data & Structure'],
  },
  {
    id: 'JN',
    initials: 'JN',
    name: 'Jay Nair',
    role: 'REQ',
    roleLabel: 'Internal Requestor & Associate',
    landingRoute: '/requestor-home',
    navDomains: ['Home', 'My Work', 'Request & Approval Governance'],
  },
  {
    id: 'TA',
    initials: 'TA',
    name: 'Tariq Al-Amin',
    role: 'ADMIN',
    roleLabel: 'Platform Admin',
    landingRoute: '/admin-console',
    navDomains: ['Home', 'My Work', 'Request & Approval Governance', 'Master Data & Structure', 'Intelligence', 'Platform Administration'],
  },
  {
    id: 'LS',
    initials: 'LS',
    name: 'Layla Seitkali',
    role: 'BC-STEWARD',
    roleLabel: 'BC Integration Steward',
    landingRoute: '/bc-integration',
    navDomains: ['Home', 'My Work', 'Master Data & Structure', 'Intelligence', 'Platform Administration'],
  },
  {
    id: 'FH',
    initials: 'FH',
    name: 'Fatima Bin Hammad',
    role: 'HR-OWN',
    roleLabel: 'HR & People Operations Owner',
    landingRoute: '/hr-home',
    navDomains: ['Home', 'My Work', 'HR & People Operations', 'Inventory & Assets', 'Administration & Back Office', 'Request & Approval Governance', 'Master Data & Structure', 'Intelligence'],
  },
  {
    id: 'RA',
    initials: 'RA',
    name: 'Rashid Ahmed',
    role: 'INV-OWN',
    roleLabel: 'Inventory & Asset Control Owner',
    landingRoute: '/inventory-home',
    navDomains: ['Home', 'My Work', 'Inventory & Assets', 'Procurement & Vendor Operations', 'Administration & Back Office', 'Request & Approval Governance', 'Master Data & Structure', 'Intelligence'],
  },
  {
    id: 'MS',
    initials: 'MS',
    name: 'Maya Sharma',
    role: 'ADM-OWN',
    roleLabel: 'Administration & Back-Office Owner',
    landingRoute: '/backoffice-home',
    navDomains: ['Home', 'My Work', 'Administration & Back Office', 'HR & People Operations', 'Inventory & Assets', 'Procurement & Vendor Operations', 'Request & Approval Governance', 'Intelligence'],
  },
  {
    id: 'YM',
    initials: 'YM',
    name: 'Yasmin Al-Mansoori',
    role: 'PROC-OWN',
    roleLabel: 'Procurement & Vendor Control Owner',
    landingRoute: '/procurement',
    navDomains: ['Home', 'My Work', 'Procurement & Vendor Operations', 'Inventory & Assets', 'Finance Control', 'Request & Approval Governance', 'Master Data & Structure', 'Intelligence'],
  },
]

// ── Entities ─────────────────────────────────────────────────────────────────
export const entities: Entity[] = [
  { name: 'DigitalQatalyst MENA', country: 'UAE', currency: 'AED' },
  { name: 'DigitalQatalyst East Africa', country: 'Kenya', currency: 'KES' },
  { name: 'DigitalQatalyst Iberia', country: 'Portugal', currency: 'EUR' },
]

// ── Cost Centres ──────────────────────────────────────────────────────────────
export const costCentres: CostCentre[] = [
  { id: 'CC-001', name: 'Executive & Strategy' },
  { id: 'CC-002', name: 'Finance & Operations' },
  { id: 'CC-003', name: 'Technology & Platform' },
  { id: 'CC-004', name: 'Delivery & Client Services' },
  { id: 'CC-005', name: 'Product & Growth' },
]

// ── Projects ──────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 'PRJ-2401',
    name: 'DXP Phase 3 Build',
    status: 'Active',
    owner: 'Layla Seitkali',
    budget: 280000,
    currency: 'AED',
  },
  {
    id: 'PRJ-2402',
    name: 'DWS.04 Platform Prototype',
    status: 'Active',
    owner: 'Jay Nair',
    budget: 95000,
    currency: 'AED',
  },
  {
    id: 'PRJ-2403',
    name: 'Client: Noor Retail DXP',
    status: 'Active',
    owner: 'Mohammed Rashid',
    budget: 450000,
    currency: 'AED',
  },
  {
    id: 'PRJ-2404',
    name: 'DIA Intelligence Layer',
    status: 'Planning',
    owner: 'Sara Pereira',
    budget: 160000,
    currency: 'AED',
  },
  {
    id: 'PRJ-2405',
    name: 'SDO Design System',
    status: 'Active',
    owner: 'Aisha Khalid',
    budget: 75000,
    currency: 'AED',
  },
]

// ── Vendors ───────────────────────────────────────────────────────────────────
export const vendors: Vendor[] = [
  { id: 'VND-001', name: 'Vercel Inc.', category: 'SaaS/Cloud', bcSync: 'Synced', status: 'Active', annualValue: 'AED 18,400/yr' },
  { id: 'VND-002', name: 'Microsoft (MENA)', category: 'SaaS/ERP', bcSync: 'Synced', status: 'Active', annualValue: 'AED 214,000/yr' },
  { id: 'VND-003', name: 'Figma Inc.', category: 'SaaS/Design', bcSync: 'Synced', status: 'Active', annualValue: 'AED 8,200/yr' },
  { id: 'VND-004', name: 'Anthropic', category: 'AI Services', bcSync: 'Failed', status: 'Active', annualValue: 'AED 42,000/yr' },
  { id: 'VND-005', name: 'Mazrui Holdings Ltd.', category: 'Services', bcSync: 'Synced', status: 'Active', annualValue: 'AED 180,000 engagement' },
  { id: 'VND-006', name: 'Al Fardan Office Supp.', category: 'Admin/Office', bcSync: 'Not Synced', status: 'Active', annualValue: 'Ad hoc' },
  { id: 'VND-007', name: 'Gulf Recruitment Corp.', category: 'HR/Staffing', bcSync: 'Synced', status: 'Active', annualValue: 'AED 96,000/yr' },
  { id: 'VND-008', name: 'Bloom Accounting', category: 'Assurance/Tax', bcSync: 'Synced', status: 'Active', annualValue: 'AED 35,000/yr' },
]

// ── Requests ──────────────────────────────────────────────────────────────────
export const requests: Request[] = [
  {
    id: 'REQ-2025-0041',
    type: 'Expense',
    description: 'Expense reimbursement',
    requester: 'Aisha Khalid',
    amount: 3200,
    currency: 'AED',
    status: 'Pending Approval',
    approver: 'Mohammed Rashid',
    submittedDate: '14 May 2026',
    dueDate: '14 May 2026',
    evidence: [
      { label: 'Receipt 1', checked: true, required: true },
      { label: 'Receipt 2', checked: true, required: true },
    ],
  },
  {
    id: 'REQ-2025-0042',
    type: 'Purchase',
    description: 'Purchase request: Notion Teams annual',
    requester: 'Jay Nair',
    amount: 5800,
    currency: 'AED',
    status: 'In Review',
    approver: 'Sara Pereira',
    submittedDate: '15 May 2026',
    linkedProject: 'PRJ-2402',
    vendorId: 'VND-001',
    vendorName: 'Notion',
    bcSync: 'Not Synced',
    evidence: [
      { label: 'Business justification', checked: true, required: true },
      { label: 'Supplier quote', checked: true, required: true },
    ],
  },
  {
    id: 'REQ-2025-0043',
    type: 'Invoice',
    description: 'Invoice payment: Anthropic May statement',
    requester: 'Finance Ops',
    amount: 12400,
    currency: 'AED',
    status: 'Approved',
    approver: 'Mohammed Rashid',
    submittedDate: '16 May 2026',
    dueDate: '22 May 2026',
    vendorId: 'VND-004',
    vendorName: 'Anthropic',
    bcSync: 'Synced',
    bcRef: 'BC-INV-48821',
    evidence: [
      { label: 'Signed invoice', checked: true, required: true },
      { label: 'PO reference', checked: true, required: true },
    ],
  },
  {
    id: 'REQ-2025-0044',
    type: 'Vendor Onboarding',
    description: 'Vendor onboarding: DataStax Ltd.',
    requester: 'Procurement Ops',
    amount: 0,
    currency: 'AED',
    status: 'Evidence Pending',
    approver: 'Mohammed Rashid',
    submittedDate: '16 May 2026',
    notes: 'Missing: Tax registration cert',
    evidence: [
      { label: 'Company registration', checked: true, required: true },
      { label: 'Tax registration cert', checked: false, required: true },
      { label: 'Bank details', checked: true, required: true },
    ],
  },
  {
    id: 'REQ-2025-0045',
    type: 'Purchase',
    description: 'Purchase request: AWS infrastructure top-up',
    requester: 'Sara Pereira',
    amount: 28600,
    currency: 'AED',
    status: 'Pending Approval',
    approver: 'Mohammed Rashid',
    submittedDate: '16 May 2026',
    vendorName: 'AWS',
    bcSync: 'Not Synced',
    evidence: [
      { label: 'Supplier quote', checked: true, required: true },
    ],
  },
  {
    id: 'REQ-2025-0046',
    type: 'Expense',
    description: 'Expense: Kenya team travel',
    requester: 'Delivery team',
    amount: 8750,
    currency: 'AED',
    status: 'Clarification Needed',
    approver: 'Sara Pereira',
    submittedDate: '13 May 2026',
    notes: 'Missing: Per-diem breakdown',
    evidence: [
      { label: 'Travel receipts', checked: true, required: true },
      { label: 'Per-diem breakdown', checked: false, required: true },
    ],
  },
  {
    id: 'REQ-2025-0047',
    type: 'Invoice',
    description: 'Invoice payment: Mazrui Holdings delivery milestone',
    requester: 'Finance Ops',
    amount: 90000,
    currency: 'AED',
    status: 'Pending Approval',
    approver: 'Aisha Khalid',
    submittedDate: '15 May 2026',
    dueDate: '28 May 2026',
    vendorId: 'VND-005',
    vendorName: 'Mazrui Holdings Ltd.',
    linkedProject: 'PRJ-2403',
    isHighValue: true,
    bcSync: 'Not Synced',
    evidence: [
      { label: 'Signed invoice', checked: true, required: true },
      { label: 'Delivery confirmation', checked: true, required: true },
      { label: 'PO reference', checked: true, required: true },
    ],
  },
  {
    id: 'REQ-2025-0048',
    type: 'Budget Amendment',
    description: 'Budget amendment: PRJ-2403 overage request',
    requester: 'Mohammed Rashid',
    amount: 45000,
    currency: 'AED',
    status: 'Draft',
    approver: 'Aisha Khalid',
    submittedDate: '18 May 2026',
    linkedProject: 'PRJ-2403',
    evidence: [],
  },
  {
    id: 'REQ-2025-0049',
    type: 'Budget Requisition',
    description: 'Budget requisition: Q3 marketing campaign allocation',
    requester: 'Jay Nair',
    amount: 32000,
    currency: 'AED',
    status: 'Pending Approval',
    approver: 'Mohammed Rashid',
    submittedDate: '17 May 2026',
    linkedProject: 'PRJ-2402',
    evidence: [
      { label: 'Campaign brief', checked: true, required: true },
      { label: 'Cost breakdown', checked: true, required: true },
    ],
  },
  {
    id: 'REQ-2025-0050',
    type: 'Customer Onboarding',
    description: 'Customer onboarding: Galp Energia (Portugal)',
    requester: 'Sara Pereira',
    amount: 0,
    currency: 'EUR',
    status: 'Evidence Pending',
    approver: 'Mohammed Rashid',
    submittedDate: '16 May 2026',
    notes: 'Missing: VAT registration cert',
    evidence: [
      { label: 'Company registration', checked: true, required: true },
      { label: 'VAT registration cert', checked: false, required: true },
      { label: 'Billing contact details', checked: true, required: true },
      { label: 'Signed MSA', checked: true, required: true },
    ],
  },
  {
    id: 'REQ-2025-0051',
    type: 'Budget Requisition',
    description: 'Budget requisition: BI tooling pilot allocation',
    requester: 'Sara Pereira',
    amount: 18500,
    currency: 'AED',
    status: 'Draft',
    approver: 'Mohammed Rashid',
    submittedDate: '18 May 2026',
    linkedProject: 'PRJ-2404',
    evidence: [
      { label: 'Tool comparison', checked: true, required: true },
      { label: 'Pilot scope', checked: false, required: true },
    ],
  },
  {
    id: 'REQ-2025-0052',
    type: 'Budget Requisition',
    description: 'Budget requisition: Senior engineer hiring budget',
    requester: 'Mohammed Rashid',
    amount: 95000,
    currency: 'AED',
    status: 'Approved',
    approver: 'Aisha Khalid',
    submittedDate: '10 May 2026',
    linkedProject: 'PRJ-2401',
    evidence: [
      { label: 'Role specification', checked: true, required: true },
      { label: 'Cost-to-serve impact', checked: true, required: true },
    ],
  },
  {
    id: 'REQ-2025-0053',
    type: 'Budget Requisition',
    description: 'Budget requisition: Q3 vendor sponsorship',
    requester: 'Jay Nair',
    amount: 12000,
    currency: 'AED',
    status: 'Rejected',
    approver: 'Mohammed Rashid',
    submittedDate: '8 May 2026',
    notes: 'Insufficient business case — resubmit with measurable outcomes',
    evidence: [
      { label: 'Sponsorship brief', checked: true, required: true },
    ],
  },
]

// ── Subscriptions ─────────────────────────────────────────────────────────────
export const subscriptions: Subscription[] = [
  {
    id: 'SUB-001',
    name: 'Vercel Pro Teams',
    renewalDate: '12 Jun 2026',
    daysUntilRenewal: 24,
    amount: 18400,
    currency: 'AED',
    owner: 'Tariq Al-Amin',
    autoRenew: true,
  },
  {
    id: 'SUB-002',
    name: 'Figma Organisation',
    renewalDate: '3 Jul 2026',
    daysUntilRenewal: 45,
    amount: 8200,
    currency: 'AED',
    owner: 'Tariq Al-Amin',
    autoRenew: true,
  },
  {
    id: 'SUB-003',
    name: 'Anthropic API Credits',
    renewalDate: '1 Jun 2026',
    daysUntilRenewal: 13,
    amount: 42000,
    currency: 'AED',
    owner: 'Layla Seitkali',
    autoRenew: false,
    actionRequired: 'Approve renewal',
  },
  {
    id: 'SUB-004',
    name: 'Microsoft 365 MENA',
    renewalDate: '14 Aug 2026',
    daysUntilRenewal: 87,
    amount: 214000,
    currency: 'AED',
    owner: 'Tariq Al-Amin',
    autoRenew: true,
  },
  {
    id: 'SUB-005',
    name: 'Loom Business',
    renewalDate: '27 May 2026',
    daysUntilRenewal: 7,
    amount: 4100,
    currency: 'AED',
    owner: 'Jay Nair',
    autoRenew: false,
    actionRequired: 'URGENT: Renew or cancel',
  },
]

// ── BC Sync Records ───────────────────────────────────────────────────────────
export const syncRecords: SyncRecord[] = [
  {
    id: 'SYNC-001',
    objectRef: 'REQ-2025-0043',
    objectType: 'Invoice',
    entity: 'DigitalQatalyst MENA',
    bcRef: 'BC-INV-48821',
    status: 'Synced',
    lastAttempt: '18 May 2026 11:42',
  },
  {
    id: 'SYNC-002',
    objectRef: 'REQ-2025-0047',
    objectType: 'Invoice',
    entity: 'DigitalQatalyst MENA',
    status: 'Pending',
    lastAttempt: '—',
    errorMessage: 'Awaiting approval before sync',
  },
  {
    id: 'SYNC-003',
    objectRef: 'VND-004',
    objectType: 'Vendor',
    entity: 'DigitalQatalyst MENA',
    status: 'Failed',
    lastAttempt: '17 May 2026 09:15',
    retryCount: 3,
    errorMessage: 'Missing VAT registration field',
  },
  {
    id: 'SYNC-004',
    objectRef: 'REQ-2025-0042',
    objectType: 'Purchase',
    entity: 'DigitalQatalyst MENA',
    status: 'Not Synced',
    lastAttempt: '—',
    errorMessage: 'Pending approval; sync will trigger on approval',
  },
  {
    id: 'SYNC-005',
    objectRef: 'CC-003',
    objectType: 'Cost Centre',
    entity: 'DigitalQatalyst MENA',
    bcRef: 'BC-CC-1043',
    status: 'Synced',
    lastAttempt: '01 Apr 2026 08:00',
  },
]

// ── KPIs ──────────────────────────────────────────────────────────────────────
export const kpis = {
  paymentExposure30d: 186400,
  totalActiveRequests: 47,
  pendingApprovals: 23,
  clarificationNeeded: 8,
  overdueApprovals: 6,
  highValuePending: 3,
  budgetConsumedPct: 62,
  budgetConsumedAmount: 1240000,
  budgetTotal: 2000000,
  openPurchaseRequests: 12,
  pendingVendorActions: 4,
  renewalsDue30d: 3,
  poCommitmentExposure: 410000,
  activeProjects: 5,
  projectsWithOverruns: 1,
  linkedOpenRequests: 19,
  avgRequestCycleTime: 3.4,
  bcConnectorStatus: 'Healthy',
  syncSuccessRate7d: 97.2,
  failedSyncRecords: 3,
  retryQueue: 1,
} as const

// ── Audit Events ─────────────────────────────────────────────────────────────
export const auditEvents: AuditEvent[] = [
  {
    actor: 'Mohammed Rashid',
    action: 'Approved',
    target: 'REQ-2025-0043',
    timestamp: '18 May 2026 11:41',
  },
  {
    actor: 'Sara Pereira',
    action: 'Updated vendor status',
    target: 'VND-004',
    timestamp: '17 May 2026 09:30',
  },
  {
    actor: 'Tariq Al-Amin',
    action: 'Added user role: FIN-OPS',
    target: 'Sara Pereira',
    timestamp: '16 May 2026 14:12',
  },
  {
    actor: 'Layla Seitkali',
    action: 'Retried BC sync',
    target: 'VND-004',
    timestamp: '17 May 2026 09:15',
  },
  {
    actor: 'Jay Nair',
    action: 'Submitted request',
    target: 'REQ-2025-0042',
    timestamp: '15 May 2026 10:22',
  },
  {
    actor: 'Aisha Khalid',
    action: 'Submitted expense',
    target: 'REQ-2025-0041',
    timestamp: '14 May 2026 16:05',
  },
]

// ── Milestones ───────────────────────────────────────────────────────────────
export const milestones: Milestone[] = [
  // PRJ-2401 DXP Phase 3 Build
  { id: 'M-001', projectId: 'PRJ-2401', name: 'Discovery Complete', status: 'Complete', dueDate: '15 Apr 2026', owner: 'Layla Seitkali', completionPct: 100 },
  { id: 'M-002', projectId: 'PRJ-2401', name: 'MVP Demo', status: 'In Progress', dueDate: '5 Jun 2026', owner: 'Layla Seitkali', completionPct: 65 },
  { id: 'M-003', projectId: 'PRJ-2401', name: 'UAT Sign-off', status: 'Not Started', dueDate: '30 Jul 2026', owner: 'Layla Seitkali', completionPct: 0 },
  // PRJ-2402 DWS.04 Platform Prototype
  { id: 'M-004', projectId: 'PRJ-2402', name: 'BRS Approved', status: 'Complete', dueDate: '18 May 2026', owner: 'Jay Nair', completionPct: 100 },
  { id: 'M-005', projectId: 'PRJ-2402', name: 'Shell Prototype', status: 'In Progress', dueDate: '30 May 2026', owner: 'Jay Nair', completionPct: 80 },
  { id: 'M-006', projectId: 'PRJ-2402', name: 'Full Prototype Review', status: 'Not Started', dueDate: '25 Jun 2026', owner: 'Jay Nair', completionPct: 0 },
  // PRJ-2403 Client: Noor Retail DXP
  { id: 'M-007', projectId: 'PRJ-2403', name: 'Contract Signed', status: 'Complete', dueDate: '12 Mar 2026', owner: 'Mohammed Rashid', completionPct: 100 },
  { id: 'M-008', projectId: 'PRJ-2403', name: 'Design System Delivered', status: 'Overdue', dueDate: '14 May 2026', owner: 'Mohammed Rashid', completionPct: 70 },
  { id: 'M-009', projectId: 'PRJ-2403', name: 'Phase 1 Go-live', status: 'In Progress', dueDate: '20 Jul 2026', owner: 'Mohammed Rashid', completionPct: 35 },
  // PRJ-2404 DIA Intelligence Layer
  { id: 'M-010', projectId: 'PRJ-2404', name: 'Planning Workshop', status: 'In Progress', dueDate: '28 May 2026', owner: 'Sara Pereira', completionPct: 50 },
  { id: 'M-011', projectId: 'PRJ-2404', name: 'Architecture Sign-off', status: 'Not Started', dueDate: '15 Jun 2026', owner: 'Sara Pereira', completionPct: 0 },
  { id: 'M-012', projectId: 'PRJ-2404', name: 'First Prototype', status: 'Not Started', dueDate: '1 Aug 2026', owner: 'Sara Pereira', completionPct: 0 },
  // PRJ-2405 SDO Design System
  { id: 'M-013', projectId: 'PRJ-2405', name: 'Token Spec', status: 'Complete', dueDate: '10 Apr 2026', owner: 'Aisha Khalid', completionPct: 100 },
  { id: 'M-014', projectId: 'PRJ-2405', name: 'Component Library v1', status: 'Delayed', dueDate: '12 May 2026', owner: 'Aisha Khalid', completionPct: 60 },
  { id: 'M-015', projectId: 'PRJ-2405', name: 'Adoption Playbook', status: 'In Progress', dueDate: '30 Jun 2026', owner: 'Aisha Khalid', completionPct: 25 },
]

// ── Customers ────────────────────────────────────────────────────────────────
export const customers: Customer[] = [
  { id: 'CUST-001', name: 'Noor Retail', country: 'UAE', currency: 'AED', billingTerms: 'Net 30', status: 'Active', arBalance: 240000, linkedProject: 'PRJ-2403' },
  { id: 'CUST-002', name: 'Mubadala Innovations', country: 'UAE', currency: 'AED', billingTerms: 'Net 45', status: 'Active', arBalance: 120000 },
  { id: 'CUST-003', name: 'Etisalat Digital', country: 'UAE', currency: 'AED', billingTerms: 'Net 30', status: 'Active', arBalance: 95000 },
  { id: 'CUST-004', name: 'AlFuttaim Group', country: 'UAE', currency: 'AED', billingTerms: 'Net 60', status: 'Active', arBalance: 165000 },
  { id: 'CUST-005', name: 'Galp Energia', country: 'Portugal', currency: 'EUR', billingTerms: 'Net 30', status: 'Pending Onboarding', arBalance: 0 },
  { id: 'CUST-006', name: 'Kenya Commercial Bank', country: 'Kenya', currency: 'KES', billingTerms: 'Net 30', status: 'Active', arBalance: 850000 },
]

// ── Financial Health snapshot ────────────────────────────────────────────────
export const financialHealth = {
  arAging: [
    { bucket: '0–30 days', amount: 384000 },
    { bucket: '31–60 days', amount: 156000 },
    { bucket: '61–90 days', amount: 89000 },
    { bucket: '90+ days', amount: 41000 },
  ],
  apAging: [
    { bucket: '0–30 days', amount: 142000 },
    { bucket: '31–60 days', amount: 38000 },
    { bucket: '61–90 days', amount: 6400 },
    { bucket: '90+ days', amount: 0 },
  ],
  workingCapital: {
    cashPosition: 728500,
    currentAssets: 870000,
    currentLiabilities: 224000,
    workingCapital: 646000,
    currentRatio: 3.88,
  },
  revenueForecast: [
    { month: 'May 2026', amount: 310000 },
    { month: 'Jun 2026', amount: 340000 },
    { month: 'Jul 2026', amount: 295000 },
    { month: 'Aug 2026', amount: 380000 },
    { month: 'Sep 2026', amount: 410000 },
    { month: 'Oct 2026', amount: 425000 },
  ],
  expenseForecast: [
    { month: 'May 2026', amount: 245000 },
    { month: 'Jun 2026', amount: 270000 },
    { month: 'Jul 2026', amount: 255000 },
    { month: 'Aug 2026', amount: 290000 },
    { month: 'Sep 2026', amount: 305000 },
    { month: 'Oct 2026', amount: 310000 },
  ],
  trialBalance: [
    { account: 'Cash & Bank', debit: 728500, credit: 0 },
    { account: 'Accounts Receivable', debit: 670000, credit: 0 },
    { account: 'Fixed Assets (net)', debit: 142000, credit: 0 },
    { account: 'Accounts Payable', debit: 0, credit: 186400 },
    { account: 'Accrued Expenses', debit: 0, credit: 37800 },
    { account: 'Share Capital', debit: 0, credit: 500000 },
    { account: 'Retained Earnings', debit: 0, credit: 816300 },
    { account: 'Revenue YTD', debit: 0, credit: 1820000 },
    { account: 'Expenses YTD', debit: 1240000, credit: 0 },
  ],
  expenseSummary: [
    { category: 'Salaries & contractor costs', amount: 745000, pctOfTotal: 60 },
    { category: 'SaaS & subscriptions', amount: 286000, pctOfTotal: 23 },
    { category: 'Vendor services', amount: 134000, pctOfTotal: 11 },
    { category: 'Office & admin', amount: 46500, pctOfTotal: 4 },
    { category: 'Travel', amount: 28500, pctOfTotal: 2 },
  ],
  vatCredit: {
    inputVatQ2: 62400,
    outputVatQ2: 91000,
    netVatPayable: 28600,
    openCredits: 14200,
    nextFilingDue: '28 Jul 2026',
  },
} as const

// ── Employees ────────────────────────────────────────────────────────────────
export const employees: Employee[] = [
  { id: 'E-001', name: 'Aisha Khalid', role: 'CEO', entity: 'DigitalQatalyst MENA', costCentre: 'CC-001', status: 'Active', startDate: '03 Jan 2022', assetsAssigned: 2, leaveBalanceDays: 18 },
  { id: 'E-002', name: 'Mohammed Rashid', role: 'Finance Lead', entity: 'DigitalQatalyst MENA', costCentre: 'CC-002', managerId: 'E-001', status: 'Active', startDate: '15 Mar 2022', assetsAssigned: 2, leaveBalanceDays: 14 },
  { id: 'E-003', name: 'Sara Pereira', role: 'Finance Analyst', entity: 'DigitalQatalyst Iberia', costCentre: 'CC-002', managerId: 'E-002', status: 'Active', startDate: '01 Sep 2023', assetsAssigned: 1, leaveBalanceDays: 21 },
  { id: 'E-004', name: 'Jay Nair', role: 'Project Coordinator', entity: 'DigitalQatalyst MENA', costCentre: 'CC-005', managerId: 'E-006', status: 'Active', startDate: '12 Feb 2024', assetsAssigned: 1, leaveBalanceDays: 16 },
  { id: 'E-005', name: 'Tariq Al-Amin', role: 'Platform Administrator', entity: 'DigitalQatalyst MENA', costCentre: 'CC-003', managerId: 'E-006', status: 'Active', startDate: '20 May 2023', assetsAssigned: 3, leaveBalanceDays: 12 },
  { id: 'E-006', name: 'Layla Seitkali', role: 'Tech Lead', entity: 'DigitalQatalyst East Africa', costCentre: 'CC-003', managerId: 'E-001', status: 'Active', startDate: '08 Aug 2022', assetsAssigned: 2, leaveBalanceDays: 9 },
  { id: 'E-007', name: 'Fatima Bin Hammad', role: 'HR & People Lead', entity: 'DigitalQatalyst MENA', costCentre: 'CC-002', managerId: 'E-001', status: 'Active', startDate: '01 Apr 2023', assetsAssigned: 1, leaveBalanceDays: 20 },
  { id: 'E-008', name: 'Rashid Ahmed', role: 'Operations & Inventory Lead', entity: 'DigitalQatalyst MENA', costCentre: 'CC-002', managerId: 'E-002', status: 'Active', startDate: '14 Jun 2023', assetsAssigned: 2, leaveBalanceDays: 17 },
  { id: 'E-009', name: 'Maya Sharma', role: 'Office Manager', entity: 'DigitalQatalyst MENA', costCentre: 'CC-002', managerId: 'E-007', status: 'Active', startDate: '03 Nov 2023', assetsAssigned: 1, leaveBalanceDays: 22 },
  { id: 'E-010', name: 'Yasmin Al-Mansoori', role: 'Procurement Lead', entity: 'DigitalQatalyst MENA', costCentre: 'CC-002', managerId: 'E-002', status: 'Active', startDate: '17 Sep 2023', assetsAssigned: 1, leaveBalanceDays: 15 },
  { id: 'E-011', name: 'Daniel Kimani', role: 'Junior Engineer', entity: 'DigitalQatalyst East Africa', costCentre: 'CC-003', managerId: 'E-006', status: 'Onboarding', startDate: '25 May 2026', assetsAssigned: 0, leaveBalanceDays: 0 },
  { id: 'E-012', name: 'Priya Menon', role: 'Service Designer', entity: 'DigitalQatalyst MENA', costCentre: 'CC-005', managerId: 'E-001', status: 'Offboarding', startDate: '11 Jan 2023', assetsAssigned: 2, leaveBalanceDays: 4 },
]

// ── Leave Requests ───────────────────────────────────────────────────────────
export const leaveRequests: LeaveRequest[] = [
  { id: 'LV-001', employeeId: 'E-003', type: 'Annual', startDate: '02 Jun 2026', endDate: '06 Jun 2026', days: 5, status: 'Approved', approver: 'Mohammed Rashid' },
  { id: 'LV-002', employeeId: 'E-004', type: 'Annual', startDate: '15 Jun 2026', endDate: '19 Jun 2026', days: 5, status: 'Pending Approval', approver: 'Layla Seitkali', reason: 'Family vacation' },
  { id: 'LV-003', employeeId: 'E-005', type: 'Sick', startDate: '20 May 2026', endDate: '21 May 2026', days: 2, status: 'Approved', approver: 'Layla Seitkali' },
  { id: 'LV-004', employeeId: 'E-009', type: 'Annual', startDate: '01 Jul 2026', endDate: '12 Jul 2026', days: 10, status: 'Pending Approval', approver: 'Fatima Bin Hammad', reason: 'Wedding + travel' },
  { id: 'LV-005', employeeId: 'E-008', type: 'Parental', startDate: '05 Jun 2026', endDate: '03 Jul 2026', days: 21, status: 'Approved', approver: 'Mohammed Rashid', reason: 'Paternity leave' },
  { id: 'LV-006', employeeId: 'E-011', type: 'Unpaid', startDate: '10 Jun 2026', endDate: '11 Jun 2026', days: 2, status: 'Rejected', approver: 'Fatima Bin Hammad', reason: 'During onboarding period' },
]

// ── HR Requests ──────────────────────────────────────────────────────────────
export const hrRequests: HRRequest[] = [
  { id: 'HR-001', type: 'Salary Certificate', description: 'Salary certificate for mortgage application', requester: 'Sara Pereira', employeeId: 'E-003', status: 'Fulfilled', owner: 'Fatima Bin Hammad', submittedDate: '10 May 2026' },
  { id: 'HR-002', type: 'Employment Letter', description: 'Embassy letter for UK visa', requester: 'Jay Nair', employeeId: 'E-004', status: 'In Review', owner: 'Fatima Bin Hammad', submittedDate: '16 May 2026', dueDate: '23 May 2026' },
  { id: 'HR-003', type: 'Onboarding Support', description: 'Onboarding pack for new starter Daniel Kimani', requester: 'Layla Seitkali', employeeId: 'E-011', status: 'In Review', owner: 'Fatima Bin Hammad', submittedDate: '18 May 2026', dueDate: '25 May 2026' },
  { id: 'HR-004', type: 'Offboarding Clearance', description: 'Final clearance for Priya Menon', requester: 'Aisha Khalid', employeeId: 'E-012', status: 'In Review', owner: 'Fatima Bin Hammad', submittedDate: '15 May 2026', dueDate: '30 May 2026', notes: 'Pending: laptop return, access revocation' },
  { id: 'HR-005', type: 'Employee Document', description: 'Updated emergency contact details', requester: 'Tariq Al-Amin', employeeId: 'E-005', status: 'Fulfilled', owner: 'Fatima Bin Hammad', submittedDate: '12 May 2026' },
  { id: 'HR-006', type: 'HR Admin Support', description: 'Update bank details after change of account', requester: 'Mohammed Rashid', employeeId: 'E-002', status: 'Clarification Needed', owner: 'Fatima Bin Hammad', submittedDate: '14 May 2026', notes: 'Awaiting bank confirmation letter' },
]

// ── Employee Transitions (Onboarding / Offboarding) ──────────────────────────
export const transitions: EmployeeTransition[] = [
  {
    id: 'TR-001', employeeId: 'E-011', type: 'Onboarding', startedDate: '20 May 2026', targetDate: '03 Jun 2026', status: 'In Progress',
    tasks: [
      { label: 'Contract signed', owner: 'Fatima Bin Hammad', done: true },
      { label: 'Email + system access', owner: 'Tariq Al-Amin', done: true },
      { label: 'Laptop assigned', owner: 'Rashid Ahmed', done: false },
      { label: 'Office 365 licence', owner: 'Rashid Ahmed', done: false },
      { label: 'Onboarding session booked', owner: 'Fatima Bin Hammad', done: true },
      { label: 'Buddy assigned', owner: 'Layla Seitkali', done: false },
    ],
  },
  {
    id: 'TR-002', employeeId: 'E-012', type: 'Offboarding', startedDate: '15 May 2026', targetDate: '30 May 2026', status: 'In Progress',
    tasks: [
      { label: 'Resignation acknowledged', owner: 'Aisha Khalid', done: true },
      { label: 'Knowledge transfer plan', owner: 'Aisha Khalid', done: true },
      { label: 'Laptop return', owner: 'Rashid Ahmed', done: false },
      { label: 'Access revoked', owner: 'Tariq Al-Amin', done: false },
      { label: 'Final settlement', owner: 'Mohammed Rashid', done: false },
      { label: 'Experience letter', owner: 'Fatima Bin Hammad', done: false },
    ],
  },
  {
    id: 'TR-003', employeeId: 'E-009', type: 'Onboarding', startedDate: '01 Nov 2023', targetDate: '14 Nov 2023', status: 'Complete',
    tasks: [
      { label: 'Contract signed', owner: 'Fatima Bin Hammad', done: true },
      { label: 'Email + system access', owner: 'Tariq Al-Amin', done: true },
      { label: 'Laptop assigned', owner: 'Rashid Ahmed', done: true },
      { label: 'Onboarding session', owner: 'Fatima Bin Hammad', done: true },
    ],
  },
]

// ── Inventory Items ──────────────────────────────────────────────────────────
export const inventoryItems: InventoryItem[] = [
  // Consumables
  { id: 'INV-001', name: 'A4 Printer Paper', subType: 'Consumable', location: 'UAE HQ Store', quantity: 24, reorderLevel: 10, unit: 'reams', status: 'In Stock' },
  { id: 'INV-002', name: 'HP Toner Cartridge', subType: 'Consumable', location: 'UAE HQ Store', quantity: 3, reorderLevel: 5, unit: 'cartridges', status: 'Low Stock' },
  { id: 'INV-003', name: 'Coffee Capsules', subType: 'Consumable', location: 'UAE HQ Pantry', quantity: 8, reorderLevel: 20, unit: 'boxes', status: 'Low Stock' },
  { id: 'INV-004', name: 'Branded Notebooks', subType: 'Consumable', location: 'UAE HQ Store', quantity: 0, reorderLevel: 30, unit: 'pcs', status: 'Out of Stock' },
  // Licences
  { id: 'INV-005', name: 'Adobe Creative Cloud', subType: 'Licence', location: 'Digital', quantity: 10, unit: 'seats', custodian: 'Tariq Al-Amin', status: 'In Stock' },
  { id: 'INV-006', name: 'Office 365 E3', subType: 'Licence', location: 'Digital', quantity: 25, unit: 'seats', custodian: 'Tariq Al-Amin', status: 'In Stock' },
  { id: 'INV-007', name: 'Postman Enterprise', subType: 'Licence', location: 'Digital', quantity: 2, unit: 'seats', custodian: 'Layla Seitkali', status: 'Low Stock' },
  // Devices
  { id: 'INV-008', name: 'MacBook Pro M3 14"', subType: 'Device', location: 'Assigned', quantity: 6, unit: 'units', custodian: 'Various', status: 'In Stock' },
  { id: 'INV-009', name: 'Dell XPS 15', subType: 'Device', location: 'Assigned', quantity: 4, unit: 'units', custodian: 'Various', status: 'In Stock' },
  { id: 'INV-010', name: 'External 27" Monitor', subType: 'Device', location: 'UAE HQ Store', quantity: 2, reorderLevel: 3, unit: 'units', status: 'Low Stock' },
  { id: 'INV-011', name: 'AirPods Pro', subType: 'Device', location: 'UAE HQ Store', quantity: 5, unit: 'units', status: 'In Stock' },
]

// ── Inventory Movements (recent) ─────────────────────────────────────────────
export const inventoryMovements: InventoryMovement[] = [
  { id: 'MV-001', itemId: 'INV-008', type: 'Issue', quantity: 1, date: '17 May 2026', performedBy: 'Rashid Ahmed', recipient: 'Daniel Kimani', notes: 'Onboarding TR-001' },
  { id: 'MV-002', itemId: 'INV-002', type: 'Issue', quantity: 2, date: '16 May 2026', performedBy: 'Maya Sharma', recipient: 'Print room' },
  { id: 'MV-003', itemId: 'INV-001', type: 'Receipt', quantity: 12, date: '14 May 2026', performedBy: 'Rashid Ahmed', notes: 'PO from Al Fardan Office Supp.' },
  { id: 'MV-004', itemId: 'INV-008', type: 'Return', quantity: 1, date: '13 May 2026', performedBy: 'Rashid Ahmed', recipient: 'Priya Menon (offboarding pending)' },
  { id: 'MV-005', itemId: 'INV-006', type: 'Issue', quantity: 1, date: '12 May 2026', performedBy: 'Tariq Al-Amin', recipient: 'Daniel Kimani' },
]

// ── Admin / Back-Office Requests ─────────────────────────────────────────────
export const adminRequests: AdminRequest[] = [
  { id: 'ADM-001', type: 'Travel', description: 'Flight + hotel for Nairobi client kickoff', requester: 'Layla Seitkali', status: 'In Progress', owner: 'Maya Sharma', submittedDate: '14 May 2026', dueDate: '22 May 2026', slaDays: 5, daysOpen: 8 },
  { id: 'ADM-002', type: 'Visa / Admin', description: 'UK business visa for embassy meeting', requester: 'Jay Nair', status: 'Awaiting Evidence', owner: 'Maya Sharma', submittedDate: '13 May 2026', dueDate: '27 May 2026', slaDays: 7, daysOpen: 9, notes: 'Awaiting employment letter (HR-002)' },
  { id: 'ADM-003', type: 'Office Supplies', description: 'Restock printer toner and A4 paper', requester: 'Maya Sharma', status: 'Fulfilled', owner: 'Rashid Ahmed', submittedDate: '08 May 2026', slaDays: 2, daysOpen: 4 },
  { id: 'ADM-004', type: 'Document Support', description: 'Notarisation of MSA with Mazrui Holdings', requester: 'Mohammed Rashid', status: 'In Progress', owner: 'Maya Sharma', submittedDate: '17 May 2026', dueDate: '24 May 2026', slaDays: 4, daysOpen: 5 },
  { id: 'ADM-005', type: 'Facilities', description: 'Meeting room AC service request', requester: 'Aisha Khalid', status: 'Submitted', owner: 'Maya Sharma', submittedDate: '18 May 2026', slaDays: 2, daysOpen: 4, notes: 'AC tripping during long meetings' },
  { id: 'ADM-006', type: 'Business Card / Letter', description: 'New business cards for HR Lead', requester: 'Fatima Bin Hammad', status: 'Fulfilled', owner: 'Maya Sharma', submittedDate: '05 May 2026', slaDays: 5, daysOpen: 7 },
  { id: 'ADM-007', type: 'Travel', description: 'Hotel + per-diem for Portugal entity setup visit', requester: 'Mohammed Rashid', status: 'Blocked', owner: 'Maya Sharma', submittedDate: '10 May 2026', dueDate: '20 May 2026', slaDays: 5, daysOpen: 12, notes: 'Awaiting Portugal entity bank confirmation' },
]

