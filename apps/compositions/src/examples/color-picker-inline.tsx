"use client"

import { HStack, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerEyeDropper,
  ColorPickerInlineContent,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerValueSwatch,
} from "compositions/ui/color-picker"

export const ColorPickerInline = () => {
  return (
    <ColorPickerRoot open defaultValue={parseColor("#000")}>
      <ColorPickerInlineContent>
        <ColorPickerArea />
        <HStack>
          <ColorPickerEyeDropper />
          <ColorPickerSliders />
          <ColorPickerValueSwatch />
        </HStack>
      </ColorPickerInlineContent>
    </ColorPickerRoot>
  )
}
