"use client"

import {
  ColorPicker,
  For,
  HStack,
  Portal,
  Stack,
  parseColor,
} from "@chakra-ui/react"
import { LuCheck } from "react-icons/lu"

export const ColorPickerWithSizes = () => {
  return (
    <Stack gap="8" maxW="sm">
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => (
          <ColorPicker.Root
            key={size}
            defaultValue={parseColor("#eb5e41")}
            size={size}
          >
            <ColorPicker.HiddenInput />
            <ColorPicker.Label>Color ({size})</ColorPicker.Label>
            <ColorPicker.Control>
              <ColorPicker.Input />
              <ColorPicker.Trigger />
            </ColorPicker.Control>
            <Portal>
              <ColorPicker.Positioner>
                <ColorPicker.Content>
                  <ColorPicker.Area />
                  <HStack>
                    <ColorPicker.EyeDropper size="sm" variant="outline" />
                    <ColorPicker.Sliders />
                  </HStack>
                  <ColorPicker.SwatchGroup>
                    {swatches.map((item) => (
                      <ColorPicker.SwatchTrigger key={item} value={item}>
                        <ColorPicker.Swatch value={item} boxSize="4.5">
                          <ColorPicker.SwatchIndicator>
                            <LuCheck />
                          </ColorPicker.SwatchIndicator>
                        </ColorPicker.Swatch>
                      </ColorPicker.SwatchTrigger>
                    ))}
                  </ColorPicker.SwatchGroup>
                </ColorPicker.Content>
              </ColorPicker.Positioner>
            </Portal>
          </ColorPicker.Root>
        )}
      </For>
    </Stack>
  )
}

const swatches = ["red", "blue", "green"]
