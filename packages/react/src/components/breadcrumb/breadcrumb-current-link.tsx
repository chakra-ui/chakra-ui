"use client"

import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useBreadcrumbStyles } from "./breadcrumb-context"

export interface BreadcrumbCurrentLinkProps extends HTMLChakraProps<"span"> {}

export const BreadcrumbCurrentLink = forwardRef<
  HTMLElement,
  BreadcrumbCurrentLinkProps
>(function BreadcrumbCurrentLink(props, ref) {
  const styles = useBreadcrumbStyles()

  return (
    <chakra.span
      ref={ref}
      role="link"
      aria-current="page"
      aria-disabled="true"
      {...props}
      css={[styles.currentLink, props.css]}
    />
  )
})

BreadcrumbCurrentLink.displayName = "BreadcrumbCurrentLink"
