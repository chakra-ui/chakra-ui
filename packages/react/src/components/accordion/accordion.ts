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
} = createStyleContext("Accordion")

export { useAccordionStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionRootProps
  extends HTMLChakraProps<"div", ArkAccordion.RootProps>,
    SlotRecipeProps<"Accordion">,
    UnstyledProp {}

export const AccordionRoot = withProvider<HTMLDivElement, AccordionRootProps>(
  ArkAccordion.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemProps
  extends HTMLChakraProps<"div", ArkAccordion.ItemProps> {}

export const AccordionItem = withContext<HTMLDivElement, AccordionItemProps>(
  ArkAccordion.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemContentProps
  extends HTMLChakraProps<"div", ArkAccordion.ItemContentProps> {}

export const AccordionItemContent = withContext<
  HTMLDivElement,
  AccordionItemContentProps
>(ArkAccordion.ItemContent, "content", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemBodyProps extends HTMLChakraProps<"div"> {}

export const AccordionItemBody = withContext<
  HTMLDivElement,
  AccordionItemBodyProps
>("div", "body")

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemTriggerProps
  extends HTMLChakraProps<"button", ArkAccordion.ItemTriggerProps> {}

export const AccordionItemTrigger = withContext<
  HTMLDivElement,
  AccordionItemTriggerProps
>(ArkAccordion.ItemTrigger, "trigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface AccordionItemIndicatorProps
  extends HTMLChakraProps<"button", ArkAccordion.ItemIndicatorProps> {}

export const AccordionItemIndicator = withContext<
  HTMLDivElement,
  AccordionItemIndicatorProps
>(ArkAccordion.ItemIndicator, "indicator", { forwardAsChild: true })
