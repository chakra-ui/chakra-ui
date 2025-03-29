"use client"

import { BarList, type BarListData, useChart } from "@chakra-ui/charts"

export const BarListWithFormatter = () => {
  const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Created", value: 120 },
      { name: "Initial Contact", value: 90 },
      { name: "Booked Demo", value: 45 },
      { name: "Closed", value: 10 },
    ],
    series: [{ name: "name", color: "pink.subtle" }],
  })

  const getPercent = (value: number) =>
    chart.getValuePercent("value", value).toFixed(0)

  return (
    <BarList.Root chart={chart}>
      <BarList.Content>
        <BarList.Bar />
        <BarList.Value
          valueFormatter={(value) => `${value} (${getPercent(value)}%)`}
        />
      </BarList.Content>
    </BarList.Root>
  )
}
