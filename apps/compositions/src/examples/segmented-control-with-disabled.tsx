import { SegmentGroup } from "@sh3yk0-ui/react"

export const SegmentedControlWithDisabled = () => {
  return (
    <SegmentGroup.Root disabled defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["React", "Vue", "Solid"]} />
    </SegmentGroup.Root>
  )
}
