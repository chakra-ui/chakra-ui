import { Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { Slider } from "compositions/ui/slider"

export const SliderWithColors = () => {
  return (
    <Stack gap="4" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack
          align="center"
          key={colorPalette}
          direction="row"
          gap="10"
          px="4"
        >
          <Text minW="8ch">{colorPalette}</Text>
          <Slider
            width="200px"
            colorPalette={colorPalette}
            defaultValue={[40]}
            marks={[0, 50, 100]}
          />
          <Slider
            width="200px"
            colorPalette={colorPalette}
            defaultValue={[25, 75]}
          />
        </Stack>
      ))}
    </Stack>
  )
}
