import { useTheme } from "@chakra-ui/system"
import { Dict, isNumber, objectKeys } from "@chakra-ui/utils"
import { useCallback, useEffect, useMemo, useState } from "react"

/**
 * useBreakpoint
 *
 * React hook for getting the current responsive media breakpoint.
 *
 * @param defaultBreakpoint default breakpoint name
 * (in non-window environments like SSR)
 *
 * For SSR, you can use a package like [is-mobile](https://github.com/juliangruber/is-mobile)
 * to get the default breakpoint value from the user-agent
 */

export function useBreakpoint(defaultBreakpoint?: string) {
  const theme = useTheme() as Dict

  const { breakpoints } = theme

  const mediaQueries = useMemo(
    () => createMediaQueries({ base: `0px`, ...breakpoints }),
    [breakpoints],
  )

  const [currentBreakpoint, setCurrentBreakpoint] = useState(() => {
    if (!defaultBreakpoint) return undefined
    const mediaQuery = mediaQueries.find(
      query => query.breakpoint === defaultBreakpoint,
    )

    if (mediaQuery) {
      const { query, ...breakpoint } = mediaQuery
      return breakpoint
    }

    return undefined
  })

  const current = currentBreakpoint?.breakpoint

  const update = useCallback(
    (query: MediaQueryList, breakpoint: Breakpoint) => {
      if (query.matches && current !== breakpoint.breakpoint) {
        setCurrentBreakpoint(breakpoint)
      }
    },
    [current],
  )

  useEffect(() => {
    const listeners: Listener[] = []

    mediaQueries.forEach(({ query, ...breakpoint }) => {
      const mediaQuery = window.matchMedia(query)

      // trigger an initial update to determine media query
      update(mediaQuery, breakpoint)

      const handleChange = () => {
        update(mediaQuery, breakpoint)
      }

      // add media query-listender
      mediaQuery.addListener(handleChange)

      // push the media query list handleChange
      // so we can use it to remove Listener
      listeners.push({ mediaQuery, handleChange })

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
    }
  }, [mediaQueries, breakpoints, update])

  return currentBreakpoint?.breakpoint
}

/**
 * @todo add useBreakpointValue hook
 */

export type Breakpoint = {
  breakpoint: string
  maxWidth?: string
  minWidth: string
}

type MediaQuery = {
  breakpoint: string
  maxWidth?: string
  minWidth: string
  query: string
}

type Listener = {
  mediaQuery: MediaQueryList
  handleChange: () => void
}

const toMediaString = (val: any) => (isNumber(val) ? `${val}px` : val)

/**
 * Create a media query string from the breakpoints,
 * using a combination of `min-width` and `max-width`.
 *
 * @param breakpoints the breakpoint object in theme
 */
const createMediaQueries = (breakpoints: Dict) => {
  // sort the breakpoints in descending order
  const sorted = objectKeys(breakpoints).sort(
    (a, b) => parseInt(breakpoints[b]) - parseInt(breakpoints[a]),
  )

  // create a min-max media query string
  return sorted.map((breakpoint, index) => {
    const minWidth = breakpoints[breakpoint]
    const next = sorted[index - 1] as string | undefined
    const maxWidth = next ? breakpoints[next] : undefined

    let query = ""

    if (parseInt(minWidth) >= 0) {
      query = `(min-width: ${toMediaString(minWidth)})`
    }

    if (maxWidth) {
      if (query) query += " and "
      query += `(max-width: ${toMediaString(maxWidth)})`
    }

    const mediaQuery: MediaQuery = {
      breakpoint,
      maxWidth,
      minWidth,
      query,
    }

    return mediaQuery
  })
}
