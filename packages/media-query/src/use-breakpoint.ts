import React from "react"
import { useEnvironment } from "@chakra-ui/react-env"
import { useTheme } from "@chakra-ui/system"

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
  const { __breakpoints } = useTheme()
  const env = useEnvironment()

  const queries = React.useMemo(
    () =>
      __breakpoints?.details.map(({ minMaxQuery, breakpoint }) => ({
        breakpoint,
        query: minMaxQuery.replace("@media screen and ", ""),
      })) ?? [],
    [__breakpoints],
  )

  const [currentBreakpoint, setCurrentBreakpoint] = React.useState(() => {
    if (defaultBreakpoint) {
      // use default breakpoint to ensure render consistency in SSR + CSR environments
      // => first render on the client has to match the render on the server
      const fallbackBreakpointDetail = queries.find(
        ({ breakpoint }) => breakpoint === defaultBreakpoint,
      )
      if (fallbackBreakpointDetail) {
        return fallbackBreakpointDetail.breakpoint
      }
    }

    if (env.window.matchMedia) {
      // set correct breakpoint on first render if no default breakpoint was provided
      const matchingBreakpointDetail = queries.find(
        ({ query }) => env.window.matchMedia(query).matches,
      )
      if (matchingBreakpointDetail) {
        return matchingBreakpointDetail.breakpoint
      }
    }

    return undefined
  })

  React.useEffect(() => {
    const allUnregisterFns = queries.map(({ breakpoint, query }) => {
      const mediaQueryList = env.window.matchMedia(query)

      if (mediaQueryList.matches) {
        setCurrentBreakpoint(breakpoint)
      }

      const handleChange = (ev: MediaQueryListEvent) => {
        if (ev.matches) {
          setCurrentBreakpoint(breakpoint)
        }
      }

      // add media query listener
      if (typeof mediaQueryList.addEventListener === "function") {
        mediaQueryList.addEventListener("change", handleChange)
      } else {
        mediaQueryList.addListener(handleChange)
      }

      // return unregister fn
      return () => {
        if (typeof mediaQueryList.removeEventListener === "function") {
          mediaQueryList.removeEventListener("change", handleChange)
        } else {
          mediaQueryList.removeListener(handleChange)
        }
      }
    })

    return () => {
      allUnregisterFns.forEach((unregister) => unregister())
    }
  }, [queries, __breakpoints, env.window])

  return currentBreakpoint
}
