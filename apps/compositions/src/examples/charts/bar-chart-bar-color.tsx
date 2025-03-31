"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"

export const BarChartBarColor = () => {
  const chart = useChart({
    data: [
      { allocation: 60, type: "Stock", color: "red.solid" },
      { allocation: 45, type: "Crypto", color: "blue.solid" },
      { allocation: 12, type: "ETF", color: "green.solid" },
      { allocation: 4, type: "Cash", color: "yellow.solid" },
    ],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis axisLine={false} tickLine={false} dataKey={chart.key("type")} />
        <YAxis
          axisLine={false}
          tickLine={false}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Bar isAnimationActive={false} dataKey={chart.key("allocation")}>
          {chart.data.map((item) => (
            <Cell key={item.type} fill={chart.color(item.color)} />
          ))}
        </Bar>
      </BarChart>
    </Chart.Root>
  )
}
