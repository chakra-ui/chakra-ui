"use client"

import { type Assign, dataAttr } from "@ark-ui/react"
import {
  Combobox as ArkCombobox,
  useComboboxContext,
} from "@ark-ui/react/combobox"
import { Dialog as ArkDialog } from "@ark-ui/react/dialog"
import { type JSX, forwardRef, useId, useMemo } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import {
  DialogBackdrop,
  type DialogBackdropProps,
  DialogContent,
  type DialogContentProps,
  DialogContext,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  type DialogRootProps,
  DialogTitle,
  DialogTrigger,
  type DialogTriggerProps,
} from "../dialog"
import { SearchIcon } from "../icons"
import {
  CommandContextProvider,
  CommandProviderContextProvider,
  useCommandContext,
  useCommandProviderContext,
} from "./command-context"
import { getCommandMatchRanges } from "./command-score"
import {
  type CommandSource,
  type UseCommandProps,
  type UseCommandReturn,
  splitCommandProps,
  useCommand,
} from "./use-command"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useCommandStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "command" })

export { useCommandStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface CommandProviderProps<T extends CommandItem = CommandItem> {
  /**
   * The value of `useCommandCollection`, shared with
   * every `Command.Root` inside.
   */
  value: CommandSource<T>
  children?: React.ReactNode | undefined
}

export function CommandProvider<T extends CommandItem>(
  props: CommandProviderProps<T>,
) {
  const labelId = useId()
  const context = useMemo(
    () => ({ value: props.value, labelId }),
    [props.value, labelId],
  )
  return (
    <CommandProviderContextProvider value={context}>
      {props.children}
    </CommandProviderContextProvider>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export interface CommandRootProviderBaseProps
  extends
    Assign<HTMLChakraProps<"div">, SlotRecipeProps<"command">>,
    UnstyledProp {
  /**
   * The value returned by `useCommand`.
   */
  value: UseCommandReturn<any>
}

export interface CommandRootProviderProps extends CommandRootProviderBaseProps {}

const CommandRootProviderBase = forwardRef<
  HTMLDivElement,
  {
    value: UseCommandReturn<any>
    onClose?: VoidFunction
  } & React.HTMLAttributes<HTMLDivElement>
>(function CommandRootProviderBase(props, ref) {
  const { value, onClose: _onClose, ...restProps } = props

  return (
    <CommandContextProvider value={value}>
      <ArkCombobox.RootProvider
        ref={ref}
        value={value.combobox}
        {...restProps}
        data-loading={dataAttr(value.loading)}
        data-empty={dataAttr(value.combobox.collection.size === 0)}
      />
    </CommandContextProvider>
  )
})

export const CommandRootProvider = withProvider<
  HTMLDivElement,
  CommandRootProviderProps
>(CommandRootProviderBase, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandRootBaseProps<T extends CommandItem = CommandItem>
  extends
    Assign<UseCommandProps<T>, SlotRecipeProps<"command">>,
    UnstyledProp {}

export interface CommandRootProps<
  T extends CommandItem = CommandItem,
> extends Assign<HTMLChakraProps<"div">, CommandRootBaseProps<T>> {}

const CommandRootBase = forwardRef<HTMLDivElement, CommandRootProps>(
  function CommandRootBase(props, ref) {
    const [commandProps, localProps] = splitCommandProps(props)
    const provider = useCommandProviderContext()
    const command = useCommand({
      ...commandProps,
      command: commandProps.command ?? provider?.value,
      ids: { label: provider?.labelId, ...commandProps.ids },
    })
    return (
      <CommandRootProviderBase
        ref={ref}
        value={command}
        {...(localProps as React.HTMLAttributes<HTMLDivElement>)}
      />
    )
  },
)

export interface CommandRootComponent {
  <T extends CommandItem>(
    props: CommandRootProps<T> & React.RefAttributes<HTMLDivElement>,
  ): JSX.Element
}

export const CommandRoot = withProvider<HTMLDivElement, CommandRootProps>(
  CommandRootBase,
  "root",
  { forwardAsChild: true },
) as CommandRootComponent

////////////////////////////////////////////////////////////////////////////////////

export const CommandPropsProvider =
  PropsProvider as React.Provider<CommandRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface CommandDialogTriggerProps extends DialogTriggerProps {}

export const CommandDialogTrigger = DialogTrigger

export interface CommandDialogProps extends DialogRootProps {}

export const CommandDialog = (props: CommandDialogProps) => {
  const { children, onEscapeKeyDown, onExitComplete, ...rootProps } = props
  const provider = useCommandProviderContext()
  const source = provider?.value

  return (
    <DialogRoot
      lazyMount
      unmountOnExit
      placement="top"
      {...rootProps}
      ids={{ title: provider?.labelId, ...rootProps.ids }}
      onEscapeKeyDown={(event) => {
        onEscapeKeyDown?.(event)
        if (!event.defaultPrevented && source?.popPage()) {
          event.preventDefault()
        }
      }}
      onExitComplete={() => {
        onExitComplete?.()
        source?.reset()
      }}
    >
      <DialogContext>
        {(dialog) => (
          <PropsProvider value={{ onClose: () => dialog.setOpen(false) }}>
            {children}
          </PropsProvider>
        )}
      </DialogContext>
    </DialogRoot>
  )
}

export interface CommandDialogContentProps extends Omit<
  DialogContentProps,
  "title"
> {
  /**
   * The accessible title of the dialog. Visually hidden.
   * @default "Command palette"
   */
  title?: React.ReactNode | undefined
  /**
   * The accessible description of the dialog. Visually hidden.
   * @default "Search for a command to run"
   */
  description?: React.ReactNode | undefined
}

export const CommandDialogContent = forwardRef<
  HTMLDivElement,
  CommandDialogContentProps
>(function CommandDialogContent(props, ref) {
  const {
    title = "Command palette",
    description = "Search for a command to run",
    children,
    ...rest
  } = props

  return (
    <DialogPositioner>
      <DialogContent ref={ref} overflow="hidden" {...rest}>
        <DialogTitle srOnly>{title}</DialogTitle>
        <DialogDescription srOnly>{description}</DialogDescription>
        {children}
      </DialogContent>
    </DialogPositioner>
  )
})

export interface CommandDialogBackdropProps extends DialogBackdropProps {}

export const CommandDialogBackdrop = DialogBackdrop

////////////////////////////////////////////////////////////////////////////////////

export interface CommandLabelProps
  extends HTMLChakraProps<"label", ArkCombobox.LabelBaseProps>, UnstyledProp {}

export const CommandLabel = withContext<HTMLLabelElement, CommandLabelProps>(
  ArkCombobox.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface CommandControlProps
  extends HTMLChakraProps<"div", ArkCombobox.ControlBaseProps>, UnstyledProp {}

export const CommandControl = withContext<HTMLDivElement, CommandControlProps>(
  ArkCombobox.Control,
  "control",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface CommandIndicatorProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

const CommandIndicatorBase = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CommandIndicatorBase(props, ref) {
  const { loading } = useCommandContext()
  const { children = <SearchIcon />, ...restProps } = props
  return (
    <div ref={ref} {...restProps} data-loading={dataAttr(loading)}>
      {children}
    </div>
  )
})

export const CommandIndicator = withContext<
  HTMLDivElement,
  CommandIndicatorProps
>(CommandIndicatorBase, "indicator")

////////////////////////////////////////////////////////////////////////////////////

export interface CommandInputProps
  extends HTMLChakraProps<"input", ArkCombobox.InputBaseProps>, UnstyledProp {}

// Safari reports keys that confirm or cancel IME input as keyCode 229
const isComposing = (event: KeyboardEvent) =>
  event.isComposing || event.keyCode === 229

const CommandInputBase = forwardRef<HTMLInputElement, ArkCombobox.InputProps>(
  function CommandInputBase(props, ref) {
    const { command, combobox, selectItem } = useCommandContext()
    const provider = useCommandProviderContext()
    return (
      <ArkCombobox.Input
        ref={ref}
        aria-labelledby={provider?.labelId}
        {...props}
        onKeyDown={(event) => {
          props.onKeyDown?.(event)
          if (isComposing(event.nativeEvent)) return
          command?.onInputKeyDown(event)
          if (event.defaultPrevented || event.key !== "Enter") return
          if (!command || command.filterQuery === command.query) return

          const highlighted = combobox.highlightedValue
          if (highlighted && highlighted !== combobox.collection.firstValue) {
            return
          }

          const item = command.getFirstMatch(command.query)
          if (!item) return
          event.preventDefault()
          const { metaKey, ctrlKey, shiftKey, altKey } = event
          selectItem(item, {
            modifiers: { metaKey, ctrlKey, shiftKey, altKey },
          })
        }}
      />
    )
  },
)

export const CommandInput = withContext<HTMLInputElement, CommandInputProps>(
  CommandInputBase,
  "input",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface CommandClearTriggerProps
  extends
    HTMLChakraProps<"button", ArkCombobox.ClearTriggerBaseProps>,
    UnstyledProp {}

export const CommandClearTrigger = withContext<
  HTMLButtonElement,
  CommandClearTriggerProps
>(ArkCombobox.ClearTrigger, "clearTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandListProps
  extends HTMLChakraProps<"div", ArkCombobox.ContentBaseProps>, UnstyledProp {}

export const CommandList = withContext<HTMLDivElement, CommandListProps>(
  ArkCombobox.Content,
  "list",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface CommandItemGroupProps
  extends
    HTMLChakraProps<"div", ArkCombobox.ItemGroupBaseProps>,
    UnstyledProp {}

export const CommandItemGroup = withContext<
  HTMLDivElement,
  CommandItemGroupProps
>(ArkCombobox.ItemGroup, "itemGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandItemGroupLabelProps
  extends
    HTMLChakraProps<"div", ArkCombobox.ItemGroupLabelBaseProps>,
    UnstyledProp {}

export const CommandItemGroupLabel = withContext<
  HTMLDivElement,
  CommandItemGroupLabelProps
>(ArkCombobox.ItemGroupLabel, "itemGroupLabel", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

/**
 * The shape the palette expects for each collection item. Every field is
 * optional, so extend it with your own data.
 */
export interface CommandItem {
  /**
   * The item's value. Read by default; use `itemToValue` on the collection to
   * derive it from another field.
   */
  value?: string | undefined
  /**
   * The item's text. Read by default; use `itemToString` on the collection to
   * derive it from another field.
   */
  label?: string | undefined
  /**
   * Whether the item is disabled. Read by default; use `isItemDisabled` on
   * the collection to derive it from another field.
   */
  disabled?: boolean | undefined
  /**
   * Extra words that match the item when searching.
   */
  keywords?: string[] | undefined
  /**
   * The value of the item whose page lists this item. An item with children
   * opens its page when selected instead of running.
   */
  parent?: string | undefined
  /**
   * Whether selecting the item opens its page even without children, such as
   * a page that loads its items or renders custom content.
   */
  page?: boolean | undefined
  /**
   * Runs when the item is selected, before the Root `onSelect`.
   */
  onSelect?: ((details: CommandSelectionDetails) => void) | undefined
  /**
   * Overrides the Root `closeOnSelect` for this item.
   */
  closeOnSelect?: boolean | undefined
  [key: string]: any
}

export interface CommandItemProps
  extends HTMLChakraProps<"div", ArkCombobox.ItemBaseProps>, UnstyledProp {}

export const CommandItem = withContext<HTMLDivElement, CommandItemProps>(
  ArkCombobox.Item,
  "item",
  { forwardAsChild: true, defaultProps: { persistFocus: true } },
)

////////////////////////////////////////////////////////////////////////////////////

export interface CommandItemTextProps
  extends HTMLChakraProps<"div", ArkCombobox.ItemTextBaseProps>, UnstyledProp {
  /**
   * Whether to highlight the characters that match the search query. Applies
   * when the children are a string.
   */
  highlight?: boolean | undefined
}

const CommandItemTextBase = forwardRef<HTMLDivElement, CommandItemTextProps>(
  function CommandItemTextBase(props, ref) {
    const { highlight, children, ...restProps } = props
    const combobox = useComboboxContext()
    const { command } = useCommandContext()
    const query = command?.filterQuery ?? combobox.inputValue
    const text = highlight && typeof children === "string" ? children : null

    const content = useMemo(() => {
      if (text === null) return children
      const ranges = getCommandMatchRanges(text, query)
      if (!ranges.length) return text
      const parts: React.ReactNode[] = []
      let cursor = 0
      for (const [start, end] of ranges) {
        if (start > cursor) parts.push(text.slice(cursor, start))
        parts.push(<mark key={start}>{text.slice(start, end)}</mark>)
        cursor = end
      }
      if (cursor < text.length) parts.push(text.slice(cursor))
      return parts
    }, [text, children, query])

    return (
      <ArkCombobox.ItemText
        ref={ref}
        {...(restProps as ArkCombobox.ItemTextProps)}
      >
        {content}
      </ArkCombobox.ItemText>
    )
  },
)

export const CommandItemText = withContext<
  HTMLDivElement,
  CommandItemTextProps
>(CommandItemTextBase, "itemText", {
  forwardAsChild: true,
  forwardProps: ["highlight"],
})

////////////////////////////////////////////////////////////////////////////////////

export interface CommandItemCommandProps
  extends HTMLChakraProps<"kbd">, UnstyledProp {}

export const CommandItemCommand = withContext<
  HTMLElement,
  CommandItemCommandProps
>("kbd", "itemCommand")

////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////

export interface CommandLoadingProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

const CommandLoadingBase = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CommandLoadingBase(props, ref) {
  const { loading } = useCommandContext()
  if (!loading) return null
  return <div ref={ref} {...props} />
})

export const CommandLoading = withContext<HTMLDivElement, CommandLoadingProps>(
  CommandLoadingBase,
  "loading",
)

////////////////////////////////////////////////////////////////////////////////////

export interface CommandEmptyProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

const CommandEmptyBase = forwardRef<HTMLDivElement, ArkCombobox.EmptyProps>(
  function CommandEmptyBase(props, ref) {
    const { loading } = useCommandContext()
    if (loading) return null
    return <ArkCombobox.Empty ref={ref} {...props} />
  },
)

export const CommandEmpty = withContext<HTMLDivElement, CommandEmptyProps>(
  CommandEmptyBase,
  "empty",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface CommandSeparatorProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const CommandSeparator = withContext<
  HTMLDivElement,
  CommandSeparatorProps
>("div", "separator", {
  defaultProps: { role: "presentation" },
})

////////////////////////////////////////////////////////////////////////////////////

export interface CommandFooterProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const CommandFooter = withContext<HTMLDivElement, CommandFooterProps>(
  "div",
  "footer",
)

////////////////////////////////////////////////////////////////////////////////////

export const CommandContext = ArkCombobox.Context
export const CommandDialogContext = ArkDialog.Context
export const CommandItemContext = ArkCombobox.ItemContext

export interface CommandHighlightChangeDetails<
  T extends CommandItem = CommandItem,
> extends ArkCombobox.HighlightChangeDetails<T> {}

export interface CommandInputValueChangeDetails
  extends ArkCombobox.InputValueChangeDetails {}

export interface CommandOpenChangeDetails extends ArkDialog.OpenChangeDetails {}

export interface CommandSelectionDetails extends ArkCombobox.SelectionDetails {}
