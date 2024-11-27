"use client"

import {
  ChartLegendContent,
  ChartRoot,
  ChartTooltipContent,
  useChartConfig,
} from "compositions/ui/chart"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export const LineChartBasic = () => {
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
          dataKey={chart.key("windows")}
          stroke={chart.color("border")}
        />
        <Tooltip
          animationDuration={100}
          cursor={{ stroke: chart.color("border") }}
          content={<ChartTooltipContent chart={chart} />}
        />
        <Legend
          verticalAlign="top"
          align="right"
          content={<ChartLegendContent chart={chart} />}
        />
        {chart.series.map((item) => (
          <Line
            key={item.dataKey}
            isAnimationActive={false}
            dataKey={chart.key(item.dataKey)}
            fill={chart.color(item.color)}
            stroke={chart.color(item.color)}
            activeDot={{ stroke: chart.color(item.color) }}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ChartRoot>
  )
}
