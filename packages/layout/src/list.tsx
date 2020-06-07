import { Icon, IconProps } from "@chakra-ui/icon"
import { chakra, ChakraProps, PropsOf, forwardRef } from "@chakra-ui/system"
import { getValidChildren, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

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
 * @see Docs https://chakra-ui.com/components/list
 */
export const List = forwardRef<ListProps, "ul">(function List(props, ref) {
  const {
    children,
    styleType = "none",
    stylePosition,
    spacing,
    ...rest
  } = props

  const validChildren = getValidChildren(children)

  return (
    <chakra.ul
      ref={ref}
      listStyleType={styleType}
      listStylePosition={stylePosition}
      /**
       * We added this role to fix the Safari accessibility issue with list-style-type: none
       * @see https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
       */
      role="list"
      {...rest}
    >
      {validChildren.map((child, index) => {
        const isLast = index + 1 === validChildren.length
        if (isLast) return child
        return spacing ? React.cloneElement(child, { mb: spacing }) : child
      })}
    </chakra.ul>
  )
})

if (__DEV__) {
  List.displayName = "List"
}

export const OrderedList = forwardRef<ListProps, "ol">(function OrderedList(
  props,
  ref,
) {
  return <List as="ol" styleType="decimal" marginLeft="1em" />
})

if (__DEV__) {
  OrderedList.displayName = "OrderedList"
}

export const UnorderedList = forwardRef<ListProps, "ul">(function UnorderedList(
  props,
  ref,
) {
  return <List as="ul" styleType="decimal" marginLeft="1em" />
})

if (__DEV__) {
  UnorderedList.displayName = "UnorderedList"
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
export const ListIcon = forwardRef<IconProps, "svg">(function ListIcon(
  props,
  ref,
) {
  return (
    <Icon
      role="presentation"
      marginRight={2}
      display="inline"
      verticalAlign="text-bottom"
    />
  )
})

if (__DEV__) {
  ListIcon.displayName = "ListIcon"
}
