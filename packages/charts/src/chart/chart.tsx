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
import { createContext, useContext, useMemo } from "react"
import type { LegendProps, TooltipProps } from "recharts"
import { ResponsiveContainer } from "recharts"
import type { Payload } from "recharts/types/component/DefaultTooltipContent"
import type { PolarViewBox, ViewBox } from "recharts/types/util/types"
import { type ChartColor, type UseChartReturn, getProp } from "../use-chart"

////////////////////////////////////////////////////////////////////////////////////

const ChartContext = createContext({} as UseChartReturn<any>)
const useChartContext = () => useContext(ChartContext)

////////////////////////////////////////////////////////////////////////////////////

export interface ChartRootProps<T> extends BoxProps {
  children: React.ReactElement
  chart: UseChartReturn<T>
}

const baseCss = defineStyle({
  width: "100%",
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
  "& *": {
    outline: "none",
  },
  "& svg": {
    overflow: "visible",
  },
})

export function ChartRoot<T>(props: ChartRootProps<T>) {
  const { children, css, chart, ...rest } = props
  return (
    <ChartContext.Provider value={chart}>
      <Box
        aspectRatio="landscape"
        textStyle="xs"
        css={[baseCss, css]}
        {...rest}
      >
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </Box>
    </ChartContext.Provider>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export interface ChartGradientProps {
  id: string
  fillOpacity?: number
  stops: { color: ChartColor; offset: string | number; opacity?: number }[]
}

export function ChartGradient(props: ChartGradientProps) {
  const chart = useChartContext()
  const { id, fillOpacity, stops } = props
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
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
}

////////////////////////////////////////////////////////////////////////////////////

export interface ChartLegendProps extends LegendProps {
  title?: React.ReactNode
  nameKey?: string
  interaction?: "hover" | "click"
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
    spacing = "3",
    interaction = "hover",
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
          const seriesName = config?.name?.toString()
          const name = getProp<string>(item.payload, nameKey)
          return (
            <HStack
              gap="1.5"
              key={index}
              _icon={{ boxSize: "3" }}
              style={{
                opacity: chart.getSeriesOpacity(seriesName, 0.6),
              }}
              onClick={() => {
                if (interaction === "click" && seriesName) {
                  chart.setHighlightedSeries((prev) =>
                    prev === seriesName ? null : seriesName,
                  )
                }
              }}
              onMouseEnter={() => {
                if (interaction === "hover" && seriesName) {
                  chart.setHighlightedSeries(seriesName)
                }
              }}
              onMouseLeave={() => {
                if (interaction === "hover" && seriesName) {
                  chart.setHighlightedSeries(null)
                }
              }}
            >
              {config?.icon || (
                <ColorSwatch boxSize="2" value={chart.color(config?.color)} />
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
  formatter?: (
    value: any,
    name: any,
  ) => React.ReactNode | [React.ReactNode, React.ReactNode]
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
    formatter,
    render,
  } = props

  const chart = useChartContext()

  const payload = payloadProp?.filter(
    (item) => item.color !== "none" || item.type !== "none",
  )

  const total = useMemo(() => chart.getPayloadTotal(payload), [payload, chart])

  const tooltipLabel = useMemo(() => {
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

          const formatted = formatter
            ? formatter(item.value, config?.label || item.name)
            : item.value?.toLocaleString()

          const [formattedValue, formattedName] = Array.isArray(formatted)
            ? formatted
            : [formatted, config?.label || item.name]
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
                  <Span color="fg.muted">{formattedName}</Span>
                )}
                {item.value && (
                  <Text
                    fontFamily="mono"
                    fontWeight="medium"
                    fontVariantNumeric="tabular-nums"
                  >
                    {formattedValue}
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
              {(() => {
                if (!formatter) return total.toLocaleString()
                const formatted = formatter(total, "")
                return Array.isArray(formatted) ? formatted[0] : formatted
              })()}
            </Text>
          </HStack>
        </>
      )}
    </Stack>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export interface ChartRadialTextProps {
  viewBox: ViewBox | undefined
  title: React.ReactNode
  description: React.ReactNode
  gap?: number
  fontSize?: string
}

const isPolarViewBox = (viewBox: ViewBox): viewBox is PolarViewBox =>
  "cx" in viewBox && "cy" in viewBox

export function ChartRadialText(props: ChartRadialTextProps) {
  const { viewBox, title, description, gap = 24, fontSize = "2rem" } = props
  const chart = useChartContext()
  if (!viewBox || !isPolarViewBox(viewBox)) return null
  return (
    <text
      x={viewBox.cx}
      y={viewBox.cy}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={chart.color("fg")}
    >
      <tspan
        x={viewBox.cx}
        y={viewBox.cy}
        style={{ fontSize, fontWeight: 600 }}
      >
        {title}
      </tspan>
      <tspan
        x={viewBox.cx}
        y={(viewBox.cy || 0) + gap}
        style={{ fill: chart.color("fg.muted") }}
      >
        {description}
      </tspan>
    </text>
  )
}
