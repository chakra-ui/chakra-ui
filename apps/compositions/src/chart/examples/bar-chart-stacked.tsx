"use client"

import {
  ChartLegendContent,
  ChartRoot,
  ChartTooltipContent,
} from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis } from "recharts"

export const BarChartStacked = () => {
  const chart = useChartState({
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
      { name: "mac", color: "purple.solid" },
      { name: "linux", color: "blue.solid" },
    ],
  })

  return (
    <ChartRoot maxW="sm">
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chart.key("month")}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip
          cursor={false}
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
            stackId="a"
          />
        ))}
      </BarChart>
    </ChartRoot>
  )
}
