import { SegmentGroup } from "@chakra-ui/react"

export const SegmentedControlVertical = () => {
  return (
    <SegmentGroup.Root defaultValue="React" orientation="vertical">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["React", "Vue", "Solid"]} />
    </SegmentGroup.Root>
  )
}
