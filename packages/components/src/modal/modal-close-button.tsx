import { forwardRef } from "@chakra-ui/system"
import { callAllHandlers } from "@chakra-ui/utils/call-all"
import { cx } from "@chakra-ui/utils/cx"
import { CloseButton, CloseButtonProps } from "../close-button"
import { useModalContext, useModalStyles } from "./modal"

export type ModalCloseButtonProps = CloseButtonProps

/**
 * ModalCloseButton is used closes the modal.
 *
 * You don't need to pass the `onClick` to it, it reads the
 * `onClose` action from the modal context.
 */
export const ModalCloseButton = forwardRef<CloseButtonProps, "button">(
  (props, ref) => {
    const { onClick, className, ...rest } = props
    const { onClose } = useModalContext()

    const _className = cx("chakra-modal__close-btn", className)

    const styles = useModalStyles()

    return (
      <CloseButton
        ref={ref}
        __css={styles.closeButton}
        className={_className}
        onClick={callAllHandlers(onClick, (event: React.MouseEvent) => {
          event.stopPropagation()
          onClose()
        })}
        {...rest}
      />
    )
  },
)

ModalCloseButton.displayName = "ModalCloseButton"
