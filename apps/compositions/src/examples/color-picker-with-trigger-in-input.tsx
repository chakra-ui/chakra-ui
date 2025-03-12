"use client"

import { ColorPicker, parseColor } from "@chakra-ui/react"
import { InputGroup } from "compositions/ui/input-group"

export const ColorPickerWithTriggerInInput = () => {
  return (
    <ColorPicker.Root defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>Trigger on swatch</ColorPicker.Label>
      <ColorPicker.Control>
        <InputGroup
          startOffset="0px"
          startElementProps={{ pointerEvents: "all" }}
          startElement={
            <ColorPicker.Trigger data-fit-content>
              <ColorPicker.ValueSwatch boxSize="4.5" />
            </ColorPicker.Trigger>
          }
          endElementProps={{ px: "1" }}
          endElement={
            <ColorPicker.EyeDropperTrigger size="xs" variant="ghost" />
          }
        >
          <ColorPicker.Input />
        </InputGroup>
      </ColorPicker.Control>
      <ColorPicker.Content>
        <ColorPicker.Area />
        <ColorPicker.Sliders />
      </ColorPicker.Content>
    </ColorPicker.Root>
  )
}
