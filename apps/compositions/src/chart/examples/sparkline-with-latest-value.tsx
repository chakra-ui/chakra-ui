"use client"

import { Box, Flex, FormatNumber, HStack, Text } from "@chakra-ui/react"
import { ChartRoot } from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import { useState } from "react"
import { LuDownload } from "react-icons/lu"
import { Area, AreaChart, Tooltip } from "recharts"
import type { CategoricalChartState } from "recharts/types/chart/types"

export const SparklineWithLatestValue = () => {
  const chart = useChartState({
    data: [
      { value: 125000 },
      { value: 158000 },
      { value: 189000 },
      { value: 210000 },
      { value: 105000 },
      { value: 278000 },
      { value: 310000 },
      { value: 345000 },
    ],
    series: [{ name: "value", color: "teal.solid" }],
  })

  const lastIndex = chart.data.length - 1
  const lastValue = chart.data[lastIndex].value
  const [value, setValue] = useState(lastValue)

  const onMouseMove = (state: CategoricalChartState) => {
    const index = state.activeTooltipIndex ?? lastIndex
    const { value = lastValue } = chart.data[index]
    setValue(value)
  }

  const onMouseLeave = () => {
    setValue(lastValue)
  }

  return (
    <Flex align="flex-end">
      <Box flex="1" fontWeight="medium">
        <HStack textStyle="sm" color="fg.muted">
          <LuDownload /> Weekly Downloads
        </HStack>
        <Text textStyle="xl" mt="2">
          <FormatNumber value={value} />
        </Text>
      </Box>
      <ChartRoot width="full" height="12" flex="2">
        <AreaChart
          data={chart.data}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <Tooltip
            cursor={{ stroke: chart.color("teal.solid"), strokeWidth: 2 }}
            content={() => null}
          />
          {chart.series.map((item) => (
            <Area
              activeDot={{ stroke: chart.color("bg") }}
              key={item.name}
              isAnimationActive={false}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
              fillOpacity={0.2}
              stroke={chart.color(item.color)}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ChartRoot>
    </Flex>
  )
}
