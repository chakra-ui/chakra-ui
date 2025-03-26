"use client"

import type { BoxProps } from "@chakra-ui/react"
import {
  Box,
  ColorSwatch,
  Flex,
  HStack,
  Separator,
  Span,
  Stack,
  Text,
  defineStyle,
} from "@chakra-ui/react"
import * as React from "react"
import { useMemo } from "react"
import type { LegendProps, TooltipProps } from "recharts"
import { ResponsiveContainer } from "recharts"
import type { Payload } from "recharts/types/component/DefaultTooltipContent"
import {
  type ChartColor,
  type UseChartStateReturn,
  getProp,
} from "../use-chart-state"

////////////////////////////////////////////////////////////////////////////////////

const ChartContext = React.createContext({} as UseChartStateReturn<any>)
const useChartContext = () => React.useContext(ChartContext)

////////////////////////////////////////////////////////////////////////////////////

export interface ChartTitleProps extends BoxProps {
  children: React.ReactNode
}

export const ChartTitle = React.forwardRef<HTMLDivElement, ChartTitleProps>(
  function ChartTitle(props, ref) {
    return (
      <Text ref={ref} fontWeight="medium" textStyle="md" mb="4" {...props} />
    )
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ChartRootProps extends BoxProps {
  children: React.ReactElement
  chart: UseChartStateReturn<unknown>
}

const baseCss = defineStyle({
  [`& :where(${[
    ".recharts-cartesian-axis-tick-value",
    ".recharts-polar-angle-axis-tick-value",
    ".recharts-polar-radius-axis-tick-value",
    ".recharts-pie-label-text",
  ].join(", ")})` as unknown as `&`]: {
    fill: "fg.muted",
  },
  "& .recharts-cartesian-axis .recharts-label": {
    fill: "fg",
    fontWeight: "medium",
  },
  "& .recharts-surface": {
    outline: "none",
  },
})

export const ChartRoot = React.forwardRef<HTMLDivElement, ChartRootProps>(
  function ChartRoot(props, ref) {
    const { children, css, chart, ...rest } = props
    return (
      <ChartContext.Provider value={chart}>
        <Box
          ref={ref}
          aspectRatio="landscape"
          textStyle="xs"
          css={[baseCss, css]}
          {...rest}
        >
          <ResponsiveContainer>{children}</ResponsiveContainer>
        </Box>
      </ChartContext.Provider>
    )
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ChartGradientProps {
  id: string
  fillOpacity?: number
  stops: { color: ChartColor; offset: string | number; opacity?: number }[]
}

export const ChartGradient = React.forwardRef<
  SVGLinearGradientElement,
  ChartGradientProps
>(function ChartGradient(props, ref) {
  const chart = useChartContext()
  const { id, fillOpacity, stops } = props
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1" ref={ref}>
      {stops.map((stop, index) => (
        <stop
          key={index}
          offset={stop.offset}
          stopColor={chart.color(stop.color)}
          stopOpacity={stop.opacity ?? fillOpacity}
        />
      ))}
    </linearGradient>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface ChartLegendProps extends LegendProps {
  title?: React.ReactNode
  nameKey?: string
}

const hAlignMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
}

export function ChartLegend(props: ChartLegendProps) {
  const {
    payload,
    verticalAlign = "bottom",
    align = "center",
    title,
    orientation,
    nameKey,
    spacing = "2.5",
  } = props
  const chart = useChartContext()
  const filteredPayload = payload?.filter(
    (item) => item.color !== "none" || item.type !== "none",
  )

  if (!filteredPayload?.length) return null
  const spacingValue =
    typeof spacing === "number" ? `${spacing}px` : chart.spacing(spacing)

  return (
    <Stack
      gap="1.5"
      align={hAlignMap[align]}
      pt={verticalAlign === "bottom" ? "3" : undefined}
      pb={verticalAlign === "top" ? "3" : undefined}
    >
      {title && <Text fontWeight="medium">{title}</Text>}
      <Flex
        data-orientation={orientation}
        gap={spacingValue}
        direction={{ _horizontal: "row", _vertical: "column" }}
        align={{ _horizontal: "center", _vertical: "flex-start" }}
        flexWrap="wrap"
      >
        {filteredPayload.map((item, index) => {
          const config = chart.getSeries(item)
          const name = getProp<string>(item.payload, nameKey)
          return (
            <HStack gap="1" key={index} _icon={{ boxSize: "3" }}>
              {config?.icon || (
                <ColorSwatch
                  boxSize="2.5"
                  rounded="full"
                  value={chart.color(config?.color)}
                />
              )}
              <Span color="fg.muted">{name || config?.label}</Span>
            </HStack>
          )
        })}
      </Flex>
    </Stack>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export interface ChartTooltipProps extends TooltipProps<string, string> {
  hideLabel?: boolean
  hideIndicator?: boolean
  hideSeriesLabel?: boolean
  showTotal?: boolean
  fitContent?: boolean
  nameKey?: string
  indicator?: "line" | "dot" | "dashed"
  render?: (item: Payload<string, string>) => React.ReactNode
}

export function ChartTooltip(props: ChartTooltipProps) {
  const {
    payload: payloadProp,
    label,
    labelFormatter,
    hideLabel,
    hideIndicator,
    hideSeriesLabel,
    showTotal,
    fitContent,
    nameKey,
    render,
  } = props

  const chart = useChartContext()

  const payload = payloadProp?.filter(
    (item) => item.color !== "none" || item.type !== "none",
  )

  const total = useMemo(() => chart.getPayloadTotal(payload), [payload, chart])

  const tooltipLabel = React.useMemo(() => {
    const item = payload?.[0]
    const itemLabel = `${getProp(item?.payload, nameKey) || label || item?.dataKey || "value"}`
    return labelFormatter?.(itemLabel, payload ?? []) ?? itemLabel
  }, [payload, labelFormatter, label, nameKey])

  if (!payload?.length) return null

  return (
    <Stack
      minW={fitContent ? undefined : "8rem"}
      gap="1"
      rounded="l2"
      bg="bg.panel"
      px="2.5"
      py="1"
      textStyle="xs"
      shadow="md"
    >
      {!hideLabel && <Text fontWeight="medium">{tooltipLabel}</Text>}

      <Box>
        {payload.map((item, index) => {
          const config = chart.getSeries(item)
          if (render) return render(item.payload)
          return (
            <Flex
              gap="1.5"
              key={index}
              wrap="wrap"
              align="center"
              _icon={{ boxSize: "2.5" }}
            >
              {config?.icon}
              {config?.color && !config?.icon && !hideIndicator && (
                <ColorSwatch
                  rounded="full"
                  boxSize="2"
                  value={chart.color(config.color)}
                />
              )}
              <HStack justify="space-between" flex="1">
                {!hideSeriesLabel && (
                  <Span color="fg.muted">{`${config?.label || item.name}`}</Span>
                )}
                {item.value && (
                  <Text
                    fontFamily="mono"
                    fontWeight="medium"
                    fontVariantNumeric="tabular-nums"
                  >
                    {item.value.toLocaleString()}
                  </Text>
                )}
              </HStack>
            </Flex>
          )
        })}
      </Box>

      {showTotal && total != null && (
        <>
          <Separator mt="1" />
          <HStack gap="1" justify="space-between" pb="1">
            <Span color="fg.muted">Total</Span>
            <Text
              fontFamily="mono"
              fontWeight="medium"
              fontVariantNumeric="tabular-nums"
            >
              {total.toLocaleString()}
            </Text>
          </HStack>
        </>
      )}
    </Stack>
  )
}
