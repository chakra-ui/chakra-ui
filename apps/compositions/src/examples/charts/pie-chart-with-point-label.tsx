"use client"

import { Chart, useChartState } from "@chakra-ui/charts"
import { Cell, Pie, PieChart, Tooltip } from "recharts"

export const PieChartWithPointLabel = () => {
  const chart = useChartState({
    data: [
      { name: "windows", value: 400, color: "blue.solid" },
      { name: "mac", value: 300, color: "orange.solid" },
      { name: "linux", value: 300, color: "pink.solid" },
      { name: "other", value: 200, color: "green.solid" },
    ],
  })

  return (
    <Chart.Root aspectRatio="square" maxH="sm" chart={chart}>
      <PieChart>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip hideLabel />}
        />
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey="name"
          labelLine={{ stroke: chart.color("border.emphasized") }}
          label={{
            fill: chart.color("fg.muted"),
          }}
        >
          {chart.data.map((item) => {
            return <Cell key={item.name} fill={chart.color(item.color)} />
          })}
        </Pie>
      </PieChart>
    </Chart.Root>
  )
}
