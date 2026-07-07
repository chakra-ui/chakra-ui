"use client"

import type { Assign, CollectionItem } from "@ark-ui/react"
import { Listbox as ArkListbox } from "@ark-ui/react/listbox"
import { type JSX, forwardRef } from "react"
import { createContext } from "../../create-context"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { dataAttr } from "../../utils"
import { SearchIcon } from "../icons"
import { Spinner } from "../spinner"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useCommandPaletteStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "commandPalette" })

export { useCommandPaletteStyles }

////////////////////////////////////////////////////////////////////////////////////

interface CommandPaletteContextValue {
  loading: boolean | undefined
}

const [CommandPaletteInnerProvider, useCommandPaletteInnerContext] =
  createContext<CommandPaletteContextValue>({
    name: "CommandPaletteInnerContext",
    hookName: "useCommandPaletteInnerContext",
    providerName: "<CommandPalette.Root />",
  })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteRootProviderBaseProps<
  T extends CollectionItem = any,
>
  extends
    Assign<
      ArkListbox.RootProviderBaseProps<T>,
      SlotRecipeProps<"commandPalette">
    >,
    UnstyledProp {
  /**
   * Whether the command palette is loading results.
   * Reflected on the root and indicator parts.
   * @default false
   */
  loading?: boolean | undefined
}

export interface CommandPaletteRootProviderProps<
  T extends CollectionItem = any,
> extends HTMLChakraProps<"div", CommandPaletteRootProviderBaseProps<T>> {}

const CommandPaletteRootProviderBase = forwardRef<
  HTMLDivElement,
  CommandPaletteRootProviderProps
>(function CommandPaletteRootProviderBase(props, ref) {
  const { loading, ...restProps } = props
  return (
    <CommandPaletteInnerProvider value={{ loading }}>
      <ArkListbox.RootProvider
        ref={ref}
        {...(restProps as ArkListbox.RootProviderProps<any>)}
        data-loading={dataAttr(loading)}
      />
    </CommandPaletteInnerProvider>
  )
})

interface CommandPaletteRootProviderComponent {
  <T extends CollectionItem>(
    props: CommandPaletteRootProviderProps<T> &
      React.RefAttributes<HTMLDivElement>,
  ): JSX.Element
}

export const CommandPaletteRootProvider = withProvider<
  HTMLDivElement,
  CommandPaletteRootProviderProps
>(CommandPaletteRootProviderBase, "root") as CommandPaletteRootProviderComponent

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteRootBaseProps<T extends CollectionItem = any>
  extends
    Assign<ArkListbox.RootBaseProps<T>, SlotRecipeProps<"commandPalette">>,
    UnstyledProp {
  /**
   * Whether the command palette is loading results.
   * Reflected on the root and indicator parts.
   * @default false
   */
  loading?: boolean | undefined
}

export interface CommandPaletteRootProps<
  T extends CollectionItem = any,
> extends HTMLChakraProps<"div", CommandPaletteRootBaseProps<T>> {}

const CommandPaletteRootBase = forwardRef<
  HTMLDivElement,
  CommandPaletteRootProps
>(function CommandPaletteRootBase(props, ref) {
  const { loading, ...restProps } = props
  return (
    <CommandPaletteInnerProvider value={{ loading }}>
      <ArkListbox.Root
        ref={ref}
        {...(restProps as ArkListbox.RootProps<any>)}
        data-loading={dataAttr(loading)}
        data-empty={dataAttr(restProps.collection?.size === 0)}
      />
    </CommandPaletteInnerProvider>
  )
})

export interface CommandPaletteRootComponent {
  <T extends CollectionItem>(
    props: CommandPaletteRootProps<T> & React.RefAttributes<HTMLDivElement>,
  ): JSX.Element
}

export const CommandPaletteRoot = withProvider<
  HTMLDivElement,
  CommandPaletteRootProps
>(CommandPaletteRootBase, "root") as CommandPaletteRootComponent

////////////////////////////////////////////////////////////////////////////////////

export const CommandPalettePropsProvider =
  PropsProvider as React.Provider<CommandPaletteRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteControlProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const CommandPaletteControl = withContext<
  HTMLDivElement,
  CommandPaletteControlProps
>("div", "control")

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteIndicatorProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

const CommandPaletteIndicatorBase = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CommandPaletteIndicatorBase(props, ref) {
  const { loading } = useCommandPaletteInnerContext()
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
  extends HTMLChakraProps<"input", ArkListbox.InputBaseProps>, UnstyledProp {}

const CommandPaletteInputBase = forwardRef<
  HTMLInputElement,
  ArkListbox.InputProps
>(function CommandPaletteInputBase(props, ref) {
  return (
    <ArkListbox.Input
      autoHighlight
      {...props}
      ref={ref}
      onKeyDown={(event) => {
        props.onKeyDown?.(event)
        if (event.defaultPrevented) return
        if (event.key === "Escape" && event.currentTarget.value) {
          event.stopPropagation()
          setInputValue(event.currentTarget, "")
        }
      }}
    />
  )
})

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set
  setter?.call(input, value)
  input.dispatchEvent(new Event("input", { bubbles: true }))
}

export const CommandPaletteInput = withContext<
  HTMLInputElement,
  CommandPaletteInputProps
>(CommandPaletteInputBase, "input")

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteListProps
  extends HTMLChakraProps<"div", ArkListbox.ContentBaseProps>, UnstyledProp {}

export const CommandPaletteList = withContext<
  HTMLDivElement,
  CommandPaletteListProps
>(ArkListbox.Content, "list", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteItemGroupProps
  extends HTMLChakraProps<"div", ArkListbox.ItemGroupBaseProps>, UnstyledProp {}

export const CommandPaletteItemGroup = withContext<
  HTMLDivElement,
  CommandPaletteItemGroupProps
>(ArkListbox.ItemGroup, "itemGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteItemGroupLabelProps
  extends
    HTMLChakraProps<"div", ArkListbox.ItemGroupLabelBaseProps>,
    UnstyledProp {}

export const CommandPaletteItemGroupLabel = withContext<
  HTMLDivElement,
  CommandPaletteItemGroupLabelProps
>(ArkListbox.ItemGroupLabel, "itemGroupLabel", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteItemProps
  extends HTMLChakraProps<"div", ArkListbox.ItemBaseProps>, UnstyledProp {}

export const CommandPaletteItem = withContext<
  HTMLDivElement,
  CommandPaletteItemProps
>(ArkListbox.Item, "item", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteItemTextProps
  extends HTMLChakraProps<"div", ArkListbox.ItemTextBaseProps>, UnstyledProp {}

export const CommandPaletteItemText = withContext<
  HTMLDivElement,
  CommandPaletteItemTextProps
>(ArkListbox.ItemText, "itemText", { forwardAsChild: true })

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
    HTMLChakraProps<"div", ArkListbox.ItemIndicatorBaseProps>,
    UnstyledProp {}

export const CommandPaletteItemIndicator = withContext<
  HTMLDivElement,
  CommandPaletteItemIndicatorProps
>(ArkListbox.ItemIndicator, "itemIndicator", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteEmptyProps
  extends HTMLChakraProps<"div", ArkListbox.EmptyBaseProps>, UnstyledProp {}

export const CommandPaletteEmpty = withContext<
  HTMLDivElement,
  CommandPaletteEmptyProps
>(ArkListbox.Empty, "empty", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CommandPaletteFooterProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const CommandPaletteFooter = withContext<
  HTMLDivElement,
  CommandPaletteFooterProps
>("div", "footer")

////////////////////////////////////////////////////////////////////////////////////

export const CommandPaletteContext = ArkListbox.Context
export const CommandPaletteItemContext = ArkListbox.ItemContext

export interface CommandPaletteValueChangeDetails<
  T extends CollectionItem = any,
> extends ArkListbox.ValueChangeDetails<T> {}

export interface CommandPaletteHighlightChangeDetails<
  T extends CollectionItem = any,
> extends ArkListbox.HighlightChangeDetails<T> {}
