import {
  chakra,
  forwardRef,
  SystemStyleObject,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { getValidChildren } from "@chakra-ui/react-children-utils"
import { cx } from "@chakra-ui/shared-utils"
import { useBreadcrumbStyles } from "./breadcrumb-context"
import { BreadcrumbSeparator } from "./breadcrumb-separator"
import { BreadcrumbLink } from "./breadcrumb-link"
import { cloneElement } from "react"
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
    const itemStyles: SystemStyleObject = {
      display: "inline-flex",
      alignItems: "center",
      ...styles.item,
    }

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
