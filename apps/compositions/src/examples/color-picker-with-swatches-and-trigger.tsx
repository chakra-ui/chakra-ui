"use client"

import { HStack, Square, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
  ColorPickerValueText,
} from "compositions/ui/color-picker"
import { LuPlus } from "react-icons/lu"

export const ColorPickerWithSwatchesAndTrigger = () => {
  return (
    <ColorPickerRoot defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPickerLabel>
        Color: <ColorPickerValueText />
      </ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerSwatchGroup>
          {swatches.map((item) => (
            <ColorPickerSwatchTrigger key={item} value={item} />
          ))}
          <ColorPickerTrigger textStyle="lg">
            <Square
              size="7"
              bgSize="cover"
              overflow="hidden"
              border="4px solid"
              borderImage="conic-gradient(from 90deg, red, yellow, lime, aqua, blue, magenta, red) 1"
            >
              <LuPlus />
            </Square>
          </ColorPickerTrigger>
        </ColorPickerSwatchGroup>
      </ColorPickerControl>
      <ColorPickerContent>
        <ColorPickerArea />
        <HStack>
          <ColorPickerEyeDropper />
          <ColorPickerSliders />
        </HStack>
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}

const swatches = ["red", "blue", "green"]
