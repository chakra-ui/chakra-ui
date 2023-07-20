import { useMediaQuery, UseMediaQueryOptions } from "./use-media-query"

/**
 * React hook used to get the user's animation preference.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-prefers-reduced-motion
 */
export function usePrefersReducedMotion(
  options?: UseMediaQueryOptions,
): boolean {
  const [prefersReducedMotion] = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
    options,
  )
  return prefersReducedMotion
}

/**
 * React hook for getting the user's color mode preference.
 */
export function useColorModePreference(
  options?: UseMediaQueryOptions,
): "dark" | "light" | undefined {
  const [isLight, isDark] = useMediaQuery(
    ["(prefers-color-scheme: light)", "(prefers-color-scheme: dark)"],
    options,
  )

  if (isLight) return "light"
  if (isDark) return "dark"
  return undefined
}
