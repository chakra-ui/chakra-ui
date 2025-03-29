"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

export const LineChartValueFormatter = () => {
  const chart = useChart({
    data: [
      { revenue: 10000, month: "January" },
      { revenue: 95000, month: "February" },
      { revenue: 87000, month: "March" },
      { revenue: 88000, month: "May" },
      { revenue: 65000, month: "June" },
      { revenue: 90000, month: "August" },
    ],
    series: [{ name: "revenue", color: "teal.solid" }],
  })

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
          tickFormatter={chart.formatNumber({
            style: "currency",
            currency: "USD",
            notation: "compact",
          })}
        />
        <Tooltip
          animationDuration={100}
          cursor={false}
          content={<Chart.Tooltip />}
        />
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
