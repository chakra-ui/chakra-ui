"use client"

import type {
  AbsoluteCenterProps,
  FlexProps,
  StackProps,
  Tokens,
} from "@chakra-ui/react"
import {
  AbsoluteCenter,
  Box,
  Flex,
  HStack,
  Show,
  Stack,
  Text,
} from "@chakra-ui/react"
import * as React from "react"
import { type UseChartReturn } from "../use-chart"

export interface BarListData {
  name: string
  value: number
  href?: string
}

interface ChartProps {
  chart: UseChartReturn<BarListData>
}

const ChartContext = React.createContext({} as UseChartReturn<BarListData>)

////////////////////////////////////////////////////////////////////////////////////

export interface BarListRootProps extends StackProps, ChartProps {
  barSize?: Tokens["sizes"]
}

export function BarListRoot(props: BarListRootProps) {
  const { chart, barSize = "10", children, ...rest } = props
  return (
    <Box {...rest} css={{ "--bar-size": chart.size(barSize) }}>
      <ChartContext.Provider value={chart}>{children}</ChartContext.Provider>
    </Box>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export const BarListTitle = (props: StackProps) => {
  return <HStack textStyle="md" mb="4" fontWeight="medium" {...props} />
}

////////////////////////////////////////////////////////////////////////////////////

export const BarListContent = (props: FlexProps) => {
  return <Flex flexWrap="nowrap" align="flex-end" gap="4" {...props} />
}

////////////////////////////////////////////////////////////////////////////////////

export interface BarListTooltipProps extends AbsoluteCenterProps {
  payload: BarListData
  labelFormatter?: (value: number) => React.ReactNode
}

export function BarListTooltip(props: BarListTooltipProps) {
  const { payload, labelFormatter, ...rest } = props
  const chart = React.useContext(ChartContext)
  const formatter = labelFormatter || chart.formatNumber({ style: "decimal" })

  if (!payload || chart.highlightedSeries !== payload.name) return null

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
      {...rest}
    >
      {formatter(payload.value)}
    </AbsoluteCenter>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export interface BarListBarProps extends StackProps {
  tooltip?: boolean | ((props: BarListTooltipProps) => React.ReactNode)
  label?: (props: { payload: BarListData; index: number }) => React.ReactNode
}

export function BarListBar(props: BarListBarProps) {
  const { label, tooltip, ...rest } = props

  const chart = React.useContext(ChartContext)
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
            if (!tooltip) return
            if (chart.highlightedSeries === item.name) return
            chart.setHighlightedSeries(item.name)
          }}
          onMouseLeave={() => {
            if (!tooltip) return
            chart.setHighlightedSeries(null)
          }}
        >
          <Box pos="relative" flex="1" className="group">
            {typeof tooltip === "function" ? tooltip({ payload: item }) : null}
            {typeof tooltip === "boolean" && tooltip && (
              <BarListTooltip payload={item} />
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

////////////////////////////////////////////////////////////////////////////////////

export interface BarListValueProps extends StackProps {
  valueFormatter?: (value: number) => React.ReactNode
}

export function BarListValue(props: BarListValueProps) {
  const { valueFormatter, ...rest } = props

  const chart = React.useContext(ChartContext)

  const formatter =
    valueFormatter ||
    chart.formatNumber({
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

////////////////////////////////////////////////////////////////////////////////////

export interface BarListLabelProps extends Omit<StackProps, "title"> {
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
