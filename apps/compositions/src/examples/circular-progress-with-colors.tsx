import { Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { CircularProgress } from "compositions/ui/circular-progress"

export const CircularProgressWithColors = () => {
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
          <CircularProgress
            capIsRound
            size="sm"
            showValue
            value={30}
            colorPalette={colorPalette}
          />
          <CircularProgress
            capIsRound
            size="md"
            showValue
            value={30}
            colorPalette={colorPalette}
          />
          <CircularProgress
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
