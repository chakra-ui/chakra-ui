"use client"

import {
  ChartGradient,
  ChartRoot,
  ChartTooltipContent,
} from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

export const LineChartWithGradient = () => {
  const chart = useChartState({
    data: [
      { temp: -20, month: "January" },
      { temp: -10, month: "February" },
      { temp: 0, month: "March" },
      { temp: 10, month: "May" },
      { temp: 20, month: "June" },
      { temp: 4, month: "August" },
      { temp: 40, month: "October" },
      { temp: -10, month: "November" },
    ],
    series: [{ name: "temp", color: "teal.solid" }],
  })

  return (
    <ChartRoot maxW="sm">
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
          dataKey={chart.key("temp")}
          stroke={chart.color("border")}
        />
        <Tooltip
          animationDuration={100}
          cursor={{ stroke: chart.color("border") }}
          content={<ChartTooltipContent hideIndicator chart={chart} />}
        />
        <defs>
          <ChartGradient
            id="gradient"
            stops={[
              { offset: "0%", color: "teal.solid" },
              { offset: "20%", color: "purple.solid" },
              { offset: "40%", color: "orange.solid" },
              { offset: "75%", color: "green.solid" },
              { offset: "100%", color: "red.solid" },
            ]}
          />
        </defs>
        {chart.series.map((item) => (
          <Line
            key={item.name}
            isAnimationActive={false}
            type="natural"
            dataKey={chart.key(item.name)}
            fill="none"
            stroke="url(#gradient)"
            r={2}
            dot={{
              stroke: chart.color("bg"),
              fill: chart.color("fg"),
              strokeWidth: 1,
            }}
            activeDot={{
              stroke: chart.color("bg"),
              fill: chart.color("fg"),
              strokeWidth: 1,
              r: 4,
            }}
            strokeWidth={4}
          />
        ))}
      </LineChart>
    </ChartRoot>
  )
}
