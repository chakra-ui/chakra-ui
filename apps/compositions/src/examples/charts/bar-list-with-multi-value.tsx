"use client"

import { BarList, type BarListData, useChart } from "@chakra-ui/charts"

export const BarListWithMultiValue = () => {
  const chart = useChart<BarListData>({
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
    <BarList.Root chart={chart}>
      <BarList.Content>
        <BarList.Label title="Search Engine" flex="1">
          <BarList.Bar />
        </BarList.Label>
        <BarList.Label title="Downloads" minW="16" titleAlignment="end">
          <BarList.Value />
        </BarList.Label>
        <BarList.Label title="%" minW="16" titleAlignment="end">
          <BarList.Value valueFormatter={(value) => `${getPercent(value)}%`} />
        </BarList.Label>
      </BarList.Content>
    </BarList.Root>
  )
}
