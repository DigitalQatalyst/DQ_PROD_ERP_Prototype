export type RequestStatus =
  | 'Draft'
  | 'Submitted'
  | 'In Review'
  | 'Approved'
  | 'Clarification Needed'
  | 'Evidence Pending'
  | 'Rejected'
  | 'Fulfilled'
  | 'Pending Approval'

export type BCSyncStatus = 'Synced' | 'Failed' | 'Pending' | 'Not Synced'

export type SeverityLevel = 'High' | 'Warning' | 'Low'

export type PersonaId = 'AK' | 'MR' | 'SP' | 'JN' | 'TA' | 'LS'

export type PersonaRole =
  | 'EXEC'
  | 'FIN-OWN'
  | 'FIN-OPS'
  | 'REQ'
  | 'ADMIN'
  | 'BC-STEWARD'

export interface Persona {
  id: PersonaId
  initials: string
  name: string
  role: PersonaRole
  roleLabel: string
  landingRoute: string
  navDomains: string[]
}

export interface Entity {
  name: string
  country: string
  currency: string
}

export interface CostCentre {
  id: string
  name: string
}

export interface Project {
  id: string
  name: string
  status: 'Active' | 'Planning' | 'Closed'
  owner: string
  budget: number
  currency: string
}

export interface Vendor {
  id: string
  name: string
  category: string
  bcSync: BCSyncStatus
  status: 'Active' | 'Inactive'
  annualValue: string
}

export interface Request {
  id: string
  type: string
  description: string
  requester: string
  amount: number
  currency: string
  status: RequestStatus
  approver: string
  submittedDate: string
  dueDate?: string
  linkedProject?: string
  vendorId?: string
  vendorName?: string
  evidence?: EvidenceItem[]
  bcSync?: BCSyncStatus
  bcRef?: string
  isHighValue?: boolean
  notes?: string
}

export interface EvidenceItem {
  label: string
  checked: boolean
  required: boolean
}

export interface Subscription {
  id: string
  name: string
  renewalDate: string
  daysUntilRenewal: number
  amount: number
  currency: string
  owner: string
  autoRenew: boolean
  actionRequired?: string
}

export interface SyncRecord {
  id: string
  objectRef: string
  objectType: 'Invoice' | 'Vendor' | 'Purchase' | 'Cost Centre'
  entity: string
  bcRef?: string
  status: BCSyncStatus
  lastAttempt: string
  retryCount?: number
  errorMessage?: string
}

export interface KPI {
  label: string
  value: string | number
  unit?: string
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'mono'
}

export interface AuditEvent {
  actor: string
  action: string
  target: string
  timestamp: string
}

export type MilestoneStatus = 'Not Started' | 'In Progress' | 'Complete' | 'Overdue' | 'Delayed'

export interface Milestone {
  id: string
  projectId: string
  name: string
  status: MilestoneStatus
  dueDate: string
  owner: string
  completionPct: number
}

export interface Customer {
  id: string
  name: string
  country: string
  currency: string
  billingTerms: string
  status: 'Active' | 'Pending Onboarding' | 'Inactive'
  arBalance: number
  linkedProject?: string
}

export interface NavItem {
  label: string
  icon: string
  route: string
  badge?: number
  roles?: PersonaRole[]
  subItems?: NavItem[]
}

export interface NavGroup {
  label: string
  roles?: PersonaRole[]
  items: NavItem[]
}
