import { Icon, IconProps } from "@chakra-ui/icon"
import { createContext } from "@chakra-ui/react-context"
import { getValidChildren } from "@chakra-ui/react-children-utils"
import type {
  HTMLChakraProps,
  SystemProps,
  ThemingProps,
} from "@chakra-ui/system"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  SystemStyleObject,
  useMultiStyleConfig,
} from "@chakra-ui/system"

const [ListStylesProvider, useListStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `ListStylesContext`,
  errorMessage: `useListStyles returned is 'undefined'. Seems you forgot to wrap the components in "<List />" `,
})

export { useListStyles }

interface ListOptions {
  /**
   * Shorthand prop for `listStyleType`
   * @type SystemProps["listStyleType"]
   */
  styleType?: SystemProps["listStyleType"]
  /**
   * Shorthand prop for `listStylePosition`
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
export const List = forwardRef<ListProps, "ul">(function List(props, ref) {
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
    <ListStylesProvider value={styles}>
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
    </ListStylesProvider>
  )
})

List.displayName = "List"

export const OrderedList = forwardRef<ListProps, "ol">((props, ref) => {
  const { as, ...rest } = props
  return (
    <List ref={ref} as="ol" styleType="decimal" marginStart="1em" {...rest} />
  )
})

OrderedList.displayName = "OrderedList"

export const UnorderedList = forwardRef<ListProps, "ul">(function UnorderedList(
  props,
  ref,
) {
  const { as, ...rest } = props
  return (
    <List ref={ref} as="ul" styleType="initial" marginStart="1em" {...rest} />
  )
})

UnorderedList.displayName = "UnorderedList"

export interface ListItemProps extends HTMLChakraProps<"li"> {}

/**
 * ListItem
 *
 * Used to render a list item
 */
export const ListItem = forwardRef<ListItemProps, "li">(function ListItem(
  props,
  ref,
) {
  const styles = useListStyles()

  return <chakra.li ref={ref} {...props} __css={styles.item} />
})

ListItem.displayName = "ListItem"

/**
 * ListIcon
 *
 * Used to render an icon beside the list item text
 */
export const ListIcon = forwardRef<IconProps, "svg">(function ListIcon(
  props,
  ref,
) {
  const styles = useListStyles()

  return <Icon ref={ref} role="presentation" {...props} __css={styles.icon} />
})

ListIcon.displayName = "ListIcon"
