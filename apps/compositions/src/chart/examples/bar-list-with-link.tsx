"use client"

import { Box } from "@chakra-ui/react"
import { useChartConfig } from "compositions/chart/chart"
import { BarList, BarListContent, BarListRoot, BarListValue } from "../bar-list"

export const BarListWithLink = () => {
  const chart = useChartConfig({
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
    <Box maxW="sm">
      <BarListRoot>
        <BarListContent>
          <BarList
            chart={chart}
            label={({ payload }) => <a href={payload.href}>{payload.name}</a>}
          />
          <BarListValue chart={chart} />
        </BarListContent>
      </BarListRoot>
    </Box>
  )
}
