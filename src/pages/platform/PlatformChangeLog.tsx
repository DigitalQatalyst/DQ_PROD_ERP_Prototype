import GenericQueuePage from '../../components/GenericQueuePage'

export default function PlatformChangeLog() {
  return (
    <GenericQueuePage
      title="Platform Change Log"
      description="Historical log of all platform configuration changes."
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
