import { Button, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const ButtonWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack align="center" key={colorPalette} direction="row" gap="10">
          <Text minW="8ch">{colorPalette}</Text>
          <Button colorPalette={colorPalette}>Button</Button>
          <Button colorPalette={colorPalette} variant="outline">
            Button
          </Button>
          <Button colorPalette={colorPalette} variant="surface">
            Button
          </Button>
          <Button colorPalette={colorPalette} variant="subtle">
            Button
          </Button>
        </Stack>
      ))}
    </Stack>
  )
}
