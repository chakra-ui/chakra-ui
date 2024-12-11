"use client"

import { ChartRoot } from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts"

export const RadarChartBasic = () => {
  const chart = useChartState({
    data: [
      { windows: 110, month: "January" },
      { windows: 130, month: "February" },
      { windows: 110, month: "March" },
      { windows: 90, month: "May" },
      { windows: 75, month: "June" },
    ],
    series: [{ name: "windows", color: "teal.solid" }],
  })

  return (
    <ChartRoot maxW="sm">
      <RadarChart data={chart.data}>
        <PolarGrid stroke={chart.color("border")} />
        <PolarAngleAxis dataKey={chart.key("month")} />
        <PolarRadiusAxis />
        {chart.series.map((item) => (
          <Radar
            isAnimationActive={false}
            key={item.name}
            name={item.name}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            fill={chart.color(item.color)}
            fillOpacity={0.2}
          />
        ))}
      </RadarChart>
    </ChartRoot>
  )
}
