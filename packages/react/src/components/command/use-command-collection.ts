"use client"

import {
  type CollectionOptions,
  type ListCollection,
  createListCollection,
} from "@ark-ui/react/collection"
import { useMemo, useRef } from "react"
import {
  type AsyncListLoadDetails,
  useAsyncList,
  useControllableState,
  useLiveRef,
} from "../../hooks"
import type { CommandItem } from "./command"
import {
  type PreparedCommand,
  createCommandMatcher,
  prepareCommand,
} from "./command-score"

export interface CommandLoadDetails extends AsyncListLoadDetails {}

export interface UseCommandCollectionProps<T extends CommandItem> extends Omit<
  CollectionOptions<T>,
  "items" | "groupSort"
> {
  /**
   * The items to search locally.
   */
  initialItems?: T[] | readonly T[] | undefined
  /**
   * Scores an item from 0 (hidden) to 1. Defaults to a fuzzy match on the
   * label and `keywords`.
   */
  filter?: ((item: T, query: string) => number) | undefined
  /**
   * The maximum number of items to show.
   */
  limit?: number | undefined
  /**
   * Loads items for the query. They show after the local items.
   */
  load?: ((details: CommandLoadDetails) => Promise<T[]>) | undefined
  /**
   * Changing it clears the loaded items and loads again.
   */
  loadKey?: string | number | undefined
  /**
   * The controlled query.
   */
  query?: string | undefined
  /**
   * Called when the query changes.
   */
  onQueryChange?: ((query: string) => void) | undefined
}

export interface UseCommandCollectionReturn<T extends CommandItem> {
  collection: ListCollection<T>
  query: string
  search: (query: string) => void
  loading: boolean
  error: Error | undefined
  retry: VoidFunction
  /**
   * Clears the query.
   */
  reset: VoidFunction
}

const EMPTY: never[] = []

interface LastSearch<T> {
  source: readonly T[]
  query: string
  matches: T[]
}

export function useCommandCollection<T extends CommandItem>(
  props: UseCommandCollectionProps<T>,
): UseCommandCollectionReturn<T> {
  const {
    initialItems = EMPTY,
    filter,
    limit,
    load,
    loadKey,
    query: queryProp,
    onQueryChange,
    ...collectionOptions
  } = props

  const [query, setQuery] = useControllableState({
    value: queryProp,
    defaultValue: "",
    onChange: onQueryChange,
  })
  const loaded = useAsyncList({ query, load, key: loadKey })

  const optionsRef = useLiveRef({ ...collectionOptions, filter })
  const preparedRef = useRef(new WeakMap<T, PreparedCommand>())
  const lastSearchRef = useRef<LastSearch<T> | null>(null)

  const prepare = (item: T) => {
    let prepared = preparedRef.current.get(item)
    if (!prepared) {
      const { itemToString } = optionsRef.current
      const label = itemToString?.(item) ?? item.label ?? ""
      prepared = prepareCommand(String(label), item.keywords)
      preparedRef.current.set(item, prepared)
    }
    return prepared
  }

  // Narrows from the previous matches while the query keeps growing
  const searchLocal = (items: readonly T[]) => {
    const last = lastSearchRef.current
    const pool =
      last && last.source === items && query.startsWith(last.query)
        ? last.matches
        : items
    const match = createCommandMatcher(query)
    const matches = rankItems(pool, query, (item) => match(prepare(item)))
    lastSearchRef.current = { source: items, query, matches }
    return matches
  }

  const collection = useMemo(() => {
    const { filter, ...options } = optionsRef.current
    const score = filter && ((item: T) => filter(item, query))

    const local = score
      ? rankItems(initialItems, query, score)
      : searchLocal(initialItems)
    const remote = score ? rankItems(loaded.items, query, score) : loaded.items

    const merged = keepGroupOrder(
      [...local, ...remote],
      [...initialItems, ...loaded.items],
      options.groupBy,
    )

    const items = limit == null ? merged : merged.slice(0, limit)
    return createListCollection<T>({ ...options, items })
  }, [initialItems, loaded.items, query, limit])

  return {
    collection,
    query,
    search: setQuery,
    loading: loaded.loading,
    error: loaded.error,
    retry: loaded.retry,
    reset: () => setQuery(""),
  }
}

////////////////////////////////////////////////////////////////////////////////////

function rankItems<T>(
  items: readonly T[],
  query: string,
  score: (item: T) => number,
): T[] {
  if (!query) return [...items]
  return items
    .map((item, index) => ({ item, index, score: score(item) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((entry) => entry.item)
}

function keepGroupOrder<T>(
  ranked: T[],
  source: T[],
  groupBy: ((item: T, index: number) => string) | undefined,
): T[] {
  if (!groupBy) return ranked
  const order = new Map<string, number>()
  source.forEach((item, index) => {
    const group = groupBy(item, index)
    if (!order.has(group)) order.set(group, order.size)
  })
  return ranked
    .map((item, index) => ({ item, index, group: groupBy(item, index) }))
    .sort(
      (a, b) =>
        (order.get(a.group) ?? 0) - (order.get(b.group) ?? 0) ||
        a.index - b.index,
    )
    .map((entry) => entry.item)
}

////////////////////////////////////////////////////////////////////////////////
