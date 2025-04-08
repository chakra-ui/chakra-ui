import { HStack, ProgressCircle, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const ProgressCircleWithColors = () => {
  return (
    <Stack gap="4" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <HStack key={colorPalette} gap="10" px="4">
          <Text minW="8ch">{colorPalette}</Text>

          <ProgressCircle.Root size="sm" value={30} colorPalette={colorPalette}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range strokeLinecap="round" />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>

          <ProgressCircle.Root size="md" value={30} colorPalette={colorPalette}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range strokeLinecap="round" />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>

          <ProgressCircle.Root size="lg" value={30} colorPalette={colorPalette}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range strokeLinecap="round" />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>
        </HStack>
      ))}
    </Stack>
  )
}
