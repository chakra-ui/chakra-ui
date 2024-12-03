"use client"

import type { BoxProps, Tokens } from "@chakra-ui/react"
import {
  Box,
  ColorSwatch,
  Flex,
  HStack,
  Separator,
  Span,
  Stack,
  Text,
  useChakraContext,
  useLocaleContext,
} from "@chakra-ui/react"
import * as React from "react"
import type { LegendProps, TooltipProps } from "recharts"
import { ResponsiveContainer } from "recharts"

export type ChartColor = Tokens["colors"] | React.CSSProperties["color"]

interface SeriesItem<T> {
  name?: keyof T
  color?: ChartColor
  icon?: React.ReactNode
  label?: React.ReactNode
  stackId?: string
  yAxisId?: string
  strokeDasharray?: string
  id?: string
}

interface UseChartConfigProps<T> {
  data: T[]
  series?: SeriesItem<T>[]
  sort?: { by: keyof T; direction: "asc" | "desc" }
}

type ValueDomain =
  | [number, number]
  | ((props: { min: number; max: number }) => [number, number])

export type UseChartConfigReturn<T> = ReturnType<typeof useChartConfig<T>>

function useToken(category: "colors" | "space") {
  const sys = useChakraContext()
  return (key: string | undefined) => sys.token(`${category}.${key}`, key)
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

function getProp<T = unknown>(
  item: unknown,
  key: string | undefined,
): T | undefined {
  if (!key || !isObject(item)) return
  return Reflect.get(item, key) as T | undefined
}

export function useChartConfig<T>(props: UseChartConfigProps<T>) {
  const { data, series = [], sort } = props

  const id = React.useId()
  const [selectedSeries, setSelectedSeries] = React.useState<string | null>(
    null,
  )
  const [highlightedSeries, setHighlightedSeries] = React.useState<
    string | null
  >(null)

  const env = useLocaleContext()
  const color = useToken("colors")

  const key = <K extends keyof T>(prop: K | undefined): K =>
    prop ?? ("value" as K)

  const formatter = React.useCallback(
    (options: Intl.NumberFormatOptions) => {
      const formatter = new Intl.NumberFormat(env.locale, options)
      return (value: number) => formatter.format(value)
    },
    [env.locale],
  )

  const getSeries = (item: unknown) => {
    if (!isObject(item)) return
    const result = series.find((s) => {
      return (
        s.name === item.name ||
        s.name === getProp(item.payload, "name") ||
        s.name === item.dataKey ||
        s.name === getProp(item.payload, "dataKey")
      )
    }) || { color: undefined }

    result.color ||= getProp(item.payload, "color")
    result.label ||=
      result.name?.toLocaleString() || getProp(item.payload, "name")

    return result
  }

  const getTotal = (key: keyof T) => {
    return data.reduce((acc, d) => acc + Number(d[key]), 0)
  }

  const getPayloadTotal = <T extends { value?: string }>(
    payload: Array<T> | undefined,
  ) => {
    return payload?.reduce((acc, item) => {
      if (!item.value) return acc
      const num = Number(item.value)
      const value = Number.isNaN(num) ? 0 : num
      return acc + value
    }, 0)
  }

  const getValuePercent = (
    key: keyof T,
    value: number,
    domain?: ValueDomain,
  ) => {
    const min = Math.min(...data.map((d) => Number(d[key])))
    const max = Math.max(...data.map((d) => Number(d[key])))
    if (domain) {
      const d = typeof domain === "function" ? domain({ min, max }) : domain
      return ((value - d[0]) / (d[1] - d[0])) * 100
    }
    return (value / getTotal(key)) * 100
  }

  const sortedData = React.useMemo(() => {
    if (!sort) return data
    return data.sort((a, b) => {
      const aValue = Number(a[sort.by])
      const bValue = Number(b[sort.by])
      return sort.direction === "desc" ? bValue - aValue : aValue - bValue
    })
  }, [data, sort])

  return {
    data: sortedData,
    series,
    getSeries,
    id,
    key,
    color,
    formatter,
    selectedSeries,
    setSelectedSeries,
    highlightedSeries,
    setHighlightedSeries,
    getTotal,
    getPayloadTotal,
    getValuePercent,
  }
}

interface ChartRootProps extends BoxProps {
  children: React.ReactElement
}

export const ChartRoot = React.forwardRef<HTMLDivElement, ChartRootProps>(
  function ChartRoot(props, ref) {
    const { children, title, ...rest } = props

    return (
      <Box
        ref={ref}
        aspectRatio="landscape"
        textStyle="xs"
        css={{
          [`& :where(${[
            ".recharts-cartesian-axis-tick-value",
            ".recharts-polar-angle-axis-tick-value",
            ".recharts-polar-radius-axis-tick-value",
            ".recharts-pie-label-text",
          ].join(", ")})`]: {
            fill: "fg.muted",
          },
          "& .recharts-cartesian-axis .recharts-label": {
            fill: "fg",
            fontWeight: "medium",
          },
        }}
        {...rest}
      >
        {title && (
          <Text fontWeight="medium" textStyle="md" mb="4">
            {title}
          </Text>
        )}
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </Box>
    )
  },
)

interface ChartGradientProps {
  id: string
  fillOpacity?: number
  stops: { color: ChartColor; offset: string | number; opacity?: number }[]
}

export const ChartGradient = React.forwardRef<
  SVGLinearGradientElement,
  ChartGradientProps
>(function ChartGradient(props, ref) {
  const token = useToken("colors")
  const { id, fillOpacity, stops } = props
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1" ref={ref}>
      {stops.map((stop, index) => (
        <stop
          key={index}
          offset={stop.offset}
          stopColor={token(stop.color)}
          stopOpacity={stop.opacity ?? fillOpacity}
        />
      ))}
    </linearGradient>
  )
})

interface ChartLegendContentProps<T extends Record<string, unknown>>
  extends LegendProps {
  chart: UseChartConfigReturn<T>
  title?: React.ReactNode
  nameKey?: string
}

const hAlignMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
}

export function ChartLegendContent<T extends Record<string, unknown>>(
  props: ChartLegendContentProps<T>,
) {
  const {
    chart,
    payload,
    verticalAlign = "bottom",
    align = "center",
    title,
    orientation,
    nameKey,
  } = props

  const token = useToken("colors")

  const filteredPayload = payload?.filter(
    (item) => item.color !== "none" || item.type !== "none",
  )

  if (!filteredPayload?.length) return null

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
        gap="2.5"
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
                  value={token(config?.color)}
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

interface ChartTooltipContentProps<T> extends TooltipProps<string, string> {
  hideLabel?: boolean
  hideIndicator?: boolean
  hideSeriesLabel?: boolean
  showTotal?: boolean
  fitContent?: boolean
  nameKey?: string
  indicator?: "line" | "dot" | "dashed"
  chart: UseChartConfigReturn<T>
}

export function ChartTooltipContent<T>(props: ChartTooltipContentProps<T>) {
  const {
    payload: payloadProp,
    chart,
    label,
    labelFormatter,
    hideLabel,
    hideIndicator,
    hideSeriesLabel,
    showTotal,
    fitContent,
    nameKey,
  } = props

  const payload = payloadProp?.filter(
    (item) => item.color !== "none" || item.type !== "none",
  )

  const total = chart.getPayloadTotal(payload)

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
