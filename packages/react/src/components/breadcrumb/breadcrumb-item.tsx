import { cx, getValidChildren } from "@chakra-ui/utils"
import { cloneElement } from "react"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
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

    return (
      <chakra.li
        ref={ref}
        className={cx("chakra-breadcrumb__list-item", className)}
        {...rest}
        css={styles.item}
      >
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
