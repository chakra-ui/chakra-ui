"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { Icon } from "../icon"
import {
  useAccordionItemContext,
  useAccordionStyles,
} from "./accordion-context"

const ChevronIcon = (props: HTMLChakraProps<"svg">) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
    />
  </Icon>
)

export interface AccordionIndicatorProps extends HTMLChakraProps<"div"> {}

export const AccordionIndicator = forwardRef<
  HTMLDivElement,
  AccordionIndicatorProps
>(function AccordionIndicator(props, ref) {
  const itemApi = useAccordionItemContext()
  const styles = useAccordionStyles()

  return (
    <chakra.div
      {...itemApi.getIndicatorProps(props, ref)}
      css={[styles.indicator, props.css]}
      className={cx("chakra-accordion__indicator", props.className)}
    >
      {props.children || <ChevronIcon />}
    </chakra.div>
  )
})

AccordionIndicator.displayName = "AccordionIndicator"
