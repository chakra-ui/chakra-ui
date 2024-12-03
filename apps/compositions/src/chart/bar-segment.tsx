import { Box, FormatNumber, HStack, type StackProps } from "@chakra-ui/react"
import { type UseChartConfigReturn } from "compositions/chart/chart"

interface BarSegmentData {
  name: string
  value: number
  color: string
}

interface ChartProps<T extends BarSegmentData> {
  chart: UseChartConfigReturn<T>
}

export function BarSegmentLabelList<T extends BarSegmentData>(
  props: ChartProps<T>,
) {
  const { chart } = props
  const getPercent = (value: number) => chart.getValuePercent("value", value)
  return (
    <HStack>
      {chart.data.map((item) => (
        <HStack
          flexShrink="0"
          key={item.name}
          textStyle="sm"
          fontWeight="medium"
          style={{
            ["--bar-percent" as string]: `${getPercent(item.value)}%`,
          }}
          flex="var(--bar-percent)"
        >
          {item.name}
        </HStack>
      ))}
    </HStack>
  )
}

interface BarSegmentProps<T extends BarSegmentData>
  extends StackProps,
    ChartProps<T> {}

export function BarSegment<T extends BarSegmentData>(
  props: BarSegmentProps<T>,
) {
  const { chart, children, ...rest } = props
  const getPercent = (value: number) => chart.getValuePercent("value", value)
  return (
    <HStack pos="relative" gap="1" {...rest}>
      {chart.data.map((item) => (
        <Box
          key={item.name}
          flexShrink="0"
          flex="var(--bar-percent)"
          h="10"
          bg={item.color}
          rounded="l1"
          style={{
            ["--bar-percent" as string]: `${getPercent(item.value)}%`,
          }}
        />
      ))}
      {children}
    </HStack>
  )
}

export function BarSegmentReference<T extends BarSegmentData>(props: {
  chart: UseChartConfigReturn<T>
  value: number
}) {
  const { chart, value } = props
  const getPercent = (value: number) => chart.getValuePercent("value", value)
  const style = { ["--bar-percent" as string]: `${getPercent(value)}%` }
  return (
    <Box
      w="2px"
      h="120%"
      outline="2px solid white"
      bg="bg.inverted"
      pos="absolute"
      insetStart={`var(--bar-percent)`}
      top="-10%"
      style={style}
    />
  )
}

export function BarSegmentValueList<T extends BarSegmentData>(
  props: ChartProps<T>,
) {
  const { chart } = props
  const getPercent = (value: number) => chart.getValuePercent("value", value)
  return (
    <HStack>
      {chart.data.map((item) => (
        <HStack
          key={item.name}
          textStyle="sm"
          fontWeight="medium"
          flexShrink="0"
          style={{
            ["--bar-percent" as string]: `${getPercent(item.value)}%`,
          }}
          flex="var(--bar-percent)"
        >
          <FormatNumber
            value={item.value}
            notation="compact"
            maximumFractionDigits={2}
          />
        </HStack>
      ))}
    </HStack>
  )
}
