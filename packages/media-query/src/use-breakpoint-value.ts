import { getClosestValue } from "./media-query.utils"
import { useBreakpoint } from "./use-breakpoint"
import { isArray, arrayToObjectNotation } from "@chakra-ui/utils"
import { useTheme } from "@chakra-ui/system"

/**
 * React hook for getting the value for the current breakpoint from the
 * provided responsive values object.
 *
 * @example
 * const width = useBreakpointValue({ base: '150px', md: '250px' })
 */
export function useBreakpointValue<T = any>(values: Record<string, T> | T[]) {
  const breakpoint = useBreakpoint()
  const { breakpoints } = useTheme()

  if (!breakpoint) {
    return
  }

  const obj = isArray(values)
    ? Object.fromEntries(
        Object.entries(
          arrayToObjectNotation(values, breakpoints),
        ).map(([_, value]) => [value, value]),
      )
    : values

  const closest = getClosestValue(obj, breakpoint)

  return closest
}
