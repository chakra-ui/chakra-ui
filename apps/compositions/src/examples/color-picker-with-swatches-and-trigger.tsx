import { HStack, Square, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
  ColorPickerValueText,
} from "compositions/ui/color-picker"

export const ColorPickerWithSwatchesAndTrigger = () => {
  return (
    <ColorPickerRoot defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPickerLabel>
        Color: <ColorPickerValueText />
      </ColorPickerLabel>
      <ColorPickerControl alignItems="center">
        <ColorPickerSwatchGroup>
          {["red", "blue", "green"].map((item) => (
            <ColorPickerSwatchTrigger key={item} value={item} />
          ))}
          <ColorPickerTrigger textStyle="lg">
            <Square
              size="7"
              bgImage="url(https://static.canva.com/web/images/788ee7a68293bd0264fc31f22c31e62d.png)"
              bgSize="cover"
              rounded="sm"
            />
          </ColorPickerTrigger>
        </ColorPickerSwatchGroup>
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
