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
export const List: React.FC<ListProps> = forwardRef((props, ref) => {
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

export const OrderedList: React.FC<ListProps> = forwardRef((props, ref) => {
  return (
    <List ref={ref} as="ol" styleType="decimal" marginLeft="1em" {...props} />
  )
})

if (__DEV__) {
  OrderedList.displayName = "OrderedList"
}

export const UnorderedList: React.FC<ListProps> = forwardRef((props, ref) => {
  return (
    <List ref={ref} as="ul" styleType="bullet" marginLeft="1em" {...props} />
  )
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
export const ListItem: React.FC<PropsOf<typeof chakra.li>> = (props) => (
  <chakra.li {...props} />
)

if (__DEV__) {
  ListItem.displayName = "ListItem"
}

/**
 * ListIcon
 *
 * Used to render an icon beside the list item text
 */
export const ListIcon: React.FC<IconProps> = forwardRef((props, ref) => {
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
