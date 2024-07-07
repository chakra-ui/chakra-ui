import { Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { ProgressBar, ProgressRoot } from "compositions/ui/progress"

export const ProgressWithColors = () => {
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
          <ProgressRoot
            width="120px"
            defaultValue={40}
            colorPalette={colorPalette}
            variant="outline"
          >
            <ProgressBar />
          </ProgressRoot>
          <ProgressRoot
            width="120px"
            defaultValue={40}
            colorPalette={colorPalette}
            variant="subtle"
          >
            <ProgressBar />
          </ProgressRoot>
        </Stack>
      ))}
    </Stack>
  )
}
