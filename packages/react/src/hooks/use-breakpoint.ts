"use client"

import { type BreakpointName, useChakraContext } from "../styled-system"
import { useMediaQuery } from "./use-media-query"

/* -----------------------------------------------------------------------------
 * useBreakpoint
 * -----------------------------------------------------------------------------*/

export interface UseBreakpointOptions {
  /**
   * The breakpoint name to return when no media query matches, or during SSR
   * when `window` is unavailable.
   * @default "base"
   */
  fallback?: BreakpointName | undefined
  /**
   * When `true`, defers media query evaluation to the client to avoid
   * hydration mismatches. On the server the `fallback` value is used instead.
   * @default true
   */
  ssr?: boolean | undefined
  /**
   * Custom function to retrieve the `window` object. Useful in environments
   * where `window` may not be the global (e.g. iframes, Shadow DOM, tests).
   */
  getWindow?: () => typeof window | undefined
  /**
   * The breakpoint names to evaluate against the current viewport.
   * Only these breakpoints are matched via media queries, and the highest
   * matching one is returned.
   * @example ["base", "sm", "lg"]
   */
  breakpoints?: BreakpointName[] | undefined
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
    .filter(
      ({ breakpoint }) =>
        !!options.breakpoints?.includes(breakpoint as BreakpointName),
    )

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

type Value<T> = Partial<Record<BreakpointName, T>> | Array<T | null>

export function useBreakpointValue<T = any>(
  value: Value<T>,
  opts?: UseBreakpointValueOptions,
): T | undefined {
  const sys = useChakraContext()
  const normalized = sys.normalizeValue(value)
  const breakpoint = useBreakpoint({
    breakpoints: Object.keys(normalized) as BreakpointName[],
    ...opts,
  })

  return normalized[breakpoint]
}
