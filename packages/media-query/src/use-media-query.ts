import { useEnvironment } from "@chakra-ui/react-env"
import { isBrowser, isFunction } from "@chakra-ui/utils"
import { startTransition, useEffect, useLayoutEffect, useState } from "react"

const useSafeLayoutEffect = isBrowser ? useLayoutEffect : useEffect

export type UseMediaQueryOptions = {
  fallback?: boolean | boolean[]
  ssr?: boolean
}

/**
 * React hook that tracks state of a CSS media query
 *
 * @param query the media query to match
 * @param options the media query options { fallback, ssr }
 */
export function useMediaQuery(
  query: string | string[],
  options: UseMediaQueryOptions = {},
): boolean[] {
  const { ssr = true, fallback } = options

  const env = useEnvironment()

  const queries = Array.isArray(query) ? query : [query]

  let fallbackValues = Array.isArray(fallback) ? fallback : [fallback]
  fallbackValues = fallbackValues.filter((v) => v != null) as boolean[]

  const [value, setValue] = useState(() => {
    return queries.map((query, index) => ({
      media: query,
      matches: ssr
        ? !!fallbackValues[index]
        : env.window.matchMedia(query).matches,
    }))
  })

  useSafeLayoutEffect(() => {
    // set initial matches
    if (ssr) {
      startTransition(() => {
        setValue(
          queries.map((query) => ({
            media: query,
            matches: env.window.matchMedia(query).matches,
          })),
        )
      })
    }

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
