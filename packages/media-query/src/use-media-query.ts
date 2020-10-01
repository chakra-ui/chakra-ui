import * as React from "react"
import { isBrowser } from "@chakra-ui/utils"

const useSafeLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect

/**
 * React hook that tracks state of a CSS media query
 *
 * @param query the media query to match
 */
export function useMediaQuery(query: string): boolean {
  const isSupported = isBrowser && "matchMedia" in window

  const [matches, setMatches] = React.useState(
    isSupported ? !!window.matchMedia(query).matches : false,
  )

  useSafeLayoutEffect(() => {
    if (!isSupported) return

    const mediaQueryList = window.matchMedia(query)
    const listener = () => setMatches(!!mediaQueryList.matches)

    mediaQueryList.addListener(listener)

    listener()

    return () => {
      mediaQueryList.removeListener(listener)
    }
  }, [query])

  return matches
}
