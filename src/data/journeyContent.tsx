// Shared lookups used by MarketplaceJourney and the per-item grids on
// Discern / Design / Drive marketplace landings.

export const policyMap: Record<string, string[]> = {
  // Finance
  'expense': ['POL-EXP', 'POL-AUTH'],
  'invoice-payment': ['POL-VAT', 'POL-AUTH'],
  'budget-amendment': ['POL-AUTH'],
  'tax-support': ['POL-VAT'],
  'budget-requisition': ['POL-AUTH'],
  'customer-onboarding': ['POL-VAT', 'POL-DATA'],
  // Procurement
  'purchase-request': ['POL-PROC', 'POL-AUTH'],
  'vendor-onboarding': ['POL-PROC'],
  'quote-rfq': ['POL-PROC'],
  'subscription-renewal': ['POL-PROC'],
  // Project & Service
  'project-cost': ['POL-AUTH'],
  'service-billing': ['POL-AUTH'],
  'delivery-support': ['POL-AUTH'],
  'project-linked-procurement': ['POL-PROC', 'POL-AUTH'],
  // Admin & Back-Office
  'travel-admin': ['POL-TRAVEL', 'POL-AUTH'],
  'office-supplies': ['POL-PROC'],
  'document-support': ['POL-TRAVEL'],
  // Inventory & Asset
  'equipment-request': ['POL-PROC'],
  'licence-request': ['POL-DATA'],
  // Master Data
  'vendor-data-change': ['POL-PROC', 'POL-DATA'],
  'cost-centre-change': ['POL-AUTH'],
  'user-role-change': ['POL-DATA'],
  'project-entity-change': ['POL-DATA'],
  // Integration
  'access-request': ['POL-DATA'],
  // HR
  'employment-letter': ['POL-DATA'],
  'onboarding-support': ['POL-DATA'],
  'offboarding-clearance': ['POL-DATA'],
  'employee-document': ['POL-DATA'],
}

export interface PolicyContent {
  title: string
  summary: string
  keyRule: string
}

export const policies: Record<string, PolicyContent> = {
  'POL-EXP':    { title: 'Expense & Reimbursement Policy',          summary: 'Defines reimbursable expenses, per-diem rates by entity, evidence requirements, and submission window.',         keyRule: 'Receipts mandatory for any expense ≥ AED 50; submit within 30 days.' },
  'POL-PROC':   { title: 'Procurement Policy',                       summary: 'Vendor onboarding requirements, quote thresholds, PO routing rules, procurement authority.',                     keyRule: '3 quotes required above AED 25k; single-source justification above AED 100k.' },
  'POL-VAT':    { title: 'UAE VAT & E-Invoicing Policy',             summary: 'TRN requirements on invoices, 5% VAT rate, tax invoice format for input VAT recovery.',                           keyRule: 'All invoices ≥ AED 10,000 must include TRN of supplier and buyer.' },
  'POL-AUTH':   { title: 'Approval Authority Policy',                summary: 'Who can approve what — by amount, category, entity, and request type.',                                          keyRule: 'Finance Control Owner: up to AED 50k. Executive: AED 50k and above.' },
  'POL-TRAVEL': { title: 'Travel & Admin Policy',                    summary: 'Travel booking rules, per-diem entitlements, hotel/flight class limits, visa support.',                          keyRule: 'Pre-approval required for all international travel.' },
  'POL-DATA':   { title: 'Data Sovereignty & External Sharing Policy', summary: 'Cross-border data movement, external partner access scoping, audit/assurance exports.',                        keyRule: 'UAE entity data stays in UAE region by default; cross-border requires steward sign-off.' },
}

export const workflowMap: Record<string, string> = {
  'expense': 'expense',
  'invoice-payment': 'purchase',
  'purchase-request': 'purchase',
  'project-linked-procurement': 'purchase',
  'equipment-request': 'purchase',
  'vendor-onboarding': 'vendor-onboarding',
  'customer-onboarding': 'customer-onboarding',
  'service-billing': 'milestone-billing',
  'milestone-update': 'milestone-billing',
}

export interface WorkflowContent {
  title: string
  duration: string
  steps: string[]
}

export const workflows: Record<string, WorkflowContent> = {
  'purchase':            { title: 'Purchase Request → PO → Payment',              duration: '12–18 business days', steps: ['Submit', 'Quote review', 'Finance approval', 'PO issuance', 'Goods receipt', 'Vendor invoice', 'Payment + BC sync'] },
  'expense':             { title: 'Expense → Approval → Reimbursement',           duration: '3–5 business days',   steps: ['Submit with receipts', 'AI evidence check', 'Finance approval', 'Reimbursement', 'BC sync'] },
  'vendor-onboarding':   { title: 'Vendor Onboarding → BC Vendor Record',         duration: '5–7 business days',   steps: ['Submit request', 'Evidence collection', 'Compliance review', 'BC sync', 'Active vendor'] },
  'customer-onboarding': { title: 'Customer Onboarding → Customer Master',        duration: '5–7 business days',   steps: ['Submit request', 'Evidence (reg/VAT/MSA)', 'Finance approval', 'Customer master', 'BC sync'] },
  'milestone-billing':   { title: 'Milestone → Service Billing → Client Invoice', duration: '4–6 business days',   steps: ['Milestone complete', 'Submit billing request', 'Finance approval', 'Client invoice', 'AR entry'] },
}

// ── Drive activity (synthetic — would come from real data) ──────────────────

export interface DriveActivity {
  inProgress: number
  awaitingClarification: number
  approvedThisWeek: number
}

// Default activity for items without specific data
const defaultActivity: DriveActivity = { inProgress: 0, awaitingClarification: 0, approvedThisWeek: 0 }

export const driveActivity: Record<string, DriveActivity> = {
  'expense':              { inProgress: 3, awaitingClarification: 1, approvedThisWeek: 2 },
  'invoice-payment':      { inProgress: 5, awaitingClarification: 0, approvedThisWeek: 1 },
  'budget-requisition':   { inProgress: 1, awaitingClarification: 0, approvedThisWeek: 1 },
  'budget-amendment':     { inProgress: 1, awaitingClarification: 0, approvedThisWeek: 0 },
  'purchase-request':     { inProgress: 4, awaitingClarification: 0, approvedThisWeek: 1 },
  'vendor-onboarding':    { inProgress: 1, awaitingClarification: 1, approvedThisWeek: 0 },
  'subscription-renewal': { inProgress: 3, awaitingClarification: 0, approvedThisWeek: 0 },
  'customer-onboarding':  { inProgress: 1, awaitingClarification: 1, approvedThisWeek: 0 },
  'leave-request':        { inProgress: 2, awaitingClarification: 0, approvedThisWeek: 3 },
  'employment-letter':    { inProgress: 1, awaitingClarification: 0, approvedThisWeek: 1 },
  'onboarding-support':   { inProgress: 1, awaitingClarification: 0, approvedThisWeek: 0 },
  'offboarding-clearance':{ inProgress: 1, awaitingClarification: 0, approvedThisWeek: 0 },
  'inventory-issue':      { inProgress: 2, awaitingClarification: 0, approvedThisWeek: 4 },
  'equipment-request':    { inProgress: 1, awaitingClarification: 0, approvedThisWeek: 1 },
  'asset-assignment':     { inProgress: 1, awaitingClarification: 0, approvedThisWeek: 2 },
  'travel-admin':         { inProgress: 3, awaitingClarification: 1, approvedThisWeek: 1 },
  'office-supplies':      { inProgress: 2, awaitingClarification: 0, approvedThisWeek: 1 },
  'facilities-request':   { inProgress: 1, awaitingClarification: 0, approvedThisWeek: 0 },
  'bc-sync-issue':        { inProgress: 3, awaitingClarification: 0, approvedThisWeek: 0 },
  'milestone-update':     { inProgress: 2, awaitingClarification: 0, approvedThisWeek: 1 },
}

export function getActivity(itemId: string): DriveActivity {
  return driveActivity[itemId] ?? defaultActivity
}
