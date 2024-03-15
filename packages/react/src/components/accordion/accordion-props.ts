import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseAccordionProps } from "./use-accordion"
import { UseAccordionItemProps } from "./use-accordion-item"

const accordionItemProps = createProps<UseAccordionItemProps>()([
  "disabled",
  "id",
  "focusable",
  "value",
])

export const splitAccordionItemProps =
  createSplitProps<UseAccordionItemProps>(accordionItemProps)

const accordionProps = createProps<UseAccordionProps>()([
  "id",
  "multiple",
  "defaultValue",
  "value",
  "onChange",
  "collapsible",
])

export const splitAccordionProps =
  createSplitProps<UseAccordionProps>(accordionProps)
