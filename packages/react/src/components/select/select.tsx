"use client"

import type { Assign, CollectionItem } from "@ark-ui/react"
import { Select as ArkSelect } from "@ark-ui/react/select"
import type { JSX } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { CheckIcon, ChevronDownIcon, CloseIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useSelectStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "select" })

export { useSelectStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface SelectRootProviderBaseProps<T extends CollectionItem = any>
  extends
    Assign<ArkSelect.RootProviderBaseProps<T>, SlotRecipeProps<"select">>,
    UnstyledProp {}

export interface SelectRootProviderProps<
  T extends CollectionItem = any,
> extends HTMLChakraProps<"div", SelectRootProviderBaseProps<T>> {}

interface SelectRootProviderComponent {
  <T extends CollectionItem>(props: SelectRootProviderProps<T>): JSX.Element
}

export const SelectRootProvider = withProvider<
  HTMLDivElement,
  SelectRootProviderProps
>(ArkSelect.RootProvider, "root", {
  forwardAsChild: true,
}) as SelectRootProviderComponent
;(SelectRootProvider as any).displayName = "SelectRootProvider"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectRootBaseProps<T extends CollectionItem = any>
  extends
    Assign<ArkSelect.RootBaseProps<T>, SlotRecipeProps<"select">>,
    UnstyledProp {}

export interface SelectRootProps<
  T extends CollectionItem = any,
> extends HTMLChakraProps<"div", SelectRootBaseProps<T>> {}

export interface SelectRootComponent {
  <T extends CollectionItem>(
    props: SelectRootProps<T> & React.RefAttributes<HTMLDivElement>,
  ): JSX.Element
}

export const SelectRoot = withProvider<HTMLDivElement, SelectRootProps>(
  ArkSelect.Root,
  "root",
  {
    forwardAsChild: true,
    defaultProps: { positioning: { sameWidth: true } },
  },
) as SelectRootComponent
;(SelectRoot as any).displayName = "SelectRoot"

////////////////////////////////////////////////////////////////////////////////////

export const SelectPropsProvider =
  PropsProvider as React.Provider<SelectRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface SelectTriggerProps
  extends HTMLChakraProps<"button", ArkSelect.TriggerBaseProps>, UnstyledProp {}

export const SelectTrigger = withContext<HTMLButtonElement, SelectTriggerProps>(
  ArkSelect.Trigger,
  "trigger",
  { forwardAsChild: true },
)
SelectTrigger.displayName = "SelectTrigger"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectPositionerProps
  extends HTMLChakraProps<"div", ArkSelect.PositionerBaseProps>, UnstyledProp {}

export const SelectPositioner = withContext<
  HTMLDivElement,
  SelectPositionerProps
>(ArkSelect.Positioner, "positioner", { forwardAsChild: true })
SelectPositioner.displayName = "SelectPositioner"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectContentProps
  extends HTMLChakraProps<"div", ArkSelect.ContentBaseProps>, UnstyledProp {}

export const SelectContent = withContext<HTMLDivElement, SelectContentProps>(
  ArkSelect.Content,
  "content",
  { forwardAsChild: true },
)
SelectContent.displayName = "SelectContent"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectListProps
  extends HTMLChakraProps<"div", ArkSelect.ListBaseProps>, UnstyledProp {}

export const SelectList = withContext<HTMLDivElement, SelectListProps>(
  ArkSelect.List,
  "list",
  { forwardAsChild: true },
)
SelectList.displayName = "SelectList"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectValueTextProps
  extends HTMLChakraProps<"span", ArkSelect.ValueTextBaseProps>, UnstyledProp {}

export const SelectValueText = withContext<
  HTMLSpanElement,
  SelectValueTextProps
>(ArkSelect.ValueText, "valueText", { forwardAsChild: true })
SelectValueText.displayName = "SelectValueText"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectClearTriggerProps
  extends
    HTMLChakraProps<"button", ArkSelect.ClearTriggerBaseProps>,
    UnstyledProp {}

export const SelectClearTrigger = withContext<
  HTMLButtonElement,
  SelectClearTriggerProps
>(ArkSelect.ClearTrigger, "clearTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <CloseIcon boxSize="1em" /> },
})
SelectClearTrigger.displayName = "SelectClearTrigger"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemGroupProps
  extends HTMLChakraProps<"div", ArkSelect.ItemGroupBaseProps>, UnstyledProp {}

export const SelectItemGroup = withContext<
  HTMLDivElement,
  SelectItemGroupProps
>(ArkSelect.ItemGroup, "itemGroup", { forwardAsChild: true })
SelectItemGroup.displayName = "SelectItemGroup"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemGroupLabelProps
  extends
    HTMLChakraProps<"div", ArkSelect.ItemGroupLabelBaseProps>,
    UnstyledProp {}

export const SelectItemGroupLabel = withContext<
  HTMLDivElement,
  SelectItemGroupLabelProps
>(ArkSelect.ItemGroupLabel, "itemGroupLabel", { forwardAsChild: true })
SelectItemGroupLabel.displayName = "SelectItemGroupLabel"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemProps
  extends HTMLChakraProps<"div", ArkSelect.ItemBaseProps>, UnstyledProp {}

export const SelectItem = withContext<HTMLDivElement, SelectItemProps>(
  ArkSelect.Item,
  "item",
  { forwardAsChild: true },
)
SelectItem.displayName = "SelectItem"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemTextProps
  extends HTMLChakraProps<"div", ArkSelect.ItemTextBaseProps>, UnstyledProp {}

export const SelectItemText = withContext<HTMLDivElement, SelectItemTextProps>(
  ArkSelect.ItemText,
  "itemText",
  { forwardAsChild: true },
)
SelectItemText.displayName = "SelectItemText"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemIndicatorProps
  extends
    HTMLChakraProps<"div", ArkSelect.ItemIndicatorBaseProps>,
    UnstyledProp {}

export const SelectItemIndicator = withContext<
  HTMLDivElement,
  SelectItemIndicatorProps
>(ArkSelect.ItemIndicator, "itemIndicator", {
  forwardAsChild: true,
  defaultProps: {
    children: <CheckIcon />,
  },
})
SelectItemIndicator.displayName = "SelectItemIndicator"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectIndicatorGroupProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const SelectIndicatorGroup = withContext<
  HTMLDivElement,
  SelectIndicatorGroupProps
>("div", "indicatorGroup")
SelectIndicatorGroup.displayName = "SelectIndicatorGroup"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectIndicatorProps
  extends
    HTMLChakraProps<"div", ArkSelect.ItemIndicatorBaseProps>,
    UnstyledProp {}

export const SelectIndicator = withContext<
  HTMLDivElement,
  SelectItemIndicatorProps
>(ArkSelect.Indicator, "indicator", {
  forwardAsChild: true,
  defaultProps: {
    children: <ChevronDownIcon />,
  },
})
SelectIndicator.displayName = "SelectIndicator"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectControlProps
  extends HTMLChakraProps<"div", ArkSelect.ControlBaseProps>, UnstyledProp {}

export const SelectControl = withContext<HTMLDivElement, SelectControlProps>(
  ArkSelect.Control,
  "control",
  { forwardAsChild: true },
)
SelectControl.displayName = "SelectControl"

////////////////////////////////////////////////////////////////////////////////////

export interface SelectLabelProps
  extends HTMLChakraProps<"label", ArkSelect.LabelBaseProps>, UnstyledProp {}

export const SelectLabel = withContext<HTMLLabelElement, SelectLabelProps>(
  ArkSelect.Label,
  "label",
  { forwardAsChild: true },
)
SelectLabel.displayName = "SelectLabel"

////////////////////////////////////////////////////////////////////////////////////

export const SelectContext = ArkSelect.Context
export const SelectHiddenSelect = ArkSelect.HiddenSelect
SelectHiddenSelect.displayName = "SelectHiddenSelect"
export const SelectItemContext = ArkSelect.ItemContext

export interface SelectHighlightChangeDetails<
  T extends CollectionItem = any,
> extends ArkSelect.HighlightChangeDetails<T> {}

export interface SelectValueChangeDetails<
  T extends CollectionItem = any,
> extends ArkSelect.ValueChangeDetails<T> {}

export interface SelectOpenChangeDetails extends ArkSelect.OpenChangeDetails {}
