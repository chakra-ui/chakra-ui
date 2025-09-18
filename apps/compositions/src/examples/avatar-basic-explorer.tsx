import { Avatar, HStack } from "@chakra-ui/react"

export const AvatarBasicExplorer = () => {
  return (
    <HStack gap={2}>
      <Avatar.Root>
        <Avatar.Fallback name="Segun Adebayo" />
        <Avatar.Image src="https://bit.ly/sage-adebayo" />
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback name="Segun Adebayo" />
        <Avatar.Image src="https://bit.ly/broken-link" />
      </Avatar.Root>
    </HStack>
  )
}
