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
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"

export const ColorPickerWithSizes = () => {
  return (
    <Stack gap="8" maxW="sm">
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => (
          <ColorPickerRoot
            key={size}
            defaultValue={parseColor("#eb5e41")}
            size={size}
          >
            <ColorPickerLabel>Color ({size})</ColorPickerLabel>
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
              <ColorPickerSwatchGroup>
                {["red", "blue", "green"].map((item) => (
                  <ColorPickerSwatchTrigger
                    swatchSize="4.5"
                    key={item}
                    value={item}
                  />
                ))}
              </ColorPickerSwatchGroup>
            </ColorPickerContent>
          </ColorPickerRoot>
        )}
      </For>
    </Stack>
  )
}
