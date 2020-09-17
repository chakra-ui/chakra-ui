import { Icon, IconProps } from "@chakra-ui/icon"
import { chakra, SystemProps, forwardRef, PropsOf } from "@chakra-ui/system"
import { getValidChildren, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

interface ListOptions {
  /**
   * Short hand prop for `listStyleType`
   */
  styleType?: SystemProps["listStyleType"]
  /**
   * Short hand prop for `listStylePosition`
   */
  stylePosition?: SystemProps["listStylePosition"]
  /**
   * The space between each list item
   */
  spacing?: SystemProps["margin"]
}

export interface ListProps extends PropsOf<typeof chakra.ul>, ListOptions {}

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
  const { as, ...rest } = props
  return (
    <List ref={ref} as="ol" styleType="decimal" marginLeft="1em" {...rest} />
  )
})

if (__DEV__) {
  OrderedList.displayName = "OrderedList"
}

export const UnorderedList = forwardRef<ListProps, "ul">(function UnorderedList(
  props,
  ref,
) {
  const { as, ...rest } = props
  return (
    <List ref={ref} as="ul" styleType="initial" marginLeft="1em" {...rest} />
  )
})

if (__DEV__) {
  UnorderedList.displayName = "UnorderedList"
}

export interface ListItemProps extends PropsOf<typeof ListItem> {}

/**
 * ListItem
 *
 * Used to render a list item
 */
export const ListItem = chakra("li")

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
      ref={ref}
      role="presentation"
      marginRight="0.5rem"
      display="inline"
      verticalAlign="text-bottom"
      {...props}
    />
  )
})

if (__DEV__) {
  ListIcon.displayName = "ListIcon"
}
