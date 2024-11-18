import { HStack, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerFormatInput,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliderControl,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"

export const ColorPickerWithChannelInput = () => {
  return (
    <ColorPickerRoot defaultValue={parseColor("#eb5e41")} maxW="200px">
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
        <ColorPickerFormatInput format="rgba" />
        <ColorPickerFormatInput format="hsla" />
        <ColorPickerFormatInput format="hsba" />
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}
