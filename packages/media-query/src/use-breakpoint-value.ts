import { getClosestValue } from "./media-query.utils"
import { useBreakpoint } from "./use-breakpoint"
import { isArray } from "@chakra-ui/utils"
import { arrayToObject } from "./media-query.utils"

/**
 * React hook for getting the value for the current breakpoint from the
 * provided responsive values object.
 *
 * @example
 * const width = useBreakpointValue({ base: '150px', md: '250px' })
 */
export function useBreakpointValue<T = any>(values: Record<string, T> | T[]) {
  const breakpoint = useBreakpoint()
  if (!breakpoint) return
  const obj = isArray(values) ? arrayToObject(values) : values
  return getClosestValue(obj, breakpoint)
}
