"use client"

import { ChartRoot } from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import { Area, AreaChart, Label, Tooltip, XAxis, YAxis } from "recharts"

export const AreaChartWithAxisLabel = () => {
  const chart = useChartState({
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
    <ChartRoot maxW="400px">
      <AreaChart
        accessibilityLayer
        data={chart.data}
        margin={{ bottom: 24, left: 24 }}
      >
        <XAxis
          dataKey={chart.key("month")}
          tickLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        >
          <Label position="insideBottom" offset={-20}>
            Month
          </Label>
        </XAxis>
        <YAxis tickLine={false} axisLine={false}>
          <Label position="insideLeft" angle={-90}>
            Count
          </Label>
        </YAxis>
        <Tooltip />
        {chart.series.map((item) => (
          <Area
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            fillOpacity={0.2}
            stroke={chart.color(item.color)}
            stackId="a"
          />
        ))}
      </AreaChart>
    </ChartRoot>
  )
}
