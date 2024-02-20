import {
  SystemStyleObject,
  ThemingProps,
  omitThemingProps,
} from "@chakra-ui/styled-system"
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
export const TagRoot = forwardRef<TagRootProps, "span">((props, ref) => {
  const styles = useMultiStyleConfig("Tag", props)
  const rootProps = omitThemingProps(props)

  const rootStyles: SystemStyleObject = {
    display: "inline-flex",
    verticalAlign: "top",
    alignItems: "center",
    maxWidth: "100%",
    ...styles.container,
  }

  return (
    <TagStylesProvider value={styles}>
      <chakra.span ref={ref} {...rootProps} __css={rootStyles} />
    </TagStylesProvider>
  )
})

TagRoot.displayName = "Tag"
