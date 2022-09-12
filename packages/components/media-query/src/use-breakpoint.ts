import { useTheme } from "@chakra-ui/system"
import { isObject } from "@chakra-ui/shared-utils"
import { useMediaQuery } from "./use-media-query"

export type UseBreakpointOptions = {
  ssr?: boolean
  fallback?: string
  /**
   * The names of the breakpoints that should be checked,
   * if not specified, all the breakpoints will be checked.
   */
  breakpoints?: string[]
}

/**
 * React hook used to get the current responsive media breakpoint.
 *
 * For SSR, you can use a package like [is-mobile](https://github.com/kaimallea/isMobile)
 * to get the default breakpoint value from the user-agent.
 */
export function useBreakpoint(arg?: string | UseBreakpointOptions) {
  const opts = isObject(arg) ? arg : { fallback: arg ?? "base" }
  const theme = useTheme()

  const allBreakpoints = theme.__breakpoints!.details

  let fallbackPassed = false
  const breakpoints = allBreakpoints
    .map(({ minWQuery, breakpoint }) => {
      const bp = {
        breakpoint,
        query: minWQuery.replace("@media screen and ", ""),
        fallback: !fallbackPassed,
      }

      if (breakpoint === opts.fallback) {
        fallbackPassed = true
      }

      return bp
    })
    .filter(
      ({ breakpoint }) =>
        opts.breakpoints == null || opts.breakpoints.includes(breakpoint),
    )

  const fallback = breakpoints.map(({ fallback }) => fallback)
  const values = useMediaQuery(
    breakpoints.map((bp) => bp.query),
    { fallback, ssr: opts.ssr },
  )

  // find highest matched breakpoint
  const index = values.lastIndexOf(true)

  return breakpoints[index]?.breakpoint ?? opts.fallback
}
