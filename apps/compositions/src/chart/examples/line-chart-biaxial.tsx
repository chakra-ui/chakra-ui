"use client"

import {
  ChartLegendContent,
  ChartRoot,
  ChartTooltipContent,
} from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export const LineChartBiaxial = () => {
  const chart = useChartState({
    data: [
      { windows: 186, mac: 20, month: "January" },
      { windows: 165, mac: 45, month: "February" },
      { windows: 190, mac: 37, month: "March" },
      { windows: 195, mac: 28, month: "May" },
      { windows: 182, mac: 48, month: "June" },
      { windows: 175, mac: 30, month: "August" },
      { windows: 180, mac: 26, month: "October" },
      { windows: 185, mac: 41, month: "November" },
    ],
    series: [
      { name: "windows", color: "teal.solid", yAxisId: "left" },
      { name: "mac", color: "purple.solid", yAxisId: "right" },
    ],
  })

  return (
    <ChartRoot maxW="lg">
      <LineChart
        data={chart.data}
        margin={{ left: 20, bottom: 20, right: 20, top: 20 }}
      >
        <CartesianGrid stroke={chart.color("border")} vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={chart.key("month")}
          tickFormatter={(value) => value.slice(0, 3)}
          stroke={chart.color("border")}
        >
          <Label value="Month" position="bottom" />
        </XAxis>
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          yAxisId="left"
          dataKey={chart.key("windows")}
          stroke={chart.color("border")}
        >
          <Label value="Windows" position="left" angle={-90} offset={-10} />
        </YAxis>
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          yAxisId="right"
          orientation="right"
          dataKey={chart.key("mac")}
          stroke={chart.color("border")}
        >
          <Label value="Mac" position="right" angle={90} offset={-10} />
        </YAxis>
        <Tooltip
          animationDuration={100}
          cursor={{ stroke: chart.color("border") }}
          content={<ChartTooltipContent chart={chart} />}
        />
        <Legend
          verticalAlign="top"
          align="right"
          wrapperStyle={{ marginTop: -20, marginRight: 20 }}
          content={<ChartLegendContent chart={chart} />}
        />
        {chart.series.map((item) => (
          <Line
            type="bump"
            yAxisId={item.yAxisId}
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
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
