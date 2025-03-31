"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

export const LineChartStartEndTick = () => {
  const chart = useChart({
    data: [
      { sale: 10, month: "January" },
      { sale: 95, month: "February" },
      { sale: 87, month: "March" },
      { sale: 88, month: "May" },
      { sale: 65, month: "June" },
      { sale: 90, month: "August" },
    ],
    series: [{ name: "sale", color: "teal.solid" }],
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
          ticks={[chart.data[0].month, chart.data[chart.data.length - 1].month]}
          label={{
            value: "[January - August] Customers",
            position: "bottom",
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          stroke={chart.color("border")}
        />
        {chart.series.map((item) => (
          <Line
            type="natural"
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
