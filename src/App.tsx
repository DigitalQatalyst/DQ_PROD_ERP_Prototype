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
