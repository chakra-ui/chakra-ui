import { Code, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const CodeWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack
          align="center"
          key={colorPalette}
          direction="row"
          gap="10"
          px="4"
          width="full"
        >
          <Text minW="8ch" textStyle="sm">
            {colorPalette}
          </Text>
          <Code colorPalette={colorPalette} variant="solid">
            {`console.log()`}
          </Code>
          <Code colorPalette={colorPalette} variant="outline">
            {`console.log()`}
          </Code>
          <Code colorPalette={colorPalette} variant="subtle">
            {`console.log()`}
          </Code>
          <Code colorPalette={colorPalette} variant="surface">
            {`console.log()`}
          </Code>
        </Stack>
      ))}
    </Stack>
  )
}
