"use client"

import { HStack, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerTrigger,
  ColorPickerValueSwatch,
  ColorPickerValueText,
} from "compositions/ui/color-picker"

export const ColorPickerTriggerOnly = () => {
  return (
    <ColorPickerRoot defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerTrigger px="2">
          <ColorPickerValueSwatch boxSize="6" />
          <ColorPickerValueText minW="160px" />
        </ColorPickerTrigger>
      </ColorPickerControl>
      <ColorPickerContent>
        <ColorPickerArea />
        <HStack>
          <ColorPickerEyeDropper />
          <ColorPickerSliders />
          <ColorPickerValueSwatch />
        </HStack>
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}
