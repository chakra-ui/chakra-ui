import { Checkbox, For, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

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
          <For each={["outline", "subtle", "solid"]}>
            {(variant) => (
              <Stack key={variant} mb="4">
                <Checkbox.Root variant={variant} colorPalette={colorPalette}>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Checkbox</Checkbox.Label>
                </Checkbox.Root>

                <Checkbox.Root
                  defaultChecked
                  variant={variant}
                  colorPalette={colorPalette}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Checkbox</Checkbox.Label>
                </Checkbox.Root>
              </Stack>
            )}
          </For>
        </Stack>
      ))}
    </Stack>
  )
}
