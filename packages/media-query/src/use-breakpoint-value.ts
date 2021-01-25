import { useTheme } from "@chakra-ui/system"
import {
  arrayToObjectNotation,
  fromEntries,
  isArray,
  isCustomBreakpoint,
} from "@chakra-ui/utils"
import { getClosestValue } from "./media-query.utils"
import { useBreakpoint } from "./use-breakpoint"

/**
 * React hook for getting the value for the current breakpoint from the
 * provided responsive values object.
 *
 * @example
 * const width = useBreakpointValue({ base: '150px', md: '250px' })
 */
export function useBreakpointValue<T = any>(
  values: Record<string, T> | T[],
): T | undefined {
  const breakpoint = useBreakpoint()
  const theme = useTheme()

  if (!breakpoint) return undefined

  /**
   * Get the non-number breakpoint keys from the provided breakpoints
   */
  const breakpoints = Object.keys(theme.breakpoints).filter(isCustomBreakpoint)

  const obj = isArray(values)
    ? fromEntries<Record<string, T>>(
        Object.entries(
          arrayToObjectNotation(values, breakpoints),
        ).map(([key, value]) => [key, value]),
      )
    : values

  return getClosestValue(obj, breakpoint, breakpoints)
}
