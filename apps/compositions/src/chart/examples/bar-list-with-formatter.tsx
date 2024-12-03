"use client"

import { Box } from "@chakra-ui/react"
import { useChartConfig } from "compositions/chart/chart"
import { BarList, BarListContent, BarListRoot, BarListValue } from "../bar-list"

export const BarListWithFormatter = () => {
  const chart = useChartConfig({
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
    <Box maxW="sm">
      <BarListRoot>
        <BarListContent>
          <BarList chart={chart} />
          <BarListValue
            chart={chart}
            valueFormatter={(value) => `${value} (${getPercent(value)}%)`}
          />
        </BarListContent>
      </BarListRoot>
    </Box>
  )
}
