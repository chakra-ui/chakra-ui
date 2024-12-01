"use client"

import {
  ChartRoot,
  ChartTooltipContent,
  useChartConfig,
} from "compositions/ui/chart"
import { Cell, LabelList, Pie, PieChart, Tooltip } from "recharts"

export const PieChartWithLabelList = () => {
  const chart = useChartConfig({
    data: [
      { name: "windows", value: 400, color: "blue.solid" },
      { name: "mac", value: 300, color: "orange.solid" },
      { name: "linux", value: 300, color: "pink.solid" },
      { name: "other", value: 200, color: "green.solid" },
    ],
  })

  return (
    <ChartRoot aspectRatio="square" maxH="sm" mx="auto">
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
          outerRadius={100}
          innerRadius={0}
        >
          <LabelList
            dataKey="name"
            position="inside"
            fill="white"
            stroke="none"
          />
          {chart.data.map((item) => {
            return <Cell key={item.name} fill={chart.color(item.color)} />
          })}
        </Pie>
      </PieChart>
    </ChartRoot>
  )
}
