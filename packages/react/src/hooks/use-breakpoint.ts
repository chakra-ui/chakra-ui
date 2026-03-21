"use client"

import { useChakraContext } from "../styled-system"
import { type Dict } from "../utils"
import { useMediaQuery } from "./use-media-query"

/* -----------------------------------------------------------------------------
 * useBreakpoint
 * -----------------------------------------------------------------------------*/

export interface UseBreakpointOptions {
  fallback?: string | undefined
  ssr?: boolean | undefined
  getWindow?: () => typeof window | undefined
  breakpoints?: string[] | undefined
}

export function useBreakpoint(options: UseBreakpointOptions = {}) {
  options.fallback ||= "base"
  const sys = useChakraContext()

  let fallbackPassed = false

  // Prepend a synthetic "base" breakpoint (always matches, no min-width)
  const allBreakpoints = [
    { name: "base", min: "0px" },
    ...sys.breakpoints.values.map((bp) => ({ name: bp.name, min: bp.min! })),
  ]

  const breakpoints = allBreakpoints
    .map(({ min, name: breakpoint }) => {
      const item = {
        breakpoint,
        query: `(min-width: ${min})`,
        fallback: !fallbackPassed,
      }

      if (breakpoint === options.fallback) {
        fallbackPassed = true
      }

      return item
    })
    .filter(({ breakpoint }) => !!options.breakpoints?.includes(breakpoint))

  const fallback = breakpoints.map(({ fallback }) => fallback)

  const values = useMediaQuery(
    breakpoints.map((bp) => bp.query),
    { fallback, ssr: options.ssr },
  )

  // find highest matched breakpoint
  const index = values.lastIndexOf(true)

  return breakpoints[index]?.breakpoint ?? options.fallback
}

/* -----------------------------------------------------------------------------
 * useBreakpointValue
 * -----------------------------------------------------------------------------*/

export type UseBreakpointValueOptions = Omit<
  UseBreakpointOptions,
  "breakpoints"
>

type Value<T> = Dict<T> | Array<T | null>

export function useBreakpointValue<T = any>(
  value: Value<T>,
  opts?: UseBreakpointValueOptions,
): T | undefined {
  const sys = useChakraContext()
  const normalized = sys.normalizeValue(value)
  const breakpoint = useBreakpoint({
    breakpoints: Object.keys(normalized),
    ...opts,
  })

  return normalized[breakpoint]
}
