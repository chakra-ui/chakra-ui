import { Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { ProgressCircle } from "compositions/ui/progress-circle"

export const ProgressCircleWithColors = () => {
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
          <ProgressCircle
            capIsRound
            size="sm"
            showValue
            value={30}
            colorPalette={colorPalette}
          />
          <ProgressCircle
            capIsRound
            size="md"
            showValue
            value={30}
            colorPalette={colorPalette}
          />
          <ProgressCircle
            capIsRound
            size="lg"
            showValue
            value={30}
            colorPalette={colorPalette}
          />
        </Stack>
      ))}
    </Stack>
  )
}
