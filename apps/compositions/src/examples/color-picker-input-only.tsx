"use client"

import { parseColor } from "@chakra-ui/react"
import {
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerValueSwatch,
} from "compositions/ui/color-picker"
import { InputGroup } from "compositions/ui/input-group"

export const ColorPickerInputOnly = () => {
  return (
    <ColorPickerRoot defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <InputGroup
          startOffset="0px"
          startElement={<ColorPickerValueSwatch boxSize="4.5" />}
          endElementProps={{ px: "1" }}
          endElement={<ColorPickerEyeDropper variant="ghost" />}
        >
          <ColorPickerInput />
        </InputGroup>
      </ColorPickerControl>
    </ColorPickerRoot>
  )
}
