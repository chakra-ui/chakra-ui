"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Box, Flex, FormatNumber, HStack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { LuDownload } from "react-icons/lu"
import { Area, AreaChart, Tooltip } from "recharts"
import type { CategoricalChartFunc } from "recharts/types/chart/types"

export const SparklineWithInteraction = () => {
  const chart = useChart({
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

  const onMouseMove: CategoricalChartFunc = (state) => {
    const index = state.activeTooltipIndex ?? lastIndex
    const { value = lastValue } = chart.data[index as number]
    setValue(value)
  }

  const onMouseLeave = () => {
    setValue(lastValue)
  }

  return (
    <Flex align="flex-end" maxW="sm">
      <Box flex="1" fontWeight="medium">
        <HStack textStyle="sm" color="fg.muted">
          <LuDownload /> Weekly Downloads
        </HStack>
        <Text textStyle="xl" mt="2">
          <FormatNumber value={value} />
        </Text>
      </Box>
      <Chart.Root width="full" height="12" flex="1" chart={chart}>
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
      </Chart.Root>
    </Flex>
  )
}
