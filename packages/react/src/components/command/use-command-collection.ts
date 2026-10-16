"use client"

import {
  type CollectionOptions,
  type ListCollection,
  createListCollection,
} from "@ark-ui/react/collection"
import { useMemo, useRef, useState } from "react"
import { type AsyncListLoadDetails, useAsyncList } from "../../hooks"
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
   * Scores an item against the query, from 0 (hidden) to 1 (best match).
   * Defaults to a fuzzy match on the item's text and `keywords`.
   */
  filter?: ((item: T, query: string) => number) | undefined
  /**
   * The maximum number of items to show.
   */
  limit?: number | undefined
  /**
   * Loads items for a query, e.g. from a server. Results are ranked by the
   * server and shown after the local items, unless `filter` is set.
   */
  load?: ((details: CommandLoadDetails) => Promise<T[]>) | undefined
  /**
   * How long to wait after typing stops before calling `load`, in ms. The
   * first load runs right away.
   * @default 200
   */
  debounce?: number | undefined
}

export interface UseCommandCollectionReturn<T extends CommandItem> {
  /**
   * The ranked collection to pass to `Command.Root`.
   */
  collection: ListCollection<T>
  /**
   * The current query.
   */
  query: string
  /**
   * Updates the query. Pass it the input value from `onInputValueChange`.
   */
  search: (query: string) => void
  /**
   * Whether `load` is waiting for results.
   */
  loading: boolean
  /**
   * The error thrown by the last `load`, if any.
   */
  error: Error | undefined
  /**
   * Runs `load` again for the current query.
   */
  retry: VoidFunction
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
    debounce = 200,
    ...collectionOptions
  } = props

  const [query, setQuery] = useState("")
  const loaded = useAsyncList({ query, load, debounce })

  const optionsRef = useRef({ ...collectionOptions, filter })
  optionsRef.current = { ...collectionOptions, filter }

  const preparedRef = useRef(new WeakMap<T, PreparedCommand>())
  const lastSearchRef = useRef<LastSearch<T> | null>(null)

  const collection = useMemo(() => {
    const { filter, ...options } = optionsRef.current

    let local: T[]
    if (filter) {
      local = rankItems(initialItems, query, (item) => filter(item, query))
    } else {
      const prepare = (item: T) => {
        let prepared = preparedRef.current.get(item)
        if (!prepared) {
          const label = options.itemToString?.(item) ?? item.label ?? ""
          prepared = prepareCommand(String(label), item.keywords)
          preparedRef.current.set(item, prepared)
        }
        return prepared
      }
      const last = lastSearchRef.current
      const pool =
        last && last.source === initialItems && query.startsWith(last.query)
          ? last.matches
          : initialItems
      const match = createCommandMatcher(query)
      local = rankItems(pool, query, (item) => match(prepare(item)))
      lastSearchRef.current = {
        source: initialItems,
        query,
        matches: query ? local : [...initialItems],
      }
    }

    const remote = filter
      ? rankItems(loaded.items, query, (item) => filter(item, query))
      : loaded.items
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
