import { Card, HStack, Stack, Strong, Text } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import { Button } from "compositions/ui/button"
import { LuCheck, LuX } from "react-icons/lu"

export const CardWithAvatar = () => {
  return (
    <Card.Root width="320px">
      <Card.Body>
        <HStack mb="6" gap="3">
          <Avatar
            src="https://images.unsplash.com/photo-1511806754518-53bada35f930"
            name="Nate Foss"
            shape="rounded"
          />
          <Stack gap="1">
            <Text fontWeight="medium" lineHeight="1">
              Nate Foss
            </Text>
            <Text color="fg.subtle" lineHeight="1">
              @natefoss
            </Text>
          </Stack>
        </HStack>
        <Text>
          <Strong>Nate Foss </Strong>
          has requested to join your team. You can approve or decline their
          request.
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="subtle" colorPalette="red" flex="1">
          <LuX />
          Decline
        </Button>
        <Button variant="subtle" colorPalette="blue" flex="1">
          <LuCheck />
          Approve
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
