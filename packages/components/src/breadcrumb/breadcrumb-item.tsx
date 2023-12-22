import { defineStyle } from "@chakra-ui/styled-system"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { getValidChildren } from "@chakra-ui/utils/children"
import { cx } from "@chakra-ui/utils/cx"
import { cloneElement } from "react"
import { useBreadcrumbStyles } from "./breadcrumb-context"
import { BreadcrumbLink } from "./breadcrumb-link"
import { BreadcrumbSeparator } from "./breadcrumb-separator"
import { BreadcrumbItemOptions } from "./breadcrumb-types"

export interface BreadcrumbItemProps
  extends BreadcrumbItemOptions,
    HTMLChakraProps<"li"> {}

/**
 * BreadcrumbItem is used to group a breadcrumb link.
 * It renders a `li` element to denote it belongs to an order list of links.
 *
 * @see Docs https://chakra-ui.com/breadcrumb
 */

export const BreadcrumbItem = forwardRef<BreadcrumbItemProps, "li">(
  function BreadcrumbItem(props, ref) {
    const {
      isCurrentPage,
      separator,
      isLastChild,
      spacing,
      children,
      className,
      ...rest
    } = props

    const validChildren = getValidChildren(children)

    const clones = validChildren.map((child) => {
      if (child.type === BreadcrumbLink) {
        return cloneElement(child, {
          isCurrentPage,
        })
      }

      if (child.type === BreadcrumbSeparator) {
        return cloneElement(child, {
          spacing,
          children: child.props.children || separator,
        })
      }

      return child
    })

    const styles = useBreadcrumbStyles()

    const itemStyles = defineStyle({
      display: "inline-flex",
      alignItems: "center",
      ...styles.item,
    })

    const _className = cx("chakra-breadcrumb__list-item", className)

    return (
      <chakra.li ref={ref} className={_className} {...rest} __css={itemStyles}>
        {clones}
        {!isLastChild && (
          <BreadcrumbSeparator spacing={spacing}>
            {separator}
          </BreadcrumbSeparator>
        )}
      </chakra.li>
    )
  },
)
BreadcrumbItem.displayName = "BreadcrumbItem"
