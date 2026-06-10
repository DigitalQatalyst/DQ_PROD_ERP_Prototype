import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PersonaProvider } from './context/PersonaContext'
import { ToastProvider } from './components/Toast'
import AppLayout from './layouts/AppLayout'
// Built pages — 10 core
import PlatformHome from './pages/PlatformHome'
import ExecutiveHome from './pages/ExecutiveHome'
import FinanceControlHome from './pages/FinanceControlHome'
import FinanceOpsConsole from './pages/FinanceOpsConsole'
import RequestorHome from './pages/RequestorHome'
import PlatformAdminConsole from './pages/PlatformAdminConsole'
import BCIntegrationHealth from './pages/BCIntegrationHealth'
import UniversalRequestIntake from './pages/UniversalRequestIntake'
import RequestTracker from './pages/RequestTracker'
import ApprovalConsole from './pages/ApprovalConsole'
import EscalationsExceptions from './pages/EscalationsExceptions'

// Home group
import PersonalDashboard from './pages/PersonalDashboard'
import RoleEntitySwitch from './pages/RoleEntitySwitch'

// My Work group
import MyTasks from './pages/MyTasks'
import Clarifications from './pages/Clarifications'
import EvidenceActions from './pages/EvidenceActions'
import Notifications from './pages/Notifications'

// Finance Control group
import ExpenseReimbursement from './pages/ExpenseReimbursement'
import InvoicePaymentOps from './pages/InvoicePaymentOps'
import BudgetCostCentre from './pages/BudgetCostCentre'
import TaxCompliance from './pages/TaxCompliance'
import PeriodCloseReadiness from './pages/PeriodCloseReadiness'

// Procurement group
import ProcurementWorkspace from './pages/ProcurementWorkspace'
import PurchaseRequestCentre from './pages/PurchaseRequestCentre'
import VendorDirectory from './pages/VendorDirectory'
import VendorOnboarding from './pages/VendorOnboarding'
import QuotePOTracker from './pages/QuotePOTracker'
import SubscriptionRenewals from './pages/SubscriptionRenewals'
import AssetRegister from './pages/AssetRegister'

// Project & Service Economics group
import ProjectServiceRegister from './pages/ProjectServiceRegister'
import ProjectEconomicsWorkspace from './pages/ProjectEconomicsWorkspace'
import ProjectLinkedCostView from './pages/ProjectLinkedCostView'
import ServiceBillingReadiness from './pages/ServiceBillingReadiness'
import ProjectMilestoneTracker from './pages/ProjectMilestoneTracker'

// New finance + customer + intelligence pages
import CustomerMaster from './pages/CustomerMaster'
import CustomerOnboarding from './pages/CustomerOnboarding'
import FinancialHealthReport from './pages/FinancialHealthReport'
import BudgetRequisitions from './pages/BudgetRequisitions'

// HR domain
import HRHome from './pages/hr/HRHome'
import EmployeeRegister from './pages/hr/EmployeeRegister'
import HRServiceRequestCentre from './pages/hr/HRServiceRequestCentre'
import HROperationsConsole from './pages/hr/HROperationsConsole'
import LeaveManagement from './pages/hr/LeaveManagement'
import OnboardingOffboardingTracker from './pages/hr/OnboardingOffboardingTracker'

// Inventory & Assets domain
import InventoryHome from './pages/inventory/InventoryHome'
import InventoryRegister from './pages/inventory/InventoryRegister'
import InventoryRequestTracker from './pages/inventory/InventoryRequestTracker'
import InventoryOperationsConsole from './pages/inventory/InventoryOperationsConsole'
import AssetCustodyConsole from './pages/inventory/AssetCustodyConsole'

// Admin & Back-Office domain
import BackOfficeHome from './pages/admin-back-office/BackOfficeHome'
import TravelAdminRequestCentre from './pages/admin-back-office/TravelAdminRequestCentre'
import OfficeServicesTracker from './pages/admin-back-office/OfficeServicesTracker'
import BackOfficeFulfilmentConsole from './pages/admin-back-office/BackOfficeFulfilmentConsole'

// Wave 2 — Governance
import ApprovalGovernanceConsole from './pages/governance/ApprovalGovernanceConsole'
import AuditPackBuilder from './pages/governance/AuditPackBuilder'
import OperationalSLADashboard from './pages/governance/OperationalSLADashboard'

// Wave 3 — Stage 4 specialised
import WorkforceCostAnalytics from './pages/intelligence/WorkforceCostAnalytics'
import BackOfficePerformance from './pages/intelligence/BackOfficePerformance'
import InventoryReconciliationPack from './pages/inventory/InventoryReconciliationPack'
import AssetLifecyclePack from './pages/inventory/AssetLifecyclePack'

// Request & Approval Governance group
import ApprovalRulesThresholds from './pages/ApprovalRulesThresholds'
import AuditTrailExplorer from './pages/AuditTrailExplorer'

// Master Data & Structure group
import EntityLocationStructure from './pages/EntityLocationStructure'
import UsersRolesDelegations from './pages/UsersRolesDelegations'
import CostCentresCategories from './pages/CostCentresCategories'
import VendorCustomerMasterData from './pages/VendorCustomerMasterData'
import ProjectServiceMasterData from './pages/ProjectServiceMasterData'
import BCMappingReference from './pages/BCMappingReference'

// Intelligence group
import FinanceInsights from './pages/FinanceInsights'
import ProcurementInsights from './pages/ProcurementInsights'
import ProjectInsights from './pages/ProjectInsights'
import AIBriefs from './pages/AIBriefs'
import RiskAlerts from './pages/RiskAlerts'

// Platform Administration group
import SyncErrorQueue from './pages/SyncErrorQueue'
import APIConnectorMapping from './pages/APIConnectorMapping'
import WorkflowConfiguration from './pages/WorkflowConfiguration'
import AIGuardrailsAuditLog from './pages/AIGuardrailsAuditLog'
import ChangeRequestRegister from './pages/ChangeRequestRegister'
import ReleaseEnvironmentControl from './pages/ReleaseEnvironmentControl'

// Marketplace — legacy domain catalogues (kept for backward links from DiscoverySearch)
import FinanceServicesCatalogue from './pages/marketplace/FinanceServicesCatalogue'
import ProcurementServicesCatalogue from './pages/marketplace/ProcurementServicesCatalogue'
import ProjectServiceCatalogue from './pages/marketplace/ProjectServiceCatalogue'
import AdminAssetCatalogue from './pages/marketplace/AdminAssetCatalogue'
import MasterDataCatalogue from './pages/marketplace/MasterDataCatalogue'
import IntegrationSupportCatalogue from './pages/marketplace/IntegrationSupportCatalogue'
import DiscoverySearch from './pages/marketplace/DiscoverySearch'

// Marketplace — 4D structure (Discern / Design / Deploy / Drive)
import MarketplaceLayout from './pages/marketplace/MarketplaceLayout'
import DiscernMarketplace from './pages/marketplace/DiscernMarketplace'
import DiscernGuidedAssistant from './pages/marketplace/DiscernGuidedAssistant'
import DiscernPolicyLibrary from './pages/marketplace/DiscernPolicyLibrary'
import DiscernThresholdReference from './pages/marketplace/DiscernThresholdReference'
import DesignMarketplace from './pages/marketplace/DesignMarketplace'
import DesignTemplateBrowser from './pages/marketplace/DesignTemplateBrowser'
import DesignEvidenceLibrary from './pages/marketplace/DesignEvidenceLibrary'
import DesignWorkflowBlueprints from './pages/marketplace/DesignWorkflowBlueprints'
import DeployMarketplace from './pages/marketplace/DeployMarketplace'
import DriveMarketplace from './pages/marketplace/DriveMarketplace'
import MarketplaceJourney from './pages/marketplace/MarketplaceJourney'


// AI Cockpit
import AICockpit from './pages/AICockpit'

// Finance Workspace
import FinanceWorkQueue from './pages/finance/FinanceWorkQueue'
import PaymentProcessing from './pages/finance/PaymentProcessing'
import InvoiceReview from './pages/finance/InvoiceReview'
import BudgetReview from './pages/finance/BudgetReview'
import FinanceRequestTracker from './pages/finance/FinanceRequestTracker'

// HR Workspace
import HRWorkQueue from './pages/hr/HRWorkQueue'
import OnboardingOperations from './pages/hr/OnboardingOperations'
import EmployeeChangeOperations from './pages/hr/EmployeeChangeOperations'
import PeopleServiceTracker from './pages/hr/PeopleServiceTracker'
import HRApprovalReadiness from './pages/hr/HRApprovalReadiness'

// Procurement Workspace
import ProcurementWorkQueue from './pages/procurement/ProcurementWorkQueue'
import VendorReview from './pages/procurement/VendorReview'
import PurchaseRequestReview from './pages/procurement/PurchaseRequestReview'
import QuotationReview from './pages/procurement/QuotationReview'
import POReadinessTracker from './pages/procurement/POReadinessTracker'

// Inventory Workspace
import InventoryWorkQueue from './pages/inventory-workspace/InventoryWorkQueue'
import MovementTracker from './pages/inventory-workspace/MovementTracker'
import AssetAssignmentTracker from './pages/inventory-workspace/AssetAssignmentTracker'
import AssetReturnReplacement from './pages/inventory-workspace/AssetReturnReplacement'
import StockExceptionReview from './pages/inventory-workspace/StockExceptionReview'

// Project Workspace
import ProjectEconomicsQueue from './pages/project/ProjectEconomicsQueue'
import CostBillingReadinessTracker from './pages/project/CostBillingReadinessTracker'
import MasterDataReviewQueue from './pages/project/MasterDataReviewQueue'
import DimensionEntityChangeReview from './pages/project/DimensionEntityChangeReview'
import ERPRecordReadinessTracker from './pages/project/ERPRecordReadinessTracker'

// Service Operations
import FulfilmentConsole from './pages/service-ops/FulfilmentConsole'
import AssignmentQueue from './pages/service-ops/AssignmentQueue'
import ServiceOwnerView from './pages/service-ops/ServiceOwnerView'
import ReturnedItems from './pages/service-ops/ReturnedItems'
import ClosureHandover from './pages/service-ops/ClosureHandover'
import ServiceApprovalQueue from './pages/service-ops/ApprovalQueue'
import ServiceApprovalTracker from './pages/service-ops/ApprovalTracker'
import ControlChecks from './pages/service-ops/ControlChecks'
import PolicyExceptionReview from './pages/service-ops/PolicyExceptionReview'
import DecisionHistory from './pages/service-ops/DecisionHistory'
import ServiceSLADashboard from './pages/service-ops/SLADashboard'
import OverdueItems from './pages/service-ops/OverdueItems'
import ServiceEscalationQueue from './pages/service-ops/EscalationQueue'
import BlockedRequests from './pages/service-ops/BlockedRequests'
import RejectedDisputedItems from './pages/service-ops/RejectedDisputedItems'
import SyncMonitor from './pages/service-ops/SyncMonitor'
import FailedSyncs from './pages/service-ops/FailedSyncs'
import PendingSyncs from './pages/service-ops/PendingSyncs'
import ReconciliationQueue from './pages/service-ops/ReconciliationQueue'
import ERPReferenceMapping from './pages/service-ops/ERPReferenceMapping'
import ERPOperationsDashboard from './pages/service-ops/ERPOperationsDashboard'
import ServicePerformanceDashboard from './pages/service-ops/ServicePerformanceDashboard'
import ApprovalBottleneckInsights from './pages/service-ops/ApprovalBottleneckInsights'
import EvidenceRepository from './pages/service-ops/EvidenceRepository'
import ServiceAuditTrail from './pages/service-ops/AuditTrail'

// Platform Management
import ServiceCategories from './pages/platform/ServiceCategories'
import ServiceForms from './pages/platform/ServiceForms'
import RequiredEvidenceSetup from './pages/platform/RequiredEvidenceSetup'
import SLASetup from './pages/platform/SLASetup'
import CatalogueVisibilityRules from './pages/platform/CatalogueVisibilityRules'
import PlatformWorkflowBuilder from './pages/platform/WorkflowBuilder'
import PlatformApprovalRules from './pages/platform/ApprovalRules'
import PlatformApprovalThresholds from './pages/platform/ApprovalThresholds'
import PlatformEscalationRules from './pages/platform/EscalationRules'
import PlatformRoutingRules from './pages/platform/RoutingRules'
import UserManagement from './pages/platform/UserManagement'
import RoleManagement from './pages/platform/RoleManagement'
import PermissionGroups from './pages/platform/PermissionGroups'
import WorkspaceAccessRules from './pages/platform/WorkspaceAccessRules'
import DelegationProxyRules from './pages/platform/DelegationProxyRules'
import BCIntegrationSettings from './pages/platform/BCIntegrationSettings'
import DataMappingRules from './pages/platform/DataMappingRules'
import PlatformSyncRules from './pages/platform/SyncRules'
import MasterDataGovernance from './pages/platform/MasterDataGovernance'
import EntityDimensionGovernance from './pages/platform/EntityDimensionGovernance'
import PlatformAccessControl from './pages/platform/AccessControl'
import PlatformAuditPermissions from './pages/platform/AuditPermissions'
import PlatformChangeLog from './pages/platform/PlatformChangeLog'
import ConfigurationAuditTrail from './pages/platform/ConfigurationAuditTrail'
import PlatformHealth from './pages/platform/PlatformHealth'

// Placeholder for unmatched routes only
import PlaceholderPage from './components/PlaceholderPage'

export default function App() {
  return (
    <BrowserRouter>
      <PersonaProvider>
        <ToastProvider>
          <Routes>
            <Route element={<AppLayout />}>
              {/* Universal home — same for all personas */}
              <Route index element={<PlatformHome />} />

              {/* Core pages */}
              <Route path="/executive-home" element={<ExecutiveHome />} />
              <Route path="/finance-control" element={<FinanceControlHome />} />
              <Route path="/finance-ops" element={<FinanceOpsConsole />} />
              <Route path="/requestor-home" element={<RequestorHome />} />
              <Route path="/admin-console" element={<PlatformAdminConsole />} />
              <Route path="/bc-integration" element={<BCIntegrationHealth />} />
              <Route path="/request-intake" element={<UniversalRequestIntake />} />
              <Route path="/request-tracker" element={<RequestTracker />} />
              <Route path="/my-requests" element={<RequestTracker />} />
              <Route path="/approval-console" element={<ApprovalConsole />} />
              <Route path="/escalations" element={<EscalationsExceptions />} />

              {/* Orientation — Welcome + Personal Dashboard */}
              <Route path="/personal-dashboard" element={<PersonalDashboard />} />
              <Route path="/orientation" element={<PlatformHome />} />
              <Route path="/role-switch" element={<RoleEntitySwitch />} />

              {/* Marketplace — 4D tabs layout */}
              <Route path="/marketplace" element={<MarketplaceLayout />}>
                <Route path="discern" element={<DiscernMarketplace />} />
                <Route path="design" element={<DesignMarketplace />} />
                <Route path="deploy" element={<DeployMarketplace />} />
                <Route path="drive" element={<DriveMarketplace />} />
              </Route>
              {/* Discern sub-pages — full page, no tab bar */}
              <Route path="/marketplace/discern/assistant" element={<DiscernGuidedAssistant />} />
              <Route path="/marketplace/discern/policies" element={<DiscernPolicyLibrary />} />
              <Route path="/marketplace/discern/thresholds" element={<DiscernThresholdReference />} />
              {/* Design sub-pages — full page, no tab bar */}
              <Route path="/marketplace/design/templates" element={<DesignTemplateBrowser />} />
              <Route path="/marketplace/design/evidence" element={<DesignEvidenceLibrary />} />
              <Route path="/marketplace/design/workflows" element={<DesignWorkflowBlueprints />} />
              {/* Journey — full page, no tab bar */}
              <Route path="/marketplace/journey/:itemId" element={<MarketplaceJourney />} />

              {/* Marketplace legacy routes — still resolve for deep-links, not in sidebar */}
              <Route path="/marketplace/finance" element={<FinanceServicesCatalogue />} />
              <Route path="/marketplace/procurement" element={<ProcurementServicesCatalogue />} />
              <Route path="/marketplace/project-service" element={<ProjectServiceCatalogue />} />
              <Route path="/marketplace/admin-assets" element={<AdminAssetCatalogue />} />
              <Route path="/marketplace/master-data" element={<MasterDataCatalogue />} />
              <Route path="/marketplace/integration" element={<IntegrationSupportCatalogue />} />
              <Route path="/marketplace/search" element={<DiscoverySearch />} />

              {/* My Work group */}
              <Route path="/my-tasks" element={<MyTasks />} />
              <Route path="/clarifications" element={<Clarifications />} />
              <Route path="/evidence-actions" element={<EvidenceActions />} />
              <Route path="/notifications" element={<Notifications />} />

              {/* Finance Control group */}
              <Route path="/expense-reimbursement" element={<ExpenseReimbursement />} />
              <Route path="/invoice-payment" element={<InvoicePaymentOps />} />
              <Route path="/budget-cost" element={<BudgetCostCentre />} />
              <Route path="/tax-compliance" element={<TaxCompliance />} />
              <Route path="/period-close" element={<PeriodCloseReadiness />} />

              {/* Procurement group */}
              <Route path="/procurement" element={<ProcurementWorkspace />} />
              <Route path="/purchase-requests" element={<PurchaseRequestCentre />} />
              <Route path="/vendor-directory" element={<VendorDirectory />} />
              <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
              <Route path="/quote-po" element={<QuotePOTracker />} />
              <Route path="/subscriptions" element={<SubscriptionRenewals />} />
              <Route path="/assets" element={<AssetRegister />} />

              {/* Project & Service Economics */}
              <Route path="/project-register" element={<ProjectServiceRegister />} />
              <Route path="/project-economics" element={<ProjectEconomicsWorkspace />} />
              <Route path="/project-costs" element={<ProjectLinkedCostView />} />
              <Route path="/billing-readiness" element={<ServiceBillingReadiness />} />
              <Route path="/milestone-tracker" element={<ProjectMilestoneTracker />} />

              {/* Customer master & onboarding */}
              <Route path="/customer-master" element={<CustomerMaster />} />
              <Route path="/customer-onboarding" element={<CustomerOnboarding />} />

              {/* Financial Health Report */}
              <Route path="/financial-health" element={<FinancialHealthReport />} />

              {/* Budget Requisitions tracker */}
              <Route path="/budget-requisitions" element={<BudgetRequisitions />} />

              {/* HR & People Operations */}
              <Route path="/hr-home" element={<HRHome />} />
              <Route path="/employee-register" element={<EmployeeRegister />} />
              <Route path="/hr-requests" element={<HRServiceRequestCentre />} />
              <Route path="/hr-ops" element={<HROperationsConsole />} />
              <Route path="/leave-management" element={<LeaveManagement />} />
              <Route path="/onboarding-offboarding" element={<OnboardingOffboardingTracker />} />

              {/* Inventory & Assets */}
              <Route path="/inventory-home" element={<InventoryHome />} />
              <Route path="/inventory-register" element={<InventoryRegister />} />
              <Route path="/inventory-requests" element={<InventoryRequestTracker />} />
              <Route path="/inventory-ops" element={<InventoryOperationsConsole />} />
              <Route path="/asset-custody" element={<AssetCustodyConsole />} />

              {/* Administration & Back-Office */}
              <Route path="/backoffice-home" element={<BackOfficeHome />} />
              <Route path="/travel-admin" element={<TravelAdminRequestCentre />} />
              <Route path="/office-services" element={<OfficeServicesTracker />} />
              <Route path="/backoffice-fulfilment" element={<BackOfficeFulfilmentConsole />} />

              {/* Wave 2 — Governance */}
              <Route path="/approval-governance" element={<ApprovalGovernanceConsole />} />
              <Route path="/audit-pack-builder" element={<AuditPackBuilder />} />
              <Route path="/sla-dashboard" element={<OperationalSLADashboard />} />

              {/* Wave 3 — Stage 4 specialised */}
              <Route path="/workforce-cost" element={<WorkforceCostAnalytics />} />
              <Route path="/backoffice-performance" element={<BackOfficePerformance />} />
              <Route path="/inventory-reconciliation" element={<InventoryReconciliationPack />} />
              <Route path="/asset-lifecycle" element={<AssetLifecyclePack />} />

              {/* Request & Approval Governance */}
              <Route path="/approval-rules" element={<ApprovalRulesThresholds />} />
              <Route path="/audit-trail" element={<AuditTrailExplorer />} />

              {/* Master Data & Structure */}
              <Route path="/entity-structure" element={<EntityLocationStructure />} />
              <Route path="/users-roles" element={<UsersRolesDelegations />} />
              <Route path="/cost-centres" element={<CostCentresCategories />} />
              <Route path="/vendor-master" element={<VendorCustomerMasterData />} />
              <Route path="/project-master" element={<ProjectServiceMasterData />} />
              <Route path="/bc-mapping" element={<BCMappingReference />} />

              {/* Intelligence */}
              <Route path="/finance-insights" element={<FinanceInsights />} />
              <Route path="/procurement-insights" element={<ProcurementInsights />} />
              <Route path="/project-insights" element={<ProjectInsights />} />
              <Route path="/ai-briefs" element={<AIBriefs />} />
              <Route path="/risk-alerts" element={<RiskAlerts />} />

              {/* Platform Administration */}
              <Route path="/sync-error-queue" element={<SyncErrorQueue />} />
              <Route path="/api-connector" element={<APIConnectorMapping />} />
              <Route path="/workflow-config" element={<WorkflowConfiguration />} />
              <Route path="/ai-guardrails" element={<AIGuardrailsAuditLog />} />
              <Route path="/change-register" element={<ChangeRequestRegister />} />
              <Route path="/release-control" element={<ReleaseEnvironmentControl />} />

              {/* ORIENTATION */}
              <Route path="/ai-cockpit" element={<AICockpit />} />

              {/* WORKSPACES — Finance */}
              <Route path="/finance/work-queue" element={<FinanceWorkQueue />} />
              <Route path="/finance/payment-processing" element={<PaymentProcessing />} />
              <Route path="/finance/invoice-review" element={<InvoiceReview />} />
              <Route path="/finance/budget-review" element={<BudgetReview />} />
              <Route path="/finance/request-tracker" element={<FinanceRequestTracker />} />

              {/* WORKSPACES — HR & People */}
              <Route path="/hr/work-queue" element={<HRWorkQueue />} />
              <Route path="/hr/onboarding-operations" element={<OnboardingOperations />} />
              <Route path="/hr/employee-change-operations" element={<EmployeeChangeOperations />} />
              <Route path="/hr/people-service-tracker" element={<PeopleServiceTracker />} />
              <Route path="/hr/approval-readiness" element={<HRApprovalReadiness />} />

              {/* WORKSPACES — Procurement & Vendor */}
              <Route path="/procurement/work-queue" element={<ProcurementWorkQueue />} />
              <Route path="/procurement/vendor-review" element={<VendorReview />} />
              <Route path="/procurement/purchase-request-review" element={<PurchaseRequestReview />} />
              <Route path="/procurement/quotation-review" element={<QuotationReview />} />
              <Route path="/procurement/po-readiness-tracker" element={<POReadinessTracker />} />

              {/* WORKSPACES — Inventory & Asset */}
              <Route path="/inventory/work-queue" element={<InventoryWorkQueue />} />
              <Route path="/inventory/movement-tracker" element={<MovementTracker />} />
              <Route path="/inventory/asset-assignment-tracker" element={<AssetAssignmentTracker />} />
              <Route path="/inventory/asset-return-replacement" element={<AssetReturnReplacement />} />
              <Route path="/inventory/stock-exception-review" element={<StockExceptionReview />} />

              {/* WORKSPACES — Project Economics & Master Data */}
              <Route path="/project/economics-queue" element={<ProjectEconomicsQueue />} />
              <Route path="/project/cost-billing-readiness" element={<CostBillingReadinessTracker />} />
              <Route path="/project/master-data-review-queue" element={<MasterDataReviewQueue />} />
              <Route path="/project/dimension-entity-change-review" element={<DimensionEntityChangeReview />} />
              <Route path="/project/erp-record-readiness" element={<ERPRecordReadinessTracker />} />

              {/* SERVICE OPERATIONS — Fulfilment Management */}
              <Route path="/service-ops/fulfilment-console" element={<FulfilmentConsole />} />
              <Route path="/service-ops/assignment-queue" element={<AssignmentQueue />} />
              <Route path="/service-ops/service-owner-view" element={<ServiceOwnerView />} />
              <Route path="/service-ops/returned-items" element={<ReturnedItems />} />
              <Route path="/service-ops/closure-handover" element={<ClosureHandover />} />

              {/* SERVICE OPERATIONS — Approval & Control */}
              <Route path="/service-ops/approval-queue" element={<ServiceApprovalQueue />} />
              <Route path="/service-ops/approval-tracker" element={<ServiceApprovalTracker />} />
              <Route path="/service-ops/control-checks" element={<ControlChecks />} />
              <Route path="/service-ops/policy-exception-review" element={<PolicyExceptionReview />} />
              <Route path="/service-ops/decision-history" element={<DecisionHistory />} />

              {/* SERVICE OPERATIONS — SLA, Escalation & Exceptions */}
              <Route path="/service-ops/sla-dashboard" element={<ServiceSLADashboard />} />
              <Route path="/service-ops/overdue-items" element={<OverdueItems />} />
              <Route path="/service-ops/escalation-queue" element={<ServiceEscalationQueue />} />
              <Route path="/service-ops/blocked-requests" element={<BlockedRequests />} />
              <Route path="/service-ops/rejected-disputed-items" element={<RejectedDisputedItems />} />

              {/* SERVICE OPERATIONS — BC Sync */}
              <Route path="/service-ops/sync-monitor" element={<SyncMonitor />} />
              <Route path="/service-ops/failed-syncs" element={<FailedSyncs />} />
              <Route path="/service-ops/pending-syncs" element={<PendingSyncs />} />
              <Route path="/service-ops/reconciliation-queue" element={<ReconciliationQueue />} />
              <Route path="/service-ops/erp-reference-mapping" element={<ERPReferenceMapping />} />

              {/* SERVICE OPERATIONS — Intelligence & Audit */}
              <Route path="/service-ops/erp-operations-dashboard" element={<ERPOperationsDashboard />} />
              <Route path="/service-ops/service-performance-dashboard" element={<ServicePerformanceDashboard />} />
              <Route path="/service-ops/approval-bottleneck-insights" element={<ApprovalBottleneckInsights />} />
              <Route path="/service-ops/evidence-repository" element={<EvidenceRepository />} />
              <Route path="/service-ops/audit-trail" element={<ServiceAuditTrail />} />

              {/* PLATFORM MANAGEMENT — Service Catalogue */}
              <Route path="/platform/service-categories" element={<ServiceCategories />} />
              <Route path="/platform/service-forms" element={<ServiceForms />} />
              <Route path="/platform/required-evidence-setup" element={<RequiredEvidenceSetup />} />
              <Route path="/platform/sla-setup" element={<SLASetup />} />
              <Route path="/platform/catalogue-visibility-rules" element={<CatalogueVisibilityRules />} />

              {/* PLATFORM MANAGEMENT — Workflow & Approval Config */}
              <Route path="/platform/workflow-builder" element={<PlatformWorkflowBuilder />} />
              <Route path="/platform/approval-rules" element={<PlatformApprovalRules />} />
              <Route path="/platform/approval-thresholds" element={<PlatformApprovalThresholds />} />
              <Route path="/platform/escalation-rules" element={<PlatformEscalationRules />} />
              <Route path="/platform/routing-rules" element={<PlatformRoutingRules />} />

              {/* PLATFORM MANAGEMENT — Users, Roles & Access */}
              <Route path="/platform/user-management" element={<UserManagement />} />
              <Route path="/platform/role-management" element={<RoleManagement />} />
              <Route path="/platform/permission-groups" element={<PermissionGroups />} />
              <Route path="/platform/workspace-access-rules" element={<WorkspaceAccessRules />} />
              <Route path="/platform/delegation-proxy-rules" element={<DelegationProxyRules />} />

              {/* PLATFORM MANAGEMENT — Integration & Data Governance */}
              <Route path="/platform/bc-integration-settings" element={<BCIntegrationSettings />} />
              <Route path="/platform/data-mapping-rules" element={<DataMappingRules />} />
              <Route path="/platform/sync-rules" element={<PlatformSyncRules />} />
              <Route path="/platform/master-data-governance" element={<MasterDataGovernance />} />
              <Route path="/platform/entity-dimension-governance" element={<EntityDimensionGovernance />} />

              {/* PLATFORM MANAGEMENT — Security, Audit & Platform Governance */}
              <Route path="/platform/access-control" element={<PlatformAccessControl />} />
              <Route path="/platform/audit-permissions" element={<PlatformAuditPermissions />} />
              <Route path="/platform/platform-change-log" element={<PlatformChangeLog />} />
              <Route path="/platform/configuration-audit-trail" element={<ConfigurationAuditTrail />} />
              <Route path="/platform/platform-health" element={<PlatformHealth />} />

              {/* Catch-all 404 */}
              <Route path="*" element={
                <PlaceholderPage title="Page Not Found" description="This page doesn't exist." />
              } />
            </Route>
          </Routes>
        </ToastProvider>
      </PersonaProvider>
    </BrowserRouter>
  )
}
