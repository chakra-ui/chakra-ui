"use client"

import { useEffect, useState } from "react"
import { useCallbackRef } from "./use-callback-ref"

type MediaQueryCallback = (event: MediaQueryListEvent) => void

function listen(query: MediaQueryList, callback: MediaQueryCallback) {
  try {
    query.addEventListener("change", callback)
    return () => query.removeEventListener("change", callback)
  } catch (e) {
    query.addListener(callback)
    return () => query.removeListener(callback)
  }
}

export interface UseMediaQueryOptions {
  fallback?: boolean[]
  ssr?: boolean
  getWindow?(): typeof window
}

export function useMediaQuery(
  query: string[],
  options: UseMediaQueryOptions,
): boolean[] {
  const { fallback: _fallback, ssr = true, getWindow } = options
  const getWin = useCallbackRef(getWindow)

  const queries = Array.isArray(query) ? query : [query]

  const fallback = _fallback?.filter((v) => v != null) as boolean[]

  const [value, setValue] = useState(() => {
    return queries.map((query, index) => {
      if (!ssr) {
        const { media, matches } = (getWindow?.() ?? window).matchMedia(query)
        return { media, matches }
      }
      return { media: query, matches: !!fallback[index] }
    })
  })

  useEffect(() => {
    const win = getWin() ?? window
    setValue((prev) => {
      const current = queries.map((query) => {
        const { media, matches } = win.matchMedia(query)
        return { media, matches }
      })

      return prev.every(
        (v, i) =>
          v.matches === current[i].matches && v.media === current[i].media,
      )
        ? prev
        : current
    })

    const mql = queries.map((query) => win.matchMedia(query))

    const handler = (evt: MediaQueryListEvent) => {
      setValue((prev) => {
        return prev.slice().map((item) => {
          if (item.media === evt.media) return { ...item, matches: evt.matches }
          return item
        })
      })
    }

    const cleanups = mql.map((v) => listen(v, handler))
    return () => cleanups.forEach((fn) => fn())

    // eslint-disable-next-line
  }, [getWin])

  return value.map((item) => item.matches)
}
