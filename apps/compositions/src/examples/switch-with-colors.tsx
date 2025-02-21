import { Stack, Switch, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

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

          <Switch.Root colorPalette={colorPalette}>
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label />
          </Switch.Root>

          <Switch.Root colorPalette={colorPalette} defaultChecked>
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label />
          </Switch.Root>
        </Stack>
      ))}
    </Stack>
  )
}
