"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useBreadcrumbStyles } from "./breadcrumb-context"

export interface BreadcrumbLinkProps extends HTMLChakraProps<"a"> {}

/**
 * Breadcrumb link.
 *
 * It renders a `span` when it matches the current link. Otherwise,
 * it renders an anchor tag.
 */
export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(function BreadcrumbLink(props, ref) {
  const styles = useBreadcrumbStyles()
  return (
    <chakra.a
      ref={ref}
      {...props}
      css={[styles.link, props.css]}
      className={cx("chakra-breadcrumb__link", props.className)}
    />
  )
})

BreadcrumbLink.displayName = "BreadcrumbLink"
