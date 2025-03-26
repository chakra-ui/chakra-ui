"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Scatter, ScatterChart, XAxis, YAxis } from "recharts"

export const ScatterChartWithLine = () => {
  const chart = useChart({
    data: [
      { x: 100, y: 200, z: 200 },
      { x: 120, y: 100, z: 260 },
      { x: 170, y: 300, z: 400 },
      { x: 140, y: 250, z: 280 },
      { x: 150, y: 400, z: 500 },
      { x: 110, y: 280, z: 200 },
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
            line
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
