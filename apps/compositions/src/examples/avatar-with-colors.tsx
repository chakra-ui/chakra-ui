import { Avatar, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const AvatarWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack key={colorPalette} align="center" direction="row" gap="10">
          <Text minW="8ch">{colorPalette}</Text>
          <Avatar.Root colorPalette={colorPalette}>
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
          <Avatar.Root colorPalette={colorPalette}>
            <Avatar.Fallback name="Segun Adebayo" />
          </Avatar.Root>
          <Avatar.Root colorPalette={colorPalette}>
            <Avatar.Fallback />
          </Avatar.Root>
        </Stack>
      ))}
    </Stack>
  )
}
