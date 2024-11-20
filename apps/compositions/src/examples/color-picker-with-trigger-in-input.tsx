"use client"

import { HStack, parseColor } from "@chakra-ui/react"
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
  ColorPickerValueSwatch,
} from "compositions/ui/color-picker"
import { InputGroup } from "compositions/ui/input-group"

export const ColorPickerWithTriggerInInput = () => {
  return (
    <ColorPickerRoot defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPickerLabel>Trigger on swatch</ColorPickerLabel>
      <ColorPickerControl>
        <InputGroup
          startOffset="0px"
          startElementProps={{ pointerEvents: "all" }}
          startElement={
            <ColorPickerTrigger fitContent>
              <ColorPickerValueSwatch boxSize="4.5" />
            </ColorPickerTrigger>
          }
          endElementProps={{ px: "1" }}
          endElement={<ColorPickerEyeDropper variant="ghost" />}
        >
          <ColorPickerInput />
        </InputGroup>
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
