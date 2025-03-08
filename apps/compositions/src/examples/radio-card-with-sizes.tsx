import { For, HStack, RadioCard, Stack } from "@chakra-ui/react"

export const RadioCardWithSizes = () => {
  return (
    <Stack gap="8">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <RadioCard.Root key={size} size={size} defaultValue="next">
            <RadioCard.Label>size = ({size})</RadioCard.Label>
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
