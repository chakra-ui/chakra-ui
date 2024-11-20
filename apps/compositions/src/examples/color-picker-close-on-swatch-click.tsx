"use client"

import { HStack, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"

export const ColorPickerCloseOnSwatchClick = () => {
  return (
    <ColorPickerRoot
      closeOnSelect
      defaultValue={parseColor("#eb5e41")}
      maxW="200px"
    >
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerInput />
        <ColorPickerTrigger />
      </ColorPickerControl>
      <ColorPickerContent>
        <ColorPickerArea />
        <HStack>
          <ColorPickerEyeDropper />
          <ColorPickerSliders />
        </HStack>
        <ColorPickerSwatchGroup>
          {["red", "blue", "green"].map((item) => (
            <ColorPickerSwatchTrigger key={item} value={item} />
          ))}
        </ColorPickerSwatchGroup>
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}
