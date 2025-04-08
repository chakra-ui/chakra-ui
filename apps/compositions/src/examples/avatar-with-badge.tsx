import { Avatar, Circle, Float } from "@chakra-ui/react"

export const AvatarWithBadge = () => {
  return (
    <Avatar.Root colorPalette="green" variant="subtle">
      <Avatar.Fallback name="Dari Ann" />
      <Float placement="bottom-end" offsetX="1" offsetY="1">
        <Circle
          bg="green.500"
          size="8px"
          outline="0.2em solid"
          outlineColor="bg"
        />
      </Float>
    </Avatar.Root>
  )
}
