import GenericQueuePage from '../../components/GenericQueuePage'

export default function RoutingRules() {
  return (
    <GenericQueuePage
      title="Routing Rules"
      description="Configure intelligent routing based on request attributes."
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
