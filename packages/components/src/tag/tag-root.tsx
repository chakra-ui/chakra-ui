import { ThemingProps, omitThemingProps } from "@chakra-ui/styled-system"
import {
  HTMLChakraProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "../system"
import { TagStylesProvider } from "./tag-context"

export interface TagRootProps
  extends HTMLChakraProps<"span">,
    ThemingProps<"Tag"> {}

/**
 * The tag component is used to label or categorize UI elements.
 * To style the tag globally, change the styles in `theme.components.Tag`
 * @see Docs https://chakra-ui.com/tag
 */
export const TagRoot = forwardRef<TagRootProps, "span">(
  function TagRoot(props, ref) {
    const styles = useMultiStyleConfig("Tag", props)
    const rootProps = omitThemingProps(props)

    return (
      <TagStylesProvider value={styles}>
        <chakra.span ref={ref} {...rootProps} __css={styles.root} />
      </TagStylesProvider>
    )
  },
)

TagRoot.displayName = "TagRoot"
