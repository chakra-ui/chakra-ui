import { SegmentedControl } from "compositions/ui/segmented-control"

export const SegmentedControlWithDisabledItem = () => {
  return (
    <SegmentedControl
      defaultValue="React"
      items={[
        { label: "React", value: "React" },
        { label: "Vue", value: "Vue", disabled: true },
        { label: "Solid", value: "Solid" },
      ]}
    />
  )
}
