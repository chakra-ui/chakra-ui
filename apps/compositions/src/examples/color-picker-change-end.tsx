"use client"

import {
  Code,
  ColorPicker,
  HStack,
  Portal,
  Stack,
  parseColor,
} from "@chakra-ui/react"
import { useState } from "react"

export const ColorPickerChangeEnd = () => {
  const [value, setValue] = useState(parseColor("#eb5e41"))

  return (
    <Stack gap="8" align="flex-start">
      <Code>
        onChangeEnd: <b>{value.toString("hex")}</b>
      </Code>
      <ColorPicker.Root
        defaultValue={value}
        onValueChangeEnd={(e) => setValue(e.value)}
      >
        <ColorPicker.HiddenInput />
        <ColorPicker.Label>Color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.Input />
          <ColorPicker.Trigger />
        </ColorPicker.Control>
        <Portal>
          <ColorPicker.Positioner>
            <ColorPicker.Content>
              <ColorPicker.Area />
              <HStack>
                <ColorPicker.EyeDropper size="xs" variant="outline" />
                <ColorPicker.Sliders />
              </HStack>
            </ColorPicker.Content>
          </ColorPicker.Positioner>
        </Portal>
      </ColorPicker.Root>
    </Stack>
  )
}
