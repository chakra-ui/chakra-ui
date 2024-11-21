"use client"

import { ColorPickerChannelInput, parseColor } from "@chakra-ui/react"
import {
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerRoot,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"

export const ColorPickerWithSwatchAndInput = () => {
  return (
    <ColorPickerRoot
      size="xs"
      defaultValue={parseColor("#eb5e41")}
      maxW="200px"
    >
      <ColorPickerControl>
        <ColorPickerTrigger />
      </ColorPickerControl>
      <ColorPickerContent>
        <ColorPickerSwatchGroup>
          {swatches.map((item) => (
            <ColorPickerSwatchTrigger key={item} value={item} />
          ))}
        </ColorPickerSwatchGroup>
        <ColorPickerChannelInput channel="hex" />
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}

const swatches = ["red", "blue", "green"]
