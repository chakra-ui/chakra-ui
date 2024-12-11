"use client"

import { For, HStack, Stack, parseColor } from "@chakra-ui/react"
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

export const ColorPickerWithVariants = () => {
  return (
    <Stack gap="8">
      <For each={["outline", "subtle"]}>
        {(variant) => (
          <ColorPickerRoot
            defaultValue={parseColor("#eb5e41")}
            maxW="200px"
            variant={variant}
          >
            <ColorPickerLabel>Color ({variant})</ColorPickerLabel>
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
        )}
      </For>
    </Stack>
  )
}
