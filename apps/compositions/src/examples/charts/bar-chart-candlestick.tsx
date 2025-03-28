"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ErrorBar,
  XAxis,
  YAxis,
} from "recharts"

export const BarChartCandlestick = () => {
  const chart = useChart({
    data,
    series: [{ name: "open_close", color: "teal.solid" }],
  })

  return (
    <Chart.Root maxH="md" chart={chart}>
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chart.key("date")}
          tickFormatter={chart.formatDate({ month: "short", day: "2-digit" })}
        />
        <YAxis
          orientation="right"
          axisLine={false}
          tickLine={false}
          domain={["dataMin - 0.5", "dataMax + 0.5"]}
          tickFormatter={chart.formatNumber({ maximumFractionDigits: 1 })}
        />
        <Bar
          isAnimationActive={false}
          barSize={40}
          dataKey={chart.key("open_close")}
          fill={chart.color("teal.solid")}
        >
          {data.map((item) => (
            <Cell
              key={item.date}
              fill={
                item.open_close[0] > item.open_close[1]
                  ? chart.color("red.solid")
                  : chart.color("green.solid")
              }
            />
          ))}
          <ErrorBar
            dataKey={(obj) => [
              obj.open_close[0] - obj.high_low[0],
              obj.high_low[1] - obj.open_close[1],
            ]}
            width={2}
            stroke={chart.color("fg")}
          />
        </Bar>
      </BarChart>
    </Chart.Root>
  )
}

const data = [
  {
    date: "2024-01-01",
    open_close: [185.96, 185.64],
    high_low: [186.74, 185.19],
  },
  {
    date: "2024-01-02",
    open_close: [184.22, 185.14],
    high_low: [185.15, 182.73],
  },
  {
    date: "2024-01-03",
    open_close: [184.22, 181.42],
    high_low: [184.26, 181.12],
  },
  {
    date: "2024-01-04",
    open_close: [181.99, 182.68],
    high_low: [183.0872, 181.59],
  },
  {
    date: "2024-01-05",
    open_close: [182.15, 185.56],
    high_low: [185.66, 181.5],
  },
  {
    date: "2024-01-08",
    open_close: [184.51, 185.8],
    high_low: [186.01, 183.98],
  },
  {
    date: "2024-01-09",
    open_close: [186.19, 185.64],
    high_low: [187.05, 184.74],
  },
  {
    date: "2024-01-10",
    open_close: [186.09, 186.19],
    high_low: [187.3499, 185.36],
  },
  {
    date: "2024-01-11",
    open_close: [186.54, 185.59],
    high_low: [187.05, 185.08],
  },
  {
    date: "2024-01-12",
    open_close: [185.34, 185.92],
    high_low: [186.565, 184.455],
  },
]
