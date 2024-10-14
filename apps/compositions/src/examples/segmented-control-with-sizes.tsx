import { For, Stack, Text, VStack } from "@chakra-ui/react"
import { SegmentedControl } from "compositions/ui/segmented-control"

export const SegmentedControlWithSizes = () => {
  return (
    <Stack gap="5" align="flex-start">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <VStack key={size} align="flex-start">
            <SegmentedControl
              size={size}
              defaultValue="React"
              items={["React", "Vue", "Solid"]}
            />
            <Text>size = {size}</Text>
          </VStack>
        )}
      </For>
    </Stack>
  )
}
