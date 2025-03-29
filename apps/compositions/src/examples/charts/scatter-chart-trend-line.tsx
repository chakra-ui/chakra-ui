"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Fragment, useMemo } from "react"
import { Scatter, ScatterChart, XAxis, YAxis } from "recharts"

export const ScatterChartTrendLine = () => {
  const chart = useChart({
    data: [
      { temperature: 14.2, sales: 215 },
      { temperature: 16.4, sales: 325 },
      { temperature: 11.9, sales: 185 },
      { temperature: 15.2, sales: 332 },
      { temperature: 18.5, sales: 406 },
      { temperature: 22.1, sales: 522 },
      { temperature: 19.4, sales: 412 },
      { temperature: 25.1, sales: 614 },
      { temperature: 23.4, sales: 544 },
      { temperature: 18.1, sales: 421 },
      { temperature: 22.6, sales: 445 },
      { temperature: 17.2, sales: 408 },
    ],
    series: [{ name: "sales", color: "teal.solid" }],
  })

  const trendLine = useMemo(() => getTrendLine(chart.data), [chart.data])

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
        <XAxis
          type="number"
          dataKey={chart.key("temperature")}
          stroke={chart.color("border")}
          domain={[10, "dataMax + 3"]}
        />
        <YAxis
          type="number"
          dataKey={chart.key("sales")}
          stroke={chart.color("border")}
        />
        <Scatter
          isAnimationActive={false}
          line={{ stroke: chart.color("red.solid") }}
          data={trendLine}
          stroke="none"
          strokeWidth={2}
          shape={() => <Fragment />}
        />
        {chart.series.map((series, index) => (
          <Scatter
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

interface Item {
  temperature: number
  sales: number
}

function getTrendLine(data: Item[]): [Item, Item] {
  // Calculate means
  const meanX =
    data.reduce((sum, item) => sum + item.temperature, 0) / data.length
  const meanY = data.reduce((sum, item) => sum + item.sales, 0) / data.length

  // Calculate slope using least squares method
  const numerator = data.reduce((sum, item) => {
    return sum + (item.temperature - meanX) * (item.sales - meanY)
  }, 0)

  const denominator = data.reduce((sum, item) => {
    return sum + Math.pow(item.temperature - meanX, 2)
  }, 0)

  const slope = numerator / denominator
  const intercept = meanY - slope * meanX

  // Get min and max x values to draw line endpoints
  const minX = Math.min(...data.map((item) => item.temperature))
  const maxX = Math.max(...data.map((item) => item.temperature))

  // Return two points that define the trend line
  return [
    { temperature: minX, sales: slope * minX + intercept },
    { temperature: maxX, sales: slope * maxX + intercept },
  ]
}
