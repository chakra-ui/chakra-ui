import { Avatar } from "@chakra-ui/react"

export const AvatarBasic = () => {
  return (
    <Avatar.Root>
      <Avatar.Fallback>SA</Avatar.Fallback>
      <Avatar.Image src="https://bit.ly/sage-adebayo" />
    </Avatar.Root>
  )
}
