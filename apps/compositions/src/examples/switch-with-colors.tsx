import { Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { Switch } from "compositions/ui/switch"

export const SwitchWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack
          align="center"
          key={colorPalette}
          direction="row"
          gap="10"
          px="4"
        >
          <Text minW="8ch">{colorPalette}</Text>
          <Switch colorPalette={colorPalette} />
          <Switch colorPalette={colorPalette} defaultChecked />
        </Stack>
      ))}
    </Stack>
  )
}
