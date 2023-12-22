import { useTheme } from "../system"
import { isObject } from "@chakra-ui/utils/is"
import { arrayToObjectNotation } from "@chakra-ui/utils/responsive"
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
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-breakpoint-value
 */
export function useBreakpointValue<T = any>(
  values: Partial<Record<string, T>> | Array<T | null>,
  arg?: UseBreakpointOptions | string,
): T | undefined {
  const opts = isObject(arg) ? arg : { fallback: arg ?? "base" }
  const breakpoint = useBreakpoint(opts)
  const theme = useTheme()

  if (!breakpoint) return

  /**
   * Get the sorted breakpoint keys from the provided breakpoints
   */
  const breakpoints: string[] = Array.from(theme.__breakpoints?.keys || [])

  const obj = Array.isArray(values)
    ? Object.fromEntries<any>(
        Object.entries(arrayToObjectNotation(values, breakpoints)).map(
          ([key, value]) => [key, value],
        ),
      )
    : values

  return getClosestValue(obj, breakpoint, breakpoints)
}
