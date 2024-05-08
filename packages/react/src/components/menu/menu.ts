"use client"

import { Menu as ArkMenu } from "@ark-ui/react/menu"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withRootProvider,
  withContext,
  useStyles: useMenuStyles,
} = createStyleContext("Menu")

export { useMenuStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRootProps
  extends ArkMenu.RootProps,
    SlotRecipeProps<"Menu">,
    UnstyledProp {}

export const MenuRoot = withRootProvider<MenuRootProps>(ArkMenu.Root)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuTriggerProps
  extends HTMLChakraProps<"button", ArkMenu.TriggerProps> {}

export const MenuTrigger = withContext<HTMLButtonElement, MenuTriggerProps>(
  ArkMenu.Trigger,
  "trigger",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuContextTriggerProps
  extends HTMLChakraProps<"button", ArkMenu.ContextTriggerProps> {}

export const MenuContextTrigger = withContext<
  HTMLButtonElement,
  MenuContextTriggerProps
>(ArkMenu.ContextTrigger, "contextTrigger")

////////////////////////////////////////////////////////////////////////////////////

export interface MenuPositionerProps
  extends HTMLChakraProps<"div", ArkMenu.PositionerProps> {}

export const MenuPositioner = withContext<HTMLDivElement, MenuPositionerProps>(
  ArkMenu.Positioner,
  "positioner",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuSeparatorProps
  extends HTMLChakraProps<"div", ArkMenu.SeparatorProps> {}

export const MenuSeparator = withContext<HTMLDivElement, MenuSeparatorProps>(
  ArkMenu.Separator,
  "separator",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuContentProps
  extends HTMLChakraProps<"div", ArkMenu.ContentProps> {}

export const MenuContent = withContext<HTMLDivElement, MenuContentProps>(
  ArkMenu.Content,
  "content",
)

// arrow

export interface MenuArrowProps
  extends HTMLChakraProps<"div", ArkMenu.ArrowProps> {}

export const MenuArrow = withContext<HTMLDivElement, MenuArrowProps>(
  ArkMenu.Arrow,
  "arrow",
)

// arrow tip

export interface MenuArrowTipProps
  extends HTMLChakraProps<"div", ArkMenu.ArrowTipProps> {}

export const MenuArrowTip = withContext<HTMLDivElement, MenuArrowTipProps>(
  ArkMenu.ArrowTip,
  "arrowTip",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuIndicatorProps
  extends HTMLChakraProps<"div", ArkMenu.IndicatorProps> {}

export const MenuIndicator = withContext<HTMLDivElement, MenuIndicatorProps>(
  ArkMenu.Indicator,
  "indicator",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemGroupProps
  extends HTMLChakraProps<"div", ArkMenu.ItemGroupProps> {}

export const MenuItemGroup = withContext<HTMLDivElement, MenuItemGroupProps>(
  ArkMenu.ItemGroup,
  "itemGroup",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemGroupLabelProps
  extends HTMLChakraProps<"div", ArkMenu.ItemGroupLabelProps> {}

export const MenuItemGroupLabel = withContext<
  HTMLDivElement,
  MenuItemGroupLabelProps
>(ArkMenu.ItemGroupLabel, "itemGroupLabel")

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemProps
  extends HTMLChakraProps<"div", ArkMenu.ItemProps> {}

export const MenuItem = withContext<HTMLDivElement, MenuItemProps>(
  ArkMenu.Item,
  "item",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemTextProps
  extends HTMLChakraProps<"div", ArkMenu.ItemTextProps> {}

export const MenuItemText = withContext<HTMLDivElement, MenuItemTextProps>(
  ArkMenu.ItemText,
  "itemText",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemCommandProps extends HTMLChakraProps<"span"> {}

export const MenuItemCommand = withContext<
  HTMLSpanElement,
  MenuItemCommandProps
>("span", "itemCommand")

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemIndicatorProps
  extends HTMLChakraProps<"div", ArkMenu.ItemIndicatorProps> {}

export const MenuItemIndicator = withContext<
  HTMLDivElement,
  MenuItemIndicatorProps
>(ArkMenu.ItemIndicator, "itemIndicator")

////////////////////////////////////////////////////////////////////////////////////

export interface MenuCheckboxItemProps
  extends HTMLChakraProps<"div", ArkMenu.CheckboxItemProps> {}

export const MenuCheckboxItem = withContext<
  HTMLDivElement,
  MenuCheckboxItemProps
>(ArkMenu.CheckboxItem, "item")

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRadioItemGroupProps
  extends HTMLChakraProps<"div", ArkMenu.RadioItemGroupProps> {}

export const MenuRadioItemGroup = withContext<
  HTMLDivElement,
  MenuRadioItemGroupProps
>(ArkMenu.RadioItemGroup, "itemGroup")

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRadioItemProps
  extends HTMLChakraProps<"div", ArkMenu.RadioItemProps> {}

export const MenuRadioItem = withContext<HTMLDivElement, MenuRadioItemProps>(
  ArkMenu.RadioItem,
  "item",
)
