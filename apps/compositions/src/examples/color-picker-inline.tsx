"use client"

import { ColorPicker, HStack, parseColor } from "@chakra-ui/react"

export const ColorPickerInline = () => {
  return (
    <ColorPicker.Root open defaultValue={parseColor("#000")}>
      <ColorPicker.HiddenInput />
      <ColorPicker.Content animation="none" shadow="none" padding="0">
        <ColorPicker.Area />
        <HStack>
          <ColorPicker.EyeDropper size="xs" variant="outline" />
          <ColorPicker.Sliders />
          <ColorPicker.ValueSwatch />
        </HStack>
      </ColorPicker.Content>
    </ColorPicker.Root>
  )
}
