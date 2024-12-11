"use client"

import {
  ChartLegendContent,
  ChartRoot,
  ChartTooltipContent,
} from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export const BarChartHorizontal = () => {
  const chart = useChartState({
    data: [
      { windows: 186, mac: 80, linux: 120, month: "January" },
      { windows: 165, mac: 95, linux: 110, month: "February" },
      { windows: 190, mac: 87, linux: 125, month: "March" },
      { windows: 180, mac: 86, linux: 124, month: "October" },
      { windows: 185, mac: 91, linux: 126, month: "November" },
    ],
    series: [
      { name: "windows", color: "teal.solid", stackId: "a" },
      { name: "mac", color: "purple.solid", stackId: "a" },
      { name: "linux", color: "blue.solid", stackId: "a" },
    ],
  })

  return (
    <ChartRoot maxW="sm">
      <BarChart layout="vertical" data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis type="number" axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey={chart.key("month")}
          orientation="left"
          stroke={chart.color("border.emphasized")}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip
          cursor={{ fill: chart.color("bg.muted") }}
          animationDuration={100}
          content={<ChartTooltipContent chart={chart} />}
        />
        <Legend content={<ChartLegendContent chart={chart} />} />
        {chart.series.map((item) => (
          <Bar
            isAnimationActive={false}
            key={item.name}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            stroke={chart.color(item.color)}
            stackId={item.stackId}
          />
        ))}
      </BarChart>
    </ChartRoot>
  )
}
