"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

export const LineChartWithDashed = () => {
  const chart = useChart({
    data: [
      { windows: 186, mac: 165, month: "January" },
      { windows: 165, mac: 155, month: "February" },
      { windows: 190, mac: 175, month: "March" },
      { windows: 195, mac: 180, month: "May" },
      { windows: 182, mac: 170, month: "June" },
      { windows: 175, mac: 160, month: "August" },
      { windows: 180, mac: 165, month: "October" },
      { windows: 185, mac: 170, month: "November" },
    ],
    series: [
      { name: "windows", color: "teal.solid", strokeDasharray: "5 5" },
      { name: "mac", color: "purple.solid" },
    ],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <LineChart data={chart.data} margin={{ left: 40, right: 40, top: 40 }}>
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
          dataKey={chart.key("windows")}
          stroke={chart.color("border")}
          domain={[140, "dataMax"]}
        />
        <Tooltip
          animationDuration={100}
          cursor={{ stroke: chart.color("border") }}
          content={<Chart.Tooltip hideLabel />}
        />
        {chart.series.map((item) => (
          <Line
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            fill={chart.color(item.color)}
            dot={{ strokeDasharray: "0" }}
            strokeWidth={2}
            strokeDasharray={item.strokeDasharray}
          />
        ))}
      </LineChart>
    </Chart.Root>
  )
}
