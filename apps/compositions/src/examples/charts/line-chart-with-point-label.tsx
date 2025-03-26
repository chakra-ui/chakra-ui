"use client"

import { Chart, useChartState } from "@chakra-ui/charts"
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  Tooltip,
  XAxis,
} from "recharts"

export const LineChartWithPointLabel = () => {
  const chart = useChartState({
    data: [
      { name: "Jan", uv: 400 },
      { name: "Feb", uv: 300 },
      { name: "Mar", uv: 200 },
      { name: "Apr", uv: 278 },
      { name: "May", uv: 189 },
      { name: "Jun", uv: 239 },
      { name: "Jul", uv: 349 },
    ],
  })

  return (
    <Chart.Root maxW="lg" chart={chart}>
      <LineChart data={chart.data} margin={{ left: 40, right: 40, top: 40 }}>
        <CartesianGrid
          stroke={chart.color("border")}
          strokeDasharray="3 3"
          horizontal={false}
        />
        <XAxis
          dataKey={chart.key("name")}
          tickFormatter={(value) => value.slice(0, 3)}
          stroke={chart.color("border")}
        />
        <Tooltip
          animationDuration={100}
          cursor={{ stroke: chart.color("border") }}
          content={<Chart.Tooltip />}
        />
        <Line
          isAnimationActive={false}
          dataKey={chart.key("uv")}
          fill={chart.color("teal.solid")}
          stroke={chart.color("teal.solid")}
          activeDot={{ stroke: chart.color("teal.solid") }}
          strokeWidth={2}
        >
          <LabelList
            dataKey="uv"
            position="right"
            offset={10}
            style={{ fill: chart.color("fg") }}
          />
        </Line>
      </LineChart>
    </Chart.Root>
  )
}
