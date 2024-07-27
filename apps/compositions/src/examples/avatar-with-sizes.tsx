import { HStack } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"

export const AvatarWithSizes = () => {
  return (
    <HStack gap="3">
      <Avatar size="xs" name="Sage" src="https://bit.ly/sage-adebayo" />
      <Avatar size="sm" name="Sage" src="https://bit.ly/sage-adebayo" />
      <Avatar size="md" name="Sage" src="https://bit.ly/sage-adebayo" />
      <Avatar size="lg" name="Sage" src="https://bit.ly/sage-adebayo" />
      <Avatar size="xl" name="Sage" src="https://bit.ly/sage-adebayo" />
      <Avatar size="2xl" name="Sage" src="https://bit.ly/sage-adebayo" />
    </HStack>
  )
}
