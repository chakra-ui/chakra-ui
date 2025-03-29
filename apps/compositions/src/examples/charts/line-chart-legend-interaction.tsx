"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { HStack, VStack } from "@chakra-ui/react"
import { LuArrowUp } from "react-icons/lu"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export const LineChartLegendInteraction = () => {
  const chart = useChart({
    data: [
      { mac: 10, linux: 120, month: "January" },
      { mac: 95, linux: 110, month: "February" },
      { mac: 87, linux: 125, month: "March" },
      { mac: 88, linux: 30, month: "May" },
      { mac: 98, linux: 122, month: "June" },
      { mac: 90, linux: 15, month: "August" },
    ],
    series: [
      { name: "mac", color: "teal.solid" },
      { name: "linux", color: "purple.solid" },
    ],
  })

  return (
    <Container>
      <Chart.Root maxH="sm" chart={chart}>
        <LineChart data={chart.data}>
          <CartesianGrid stroke={chart.color("border")} vertical={false} />
          <XAxis
            axisLine={false}
            dataKey={chart.key("month")}
            tickFormatter={(value) => value.slice(0, 3)}
            stroke={chart.color("border")}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            stroke={chart.color("border")}
          />
          <Tooltip
            animationDuration={100}
            cursor={false}
            content={<Chart.Tooltip />}
          />
          <Legend content={<Chart.Legend interaction="hover" />} />
          {chart.series.map((item) => (
            <Line
              key={item.name}
              isAnimationActive={false}
              dataKey={chart.key(item.name)}
              stroke={chart.color(item.color)}
              strokeWidth={2}
              fill={chart.color("bg")}
              opacity={chart.getSeriesOpacity(item.name)}
            />
          ))}
        </LineChart>
      </Chart.Root>
    </Container>
  )
}

const Container = (props: React.PropsWithChildren) => {
  const { children } = props
  return (
    <VStack pos="relative" gap="4">
      {children}
      <HStack
        textStyle="xs"
        bottom="1"
        color="teal.fg"
        animation="slide-to-top 1s infinite"
      >
        Hover on "mac" <LuArrowUp />
      </HStack>
    </VStack>
  )
}
