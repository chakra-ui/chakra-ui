"use client"

import type { Tokens } from "@chakra-ui/react"
import { useChakraContext, useLocaleContext } from "@chakra-ui/react"
import * as React from "react"

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

interface UseChartStateProps<T> {
  data: T[]
  series?: SeriesItem<T>[]
  sort?: { by: keyof T; direction: "asc" | "desc" }
}

type ValueDomain =
  | [number, number]
  | ((props: { min: number; max: number }) => [number, number])

export function useChartState<T>(props: UseChartStateProps<T>) {
  const { data, series = [], sort } = props

  const id = React.useId()
  const [selectedSeries, setSelectedSeries] = React.useState<string | null>(
    null,
  )
  const [highlightedSeries, setHighlightedSeries] = React.useState<
    string | null
  >(null)

  const env = useLocaleContext()
  const sys = useChakraContext()

  const color = (key: string | undefined) => sys.token(`colors.${key}`, key)
  const size = (key: string | undefined) => sys.token(`sizes.${key}`, key)

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
    size,
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

export type UseChartStateReturn<T> = ReturnType<typeof useChartState<T>>

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

export function getProp<T = unknown>(
  item: unknown,
  key: string | undefined,
): T | undefined {
  if (!key || !isObject(item)) return
  return Reflect.get(item, key) as T | undefined
}
