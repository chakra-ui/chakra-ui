"use client"

import { BarSegment, useChart } from "@chakra-ui/charts"

export const BarSegmentWithTooltip = () => {
  const chart = useChart({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Google", value: 500000, color: "teal.solid" },
      { name: "Direct", value: 100000, color: "blue.solid" },
      { name: "Bing", value: 200000, color: "orange.solid" },
      { name: "Yandex", value: 100000, color: "purple.solid" },
    ],
  })

  return (
    <BarSegment.Root chart={chart}>
      <BarSegment.Content>
        <BarSegment.Bar tooltip />
      </BarSegment.Content>
      <BarSegment.Legend showPercent />
    </BarSegment.Root>
  )
}
