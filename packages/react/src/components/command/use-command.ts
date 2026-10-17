"use client"

import type { ListCollection } from "@ark-ui/react/collection"
import {
  type Combobox as ArkCombobox,
  type UseComboboxReturn,
  useCombobox,
} from "@ark-ui/react/combobox"
import { useEffect, useRef } from "react"
import { useControllableState, useLiveRef } from "../../hooks"
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
> extends UseCommandCollectionReturn<T> {}

export interface UseCommandProps<
  T extends CommandItem = CommandItem,
> extends ComboboxOnlyProps<T> {
  /**
   * The items to show. Not needed when `command` is passed.
   */
  collection?: ListCollection<T> | undefined
  /**
   * The value of `useCommandCollection`.
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

type CommandModifierKeys = CommandSelectionDetails["modifiers"]

export interface CommandSelectItemOptions {
  /**
   * The modifier keys of the triggering event. Any of them keeps the command
   * open.
   */
  modifiers?: CommandModifierKeys | undefined
}

export interface UseCommandReturn<T extends CommandItem = CommandItem> {
  /**
   * Whether results are loading.
   */
  loading: boolean | undefined
  /**
   * The value of `useCommandCollection`, if any.
   */
  command: CommandSource<T> | undefined
  /**
   * The underlying combobox API, e.g. `highlightedValue` and `focus`.
   */
  combobox: UseComboboxReturn<T>
  /**
   * Selects an item as if the user picked it.
   */
  selectItem: (item: T, options?: CommandSelectItemOptions) => void
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
    if (command?.onSelect(details)) return

    const shouldClose = closeOnSelect && !hasModifierKey(details.modifiers)
    if (item?.closeOnSelect ?? shouldClose) onClose?.()
  }

  const combobox = useCombobox<T>({
    inputBehavior: "autohighlight",
    selectionBehavior: "preserve",
    loopFocus: false,
    defaultHighlightedValue: collection.firstValue,
    ...restProps,
    collection,
    loading: !!loading,
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

  useRestoreHighlight(combobox, command?.highlightedValue ?? null)

  const selectItem = (item: T, options: CommandSelectItemOptions = {}) => {
    const itemValue = collection.getItemValue(item) ?? ""
    const modifiers = options.modifiers ?? NO_MODIFIERS
    runSelect({ itemValue, value: [], modifiers }, item)
  }

  return { loading, command, combobox, selectItem }
}

const NO_MODIFIERS: CommandModifierKeys = {
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
}

const hasModifierKey = (modifiers: CommandModifierKeys) =>
  modifiers.metaKey ||
  modifiers.ctrlKey ||
  modifiers.shiftKey ||
  modifiers.altKey

/**
 * Highlights the item the user came back from, or the first item when the
 * highlighted one is removed.
 */
function useRestoreHighlight<T extends CommandItem>(
  combobox: UseComboboxReturn<T>,
  preferred: string | null,
) {
  const { collection, highlightedValue } = combobox
  const setHighlightRef = useLiveRef(combobox.setHighlightValue)
  const preferredRef = useRef(preferred)
  const pendingRef = useRef<string | null>(null)

  useEffect(() => {
    if (preferred !== preferredRef.current) {
      preferredRef.current = preferred
      pendingRef.current = preferred
    }

    const pending = pendingRef.current
    if (pending && pending !== highlightedValue && collection.has(pending)) {
      const frame = requestAnimationFrame(() =>
        setHighlightRef.current(pending),
      )
      return () => cancelAnimationFrame(frame)
    }
    pendingRef.current = null

    if (highlightedValue && collection.has(highlightedValue)) return

    const first = collection.firstValue
    if (first) setHighlightRef.current(first)
  }, [collection, preferred, highlightedValue, setHighlightRef])
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
