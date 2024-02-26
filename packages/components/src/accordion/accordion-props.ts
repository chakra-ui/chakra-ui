import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseAccordionItemProps, UseAccordionProps } from "./use-accordion"

const accordionItemProps = createProps<UseAccordionItemProps>()([
  "isDisabled",
  "id",
  "isFocusable",
])

export const splitAccordionItemProps =
  createSplitProps<UseAccordionItemProps>(accordionItemProps)

const accordionProps = createProps<UseAccordionProps>()([
  "multiple",
  "defaultIndex",
  "index",
  "onChange",
  "collapsible",
])

export const splitAccordionProps =
  createSplitProps<UseAccordionProps>(accordionProps)
