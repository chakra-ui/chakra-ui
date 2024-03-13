import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface LinkProps extends HTMLChakraProps<"a">, RecipeProps<"Link"> {
  /**
   *  If `true`, the link will open in new tab
   *
   * @default false
   */
  isExternal?: boolean
}

/**
 * Links are accessible elements used primarily for navigation.
 * @see Docs https://chakra-ui.com/link
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const recipe = useRecipe("Link", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)
    const { className, isExternal, ...rest } = localProps

    return (
      <chakra.a
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener" : undefined}
        ref={ref}
        {...rest}
        className={cx("chakra-link", className)}
        css={[styles, props.css]}
      />
    )
  },
)

Link.displayName = "Link"
