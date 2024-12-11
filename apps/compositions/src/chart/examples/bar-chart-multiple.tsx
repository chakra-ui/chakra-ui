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

export const BarChartMultiple = () => {
  const chart = useChartState({
    data: [
      { type: "mobile", poor: 40, fair: 100, good: 265, excellent: 70 },
      { type: "marketing", poor: 15, fair: 40, good: 120, excellent: 90 },
      { type: "social", poor: 70, fair: 135, good: 290, excellent: 180 },
      { type: "ecommerce", poor: 75, fair: 155, good: 75, excellent: 325 },
    ],
    series: [
      { name: "poor", color: "red.solid" },
      { name: "fair", color: "orange.solid" },
      { name: "good", color: "yellow.solid" },
      { name: "excellent", color: "green.solid" },
    ],
  })

  return (
    <ChartRoot maxW="lg">
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis
          tickLine={false}
          dataKey={chart.key("type")}
          stroke={chart.color("border")}
        />
        <YAxis tickLine={false} stroke={chart.color("border")} />
        <Tooltip
          cursor={{ fill: chart.color("bg.muted") }}
          animationDuration={100}
          content={<ChartTooltipContent chart={chart} />}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="top"
          wrapperStyle={{ paddingLeft: 30 }}
          content={<ChartLegendContent orientation="vertical" chart={chart} />}
        />
        {chart.series.map((item) => (
          <Bar
            isAnimationActive={false}
            key={item.name}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
          />
        ))}
      </BarChart>
    </ChartRoot>
  )
}
