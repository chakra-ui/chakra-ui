"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

export const BarChartWithFormatter = () => {
  const chart = useChart({
    data: [
      { sales: 63000, month: "June" },
      { sales: 72000, month: "July" },
      { sales: 85000, month: "August" },
      { sales: 79000, month: "September" },
      { sales: 90000, month: "October" },
      { sales: 95000, month: "November" },
      { sales: 88000, month: "December" },
    ],
    series: [{ name: "sales", color: "teal.solid" }],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chart.key("month")}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={chart.formatNumber({
            style: "currency",
            currency: "USD",
            notation: "compact",
          })}
        />
        <Tooltip
          cursor={{ fill: chart.color("bg.muted") }}
          animationDuration={0}
          content={<Chart.Tooltip />}
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
