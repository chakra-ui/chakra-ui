"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { useControllableState, useLiveRef } from "../../hooks"
import type { CommandItem, CommandSelectionDetails } from "./command"
import {
  type CommandLoadDetails,
  type UseCommandCollectionProps,
  type UseCommandCollectionReturn,
  useCommandCollection,
} from "./use-command-collection"

export interface CommandPageLoadDetails<
  T extends CommandItem,
> extends CommandLoadDetails {
  page: T | null
}

export interface UseCommandPagesProps<T extends CommandItem> extends Omit<
  UseCommandCollectionProps<T>,
  "load" | "loadKey"
> {
  /**
   * Loads items for the current page. Runs again when the page changes.
   */
  load?: ((details: CommandPageLoadDetails<T>) => Promise<T[]>) | undefined
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

export interface UseCommandPagesReturn<
  T extends CommandItem,
> extends UseCommandCollectionReturn<T> {
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
   * Goes back one page. Returns `false` at the top level.
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
   * Clears the query and returns to the top level.
   */
  reset: VoidFunction
  highlightedValue: string | null
  onSelect: (details: CommandSelectionDetails) => boolean
  /**
   * Pass to `Command.Input` to go back on Backspace or Escape.
   */
  onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  /**
   * Pass to `Command.Dialog` to go back on Escape instead of closing.
   */
  onEscapeKeyDown: (event: KeyboardEvent) => void
}

const EMPTY: never[] = []
const ROOT = "\0root"

export function useCommandPages<T extends CommandItem>(
  props: UseCommandPagesProps<T>,
): UseCommandPagesReturn<T> {
  const {
    initialItems = EMPTY,
    deepSearch = false,
    onPageChange,
    load,
    query: queryProp,
    onQueryChange,
    ...collectionProps
  } = props

  const [query, setQuery] = useControllableState({
    value: queryProp,
    defaultValue: "",
    onChange: onQueryChange,
  })

  const [pageValue, setPageValue] = useState<string | null>(null)
  const [highlightedValue, setHighlightedValue] = useState<string | null>(null)
  const queriesRef = useRef(new Map<string, string>())

  const itemToValueRef = useLiveRef(collectionProps.itemToValue)

  const tree = useMemo(
    () =>
      buildTree(initialItems, (item) =>
        String(itemToValueRef.current?.(item) ?? item.value ?? ""),
      ),
    [initialItems],
  )

  const page = pageValue != null ? (tree.items.get(pageValue) ?? null) : null
  const pageKey = page ? tree.toValue(page) : ROOT

  const pages = useMemo(
    () => (page ? [...getAncestors(tree, page), page] : EMPTY),
    [tree, page],
  )

  const deep = deepSearch && !!query
  const scope = useMemo(
    () => (deep ? getDescendants(tree, pageKey) : tree.children.get(pageKey)),
    [tree, pageKey, deep],
  )

  const pageRef = useLiveRef(page)
  const loadRef = useLiveRef(load)

  const collection = useCommandCollection<T>({
    ...collectionProps,
    initialItems: scope,
    query,
    onQueryChange: setQuery,
    loadKey: pageKey,
    load: load
      ? (details) => loadRef.current!({ ...details, page: pageRef.current })
      : undefined,
  })

  const stateRef = useLiveRef({ pages, query, tree, onPageChange })

  const setPage = useCallback(
    (value: string | null) => {
      const { pages, query, tree, onPageChange } = stateRef.current
      const current = pages.at(-1)

      if (value === (current ? tree.toValue(current) : null)) return
      if (value != null && !tree.items.has(value)) return

      // Going back to the top level or an open ancestor: restore its query
      // and highlight the page we came from
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

  const popPage = useCallback(() => {
    const { pages, tree } = stateRef.current
    if (!pages.length) return false

    const parent = pages.at(-2)
    setPage(parent ? tree.toValue(parent) : null)
    return true
  }, [setPage])

  const reset = useCallback(() => {
    queriesRef.current.clear()
    setQuery("")
    setHighlightedValue(null)
    setPageValue(null)
  }, [setQuery])

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
      const back =
        event.key === "Escape" ||
        (event.key === "Backspace" && !event.currentTarget.value)
      if (back && popPage()) event.preventDefault()
    },
    [popPage],
  )

  const onEscapeKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (popPage()) event.preventDefault()
    },
    [popPage],
  )

  return {
    ...collection,
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
    onEscapeKeyDown,
  }
}

////////////////////////////////////////////////////////////////////////////////////

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
