"use client"

import {
  ColorPicker,
  HStack,
  Portal,
  parseColor,
  useColorPicker,
} from "@sh3yk0-ui/react"

export const ColorPickerWithStore = () => {
  const colorPicker = useColorPicker({
    defaultValue: parseColor("#eb5e41"),
  })

  return (
    <ColorPicker.RootProvider value={colorPicker} maxW="200px">
      <ColorPicker.Label>Color</ColorPicker.Label>
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
    </ColorPicker.RootProvider>
  )
}
