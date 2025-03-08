import { SegmentGroup } from "@chakra-ui/react"

export const SegmentedControlWithDisabled = () => {
  return (
    <SegmentGroup.Root disabled defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["React", "Vue", "Solid"]} />
    </SegmentGroup.Root>
  )
}
