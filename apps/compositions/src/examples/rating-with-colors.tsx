import { Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { Rating } from "compositions/ui/rating"

export const RatingWithColors = () => {
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
          <Rating defaultValue={3} size="sm" colorPalette={colorPalette}>
            Button
          </Rating>
        </Stack>
      ))}
    </Stack>
  )
}
