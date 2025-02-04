import { Avatar, HStack } from "@chakra-ui/react"

export const AvatarWithFallback = () => {
  return (
    <HStack>
      <Avatar.Root>
        <Avatar.Fallback>OK</Avatar.Fallback>
        <Avatar.Image src="https://bit.ly/broken-link" />
      </Avatar.Root>
      <Avatar.Root colorPalette="teal">
        <Avatar.Fallback>SU</Avatar.Fallback>
        <Avatar.Image src="https://bit.ly/broken-link" />
      </Avatar.Root>
      <Avatar.Root colorPalette="red">
        <Avatar.Fallback>
          <Avatar.Icon />
        </Avatar.Fallback>
        <Avatar.Image src="https://bit.ly/broken-link" />
      </Avatar.Root>
    </HStack>
  )
}
