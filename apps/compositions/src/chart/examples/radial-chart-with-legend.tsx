"use client"

import {
  ChartLegendContent,
  ChartRoot,
  ChartTooltipContent,
  useChartConfig,
} from "compositions/chart/chart"
import { Cell, Legend, RadialBar, RadialBarChart, Tooltip } from "recharts"

export const RadialChartWithLegend = () => {
  const chart = useChartConfig({
    data: [
      { value: 165, month: "January", color: "teal.solid" },
      { value: 190, month: "February", color: "purple.solid" },
      { value: 195, month: "March", color: "blue.solid" },
      { value: 182, month: "May", color: "teal.solid" },
    ],
  })

  return (
    <ChartRoot maxW="sm">
      <RadialBarChart data={chart.data} barSize={20}>
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent nameKey="month" chart={chart} />}
        />
        <Legend
          content={<ChartLegendContent nameKey="month" chart={chart} />}
        />
        <RadialBar
          isAnimationActive={false}
          dataKey={chart.key("value")}
          background
          startAngle={90}
          endAngle={-270}
        >
          {chart.data.map(({ color }) => (
            <Cell key={color} fill={chart.color(color)} stroke="none" />
          ))}
        </RadialBar>
      </RadialBarChart>
    </ChartRoot>
  )
}
