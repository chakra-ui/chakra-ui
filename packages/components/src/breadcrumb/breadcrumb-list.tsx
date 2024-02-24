import { getValidChildren } from "@chakra-ui/utils/children"
import { cloneElement } from "react"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useBreadcrumbStyles } from "./breadcrumb-context"
import { BreadcrumbListOptions } from "./breadcrumb-types"

export interface BreadcrumbListProps
  extends HTMLChakraProps<"ol">,
    BreadcrumbListOptions {}

export const BreadcrumbList = forwardRef<BreadcrumbListProps, "ol">(
  function BreadcrumbList(props, ref) {
    const {
      children,
      spacing = "0.5rem",
      separator = "/",
      className,
      ...rest
    } = props

    const styles = useBreadcrumbStyles()

    const validChildren = getValidChildren(children)
    const count = validChildren.length

    const clones = validChildren.map((child, index) =>
      cloneElement(child, {
        separator,
        spacing,
        isLastChild: count === index + 1,
      }),
    )

    return (
      <chakra.ol
        ref={ref}
        className="chakra-breadcrumb__list"
        __css={{
          display: "flex",
          alignItems: "center",
          ...styles.list,
        }}
        {...rest}
      >
        {clones}
      </chakra.ol>
    )
  },
)

BreadcrumbList.displayName = "BreadcrumbList"
