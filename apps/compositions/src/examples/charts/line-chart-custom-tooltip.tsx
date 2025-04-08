"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import type { TooltipProps } from "recharts"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

function CustomTooltip(props: TooltipProps<string, string>) {
  const { active, payload, label } = props
  if (!active || !payload || payload.length === 0) return null
  return (
    <Box w="40" rounded="sm" bg="teal.subtle" p="3">
      <HStack>
        <span>{label} Customers</span>
      </HStack>
      <Stack>
        {payload.map((item) => (
          <HStack key={item.name}>
            <Box boxSize="2" bg={item.color} />
            <Text textStyle="xl">{item.value}</Text>
          </HStack>
        ))}
      </Stack>
    </Box>
  )
}

export const LineChartCustomTooltip = () => {
  const chart = useChart({
    data: [
      { Customers: 10, month: "January" },
      { Customers: 95, month: "February" },
      { Customers: 87, month: "March" },
      { Customers: 88, month: "May" },
      { Customers: 65, month: "June" },
      { Customers: 90, month: "August" },
    ],
    series: [{ name: "Customers", color: "teal.solid" }],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <LineChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border")} vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={chart.key("month")}
          tickFormatter={(value) => value.slice(0, 3)}
          stroke={chart.color("border")}
          label={{ value: "Month", position: "bottom" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          stroke={chart.color("border")}
          label={{ value: "Customers", position: "left", angle: -90 }}
        />
        <Tooltip
          animationDuration={100}
          cursor={false}
          content={<CustomTooltip />}
        />
        {chart.series.map((item) => (
          <Line
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </Chart.Root>
  )
}
