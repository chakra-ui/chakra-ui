import { For, HStack, Stack, parseColor } from "@chakra-ui/react"
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

export const ColorPickerWithVariants = () => {
  return (
    <Stack gap="8">
      <For each={["outline", "subtle"]}>
        {(variant) => (
          <ColorPickerRoot
            defaultValue={parseColor("#eb5e41")}
            maxW="200px"
            variant={variant}
          >
            <ColorPickerLabel>Color ({variant})</ColorPickerLabel>
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
        )}
      </For>
    </Stack>
  )
}
