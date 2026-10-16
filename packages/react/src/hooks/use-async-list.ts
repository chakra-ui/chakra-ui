"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export interface AsyncListLoadDetails {
  /**
   * The query to load items for.
   */
  query: string
  /**
   * Aborted when a newer load starts or the component unmounts.
   */
  signal: AbortSignal
}

export interface UseAsyncListProps<T> {
  /**
   * The query to load items for. Changing it starts a new load.
   * @default ""
   */
  query?: string | undefined
  /**
   * Loads the items. Skipped when not provided.
   */
  load?: ((details: AsyncListLoadDetails) => Promise<T[]>) | undefined
  /**
   * How long to wait after the query stops changing before loading, in ms.
   * The first load runs right away.
   * @default 200
   */
  debounce?: number | undefined
}

export interface UseAsyncListReturn<T> {
  /**
   * The items from the latest successful load. They stay in place while the
   * next load is running.
   */
  items: T[]
  /**
   * Whether a load is running.
   */
  loading: boolean
  /**
   * The error thrown by the latest load, if any.
   */
  error: Error | undefined
  /**
   * Loads the current query again.
   */
  retry: VoidFunction
}

/**
 * Loads a list of items for a query, debouncing changes, aborting stale
 * requests, and keeping only the latest results.
 */
export function useAsyncList<T>(
  props: UseAsyncListProps<T>,
): UseAsyncListReturn<T> {
  const { query = "", load, debounce = 200 } = props
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(!!load)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [attempt, setAttempt] = useState(0)
  const loadRef = useRef(load)
  loadRef.current = load
  const hasLoaded = useRef(false)

  useEffect(() => {
    if (!loadRef.current) return
    const controller = new AbortController()
    setLoading(true)

    const delay = hasLoaded.current ? debounce : 0
    const timer = setTimeout(() => {
      loadRef.current?.({ query, signal: controller.signal }).then(
        (results) => {
          if (controller.signal.aborted) return
          hasLoaded.current = true
          setItems(results)
          setError(undefined)
          setLoading(false)
        },
        (reason) => {
          if (controller.signal.aborted) return
          setItems([])
          setError(reason instanceof Error ? reason : new Error(String(reason)))
          setLoading(false)
        },
      )
    }, delay)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, debounce, attempt])

  const retry = useCallback(() => setAttempt((count) => count + 1), [])

  return { items, loading, error, retry }
}
