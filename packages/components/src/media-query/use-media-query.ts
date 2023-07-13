import { useEnvironment } from "@chakra-ui/react-env"
import { useEffect, useState } from "react"

export type UseMediaQueryOptions = {
  fallback?: boolean | boolean[]
  ssr?: boolean
}

/**
 * React hook that tracks state of a CSS media query
 *
 * @param query the media query to match
 * @param options the media query options { fallback, ssr }
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-media-query
 */
export function useMediaQuery(
  query: string | string[],
  options: UseMediaQueryOptions = {},
): boolean[] {
  const { ssr = true, fallback } = options

  const { getWindow } = useEnvironment()

  const queries = Array.isArray(query) ? query : [query]

  let fallbackValues = Array.isArray(fallback) ? fallback : [fallback]
  fallbackValues = fallbackValues.filter((v) => v != null) as boolean[]

  const [value, setValue] = useState(() => {
    return queries.map((query, index) => ({
      media: query,
      matches: ssr
        ? !!fallbackValues[index]
        : getWindow().matchMedia(query).matches,
    }))
  })

  useEffect(() => {
    const win = getWindow()
    setValue(
      queries.map((query) => ({
        media: query,
        matches: win.matchMedia(query).matches,
      })),
    )

    const mql = queries.map((query) => win.matchMedia(query))

    const handler = (evt: MediaQueryListEvent) => {
      setValue((prev) => {
        return prev.slice().map((item) => {
          if (item.media === evt.media) return { ...item, matches: evt.matches }
          return item
        })
      })
    }

    mql.forEach((mql) => {
      if (typeof mql.addListener === "function") {
        mql.addListener(handler)
      } else {
        mql.addEventListener("change", handler)
      }
    })

    return () => {
      mql.forEach((mql) => {
        if (typeof mql.removeListener === "function") {
          mql.removeListener(handler)
        } else {
          mql.removeEventListener("change", handler)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getWindow])

  return value.map((item) => item.matches)
}
