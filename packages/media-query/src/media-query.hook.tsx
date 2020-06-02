import { useTheme } from "@chakra-ui/system"
import { Dict, isNumber, objectKeys } from "@chakra-ui/utils"
import { useMediaQuery } from "@chakra-ui/hooks"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ResizeObserver } from "@juggle/resize-observer"

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

type BreakpointValues<T> = { [breakpoint: string]: T }

/**
 * React hook for getting the value for the current breakpoint from the
 * provided responsive values object.
 *
 * @example
 *
 * const width = useBreakpointValue({ base: '150px', md: '250px' })
 * return <Button width={width}>I'm {width} wide!</Button>
 */
export function useBreakpointValue<T = any>(values: BreakpointValues<T>) {
  const breakpoint = useBreakpoint()

  // if breakpoint is undefined, we'll return undefined
  if (!breakpoint) return

  // if we have no value for the current breakpoint, return the `base`
  // breakpoint value
  const baseValue = values.base

  return values[breakpoint] || baseValue
}

/**
 * React hook for getting the user's animation preference. Returns `false` if
 * user prefers reduced motion.
 *
 * Inspired by @kripod:
 * https://github.com/kripod/react-hooks/blob/10f1b489078a6c61bd2226258feef1d2ced915a2/packages/web-api-hooks/src/useMotionPreference.ts
 */
export function useAnimationPreference() {
  const isReduce = useMediaQuery("(prefers-reduced-motion: reduce)")
  return !isReduce
}

/**
 * React hook for getting the user's color mode preference. Returns `"light"`,
 * `"dark"`, or `undefined` if no preference exists.
 *
 * Inspired by @kripod:
 * https://github.com/kripod/react-hooks/blob/10f1b489078a6c61bd2226258feef1d2ced915a2/packages/web-api-hooks/src/useColorSchemePreference.ts
 */
export function useColorModePreference() {
  const isLight = useMediaQuery("(prefers-color-scheme: light)")
  const isDark = useMediaQuery("(prefers-color-scheme: dark)")

  if (isLight) return "light"
  if (isDark) return "dark"
}

/**
 * React hook for getting the width and height of a component.
 *
 * Inspired by @kripod:
 * https://github.com/kripod/react-hooks/blob/10f1b489078a6c61bd2226258feef1d2ced915a2/packages/web-api-hooks/src/useSize.ts
 */
export function useViewportSize(
  ref: React.RefObject<HTMLElement>,
): Readonly<[number, number]> {
  const [size, setSize] = useState<Readonly<[number, number]>>([0, 0])

  useEffect(() => {
    if (!ref.current) return undefined

    const observer = new ResizeObserver(([entry]) => {
      const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0]
      setSize([width, height])
    })
    observer.observe(ref.current)

    return (): void => {
      observer.disconnect()
    }
  }, [ref])

  return size
}
