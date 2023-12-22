import { useTheme } from "../system"
import { isObject } from "@chakra-ui/utils/is"
import { useMediaQuery } from "./use-media-query"

export type UseBreakpointOptions = {
  ssr?: boolean
  fallback?: string
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

  const breakpoints = theme.__breakpoints!.details.map(
    ({ minMaxQuery, breakpoint }) => ({
      breakpoint,
      query: minMaxQuery.replace("@media screen and ", ""),
    }),
  )

  const fallback = breakpoints.map((bp) => bp.breakpoint === opts.fallback)
  const values = useMediaQuery(
    breakpoints.map((bp) => bp.query),
    { fallback, ssr: opts.ssr },
  )

  const index = values.findIndex((value) => value == true)
  return breakpoints[index]?.breakpoint ?? opts.fallback
}
