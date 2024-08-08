import { For, HStack, IconButton } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { LuSearch } from "react-icons/lu"

export const IconButtonWithColors = () => {
  return (
    <HStack wrap="wrap">
      <For each={colorPalettes}>
        {(c) => (
          <IconButton aria-label="Search database" key={c} colorPalette={c}>
            <LuSearch />
          </IconButton>
        )}
      </For>
    </HStack>
  )
}
