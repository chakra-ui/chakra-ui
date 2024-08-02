import { Stack, Timeline } from "@chakra-ui/react"
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
} from "compositions/ui/timeline"

export const TimelineWithContentBefore = () => {
  return (
    <Stack gap="8">
      <TimelineRoot size="sm">
        <TimelineItem>
          <TimelineContent fontSize="xs">Nov 1994</TimelineContent>
          <TimelineConnector>1</TimelineConnector>
          <Timeline.Content fontSize="xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Timeline.Content>
        </TimelineItem>

        <TimelineItem>
          <TimelineContent fontSize="xs">Nov 2010</TimelineContent>
          <TimelineConnector>2</TimelineConnector>
          <TimelineContent fontSize="xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </TimelineContent>
        </TimelineItem>
      </TimelineRoot>

      <TimelineRoot size="md">
        <TimelineItem>
          <TimelineContent fontSize="sm">Nov 1994</TimelineContent>
          <TimelineConnector>1</TimelineConnector>
          <Timeline.Content fontSize="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Timeline.Content>
        </TimelineItem>

        <Timeline.Item>
          <Timeline.Content fontSize="sm">Nov 2010</Timeline.Content>
          <TimelineConnector>2</TimelineConnector>
          <Timeline.Content fontSize="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Timeline.Content>
        </Timeline.Item>
      </TimelineRoot>
    </Stack>
  )
}
