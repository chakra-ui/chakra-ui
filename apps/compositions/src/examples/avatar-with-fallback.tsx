import { Avatar, HStack } from "@chakra-ui/react"

export const AvatarWithFallback = () => {
  return (
    <HStack>
      <Avatar.Root>
        <Avatar.Fallback name="Oshigaki Kisame" />
        <Avatar.Image src="https://bit.ly/broken-link" />
      </Avatar.Root>
      <Avatar.Root colorPalette="teal">
        <Avatar.Fallback name="Sasuke Uchiha" />
        <Avatar.Image src="https://bit.ly/broken-link" />
      </Avatar.Root>
      <Avatar.Root colorPalette="red">
        <Avatar.Fallback />
        <Avatar.Image src="https://bit.ly/broken-link" />
      </Avatar.Root>
    </HStack>
  )
}
