"use client"

import {
  type Assign,
  type CollectionItem,
  useEnvironmentContext,
} from "@ark-ui/react"
import { Combobox as ArkCombobox } from "@ark-ui/react/combobox"
import { Dialog as ArkDialog, useDialog } from "@ark-ui/react/dialog"
import {
  type JSX,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { createContext } from "../../create-context"
import { useCallbackRef } from "../../hooks"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { dataAttr } from "../../utils"
import { CheckIcon, SearchIcon } from "../icons"
import { Spinner } from "../spinner"

////////////////////////////////////////////////////////////////////////////////////

const {
  withRootProvider,
  withContext,
  useStyles: useCommandPaletteStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "commandPalette" })

export { useCommandPaletteStyles }

////////////////////////////////////////////////////////////////////////////////////

interface CommandPaletteContextValue {
  loading: boolean | undefined
  comboboxProps: ArkCombobox.RootProps<any>
  registerItemAction: (
    value: string,
    action: CommandPaletteItemAction,
  ) => VoidFunction
}

interface CommandPaletteItemAction {
  closeOnSelect?: boolean | undefined
  onSelect?: ((details: CommandPaletteSelectionDetails) => void) | undefined
}

const [CommandPaletteConfigProvider, useCommandPaletteConfig] =
  createContext<CommandPaletteContextValue>({
    name: "CommandPaletteConfigContext",
    hookName: "useCommandPaletteConfig",
    providerName: "<CommandPalette.Root />",
  })

////////////////////////////////////////////////////////////////////////////////////

type DialogOnlyProps = Pick<
  ArkDialog.RootProps,
  | "open"
  | "defaultOpen"
  | "onOpenChange"
  | "modal"
  | "closeOnEscape"
  | "closeOnInteractOutside"
  | "initialFocusEl"
  | "finalFocusEl"
  | "restoreFocus"
  | "preventScroll"
  | "trapFocus"
  | "lazyMount"
  | "unmountOnExit"
>

type ComboboxOnlyProps<T extends CollectionItem> = Omit<
  ArkCombobox.RootBaseProps<T>,
  | "open"
  | "defaultOpen"
  | "onOpenChange"
  | "positioning"
  | "disableLayer"
  | "multiple"
>

export interface CommandPaletteRootBaseProps<T extends CollectionItem = any>
  extends
    Assign<ComboboxOnlyProps<T>, SlotRecipeProps<"commandPalette">>,
    DialogOnlyProps,
    UnstyledProp {
  /**
   * Whether the command palette is loading results.
   * Reflected on the panel and indicator parts.
   * @default false
   */
  loading?: boolean | undefined
  /**
   * Keyboard shortcuts that toggle the palette. `mod` resolves to Command on
   * macOS and Control elsewhere.
   * @default ["mod+k"]
   */
  hotkeys?: string[] | undefined
  /** Options for the keyboard shortcuts. */
  hotkeyOptions?: CommandPaletteHotkeyOptions | undefined
  /**
   * Whether selecting an item closes the palette. Defaults to `true` in action
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
}

export interface CommandPaletteHotkeyOptions {
  /** Whether the shortcuts are enabled. @default true */
  enabled?: boolean | undefined
  /** Whether matching keyboard events call `preventDefault`. @default true */
  preventDefault?: boolean | undefined
  /** Whether shortcuts run from inputs, textareas, selects, and editable content. @default false */
  allowInEditable?: boolean | undefined
}

export interface CommandPaletteRootProps<
  T extends CollectionItem = any,
> extends CommandPaletteRootBaseProps<T> {
  children: React.ReactNode
}

function matchesHotkey(event: KeyboardEvent, hotkey: string) {
  const parts = hotkey.toLowerCase().split("+")
  const key = parts.at(-1)
  if (event.key.toLowerCase() !== key) return false

  const hasMod = parts.includes("mod")
  const hasMeta = parts.includes("meta") || parts.includes("cmd")
  const hasControl = parts.includes("ctrl") || parts.includes("control")
  if (hasMod) {
    if (!event.metaKey && !event.ctrlKey) return false
  } else if (event.metaKey !== hasMeta || event.ctrlKey !== hasControl) {
    return false
  }
  if (parts.includes("shift") !== event.shiftKey) return false
  if (parts.includes("alt") !== event.altKey) return false
  return true
}

function isEditableTarget(target: EventTarget | null, doc: Document) {
  const HTMLElement = doc.defaultView?.HTMLElement
  if (!HTMLElement || !(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  )
}

const hotkeyRegistrations = new WeakMap<Document, symbol[]>()
const defaultHotkeys = ["mod+k"]

function useHotkeys(
  hotkeys: string[],
  toggle: () => void,
  options: CommandPaletteHotkeyOptions,
  open: boolean,
) {
  const env = useEnvironmentContext()
  const toggleRef = useCallbackRef(toggle)
  const registration = useRef(Symbol("command-palette-hotkeys"))
  const {
    enabled = true,
    preventDefault = true,
    allowInEditable = false,
  } = options

  useEffect(() => {
    if (!enabled || !hotkeys.length) return

    const doc = env.getDocument()
    const registrations = hotkeyRegistrations.get(doc) ?? []
    registrations.push(registration.current)
    hotkeyRegistrations.set(doc, registrations)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return
      if (registrations.at(-1) !== registration.current) return
      if (!open && !allowInEditable && isEditableTarget(event.target, doc)) {
        return
      }
      if (!hotkeys.some((hotkey) => matchesHotkey(event, hotkey))) return
      if (preventDefault) event.preventDefault()
      toggleRef()
    }

    doc.addEventListener("keydown", onKeyDown)
    return () => {
      doc.removeEventListener("keydown", onKeyDown)
      const index = registrations.indexOf(registration.current)
      if (index !== -1) registrations.splice(index, 1)
      if (!registrations.length) hotkeyRegistrations.delete(doc)
    }
  }, [env, hotkeys, open, allowInEditable, enabled, preventDefault, toggleRef])
}

const CommandPaletteRootBase = (props: CommandPaletteRootProps) => {
  const {
    open,
    defaultOpen,
    onOpenChange,
    modal,
    closeOnEscape,
    closeOnInteractOutside,
    initialFocusEl,
    finalFocusEl,
    restoreFocus,
    preventScroll,
    trapFocus,
    lazyMount = true,
    unmountOnExit = true,
    loading,
    hotkeys: hotkeysProp,
    hotkeyOptions,
    closeOnSelect: closeOnSelectProp,
    selectionMode = "none",
    children,
    ...restProps
  } = props

  const dialog = useDialog({
    open,
    defaultOpen,
    onOpenChange,
    modal,
    closeOnEscape,
    closeOnInteractOutside,
    initialFocusEl,
    finalFocusEl,
    restoreFocus,
    preventScroll,
    trapFocus,
  })

  const actionMode = selectionMode === "none"
  const closeOnSelect = closeOnSelectProp ?? actionMode
  const itemActions = useRef(new Map<string, CommandPaletteItemAction>())
  const onSelect = restProps.onSelect
  const registerItemAction = useCallback(
    (value: string, action: CommandPaletteItemAction): VoidFunction => {
      itemActions.current.set(value, action)
      return () => {
        itemActions.current.delete(value)
      }
    },
    [],
  )

  const comboboxProps: ArkCombobox.RootProps<any> = {
    ...(restProps as ArkCombobox.RootProps<any>),
    onSelect(details) {
      const action = itemActions.current.get(details.itemValue)
      action?.onSelect?.(details)
      onSelect?.(details)
      if (action?.closeOnSelect ?? closeOnSelect) dialog.setOpen(false)
    },
    multiple: selectionMode === "multiple",
    ...(actionMode ? { value: [], selectionBehavior: "clear" as const } : {}),
  }

  const hotkeys = hotkeysProp ?? defaultHotkeys
  useHotkeys(
    hotkeys,
    () => dialog.setOpen(!dialog.open),
    hotkeyOptions ?? {},
    dialog.open,
  )

  const config = useMemo(
    () => ({ loading, comboboxProps, registerItemAction }),
    [comboboxProps, loading, registerItemAction],
  )

  return (
    <CommandPaletteConfigProvider value={config}>
      <ArkDialog.RootProvider
        value={dialog}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
      >
        {children}
      </ArkDialog.RootProvider>
    </CommandPaletteConfigProvider>
  )
}

export interface CommandPaletteRootComponent {
  <T extends CollectionItem>(props: CommandPaletteRootProps<T>): JSX.Element
}

export const CommandPaletteRoot = withRootProvider<CommandPaletteRootProps>(
  CommandPaletteRootBase,
) as CommandPaletteRootComponent

////////////////////////////////////////////////////////////////////////////////////

export const CommandPalettePropsProvider =
  PropsProvider as React.Provider<CommandPaletteRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteTriggerProps
  extends HTMLChakraProps<"button", ArkDialog.TriggerBaseProps>, UnstyledProp {}

export const CommandPaletteTrigger = withContext<
  HTMLButtonElement,
  CommandPaletteTriggerProps
>(ArkDialog.Trigger, "trigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteBackdropProps
  extends HTMLChakraProps<"div", ArkDialog.BackdropBaseProps>, UnstyledProp {}

export const CommandPaletteBackdrop = withContext<
  HTMLDivElement,
  CommandPaletteBackdropProps
>(ArkDialog.Backdrop, "backdrop", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPalettePositionerProps
  extends HTMLChakraProps<"div", ArkDialog.PositionerBaseProps>, UnstyledProp {}

export const CommandPalettePositioner = withContext<
  HTMLDivElement,
  CommandPalettePositionerProps
>(ArkDialog.Positioner, "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPalettePanelProps
  extends HTMLChakraProps<"div", ArkDialog.ContentBaseProps>, UnstyledProp {}

const CommandPalettePanelBase = forwardRef<
  HTMLDivElement,
  ArkDialog.ContentProps
>(function CommandPalettePanelBase(props, ref) {
  const { children, ...restProps } = props
  const { loading, comboboxProps } = useCommandPaletteConfig()

  return (
    <ArkDialog.Content
      ref={ref}
      {...restProps}
      data-loading={dataAttr(loading)}
      data-empty={dataAttr(comboboxProps.collection?.size === 0)}
    >
      <ArkCombobox.Root
        {...comboboxProps}
        open
        disableLayer
        asChild={false}
        className={undefined}
      >
        {children}
      </ArkCombobox.Root>
    </ArkDialog.Content>
  )
})

export const CommandPalettePanel = withContext<
  HTMLDivElement,
  CommandPalettePanelProps
>(CommandPalettePanelBase, "panel", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteLabelProps
  extends HTMLChakraProps<"label", ArkCombobox.LabelBaseProps>, UnstyledProp {}

export const CommandPaletteLabel = withContext<
  HTMLLabelElement,
  CommandPaletteLabelProps
>(ArkCombobox.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteControlProps
  extends HTMLChakraProps<"div", ArkCombobox.ControlBaseProps>, UnstyledProp {}

export const CommandPaletteControl = withContext<
  HTMLDivElement,
  CommandPaletteControlProps
>(ArkCombobox.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteIndicatorProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

const CommandPaletteIndicatorBase = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CommandPaletteIndicatorBase(props, ref) {
  const { loading } = useCommandPaletteConfig()
  const { children = <SearchIcon />, ...restProps } = props
  return (
    <div ref={ref} {...restProps} data-loading={dataAttr(loading)}>
      {loading ? <Spinner size="xs" /> : children}
    </div>
  )
})

export const CommandPaletteIndicator = withContext<
  HTMLDivElement,
  CommandPaletteIndicatorProps
>(CommandPaletteIndicatorBase, "indicator")

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteInputProps
  extends HTMLChakraProps<"input", ArkCombobox.InputBaseProps>, UnstyledProp {}

export const CommandPaletteInput = withContext<
  HTMLInputElement,
  CommandPaletteInputProps
>(ArkCombobox.Input, "input", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteClearTriggerProps
  extends
    HTMLChakraProps<"button", ArkCombobox.ClearTriggerBaseProps>,
    UnstyledProp {}

export const CommandPaletteClearTrigger = withContext<
  HTMLButtonElement,
  CommandPaletteClearTriggerProps
>(ArkCombobox.ClearTrigger, "clearTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteListProps
  extends HTMLChakraProps<"div", ArkCombobox.ContentBaseProps>, UnstyledProp {}

export const CommandPaletteList = withContext<
  HTMLDivElement,
  CommandPaletteListProps
>(ArkCombobox.Content, "list", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteItemGroupProps
  extends
    HTMLChakraProps<"div", ArkCombobox.ItemGroupBaseProps>,
    UnstyledProp {}

export const CommandPaletteItemGroup = withContext<
  HTMLDivElement,
  CommandPaletteItemGroupProps
>(ArkCombobox.ItemGroup, "itemGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteItemGroupLabelProps
  extends
    HTMLChakraProps<"div", ArkCombobox.ItemGroupLabelBaseProps>,
    UnstyledProp {}

export const CommandPaletteItemGroupLabel = withContext<
  HTMLDivElement,
  CommandPaletteItemGroupLabelProps
>(ArkCombobox.ItemGroupLabel, "itemGroupLabel", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteItemProps
  extends
    Omit<HTMLChakraProps<"div", ArkCombobox.ItemBaseProps>, "onSelect">,
    UnstyledProp {
  /**
   * Runs when the item is selected, before the Root `onSelect` and resulting
   * `onOpenChange` callbacks.
   */
  onSelect?: ((details: CommandPaletteSelectionDetails) => void) | undefined
  /** Overrides `Root` close behavior for this item. */
  closeOnSelect?: boolean | undefined
}

const CommandPaletteItemBase = forwardRef<
  HTMLDivElement,
  CommandPaletteItemProps
>(function CommandPaletteItemBase(props, ref) {
  const { onSelect, closeOnSelect, item, ...restProps } = props
  const { comboboxProps, registerItemAction } = useCommandPaletteConfig()
  const itemValue = comboboxProps.collection?.getItemValue(item)

  useEffect(() => {
    if (itemValue == null) return
    return registerItemAction(itemValue, { onSelect, closeOnSelect })
  }, [closeOnSelect, itemValue, onSelect, registerItemAction])

  return (
    <ArkCombobox.Item
      ref={ref}
      {...(restProps as ArkCombobox.ItemProps)}
      item={item}
    />
  )
})

export const CommandPaletteItem = withContext<
  HTMLDivElement,
  CommandPaletteItemProps
>(CommandPaletteItemBase, "item", {
  forwardAsChild: true,
  forwardProps: ["onSelect", "closeOnSelect"],
})

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteItemTextProps
  extends HTMLChakraProps<"div", ArkCombobox.ItemTextBaseProps>, UnstyledProp {}

export const CommandPaletteItemText = withContext<
  HTMLDivElement,
  CommandPaletteItemTextProps
>(ArkCombobox.ItemText, "itemText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteItemCommandProps
  extends HTMLChakraProps<"kbd">, UnstyledProp {}

export const CommandPaletteItemCommand = withContext<
  HTMLElement,
  CommandPaletteItemCommandProps
>("kbd", "itemCommand")

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteItemIndicatorProps
  extends
    HTMLChakraProps<"div", ArkCombobox.ItemIndicatorBaseProps>,
    UnstyledProp {}

export const CommandPaletteItemIndicator = withContext<
  HTMLDivElement,
  CommandPaletteItemIndicatorProps
>(ArkCombobox.ItemIndicator, "itemIndicator", {
  forwardAsChild: true,
  defaultProps: {
    children: <CheckIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteLoadingProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

const CommandPaletteLoadingBase = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CommandPaletteLoadingBase(props, ref) {
  const { loading } = useCommandPaletteConfig()
  if (!loading) return null
  return <div ref={ref} role="status" aria-live="polite" {...props} />
})

export const CommandPaletteLoading = withContext<
  HTMLDivElement,
  CommandPaletteLoadingProps
>(CommandPaletteLoadingBase, "loading")

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteEmptyProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

const CommandPaletteEmptyBase = forwardRef<
  HTMLDivElement,
  ArkCombobox.EmptyProps
>(function CommandPaletteEmptyBase(props, ref) {
  const { loading } = useCommandPaletteConfig()
  if (loading) return null
  return <ArkCombobox.Empty ref={ref} {...props} />
})

export const CommandPaletteEmpty = withContext<
  HTMLDivElement,
  CommandPaletteEmptyProps
>(CommandPaletteEmptyBase, "empty", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteSeparatorProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const CommandPaletteSeparator = withContext<
  HTMLDivElement,
  CommandPaletteSeparatorProps
>("div", "separator", {
  defaultProps: { role: "separator", "aria-orientation": "horizontal" },
})

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteFooterProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const CommandPaletteFooter = withContext<
  HTMLDivElement,
  CommandPaletteFooterProps
>("div", "footer")

////////////////////////////////////////////////////////////////////////////////////

export const CommandPaletteContext = ArkCombobox.Context
export const CommandPaletteItemContext = ArkCombobox.ItemContext
export const CommandPaletteDialogContext = ArkDialog.Context

export interface CommandPaletteValueChangeDetails<
  T extends CollectionItem = any,
> extends ArkCombobox.ValueChangeDetails<T> {}

export interface CommandPaletteHighlightChangeDetails<
  T extends CollectionItem = any,
> extends ArkCombobox.HighlightChangeDetails<T> {}

export interface CommandPaletteInputValueChangeDetails
  extends ArkCombobox.InputValueChangeDetails {}

export interface CommandPaletteOpenChangeDetails
  extends ArkDialog.OpenChangeDetails {}

export interface CommandPaletteSelectionDetails
  extends ArkCombobox.SelectionDetails {}
