import { For, HStack, RadioGroup, Stack } from "@chakra-ui/react"

export const RadioWithVariants = () => {
  return (
    <Stack gap="4">
      <For each={["solid", "outline", "subtle"]}>
        {(variant) => (
          <RadioGroup.Root
            key={variant}
            variant={variant}
            defaultValue="react"
            colorPalette="teal"
          >
            <HStack gap="4">
              <RadioGroup.Item value="react" minW="120px">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>React ({variant})</RadioGroup.ItemText>
              </RadioGroup.Item>

              <RadioGroup.Item value="vue">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Vue ({variant})</RadioGroup.ItemText>
              </RadioGroup.Item>
            </HStack>
          </RadioGroup.Root>
        )}
      </For>
    </Stack>
  )
}
