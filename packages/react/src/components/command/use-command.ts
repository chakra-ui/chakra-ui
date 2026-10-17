"use client"

import type { ListCollection } from "@ark-ui/react/collection"
import {
  type Combobox as ArkCombobox,
  type UseComboboxReturn,
  useCombobox,
} from "@ark-ui/react/combobox"
import { useEffect, useRef } from "react"
import { useControllableState } from "../../hooks"
import { createSplitProps } from "../../utils"
import type { CommandItem, CommandSelectionDetails } from "./command"
import type { UseCommandCollectionReturn } from "./use-command-collection"

const comboboxPropKeys = [
  "defaultHighlightedValue",
  "defaultInputValue",
  "highlightedValue",
  "id",
  "ids",
  "inputValue",
  "navigate",
  "onHighlightChange",
  "onInputValueChange",
  "onSelect",
  "scrollToIndexFn",
] as const

type ComboboxOnlyProps<T extends CommandItem> = Pick<
  ArkCombobox.RootBaseProps<T>,
  (typeof comboboxPropKeys)[number]
>

/**
 * What `Command.Root` reads from the `command` prop.
 */
export interface CommandSource<
  T extends CommandItem = CommandItem,
> extends UseCommandCollectionReturn<T> {
  /**
   * Return `true` to keep the command open after a selection.
   */
  onSelect?: ((details: CommandSelectionDetails) => boolean) | undefined
  /**
   * The item to highlight next, e.g. the one the user came back from.
   */
  highlightedValue?: string | null | undefined
  /**
   * Goes back one page. Returns `false` when there's nowhere to go.
   */
  popPage?: (() => boolean) | undefined
}

export interface UseCommandProps<
  T extends CommandItem = CommandItem,
> extends ComboboxOnlyProps<T> {
  /**
   * The items to show. Not needed when `command` is passed.
   */
  collection?: ListCollection<T> | undefined
  /**
   * The value of `useCommandCollection` or `useCommandPageCollection`.
   */
  command?: CommandSource<T> | undefined
  /**
   * Whether results are loading. Defaults to `command.loading`.
   */
  loading?: boolean | undefined
  /**
   * Whether selecting an item calls `onClose`.
   * @default true
   */
  closeOnSelect?: boolean | undefined
  /**
   * Called when a selection should close the command.
   */
  onClose?: VoidFunction | undefined
}

export interface UseCommandReturn<T extends CommandItem = CommandItem> {
  /**
   * Whether results are loading.
   */
  loading: boolean | undefined
  /**
   * The value of `useCommandCollection` or `useCommandPageCollection`, if any.
   */
  command: CommandSource<T> | undefined
  /**
   * The underlying combobox API, e.g. `highlightedValue` and `focus`.
   */
  combobox: UseComboboxReturn<T>
  /**
   * Selects an item as if the user picked it.
   */
  selectItem: (item: T) => void
}

export function useCommand<T extends CommandItem = CommandItem>(
  props: UseCommandProps<T>,
): UseCommandReturn<T> {
  const {
    loading: loadingProp,
    closeOnSelect = true,
    onClose,
    inputValue: inputValueProp,
    defaultInputValue = "",
    onInputValueChange,
    command,
    collection: collectionProp,
    ...restProps
  } = props

  const collection = (command?.collection ?? collectionProp)!
  const loading = loadingProp ?? command?.loading

  const [inputValue, setInputValue] = useControllableState({
    value: command ? command.query : inputValueProp,
    defaultValue: defaultInputValue,
  })

  const onSelect = restProps.onSelect

  const runSelect = (
    details: CommandSelectionDetails,
    item: T | null | undefined,
  ) => {
    if (typeof item?.onSelect === "function") item.onSelect(details)
    onSelect?.(details)
    if (command?.onSelect?.(details)) return

    if (item?.closeOnSelect ?? closeOnSelect) onClose?.()
  }

  const combobox = useCombobox<T>({
    inputBehavior: "autohighlight",
    selectionBehavior: "preserve",
    loopFocus: false,
    defaultHighlightedValue: collection.firstValue,
    ...restProps,
    collection,
    inputValue,
    onInputValueChange(details) {
      setInputValue(details.inputValue)
      command?.search(details.inputValue)
      onInputValueChange?.(details)
    },
    open: true,
    disableLayer: true,
    onSelect(details) {
      runSelect(details, collection.find(details.itemValue))
    },
    value: [],
  })

  useHighlightSync(combobox, command?.highlightedValue ?? null)

  const selectItem = (item: T) => {
    const itemValue = collection.getItemValue(item) ?? ""
    runSelect({ itemValue, value: [] }, item)
  }

  return { loading, command, combobox, selectItem }
}

/**
 * Keeps an item highlighted as the collection changes: the preferred item when
 * it changes, else the current one if it's still there, else the first.
 */
function useHighlightSync<T extends CommandItem>(
  combobox: UseComboboxReturn<T>,
  preferred: string | null,
) {
  const { collection, highlightedValue } = combobox
  const preferredRef = useRef(preferred)
  const pendingRef = useRef<string | null>(null)

  useEffect(() => {
    if (preferred !== preferredRef.current) {
      preferredRef.current = preferred
      pendingRef.current = preferred
    }

    const pending = pendingRef.current
    if (pending && pending !== highlightedValue && collection.has(pending)) {
      combobox.setHighlightValue(pending)
      return
    }
    pendingRef.current = null

    if (highlightedValue && collection.has(highlightedValue)) return

    const first = collection.firstValue
    if (first) combobox.setHighlightValue(first)
  }, [collection, preferred, highlightedValue])
}

/**
 * Splits `useCommand` props from the ones for the root element.
 */
export const splitCommandProps = createSplitProps<UseCommandProps<any>>([
  ...comboboxPropKeys,
  "collection",
  "command",
  "loading",
  "closeOnSelect",
  "onClose",
])
