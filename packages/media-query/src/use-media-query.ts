import { useEnvironment } from "@chakra-ui/react-env"
import { isBrowser } from "@chakra-ui/utils"
import { useState, useLayoutEffect, useEffect } from "react"

const useSafeLayoutEffect = isBrowser ? useLayoutEffect : useEffect

/**
 * React hook that tracks state of a CSS media query
 *
 * @param query the media query to match
 * @param defaultValues the default values to match
 */
export function useMediaQuery(
  query: string | string[],
  defaultValues?: boolean | boolean[],
): boolean[] {
  const env = useEnvironment()

  const queries = Array.isArray(query) ? query : [query]

  let defaults = Array.isArray(defaultValues) ? defaultValues : [defaultValues]
  defaults = defaults.filter((v) => v != null) as boolean[]

  const [value, setValue] = useState(() => {
    if (!isBrowser) {
      return queries.map((query, index) => ({
        media: query,
        matches: defaults[index] ?? false,
      }))
    }
    return queries.map((query) => ({
      media: query,
      matches: env.window.matchMedia(query).matches,
    }))
  })

  useSafeLayoutEffect(() => {
    if (!isBrowser) return

    const handler = (evt: MediaQueryListEvent) => {
      setValue((prev) => {
        return prev.slice().map((item) => {
          if (item.media === evt.media) return { ...item, matches: evt.matches }
          return item
        })
      })
    }

    const mql = queries.map((query) => env.window.matchMedia(query))

    mql.forEach((mql) => {
      if (typeof mql.addListener === "function") mql.addListener(handler)
      else mql.addEventListener("change", handler)
    })

    return () => {
      mql.forEach((mql) => {
        if (typeof mql.removeListener === "function")
          mql.removeListener(handler)
        else mql.removeEventListener("change", handler)
      })
    }
  }, [])

  return value.map((item) => item.matches)
}
