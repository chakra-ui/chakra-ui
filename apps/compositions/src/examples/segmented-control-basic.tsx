import { SegmentGroup } from "@sh3yk0-ui/react"

export const SegmentedControlBasic = () => {
  return (
    <SegmentGroup.Root defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["React", "Vue", "Solid"]} />
    </SegmentGroup.Root>
  )
}
