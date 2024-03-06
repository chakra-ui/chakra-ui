import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseAccordionItemProps, UseAccordionProps } from "./use-accordion"

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
