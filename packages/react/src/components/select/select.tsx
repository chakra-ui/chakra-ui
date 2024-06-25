"use client"

import {
  Select as ArkSelect,
  type SelectCollectionItem,
} from "@ark-ui/react/select"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"
import { CheckIcon, ChevronDownIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useSelectStyles,
} = createStyleContext("select")

export { useSelectStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface SelectRootProps<T extends SelectCollectionItem = any>
  extends HTMLChakraProps<"div", ArkSelect.RootBaseProps<T>>,
    SlotRecipeProps<"select">,
    UnstyledProp {}

interface SelectRootComponent {
  <T extends SelectCollectionItem>(props: SelectRootProps<T>): JSX.Element
}

export const SelectRoot = withProvider<HTMLDivElement, SelectRootProps>(
  ArkSelect.Root,
  "root",
  { forwardAsChild: true },
) as SelectRootComponent

////////////////////////////////////////////////////////////////////////////////////

export interface SelectTriggerProps
  extends HTMLChakraProps<"button", ArkSelect.TriggerBaseProps> {}

export const SelectTrigger = withContext<HTMLButtonElement, SelectTriggerProps>(
  ArkSelect.Trigger,
  "trigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SelectPositionerProps
  extends HTMLChakraProps<"div", ArkSelect.PositionerBaseProps> {}

export const SelectPositioner = withContext<
  HTMLDivElement,
  SelectPositionerProps
>(ArkSelect.Positioner, "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SelectContentProps
  extends HTMLChakraProps<"div", ArkSelect.ContentBaseProps> {}

export const SelectContent = withContext<HTMLDivElement, SelectContentProps>(
  ArkSelect.Content,
  "content",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SelectValueTextProps
  extends HTMLChakraProps<"span", ArkSelect.ValueTextBaseProps> {}

export const SelectValueText = withContext<
  HTMLSpanElement,
  SelectValueTextProps
>(ArkSelect.ValueText, "valueText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SelectClearTriggerProps
  extends HTMLChakraProps<"div", ArkSelect.IndicatorBaseProps> {}

export const SelectClearTrigger = withContext<
  HTMLDivElement,
  SelectClearTriggerProps
>(ArkSelect.ClearTrigger, "clearTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemGroupProps
  extends HTMLChakraProps<"div", ArkSelect.ItemGroupBaseProps> {}

export const SelectItemGroup = withContext<
  HTMLDivElement,
  SelectItemGroupProps
>(ArkSelect.ItemGroup, "itemGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemGroupLabelProps
  extends HTMLChakraProps<"div", ArkSelect.ItemGroupLabelBaseProps> {}

export const SelectItemGroupLabel = withContext<
  HTMLDivElement,
  SelectItemGroupLabelProps
>(ArkSelect.ItemGroupLabel, "itemGroupLabel", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemProps
  extends HTMLChakraProps<"div", ArkSelect.ItemBaseProps> {}

export const SelectItem = withContext<HTMLDivElement, SelectItemProps>(
  ArkSelect.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemTextProps
  extends HTMLChakraProps<"div", ArkSelect.ItemTextBaseProps> {}

export const SelectItemText = withContext<HTMLDivElement, SelectItemTextProps>(
  ArkSelect.ItemText,
  "itemText",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SelectItemIndicatorProps
  extends HTMLChakraProps<"div", ArkSelect.ItemIndicatorBaseProps> {}

export const SelectItemIndicator = withContext<
  HTMLDivElement,
  SelectItemIndicatorProps
>(ArkSelect.ItemIndicator, "itemIndicator", {
  forwardAsChild: true,
  defaultProps: {
    children: <CheckIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface SelectIndicatorProps
  extends HTMLChakraProps<"div", ArkSelect.ItemIndicatorBaseProps> {}

export const SelectIndicator = withContext<
  HTMLDivElement,
  SelectItemIndicatorProps
>(ArkSelect.Indicator, "indicator", {
  forwardAsChild: true,
  defaultProps: {
    children: <ChevronDownIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface SelectControlProps
  extends HTMLChakraProps<"div", ArkSelect.ControlBaseProps> {}

export const SelectControl = withContext<HTMLDivElement, SelectControlProps>(
  ArkSelect.Control,
  "control",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SelectLabelProps
  extends HTMLChakraProps<"label", ArkSelect.LabelBaseProps> {}

export const SelectLabel = withContext<HTMLLabelElement, SelectLabelProps>(
  ArkSelect.Label,
  "label",
  { forwardAsChild: true },
)
