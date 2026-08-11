"use client"

import type { Assign, CollectionItem } from "@ark-ui/react"
import { Combobox as ArkCombobox } from "@ark-ui/react/combobox"
import { Dialog as ArkDialog, useDialog } from "@ark-ui/react/dialog"
import { type JSX, forwardRef, useEffect } from "react"
import { createContext } from "../../create-context"
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
   * Keyboard shortcut that toggles the palette, written as `mod+k`, where
   * `mod` is Command on macOS and Control elsewhere. Pass `null` to opt out
   * and drive the palette from your own trigger or state.
   * @default "mod+k"
   */
  hotkey?: string | null | undefined
  /**
   * How selection behaves. The default `none` runs commands without
   * persisting a selected state; use `onSelect` to execute them. Pass
   * `single` or `multiple` to build pickers where selection persists.
   * @default "none"
   */
  selectionMode?: "none" | "single" | "multiple" | undefined
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
  const mod = parts.includes("mod")
  const modActive = event.metaKey || event.ctrlKey
  if (mod !== modActive) return false
  if (parts.includes("shift") !== event.shiftKey) return false
  if (parts.includes("alt") !== event.altKey) return false
  return true
}

function useHotkey(hotkey: string | null | undefined, toggle: () => void) {
  useEffect(() => {
    if (!hotkey) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (!matchesHotkey(event, hotkey)) return
      event.preventDefault()
      toggle()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  })
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
    hotkey = "mod+k",
    selectionMode = "none",
    children,
    ...restProps
  } = props

  const actionMode = selectionMode === "none"
  const comboboxProps: ArkCombobox.RootProps<any> = {
    ...(restProps as ArkCombobox.RootProps<any>),
    multiple: selectionMode === "multiple",
    ...(actionMode ? { value: [], selectionBehavior: "clear" as const } : {}),
  }

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

  useHotkey(hotkey, () => dialog.setOpen(!dialog.open))

  return (
    <CommandPaletteConfigProvider value={{ loading, comboboxProps }}>
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
  extends HTMLChakraProps<"div", ArkCombobox.ItemBaseProps>, UnstyledProp {}

export const CommandPaletteItem = withContext<
  HTMLDivElement,
  CommandPaletteItemProps
>(ArkCombobox.Item, "item", { forwardAsChild: true })

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

export interface CommandPaletteEmptyProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const CommandPaletteEmpty = withContext<
  HTMLDivElement,
  CommandPaletteEmptyProps
>(ArkCombobox.Empty, "empty", { forwardAsChild: true })

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
