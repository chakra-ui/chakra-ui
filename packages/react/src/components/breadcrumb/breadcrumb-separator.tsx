"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useBreadcrumbStyles } from "./breadcrumb-context"

const RightIcon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </chakra.svg>
)

export interface BreadcrumbSeparatorProps extends HTMLChakraProps<"li"> {}

export const BreadcrumbSeparator = forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(function BreadcrumbSeparator(props, ref) {
  const styles = useBreadcrumbStyles()

  return (
    <chakra.li
      ref={ref}
      {...props}
      css={[styles.separator, props.css]}
      className={cx("chakra-breadcrumb__separator", props.className)}
    >
      {props.children || <RightIcon />}
    </chakra.li>
  )
})

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
