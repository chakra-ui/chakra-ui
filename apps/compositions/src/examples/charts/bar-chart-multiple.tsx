"use client"

import { Chart, useChart } from "@chakra-ui/charts"
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
  const chart = useChart({
    data: [
      { type: "mobile", poor: 40, fair: 100, good: 200, excellent: 70 },
      { type: "marketing", poor: 15, fair: 40, good: 120, excellent: 90 },
      { type: "social", poor: 70, fair: 135, good: 220, excellent: 180 },
      { type: "ecommerce", poor: 175, fair: 155, good: 75, excellent: 95 },
    ],
    series: [
      { name: "poor", color: "blue.solid" },
      { name: "fair", color: "orange.solid" },
      { name: "good", color: "yellow.solid" },
      { name: "excellent", color: "green.solid" },
    ],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
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
          content={<Chart.Tooltip />}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="top"
          wrapperStyle={{ paddingLeft: 30 }}
          content={<Chart.Legend orientation="vertical" />}
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
    </Chart.Root>
  )
}
