import { RadioGroup, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { RadioItem } from "compositions/ui/radio-item"

export const RadioGroupWithColors = () => {
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
          <RadioGroup.Root
            colorPalette={colorPalette}
            defaultValue="react"
            spaceX="8"
          >
            <RadioItem value="react">React</RadioItem>
            <RadioItem value="vue">Vue</RadioItem>
            <RadioItem value="solid">Solid</RadioItem>
          </RadioGroup.Root>
        </Stack>
      ))}
    </Stack>
  )
}
