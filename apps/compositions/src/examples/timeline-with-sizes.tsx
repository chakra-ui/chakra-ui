import { Badge, HStack, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
} from "compositions/ui/timeline"
import { LuCheck } from "react-icons/lu"

export const TimelineWithSizes = () => {
  return (
    <Stack gap="8">
      <TimelineRoot size="sm">
        <TimelineItem>
          <TimelineConnector>
            <Avatar size="xs" name="Sage" src="https://bit.ly/sage-adebayo" />
          </TimelineConnector>
          <TimelineContent textStyle="xs">
            <HStack>
              <Text fontWeight="medium">sage</Text>
              created a new project
            </HStack>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineConnector>
            <LuCheck />
          </TimelineConnector>
          <TimelineContent textStyle="xs">
            <HStack>
              <Text fontWeight="medium">sage</Text>
              changed status from <Badge>In progress</Badge> to{" "}
              <Badge colorPalette="teal">Completed</Badge>
            </HStack>
          </TimelineContent>
        </TimelineItem>
      </TimelineRoot>

      <TimelineRoot size="md">
        <TimelineItem>
          <TimelineConnector>
            <Avatar size="sm" name="Sage" src="https://bit.ly/sage-adebayo" />
          </TimelineConnector>
          <TimelineContent>
            <HStack>
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
            <HStack>
              <Text fontWeight="medium">sage</Text>
              changed status from <Badge>In progress</Badge> to{" "}
              <Badge colorPalette="teal">Completed</Badge>
            </HStack>
          </TimelineContent>
        </TimelineItem>
      </TimelineRoot>
    </Stack>
  )
}
