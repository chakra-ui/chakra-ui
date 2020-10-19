import { useTheme } from "@chakra-ui/system"
import React from "react"
import createMediaQueries from "./create-media-query"

interface Listener {
  mediaQuery: MediaQueryList
  handleChange: () => void
}

export interface Breakpoint {
  breakpoint: string
  maxWidth?: string
  minWidth: string
}

/**
 * React hook used to get the current responsive media breakpoint.
 *
 * @param defaultBreakpoint default breakpoint name
 * (in non-window environments like SSR)
 *
 * For SSR, you can use a package like [is-mobile](https://github.com/kaimallea/isMobile)
 * to get the default breakpoint value from the user-agent
 */
export function useBreakpoint(defaultBreakpoint?: string) {
  const { breakpoints } = useTheme()

  const mediaQueries = React.useMemo(
    () => createMediaQueries({ base: "0px", ...breakpoints }),
    [breakpoints],
  )

  const [currentBreakpoint, setCurrentBreakpoint] = React.useState(() => {
    if (!defaultBreakpoint) return undefined
    const mediaQuery = mediaQueries.find(
      (query) => query.breakpoint === defaultBreakpoint,
    )

    if (mediaQuery) {
      const { query, ...breakpoint } = mediaQuery
      return breakpoint
    }

    return undefined
  })

  const current = currentBreakpoint?.breakpoint

  const update = React.useCallback(
    (query: MediaQueryList, breakpoint: Breakpoint) => {
      if (query.matches && current !== breakpoint.breakpoint) {
        setCurrentBreakpoint(breakpoint)
      }
    },
    [current],
  )

  React.useEffect(() => {
    const listeners = new Set<Listener>()

    mediaQueries.forEach(({ query, ...breakpoint }) => {
      const mediaQuery = window.matchMedia(query)

      // trigger an initial update to determine media query
      update(mediaQuery, breakpoint)

      const handleChange = () => {
        update(mediaQuery, breakpoint)
      }

      // add media query-listener
      mediaQuery.addListener(handleChange)

      // push the media query list handleChange
      // so we can use it to remove Listener
      listeners.add({ mediaQuery, handleChange })

      return () => {
        // clean up 1
        mediaQuery.removeListener(handleChange)
      }
    })

    return () => {
      // clean up 2: for safety
      listeners.forEach(({ mediaQuery, handleChange }) => {
        mediaQuery.removeListener(handleChange)
      })
      listeners.clear()
    }
  }, [mediaQueries, breakpoints, update])

  return current
}
