import { useEnvironment } from "@chakra-ui/react-env"
import { useEffect, useMemo, useState } from "react"

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

  const toArray = (item: any) => (Array.isArray(item) ? item : [item])

  const queries = useMemo(() => toArray(query), [query])

  let fallbackValues = useMemo(() => toArray(fallback), [fallback])

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

    const mediaQueryLists = queries.map((query) => win.matchMedia(query))

    const handler = (evt: MediaQueryListEvent) => {
      setValue((prev) => {
        return prev.slice().map((item) => {
          if (item.media === evt.media) return { ...item, matches: evt.matches }
          return item
        })
      })
    }

    mediaQueryLists.forEach((mediaQueryList) => {
      if (typeof mediaQueryList.addListener === "function") {
        mediaQueryList.addListener(handler)
      } else {
        mediaQueryList.addEventListener("change", handler)
      }
    })

    return () => {
      mediaQueryLists.forEach((mql) => {
        if (typeof mql.removeListener === "function") {
          mql.removeListener(handler)
        } else {
          mql.removeEventListener("change", handler)
        }
      })
    }
  }, [getWindow, queries])

  return value.map((item) => item.matches)
}
