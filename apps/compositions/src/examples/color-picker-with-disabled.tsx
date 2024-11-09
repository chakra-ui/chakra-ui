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

export const ColorPickerWithDisabled = () => {
  return (
    <ColorPickerRoot disabled defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl alignItems="center">
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
