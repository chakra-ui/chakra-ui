"use client"

import {
  ChartGradient,
  ChartLegendContent,
  ChartRoot,
  ChartTooltipContent,
  useChartConfig,
} from "compositions/ui/chart"
import * as React from "react"
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
  const chart = useChartConfig({
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
      { dataKey: "windows", color: "teal.solid" },
      { dataKey: "mac", color: "purple.solid" },
      { dataKey: "linux", color: "blue.solid" },
    ],
  })

  return (
    <ChartRoot maxW="400px">
      <AreaChart accessibilityLayer data={chart.data}>
        <CartesianGrid stroke={chart.color("border")} vertical={false} />
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
          content={<ChartTooltipContent chart={chart} />}
        />
        <Legend content={<ChartLegendContent chart={chart} />} />
        {chart.series.map((item) => (
          <React.Fragment key={item.dataKey}>
            <defs>
              <ChartGradient
                id={`${item.dataKey}-gradient`}
                stops={[
                  { offset: "0%", color: item.color, opacity: 1 },
                  { offset: "100%", color: item.color, opacity: 0.01 },
                ]}
              />
            </defs>
            <Area
              type="natural"
              isAnimationActive={false}
              dataKey={chart.key(item.dataKey)}
              fill={`url(#${item.dataKey}-gradient)`}
              stroke={chart.color(item.color)}
              strokeWidth={2}
              stackId="a"
            />
          </React.Fragment>
        ))}
      </AreaChart>
    </ChartRoot>
  )
}
