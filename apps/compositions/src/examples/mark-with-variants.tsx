import { For, Mark, Stack, Text } from "@chakra-ui/react"

export const MarkWithVariants = () => {
  return (
    <Stack gap="6">
      <For each={["subtle", "solid", "text", "plain"]}>
        {(variant) => (
          <Text key={variant}>
            The <Mark variant={variant}>design system</Mark> is a collection of
            UI elements
          </Text>
        )}
      </For>
    </Stack>
  )
}
