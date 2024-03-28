"use client"

import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { Span } from "../box"
import { useBreadcrumbStyles } from "./breadcrumb-context"

export interface BreadcrumbEllipsisProps extends HTMLChakraProps<"span"> {}

const EllpsisIcon = (props: HTMLChakraProps<"svg">) => (
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
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </chakra.svg>
)

export const BreadcrumbEllipsis = forwardRef<
  HTMLElement,
  BreadcrumbEllipsisProps
>(function BreadcrumbEllipsis(props, ref) {
  const styles = useBreadcrumbStyles()

  return (
    <chakra.span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      {...props}
      css={[styles.ellipsis, props.css]}
    >
      {props.children || <EllpsisIcon />}
      <Span srOnly>More</Span>
    </chakra.span>
  )
})

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"
