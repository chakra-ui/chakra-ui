"use client"

import type { Assign, CollectionItem } from "@ark-ui/react"
import { Listbox as ArkListbox } from "@ark-ui/react/listbox"
import type { JSX } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { CheckIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useListboxStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "listbox" })

export { useListboxStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ListboxRootProviderBaseProps<T extends CollectionItem = any>
  extends
    Assign<ArkListbox.RootProviderBaseProps<T>, SlotRecipeProps<"listbox">>,
    UnstyledProp {}

export interface ListboxRootProviderProps<
  T extends CollectionItem = any,
> extends HTMLChakraProps<"div", ListboxRootProviderBaseProps<T>> {}

interface ListboxRootProviderComponent {
  <T extends CollectionItem>(props: ListboxRootProviderProps<T>): JSX.Element
}

export const ListboxRootProvider = withProvider<
  HTMLDivElement,
  ListboxRootProviderProps
>(ArkListbox.RootProvider, "root", {
  forwardAsChild: true,
}) as ListboxRootProviderComponent

////////////////////////////////////////////////////////////////////////////////////

export interface ListboxRootBaseProps<T extends CollectionItem = any>
  extends
    Assign<ArkListbox.RootBaseProps<T>, SlotRecipeProps<"listbox">>,
    UnstyledProp {}

export interface ListboxRootProps<
  T extends CollectionItem = any,
> extends HTMLChakraProps<"div", ListboxRootBaseProps<T>> {}

export interface ListboxRootComponent {
  <T extends CollectionItem>(
    props: ListboxRootProps<T> & React.RefAttributes<HTMLDivElement>,
  ): JSX.Element
}

export const ListboxRoot = withProvider<HTMLDivElement, ListboxRootProps>(
  ArkListbox.Root,
  "root",
  {
    forwardAsChild: true,
  },
) as ListboxRootComponent

////////////////////////////////////////////////////////////////////////////////////

export const ListboxPropsProvider =
  PropsProvider as React.Provider<ListboxRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface ListboxInputProps
  extends HTMLChakraProps<"input", ArkListbox.InputBaseProps>, UnstyledProp {}

export const ListboxInput = withContext<HTMLInputElement, ListboxInputProps>(
  ArkListbox.Input,
  "input",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ListboxContentProps
  extends HTMLChakraProps<"div", ArkListbox.ContentBaseProps>, UnstyledProp {}

export const ListboxContent = withContext<HTMLDivElement, ListboxContentProps>(
  ArkListbox.Content,
  "content",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ListboxValueTextProps
  extends
    HTMLChakraProps<"span", ArkListbox.ValueTextBaseProps>,
    UnstyledProp {}

export const ListboxValueText = withContext<
  HTMLSpanElement,
  ListboxValueTextProps
>(ArkListbox.ValueText, "valueText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ListboxItemGroupProps
  extends HTMLChakraProps<"div", ArkListbox.ItemGroupBaseProps>, UnstyledProp {}

export const ListboxItemGroup = withContext<
  HTMLDivElement,
  ListboxItemGroupProps
>(ArkListbox.ItemGroup, "itemGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ListboxItemGroupLabelProps
  extends
    HTMLChakraProps<"div", ArkListbox.ItemGroupLabelBaseProps>,
    UnstyledProp {}

export const ListboxItemGroupLabel = withContext<
  HTMLDivElement,
  ListboxItemGroupLabelProps
>(ArkListbox.ItemGroupLabel, "itemGroupLabel", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ListboxItemProps
  extends HTMLChakraProps<"div", ArkListbox.ItemBaseProps>, UnstyledProp {}

export const ListboxItem = withContext<HTMLDivElement, ListboxItemProps>(
  ArkListbox.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ListboxItemTextProps
  extends HTMLChakraProps<"div", ArkListbox.ItemTextBaseProps>, UnstyledProp {}

export const ListboxItemText = withContext<
  HTMLDivElement,
  ListboxItemTextProps
>(ArkListbox.ItemText, "itemText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ListboxItemIndicatorProps
  extends
    HTMLChakraProps<"div", ArkListbox.ItemIndicatorBaseProps>,
    UnstyledProp {}

export const ListboxItemIndicator = withContext<
  HTMLDivElement,
  ListboxItemIndicatorProps
>(ArkListbox.ItemIndicator, "itemIndicator", {
  forwardAsChild: true,
  defaultProps: {
    children: <CheckIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface ListboxLabelProps
  extends HTMLChakraProps<"label", ArkListbox.LabelBaseProps>, UnstyledProp {}

export const ListboxLabel = withContext<HTMLLabelElement, ListboxLabelProps>(
  ArkListbox.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ListboxEmptyProps
  extends HTMLChakraProps<"div", ArkListbox.EmptyBaseProps>, UnstyledProp {}

export const ListboxEmpty = withContext<HTMLDivElement, ListboxEmptyProps>(
  ArkListbox.Empty,
  "empty",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const ListboxContext = ArkListbox.Context
export const ListboxItemContext = ArkListbox.ItemContext

export interface ListboxHighlightChangeDetails<
  T extends CollectionItem = any,
> extends ArkListbox.HighlightChangeDetails<T> {}

export interface ListboxValueChangeDetails<
  T extends CollectionItem = any,
> extends ArkListbox.ValueChangeDetails<T> {}
