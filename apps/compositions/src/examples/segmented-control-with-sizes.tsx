import { For, SegmentGroup, Stack, Text, VStack } from "@chakra-ui/react"

export const SegmentedControlWithSizes = () => {
  return (
    <Stack gap="5" align="flex-start">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <VStack key={size} align="flex-start">
            <SegmentGroup.Root size={size} defaultValue="React">
              <SegmentGroup.Indicator />
              <SegmentGroup.Items items={["React", "Vue", "Solid"]} />
            </SegmentGroup.Root>
            <Text>size = {size}</Text>
          </VStack>
        )}
      </For>
    </Stack>
  )
}
