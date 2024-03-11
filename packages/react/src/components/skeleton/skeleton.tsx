import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface SkeletonProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"Skeleton"> {}

/**
 * `Skeleton` is used to display the loading state of some component.
 *
 * @see Docs https://chakra-ui.com/docs/components/skeleton
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(props, ref) {
    const recipe = useRecipe("Skeleton", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    return (
      <chakra.div
        ref={ref}
        {...localProps}
        css={[styles, props.css]}
        className={cx("chakra-skeleton", props.className)}
      />
    )
  },
)

Skeleton.displayName = "Skeleton"
