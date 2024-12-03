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

export const BarListWithTooltip = () => {
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
    series: [{ name: "name", color: "teal.subtle", label: "Search Engine" }],
  })

  return (
    <Box maxW="sm">
      <BarListRoot>
        <BarListContent>
          <BarListLabel title="Search Engine" flex="1">
            <BarList chart={chart} showTooltip />
          </BarListLabel>
          <BarListLabel title="Downloads" titleAlignment="end">
            <BarListValue chart={chart} />
          </BarListLabel>
        </BarListContent>
      </BarListRoot>
    </Box>
  )
}
