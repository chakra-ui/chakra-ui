import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"

export interface HeadingProps
  extends HTMLChakraProps<"h2">,
    SystemRecipeProps<"Heading"> {}

/**
 * `Heading` is used to render semantic HTML heading elements.
 *
 * By default, renders as `h2` with themantic size `xl`
 *
 * @see Docs https://chakra-ui.com/docs/components/heading
 */
export const Heading = forwardRef<HeadingProps, "h2">(
  function Heading(props, ref) {
    const recipe = useRecipe("Heading")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    return (
      <chakra.h2
        ref={ref}
        className={cx("chakra-heading", props.className)}
        {...localProps}
        css={[recipe(variantProps), localProps.css]}
      />
    )
  },
)

Heading.displayName = "Heading"
