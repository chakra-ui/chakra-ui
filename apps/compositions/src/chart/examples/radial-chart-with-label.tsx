"use client"

import { ChartRoot } from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import { Cell, RadialBar, RadialBarChart } from "recharts"

export const RadialChartWithLabel = () => {
  const chart = useChartState({
    data: [
      { value: 165, month: "January", color: "teal.solid" },
      { value: 190, month: "February", color: "purple.solid" },
      { value: 195, month: "March", color: "blue.solid" },
      { value: 182, month: "May", color: "teal.solid" },
    ],
  })

  return (
    <ChartRoot maxW="sm">
      <RadialBarChart data={chart.data} innerRadius={30} outerRadius={100}>
        <RadialBar
          isAnimationActive={false}
          dataKey={chart.key("value")}
          background
          startAngle={90}
          endAngle={-270}
          label={{
            position: "insideStart",
            fill: "white",
            fontSize: "12px",
          }}
        >
          {chart.data.map(({ color }) => (
            <Cell key={color} fill={chart.color(color)} stroke="none" />
          ))}
        </RadialBar>
      </RadialBarChart>
    </ChartRoot>
  )
}
