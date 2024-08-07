import { For, HStack, Stack } from "@chakra-ui/react"
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

export const RadioCardWithSizes = () => {
  return (
    <Stack gap="8">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <RadioCardRoot key={size} size={size} defaultValue="next">
            <RadioCardLabel>size = ({size})</RadioCardLabel>
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
