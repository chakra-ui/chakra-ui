"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Line, LineChart, ReferenceLine } from "recharts"

export const SparklineWithReference = () => {
  const chart = useChart({
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
    <Chart.Root maxW="200px" chart={chart}>
      <LineChart data={chart.data}>
        {chart.series.map((item) => (
          <Line
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            dot={false}
            stroke={chart.color(item.color)}
            strokeWidth={2}
          />
        ))}
        <ReferenceLine
          y={chart.getMin("value")}
          stroke={chart.color("border.emphasized")}
          strokeDasharray="4 4"
          label={{
            value: chart.getMin("value"),
            position: "left",
            fill: chart.color("fg.muted"),
          }}
        />
        <ReferenceLine
          y={chart.getMax("value")}
          stroke={chart.color("border.emphasized")}
          strokeDasharray="4 4"
          label={{
            value: chart.getMax("value"),
            position: "right",
            fill: chart.color("fg.muted"),
          }}
        />
      </LineChart>
    </Chart.Root>
  )
}
