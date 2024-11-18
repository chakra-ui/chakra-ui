"use client"

import { Code, HStack, Stack, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliders,
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
      </ColorPickerRoot>
    </Stack>
  )
}
