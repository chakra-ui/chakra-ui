import { useTheme } from "@chakra-ui/system"
import { useMediaQuery } from "./use-media-query"

/**
 * React hook used to get the current responsive media breakpoint.
 *
 * @param [defaultBreakpoint="base"] default breakpoint name
 * (in non-window environments like SSR)
 *
 * For SSR, you can use a package like [is-mobile](https://github.com/kaimallea/isMobile)
 * to get the default breakpoint value from the user-agent
 */
export function useBreakpoint(
  defaultBreakpoint = "base", // default value ensures SSR+CSR consistency
) {
  const theme = useTheme()

  const breakpoints = theme.__breakpoints!.details.map(
    ({ minMaxQuery, breakpoint }) => ({
      breakpoint,
      query: minMaxQuery.replace("@media screen and ", ""),
    }),
  )

  const values = useMediaQuery(
    breakpoints.map((bp) => bp.query),
    breakpoints.map((bp) => bp.breakpoint === defaultBreakpoint),
  )

  const index = values.findIndex((value) => value == true)
  return breakpoints[index]?.breakpoint ?? defaultBreakpoint
}
