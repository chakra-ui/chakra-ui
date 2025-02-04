import { Avatar, HStack, defineStyle } from "@chakra-ui/react"

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
})

export const AvatarWithRing = () => {
  return (
    <HStack gap="4">
      <Avatar.Root css={ringCss} colorPalette="pink">
        <Avatar.Fallback name="Random" />
        <Avatar.Image src="https://randomuser.me/api/portraits/men/70.jpg" />
      </Avatar.Root>
      <Avatar.Root css={ringCss} colorPalette="green">
        <Avatar.Fallback name="Random" />
        <Avatar.Image src="https://randomuser.me/api/portraits/men/54.jpg" />
      </Avatar.Root>
      <Avatar.Root css={ringCss} colorPalette="blue">
        <Avatar.Fallback name="Random" />
        <Avatar.Image src="https://randomuser.me/api/portraits/men/42.jpg" />
      </Avatar.Root>
    </HStack>
  )
}
