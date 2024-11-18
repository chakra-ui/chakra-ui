import { For, HStack, Stack, parseColor } from "@chakra-ui/react"
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

export const ColorPickerWithSizes = () => {
  return (
    <Stack gap="8" maxW="sm">
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => (
          <ColorPickerRoot
            key={size}
            defaultValue={parseColor("#eb5e41")}
            size={size}
          >
            <ColorPickerLabel>Color ({size})</ColorPickerLabel>
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
                {["red", "blue", "green"].map((item) => (
                  <ColorPickerSwatchTrigger key={item} value={item} />
                ))}
              </ColorPickerSwatchGroup>
            </ColorPickerContent>
          </ColorPickerRoot>
        )}
      </For>
    </Stack>
  )
}
