import {
  SystemProps,
  ThemingProps,
  omitThemingProps,
} from "@chakra-ui/styled-system"
import type { HTMLChakraProps } from "../system"
import { chakra, forwardRef, useMultiStyleConfig } from "../system"
import { ListStylesProvider } from "./list-context"

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
}

export interface ListRootProps
  extends HTMLChakraProps<"ul">,
    ThemingProps<"List">,
    ListOptions {}

/**
 * Used to display list items, it renders a `<ul>` by default.
 *
 * @see Docs https://chakra-ui.com/list
 */
export const ListRoot = forwardRef<ListRootProps, "ul">(
  function ListRoot(props, ref) {
    const styles = useMultiStyleConfig("List", props)
    const { styleType, stylePosition, ...rest } = omitThemingProps(props)
    return (
      <ListStylesProvider value={styles}>
        <chakra.ul
          ref={ref}
          role="list"
          __css={{
            listStyleType: styleType,
            listStylePosition: stylePosition,
            ...styles.root,
          }}
          {...rest}
        />
      </ListStylesProvider>
    )
  },
)

ListRoot.displayName = "List"
