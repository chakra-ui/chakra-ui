"use client"

import { type Assign, dataAttr } from "@ark-ui/react"
import {
  Combobox as ArkCombobox,
  useComboboxContext,
} from "@ark-ui/react/combobox"
import { Dialog as ArkDialog } from "@ark-ui/react/dialog"
import { Children, type JSX, forwardRef, isValidElement, useMemo } from "react"
import { useSafeLayoutEffect } from "../../hooks"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import {
  DialogBackdrop,
  DialogContent,
  DialogContext,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  type DialogRootProps,
  DialogTitle,
  DialogTrigger,
  type DialogTriggerProps,
} from "../dialog"
import { CheckIcon, SearchIcon } from "../icons"
import { Portal } from "../portal"
import { CommandContextProvider, useCommandContext } from "./command-context"
import { getCommandMatchRanges } from "./command-score"
import {
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

interface CommandProviderProps {
  /**
   * Called when a selection should dismiss the command, such as closing the
   * dialog or popover that contains it.
   */
  onClose?: VoidFunction | undefined
}

export interface CommandRootProviderBaseProps
  extends
    Assign<
      HTMLChakraProps<"div">,
      CommandProviderProps & SlotRecipeProps<"command">
    >,
    UnstyledProp {
  /**
   * The value returned by `useCommand`.
   */
  value: UseCommandReturn<any>
}

export interface CommandRootProviderProps extends CommandRootProviderBaseProps {}

const CommandRootProviderBase = forwardRef<
  HTMLDivElement,
  CommandProviderProps & {
    value: UseCommandReturn<any>
  } & React.HTMLAttributes<HTMLDivElement>
>(function CommandRootProviderBase(props, ref) {
  const { value, onClose, ...restProps } = props

  useSafeLayoutEffect(() => {
    value.closeRef.current = onClose
  }, [onClose, value.closeRef])

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
    const [commandProps, { onClose, ...localProps }] = splitCommandProps(props)
    const command = useCommand(commandProps)
    return (
      <CommandRootProviderBase
        ref={ref}
        value={command}
        onClose={onClose}
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

export interface CommandDialogProps extends Omit<
  DialogRootProps,
  "size" | "children"
> {
  /**
   * The size of the command and the dialog that contains it.
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | undefined
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
  /**
   * Whether to render the dialog in a portal.
   * @default true
   */
  portalled?: boolean | undefined
  /**
   * The element to portal the dialog into.
   */
  portalRef?: React.RefObject<HTMLElement | null> | undefined
  children?: React.ReactNode | undefined
}

export const CommandDialog = (props: CommandDialogProps) => {
  const {
    size = "md",
    title = "Command palette",
    description = "Search for a command to run",
    portalled = true,
    portalRef,
    children,
    ...rootProps
  } = props

  const triggers: React.ReactNode[] = []
  const content: React.ReactNode[] = []
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === CommandDialogTrigger) {
      triggers.push(child)
    } else {
      content.push(child)
    }
  })

  return (
    <DialogRoot
      lazyMount
      unmountOnExit
      placement="top"
      size={size}
      {...rootProps}
    >
      {triggers}
      <Portal disabled={!portalled} container={portalRef}>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent overflow="hidden">
            <DialogTitle srOnly>{title}</DialogTitle>
            <DialogDescription srOnly>{description}</DialogDescription>
            <DialogContext>
              {(dialog) => (
                <PropsProvider
                  value={{ size, onClose: () => dialog.setOpen(false) }}
                >
                  {content}
                </PropsProvider>
              )}
            </DialogContext>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  )
}

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

export const CommandInput = withContext<HTMLInputElement, CommandInputProps>(
  ArkCombobox.Input,
  "input",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

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
  { forwardAsChild: true },
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
    const text = highlight && typeof children === "string" ? children : null

    const content = useMemo(() => {
      if (text === null) return children
      const ranges = getCommandMatchRanges(text, combobox.inputValue)
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
    }, [text, children, combobox.inputValue])

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

export interface CommandItemIndicatorProps
  extends
    HTMLChakraProps<"div", ArkCombobox.ItemIndicatorBaseProps>,
    UnstyledProp {}

export const CommandItemIndicator = withContext<
  HTMLDivElement,
  CommandItemIndicatorProps
>(ArkCombobox.ItemIndicator, "itemIndicator", {
  forwardAsChild: true,
  defaultProps: {
    children: <CheckIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface CommandLoadingProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

const CommandLoadingBase = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CommandLoadingBase(props, ref) {
  const { loading } = useCommandContext()
  if (!loading) return null
  return <div ref={ref} role="status" aria-live="polite" {...props} />
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
  defaultProps: { role: "separator", "aria-orientation": "horizontal" },
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

export interface CommandValueChangeDetails<
  T extends CommandItem = CommandItem,
> extends ArkCombobox.ValueChangeDetails<T> {}

export interface CommandHighlightChangeDetails<
  T extends CommandItem = CommandItem,
> extends ArkCombobox.HighlightChangeDetails<T> {}

export interface CommandInputValueChangeDetails
  extends ArkCombobox.InputValueChangeDetails {}

export interface CommandOpenChangeDetails extends ArkDialog.OpenChangeDetails {}

export interface CommandSelectionDetails extends ArkCombobox.SelectionDetails {}
