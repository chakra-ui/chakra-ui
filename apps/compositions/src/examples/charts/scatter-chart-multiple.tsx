"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts"

export const ScatterChartMultiple = () => {
  const chart = useChart({
    data: [
      { x: 100, y: 200, id: "group1" },
      { x: 120, y: 100, id: "group1" },
      { x: 170, y: 300, id: "group1" },
      { x: 140, y: 250, id: "group1" },
      { x: 150, y: 400, id: "group1" },
      { x: 110, y: 280, id: "group1" },
      { x: 200, y: 260, id: "group2" },
      { x: 240, y: 290, id: "group2" },
      { x: 190, y: 290, id: "group2" },
      { x: 198, y: 250, id: "group2" },
      { x: 180, y: 280, id: "group2" },
      { x: 210, y: 220, id: "group2" },
    ],
    series: [
      { label: "Group 1", color: "blue.solid" },
      { label: "Group 2", color: "green.solid" },
    ],
  })

  const groupedData = chart.groupBy("id")

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
        <XAxis
          type="number"
          dataKey={chart.key("x")}
          stroke={chart.color("border")}
          domain={["dataMin - 10", "dataMax + 10"]}
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
            data={groupedData[index]}
            fill={chart.color(series.color)}
            isAnimationActive={false}
          />
        ))}
      </ScatterChart>
    </Chart.Root>
  )
}
