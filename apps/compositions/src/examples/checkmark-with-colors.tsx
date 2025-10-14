import { Checkmark, For, HStack } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const CheckmarkWithColors = () => {
  return (
    <HStack gap={4}>
      <For each={colorPalettes}>
        {(colorPalette) => (
          <Checkmark key={colorPalette} colorPalette={colorPalette} checked />
        )}
      </For>
    </HStack>
  )
}
