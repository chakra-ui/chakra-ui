import { HStack, RadioGroup, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const RadioWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <HStack key={colorPalette} gap="10" px="4">
          <Text minW="8ch">{colorPalette}</Text>

          <RadioGroup.Root
            colorPalette={colorPalette}
            defaultValue="react"
            spaceX="8"
          >
            <RadioGroup.Item value="react">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>React</RadioGroup.ItemText>
            </RadioGroup.Item>

            <RadioGroup.Item value="vue">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Vue</RadioGroup.ItemText>
            </RadioGroup.Item>

            <RadioGroup.Item value="solid">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Solid</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </HStack>
      ))}
    </Stack>
  )
}
