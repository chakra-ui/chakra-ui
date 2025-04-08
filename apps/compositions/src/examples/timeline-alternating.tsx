import { Timeline } from "@chakra-ui/react"

export const TimelineAlternating = () => {
  return (
    <Timeline.Root size="sm" variant="outline">
      <Timeline.Item>
        <Timeline.Content flex="1" />
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator />
        </Timeline.Connector>
        <Timeline.Content flex="1">
          <Timeline.Title>Placed Order</Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Content flex="1" alignItems="flex-end">
          <Timeline.Title>Prepared Order</Timeline.Title>
        </Timeline.Content>
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator />
        </Timeline.Connector>
        <Timeline.Content flex="1" />
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Content flex="1" />
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator />
        </Timeline.Connector>
        <Timeline.Content flex="1">
          <Timeline.Title>Order Delivered</Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  )
}
