"use client"

import { Chart, useChartState } from "@chakra-ui/charts"
import { Area, AreaChart, Tooltip } from "recharts"

export const SparklineBasic = () => {
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
    <Chart.Root height="10" chart={chart}>
      <AreaChart data={chart.data}>
        <Tooltip
          position={{ y: -24 }}
          content={
            <Chart.Tooltip hideIndicator hideLabel hideSeriesLabel fitContent />
          }
        />
        {chart.series.map((item) => (
          <Area
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            fillOpacity={0.2}
            stroke={chart.color(item.color)}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </Chart.Root>
  )
}
