import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import { TagStylesProvider } from "./tag-context"

export interface TagRootProps
  extends HTMLChakraProps<"span">,
    SystemRecipeProps<"Tag"> {}

/**
 * The tag component is used to label or categorize UI elements.
 * To style the tag globally, change the styles in `theme.components.Tag`
 * @see Docs https://chakra-ui.com/tag
 */
export const TagRoot = forwardRef<TagRootProps, "span">(
  function TagRoot(props, ref) {
    const recipe = useSlotRecipe("Tag")

    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    return (
      <TagStylesProvider value={styles}>
        <chakra.span
          ref={ref}
          {...localProps}
          css={[styles.root, localProps.css]}
        />
      </TagStylesProvider>
    )
  },
)

TagRoot.displayName = "TagRoot"
