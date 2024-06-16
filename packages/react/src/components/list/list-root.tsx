"use client"

import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  type HTMLChakraProps,
  type SlotRecipeProps,
  type SystemStyleObject,
  type UnstyledProp,
  chakra,
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
    SlotRecipeProps<"list">,
    UnstyledProp,
    ListOptions {}

/**
 * Used to display list items, it renders a `<ul>` by default.
 *
 * @see Docs https://chakra-ui.com/list
 */
export const ListRoot = forwardRef<HTMLUListElement, ListRootProps>(
  function ListRoot({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("list", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)
    const { styleType, stylePosition, ...rest } = localProps

    return (
      <ListStylesProvider value={styles}>
        <chakra.ul
          {...rest}
          ref={ref}
          role="list"
          listStyleType={styleType}
          listStylePosition={stylePosition}
          css={[styles["root"], props.css]}
        />
      </ListStylesProvider>
    )
  },
)

ListRoot.displayName = "List"
