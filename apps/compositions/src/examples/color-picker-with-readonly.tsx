import { HStack, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliderControl,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"

export const ColorPickerWithReadonly = () => {
  return (
    <ColorPickerRoot readOnly defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl alignItems="center">
        <ColorPickerInput />
        <ColorPickerTrigger />
      </ColorPickerControl>
      <ColorPickerContent>
        <ColorPickerArea />
        <HStack>
          <ColorPickerEyeDropper />
          <ColorPickerSliderControl />
        </HStack>
        <ColorPickerSwatchGroup>
          {["red", "blue", "green"].map((item) => (
            <ColorPickerSwatchTrigger key={item} value={item} />
          ))}
        </ColorPickerSwatchGroup>
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}
