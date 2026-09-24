"use client"

import { useState, useSyncExternalStore } from "react"

function listen(mql: MediaQueryList, callback: () => void) {
  try {
    mql.addEventListener("change", callback)
    return () => mql.removeEventListener("change", callback)
  } catch {
    mql.addListener(callback)
    return () => mql.removeListener(callback)
  }
}

export interface UseMediaQueryOptions {
  fallback?: boolean[] | undefined
  ssr?: boolean | undefined
  getWindow?: (() => typeof window | undefined) | undefined
}

function createMediaQueryStore(
  queries: string[],
  fallback: boolean[],
  getWindow?: () => typeof window | undefined,
) {
  const getWin = () => getWindow?.() ?? window
  const listeners = new Set<() => void>()
  let cache: boolean[] = queries.map((_, i) => !!fallback[i])
  let mqls: MediaQueryList[] | null = null

  const getMqls = () => {
    if (!mqls) mqls = queries.map((q) => getWin().matchMedia(q))
    return mqls
  }

  const notify = () => {
    for (const cb of listeners) cb()
  }

  const subscribe = (callback: () => void) => {
    listeners.add(callback)
    const cleanups = getMqls().map((mql) => listen(mql, notify))
    return () => {
      listeners.delete(callback)
      cleanups.forEach((fn) => fn())
    }
  }

  const getSnapshot = (): boolean[] => {
    if (typeof document === "undefined") return cache
    const next = getMqls().map((mql) => mql.matches)
    if (cache.length === next.length && cache.every((v, i) => v === next[i])) {
      return cache
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
