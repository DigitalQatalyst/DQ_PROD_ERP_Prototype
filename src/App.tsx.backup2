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

// S01 Marketplace — legacy domain catalogues (kept for backward links from DiscoverySearch)
import FinanceServicesCatalogue from './pages/marketplace/FinanceServicesCatalogue'
import ProcurementServicesCatalogue from './pages/marketplace/ProcurementServicesCatalogue'
import ProjectServiceCatalogue from './pages/marketplace/ProjectServiceCatalogue'
import AdminAssetCatalogue from './pages/marketplace/AdminAssetCatalogue'
import MasterDataCatalogue from './pages/marketplace/MasterDataCatalogue'
import IntegrationSupportCatalogue from './pages/marketplace/IntegrationSupportCatalogue'
import DiscoverySearch from './pages/marketplace/DiscoverySearch'

// S01 Marketplace — 4D structure (Discern / Design / Deploy / Drive)
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

              {/* S00 Orientations — Welcome + Personal Dashboard */}
              <Route path="/personal-dashboard" element={<PersonalDashboard />} />
              <Route path="/orientation" element={<PlatformHome />} />
              <Route path="/role-switch" element={<RoleEntitySwitch />} />

              {/* S01 Marketplace — 4D structure */}
              <Route path="/marketplace/discern" element={<DiscernMarketplace />} />
              <Route path="/marketplace/discern/assistant" element={<DiscernGuidedAssistant />} />
              <Route path="/marketplace/discern/policies" element={<DiscernPolicyLibrary />} />
              <Route path="/marketplace/discern/thresholds" element={<DiscernThresholdReference />} />
              <Route path="/marketplace/design" element={<DesignMarketplace />} />
              <Route path="/marketplace/design/templates" element={<DesignTemplateBrowser />} />
              <Route path="/marketplace/design/evidence" element={<DesignEvidenceLibrary />} />
              <Route path="/marketplace/design/workflows" element={<DesignWorkflowBlueprints />} />
              <Route path="/marketplace/deploy" element={<DeployMarketplace />} />
              <Route path="/marketplace/drive" element={<DriveMarketplace />} />
              <Route path="/marketplace/journey/:itemId" element={<MarketplaceJourney />} />

              {/* S01 legacy routes — still resolve for deep-links, not in sidebar */}
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
              <Route path="/ai-cockpit" element={<PlaceholderPage title="AI Cockpit" />} />

              {/* WORKSPACES — Finance */}
              <Route path="/finance/work-queue" element={<PlaceholderPage title="Finance Work Queue" />} />
              <Route path="/finance/payment-processing" element={<PlaceholderPage title="Payment Processing" />} />
              <Route path="/finance/invoice-review" element={<PlaceholderPage title="Invoice Review" />} />
              <Route path="/finance/budget-review" element={<PlaceholderPage title="Budget Review" />} />
              <Route path="/finance/request-tracker" element={<PlaceholderPage title="Finance Request Tracker" />} />

              {/* WORKSPACES — HR & People */}
              <Route path="/hr/work-queue" element={<PlaceholderPage title="HR Work Queue" />} />
              <Route path="/hr/onboarding-operations" element={<PlaceholderPage title="Onboarding Operations" />} />
              <Route path="/hr/employee-change-operations" element={<PlaceholderPage title="Employee Change Operations" />} />
              <Route path="/hr/people-service-tracker" element={<PlaceholderPage title="People Service Tracker" />} />
              <Route path="/hr/approval-readiness" element={<PlaceholderPage title="HR Approval Readiness" />} />

              {/* WORKSPACES — Procurement & Vendor */}
              <Route path="/procurement/work-queue" element={<PlaceholderPage title="Procurement Work Queue" />} />
              <Route path="/procurement/vendor-review" element={<PlaceholderPage title="Vendor Review" />} />
              <Route path="/procurement/purchase-request-review" element={<PlaceholderPage title="Purchase Request Review" />} />
              <Route path="/procurement/quotation-review" element={<PlaceholderPage title="Quotation Review" />} />
              <Route path="/procurement/po-readiness-tracker" element={<PlaceholderPage title="PO Readiness Tracker" />} />

              {/* WORKSPACES — Inventory & Asset */}
              <Route path="/inventory/work-queue" element={<PlaceholderPage title="Asset Work Queue" />} />
              <Route path="/inventory/movement-tracker" element={<PlaceholderPage title="Inventory Movement Tracker" />} />
              <Route path="/inventory/asset-assignment-tracker" element={<PlaceholderPage title="Asset Assignment Tracker" />} />
              <Route path="/inventory/asset-return-replacement" element={<PlaceholderPage title="Asset Return / Replacement" />} />
              <Route path="/inventory/stock-exception-review" element={<PlaceholderPage title="Stock Exception Review" />} />

              {/* WORKSPACES — Project Economics & Master Data */}
              <Route path="/project/economics-queue" element={<PlaceholderPage title="Project Economics Queue" />} />
              <Route path="/project/cost-billing-readiness" element={<PlaceholderPage title="Cost / Billing Readiness Tracker" />} />
              <Route path="/project/master-data-review-queue" element={<PlaceholderPage title="Master Data Review Queue" />} />
              <Route path="/project/dimension-entity-change-review" element={<PlaceholderPage title="Dimension / Entity Change Review" />} />
              <Route path="/project/erp-record-readiness" element={<PlaceholderPage title="ERP Record Readiness Tracker" />} />

              {/* SERVICE OPERATIONS — Fulfilment Management */}
              <Route path="/service-ops/fulfilment-console" element={<PlaceholderPage title="Fulfilment Console" />} />
              <Route path="/service-ops/assignment-queue" element={<PlaceholderPage title="Assignment Queue" />} />
              <Route path="/service-ops/service-owner-view" element={<PlaceholderPage title="Service Owner View" />} />
              <Route path="/service-ops/returned-items" element={<PlaceholderPage title="Returned Items" />} />
              <Route path="/service-ops/closure-handover" element={<PlaceholderPage title="Closure & Handover" />} />

              {/* SERVICE OPERATIONS — Approval & Control */}
              <Route path="/service-ops/approval-queue" element={<PlaceholderPage title="Approval Queue" />} />
              <Route path="/service-ops/approval-tracker" element={<PlaceholderPage title="Approval Tracker" />} />
              <Route path="/service-ops/control-checks" element={<PlaceholderPage title="Control Checks" />} />
              <Route path="/service-ops/policy-exception-review" element={<PlaceholderPage title="Policy Exception Review" />} />
              <Route path="/service-ops/decision-history" element={<PlaceholderPage title="Decision History" />} />

              {/* SERVICE OPERATIONS — SLA, Escalation & Exceptions */}
              <Route path="/service-ops/sla-dashboard" element={<PlaceholderPage title="SLA Dashboard" />} />
              <Route path="/service-ops/overdue-items" element={<PlaceholderPage title="Overdue Items" />} />
              <Route path="/service-ops/escalation-queue" element={<PlaceholderPage title="Escalation Queue" />} />
              <Route path="/service-ops/blocked-requests" element={<PlaceholderPage title="Blocked Requests" />} />
              <Route path="/service-ops/rejected-disputed-items" element={<PlaceholderPage title="Rejected / Disputed Items" />} />

              {/* SERVICE OPERATIONS — BC Sync */}
              <Route path="/service-ops/sync-monitor" element={<PlaceholderPage title="Sync Monitor" />} />
              <Route path="/service-ops/failed-syncs" element={<PlaceholderPage title="Failed Syncs" />} />
              <Route path="/service-ops/pending-syncs" element={<PlaceholderPage title="Pending Syncs" />} />
              <Route path="/service-ops/reconciliation-queue" element={<PlaceholderPage title="Reconciliation Queue" />} />
              <Route path="/service-ops/erp-reference-mapping" element={<PlaceholderPage title="ERP Reference Mapping" />} />

              {/* SERVICE OPERATIONS — Intelligence & Audit */}
              <Route path="/service-ops/erp-operations-dashboard" element={<PlaceholderPage title="ERP Operations Dashboard" />} />
              <Route path="/service-ops/service-performance-dashboard" element={<PlaceholderPage title="Service Performance Dashboard" />} />
              <Route path="/service-ops/approval-bottleneck-insights" element={<PlaceholderPage title="Approval Bottleneck Insights" />} />
              <Route path="/service-ops/evidence-repository" element={<PlaceholderPage title="Evidence Repository" />} />
              <Route path="/service-ops/audit-trail" element={<PlaceholderPage title="Audit Trail" />} />

              {/* PLATFORM MANAGEMENT — Service Catalogue */}
              <Route path="/platform/service-categories" element={<PlaceholderPage title="Service Categories" />} />
              <Route path="/platform/service-forms" element={<PlaceholderPage title="Service Forms" />} />
              <Route path="/platform/required-evidence-setup" element={<PlaceholderPage title="Required Evidence Setup" />} />
              <Route path="/platform/sla-setup" element={<PlaceholderPage title="SLA Setup" />} />
              <Route path="/platform/catalogue-visibility-rules" element={<PlaceholderPage title="Catalogue Visibility Rules" />} />

              {/* PLATFORM MANAGEMENT — Workflow & Approval Config */}
              <Route path="/platform/workflow-builder" element={<PlaceholderPage title="Workflow Builder" />} />
              <Route path="/platform/approval-rules" element={<PlaceholderPage title="Approval Rules" />} />
              <Route path="/platform/approval-thresholds" element={<PlaceholderPage title="Approval Thresholds" />} />
              <Route path="/platform/escalation-rules" element={<PlaceholderPage title="Escalation Rules" />} />
              <Route path="/platform/routing-rules" element={<PlaceholderPage title="Routing Rules" />} />

              {/* PLATFORM MANAGEMENT — Users, Roles & Access */}
              <Route path="/platform/user-management" element={<PlaceholderPage title="User Management" />} />
              <Route path="/platform/role-management" element={<PlaceholderPage title="Role Management" />} />
              <Route path="/platform/permission-groups" element={<PlaceholderPage title="Permission Groups" />} />
              <Route path="/platform/workspace-access-rules" element={<PlaceholderPage title="Workspace Access Rules" />} />
              <Route path="/platform/delegation-proxy-rules" element={<PlaceholderPage title="Delegation / Proxy Rules" />} />

              {/* PLATFORM MANAGEMENT — Integration & Data Governance */}
              <Route path="/platform/bc-integration-settings" element={<PlaceholderPage title="Business Central Integration Settings" />} />
              <Route path="/platform/data-mapping-rules" element={<PlaceholderPage title="Data Mapping Rules" />} />
              <Route path="/platform/sync-rules" element={<PlaceholderPage title="Sync Rules" />} />
              <Route path="/platform/master-data-governance" element={<PlaceholderPage title="Master Data Governance" />} />
              <Route path="/platform/entity-dimension-governance" element={<PlaceholderPage title="Entity / Dimension Governance" />} />

              {/* PLATFORM MANAGEMENT — Security, Audit & Platform Governance */}
              <Route path="/platform/access-control" element={<PlaceholderPage title="Access Control" />} />
              <Route path="/platform/audit-permissions" element={<PlaceholderPage title="Audit Permissions" />} />
              <Route path="/platform/platform-change-log" element={<PlaceholderPage title="Platform Change Log" />} />
              <Route path="/platform/configuration-audit-trail" element={<PlaceholderPage title="Configuration Audit Trail" />} />
              <Route path="/platform/platform-health" element={<PlaceholderPage title="Platform Health" />} />

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
