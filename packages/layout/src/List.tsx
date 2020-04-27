import { Icon } from "@chakra-ui/icon"
import { chakra, ChakraProps, PropsOf } from "@chakra-ui/system"
import { getValidChildren, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { cloneElement, forwardRef, Ref } from "react"

interface ListOptions {
  /**
   * Short hand prop for `listStyleType`
   */
  styleType?: ChakraProps["listStyleType"]
  /**
   * Short hand prop for `listStylePosition`
   */
  stylePosition?: ChakraProps["listStylePosition"]
  /**
   * The space between each list item
   */
  spacing?: ChakraProps["margin"]
}

export type ListProps = PropsOf<typeof chakra.ul> & ListOptions

/**
 * List is used to display list items, it renders a `<ul>` by default.
 *
 * @see Docs https://chakra-ui.com/list
 */
export const List = forwardRef((props: ListProps, ref: Ref<any>) => {
  const {
    children,
    styleType = "none",
    stylePosition = "inside",
    spacing,
    ...rest
  } = props

  const validChildren = getValidChildren(children)

  return (
    <chakra.ul
      ref={ref}
      listStyleType={styleType}
      listStylePosition={stylePosition}
      {...rest}
    >
      {validChildren.map((child, index) => {
        const isLast = index + 1 === validChildren.length
        if (isLast) return child
        return spacing ? cloneElement(child, { mb: spacing }) : child
      })}
    </chakra.ul>
  )
})

if (__DEV__) {
  List.displayName = "List"
}

export type ListItemProps = PropsOf<typeof ListItem>

/**
 * ListItem
 *
 * Used to render a list item
 */
export const ListItem = chakra.li

if (__DEV__) {
  ListItem.displayName = "ListItem"
}

/**
 * ListIcon
 *
 * Used to render an icon beside the list item text
 */
export const ListIcon = chakra(Icon, {
  baseStyle: {
    marginRight: 2,
    display: "inline",
    verticalAlign: "text-bottom",
  },
})

if (__DEV__) {
  ListIcon.displayName = "ListIcon"
}
