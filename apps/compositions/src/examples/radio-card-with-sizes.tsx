import { For, HStack, Stack } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"

export const RadioCardWithSizes = () => {
  return (
    <Stack gap="8">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <RadioCardRoot key={size} size={size} defaultValue="next">
            <RadioCardLabel>size = ({size})</RadioCardLabel>
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
