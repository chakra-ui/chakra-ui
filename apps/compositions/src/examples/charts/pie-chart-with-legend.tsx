"use client"

import { ChartLegendContent, ChartRoot, useChartState } from "@chakra-ui/charts"
import { Cell, Legend, Pie, PieChart } from "recharts"

export const PieChartWithLegend = () => {
  const chart = useChartState({
    data: [
      { name: "windows", value: 400, color: "blue.solid" },
      { name: "mac", value: 300, color: "orange.solid" },
      { name: "linux", value: 300, color: "pink.solid" },
      { name: "other", value: 200, color: "green.solid" },
    ],
  })

  return (
    <ChartRoot aspectRatio="square" w="xs" title="Operating System">
      <PieChart>
        <Legend content={<ChartLegendContent chart={chart} />} />
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey="name"
        >
          {chart.data.map((item) => {
            return <Cell key={item.name} fill={chart.color(item.color)} />
          })}
        </Pie>
      </PieChart>
    </ChartRoot>
  )
}
