"use client"

import {
  AbsoluteCenter,
  Box,
  Flex,
  type FlexProps,
  HStack,
  Show,
  Stack,
  type StackProps,
  Text,
} from "@chakra-ui/react"
import { type UseChartConfigReturn } from "compositions/chart/chart"

interface BarListData {
  name: string
  value: number
  href?: URL | string | undefined
}

interface ChartProps<T extends BarListData> {
  chart: UseChartConfigReturn<T>
}

export const BarListRoot = (props: StackProps) => {
  return <Box {...props} css={{ "--bar-size": "sizes.10" }} />
}

export const BarListTitle = (props: StackProps) => {
  return <HStack textStyle="md" mb="4" fontWeight="medium" {...props} />
}

export const BarListContent = (props: FlexProps) => {
  return <Flex flexWrap="nowrap" align="flex-end" gap="4" {...props} />
}

interface BarListTooltipProps<T extends BarListData> {
  chart: UseChartConfigReturn<T>
  payload: T
  labelFormatter?: (value: number) => React.ReactNode
}

export function BarListTooltip<T extends BarListData>(
  props: BarListTooltipProps<T>,
) {
  const { chart, payload, labelFormatter } = props
  const formatter = labelFormatter || chart.formatter({ style: "decimal" })
  return (
    <AbsoluteCenter
      display={{ base: "none", _groupHover: "block" }}
      axis="vertical"
      right="2"
      zIndex="1"
      textStyle="xs"
      fontWeight="medium"
      bg="bg.panel"
      px="1.5"
      py="1"
      rounded="l2"
      shadow="xs"
      pointerEvents="none"
    >
      {formatter(payload.value)}
    </AbsoluteCenter>
  )
}

interface BarListProps<T extends BarListData>
  extends StackProps,
    ChartProps<T> {
  showTooltip?: boolean
  label?: (props: { payload: T; index: number }) => React.ReactNode
}

export function BarList<T extends BarListData>(props: BarListProps<T>) {
  const { chart, label, showTooltip, ...rest } = props

  const getPercent = (value: number) =>
    chart.getValuePercent("value", value, (e) => [0, e.max])

  const series = chart.getSeries({ name: "name" })

  return (
    <Stack flex="1" {...rest}>
      {chart.data.map((item, index) => (
        <HStack
          key={item.name}
          flex={1}
          minH="var(--bar-size)"
          w="full"
          gap="8"
          _hover={{ bg: "bg.subtle" }}
          onMouseMove={() => {
            if (!showTooltip) return
            if (chart.highlightedSeries === item.name) return
            chart.setHighlightedSeries(item.name)
          }}
          onMouseLeave={() => {
            if (!showTooltip) return
            chart.setHighlightedSeries(null)
          }}
        >
          <Box pos="relative" flex="1" className="group">
            {showTooltip && chart.highlightedSeries === item.name && (
              <BarListTooltip chart={chart} payload={item} />
            )}
            <Box
              pos="absolute"
              insetStart="0"
              h="full"
              bg={series?.color}
              rounded="l2"
              width="var(--bar-width)"
              style={{
                ["--bar-width" as string]: `${getPercent(item.value)}%`,
              }}
            />
            <HStack
              flex="1"
              justify="flex-start"
              textStyle="sm"
              pos="relative"
              wordBreak="break-all"
              w="full"
              minH="var(--bar-size)"
              px="2.5"
            >
              <Show when={label} fallback={item.name}>
                {label?.({ payload: item, index })}
              </Show>
            </HStack>
          </Box>
        </HStack>
      ))}
    </Stack>
  )
}

interface BarListValueProps<T extends BarListData>
  extends ChartProps<T>,
    StackProps {
  valueFormatter?: (value: number) => React.ReactNode
}

export function BarListValue<T extends BarListData>(
  props: BarListValueProps<T>,
) {
  const { chart, valueFormatter, ...rest } = props

  const formatter =
    valueFormatter ||
    chart.formatter({
      notation: "compact",
      maximumFractionDigits: 2,
    })

  return (
    <Stack {...rest}>
      {chart.data.map((item) => (
        <HStack
          key={item.name}
          minH="var(--bar-size)"
          justify="flex-end"
          textStyle="sm"
          fontWeight="medium"
        >
          {formatter(item.value)}
        </HStack>
      ))}
    </Stack>
  )
}

interface BarListLabelProps extends Omit<StackProps, "title"> {
  title: React.ReactNode
  titleAlignment?: StackProps["textAlign"]
}

export function BarListLabel(props: BarListLabelProps) {
  const { title, titleAlignment, children, ...rest } = props
  return (
    <Stack {...rest}>
      <Text
        textStyle="xs"
        fontWeight="medium"
        color="fg.muted"
        textAlign={titleAlignment}
      >
        {title}
      </Text>
      {children}
    </Stack>
  )
}
