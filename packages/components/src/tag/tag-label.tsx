import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useTagStyles } from "./tag-context"

export interface TagLabelProps extends HTMLChakraProps<"span"> {}

export const TagLabel = forwardRef<TagLabelProps, "span">((props, ref) => {
  const styles = useTagStyles()
  return <chakra.span ref={ref} noOfLines={1} {...props} __css={styles.label} />
})

TagLabel.displayName = "TagLabel"
