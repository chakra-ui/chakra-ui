import { Spinner, Stack } from "@sh3yk0-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const SpinnerWithColors = () => {
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
          <Spinner
            size="sm"
            color="colorPalette.600"
            colorPalette={colorPalette}
          />
          <Spinner
            size="md"
            color="colorPalette.600"
            colorPalette={colorPalette}
          />
          <Spinner
            size="lg"
            color="colorPalette.600"
            colorPalette={colorPalette}
          />
        </Stack>
      ))}
    </Stack>
  )
}
