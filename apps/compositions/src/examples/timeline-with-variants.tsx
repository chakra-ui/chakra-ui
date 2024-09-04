import { Badge, For, HStack, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
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
                <Avatar
                  size="sm"
                  name="Sage"
                  src="https://bit.ly/sage-adebayo"
                />
              </TimelineConnector>
              <TimelineContent>
                <HStack textStyle="sm">
                  <Text fontWeight="medium">sage</Text>
                  created a new project
                </HStack>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineConnector>
                <LuCheck />
              </TimelineConnector>
              <TimelineContent>
                <HStack textStyle="sm">
                  <Text fontWeight="medium">sage</Text>
                  changed status from <Badge>In progress</Badge> to{" "}
                  <Badge colorPalette="teal">Completed</Badge>
                </HStack>
              </TimelineContent>
            </TimelineItem>
          </TimelineRoot>
        )}
      </For>
    </Stack>
  )
}
