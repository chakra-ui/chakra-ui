"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export const AreaChartWithGradient = () => {
  const chart = useChart({
    data: [
      { windows: 186, mac: 80, linux: 120, month: "January" },
      { windows: 165, mac: 95, linux: 110, month: "February" },
      { windows: 190, mac: 87, linux: 125, month: "March" },
      { windows: 195, mac: 88, linux: 130, month: "May" },
      { windows: 182, mac: 98, linux: 122, month: "June" },
      { windows: 175, mac: 90, linux: 115, month: "August" },
      { windows: 180, mac: 86, linux: 124, month: "October" },
      { windows: 185, mac: 91, linux: 126, month: "November" },
    ],
    series: [
      { name: "windows", color: "teal.solid" },
      { name: "mac", color: "purple.solid" },
      { name: "linux", color: "blue.solid" },
    ],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <AreaChart data={chart.data}>
        <CartesianGrid
          stroke={chart.color("border")}
          vertical={false}
          strokeDasharray="3 3"
        />
        <XAxis
          dataKey={chart.key("month")}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip />}
        />
        <Legend content={<Chart.Legend />} />

        {chart.series.map((item) => (
          <defs key={item.name}>
            <Chart.Gradient
              id={`${item.name}-gradient`}
              stops={[
                { offset: "0%", color: item.color, opacity: 0.3 },
                { offset: "100%", color: item.color, opacity: 0.05 },
              ]}
            />
          </defs>
        ))}

        {chart.series.map((item) => (
          <Area
            key={item.name}
            type="natural"
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={`url(#${item.name}-gradient)`}
            stroke={chart.color(item.color)}
            strokeWidth={2}
            stackId="a"
          />
        ))}
      </AreaChart>
    </Chart.Root>
  )
}
