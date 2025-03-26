"use client"

import { BarSegment, useChartState } from "@chakra-ui/charts"

export const BarSegmentWithTooltip = () => {
  const chart = useChartState({
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
        <BarSegment.Bar showTooltip />
      </BarSegment.Content>
      <BarSegment.Legend showPercent />
    </BarSegment.Root>
  )
}
