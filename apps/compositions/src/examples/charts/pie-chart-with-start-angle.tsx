"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart, Tooltip } from "recharts"

export const PieChartWithStartAngle = () => {
  const chart = useChart({
    data: [
      { name: "typescript", value: 400, color: "blue.solid" },
      { name: "javascript", value: 120, color: "orange.solid" },
      { name: "python", value: 300, color: "pink.solid" },
      { name: "rust", value: 278, color: "purple.solid" },
    ],
  })

  return (
    <Chart.Root boxSize="320px" mx="auto" chart={chart}>
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
        >
          {chart.data.map((item) => (
            <Cell key={item.name} fill={chart.color(item.color)} />
          ))}
        </Pie>
      </PieChart>
    </Chart.Root>
  )
}
