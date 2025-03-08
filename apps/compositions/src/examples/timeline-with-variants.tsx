import { Avatar, Badge, For, Span, Stack } from "@chakra-ui/react"
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "compositions/ui/timeline"
import { LuCheck } from "react-icons/lu"

export const TimelineWithVariants = () => {
  return (
    <Stack gap="16">
      <For each={["subtle", "solid", "outline", "plain"]}>
        {(variant) => (
          <TimelineRoot variant={variant} key={variant}>
            <TimelineItem>
              <TimelineConnector>
                <Avatar.Root size="full">
                  <Avatar.Image src="https://bit.ly/sage-adebayo" />
                  <Avatar.Fallback name="Sage" />
                </Avatar.Root>
              </TimelineConnector>
              <TimelineContent>
                <TimelineTitle>
                  <Span fontWeight="medium">sage</Span>
                  created a new project
                </TimelineTitle>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineConnector>
                <LuCheck />
              </TimelineConnector>
              <TimelineContent>
                <TimelineTitle>
                  <Span fontWeight="medium">sage</Span>
                  changed status from <Badge>In progress</Badge> to{" "}
                  <Badge colorPalette="teal">Completed</Badge>
                </TimelineTitle>
              </TimelineContent>
            </TimelineItem>
          </TimelineRoot>
        )}
      </For>
    </Stack>
  )
}
