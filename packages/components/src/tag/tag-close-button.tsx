import { SystemStyleObject } from "@chakra-ui/styled-system"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { TagCloseIcon } from "./tag-close-icon"
import { useTagStyles } from "./tag-context"

export interface TagCloseButtonProps
  extends Omit<HTMLChakraProps<"button">, "disabled"> {
  /**
   * @default false
   */
  isDisabled?: boolean
}

/**
 * TagCloseButton is used to close "remove" the tag
 * @see Docs https://chakra-ui.com/tag
 */

export const TagCloseButton = forwardRef<TagCloseButtonProps, "button">(
  (props, ref) => {
    const { isDisabled, children, ...rest } = props

    const styles = useTagStyles()

    const btnStyles: SystemStyleObject = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "0",
      ...styles.closeButton,
    }

    return (
      <chakra.button
        ref={ref}
        aria-label="close"
        {...rest}
        type="button"
        disabled={isDisabled}
        __css={btnStyles}
      >
        {children || <TagCloseIcon />}
      </chakra.button>
    )
  },
)

TagCloseButton.displayName = "TagCloseButton"
