"use client"

import { HStack, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerChannelInputs,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"

export const ColorPickerWithChannelInput = () => {
  return (
    <ColorPickerRoot defaultValue={parseColor("#eb5e41")} maxW="200px">
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
        <ColorPickerChannelInputs format="rgba" />
        <ColorPickerChannelInputs format="hsla" />
        <ColorPickerChannelInputs format="hsba" />
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}
