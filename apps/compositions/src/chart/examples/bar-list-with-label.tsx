"use client"

import { useChartState } from "compositions/chart/use-chart-state"
import type { BarListData } from "../bar-list"
import {
  BarList,
  BarListContent,
  BarListLabel,
  BarListRoot,
  BarListValue,
} from "../bar-list"

export const BarListWithLabel = () => {
  const chart = useChartState<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Google", value: 1200000 },
      { name: "Direct", value: 100000 },
      { name: "Bing", value: 200000 },
      { name: "Yahoo", value: 20000 },
      { name: "ChatGPT", value: 1345000 },
      { name: "Github", value: 100000 },
      { name: "Yandex", value: 100000 },
    ],
    series: [{ name: "name", color: "teal.subtle" }],
  })

  return (
    <BarListRoot chart={chart} maxW="sm">
      <BarListContent>
        <BarListLabel title="Search Engine" flex="1">
          <BarList />
        </BarListLabel>
        <BarListLabel title="Downloads" titleAlignment="end">
          <BarListValue />
        </BarListLabel>
      </BarListContent>
    </BarListRoot>
  )
}
