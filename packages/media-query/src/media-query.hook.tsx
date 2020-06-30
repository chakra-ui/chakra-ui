import { useMediaQuery } from "./use-media-query"
import { useBreakpoint } from "./use-breakpoint"
import getClosestValue from "./get-closest"

/**
 * React hook for getting the value for the current breakpoint from the
 * provided responsive values object.
 *
 * @example
 * const width = useBreakpointValue({ base: '150px', md: '250px' })
 */
export function useBreakpointValue<T = any>(values: Record<string, T>) {
  const breakpoint = useBreakpoint()
  if (!breakpoint) return
  return getClosestValue(values, breakpoint)
}

/**
 * React hook used to get the user's animation preference.
 */
export function useAnimationPreference() {
  const isReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  return !isReducedMotion
}

/**
 * React hook for getting the user's color mode preference.
 */
export function useColorModePreference() {
  const isLight = useMediaQuery("(prefers-color-scheme: light)")
  const isDark = useMediaQuery("(prefers-color-scheme: dark)")

  if (isLight) return "light"
  if (isDark) return "dark"
}
