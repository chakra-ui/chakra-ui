import { defineStyle } from "@chakra-ui/styled-system"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { cx } from "@chakra-ui/utils"
import { useModalStyles } from "./modal"

export interface ModalFooterProps extends HTMLChakraProps<"footer"> {}

/**
 * ModalFooter houses the action buttons of the modal.
 * @see Docs https://chakra-ui.com/modal
 */
export const ModalFooter = forwardRef<ModalFooterProps, "footer">(
  (props, ref) => {
    const { className, ...rest } = props
    const _className = cx("chakra-modal__footer", className)

    const styles = useModalStyles()

    const footerStyles = defineStyle({
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      ...styles.footer,
    })

    return (
      <chakra.footer
        ref={ref}
        {...rest}
        __css={footerStyles}
        className={_className}
      />
    )
  },
)

ModalFooter.displayName = "ModalFooter"
