// InvoiceReview.tsx
import GenericQueuePage from '../../components/GenericQueuePage'

export function InvoiceReview() {
  return (
    <GenericQueuePage
      title="Invoice Review"
      description="Review and validate incoming vendor invoices before payment approval."
      stat1Label="Total Invoices"
      stat1Value={15}
      stat2Label="Pending Review"
      stat2Value={9}
      stat3Label="Validation Errors"
      stat3Value={3}
      stat4Label="Approved (7d)"
      stat4Value={18}
      actionLabel="Review Invoice"
    />
  )
}

// BudgetReview.tsx
export function BudgetReview() {
  return (
    <GenericQueuePage
      title="Budget Review"
      description="Review budget amendments, requisitions, and overage requests."
      stat1Label="Open Reviews"
      stat1Value={6}
      stat2Label="Pending Decision"
      stat2Value={4}
      stat3Label="Over Threshold"
      stat3Value={1}
      stat4Label="Approved (7d)"
      stat4Value={12}
      actionLabel="Review Budget"
    />
  )
}

// FinanceRequestTracker.tsx
export function FinanceRequestTracker() {
  return (
    <GenericQueuePage
      title="Finance Request Tracker"
      description="Track all finance requests from submission through approval and fulfilment."
      stat1Label="Active Requests"
      stat1Value={47}
      stat2Label="In Approval"
      stat2Value={23}
      stat3Label="Overdue"
      stat3Value={6}
      stat4Label="Completed (7d)"
      stat4Value={38}
      actionLabel="View Request"
    />
  )
}

export default { InvoiceReview, BudgetReview, FinanceRequestTracker }
