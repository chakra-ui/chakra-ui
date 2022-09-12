import { useTheme } from "@chakra-ui/system"
import { isObject } from "@chakra-ui/shared-utils"
import { arrayToObjectNotation } from "@chakra-ui/breakpoint-utils"
import { useBreakpoint, UseBreakpointOptions } from "./use-breakpoint"

type UseBreakpointValueOptions = Omit<UseBreakpointOptions, "breakpoints">

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
  values: Partial<Record<string, T>> | T[],
  arg?: UseBreakpointValueOptions | string,
): T | undefined {
  const opts = isObject(arg) ? arg : { fallback: arg ?? "base" }
  const theme = useTheme()

  /**
   * Get the sorted breakpoint keys from the provided breakpoints
   */
  const allBreakpoints = Array.from(theme.__breakpoints?.keys || [])

  const obj = Array.isArray(values)
    ? Object.fromEntries<any>(
        Object.entries(arrayToObjectNotation(values, allBreakpoints)).map(
          ([key, value]) => [key, value],
        ),
      )
    : values

  const breakpoint = useBreakpoint({
    // Only check the breakpoints that we have values for
    breakpoints: Object.keys(obj),
    ...opts,
  })

  return obj[breakpoint ?? opts.fallback]
}
