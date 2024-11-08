import { parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerHexInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliderControl,
  ColorPickerSwatchGroup,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"

export const ColorPickerBasic = () => {
  return (
    <ColorPickerRoot defaultValue={parseColor("#eb5e41")}>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl alignItems="center" maxW="200px">
        <ColorPickerHexInput />
        <ColorPickerTrigger />
      </ColorPickerControl>
      <ColorPickerContent>
        <ColorPickerArea />
        <ColorPickerSliderControl />
        <ColorPickerSwatchGroup items={["red", "blue", "green"]} />
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}
