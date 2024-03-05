import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"

export interface BadgeProps
  extends HTMLChakraProps<"span">,
    SystemRecipeProps<"Badge"> {}

/**
 * React component used to display notifications, messages, or
 * statuses in different shapes and sizes.
 *
 * @see Docs https://chakra-ui.com/badge
 */
export const Badge = forwardRef<BadgeProps, "span">(function Badge(props, ref) {
  const recipe = useRecipe("Badge")
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)

  return (
    <chakra.span
      ref={ref}
      {...localProps}
      className={cx("chakra-badge", localProps.className)}
      css={[styles, localProps.css]}
    />
  )
})

Badge.displayName = "Badge"
