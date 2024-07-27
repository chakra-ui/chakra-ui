import { HStack, defineStyle } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
})

export const AvatarWithRing = () => {
  return (
    <HStack gap="4">
      <Avatar
        name="Random"
        colorPalette="pink"
        src="https://randomuser.me/api/portraits/men/70.jpg"
        css={ringCss}
      />
      <Avatar
        name="Random"
        colorPalette="green"
        src="https://randomuser.me/api/portraits/men/54.jpg"
        css={ringCss}
      />
      <Avatar
        name="Random"
        colorPalette="blue"
        src="https://randomuser.me/api/portraits/men/42.jpg"
        css={ringCss}
      />
    </HStack>
  )
}
