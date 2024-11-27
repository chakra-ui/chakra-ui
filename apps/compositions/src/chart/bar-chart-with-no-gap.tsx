"use client"

import {
  ChartRoot,
  ChartTooltipContent,
  useChartConfig,
} from "compositions/ui/chart"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from "recharts"

export const BarChartWithNoGap = () => {
  const chart = useChartConfig({
    data: [
      { sales: 63000, month: "June" },
      { sales: 72000, month: "July" },
      { sales: 85000, month: "August" },
      { sales: 79000, month: "September" },
      { sales: 90000, month: "October" },
      { sales: 95000, month: "November" },
      { sales: 88000, month: "December" },
    ],
    series: [{ dataKey: "sales", color: "orange.solid" }],
  })

  return (
    <ChartRoot maxW="sm">
      <BarChart barCategoryGap="0" data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chart.key("month")}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip
          cursor={{ fill: chart.color("bg.muted") }}
          animationDuration={100}
          content={<ChartTooltipContent chart={chart} />}
        />
        {chart.series.map((item) => (
          <Bar
            isAnimationActive={false}
            key={item.dataKey}
            dataKey={chart.key(item.dataKey)}
            fill={chart.color(item.color)}
            stroke={chart.color("bg")}
          />
        ))}
      </BarChart>
    </ChartRoot>
  )
}
