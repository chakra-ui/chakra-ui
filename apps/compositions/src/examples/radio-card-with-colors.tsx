import { For, HStack, RadioCard, Stack } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const RadioCardWithColors = () => {
  return (
    <Stack gap="8">
      <For each={colorPalettes}>
        {(colorPalette) => (
          <RadioCard.Root
            key={colorPalette}
            colorPalette={colorPalette}
            defaultValue="next"
          >
            <RadioCard.Label>Select Framework</RadioCard.Label>
            <HStack align="stretch">
              {items.map((item) => (
                <RadioCard.Item key={item.value} value={item.value}>
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl>
                    <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </HStack>
          </RadioCard.Root>
        )}
      </For>
    </Stack>
  )
}

const items = [
  { value: "next", title: "Next.js" },
  { value: "vite", title: "Vite" },
]
