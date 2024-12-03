"use client"

import {
  ChartGradient,
  ChartRoot,
  ChartTooltipContent,
} from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import * as React from "react"
import { Area, AreaChart, Tooltip } from "recharts"

export const SparklineWithGradient = () => {
  const chart = useChartState({
    data: [
      { value: 10 },
      { value: 16 },
      { value: 19 },
      { value: 15 },
      { value: 12 },
      { value: 15 },
      { value: 10 },
      { value: 18 },
    ],
    series: [{ name: "value", color: "teal.solid" }],
  })

  return (
    <ChartRoot height="10">
      <AreaChart accessibilityLayer data={chart.data}>
        <Tooltip
          position={{ y: -24 }}
          content={
            <ChartTooltipContent
              hideIndicator
              hideLabel
              hideSeriesLabel
              fitContent
              chart={chart}
            />
          }
        />
        {chart.series.map((item) => (
          <React.Fragment key={item.name}>
            <defs>
              <ChartGradient
                id={`${item.name}-gradient`}
                stops={[
                  { offset: "0%", color: item.color, opacity: 1 },
                  { offset: "100%", color: item.color, opacity: 0.01 },
                ]}
              />
            </defs>
            <Area
              type="natural"
              isAnimationActive={false}
              dataKey={chart.key(item.name)}
              fill={`url(#${item.name}-gradient)`}
              stroke={chart.color(item.color)}
              strokeWidth={2}
            />
          </React.Fragment>
        ))}
      </AreaChart>
    </ChartRoot>
  )
}
