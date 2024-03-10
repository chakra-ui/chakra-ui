import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useTagStyles } from "./tag-context"

export interface TagLabelProps extends HTMLChakraProps<"span"> {}

export const TagLabel = forwardRef<TagLabelProps, "span">(
  function TagLabel(props, ref) {
    const styles = useTagStyles()
    return (
      <chakra.span
        ref={ref}
        {...props}
        css={[styles.label, props.css]}
        className={cx("chakra-tag__label", props.className)}
      />
    )
  },
)

TagLabel.displayName = "TagLabel"
