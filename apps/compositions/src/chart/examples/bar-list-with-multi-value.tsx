"use client"

import { Box } from "@chakra-ui/react"
import { useChartConfig } from "compositions/chart/chart"
import {
  BarList,
  BarListContent,
  BarListLabel,
  BarListRoot,
  BarListValue,
} from "../bar-list"

export const BarListWithMultiValue = () => {
  const chart = useChartConfig({
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
    <Box maxW="md">
      <BarListRoot>
        <BarListContent>
          <BarListLabel title="Search Engine" flex="1">
            <BarList chart={chart} />
          </BarListLabel>
          <BarListLabel title="Downloads" minW="16" titleAlignment="end">
            <BarListValue chart={chart} />
          </BarListLabel>
          <BarListLabel title="%" minW="16" titleAlignment="end">
            <BarListValue
              valueFormatter={(value) => `${getPercent(value)}%`}
              chart={chart}
            />
          </BarListLabel>
        </BarListContent>
      </BarListRoot>
    </Box>
  )
}
