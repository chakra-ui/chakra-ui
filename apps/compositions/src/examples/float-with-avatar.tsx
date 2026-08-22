import { Avatar, Badge, Box, Float } from "@chakra-ui/react"

export const FloatWithAvatar = () => {
  return (
    <Box display="inline-block" pos="relative">
      <Avatar.Root size="lg" shape="rounded">
        <Avatar.Image src="https://i.pravatar.cc/150?img=5" />
        <Avatar.Fallback />
      </Avatar.Root>
      <Float placement="bottom-end">
        <Badge size="sm" variant="solid" colorPalette="teal">
          New
        </Badge>
      </Float>
    </Box>
  )
}
