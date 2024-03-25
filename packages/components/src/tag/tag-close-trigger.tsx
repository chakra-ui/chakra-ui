import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { TagCloseIcon } from "./tag-close-icon"
import { useTagStyles } from "./tag-context"

export interface TagCloseTriggerProps
  extends Omit<HTMLChakraProps<"button">, "disabled"> {
  disabled?: boolean
}

/**
 * TagCloseTrigger is used to close "remove" the tag
 * @see Docs https://chakra-ui.com/tag
 */

export const TagCloseTrigger = forwardRef<TagCloseTriggerProps, "button">(
  function TagCloseTrigger(props, ref) {
    const { disabled, children = <TagCloseIcon />, ...rest } = props
    const styles = useTagStyles()

    return (
      <chakra.button
        ref={ref}
        aria-label="close"
        {...rest}
        type="button"
        disabled={disabled}
        __css={styles.closeTrigger}
      >
        {children}
      </chakra.button>
    )
  },
)

TagCloseTrigger.displayName = "TagCloseTrigger"
