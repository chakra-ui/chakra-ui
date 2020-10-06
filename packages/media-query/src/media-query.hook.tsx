import { useMediaQuery } from "./use-media-query"

/**
 * React hook used to get the user's animation preference.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion] = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  )
  return prefersReducedMotion
}

/**
 * React hook for getting the user's color mode preference.
 */
export function useColorModePreference(): "dark" | "light" | undefined {
  const [isDark, isLight] = useMediaQuery([
    "(prefers-color-scheme: light)",
    "(prefers-color-scheme: dark)",
  ])

  if (isLight) return "light"
  if (isDark) return "dark"
}
