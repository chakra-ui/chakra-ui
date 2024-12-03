"use client"

import { Box } from "@chakra-ui/react"
import { useChartConfig } from "compositions/chart/chart"
import { BarList, BarListContent, BarListRoot, BarListValue } from "../bar-list"

export const BarListAscending = () => {
  const chart = useChartConfig({
    sort: { by: "value", direction: "asc" },
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
    <Box maxW="sm">
      <BarListRoot>
        <BarListContent>
          <BarList chart={chart} />
          <BarListValue chart={chart} />
        </BarListContent>
      </BarListRoot>
    </Box>
  )
}
