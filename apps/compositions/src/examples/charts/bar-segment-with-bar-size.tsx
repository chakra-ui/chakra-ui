"use client"

import { BarSegment, useChart } from "@chakra-ui/charts"

export const BarSegmentWithBarSize = () => {
  const chart = useChart({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Ruby", value: 450000, color: "green.solid" },
      { name: "CSS", value: 150000, color: "yellow.solid" },
      { name: "JavaScript", value: 300000, color: "orange.solid" },
      { name: "HTML", value: 175000, color: "purple.solid" },
      { name: "React", value: 225000, color: "blue.solid" },
    ],
  })

  return (
    <BarSegment.Root chart={chart} barSize="3">
      <BarSegment.Content>
        <BarSegment.Bar gap="0.5" />
      </BarSegment.Content>
      <BarSegment.Legend gap="2" textStyle="xs" showPercent />
    </BarSegment.Root>
  )
}
