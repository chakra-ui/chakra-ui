"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  useAccordionItemContext,
  useAccordionStyles,
} from "./accordion-context"

export interface AccordionTriggerProps extends HTMLChakraProps<"button"> {}

/**
 * Used expands and collapses an accordion item.
 * It must be a child of `AccordionItem`.
 *
 * Note 🚨: Each accordion button must be wrapped in a heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(function AccordionTrigger(props, ref) {
  const api = useAccordionItemContext()
  const styles = useAccordionStyles()

  return (
    <chakra.button
      {...api.getTriggerProps(props, ref)}
      className={cx("chakra-accordion__trigger", props.className)}
      css={[styles.trigger, props.css]}
    />
  )
})

AccordionTrigger.displayName = "AccordionTrigger"
