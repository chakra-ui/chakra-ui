"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useBreadcrumbStyles } from "./breadcrumb-context"

export interface BreadcrumbItemProps extends HTMLChakraProps<"li"> {}

/**
 * BreadcrumbItem is used to group a breadcrumb link.
 * It renders a `li` element to denote it belongs to an order list of links.
 *
 * @see Docs https://chakra-ui.com/breadcrumb
 */

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem(props, ref) {
    const styles = useBreadcrumbStyles()
    return (
      <chakra.li
        ref={ref}
        {...props}
        className={cx("chakra-breadcrumb__list-item", props.className)}
        css={[styles.item, props.css]}
      />
    )
  },
)

BreadcrumbItem.displayName = "BreadcrumbItem"
