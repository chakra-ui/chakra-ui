"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_STYLES,
  HTMLChakraProps,
  RecipeProps,
  UnstyledProp,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface ContainerProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"Container">,
    UnstyledProp {
  /**
   * If `true`, container will center its children
   * regardless of their width.
   *
   * @default false
   */
  centerContent?: boolean
}

/**
 * Layout component used to wrap app or website content
 *
 * It sets `margin-left` and `margin-right` to `auto`,
 * to keep its content centered.
 *
 * It also sets a default max-width of `60ch` (60 characters).
 *
 * @see Docs https://chakra-ui.com/docs/components/container
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ unstyled, ...props }, ref) {
    const recipe = useRecipe("Container", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

    const { centerContent, ...rest } = localProps

    return (
      <chakra.div
        ref={ref}
        {...rest}
        className={cx("chakra-container", props.className)}
        css={[
          styles,
          centerContent
            ? {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }
            : {},
        ]}
      />
    )
  },
)

Container.displayName = "Container"
