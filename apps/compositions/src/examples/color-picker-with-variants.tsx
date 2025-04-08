"use client"

import {
  ColorPicker,
  For,
  HStack,
  Portal,
  Stack,
  parseColor,
} from "@chakra-ui/react"

export const ColorPickerWithVariants = () => {
  return (
    <Stack gap="8">
      <For each={["outline", "subtle"]}>
        {(variant) => (
          <ColorPicker.Root
            defaultValue={parseColor("#eb5e41")}
            maxW="200px"
            variant={variant}
          >
            <ColorPicker.HiddenInput />
            <ColorPicker.Label>Color ({variant})</ColorPicker.Label>
            <ColorPicker.Control>
              <ColorPicker.Input />
              <ColorPicker.Trigger />
            </ColorPicker.Control>
            <Portal>
              <ColorPicker.Positioner>
                <ColorPicker.Content>
                  <ColorPicker.Area />
                  <HStack>
                    <ColorPicker.EyeDropper size="xs" variant="outline" />
                    <ColorPicker.Sliders />
                  </HStack>
                </ColorPicker.Content>
              </ColorPicker.Positioner>
            </Portal>
          </ColorPicker.Root>
        )}
      </For>
    </Stack>
  )
}
