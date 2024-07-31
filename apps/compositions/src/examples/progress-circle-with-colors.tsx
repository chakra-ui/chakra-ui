import { HStack, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "compositions/ui/progress-circle"

export const ProgressCircleWithColors = () => {
  return (
    <Stack gap="4" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <HStack key={colorPalette} gap="10" px="4">
          <Text minW="8ch">{colorPalette}</Text>
          <ProgressCircleRoot size="sm" value={30} colorPalette={colorPalette}>
            <ProgressCircleRing cap="round" />
          </ProgressCircleRoot>

          <ProgressCircleRoot size="md" value={30} colorPalette={colorPalette}>
            <ProgressCircleRing cap="round" />
          </ProgressCircleRoot>

          <ProgressCircleRoot size="lg" value={30} colorPalette={colorPalette}>
            <ProgressCircleRing cap="round" />
          </ProgressCircleRoot>
        </HStack>
      ))}
    </Stack>
  )
}
