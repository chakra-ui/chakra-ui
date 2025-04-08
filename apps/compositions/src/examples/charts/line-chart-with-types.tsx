"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { For, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

const curveTypes = [
  "linear",
  "bump",
  "basis",
  "step",
  "stepBefore",
  "stepAfter",
  "natural",
  "monotone",
] as const

export const LineChartWithTypes = () => {
  const chart = useChart({
    data: [
      { windows: 186, mac: 80, linux: 120, month: "January" },
      { windows: 165, mac: 95, linux: 110, month: "February" },
      { windows: 190, mac: 87, linux: 125, month: "March" },
      { windows: 195, mac: 88, linux: 130, month: "May" },
      { windows: 182, mac: 98, linux: 122, month: "June" },
      { windows: 175, mac: 90, linux: 115, month: "August" },
      { windows: 180, mac: 86, linux: 124, month: "October" },
      { windows: 185, mac: 91, linux: 126, month: "November" },
    ],
    series: [
      { name: "windows", color: "teal.solid" },
      { name: "mac", color: "orange.solid" },
      { name: "linux", color: "blue.solid" },
    ],
  })

  return (
    <SimpleGrid gap="10" minChildWidth="400px">
      <For each={curveTypes}>
        {(type) => (
          <Stack key={type.toString()} gap="4">
            <Text textStyle="sm" fontWeight="semibold" ms="8">
              {`<Line type="${type}" />`}
            </Text>
            <Chart.Root maxH="sm" chart={chart}>
              <LineChart accessibilityLayer data={chart.data}>
                <CartesianGrid
                  stroke={chart.color("border")}
                  vertical={false}
                />
                <XAxis
                  dataKey={chart.key("month")}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis tickLine={false} axisLine={false} />
                {chart.series.map((item) => (
                  <Line
                    type={type}
                    key={item.name}
                    isAnimationActive={false}
                    dataKey={chart.key(item.name)}
                    stroke={chart.color(item.color)}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </Chart.Root>
          </Stack>
        )}
      </For>
    </SimpleGrid>
  )
}
