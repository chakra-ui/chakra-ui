import { Card, HStack, Text } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import {
  OverflowMenuContent,
  OverflowMenuItem,
  OverflowMenuRoot,
  OverflowMenuTrigger,
} from "compositions/ui/overflow-menu"

export const OverflowMenuWithCard = () => {
  return (
    <Card.Root maxW="sm">
      <Card.Header>
        <HStack justify="space-between">
          <HStack>
            <Avatar name="Sage Adebayo" />
            <Text>Sage</Text>
            <Text color="fg.muted">5h</Text>
          </HStack>
          <OverflowMenuRoot>
            <OverflowMenuTrigger vertical size="sm" color="fg.subtle" />
            <OverflowMenuContent>
              <OverflowMenuItem value="Share">Share</OverflowMenuItem>
              <OverflowMenuItem value="Report">Report</OverflowMenuItem>
              <OverflowMenuItem value="View Profile">
                View Profile
              </OverflowMenuItem>
            </OverflowMenuContent>
          </OverflowMenuRoot>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </Card.Body>
    </Card.Root>
  )
}
