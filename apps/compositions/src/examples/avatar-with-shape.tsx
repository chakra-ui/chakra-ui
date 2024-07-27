import { HStack } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"

export const AvatarWithShape = () => {
  return (
    <HStack gap="4">
      <Avatar
        name="Dan Abramov"
        src="https://bit.ly/dan-abramov"
        shape="square"
        size="lg"
      />
      <Avatar
        name="Sage Adebayo"
        src="https://bit.ly/sage-adebayo"
        shape="rounded"
        size="lg"
      />
      <Avatar
        name="Random User"
        src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
        shape="full"
        size="lg"
      />
    </HStack>
  )
}
