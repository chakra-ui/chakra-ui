import { useEnvironment } from "@chakra-ui/react-env"
import { isBrowser } from "@chakra-ui/utils"
import * as React from "react"

const useSafeLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect

/**
 * React hook that tracks state of a CSS media query
 *
 * @param query the media query to match
 */
export function useMediaQuery(query: string | string[]): boolean[] {
  const env = useEnvironment()
  const queries = Array.isArray(query) ? query : [query]
  const isSupported = isBrowser && "matchMedia" in env.window

  const [matches, setMatches] = React.useState(
    queries.map((query) =>
      isSupported ? !!env.window.matchMedia(query).matches : false,
    ),
  )

  useSafeLayoutEffect(() => {
    if (!isSupported) return undefined

    const mediaQueryList = queries.map((query) => env.window.matchMedia(query))

    const listenerList = mediaQueryList.map((mediaQuery, index) => {
      const listener = () =>
        setMatches((prev) =>
          prev.map((prevValue, idx) =>
            index === idx ? !!mediaQuery.matches : prevValue,
          ),
        )

      mediaQuery.addListener(listener)

      return listener
    })

    return () => {
      mediaQueryList.forEach((mediaQuery, index) => {
        mediaQuery.removeListener(listenerList[index])
      })
    }
  }, [query])

  return matches
}
