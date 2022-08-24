import { cx } from "@chakra-ui/shared-utils"
import {
  HTMLChakraProps,
  chakra,
  SystemStyleObject,
  forwardRef,
} from "@chakra-ui/system"

import { useModalContext, useModalStyles } from "./modal"
import { ModalFocusScope } from "./modal-focus"
import { ModalTransition } from "./modal-transition"

export interface ModalContentProps extends HTMLChakraProps<"section"> {
  /**
   * The props to forward to the modal's content wrapper
   */
  containerProps?: HTMLChakraProps<"div">
}

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
export const ModalContent = forwardRef<ModalContentProps, "section">(
  (props, ref) => {
    const { className, children, containerProps: rootProps, ...rest } = props

    const { getDialogProps, getDialogContainerProps } = useModalContext()

    const dialogProps = getDialogProps(rest, ref) as any
    const containerProps = getDialogContainerProps(rootProps)

    const _className = cx("chakra-modal__content", className)

    const styles = useModalStyles()

    const dialogStyles: SystemStyleObject = {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      ...styles.dialog,
    }

    const dialogContainerStyles: SystemStyleObject = {
      display: "flex",
      width: "100vw",
      height: "100vh",
      "@supports(height: -webkit-fill-available)": {
        height: "-webkit-fill-available",
      },
      position: "fixed",
      left: 0,
      top: 0,
      ...styles.dialogContainer,
    }

    const { motionPreset } = useModalContext()

    return (
      <ModalFocusScope>
        <chakra.div
          {...containerProps}
          className="chakra-modal__content-container"
          // tabindex="-1" means that the element is not reachable via sequential keyboard navigation, @see #4686
          tabIndex={-1}
          __css={dialogContainerStyles}
        >
          <ModalTransition
            preset={motionPreset}
            className={_className}
            {...dialogProps}
            __css={dialogStyles}
          >
            {children}
          </ModalTransition>
        </chakra.div>
      </ModalFocusScope>
    )
  },
)

ModalContent.displayName = "ModalContent"
