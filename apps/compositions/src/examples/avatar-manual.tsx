import { Avatar } from "@chakra-ui/react"

export const AvatarManual = () => {
  return (
    <Avatar.Root>
      <Avatar.Image src="https://bit.ly/sage-adebayo" />
      <Avatar.Fallback>SA</Avatar.Fallback>
    </Avatar.Root>
  )
}
