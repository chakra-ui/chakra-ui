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
  useChakraContext,
} from "@chakra-ui/react"
import * as React from "react"
import type { LegendProps, TooltipProps } from "recharts"
import { ResponsiveContainer } from "recharts"
import type { Payload } from "recharts/types/component/DefaultTooltipContent"
import {
  type ChartColor,
  type UseChartStateReturn,
  getProp,
} from "./use-chart-state"

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
  const sys = useChakraContext()
  const token = (key: string | undefined) => sys.token("colors", key)
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
  chart: UseChartStateReturn<T>
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

interface ChartTooltipContentProps<T> extends TooltipProps<string, string> {
  hideLabel?: boolean
  hideIndicator?: boolean
  hideSeriesLabel?: boolean
  showTotal?: boolean
  fitContent?: boolean
  nameKey?: string
  indicator?: "line" | "dot" | "dashed"
  chart: UseChartStateReturn<T>
  render?: (item: Payload<string, string>) => React.ReactNode
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
    render,
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
