import { Progress, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

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

          <Progress.Root
            width="120px"
            defaultValue={40}
            colorPalette={colorPalette}
            variant="outline"
          >
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
          <Progress.Root
            width="120px"
            defaultValue={40}
            colorPalette={colorPalette}
            variant="subtle"
          >
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Stack>
      ))}
    </Stack>
  )
}
