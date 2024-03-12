import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"

export interface SeparatorProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"Separator"> {}

/**
 * Layout component used to visually separate content in a list or group.
 * It displays a thin horizontal or vertical line, and renders a `hr` tag.
 *
 * @see Docs https://chakra-ui.com/divider
 */
export const Separator = forwardRef<SeparatorProps, "div">(
  function Separator(props, ref) {
    const recipe = useRecipe("Separator", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    return (
      <chakra.div
        ref={ref}
        role="separator"
        aria-orientation={variantProps.orientation || "horizontal"}
        {...localProps}
        css={[styles, props.css]}
        className={cx("chakra-separator", props.className)}
      />
    )
  },
)

Separator.displayName = "Divider"
