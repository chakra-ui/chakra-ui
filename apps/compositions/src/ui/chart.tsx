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

interface SeriesItem<T> {
  dataKey: keyof T
  color: Tokens["colors"] | React.CSSProperties["color"]
  icon?: React.ReactNode
  label?: React.ReactNode
  stackId?: string
  yAxisId?: string
  strokeDasharray?: string
}

interface UseChartConfigProps<T> {
  data: T[]
  series?: SeriesItem<T>[]
}

export type ChartColor = Tokens["colors"] | React.CSSProperties["color"]

interface UseChartConfigReturn<T> {
  series: SeriesItem<T>[]
  id: string
  key: <K extends keyof T>(prop: K) => K
  color: (key: ChartColor) => string
  formatter: (options: Intl.NumberFormatOptions) => (value: number) => string
  highlightedArea: string | null
  setHighlightedArea: (area: string | null) => void
  isHighlighted: (area: string) => boolean
  data: T[]
  getSeries: (key: string) => SeriesItem<T> | undefined
}

function useToken(category: "colors" | "space") {
  const sys = useChakraContext()
  return (key: string | undefined) => sys.token(`${category}.${key}`, key)
}

export function useChartConfig<T>(
  props: UseChartConfigProps<T>,
): UseChartConfigReturn<T> {
  const { series = [] } = props

  const id = React.useId()
  const [highlightedArea, setHighlightedArea] = React.useState<string | null>(
    null,
  )

  const env = useLocaleContext()
  const color = useToken("colors")

  const formatter = React.useCallback(
    (options: Intl.NumberFormatOptions) => {
      const formatter = new Intl.NumberFormat(env.locale, options)
      return (value: number) => formatter.format(value)
    },
    [env.locale],
  )

  const getSeries = (key: string) => {
    return series.find((item) => item.dataKey === key)
  }

  return {
    data: props.data,
    series,
    getSeries,
    id,
    key: (v) => v,
    color,
    formatter,
    highlightedArea,
    setHighlightedArea,
    isHighlighted: (area) => highlightedArea === area,
  }
}

interface ChartRootProps extends BoxProps {
  children: React.ReactElement
  label?: React.ReactNode
}

export const ChartRoot = React.forwardRef<HTMLDivElement, ChartRootProps>(
  function ChartRoot(props, ref) {
    const { children, label, ...rest } = props
    return (
      <Box
        ref={ref}
        aspectRatio="landscape"
        textStyle="xs"
        css={{
          "& .recharts-cartesian-axis-tick-value": { fill: "fg.muted" },
          "& .recharts-cartesian-axis .recharts-label": {
            fill: "fg",
            fontWeight: "medium",
          },
        }}
        {...rest}
      >
        {label && (
          <Text fontWeight="medium" mb="4">
            {label}
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
  nameKey?: Exclude<keyof T, number | symbol>
  title?: React.ReactNode
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
    nameKey,
    title,
    orientation,
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
      >
        {filteredPayload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const config = chart.getSeries(key)
          if (!config || !config.color) return null
          return (
            <HStack gap="1" key={key} _icon={{ boxSize: "3" }}>
              {config.icon || (
                <ColorSwatch
                  boxSize="2.5"
                  rounded="full"
                  value={token(config.color)}
                />
              )}
              <Span color="fg.muted">{config.label || key}</Span>
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
  showTotal?: boolean
  indicator?: "line" | "dot" | "dashed"
  nameKey?: string
  chart: UseChartConfigReturn<T>
}

export function ChartTooltipContent<T>(props: ChartTooltipContentProps<T>) {
  const {
    payload,
    chart,
    label,
    labelFormatter,
    hideLabel,
    hideIndicator,
    showTotal,
  } = props

  const filteredPayload = payload?.filter(
    (item) => item.color !== "none" || item.type !== "none",
  )

  const total = filteredPayload?.reduce((acc, item) => {
    return acc + (Number(item.value) ?? 0)
  }, 0)

  const tooltipLabel = React.useMemo(() => {
    const item = filteredPayload?.[0]
    const key = `${item?.dataKey || item?.name || "value"}`
    const itemConfig = chart.getSeries(key)
    const value = itemConfig?.label || label
    return labelFormatter?.(value, filteredPayload ?? []) ?? value
  }, [filteredPayload, chart, label, labelFormatter])

  if (!filteredPayload?.length) return null

  return (
    <Stack
      minW="8rem"
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
        {filteredPayload.map((item) => {
          const key = `${item.dataKey || item.name || "value"}`
          const config = chart.getSeries(key)
          return (
            <Flex
              gap="1.5"
              key={key}
              wrap="wrap"
              align="center"
              _icon={{ boxSize: "2.5" }}
            >
              {config?.icon}
              {config?.color && !config.icon && !hideIndicator && (
                <ColorSwatch
                  rounded="full"
                  boxSize="2"
                  value={chart.color(config.color)}
                />
              )}
              <HStack justify="space-between" flex="1">
                <Span color="fg.muted">{config?.label || key}</Span>
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
