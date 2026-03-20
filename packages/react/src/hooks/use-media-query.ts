"use client"

import { useState, useSyncExternalStore } from "react"

export interface UseMediaQueryOptions {
  fallback?: boolean[] | undefined
  ssr?: boolean | undefined
  getWindow?(): typeof window
}

class MediaQueryStore {
  private queries: string[]
  private getWindow?: () => typeof window
  private cache: boolean[]
  private listeners = new Set<() => void>()

  constructor(
    queries: string[],
    fallback: boolean[],
    getWindow?: () => typeof window,
  ) {
    this.queries = queries
    this.getWindow = getWindow
    this.cache = queries.map((_, i) => !!fallback[i])
  }

  private getWin = () => {
    return this.getWindow?.() ?? window
  }

  private notify = () => {
    for (const cb of this.listeners) cb()
  }

  subscribe = (callback: () => void) => {
    this.listeners.add(callback)
    const win = this.getWin()
    const mqls = this.queries.map((q) => win.matchMedia(q))
    mqls.forEach((mql) => mql.addEventListener("change", this.notify))
    return () => {
      this.listeners.delete(callback)
      mqls.forEach((mql) => mql.removeEventListener("change", this.notify))
    }
  }

  getSnapshot = (): boolean[] => {
    if (typeof document === "undefined") return this.cache
    const win = this.getWin()
    const next = this.queries.map((q) => win.matchMedia(q).matches)
    const prev = this.cache
    if (prev.length === next.length && prev.every((v, i) => v === next[i])) {
      return prev
    }
    this.cache = next
    return next
  }

  getServerSnapshot = (): boolean[] => {
    return this.cache
  }
}

export function useMediaQuery(
  query: string[],
  options: UseMediaQueryOptions = {},
): boolean[] {
  const { fallback: _fallback = [], getWindow } = options

  const queries = Array.isArray(query) ? query : [query]
  const fallback = _fallback?.filter((v) => v != null) as boolean[]

  const queryKey = queries.join("\0")

  const [store, setStore] = useState(
    () => new MediaQueryStore(queries, fallback, getWindow),
  )

  const [prevQueryKey, setPrevQueryKey] = useState(queryKey)

  if (queryKey !== prevQueryKey) {
    setStore(new MediaQueryStore(queries, fallback, getWindow))
    setPrevQueryKey(queryKey)
  }

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  )
}
