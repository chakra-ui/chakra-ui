"use client"

import { useCallback, useEffect, useState } from "react"
import { useLiveRef } from "./use-live-ref"

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
   * Identifies what is being loaded, such as a page or tab. Changing it
   * clears the items and loads again.
   */
  key?: string | number | undefined
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

const EMPTY: never[] = []

/**
 * Loads a list of items for a query, aborting stale requests and keeping
 * only the latest results.
 */
export function useAsyncList<T>(
  props: UseAsyncListProps<T>,
): UseAsyncListReturn<T> {
  const { query = "", load, key } = props

  const [result, setResult] = useState<{ key: typeof key; items: T[] }>({
    key,
    items: [],
  })
  const [pending, setPending] = useState(!!load)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [attempt, setAttempt] = useState(0)

  const loadRef = useLiveRef(load)

  useEffect(() => {
    if (!loadRef.current) return
    const controller = new AbortController()
    setPending(true)

    loadRef.current({ query, signal: controller.signal }).then(
      (items) => {
        if (controller.signal.aborted) return
        setResult({ key, items })
        setError(undefined)
        setPending(false)
      },
      (reason) => {
        if (controller.signal.aborted) return
        setResult({ key, items: [] })
        setError(reason instanceof Error ? reason : new Error(String(reason)))
        setPending(false)
      },
    )

    return () => controller.abort()
  }, [query, attempt, key])

  const retry = useCallback(() => setAttempt((count) => count + 1), [])

  const stale = result.key !== key
  const items = stale ? EMPTY : result.items
  const loading = pending || (!!load && stale)

  return { items, loading, error, retry }
}
