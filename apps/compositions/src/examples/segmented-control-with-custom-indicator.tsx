import { SegmentGroup } from "@chakra-ui/react"

export const SegmentedControlWithCustomIndicator = () => {
  return (
    <SegmentGroup.Root
      defaultValue="react"
      css={{
        "--segment-indicator-bg": "colors.teal.500",
        "--segment-indicator-shadow": "shadows.md",
      }}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items
        items={[
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
          { value: "solid", label: "Solid" },
        ]}
      />
    </SegmentGroup.Root>
  )
}
