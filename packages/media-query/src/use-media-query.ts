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

    const listenerList = mediaQueryList.map(() => {
      const listener = () => {
        const isEqual = (prev: boolean[], curr: boolean[]) =>
          prev.length === curr.length &&
          prev.every((elem, idx) => elem === curr[idx])

        const currentMatches = mediaQueryList.map(
          (mediaQuery) => mediaQuery.matches,
        )

        if (!isEqual(matches, currentMatches)) {
          setMatches(currentMatches)
        }
      }

      env.window.addEventListener("resize", listener)

      return listener
    })

    return () => {
      mediaQueryList.forEach((_, index) => {
        env.window.removeEventListener("resize", listenerList[index])
      })
    }
  }, [query])

  return matches
}
