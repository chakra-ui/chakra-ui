"use client"

import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useLiveRef } from "./use-live-ref"

export type AsyncListDependency = string | number | boolean | null | undefined

export interface AsyncListLoadDetails<C = string> {
  /**
   * The text to filter the items by.
   */
  filterText: string
  /**
   * Aborted when a newer load starts or the component unmounts.
   */
  signal: AbortSignal
  /**
   * Where the page to load starts. `undefined` for the first page.
   */
  cursor?: C | undefined
}

export interface AsyncListLoadResult<T, C = string> {
  /**
   * The loaded items.
   */
  items: T[]
  /**
   * Where the next page starts. Leave it out when there are no more pages.
   */
  cursor?: C | undefined
}

export interface UseAsyncListProps<T, C = string> {
  /**
   * The text to filter the items by. Changing it starts a new load.
   * @default ""
   */
  filterText?: string | undefined
  /**
   * Loads the items. Skipped when not provided.
   */
  load?:
    | ((
        details: AsyncListLoadDetails<C>,
      ) => Promise<T[] | AsyncListLoadResult<T, C>>)
    | undefined
  /**
   * Values that identify what is being loaded, such as a page or tab.
   * Changing them clears the items and loads again.
   */
  dependencies?: AsyncListDependency[] | undefined
}

export interface UseAsyncListReturn<T, C = string> {
  /**
   * The items loaded so far. They stay in place while the next load for the
   * same dependencies is running.
   */
  items: T[]
  /**
   * Whether a load is running.
   */
  loading: boolean
  /**
   * Whether there are no items.
   */
  empty: boolean
  /**
   * The error thrown by the latest load, if any.
   */
  error: Error | undefined
  /**
   * Where the next page starts, from the latest load.
   */
  cursor: C | undefined
  /**
   * Whether there are more pages to load.
   */
  hasMore: boolean
  /**
   * Loads the next page and appends its items.
   */
  loadMore: VoidFunction
  /**
   * Loads the first page again.
   */
  reload: VoidFunction
  /**
   * Cancels the running load.
   */
  abort: VoidFunction
}

interface AsyncListResult<T, C> {
  depsKey: string
  items: T[]
  cursor: C | undefined
}

const EMPTY: never[] = []

/**
 * Loads a list of items for a filter text, aborting stale requests and
 * keeping only the latest results.
 */
export function useAsyncList<T, C = string>(
  props: UseAsyncListProps<T, C>,
): UseAsyncListReturn<T, C> {
  const { filterText = "", load, dependencies = EMPTY } = props
  const depsKey = JSON.stringify(dependencies)

  const [result, setResult] = useState<AsyncListResult<T, C>>({
    depsKey,
    items: [],
    cursor: undefined,
  })
  const [pending, setPending] = useState(!!load)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [attempt, setAttempt] = useState(0)

  const loadRef = useLiveRef(load)
  const stateRef = useLiveRef({ filterText, depsKey, pending, result })
  const controllerRef = useRef<AbortController | null>(null)

  const start = useCallback(
    (options: { cursor: C | undefined; append: boolean }) => {
      const load = loadRef.current
      if (!load) return

      controllerRef.current?.abort()
      const controller = new AbortController()
      controllerRef.current = controller

      const { filterText, depsKey } = stateRef.current
      setPending(true)

      load({
        filterText,
        signal: controller.signal,
        cursor: options.cursor,
      }).then(
        (data) => {
          if (controller.signal.aborted) return
          const page = Array.isArray(data) ? { items: data } : data
          startTransition(() => {
            setResult((prev) => ({
              depsKey,
              items: options.append
                ? [...prev.items, ...page.items]
                : page.items,
              cursor: page.cursor,
            }))
            setError(undefined)
            setPending(false)
          })
        },
        (reason) => {
          if (controller.signal.aborted) return
          if (!options.append)
            setResult({ depsKey, items: [], cursor: undefined })
          setError(reason instanceof Error ? reason : new Error(String(reason)))
          setPending(false)
        },
      )

      return controller
    },
    [loadRef, stateRef],
  )

  useEffect(() => {
    const controller = start({ cursor: undefined, append: false })
    return () => controller?.abort()
  }, [filterText, attempt, depsKey, start])

  const loadMore = useCallback(() => {
    const { pending, result, depsKey } = stateRef.current
    if (pending || result.depsKey !== depsKey || result.cursor == null) return
    start({ cursor: result.cursor, append: true })
  }, [start, stateRef])

  const reload = useCallback(() => setAttempt((count) => count + 1), [])

  const abort = useCallback(() => {
    controllerRef.current?.abort()
    setPending(false)
  }, [])

  const stale = result.depsKey !== depsKey
  const items = stale ? EMPTY : result.items
  const cursor = stale ? undefined : result.cursor
  const loading = pending || (!!load && stale)

  return {
    items,
    loading,
    empty: items.length === 0,
    error,
    cursor,
    hasMore: cursor != null,
    loadMore,
    reload,
    abort,
  }
}
