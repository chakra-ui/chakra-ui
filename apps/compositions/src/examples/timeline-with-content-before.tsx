import { For, Stack, Timeline } from "@chakra-ui/react"
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "compositions/ui/timeline"

export const TimelineWithContentBefore = () => {
  return (
    <Stack gap="8">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <TimelineRoot size={size} key={size}>
            <TimelineItem>
              <TimelineContent width="auto">
                <TimelineTitle whiteSpace="nowrap">Nov 1994</TimelineTitle>
              </TimelineContent>
              <TimelineConnector>1</TimelineConnector>
              <Timeline.Content>
                <TimelineTitle>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </TimelineTitle>
              </Timeline.Content>
            </TimelineItem>

            <TimelineItem>
              <TimelineContent width="auto">
                <TimelineTitle whiteSpace="nowrap">Nov 2010</TimelineTitle>
              </TimelineContent>
              <TimelineConnector>2</TimelineConnector>
              <TimelineContent>
                <TimelineTitle>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </TimelineTitle>
              </TimelineContent>
            </TimelineItem>
          </TimelineRoot>
        )}
      </For>
    </Stack>
  )
}
