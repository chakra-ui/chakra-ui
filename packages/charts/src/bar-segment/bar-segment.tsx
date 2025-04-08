"use client"

import type { BoxProps, StackProps, Tokens } from "@chakra-ui/react"
import {
  Box,
  ColorSwatch,
  Flex,
  FormatNumber,
  HStack,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import * as React from "react"
import type { UseChartReturn } from "../use-chart"

export interface BarSegmentData {
  name: string
  value: number
  color: string
}

interface ChartProps {
  chart: UseChartReturn<BarSegmentData>
}

const ChartContext = React.createContext({} as UseChartReturn<BarSegmentData>)

////////////////////////////////////////////////////////////////////////////////////

export interface BarSegmentRootProps extends StackProps, ChartProps {
  barSize?: Tokens["sizes"]
}

export function BarSegmentRoot(props: BarSegmentRootProps) {
  const { chart, barSize = "10", children, ...rest } = props
  return (
    <Stack gap="4" {...rest} css={{ "--bar-size": chart.size(barSize) }}>
      <ChartContext.Provider value={chart}>{children}</ChartContext.Provider>
    </Stack>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export const BarSegmentContent = React.forwardRef<HTMLDivElement, StackProps>(
  function BarSegmentContent(props, ref) {
    const chart = React.useContext(ChartContext)
    return (
      <Stack
        w="full"
        gap="1"
        ref={ref}
        onMouseLeave={() => chart.setHighlightedSeries(null)}
        {...props}
      />
    )
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface BarSegmentLabelProps extends StackProps {}

export function BarSegmentLabel(props: BarSegmentLabelProps) {
  const chart = React.useContext(ChartContext)
  const getPercent = (value: number) => chart.getValuePercent("value", value)
  return (
    <HStack {...props}>
      {chart.data.map((item) => (
        <HStack
          flexShrink="0"
          key={item.name}
          textStyle="sm"
          fontWeight="medium"
          lineClamp={1}
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

////////////////////////////////////////////////////////////////////////////////////

export interface BarSegmentBarProps extends StackProps {
  tooltip?: boolean | ((props: BarSegmentTooltipProps) => React.ReactNode)
}

export function BarSegmentBar(props: BarSegmentBarProps) {
  const { tooltip, children, ...rest } = props
  const chart = React.useContext(ChartContext)
  const getPercent = (value: number) => chart.getValuePercent("value", value)
  return (
    <HStack pos="relative" gap="1" {...rest}>
      {chart.data.map((item) => (
        <Box
          pos="relative"
          key={item.name}
          flexShrink="0"
          flex="var(--bar-percent)"
          height="var(--bar-size)"
          bg={item.color}
          rounded="l1"
          onMouseMove={() => {
            if (!tooltip) return
            chart.setHighlightedSeries(item.name)
          }}
          style={{
            ["--bar-percent" as string]: `${getPercent(item.value)}%`,
          }}
        >
          {typeof tooltip === "function" ? tooltip({ payload: item }) : null}
          {typeof tooltip === "boolean" && tooltip && (
            <BarSegmentTooltip payload={item} />
          )}
        </Box>
      ))}
      {children}
    </HStack>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export interface BarSegmentReferenceProps extends BoxProps {
  value: number
  label?: React.ReactNode
}

export function BarSegmentReference(props: BarSegmentReferenceProps) {
  const { value, label, ...rest } = props
  const chart = React.useContext(ChartContext)
  const getPercent = (value: number) => chart.getValuePercent("value", value)
  return (
    <Box
      h={label ? "150%" : "100%"}
      pos="absolute"
      insetStart={`var(--bar-percent)`}
      bottom="0"
      style={{ ["--bar-percent" as string]: `${getPercent(value)}%` }}
      {...rest}
    >
      <Flex gap="2" h="full">
        <Span
          w="2px"
          h="100%"
          bg="bg.inverted"
          outline="2px solid {colors.bg}"
        />
        {label && (
          <Span fontWeight="medium" textStyle="xs" pos="relative" top="-4px">
            {label}
          </Span>
        )}
      </Flex>
    </Box>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export interface BarSegmentValueProps extends StackProps {}

export function BarSegmentValue(props: BarSegmentValueProps) {
  const chart = React.useContext(ChartContext)
  const getPercent = (value: number) => chart.getValuePercent("value", value)
  return (
    <HStack {...props}>
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

////////////////////////////////////////////////////////////////////////////////////

export interface BarSegmentLegendProps extends StackProps {
  showPercent?: boolean
  showValue?: boolean
  valueFormatter?: (value: number) => string
}

export function BarSegmentLegend(props: BarSegmentLegendProps) {
  const { showPercent, showValue, valueFormatter, ...rest } = props
  const chart = React.useContext(ChartContext)
  const formatter =
    valueFormatter || chart.formatNumber({ maximumFractionDigits: 2 })

  return (
    <HStack wrap="wrap" gap="4" textStyle="sm" {...rest}>
      {chart.data.map((item) => (
        <HStack key={item.name}>
          <ColorSwatch
            value={chart.color(item.color)}
            boxSize="0.82em"
            rounded="full"
          />
          <HStack gap="1.5">
            <Text>{item.name}</Text>
            {showValue && (
              <Span fontWeight="medium">{formatter(item.value)}</Span>
            )}
            {showPercent && (
              <Span color="fg.muted">
                {chart.getValuePercent("value", item.value).toFixed(0)}%
              </Span>
            )}
          </HStack>
        </HStack>
      ))}
    </HStack>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export interface BarSegmentTooltipProps extends StackProps {
  payload: BarSegmentData
}

export function BarSegmentTooltip(props: BarSegmentTooltipProps) {
  const { payload, ...rest } = props

  const chart = React.useContext(ChartContext)
  if (!payload || chart.highlightedSeries !== payload.name) return null

  const formatter = chart.formatNumber({ maximumFractionDigits: 2 })

  return (
    <HStack
      pos="absolute"
      top="-4"
      right="4"
      bg="bg.panel"
      textStyle="xs"
      zIndex="1"
      px="2.5"
      py="1"
      gap="1.5"
      rounded="l2"
      shadow="md"
      {...rest}
    >
      <ColorSwatch
        value={chart.color(payload.color)}
        boxSize="0.82em"
        rounded="full"
      />
      <Span>{payload.name}</Span>
      <Span fontFamily="mono" fontWeight="medium">
        {formatter(payload.value)}
      </Span>
    </HStack>
  )
}
