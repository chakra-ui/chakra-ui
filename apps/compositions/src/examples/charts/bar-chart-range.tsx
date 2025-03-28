"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { HStack, Span } from "@chakra-ui/react"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

export const BarChartRange = () => {
  const chart = useChart({
    data: [
      { name: "UK", low: 10, high: 20 },
      { name: "US", low: 15, high: 25 },
      { name: "EU", low: 5, high: 18 },
      { name: "JP", low: 12, high: 30 },
    ],
  })

  return (
    <Chart.Root maxW="xs" chart={chart}>
      <BarChart
        barSize={20}
        data={chart.data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey={chart.key("name")} axisLine={false} tickLine={false} />
        <YAxis domain={[0, "dataMax + 5"]} axisLine={false} tickLine={false} />
        <Tooltip
          content={
            <Chart.Tooltip
              render={({ value, name, payload }) => (
                <HStack fontWeight="medium">
                  <pre>{JSON.stringify(payload, null, 2)}</pre>
                  <Span>{name}</Span>
                  <Span>{value}</Span>
                </HStack>
              )}
            />
          }
        />
        <Bar
          tooltipType="none"
          dataKey={chart.key("low")}
          stackId="a" // Stack bars to create the range effect
          fill="transparent" // Make the lower part transparent
        />
        <Bar
          // Create the range
          dataKey={(entry) => entry.high - entry.low}
          stackId="a"
          fill={chart.color("teal.solid")}
          stroke={chart.color("teal.solid")}
        />
      </BarChart>
    </Chart.Root>
  )
}
