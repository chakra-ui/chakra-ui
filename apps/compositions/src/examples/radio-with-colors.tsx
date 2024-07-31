import { HStack, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { Radio, RadioGroup } from "compositions/ui/radio"

export const RadioWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <HStack key={colorPalette} gap="10" px="4">
          <Text minW="8ch">{colorPalette}</Text>
          <RadioGroup
            colorPalette={colorPalette}
            defaultValue="react"
            spaceX="8"
          >
            <Radio value="react">React</Radio>
            <Radio value="vue">Vue</Radio>
            <Radio value="solid">Solid</Radio>
          </RadioGroup>
        </HStack>
      ))}
    </Stack>
  )
}
