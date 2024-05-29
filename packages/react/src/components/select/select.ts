"use client"

import { Select as ArkSelect } from "@ark-ui/react/select"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useSelectStyles,
} = createStyleContext("Select")

export { useSelectStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface SelectRootProps
  extends HTMLChakraProps<"div", ArkSelect.RootProps<any>>,
    SlotRecipeProps<"Select">,
    UnstyledProp {}

export const SelectRoot = withProvider<HTMLDivElement, SelectRootProps>(
  ArkSelect.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SelectTriggerProps
  extends HTMLChakraProps<"button", ArkSelect.TriggerProps> {}

export const SelectTrigger = withContext<HTMLButtonElement, SelectTriggerProps>(
  ArkSelect.Trigger,
  "trigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SelectPositionerProps
  extends HTMLChakraProps<"div", ArkSelect.PositionerProps> {}

export const SelectPositioner = withContext<
  HTMLDivElement,
  SelectPositionerProps
>(ArkSelect.Positioner, "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SelectContentProps
  extends HTMLChakraProps<"div", ArkSelect.ContentProps> {}

export const SelectContent = withContext<HTMLDivElement, SelectContentProps>(
  ArkSelect.Content,
  "content",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SelectValueTextProps
  extends HTMLChakraProps<"span", ArkSelect.ValueTextProps> {}

export const SelectValueText = withContext<
  HTMLSpanElement,
  SelectValueTextProps
>(ArkSelect.ValueText, "valueText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SelectClearTriggerProps
  extends HTMLChakraProps<"div", ArkSelect.IndicatorProps> {}

export const SelectClearTrigger = withContext<
  HTMLDivElement,
  SelectClearTriggerProps
>(ArkSelect.ClearTrigger, "clearTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemGroupProps
  extends HTMLChakraProps<"div", ArkSelect.ItemGroupProps> {}

export const SelectItemGroup = withContext<
  HTMLDivElement,
  SelectItemGroupProps
>(ArkSelect.ItemGroup, "itemGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemGroupLabelProps
  extends HTMLChakraProps<"div", ArkSelect.ItemGroupLabelProps> {}

export const SelectItemGroupLabel = withContext<
  HTMLDivElement,
  SelectItemGroupLabelProps
>(ArkSelect.ItemGroupLabel, "itemGroupLabel", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemProps
  extends HTMLChakraProps<"div", ArkSelect.ItemProps> {}

export const SelectItem = withContext<HTMLDivElement, SelectItemProps>(
  ArkSelect.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemTextProps
  extends HTMLChakraProps<"div", ArkSelect.ItemTextProps> {}

export const SelectItemText = withContext<HTMLDivElement, SelectItemTextProps>(
  ArkSelect.ItemText,
  "itemText",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemIndicatorProps
  extends HTMLChakraProps<"div", ArkSelect.ItemIndicatorProps> {}

export const SelectItemIndicator = withContext<
  HTMLDivElement,
  SelectItemIndicatorProps
>(ArkSelect.ItemIndicator, "itemIndicator", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SelectIndicatorProps
  extends HTMLChakraProps<"div", ArkSelect.ItemIndicatorProps> {}

export const SelectIndicator = withContext<
  HTMLDivElement,
  SelectItemIndicatorProps
>(ArkSelect.Indicator, "indicator", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SelectControlProps
  extends HTMLChakraProps<"div", ArkSelect.ControlProps> {}

export const SelectControl = withContext<HTMLDivElement, SelectControlProps>(
  ArkSelect.Control,
  "control",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SelectLabelProps
  extends HTMLChakraProps<"label", ArkSelect.LabelProps> {}

export const SelectLabel = withContext<HTMLLabelElement, SelectLabelProps>(
  ArkSelect.Label,
  "label",
  { forwardAsChild: true },
)
