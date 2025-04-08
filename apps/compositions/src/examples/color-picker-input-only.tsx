"use client"

import { ColorPicker, InputGroup, parseColor } from "@chakra-ui/react"

export const ColorPickerInputOnly = () => {
  return (
    <ColorPicker.Root defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <InputGroup
          startElement={<ColorPicker.ValueSwatch boxSize="4.5" />}
          endElementProps={{ px: "1" }}
          endElement={<ColorPicker.EyeDropper size="xs" variant="ghost" />}
        >
          <ColorPicker.Input />
        </InputGroup>
      </ColorPicker.Control>
    </ColorPicker.Root>
  )
}
