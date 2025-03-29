"use client"

import type { Tokens } from "@chakra-ui/react"
import { useChakraContext, useLocaleContext } from "@chakra-ui/react"
import * as React from "react"

export type ChartColor = Tokens["colors"] | React.CSSProperties["color"]
export type ChartSize = Tokens["sizes"] | (string & {})
export type ChartSpacing = Tokens["spacing"] | (string & {})

type ItemDataKey<T> = keyof T

interface SeriesItem<T> {
  name?: ItemDataKey<T>
  color?: ChartColor
  icon?: React.ReactNode
  label?: React.ReactNode
  stackId?: string
  yAxisId?: string
  strokeDasharray?: string
  id?: string
}

export interface UseChartProps<T> {
  data: T[]
  series?: SeriesItem<T>[]
  sort?: { by: ItemDataKey<T>; direction: "asc" | "desc" }
}

type ValueDomain =
  | [number, number]
  | ((props: { min: number; max: number }) => [number, number])

export function useChart<T = any>(props: UseChartProps<T>) {
  const { data, series = [], sort } = props

  const id = React.useId()

  const [highlightedSeries, setHighlightedSeries] = React.useState<
    string | null
  >(null)
  const isHighlightedSeries = (name: string | undefined) =>
    highlightedSeries === name

  const env = useLocaleContext()
  const sys = useChakraContext()

  const color = (key: ChartColor | undefined) => sys.token(`colors.${key}`, key)
  const size = (key: ChartSize | undefined) => sys.token(`sizes.${key}`, key)
  const spacing = (key: ChartSpacing | undefined) =>
    sys.token(`spacing.${key}`, key)

  const key = <K extends ItemDataKey<T>>(prop: K | undefined): K =>
    prop ?? ("value" as K)

  const formatNumber = React.useCallback(
    (options?: Intl.NumberFormatOptions) => {
      const formatter = new Intl.NumberFormat(env.locale, options)
      return (value: number) => formatter.format(value)
    },
    [env.locale],
  )

  const formatDate = React.useCallback(
    (options?: Intl.DateTimeFormatOptions) => {
      return (value: string) =>
        new Date(value).toLocaleDateString(env.locale, options)
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

  function getPayloadTotal<T extends { value?: string }>(
    payload: Array<T> | undefined,
  ) {
    return payload?.reduce((acc, item) => {
      if (!item.value) return acc
      const num = Number(item.value)
      const value = Number.isNaN(num) ? 0 : num
      return acc + value
    }, 0)
  }

  function getMin(key: keyof T) {
    return Math.min(...data.map((d) => Number(d[key])))
  }

  function getMax(key: keyof T) {
    return Math.max(...data.map((d) => Number(d[key])))
  }

  function getValuePercent(key: keyof T, value: number, domain?: ValueDomain) {
    const min = getMin(key)
    const max = getMax(key)
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

  const getSeriesOpacity = (name: string | undefined, fallback = 0.2) => {
    if (name && highlightedSeries)
      return isHighlightedSeries(name) ? 1 : fallback
  }

  const groupByImpl = (key: ItemDataKey<T>) => {
    return groupBy(data, key)
  }

  return {
    id,
    key,

    // series
    data: sortedData,
    groupBy: groupByImpl,
    series,
    getSeries,

    // token functions
    color,
    size,
    spacing,

    // formatters
    formatNumber,
    formatDate,

    // state
    highlightedSeries,
    setHighlightedSeries,
    isHighlightedSeries,
    getSeriesOpacity,

    // value functions
    getTotal,
    getMin,
    getMax,
    getPayloadTotal,
    getValuePercent,
  }
}

export type UseChartReturn<T> = ReturnType<typeof useChart<T>>

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

export function getProp<T = unknown>(
  item: unknown,
  key: string | undefined,
): T | undefined {
  if (!key || !isObject(item)) return
  return Reflect.get(item, key) as T | undefined
}

function groupBy<T>(data: T[], key: keyof T): T[][] {
  const groups = new Map<unknown, T[]>()
  for (const item of data) {
    const value = item[key]
    const group = groups.get(value) || []
    group.push(item)
    groups.set(value, group)
  }
  return Array.from(groups.values())
}
