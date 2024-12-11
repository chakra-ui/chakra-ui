"use client"

import { useChartState } from "compositions/chart/use-chart-state"
import type { BarListData } from "../bar-list"
import { BarList, BarListContent, BarListRoot, BarListValue } from "../bar-list"

export const BarListWithLink = () => {
  const chart = useChartState<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Created", value: 120, href: "#" },
      { name: "Initial Contact", value: 90, href: "#" },
      { name: "Booked Demo", value: 45, href: "#" },
      { name: "Closed", value: 10, href: "#" },
    ],
    series: [{ name: "name", color: "pink.subtle" }],
  })

  return (
    <BarListRoot chart={chart} maxW="sm">
      <BarListContent>
        <BarList
          label={({ payload }) => <a href={payload.href}>{payload.name}</a>}
        />
        <BarListValue />
      </BarListContent>
    </BarListRoot>
  )
}
