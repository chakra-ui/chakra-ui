"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Scatter, ScatterChart, XAxis, YAxis } from "recharts"

export const ScatterChartBasic = () => {
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

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <ScatterChart>
        <XAxis
          type="number"
          dataKey={chart.key("temperature")}
          stroke={chart.color("border")}
          tickFormatter={(value) => `${value}°C`}
          domain={[10, "dataMax + 3"]}
        />
        <YAxis
          type="number"
          dataKey={chart.key("sales")}
          stroke={chart.color("border")}
        />
        {chart.series.map((series, index) => (
          <Scatter
            name={series.name?.toString()}
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
