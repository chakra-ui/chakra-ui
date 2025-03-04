import { For, HStack, RadioGroup } from "@chakra-ui/react"

export const RadioWithSizes = () => {
  return (
    <HStack gap="4">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <RadioGroup.Root size={size} key={size}>
            <RadioGroup.Item value="react">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Radio ({size})</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )}
      </For>
    </HStack>
  )
}
