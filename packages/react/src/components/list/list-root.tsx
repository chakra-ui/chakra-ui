import type { HTMLChakraProps } from "../../styled-system"
import {
  SystemRecipeProps,
  SystemStyleObject,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import { ListStylesProvider } from "./list-context"

interface ListOptions {
  /**
   * Shorthand prop for `listStyleType`
   * @type SystemStyleObject["listStyleType"]
   */
  styleType?: SystemStyleObject["listStyleType"]
  /**
   * Shorthand prop for `listStylePosition`
   * @type SystemStyleObject["listStylePosition"]
   */
  stylePosition?: SystemStyleObject["listStylePosition"]
}

export interface ListRootProps
  extends HTMLChakraProps<"ul">,
    SystemRecipeProps<"List">,
    ListOptions {}

/**
 * Used to display list items, it renders a `<ul>` by default.
 *
 * @see Docs https://chakra-ui.com/list
 */
export const ListRoot = forwardRef<ListRootProps, "ul">(
  function ListRoot(props, ref) {
    const recipe = useSlotRecipe("List")
    const [variantProps, localProps] = recipe.splitVariantProps(props)

    const styles = recipe(variantProps)
    const { styleType, stylePosition, ...rest } = localProps

    return (
      <ListStylesProvider value={styles}>
        <chakra.ul
          {...rest}
          ref={ref}
          role="list"
          css={{
            listStyleType: styleType,
            listStylePosition: stylePosition,
            ...styles.root,
          }}
        />
      </ListStylesProvider>
    )
  },
)

ListRoot.displayName = "List"
