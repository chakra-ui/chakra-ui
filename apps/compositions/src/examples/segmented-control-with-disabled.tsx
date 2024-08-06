import { SegmentedControl } from "compositions/ui/segmented-control"

export const SegmentedControlWithDisabled = () => {
  return (
    <SegmentedControl
      disabled
      defaultValue="React"
      items={["React", "Vue", "Solid"]}
    />
  )
}
