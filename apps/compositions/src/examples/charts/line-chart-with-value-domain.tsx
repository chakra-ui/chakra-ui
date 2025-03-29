"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

export const LineChartWithValueDomain = () => {
  const chart = useChart({
    data: [
      { sales: 186, month: "January" },
      { sales: 190, month: "March" },
      { sales: 195, month: "May" },
      { sales: 175, month: "August" },
      { sales: 180, month: "October" },
    ],
    series: [{ name: "sales", color: "teal.solid" }],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <LineChart data={chart.data}>
        <CartesianGrid
          stroke={chart.color("border")}
          strokeDasharray="3 3"
          horizontal={false}
        />
        <XAxis
          dataKey={chart.key("month")}
          tickFormatter={(value) => value.slice(0, 3)}
          stroke={chart.color("border")}
        />
        <YAxis
          dataKey={chart.key("sales")}
          stroke={chart.color("border")}
          domain={[160, "dataMax + 10"]}
        />
        <Tooltip
          animationDuration={100}
          cursor={{ stroke: chart.color("border") }}
          content={<Chart.Tooltip hideLabel />}
        />
        {chart.series.map((item) => (
          <Line
            type="natural"
            key={item.name}
            connectNulls
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            fill={chart.color(item.color)}
            dot={{ strokeDasharray: "0" }}
            strokeWidth={4}
          />
        ))}
      </LineChart>
    </Chart.Root>
  )
}
