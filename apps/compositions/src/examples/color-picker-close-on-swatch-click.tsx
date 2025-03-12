"use client"

import { ColorPicker, HStack, Portal, parseColor } from "@chakra-ui/react"

export const ColorPickerCloseOnSwatchClick = () => {
  return (
    <ColorPicker.Root
      closeOnSelect
      defaultValue={parseColor("#eb5e41")}
      maxW="200px"
    >
      <ColorPicker.HiddenInput />
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
            <ColorPicker.SwatchGroup>
              {swatches.map((item) => (
                <ColorPicker.SwatchTrigger key={item} value={item} />
              ))}
            </ColorPicker.SwatchGroup>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  )
}

const swatches = ["#ff0000", "#0000ff", "#00ff00"]
