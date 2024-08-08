import { For, Stack } from "@chakra-ui/react"
import { SegmentedControl } from "compositions/ui/segmented-control"

export const SegmentedControlWithSizes = () => {
  return (
    <Stack gap="5" align="flex-start">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <SegmentedControl
            key={size}
            size={size}
            defaultValue="React"
            items={["React", "Vue", "Solid"]}
          />
        )}
      </For>
    </Stack>
  )
}
