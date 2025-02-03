import { Stack, Tag, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { HiPlus } from "react-icons/hi"

export const TagWithColors = () => {
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

          <Tag.Root size="sm" colorPalette={colorPalette}>
            <Tag.Label>Content</Tag.Label>
          </Tag.Root>
          <Tag.Root size="sm" colorPalette={colorPalette}>
            <Tag.StartElement>
              <HiPlus />
            </Tag.StartElement>
            <Tag.Label>Content</Tag.Label>
          </Tag.Root>
          <Tag.Root colorPalette={colorPalette} variant="solid">
            <Tag.Label>Content</Tag.Label>
            <Tag.EndElement>
              <Tag.CloseTrigger />
            </Tag.EndElement>
          </Tag.Root>
        </Stack>
      ))}
    </Stack>
  )
}
