import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  SlotRecipeProps,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import { TagStylesProvider } from "./tag-context"

export interface TagRootProps
  extends HTMLChakraProps<"span">,
    SlotRecipeProps<"Tag"> {
  /**
   * If `true`, the tag will be interactive
   */
  interactive?: boolean
}

/**
 * The tag component is used to label or categorize UI elements.
 * To style the tag globally, change the styles in `theme.components.Tag`
 * @see Docs https://chakra-ui.com/tag
 */
export const TagRoot = forwardRef<HTMLSpanElement, TagRootProps>(
  function TagRoot(props, ref) {
    const recipe = useSlotRecipe("Tag", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const { interactive, ...restProps } = localProps

    return (
      <TagStylesProvider value={styles}>
        <chakra.div
          tabIndex={interactive ? 0 : undefined}
          role={interactive ? "button" : undefined}
          ref={ref}
          {...restProps}
          css={[styles.root, localProps.css]}
          className={cx("chakra-tag", localProps.className)}
        />
      </TagStylesProvider>
    )
  },
)

TagRoot.displayName = "TagRoot"
