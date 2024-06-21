"use client"

import { Accordion as ArkAccordion } from "@ark-ui/react/accordion"
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
  useStyles: useAccordionStyles,
} = createStyleContext("accordion")

export { useAccordionStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionRootProps
  extends HTMLChakraProps<"div", ArkAccordion.RootBaseProps>,
    SlotRecipeProps<"accordion">,
    UnstyledProp {}

export const AccordionRoot = withProvider<HTMLDivElement, AccordionRootProps>(
  ArkAccordion.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemProps
  extends HTMLChakraProps<"div", ArkAccordion.ItemBaseProps> {}

export const AccordionItem = withContext<HTMLDivElement, AccordionItemProps>(
  ArkAccordion.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemContentProps
  extends HTMLChakraProps<"div", ArkAccordion.ItemContentBaseProps> {}

export const AccordionItemContent = withContext<
  HTMLDivElement,
  AccordionItemContentProps
>(ArkAccordion.ItemContent, "itemContent", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemBodyProps extends HTMLChakraProps<"div"> {}

export const AccordionItemBody = withContext<
  HTMLDivElement,
  AccordionItemBodyProps
>("div", "itemBody")

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemTriggerProps
  extends HTMLChakraProps<"button", ArkAccordion.ItemTriggerBaseProps> {}

export const AccordionItemTrigger = withContext<
  HTMLDivElement,
  AccordionItemTriggerProps
>(ArkAccordion.ItemTrigger, "itemTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemIndicatorProps
  extends HTMLChakraProps<"button", ArkAccordion.ItemIndicatorBaseProps> {}

export const AccordionItemIndicator = withContext<
  HTMLDivElement,
  AccordionItemIndicatorProps
>(ArkAccordion.ItemIndicator, "itemIndicator", { forwardAsChild: true })
