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

export type PersonaId = 'AK' | 'MR' | 'SP' | 'JN' | 'TA' | 'LS' | 'FH' | 'RA' | 'MS' | 'YM'

export type PersonaRole =
  | 'EXEC'
  | 'FIN-OWN'
  | 'FIN-OPS'
  | 'REQ'
  | 'ADMIN'
  | 'BC-STEWARD'
  | 'HR-OWN'
  | 'INV-OWN'
  | 'ADM-OWN'
  | 'PROC-OWN'

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

// ── HR & People ──────────────────────────────────────────────────────────────
export type EmployeeStatus = 'Active' | 'Onboarding' | 'Offboarding' | 'On Leave' | 'Inactive'

export interface Employee {
  id: string
  name: string
  role: string
  entity: string
  costCentre: string
  managerId?: string
  status: EmployeeStatus
  startDate: string
  assetsAssigned: number
  leaveBalanceDays: number
}

export type LeaveType = 'Annual' | 'Sick' | 'Parental' | 'Unpaid' | 'Compassionate'

export interface LeaveRequest {
  id: string
  employeeId: string
  type: LeaveType
  startDate: string
  endDate: string
  days: number
  status: 'Pending Approval' | 'Approved' | 'Rejected' | 'Cancelled'
  approver: string
  reason?: string
}

export type HRRequestType =
  | 'Employment Letter'
  | 'Salary Certificate'
  | 'Employee Document'
  | 'Onboarding Support'
  | 'Offboarding Clearance'
  | 'HR Admin Support'

export interface HRRequest {
  id: string
  type: HRRequestType
  description: string
  requester: string
  employeeId?: string
  status: 'Submitted' | 'In Review' | 'Approved' | 'Fulfilled' | 'Clarification Needed'
  owner: string
  submittedDate: string
  dueDate?: string
  notes?: string
}

export type TransitionType = 'Onboarding' | 'Offboarding'
export interface TransitionTask {
  label: string
  owner: string
  done: boolean
}
export interface EmployeeTransition {
  id: string
  employeeId: string
  type: TransitionType
  startedDate: string
  targetDate: string
  status: 'In Progress' | 'Blocked' | 'Complete'
  tasks: TransitionTask[]
}

// ── Inventory & Assets ───────────────────────────────────────────────────────
export type InventorySubType = 'Consumable' | 'Licence' | 'Device'

export interface InventoryItem {
  id: string
  name: string
  subType: InventorySubType
  location: string
  quantity: number
  reorderLevel?: number
  unit?: string
  custodian?: string
  linkedAssetId?: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Reserved'
}

export type InventoryMovementType = 'Issue' | 'Receipt' | 'Return' | 'Transfer' | 'Adjustment'

export interface InventoryMovement {
  id: string
  itemId: string
  type: InventoryMovementType
  quantity: number
  date: string
  performedBy: string
  recipient?: string
  notes?: string
}

// ── Admin & Back-Office ─────────────────────────────────────────────────────
export type AdminRequestType =
  | 'Travel'
  | 'Visa / Admin'
  | 'Office Supplies'
  | 'Document Support'
  | 'Facilities'
  | 'Business Card / Letter'

export interface AdminRequest {
  id: string
  type: AdminRequestType
  description: string
  requester: string
  status: 'Submitted' | 'In Progress' | 'Awaiting Evidence' | 'Fulfilled' | 'Blocked'
  owner: string
  submittedDate: string
  dueDate?: string
  slaDays: number
  daysOpen: number
  notes?: string
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
