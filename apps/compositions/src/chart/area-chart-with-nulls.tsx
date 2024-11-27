"use client"

import { For, SimpleGrid } from "@chakra-ui/react"
import {
  ChartLegendContent,
  ChartRoot,
  ChartTooltipContent,
  useChartConfig,
} from "compositions/ui/chart"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
} from "recharts"

export const AreaChartWithConnectNulls = () => {
  const chart = useChartConfig({
    data: [
      { sales: 186, month: "January" },
      { sales: null, month: "February" },
      { sales: 190, month: "March" },
      { sales: 195, month: "May" },
      { sales: null, month: "June" },
      { sales: 175, month: "August" },
      { sales: 180, month: "October" },
      { sales: 185, month: "November" },
      { sales: 300, month: "December" },
    ],
    series: [{ dataKey: "sales", color: "teal.solid" }],
  })

  return (
    <SimpleGrid gap="10" minChildWidth="400px">
      <For each={["false", "true"]}>
        {(connectNulls) => (
          <ChartRoot
            key={connectNulls.toString()}
            label={`connectNulls: ${connectNulls.toString()}`}
            maxW="sm"
          >
            <AreaChart data={chart.data}>
              <CartesianGrid
                stroke={chart.color("border.muted")}
                vertical={false}
              />
              <XAxis
                axisLine={false}
                tickLine={false}
                dataKey={chart.key("month")}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip
                cursor={false}
                animationDuration={100}
                content={<ChartTooltipContent chart={chart} />}
              />
              <Legend content={<ChartLegendContent chart={chart} />} />
              {chart.series.map((item) => (
                <Area
                  key={item.dataKey}
                  isAnimationActive={false}
                  dataKey={chart.key(item.dataKey)}
                  fill={chart.color(item.color)}
                  fillOpacity={0.2}
                  connectNulls={connectNulls === "true"}
                  stroke={chart.color(item.color)}
                  stackId="a"
                />
              ))}
            </AreaChart>
          </ChartRoot>
        )}
      </For>
    </SimpleGrid>
  )
}
