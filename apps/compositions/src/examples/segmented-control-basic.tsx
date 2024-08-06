import { SegmentedControl } from "compositions/ui/segmented-control"

export const SegmentedControlBasic = () => {
  return (
    <SegmentedControl defaultValue="React" items={["React", "Vue", "Solid"]} />
  )
}
