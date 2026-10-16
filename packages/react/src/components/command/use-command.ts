"use client"

import {
  type Combobox as ArkCombobox,
  type UseComboboxReturn,
  useCombobox,
} from "@ark-ui/react/combobox"
import { useRef } from "react"
import { useControllableState } from "../../hooks"
import type { CommandItem } from "./command"

type ComboboxOnlyProps<T extends CommandItem> = Omit<
  ArkCombobox.RootBaseProps<T>,
  | "open"
  | "defaultOpen"
  | "onOpenChange"
  | "positioning"
  | "disableLayer"
  | "multiple"
>

export interface UseCommandProps<
  T extends CommandItem = CommandItem,
> extends ComboboxOnlyProps<T> {
  /**
   * Whether the command is loading results. Shows the `Loading` part, hides
   * `Empty`, and is reflected on the root and indicator parts.
   * @default false
   */
  loading?: boolean | undefined
  /**
   * Whether selecting an item calls `onClose`. Defaults to `true` in action
   * mode and `false` in single and multiple selection modes.
   */
  closeOnSelect?: boolean | undefined
  /**
   * How selection behaves. The default `none` runs commands without
   * persisting a selected state; use `onSelect` to execute them. Pass
   * `single` or `multiple` to build pickers where selection persists.
   * @default "none"
   */
  selectionMode?: "none" | "single" | "multiple" | undefined
  /**
   * Called when a selection should dismiss the command, such as closing the
   * dialog or popover that contains it.
   */
  onClose?: VoidFunction | undefined
}

export interface UseCommandReturn<T extends CommandItem = CommandItem> {
  /**
   * Whether the command is loading results.
   */
  loading: boolean | undefined
  /**
   * The underlying combobox API, e.g. `inputValue` and `setInputValue`.
   */
  combobox: UseComboboxReturn<T>
  /**
   * Overrides `onClose` from the provider that renders the command.
   * @internal
   */
  closeRef: React.MutableRefObject<VoidFunction | undefined>
}

export function useCommand<T extends CommandItem = CommandItem>(
  props: UseCommandProps<T>,
): UseCommandReturn<T> {
  const {
    loading,
    closeOnSelect: closeOnSelectProp,
    selectionMode = "none",
    onClose,
    inputValue: inputValueProp,
    defaultInputValue = "",
    onInputValueChange,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useControllableState({
    value: inputValueProp,
    defaultValue: defaultInputValue,
  })

  const actionMode = selectionMode === "none"
  const closeOnSelect = closeOnSelectProp ?? actionMode
  const onSelect = restProps.onSelect
  const closeRef = useRef<VoidFunction | undefined>(undefined)

  const combobox = useCombobox<T>({
    inputBehavior: "autohighlight",
    selectionBehavior: "preserve",
    loopFocus: false,
    defaultHighlightedValue: restProps.collection.firstValue,
    ...restProps,
    inputValue,
    onInputValueChange(details) {
      setInputValue(details.inputValue)
      onInputValueChange?.(details)
    },
    open: true,
    disableLayer: true,
    multiple: selectionMode === "multiple",
    onSelect(details) {
      const item = restProps.collection.find(details.itemValue) as
        | CommandItem
        | null
        | undefined
      if (typeof item?.onSelect === "function") item.onSelect(details)
      onSelect?.(details)
      const itemCloseOnSelect =
        typeof item?.closeOnSelect === "boolean"
          ? item.closeOnSelect
          : undefined
      const close = closeRef.current ?? onClose
      if (itemCloseOnSelect ?? closeOnSelect) close?.()
    },
    ...(actionMode ? { value: [] } : {}),
  })

  return { loading, combobox, closeRef }
}

const commandPropKeys = [
  "allowCustomValue",
  "alwaysSubmitOnEnter",
  "autoFocus",
  "closeOnSelect",
  "collection",
  "composite",
  "defaultHighlightedValue",
  "defaultInputValue",
  "defaultValue",
  "disabled",
  "form",
  "highlightedValue",
  "id",
  "ids",
  "inputBehavior",
  "inputValue",
  "invalid",
  "loading",
  "loopFocus",
  "name",
  "navigate",
  "onFocusOutside",
  "onHighlightChange",
  "onInputValueChange",
  "onInteractOutside",
  "onPointerDownOutside",
  "onSelect",
  "onValueChange",
  "openOnChange",
  "openOnClick",
  "openOnKeyPress",
  "placeholder",
  "readOnly",
  "required",
  "scrollToIndexFn",
  "selectionBehavior",
  "selectionMode",
  "translations",
  "value",
] as const

/**
 * Splits `useCommand` props from the rest, which go to the root element.
 * `onClose` stays with the rest so the provider can register it.
 */
export function splitCommandProps<T extends UseCommandProps<any>>(
  props: T,
): [UseCommandProps<any>, Omit<T, (typeof commandPropKeys)[number]>] {
  const commandProps: Record<string, unknown> = {}
  const restProps: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(props)) {
    if ((commandPropKeys as readonly string[]).includes(key)) {
      commandProps[key] = value
    } else {
      restProps[key] = value
    }
  }
  return [commandProps as unknown as UseCommandProps<any>, restProps as any]
}
