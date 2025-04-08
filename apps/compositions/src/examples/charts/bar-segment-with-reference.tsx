"use client"

import { BarSegment, useChart } from "@chakra-ui/charts"

export const BarSegmentWithReference = () => {
  const chart = useChart({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Google", value: 500000, color: "teal.solid" },
      { name: "Direct", value: 100000, color: "blue.solid" },
      { name: "Bing", value: 200000, color: "orange.solid" },
      { name: "Yandex", value: 80000, color: "purple.solid" },
    ],
  })

  return (
    <BarSegment.Root chart={chart}>
      <BarSegment.Content>
        <BarSegment.Value />
        <BarSegment.Bar>
          <BarSegment.Reference label="Target" value={200000} />
        </BarSegment.Bar>
        <BarSegment.Label />
      </BarSegment.Content>
    </BarSegment.Root>
  )
}
