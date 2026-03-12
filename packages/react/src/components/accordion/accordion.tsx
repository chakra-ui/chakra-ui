"use client"

import type { Assign } from "@ark-ui/react"
import { Accordion as ArkAccordion } from "@ark-ui/react/accordion"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { ChevronDownIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useAccordionStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "accordion" })

export { useAccordionStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionRootProviderBaseProps
  extends
    Assign<ArkAccordion.RootProviderBaseProps, SlotRecipeProps<"accordion">>,
    UnstyledProp {}

export interface AccordionRootProviderProps extends HTMLChakraProps<
  "div",
  AccordionRootProviderBaseProps
> {}

export const AccordionRootProvider = withProvider<
  HTMLDivElement,
  AccordionRootProviderProps
>(ArkAccordion.RootProvider, "root", { forwardAsChild: true })
AccordionRootProvider.displayName = "AccordionRootProvider"

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionRootBaseProps
  extends
    Assign<ArkAccordion.RootBaseProps, SlotRecipeProps<"accordion">>,
    UnstyledProp {}

export interface AccordionRootProps extends HTMLChakraProps<
  "div",
  AccordionRootBaseProps
> {}

export const AccordionRoot = withProvider<HTMLDivElement, AccordionRootProps>(
  ArkAccordion.Root,
  "root",
  { forwardAsChild: true },
)
AccordionRoot.displayName = "AccordionRoot"

////////////////////////////////////////////////////////////////////////////////////

export const AccordionPropsProvider =
  PropsProvider as React.Provider<ArkAccordion.RootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemProps
  extends HTMLChakraProps<"div", ArkAccordion.ItemBaseProps>, UnstyledProp {}

export const AccordionItem = withContext<HTMLDivElement, AccordionItemProps>(
  ArkAccordion.Item,
  "item",
  { forwardAsChild: true },
)
AccordionItem.displayName = "AccordionItem"

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemContentProps
  extends
    HTMLChakraProps<"div", ArkAccordion.ItemContentBaseProps>,
    UnstyledProp {}

export const AccordionItemContent = withContext<
  HTMLDivElement,
  AccordionItemContentProps
>(ArkAccordion.ItemContent, "itemContent", { forwardAsChild: true })
AccordionItemContent.displayName = "AccordionItemContent"

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemBodyProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const AccordionItemBody = withContext<
  HTMLDivElement,
  AccordionItemBodyProps
>("div", "itemBody")
AccordionItemBody.displayName = "AccordionItemBody"

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemTriggerProps
  extends
    HTMLChakraProps<"button", ArkAccordion.ItemTriggerBaseProps>,
    UnstyledProp {}

export const AccordionItemTrigger = withContext<
  HTMLButtonElement,
  AccordionItemTriggerProps
>(ArkAccordion.ItemTrigger, "itemTrigger", { forwardAsChild: true })
AccordionItemTrigger.displayName = "AccordionItemTrigger"

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemIndicatorProps
  extends
    HTMLChakraProps<"button", ArkAccordion.ItemIndicatorBaseProps>,
    UnstyledProp {}

export const AccordionItemIndicator = withContext<
  HTMLDivElement,
  AccordionItemIndicatorProps
>(ArkAccordion.ItemIndicator, "itemIndicator", {
  forwardAsChild: true,
  defaultProps: {
    children: <ChevronDownIcon />,
  },
})
AccordionItemIndicator.displayName = "AccordionItemIndicator"

////////////////////////////////////////////////////////////////////////////////////

export const AccordionContext = ArkAccordion.Context
export const AccordionItemContext = ArkAccordion.ItemContext

export interface AccordionFocusChangeDetails
  extends ArkAccordion.FocusChangeDetails {}

export interface AccordionValueChangeDetails
  extends ArkAccordion.ValueChangeDetails {}
