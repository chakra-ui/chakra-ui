"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

export const BarChartHistogram = () => {
  const chart = useChart({ data })
  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart
        data={chart.data}
        margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={chart.color("border")} />
        <XAxis
          dataKey="from"
          ticks={ticks}
          label={{ value: "Value Range", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          label={{ value: "Frequency", angle: -90, position: "insideLeft" }}
        />
        <Tooltip
          formatter={(value) => [`${value}`, "Frequency"]}
          labelFormatter={(label) => {
            const bin = data.find((item) => item.from === Number(label))
            return bin ? `Range: ${bin.from}-${bin.to}` : ""
          }}
        />
        <Bar
          dataKey="value"
          fill={chart.color("teal.solid")}
          name="Frequency"
        />
      </BarChart>
    </Chart.Root>
  )
}

const data = [
  { from: 0, to: 10, value: 0 },
  { from: 10, to: 20, value: 10 },
  { from: 20, to: 30, value: 30 },
  { from: 30, to: 40, value: 50 },
  { from: 40, to: 50, value: 100 },
  { from: 50, to: 60, value: 200 },
  { from: 60, to: 70, value: 120 },
  { from: 70, to: 80, value: 220 },
  { from: 80, to: 90, value: 300 },
  { from: 90, to: 100, value: 320 },
  { from: 100, to: 110, value: 400 },
  { from: 110, to: 120, value: 470 },
  { from: 120, to: 130, value: 570 },
  { from: 130, to: 140, value: 810 },
  { from: 140, to: 150, value: 720 },
  { from: 150, to: 160, value: 810 },
  { from: 160, to: 170, value: 750 },
  { from: 170, to: 180, value: 810 },
  { from: 180, to: 190, value: 700 },
  { from: 190, to: 200, value: 530 },
  { from: 200, to: 210, value: 380 },
  { from: 210, to: 220, value: 410 },
  { from: 220, to: 230, value: 250 },
  { from: 230, to: 240, value: 170 },
  { from: 240, to: 250, value: 120 },
  { from: 250, to: 260, value: 100 },
  { from: 260, to: 270, value: 90 },
  { from: 270, to: 280, value: 120 },
  { from: 280, to: 290, value: 70 },
  { from: 290, to: 300, value: 55 },
  { from: 300, to: 310, value: 40 },
  { from: 310, to: 320, value: 20 },
  { from: 320, to: 330, value: 0 },
]

const ticks = Array.from({ length: 12 }, (_, i) => i * 30)
