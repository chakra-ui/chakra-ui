"use client"

import type { Assign } from "@ark-ui/react"
import { Menu as ArkMenu } from "@ark-ui/react/menu"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { CheckIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withRootProvider,
  withContext,
  useStyles: useMenuStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "menu" })

export { useMenuStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRootProviderBaseProps
  extends Assign<ArkMenu.RootProviderBaseProps, SlotRecipeProps<"menu">>,
    UnstyledProp {}

export interface MenuRootProviderProps extends MenuRootProviderBaseProps {
  children: React.ReactNode
}

export const MenuRootProvider = withRootProvider<MenuRootProviderProps>(
  ArkMenu.RootProvider,
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRootBaseProps
  extends Assign<ArkMenu.RootBaseProps, SlotRecipeProps<"menu">>,
    UnstyledProp {}

export interface MenuRootProps extends MenuRootBaseProps {
  children: React.ReactNode
}

export const MenuRoot = withRootProvider<MenuRootProps>(ArkMenu.Root, {
  defaultProps: { lazyMount: true, unmountOnExit: true },
})

////////////////////////////////////////////////////////////////////////////////////

export const MenuPropsProvider =
  PropsProvider as React.Provider<MenuRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface MenuTriggerProps
  extends HTMLChakraProps<"button", ArkMenu.TriggerBaseProps>,
    UnstyledProp {}

export const MenuTrigger = withContext<HTMLButtonElement, MenuTriggerProps>(
  ArkMenu.Trigger,
  "trigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuContextTriggerProps
  extends HTMLChakraProps<"div", ArkMenu.ContextTriggerBaseProps>,
    UnstyledProp {}

export const MenuContextTrigger = withContext<
  HTMLElement,
  MenuContextTriggerProps
>(ArkMenu.ContextTrigger, "contextTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface MenuPositionerProps
  extends HTMLChakraProps<"div", ArkMenu.PositionerBaseProps>,
    UnstyledProp {}

export const MenuPositioner = withContext<HTMLDivElement, MenuPositionerProps>(
  ArkMenu.Positioner,
  "positioner",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuSeparatorProps
  extends HTMLChakraProps<"div", ArkMenu.SeparatorBaseProps>,
    UnstyledProp {}

export const MenuSeparator = withContext<HTMLDivElement, MenuSeparatorProps>(
  ArkMenu.Separator,
  "separator",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuContentProps
  extends HTMLChakraProps<"div", ArkMenu.ContentBaseProps>,
    UnstyledProp {}

export const MenuContent = withContext<HTMLDivElement, MenuContentProps>(
  ArkMenu.Content,
  "content",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuArrowTipProps
  extends HTMLChakraProps<"div", ArkMenu.ArrowTipBaseProps>,
    UnstyledProp {}

export const MenuArrowTip = withContext<HTMLDivElement, MenuArrowTipProps>(
  ArkMenu.ArrowTip,
  "arrowTip",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuArrowProps
  extends HTMLChakraProps<"div", ArkMenu.ArrowBaseProps>,
    UnstyledProp {}

export const MenuArrow = withContext<HTMLDivElement, MenuArrowProps>(
  ArkMenu.Arrow,
  "arrow",
  { forwardAsChild: true, defaultProps: { children: <MenuArrowTip /> } },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuIndicatorProps
  extends HTMLChakraProps<"div", ArkMenu.IndicatorBaseProps>,
    UnstyledProp {}

export const MenuIndicator = withContext<HTMLDivElement, MenuIndicatorProps>(
  ArkMenu.Indicator,
  "indicator",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemGroupProps
  extends HTMLChakraProps<"div", ArkMenu.ItemGroupBaseProps>,
    UnstyledProp {}

export const MenuItemGroup = withContext<HTMLDivElement, MenuItemGroupProps>(
  ArkMenu.ItemGroup,
  "itemGroup",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemGroupLabelProps
  extends HTMLChakraProps<"div", ArkMenu.ItemGroupLabelBaseProps>,
    UnstyledProp {}

export const MenuItemGroupLabel = withContext<
  HTMLDivElement,
  MenuItemGroupLabelProps
>(ArkMenu.ItemGroupLabel, "itemGroupLabel", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemProps
  extends HTMLChakraProps<"div", ArkMenu.ItemBaseProps>,
    UnstyledProp {
  /**
   * When true, communicates the current (active) page/item to assistive tech.
   * Applied as `aria-current="page"` on the item.
   */
  isActive?: boolean
}

export const MenuItem = withContext<HTMLDivElement, MenuItemProps>(
  ArkMenu.Item,
  "item",
  {
    forwardAsChild: true,
    mapProps: (props) => {
      const { isActive, ...rest } = props as MenuItemProps
      return isActive ? { "aria-current": "page", ...rest } : rest
    },
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuTriggerItemProps
  extends HTMLChakraProps<"div", ArkMenu.TriggerItemBaseProps>,
    UnstyledProp {}

export const MenuTriggerItem = withContext<
  HTMLDivElement,
  MenuTriggerItemProps
>(ArkMenu.TriggerItem, "item", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemTextProps
  extends HTMLChakraProps<"div", ArkMenu.ItemTextBaseProps>,
    UnstyledProp {}

export const MenuItemText = withContext<HTMLDivElement, MenuItemTextProps>(
  ArkMenu.ItemText,
  "itemText",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemCommandProps
  extends HTMLChakraProps<"kbd">,
    UnstyledProp {}

export const MenuItemCommand = withContext<HTMLElement, MenuItemCommandProps>(
  "kbd",
  "itemCommand",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemIndicatorProps
  extends HTMLChakraProps<"div", ArkMenu.ItemIndicatorBaseProps>,
    UnstyledProp {}

export const MenuItemIndicator = withContext<
  HTMLDivElement,
  MenuItemIndicatorProps
>(ArkMenu.ItemIndicator, "itemIndicator", {
  forwardAsChild: true,
  defaultProps: { children: <CheckIcon boxSize="4" /> },
})

////////////////////////////////////////////////////////////////////////////////////

export interface MenuCheckboxItemProps
  extends HTMLChakraProps<"div", ArkMenu.CheckboxItemBaseProps>,
    UnstyledProp {}

export const MenuCheckboxItem = withContext<
  HTMLDivElement,
  MenuCheckboxItemProps
>(ArkMenu.CheckboxItem, "item", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRadioItemGroupProps
  extends HTMLChakraProps<"div", ArkMenu.RadioItemGroupBaseProps>,
    UnstyledProp {}

export const MenuRadioItemGroup = withContext<
  HTMLDivElement,
  MenuRadioItemGroupProps
>(ArkMenu.RadioItemGroup, "itemGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRadioItemProps
  extends HTMLChakraProps<"div", ArkMenu.RadioItemBaseProps>,
    UnstyledProp {}

export const MenuRadioItem = withContext<HTMLDivElement, MenuRadioItemProps>(
  ArkMenu.RadioItem,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const MenuContext = ArkMenu.Context
export const MenuItemContext = ArkMenu.ItemContext

export interface MenuOpenChangeDetails extends ArkMenu.OpenChangeDetails {}
export interface MenuSelectionDetails extends ArkMenu.SelectionDetails {}
export interface MenuHighlightChangeDetails
  extends ArkMenu.HighlightChangeDetails {}
