"use client"

import {
  ColorPicker,
  HStack,
  Portal,
  Square,
  parseColor,
} from "@chakra-ui/react"
import { LuCheck, LuPlus } from "react-icons/lu"

export const ColorPickerWithSwatchesAndTrigger = () => {
  return (
    <ColorPicker.Root defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>
        Color: <ColorPicker.ValueText />
      </ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.SwatchGroup>
          {swatches.map((item) => (
            <ColorPicker.SwatchTrigger key={item} value={item}>
              <ColorPicker.Swatch value={item}>
                <ColorPicker.SwatchIndicator>
                  <LuCheck />
                </ColorPicker.SwatchIndicator>
              </ColorPicker.Swatch>
            </ColorPicker.SwatchTrigger>
          ))}
          <ColorPicker.Trigger textStyle="lg">
            <Square
              size="7"
              bgSize="cover"
              overflow="hidden"
              border="4px solid"
              borderImage="conic-gradient(from 90deg, red, yellow, lime, aqua, blue, magenta, red) 1"
            >
              <LuPlus />
            </Square>
          </ColorPicker.Trigger>
        </ColorPicker.SwatchGroup>
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
  )
}

const swatches = ["red", "blue", "green"]
