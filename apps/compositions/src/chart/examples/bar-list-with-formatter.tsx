"use client"

import { useChartState } from "compositions/chart/use-chart-state"
import type { BarListData } from "../bar-list"
import { BarList, BarListContent, BarListRoot, BarListValue } from "../bar-list"

export const BarListWithFormatter = () => {
  const chart = useChartState<BarListData>({
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
    <BarListRoot chart={chart} maxW="sm">
      <BarListContent>
        <BarList />
        <BarListValue
          valueFormatter={(value) => `${value} (${getPercent(value)}%)`}
        />
      </BarListContent>
    </BarListRoot>
  )
}
