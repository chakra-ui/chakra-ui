import { Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { Checkbox } from "compositions/ui/checkbox"

export const CheckboxWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack
          align="center"
          key={colorPalette}
          direction="row"
          gap="10"
          width="full"
        >
          <Text minW="8ch">{colorPalette}</Text>
          <Stack>
            <Checkbox variant="outline" colorPalette={colorPalette}>
              Checkbox
            </Checkbox>
            <Checkbox
              defaultChecked
              variant="outline"
              colorPalette={colorPalette}
            >
              Checkbox
            </Checkbox>
          </Stack>

          <Stack>
            <Checkbox variant="subtle" colorPalette={colorPalette}>
              Checkbox
            </Checkbox>
            <Checkbox
              defaultChecked
              variant="subtle"
              colorPalette={colorPalette}
            >
              Checkbox
            </Checkbox>
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
