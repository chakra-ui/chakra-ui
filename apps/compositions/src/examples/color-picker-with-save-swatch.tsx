"use client"

import {
  Button,
  HStack,
  IconButton,
  Show,
  VStack,
  parseColor,
} from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
  ColorPickerValueSwatch,
} from "compositions/ui/color-picker"
import { useState } from "react"
import { LuPlus, LuType } from "react-icons/lu"

export const ColorPickerWithSaveSwatch = () => {
  const [color, setColor] = useState(parseColor("#000"))
  const [view, setView] = useState<"picker" | "swatch">("swatch")
  const [swatches, setSwatches] = useState<string[]>([
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
  ])

  return (
    <ColorPickerRoot
      defaultValue={color}
      onValueChange={(e) => setColor(e.value)}
      maxW="200px"
    >
      <ColorPickerControl>
        <ColorPickerTrigger>
          <VStack gap="1">
            <LuType />
            <ColorPickerValueSwatch h="2" />
          </VStack>
        </ColorPickerTrigger>
      </ColorPickerControl>

      <ColorPickerContent>
        <Show when={view === "picker"}>
          <ColorPickerArea />
          <HStack>
            <ColorPickerEyeDropper />
            <ColorPickerSliders />
          </HStack>
          <Button
            onClick={() => {
              setSwatches((prev) => [...prev, color.toString("css")])
              setView("swatch")
            }}
          >
            Save Swatch
          </Button>
        </Show>
        <Show when={view === "swatch"}>
          <ColorPickerSwatchGroup>
            {swatches.map((swatch) => (
              <ColorPickerSwatchTrigger key={swatch} value={swatch} />
            ))}
            <IconButton
              variant="outline"
              size="xs"
              onClick={() => setView("picker")}
            >
              <LuPlus />
            </IconButton>
          </ColorPickerSwatchGroup>
        </Show>
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}
