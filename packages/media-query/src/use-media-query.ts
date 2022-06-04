import { useEnvironment } from "@chakra-ui/react-env"
import { isBrowser, isFunction } from "@chakra-ui/utils"
import { useEffect, useLayoutEffect, useState } from "react"

const useSafeLayoutEffect = isBrowser ? useLayoutEffect : useEffect

/**
 * React hook that tracks state of a CSS media query
 *
 * @param query the media query to match
 */
export function useMediaQuery(query: string | string[]): boolean[] {
  const env = useEnvironment()

  const queries = Array.isArray(query) ? query : [query]

  const [value, setValue] = useState(() => {
    return queries.map((query) => ({
      media: query,
      matches: env.window.matchMedia(query).matches,
    }))
  })

  useSafeLayoutEffect(() => {
    const mql = queries.map((query) => env.window.matchMedia(query))

    const handler = (evt: MediaQueryListEvent) => {
      setValue((prev) => {
        return prev.slice().map((item) => {
          if (item.media === evt.media) return { ...item, matches: evt.matches }
          return item
        })
      })
    }

    mql.forEach((mql) => {
      if (isFunction(mql.addListener)) mql.addListener(handler)
      else mql.addEventListener("change", handler)
    })

    return () => {
      mql.forEach((mql) => {
        if (isFunction(mql.removeListener)) mql.removeListener(handler)
        else mql.removeEventListener("change", handler)
      })
    }
  }, [])

  return value.map((item) => item.matches)
}
