import { HStack } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"

export const AvatarWithFallback = () => {
  return (
    <HStack>
      <Avatar name="Oshigaki Kisame" src="https://bit.ly/broken-link" />
      <Avatar name="Sasuke Uchiha" src="https://bit.ly/broken-link" />
      <Avatar src="https://bit.ly/broken-link" />
    </HStack>
  )
}
