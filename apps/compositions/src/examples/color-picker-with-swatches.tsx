import { HStack, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerHexInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliderControl,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"

// prettier-ignore
const swatches = ["#000000", "#4A5568", "#F56565", "#ED64A6", "#9F7AEA", "#6B46C1", "#4299E1", "#0BC5EA", "#00B5D8", "#38B2AC", "#48BB78", "#68D391", "#ECC94B", "#DD6B20"]

export const ColorPickerWithSwatches = () => {
  return (
    <ColorPickerRoot defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl alignItems="center">
        <ColorPickerHexInput />
        <ColorPickerTrigger />
      </ColorPickerControl>
      <ColorPickerContent>
        <ColorPickerArea />
        <HStack>
          <ColorPickerEyeDropper />
          <ColorPickerSliderControl />
        </HStack>
        <ColorPickerSwatchGroup>
          {swatches.map((item) => (
            <ColorPickerSwatchTrigger key={item} value={item} />
          ))}
        </ColorPickerSwatchGroup>
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}
