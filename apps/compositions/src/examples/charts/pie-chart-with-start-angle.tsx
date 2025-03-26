"use client"

import { Chart, useChartState } from "@chakra-ui/charts"
import { Cell, Pie, PieChart, Tooltip } from "recharts"

export const PieChartWithStartAngle = () => {
  const chart = useChartState({
    data: [
      { name: "typescript", value: 400, color: "blue.solid" },
      { name: "javascript", value: 120, color: "orange.solid" },
      { name: "python", value: 300, color: "pink.solid" },
      { name: "go", value: 200, color: "green.solid" },
      { name: "rust", value: 278, color: "purple.solid" },
      { name: "other", value: 189, color: "teal.solid" },
    ],
  })

  return (
    <Chart.Root aspectRatio="square" w="sm" chart={chart}>
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
          startAngle={180}
          endAngle={0}
          label
        >
          {chart.data.map((item) => {
            return <Cell key={item.name} fill={chart.color(item.color)} />
          })}
        </Pie>
      </PieChart>
    </Chart.Root>
  )
}
