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
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"

export const ColorPickerWithFormat = () => {
  return (
    <ColorPickerRoot
      defaultValue={parseColor("#eb5e41")}
      maxW="200px"
      format="hsla"
    >
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerInput />
        <ColorPickerTrigger />
      </ColorPickerControl>
      <ColorPickerContent>
        <ColorPickerArea />
        <HStack>
          <ColorPickerEyeDropper />
          <ColorPickerSliders />
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
