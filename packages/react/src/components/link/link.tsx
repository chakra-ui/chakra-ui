import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"

export interface LinkProps
  extends HTMLChakraProps<"a">,
    SystemRecipeProps<"Link"> {
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
export const Link = forwardRef<LinkProps, "a">(function Link(props, ref) {
  const recipe = useRecipe("Link")
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)
  const { className, isExternal, ...rest } = localProps

  return (
    <chakra.a
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener" : undefined}
      ref={ref}
      className={cx("chakra-link", className)}
      {...rest}
      css={styles}
    />
  )
})

Link.displayName = "Link"
