import { For, Stack } from "@chakra-ui/react"
import { SegmentControl } from "compositions/ui/segment-control"

const items = ["React", "Vue", "Solid"]

export const SegmentControlSizes = () => {
  return (
    <Stack gap="5" align="flex-start">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <SegmentControl size={size} defaultValue="React" items={items} />
        )}
      </For>
    </Stack>
  )
}
