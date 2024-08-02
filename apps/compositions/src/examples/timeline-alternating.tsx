import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
} from "compositions/ui/timeline"

export const TimelineAlternating = () => {
  return (
    <TimelineRoot size="sm" variant="outline">
      <TimelineItem>
        <TimelineContent flex="1" />
        <TimelineConnector />
        <TimelineContent flex="1">Placed Order</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineContent flex="1" textAlign="right">
          Prepared Order
        </TimelineContent>
        <TimelineConnector />
        <TimelineContent flex="1" />
      </TimelineItem>

      <TimelineItem>
        <TimelineContent flex="1" />
        <TimelineConnector />
        <TimelineContent flex="1">Order Delivered</TimelineContent>
      </TimelineItem>
    </TimelineRoot>
  )
}
