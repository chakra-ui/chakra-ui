import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "compositions/ui/timeline"

export const TimelineAlternating = () => {
  return (
    <TimelineRoot size="sm" variant="outline">
      <TimelineItem>
        <TimelineContent flex="1" />
        <TimelineConnector />
        <TimelineContent flex="1">
          <TimelineTitle>Placed Order</TimelineTitle>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineContent flex="1" alignItems="flex-end">
          <TimelineTitle>Prepared Order</TimelineTitle>
        </TimelineContent>
        <TimelineConnector />
        <TimelineContent flex="1" />
      </TimelineItem>

      <TimelineItem>
        <TimelineContent flex="1" />
        <TimelineConnector />
        <TimelineContent flex="1">
          <TimelineTitle>Order Delivered</TimelineTitle>
        </TimelineContent>
      </TimelineItem>
    </TimelineRoot>
  )
}
