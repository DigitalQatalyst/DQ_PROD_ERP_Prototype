import GenericQueuePage from '../../components/GenericQueuePage'

export default function RequiredEvidenceSetup() {
  return (
    <GenericQueuePage
      title="Required Evidence Setup"
      description="Configure required evidence by service type."
      stat1Label="Total Items"
      stat1Value={12}
      stat2Label="Pending Review"
      stat2Value={8}
      stat3Label="Urgent"
      stat3Value={2}
      stat4Label="Completed (7d)"
      stat4Value={24}
    />
  )
}
