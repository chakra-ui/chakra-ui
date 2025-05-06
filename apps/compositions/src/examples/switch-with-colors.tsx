import { Stack, Switch, Text } from "@sh3yk0-ui/react"
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
            <Switch.Control />
            <Switch.Label />
          </Switch.Root>

          <Switch.Root colorPalette={colorPalette} defaultChecked>
            <Switch.HiddenInput />
            <Switch.Control />
            <Switch.Label />
          </Switch.Root>
        </Stack>
      ))}
    </Stack>
  )
}
