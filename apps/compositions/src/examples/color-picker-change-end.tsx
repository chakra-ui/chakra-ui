"use client"

import { Code, HStack, Stack, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerHexInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliderControl,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"
import { useState } from "react"

export const ColorPickerChangeEnd = () => {
  const [value, setValue] = useState(parseColor("#eb5e41"))

  return (
    <Stack gap="8" align="flex-start">
      <Code>
        onChangeEnd: <b>{value.toString("hex")}</b>
      </Code>
      <ColorPickerRoot
        defaultValue={value}
        onValueChangeEnd={(e) => setValue(e.value)}
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
          <ColorPickerSwatchGroup>
            {["red", "blue", "green"].map((item) => (
              <ColorPickerSwatchTrigger key={item} value={item} />
            ))}
          </ColorPickerSwatchGroup>
        </ColorPickerContent>
      </ColorPickerRoot>
    </Stack>
  )
}
