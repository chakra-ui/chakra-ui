import { useMediaQuery } from "./use-media-query"

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
