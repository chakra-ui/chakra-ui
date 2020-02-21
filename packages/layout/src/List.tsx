import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import * as React from "react"
import { cleanChildren } from "@chakra-ui/utils"
import Icon from "@chakra-ui/icon"

export type ListProps = PropsOf<typeof chakra.ul> & {
  styleType?: SystemProps["listStyleType"]
  stylePos?: SystemProps["listStylePos"]
  spacing?: SystemProps["margin"]
}

export const List = React.forwardRef(
  (props: ListProps, ref: React.Ref<HTMLUListElement | HTMLOListElement>) => {
    const {
      children,
      styleType = "none",
      stylePos = "inside",
      spacing,
      ...rest
    } = props
    const validChildren = cleanChildren(children)
    return (
      <chakra.ul
        ref={ref}
        listStyleType={styleType}
        listStylePosition={stylePos}
        {...rest}
      >
        {validChildren.map((child, index) => {
          const isLast = index + 1 === validChildren.length
          if (isLast) {
            return child
          }

          return spacing ? React.cloneElement(child, { mb: spacing }) : child
        })}
      </chakra.ul>
    )
  },
)

List.displayName = "List"

export const ListItem = chakra.li
ListItem.displayName = "ListItem"

export const ListIcon = Icon
ListIcon.defaultProps = {
  mr: 2,
}

ListIcon.displayName = "ListIcon"

export default List
