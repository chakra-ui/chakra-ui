"use client"

import {
  ColorPickerRootProvider,
  HStack,
  parseColor,
  useColorPicker,
} from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerSliders,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"

export const ColorPickerWithStore = () => {
  const colorPicker = useColorPicker({
    defaultValue: parseColor("#eb5e41"),
  })

  return (
    <ColorPickerRootProvider value={colorPicker} maxW="200px">
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
      </ColorPickerContent>
    </ColorPickerRootProvider>
  )
}
