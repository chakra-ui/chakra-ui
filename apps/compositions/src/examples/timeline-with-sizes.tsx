import { Avatar, Badge, For, Span, Stack } from "@chakra-ui/react"
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "compositions/ui/timeline"
import { LuCheck } from "react-icons/lu"

export const TimelineWithSizes = () => {
  return (
    <Stack gap="8">
      <For each={["sm", "md", "lg", "xl"]}>
        {(size) => (
          <TimelineRoot key={size} size={size}>
            <TimelineItem>
              <TimelineConnector>
                <Avatar.Root size="full">
                  <Avatar.Image src="https://bit.ly/sage-adebayo" />
                  <Avatar.Fallback name="Sage" />
                </Avatar.Root>
              </TimelineConnector>
              <TimelineContent textStyle="xs">
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
              <TimelineContent textStyle="xs">
                <TimelineTitle mt={size === "sm" ? "-2px" : undefined}>
                  <Span fontWeight="medium">sage</Span>
                  changed status from <Badge size="sm">
                    In progress
                  </Badge> to{" "}
                  <Badge colorPalette="teal" size="sm">
                    Completed
                  </Badge>
                </TimelineTitle>
              </TimelineContent>
            </TimelineItem>
          </TimelineRoot>
        )}
      </For>
    </Stack>
  )
}
