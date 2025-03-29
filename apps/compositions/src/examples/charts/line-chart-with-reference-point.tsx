"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export const LineChartWithReferencePoint = () => {
  const chart = useChart({
    data: [
      { thisYear: 10, lastYear: 4, month: "January" },
      { thisYear: 95, lastYear: 50, month: "February" },
      { thisYear: 87, lastYear: 59, month: "March" },
      { thisYear: 88, lastYear: 60, month: "May" },
      { thisYear: 65, lastYear: 50, month: "June" },
      { thisYear: 90, lastYear: 50, month: "August" },
      { thisYear: null, lastYear: 89, month: "October" },
      { thisYear: null, lastYear: 120, month: "November" },
      { thisYear: null, lastYear: 80, month: "December" },
    ],
    series: [
      { name: "thisYear", color: "teal.solid", label: "This Year" },
      { name: "lastYear", color: "gray.emphasized", label: "Last Year" },
    ],
  })

  const latest = chart.data.findLast((item) => item.thisYear !== null)

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <LineChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border")} vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={chart.key("month")}
          tickFormatter={(value) => value.slice(0, 3)}
          stroke={chart.color("border")}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          stroke={chart.color("border")}
        />
        <Tooltip
          animationDuration={100}
          cursor={false}
          content={<Chart.Tooltip />}
        />
        <ReferenceDot
          x={latest?.month}
          y={latest?.thisYear}
          r={6}
          fill={chart.color("teal.solid")}
          stroke={chart.color("bg")}
        />
        <ReferenceLine
          y={110}
          stroke={chart.color("purple.fg")}
          strokeDasharray="5 5"
          label={{
            value: "Target",
            position: "top",
            fill: chart.color("purple.fg"),
            offset: 10,
          }}
        />
        <Legend content={<Chart.Legend />} />
        {chart.series.map((item) => (
          <Line
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </Chart.Root>
  )
}
