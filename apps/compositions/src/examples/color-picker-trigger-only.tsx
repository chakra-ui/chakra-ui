import { parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliderControl,
  ColorPickerTrigger,
  ColorPickerValueText,
} from "compositions/ui/color-picker"

export const ColorPickerTriggerOnly = () => {
  return (
    <ColorPickerRoot defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl alignItems="center">
        <ColorPickerTrigger>
          <ColorPickerValueText minW="160px" />
        </ColorPickerTrigger>
      </ColorPickerControl>
      <ColorPickerContent>
        <ColorPickerArea />
        <ColorPickerSliderControl />
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}
