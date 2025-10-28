import { Avatar, HStack } from "@chakra-ui/react"

export const AvatarWithShape = () => {
  return (
    <HStack gap="4">
      <Avatar.Root shape="square" size="lg">
        <Avatar.Fallback name="Jane Smith" />
        <Avatar.Image src="https://i.pravatar.cc/150?img=12" />
      </Avatar.Root>
      <Avatar.Root shape="rounded" size="lg">
        <Avatar.Fallback name="Segun Adebayo" />
        <Avatar.Image src="https://bit.ly/sage-adebayo" />
      </Avatar.Root>
      <Avatar.Root shape="full" size="lg">
        <Avatar.Fallback name="Random User" />
        <Avatar.Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" />
      </Avatar.Root>
    </HStack>
  )
}
