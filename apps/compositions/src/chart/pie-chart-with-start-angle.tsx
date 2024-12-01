"use client"

import {
  ChartRoot,
  ChartTooltipContent,
  useChartConfig,
} from "compositions/ui/chart"
import { Cell, Pie, PieChart, Tooltip } from "recharts"

export const PieChartWithStartAngle = () => {
  const chart = useChartConfig({
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
    <ChartRoot aspectRatio="square" w="sm">
      <PieChart>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<ChartTooltipContent hideLabel chart={chart} />}
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
    </ChartRoot>
  )
}
