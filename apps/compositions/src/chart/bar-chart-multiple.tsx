"use client"

import {
  ChartLegendContent,
  ChartRoot,
  ChartTooltipContent,
  useChartConfig,
} from "compositions/ui/chart"
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
  const chart = useChartConfig({
    data: [
      { type: "mobile", poor: 40, fair: 100, good: 265, excellent: 70 },
      { type: "marketing", poor: 15, fair: 40, good: 120, excellent: 90 },
      { type: "social", poor: 70, fair: 135, good: 290, excellent: 180 },
      { type: "ecommerce", poor: 75, fair: 155, good: 75, excellent: 325 },
    ],
    series: [
      { dataKey: "poor", color: "red.solid" },
      { dataKey: "fair", color: "orange.solid" },
      { dataKey: "good", color: "yellow.solid" },
      { dataKey: "excellent", color: "green.solid" },
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
            key={item.dataKey}
            dataKey={chart.key(item.dataKey)}
            fill={chart.color(item.color)}
          />
        ))}
      </BarChart>
    </ChartRoot>
  )
}
