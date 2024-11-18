"use client"

import { HStack, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerHexInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliderControl,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"
import { useState } from "react"

export const ColorPickerControlled = () => {
  const [color, setColor] = useState(parseColor("#eb5e41"))

  return (
    <ColorPickerRoot
      value={color}
      onValueChange={(e) => setColor(e.value)}
      maxW="200px"
    >
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl alignItems="center">
        <ColorPickerHexInput />
        <ColorPickerTrigger />
      </ColorPickerControl>
      <ColorPickerContent>
        <ColorPickerArea />
        <HStack>
          <ColorPickerEyeDropper />
          <ColorPickerSliderControl />
        </HStack>
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}
