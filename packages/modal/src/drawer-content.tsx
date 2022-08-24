import { cx } from "@chakra-ui/shared-utils"
import {
  chakra,
  HTMLChakraProps,
  SystemStyleObject,
  forwardRef,
} from "@chakra-ui/system"
import { Slide } from "@chakra-ui/transition"

import { useDrawerContext } from "./drawer"
import { useModalContext, useModalStyles } from "./modal"
import { ModalFocusScope } from "./modal-focus"

const StyledSlide = chakra(Slide)

export interface DrawerContentProps extends HTMLChakraProps<"section"> {}

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
export const DrawerContent = forwardRef<DrawerContentProps, "section">(
  (props, ref) => {
    const { className, children, ...rest } = props

    const { getDialogProps, getDialogContainerProps, isOpen } =
      useModalContext()

    const dialogProps = getDialogProps(rest, ref) as any
    const containerProps = getDialogContainerProps()

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
      position: "fixed",
      left: 0,
      top: 0,
      ...styles.dialogContainer,
    }

    const { placement } = useDrawerContext()

    return (
      <chakra.div
        {...containerProps}
        className="chakra-modal__content-container"
        __css={dialogContainerStyles}
      >
        <ModalFocusScope>
          <StyledSlide
            direction={placement}
            in={isOpen}
            className={_className}
            {...dialogProps}
            __css={dialogStyles}
          >
            {children}
          </StyledSlide>
        </ModalFocusScope>
      </chakra.div>
    )
  },
)

DrawerContent.displayName = "DrawerContent"
