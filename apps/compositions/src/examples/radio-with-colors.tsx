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
            {items.map((item) => (
              <RadioGroup.Item key={item.value} value={item.value}>
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </HStack>
      ))}
    </Stack>
  )
}

const items = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Solid", value: "solid" },
]
