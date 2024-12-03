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

export const BarListWithMultiValue = () => {
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

  const getPercent = (value: number) =>
    chart.getValuePercent("value", value).toFixed(2)

  return (
    <BarListRoot chart={chart} maxW="md">
      <BarListContent>
        <BarListLabel title="Search Engine" flex="1">
          <BarList />
        </BarListLabel>
        <BarListLabel title="Downloads" minW="16" titleAlignment="end">
          <BarListValue />
        </BarListLabel>
        <BarListLabel title="%" minW="16" titleAlignment="end">
          <BarListValue valueFormatter={(value) => `${getPercent(value)}%`} />
        </BarListLabel>
      </BarListContent>
    </BarListRoot>
  )
}
