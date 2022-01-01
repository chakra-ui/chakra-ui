import { Icon, IconProps } from "@chakra-ui/icon"
import { createContext, getValidChildren } from "@chakra-ui/react-utils"
import { SystemStyleObject } from "@chakra-ui/styled-system"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { Dict, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

const [StylesProvider, useStyles] = createContext<Dict<SystemStyleObject>>({
  name: "StylesContext",
  errorMessage:
    "useStyles: `styles` is undefined. Seems you forgot to wrap the components in a `<*List />` ",
})

interface ListOptions {
  /**
   * Short hand prop for `listStyleType`
   * @type SystemProps["listStyleType"]
   */
  styleType?: SystemProps["listStyleType"]
  /**
   * Short hand prop for `listStylePosition`
   * @type SystemProps["listStylePosition"]
   */
  stylePosition?: SystemProps["listStylePosition"]
  /**
   * The space between each list item
   * @type SystemProps["margin"]
   */
  spacing?: SystemProps["margin"]
}

export interface ListProps
  extends HTMLChakraProps<"ul">,
    ThemingProps<"List">,
    ListOptions {}

/**
 * List is used to display list items, it renders a `<ul>` by default.
 *
 * @see Docs https://chakra-ui.com/list
 */
export const List = forwardRef<ListProps, "ul">((props, ref) => {
  const styles = useMultiStyleConfig("List", props)
  const {
    children,
    styleType = "none",
    stylePosition,
    spacing,
    ...rest
  } = omitThemingProps(props)

  const validChildren = getValidChildren(children)

  const selector = "& > *:not(style) ~ *:not(style)"

  const spacingStyle = spacing ? { [selector]: { mt: spacing } } : {}

  return (
    <StylesProvider value={styles}>
      <chakra.ul
        ref={ref}
        listStyleType={styleType}
        listStylePosition={stylePosition}
        /**
         * We added this role to fix the Safari accessibility issue with list-style-type: none
         * @see https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
         */
        role="list"
        __css={{ ...styles.container, ...spacingStyle }}
        {...rest}
      >
        {validChildren}
      </chakra.ul>
    </StylesProvider>
  )
})

if (__DEV__) {
  List.displayName = "List"
}

export const OrderedList = forwardRef<ListProps, "ol">((props, ref) => {
  const { as, ...rest } = props
  return (
    <List ref={ref} as="ol" styleType="decimal" marginStart="1em" {...rest} />
  )
})

if (__DEV__) {
  OrderedList.displayName = "OrderedList"
}

export const UnorderedList = forwardRef<ListProps, "ul">((props, ref) => {
  const { as, ...rest } = props
  return (
    <List ref={ref} as="ul" styleType="initial" marginStart="1em" {...rest} />
  )
})

if (__DEV__) {
  UnorderedList.displayName = "UnorderedList"
}

export interface ListItemProps extends HTMLChakraProps<"li"> {}

/**
 * ListItem
 *
 * Used to render a list item
 */
export const ListItem = forwardRef<ListItemProps, "li">((props, ref) => {
  const styles = useStyles()

  return <chakra.li ref={ref} {...props} __css={styles.item} />
})

if (__DEV__) {
  ListItem.displayName = "ListItem"
}

/**
 * ListIcon
 *
 * Used to render an icon beside the list item text
 */
export const ListIcon = forwardRef<IconProps, "svg">((props, ref) => {
  const styles = useStyles()

  return <Icon ref={ref} role="presentation" {...props} __css={styles.icon} />
})

if (__DEV__) {
  ListIcon.displayName = "ListIcon"
}
