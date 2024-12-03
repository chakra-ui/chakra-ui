"use client"

import { ChartRoot, ChartTooltipContent } from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import { Cell, Pie, PieChart, Tooltip } from "recharts"

export const DonutChartWithPointLabel = () => {
  const chart = useChartState({
    data: [
      { name: "windows", value: 400, color: "blue.solid" },
      { name: "mac", value: 300, color: "orange.solid" },
      { name: "linux", value: 300, color: "pink.solid" },
      { name: "other", value: 200, color: "green.solid" },
    ],
  })

  return (
    <ChartRoot aspectRatio="square" maxH="sm">
      <PieChart>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<ChartTooltipContent hideLabel chart={chart} />}
        />
        <Pie
          innerRadius={80}
          outerRadius={100}
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey="name"
          labelLine={{ strokeWidth: 1 }}
          label={{
            fill: chart.color("fg.muted"),
          }}
        >
          {chart.data.map((item) => {
            return (
              <Cell
                key={item.name}
                strokeWidth={2}
                fill={chart.color(item.color)}
              />
            )
          })}
        </Pie>
      </PieChart>
    </ChartRoot>
  )
}
