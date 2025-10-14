import { For, HStack, Radiomark } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const RadiomarkWithColors = () => {
  return (
    <HStack gap={4}>
      <For each={colorPalettes}>
        {(colorPalette) => (
          <Radiomark key={colorPalette} colorPalette={colorPalette} checked />
        )}
      </For>
    </HStack>
  )
}
