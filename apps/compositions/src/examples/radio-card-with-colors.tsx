import { For, HStack, Stack } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import {
  RadioCardItem,
  RadioCardItemText,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"

const items = [
  { value: "next", title: "Next.js" },
  { value: "vite", title: "Vite" },
]

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
            <HStack mt="2" align="stretch" width="full">
              {items.map((item) => (
                <RadioCardItem key={item.value} value={item.value} flex="1">
                  <RadioCardItemText flex="1" fontWeight="medium">
                    {item.title}
                  </RadioCardItemText>
                </RadioCardItem>
              ))}
            </HStack>
          </RadioCardRoot>
        )}
      </For>
    </Stack>
  )
}
