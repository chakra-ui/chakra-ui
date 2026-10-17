"use client"

import {
  type CollectionOptions,
  type ListCollection,
  createListCollection,
} from "@ark-ui/react/collection"
import { useCallback, useMemo, useRef, useState } from "react"
import {
  type AsyncListLoadResult,
  useAsyncList,
  useControllableState,
  useLiveRef,
} from "../../hooks"
import type { CommandItem, CommandSelectionDetails } from "./command"
import {
  type PreparedCommand,
  createCommandMatcher,
  prepareCommand,
} from "./command-score"

export interface CommandLoadDetails<T extends CommandItem = CommandItem> {
  /**
   * The query to load items for.
   */
  query: string
  /**
   * The open page, or `null` at the top level.
   */
  page: T | null
  /**
   * Aborted when a newer load starts or the component unmounts.
   */
  signal: AbortSignal
  /**
   * Where the page to load starts. `undefined` for the first page.
   */
  cursor?: string | undefined
}

export type CommandLoadResult<T> = T[] | AsyncListLoadResult<T>

export interface UseCommandCollectionProps<T extends CommandItem> extends Omit<
  CollectionOptions<T>,
  "items"
> {
  /**
   * The items to search locally. An item with a `parent` lives on that item's
   * page.
   */
  initialItems?: T[] | readonly T[] | undefined
  /**
   * Scores an item from 0 (hidden) to 1. Defaults to a fuzzy match on the
   * label and `keywords`. Pass `null` to show the items as given, e.g. when a
   * server already filtered them.
   */
  filter?: ((item: T, query: string) => number) | null | undefined
  /**
   * The maximum number of items to show.
   */
  limit?: number | undefined
  /**
   * Loads items for the query. They show after the local items. Runs again
   * when the page changes. Return `{ items, cursor }` to load more pages with
   * `loadMore`.
   */
  load?:
    | ((details: CommandLoadDetails<T>) => Promise<CommandLoadResult<T>>)
    | undefined
  /**
   * The controlled query.
   */
  query?: string | undefined
  /**
   * Called when the query changes.
   */
  onQueryChange?: ((query: string) => void) | undefined
  /**
   * The query to rank with. Defaults to `query`. Pass a deferred or debounced
   * copy to keep typing responsive on large lists.
   */
  filterQuery?: string | undefined
  /**
   * Whether a query also matches items in nested pages.
   * @default false
   */
  deepSearch?: boolean | undefined
  /**
   * Called when the current page changes.
   */
  onPageChange?: ((page: T | null) => void) | undefined
}

export interface UseCommandCollectionReturn<T extends CommandItem> {
  /**
   * The ranked items to show.
   */
  collection: ListCollection<T>
  /**
   * The current query, as shown in the input.
   */
  query: string
  /**
   * The query the collection is ranked with.
   */
  filterQuery: string
  /**
   * Ranks the items on the open page for a query right away and returns the
   * top one.
   */
  getFirstMatch: (query: string) => T | undefined
  /**
   * Updates the query.
   */
  search: (query: string) => void
  /**
   * Whether `load` is waiting for results.
   */
  loading: boolean
  /**
   * The error from the last `load`, if any.
   */
  error: Error | undefined
  /**
   * Runs `load` again for the current query.
   */
  reload: VoidFunction
  /**
   * Whether `load` has more pages.
   */
  hasMore: boolean
  /**
   * Loads the next page and appends its items.
   */
  loadMore: VoidFunction
  /**
   * The open page, or `null` at the top level.
   */
  page: T | null
  /**
   * The pages from the top level to the open page.
   */
  pages: T[]
  /**
   * Opens a page by item value, or the top level for `null`.
   */
  setPage: (value: string | null) => void
  /**
   * Goes back to the previous page. Returns `false` when there's none.
   */
  popPage: () => boolean
  /**
   * Whether the item has children or sets `page: true`.
   */
  isPage: (item: T) => boolean
  /**
   * The item's ancestors below the open page.
   */
  getPath: (item: T) => T[]
  /**
   * Clears the query and starts over at the top level, or at the given page.
   */
  reset: (page?: string | null) => void
  /**
   * The item to highlight after going back: the one the user came from.
   */
  highlightedValue: string | null
  /**
   * Opens the page of a selected item that is a page. Returns `true` when it
   * did, so the command stays open.
   */
  onSelect: (details: CommandSelectionDetails) => boolean
  /**
   * Handles Backspace (up a page) and Escape (back). `Command.Input` calls it.
   */
  onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const EMPTY: never[] = []
const ROOT = "\0root"

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
    query: queryProp,
    onQueryChange,
    filterQuery: filterQueryProp,
    deepSearch = false,
    onPageChange,
    ...collectionOptions
  } = props

  const [query, setQuery] = useControllableState({
    value: queryProp,
    defaultValue: "",
    onChange: onQueryChange,
  })
  const filterQuery = filterQueryProp ?? query

  const [pageValue, setPageValue] = useState<string | null>(null)
  const [highlightedValue, setHighlightedValue] = useState<string | null>(null)
  const queriesRef = useRef(new Map<string, string>())
  const historyRef = useRef<(string | null)[]>([])

  const optionsRef = useLiveRef({ ...collectionOptions, filter })
  const preparedRef = useRef(new WeakMap<T, PreparedCommand>())
  const lastSearchRef = useRef<LastSearch<T> | null>(null)

  const tree = useMemo(
    () =>
      buildTree(initialItems, (item) =>
        String(optionsRef.current.itemToValue?.(item) ?? item.value ?? ""),
      ),
    [initialItems],
  )

  const page = pageValue != null ? (tree.items.get(pageValue) ?? null) : null
  const pageKey = page ? tree.toValue(page) : ROOT

  const pages = useMemo(
    () => (page ? [...getAncestors(tree, page), page] : EMPTY),
    [tree, page],
  )

  const getScope = (query: string) =>
    deepSearch && query
      ? getDescendants(tree, pageKey)
      : (tree.children.get(pageKey) ?? EMPTY)

  const deep = deepSearch && !!filterQuery
  const scope = useMemo(() => getScope(filterQuery), [tree, pageKey, deep])

  const loaded = useAsyncList({
    filterText: query,
    dependencies: [pageKey],
    load: load
      ? ({ filterText, signal, cursor }) =>
          load({ query: filterText, page, signal, cursor })
      : undefined,
  })

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

  const searchLocal = (items: readonly T[], query: string, narrow: boolean) => {
    const last = narrow ? lastSearchRef.current : null
    const pool =
      last && last.source === items && query.startsWith(last.query)
        ? last.matches
        : items
    const match = createCommandMatcher(query)
    const matches = rankItems(pool, query, (item) => match(prepare(item)))
    if (narrow) lastSearchRef.current = { source: items, query, matches }
    return matches
  }

  const rank = (items: readonly T[], query: string, narrow: boolean) => {
    const { filter, groupBy } = optionsRef.current
    const score = filter && ((item: T) => filter(item, query))

    const local =
      filter === null
        ? [...items]
        : score
          ? rankItems(items, query, score)
          : searchLocal(items, query, narrow)
    const remote = score ? rankItems(loaded.items, query, score) : loaded.items

    const merged = keepGroupOrder(
      [...local, ...remote],
      [...items, ...loaded.items],
      groupBy,
    )
    return limit == null ? merged : merged.slice(0, limit)
  }

  const collection = useMemo(() => {
    const { filter, ...options } = optionsRef.current
    return createListCollection<T>({
      ...options,
      items: rank(scope, filterQuery, true),
    })
  }, [scope, loaded.items, filterQuery, limit])

  const getFirstMatch = (query: string) =>
    rank(getScope(query), query, false)[0]

  const stateRef = useLiveRef({ pages, query, tree, onPageChange })

  const navigate = useCallback(
    (options: { value: string | null; push: boolean }) => {
      const { value, push } = options
      const { pages, query, tree, onPageChange } = stateRef.current
      const current = pages.at(-1)
      const currentValue = current ? tree.toValue(current) : null

      if (value === currentValue) return
      if (value != null && !tree.items.has(value)) return

      historyRef.current = updateHistory(historyRef.current, {
        from: currentValue,
        to: value,
        push,
      })

      const depth =
        value == null
          ? 0
          : pages.findIndex((item) => tree.toValue(item) === value) + 1
      const from = value == null || depth > 0 ? pages[depth] : undefined

      queriesRef.current.set(current ? tree.toValue(current) : ROOT, query)
      setQuery(from ? (queriesRef.current.get(value ?? ROOT) ?? "") : "")
      setHighlightedValue(from ? tree.toValue(from) : null)
      setPageValue(value)

      onPageChange?.(value != null ? (tree.items.get(value) ?? null) : null)
    },
    [setQuery],
  )

  const setPage = useCallback(
    (value: string | null) => navigate({ value, push: true }),
    [navigate],
  )

  const popPage = useCallback(() => {
    const previous = historyRef.current.at(-1)
    if (previous === undefined) return false
    navigate({ value: previous, push: false })
    return true
  }, [navigate])

  const goUp = useCallback(() => {
    const { pages, tree } = stateRef.current
    if (!pages.length) return false
    const parent = pages.at(-2)
    navigate({ value: parent ? tree.toValue(parent) : null, push: false })
    return true
  }, [navigate])

  const reset = useCallback(
    (value: string | null = null) => {
      queriesRef.current.clear()
      historyRef.current = []
      setQuery("")
      setHighlightedValue(null)
      setPageValue(value)
    },
    [setQuery],
  )

  const isPage = useCallback(
    (item: T) => item.page === true || tree.children.has(tree.toValue(item)),
    [tree],
  )

  const getPath = useCallback(
    (item: T) => getAncestors(tree, item, pageKey),
    [tree, pageKey],
  )

  const onSelect = useCallback(
    (details: CommandSelectionDetails) => {
      const item = tree.items.get(details.itemValue)
      if (!item || !isPage(item)) return false
      setPage(details.itemValue)
      return true
    },
    [tree, isPage, setPage],
  )

  const onInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.defaultPrevented) return
      const handled =
        event.key === "Escape"
          ? popPage()
          : event.key === "Backspace" && !event.currentTarget.value && goUp()
      if (handled) event.preventDefault()
    },
    [popPage, goUp],
  )

  return {
    collection,
    query,
    filterQuery,
    getFirstMatch,
    search: setQuery,
    loading: loaded.loading,
    error: loaded.error,
    reload: loaded.reload,
    hasMore: loaded.hasMore,
    loadMore: loaded.loadMore,
    page,
    pages,
    setPage,
    popPage,
    isPage,
    getPath,
    reset,
    highlightedValue,
    onSelect,
    onInputKeyDown,
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

interface Tree<T> {
  items: Map<string, T>
  children: Map<string, T[]>
  toValue: (item: T) => string
}

function buildTree<T extends CommandItem>(
  items: readonly T[],
  toValue: (item: T) => string,
): Tree<T> {
  const byValue = new Map<string, T>()
  for (const item of items) byValue.set(toValue(item), item)

  const children = new Map<string, T[]>()
  for (const item of items) {
    const parent =
      item.parent != null && byValue.has(item.parent) ? item.parent : ROOT
    const list = children.get(parent)
    if (list) list.push(item)
    else children.set(parent, [item])
  }

  return { items: byValue, children, toValue }
}

function updateHistory(
  history: (string | null)[],
  options: { from: string | null; to: string | null; push: boolean },
) {
  const visited = history.lastIndexOf(options.to)
  if (visited >= 0) return history.slice(0, visited)
  return options.push ? [...history, options.from] : history
}

function getAncestors<T extends CommandItem>(
  tree: Tree<T>,
  item: T,
  stop = ROOT,
): T[] {
  const path: T[] = []
  let parent = tree.items.get(item.parent ?? "")

  while (parent && tree.toValue(parent) !== stop && !path.includes(parent)) {
    path.unshift(parent)
    parent = tree.items.get(parent.parent ?? "")
  }

  return path
}

function getDescendants<T>(tree: Tree<T>, key: string): T[] {
  const seen = new Set<T>()

  const visit = (items: T[] | undefined) => {
    for (const item of items ?? EMPTY) {
      if (seen.has(item)) continue
      seen.add(item)
      visit(tree.children.get(tree.toValue(item)))
    }
  }

  visit(tree.children.get(key))
  return [...seen]
}
