import { useTheme } from "@chakra-ui/system"
import {
  arrayToObjectNotation,
  fromEntries,
  isArray,
  isObject,
} from "@chakra-ui/utils"
import { getClosestValue } from "./media-query.utils"
import { useBreakpoint, UseBreakpointOptions } from "./use-breakpoint"

/**
 * React hook for getting the value for the current breakpoint from the
 * provided responsive values object.
 *
 * For SSR, you can use a package like [is-mobile](https://github.com/kaimallea/isMobile)
 * to get the default breakpoint value from the user-agent
 *
 * @example
 * const width = useBreakpointValue({ base: '150px', md: '250px' })
 */
export function useBreakpointValue<T = any>(
  values: Partial<Record<string, T>> | T[],
  arg?: UseBreakpointOptions | string,
): T | undefined {
  const opts = isObject(arg) ? arg : { fallback: arg ?? "base" }
  const breakpoint = useBreakpoint(opts)
  const theme = useTheme()

  if (!breakpoint) return

  /**
   * Get the sorted breakpoint keys from the provided breakpoints
   */
  const breakpoints = Array.from(theme.__breakpoints?.keys || [])

  const obj = isArray(values)
    ? fromEntries<Partial<Record<string, T>>>(
        Object.entries(arrayToObjectNotation(values, breakpoints)).map(
          ([key, value]) => [key, value],
        ),
      )
    : values

  return getClosestValue(obj, breakpoint, breakpoints)
}
