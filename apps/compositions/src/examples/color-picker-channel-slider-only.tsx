"use client"

import { ColorPickerFormatSelect, parseColor } from "@chakra-ui/react"
import {
  ColorPickerChannelSliders,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerRoot,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"

export const ColorPickerChannelSliderOnly = () => {
  return (
    <ColorPickerRoot defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPickerControl>
        <ColorPickerTrigger />
      </ColorPickerControl>
      <ColorPickerContent>
        <ColorPickerFormatSelect />
        <ColorPickerChannelSliders format="hsla" />
        <ColorPickerChannelSliders format="hsba" />
        <ColorPickerChannelSliders format="rgba" />
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}
