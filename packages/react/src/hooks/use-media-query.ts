"use client"

import { useState, useSyncExternalStore } from "react"

export interface UseMediaQueryOptions {
  fallback?: boolean[] | undefined
  ssr?: boolean | undefined
  getWindow?(): typeof window
}

function createMediaQueryStore(
  queries: string[],
  fallback: boolean[],
  getWindow?: () => typeof window,
) {
  const getWin = () => getWindow?.() ?? window
  const listeners = new Set<() => void>()
  let cache: boolean[] = queries.map((_, i) => !!fallback[i])

  const notify = () => {
    for (const cb of listeners) cb()
  }

  const subscribe = (callback: () => void) => {
    listeners.add(callback)
    const win = getWin()
    const mqls = queries.map((q) => win.matchMedia(q))
    mqls.forEach((mql) => mql.addEventListener("change", notify))
    return () => {
      listeners.delete(callback)
      mqls.forEach((mql) => mql.removeEventListener("change", notify))
    }
  }

  const getSnapshot = (): boolean[] => {
    if (typeof document === "undefined") return cache
    const win = getWin()
    const next = queries.map((q) => win.matchMedia(q).matches)
    const prev = cache
    if (prev.length === next.length && prev.every((v, i) => v === next[i])) {
      return prev
    }
    cache = next
    return next
  }

  const getServerSnapshot = (): boolean[] => cache

  return { subscribe, getSnapshot, getServerSnapshot }
}

export function useMediaQuery(
  query: string[],
  options: UseMediaQueryOptions = {},
): boolean[] {
  const { fallback: _fallback = [], getWindow } = options

  const queries = Array.isArray(query) ? query : [query]
  const fallback = _fallback?.filter((v) => v != null) as boolean[]

  const queryKey = queries.join("\0")

  const [store, setStore] = useState(() =>
    createMediaQueryStore(queries, fallback, getWindow),
  )

  const [prevQueryKey, setPrevQueryKey] = useState(queryKey)

  if (queryKey !== prevQueryKey) {
    setStore(createMediaQueryStore(queries, fallback, getWindow))
    setPrevQueryKey(queryKey)
  }

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  )
}
