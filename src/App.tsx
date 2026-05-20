import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PersonaProvider } from './context/PersonaContext'
import { ToastProvider } from './components/Toast'
import AppLayout from './layouts/AppLayout'
import HomeRedirect from './components/HomeRedirect'

// Built pages — 10 core
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
import OrientationGuide from './pages/OrientationGuide'
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
import DeliveryCommitments from './pages/DeliveryCommitments'

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

// Placeholder for unmatched routes only
import PlaceholderPage from './components/PlaceholderPage'

export default function App() {
  return (
    <BrowserRouter>
      <PersonaProvider>
        <ToastProvider>
          <Routes>
            <Route element={<AppLayout />}>
              {/* Default redirect to active persona's landing */}
              <Route index element={<HomeRedirect />} />

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

              {/* Home group */}
              <Route path="/orientation" element={<OrientationGuide />} />
              <Route path="/role-switch" element={<RoleEntitySwitch />} />

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
              <Route path="/delivery-commitments" element={<DeliveryCommitments />} />

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
