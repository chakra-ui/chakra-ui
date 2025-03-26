"use client"

import { Chart, useChartState } from "@chakra-ui/charts"
import { Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts"

export const ScatterChartMultiple = () => {
  const chart = useChartState({
    data: [
      [
        { x: 100, y: 200, z: 200 },
        { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 },
        { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 },
        { x: 110, y: 280, z: 200 },
      ],
      [
        { x: 200, y: 260, z: 240 },
        { x: 240, y: 290, z: 220 },
        { x: 190, y: 290, z: 250 },
        { x: 198, y: 250, z: 210 },
        { x: 180, y: 280, z: 260 },
        { x: 210, y: 220, z: 230 },
      ],
    ],
    series: [
      { label: "Group 1", color: "blue.solid" },
      { label: "Group 2", color: "green.solid" },
    ],
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
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={<Chart.Tooltip hideLabel />}
        />
        {chart.series.map((series, index) => (
          <Scatter
            name={series.label?.toString()}
            key={index}
            data={chart.data[index]}
            fill={chart.color(series.color)}
            isAnimationActive={false}
          />
        ))}
      </ScatterChart>
    </Chart.Root>
  )
}
