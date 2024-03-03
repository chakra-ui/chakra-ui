import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useTagStyles } from "./tag-context"

export interface TagLabelProps extends HTMLChakraProps<"span"> {}

export const TagLabel = forwardRef<TagLabelProps, "span">((props, ref) => {
  const styles = useTagStyles()
  return (
    <chakra.span
      ref={ref}
      noOfLines={1}
      {...props}
      css={[styles.label, props.css]}
    />
  )
})

TagLabel.displayName = "TagLabel"
