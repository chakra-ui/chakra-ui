import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface ContainerProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"Container"> {
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
  function Container(props, ref) {
    const recipe = useRecipe("Container", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const { className, centerContent, ...rest } = localProps

    return (
      <chakra.div
        ref={ref}
        className={cx("chakra-container", className)}
        {...rest}
        css={{
          ...styles,
          ...(centerContent && {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }),
        }}
      />
    )
  },
)

Container.displayName = "Container"
