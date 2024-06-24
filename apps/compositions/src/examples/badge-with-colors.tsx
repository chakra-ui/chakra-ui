import { Badge, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const BadgeWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack
          align="center"
          key={colorPalette}
          direction="row"
          gap="10"
          px="4"
          width="full"
        >
          <Text minW="8ch">{colorPalette}</Text>
          <Badge colorPalette={colorPalette} variant="solid">
            New
          </Badge>
          <Badge colorPalette={colorPalette} variant="outline">
            New
          </Badge>
          <Badge colorPalette={colorPalette} variant="subtle">
            New
          </Badge>
          <Badge colorPalette={colorPalette} variant="surface">
            New
          </Badge>
        </Stack>
      ))}
    </Stack>
  )
}
