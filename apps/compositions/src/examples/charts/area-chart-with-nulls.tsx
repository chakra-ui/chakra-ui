"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Box, For, Heading, SimpleGrid } from "@chakra-ui/react"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts"

export const AreaChartWithNulls = () => {
  const chart = useChart({
    data: [
      { sales: 186, month: "January" },
      { sales: null, month: "February" },
      { sales: 190, month: "March" },
      { sales: 195, month: "May" },
      { sales: null, month: "June" },
      { sales: 175, month: "August" },
      { sales: 180, month: "October" },
      { sales: 185, month: "November" },
      { sales: 300, month: "December" },
    ],
    series: [{ name: "sales", color: "teal.solid" }],
  })

  return (
    <SimpleGrid gap="10" minChildWidth="400px">
      <For each={["false", "true"]}>
        {(connectNulls) => (
          <Box key={connectNulls.toString()}>
            <Heading size="md" mb="4">
              {`<Area connectNulls={${connectNulls.toString()}} />`}
            </Heading>
            <Chart.Root maxH="sm" chart={chart}>
              <AreaChart data={chart.data}>
                <CartesianGrid
                  stroke={chart.color("border.muted")}
                  vertical={false}
                />
                <XAxis
                  axisLine={false}
                  tickLine={false}
                  dataKey={chart.key("month")}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <Tooltip
                  cursor={false}
                  animationDuration={100}
                  content={<Chart.Tooltip />}
                />
                {chart.series.map((item) => (
                  <Area
                    key={item.name}
                    isAnimationActive={false}
                    dataKey={chart.key(item.name)}
                    fill={chart.color(item.color)}
                    fillOpacity={0.2}
                    connectNulls={connectNulls === "true"}
                    stroke={chart.color(item.color)}
                    stackId="a"
                  />
                ))}
              </AreaChart>
            </Chart.Root>
          </Box>
        )}
      </For>
    </SimpleGrid>
  )
}
