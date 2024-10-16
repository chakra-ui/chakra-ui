import { For, HStack, Stack } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"

export const RadioCardWithColors = () => {
  return (
    <Stack gap="8">
      <For each={colorPalettes}>
        {(colorPalette) => (
          <RadioCardRoot
            key={colorPalette}
            colorPalette={colorPalette}
            defaultValue="next"
          >
            <RadioCardLabel>Select Framework</RadioCardLabel>
            <HStack align="stretch">
              {items.map((item) => (
                <RadioCardItem
                  label={item.title}
                  key={item.value}
                  value={item.value}
                />
              ))}
            </HStack>
          </RadioCardRoot>
        )}
      </For>
    </Stack>
  )
}

const items = [
  { value: "next", title: "Next.js" },
  { value: "vite", title: "Vite" },
]
