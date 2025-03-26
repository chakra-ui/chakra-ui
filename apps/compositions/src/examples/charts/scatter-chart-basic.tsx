"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Scatter, ScatterChart, XAxis, YAxis } from "recharts"

export const ScatterChartBasic = () => {
  const chart = useChart({
    data: [
      { x: 100, y: 200 },
      { x: 120, y: 100 },
      { x: 170, y: 300 },
      { x: 140, y: 250 },
      { x: 150, y: 400 },
      { x: 110, y: 280 },
      { x: 130, y: 220 },
      { x: 160, y: 180 },
      { x: 125, y: 350 },
      { x: 180, y: 270 },
      { x: 135, y: 320 },
      { x: 145, y: 190 },
    ],
    series: [{ label: "Group 1", color: "blue.solid" }],
  })

  return (
    <Chart.Root maxW="sm" chart={chart}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
        <XAxis
          type="number"
          dataKey={chart.key("x")}
          stroke={chart.color("border")}
        />
        <YAxis
          type="number"
          dataKey={chart.key("y")}
          stroke={chart.color("border")}
        />
        {chart.series.map((series, index) => (
          <Scatter
            name={series.label?.toString()}
            key={index}
            data={chart.data}
            fill={chart.color(series.color)}
            isAnimationActive={false}
          />
        ))}
      </ScatterChart>
    </Chart.Root>
  )
}
