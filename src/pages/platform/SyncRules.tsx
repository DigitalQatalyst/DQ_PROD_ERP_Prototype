import GenericQueuePage from '../../components/GenericQueuePage'

export default function SyncRules() {
  return (
    <GenericQueuePage
      title="Sync Rules"
      description="Configure BC sync triggers and conflict resolution."
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
