import { For, HStack, Stack } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"

export const RadioCardWithVariants = () => {
  return (
    <Stack gap="8">
      <For each={["surface", "subtle", "outline", "solid"]}>
        {(variant) => (
          <RadioCardRoot
            colorPalette="teal"
            key={variant}
            variant={variant}
            defaultValue="next"
          >
            <RadioCardLabel>variant = ({variant})</RadioCardLabel>
            <HStack align="stretch">
              {items.map((item) => (
                <RadioCardItem
                  key={item.value}
                  value={item.value}
                  label={item.title}
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
